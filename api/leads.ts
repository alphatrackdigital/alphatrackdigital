import type { VercelRequest, VercelResponse } from "@vercel/node";
import { connectDB } from "./_lib/db";
import { Contact } from "./_lib/models/Contact";
import {
  buildLeadDedupeKey,
  getIdempotencyRecord,
  markIdempotencyKey,
} from "./_lib/idempotency";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requestBuckets: Map<string, { count: number; windowStart: number }> = (globalThis as any).__atdLeadRequestBuckets ?? new Map();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).__atdLeadRequestBuckets = requestBuckets;

const allowedHostnames = new Set([
  "alphatrack.digital",
  "www.alphatrack.digital",
  "alphatrackdigital.com",
  "www.alphatrackdigital.com",
  "alphatrackdigital.netlify.app",
  "alphatra-serv.netlify.app",
  "backend--alphatra-serv.netlify.app",
  "website-internal-test.vercel.app",
  "atd-website-test.vercel.app",
  "atd-website-test-alphatrackdigitals-projects.vercel.app",
]);

const isAllowedOrigin = (origin: string | undefined): boolean => {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    if (url.protocol !== "https:") return false;
    if (allowedHostnames.has(url.hostname)) return true;
    return (
      url.hostname.endsWith("-alphatrackdigitals-projects.vercel.app") ||
      url.hostname.endsWith("--alphatrackdigital.netlify.app")
    );
  } catch {
    return false;
  }
};

const getClientIp = (req: VercelRequest): string => {
  const realIp = req.headers["x-real-ip"];
  if (realIp) return String(realIp);
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return String(forwarded).split(",")[0].trim();
  return "unknown";
};

const isRateLimited = (key: string): boolean => {
  const now = Date.now();
  const existing = requestBuckets.get(key);
  if (!existing || now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
    requestBuckets.set(key, { count: 1, windowStart: now });
    return false;
  }
  existing.count += 1;
  requestBuckets.set(key, existing);
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
};

const isValidLeadPayload = (payload: unknown): payload is Record<string, unknown> => {
  if (!payload || typeof payload !== "object") return false;
  const data = payload as Record<string, unknown>;
  const validSources = ["contact_form", "tracking_audit_offer", "newsletter"];
  if (!validSources.includes(data.source as string)) return false;
  if (typeof data.email !== "string" || !data.email.trim()) return false;
  if (data.source !== "newsletter") {
    if (typeof data.firstName !== "string" || !data.firstName.trim()) return false;
    if (typeof data.lastName !== "string" || !data.lastName.trim()) return false;
  }
  if (data.source === "contact_form") {
    if (!Array.isArray(data.serviceInterest) || data.serviceInterest.length === 0) return false;
  }
  if (data.source === "newsletter") {
    if (data.optIn !== true) return false;
  }
  if (data.source === "tracking_audit_offer") {
    if (typeof data.websiteUrl !== "string" || !data.websiteUrl.trim()) return false;
    if (typeof data.monthlyAdSpend !== "string" || !data.monthlyAdSpend.trim()) return false;
    if (typeof data.adPlatforms !== "string" || !data.adPlatforms.trim()) return false;
  }
  return true;
};

const saveToMongoDB = async (payload: Record<string, unknown>, ip: string): Promise<void> => {
  if (!process.env.MONGODB_URI) {
    console.warn("[leads] MONGODB_URI is not set — skipping DB save");
    return;
  }
  try {
    await connectDB();
    await Contact.create({
      source: payload.source,
      firstName: payload.firstName || "",
      lastName: payload.lastName || "",
      email: payload.email,
      company: payload.company || "",
      message: payload.message || "",
      websiteUrl: payload.websiteUrl || "",
      monthlyAdSpend: payload.monthlyAdSpend || "",
      adPlatforms: payload.adPlatforms || "",
      serviceInterest: Array.isArray(payload.serviceInterest)
        ? payload.serviceInterest.join(", ")
        : "",
      monthlyBudget: payload.monthlyBudget || "",
      ip,
    });
  } catch (err) {
    console.error("[leads] MongoDB save error (non-fatal):", err);
  }
};

// --- Brevo helpers ---

const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildMessageAttribute = (data: Record<string, unknown>): string =>
  typeof data.message === "string" ? data.message.trim() : "";

const leadNotificationConfig: Record<string, { senderEmail: string; recipients: string[]; subject: string; label: string }> = {
  contact_form: {
    senderEmail: "info@alphatrack.digital",
    recipients: ["info@alphatrack.digital"],
    subject: "New website contact form enquiry",
    label: "Website contact form enquiry",
  },
  tracking_audit_offer: {
    senderEmail: "audit@alphatrack.digital",
    recipients: ["audit@alphatrack.digital", "martech@alphatrack.digital"],
    subject: "New tracking audit request",
    label: "Tracking audit request",
  },
  newsletter: {
    senderEmail: "info@alphatrack.digital",
    recipients: ["info@alphatrack.digital"],
    subject: "New newsletter signup",
    label: "Newsletter signup",
  },
};

const buildNotificationRows = (data: Record<string, unknown>): [string, string][] =>
  ([
    ["Source", data.source === "contact_form" ? "Contact Form" : data.source === "newsletter" ? "Newsletter" : "Tracking Audit Landing Page"],
    ["Name", `${data.firstName || ""} ${data.lastName || ""}`.trim()],
    ["Email", data.email],
    ["Company", data.company || ""],
    ["Website", data.websiteUrl || ""],
    ["Service Interest", Array.isArray(data.serviceInterest) ? data.serviceInterest.join(", ") : ""],
    ["Monthly Budget", data.monthlyBudget || ""],
    ["Monthly Ad Spend", data.monthlyAdSpend || ""],
    ["Ad Platforms", data.adPlatforms || ""],
    ["Marketing Opt-in", data.optIn === true ? "Yes" : "No"],
    ["Message", buildMessageAttribute(data)],
  ] as [string, unknown][])
    .filter(([, value]) => String(value).trim().length > 0)
    .map(([label, value]) => [label, String(value)] as [string, string]);

const buildNotificationEmail = (data: Record<string, unknown>, config: { label: string }): { textContent: string; htmlContent: string } => {
  const rows = buildNotificationRows(data);
  const textContent = [config.label, "", ...rows.map(([label, value]) => `${label}: ${value}`)].join("\n");
  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;font-weight:700;">${escapeHtml(label)}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
    </tr>`).join("");
  const htmlContent = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.5;">
      <h1 style="font-size:20px;margin:0 0 16px;">${escapeHtml(config.label)}</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px;border:1px solid #e5e7eb;">
        ${htmlRows}
      </table>
    </div>`;
  return { textContent, htmlContent };
};

const withConsentAttributes = (attributes: Record<string, unknown>, data: Record<string, unknown>): Record<string, unknown> => {
  if (data.optIn !== true) return attributes;
  attributes.OPT_IN = true;
  const consentAttribute = process.env.BREVO_CONSENT_ATTRIBUTE?.trim();
  const consentTimestampAttribute = process.env.BREVO_CONSENT_TIMESTAMP_ATTRIBUTE?.trim();
  if (consentAttribute) attributes[consentAttribute] = "Yes";
  if (consentTimestampAttribute) attributes[consentTimestampAttribute] = new Date().toISOString();
  return attributes;
};

const toBrevoPayload = (data: Record<string, unknown>, listId: number) => ({
  email: data.email,
  attributes: withConsentAttributes({
    FIRSTNAME: data.firstName,
    LASTNAME: data.lastName,
    COMPANY: data.company || "",
    MESSAGE: buildMessageAttribute(data),
    WEBSITE: data.websiteUrl || "",
    AD_SPEND: data.monthlyAdSpend || "",
    AD_PLATFORMS: data.adPlatforms || "",
    SOURCE: data.source === "contact_form" ? "Contact Form" : data.source === "newsletter" ? "Newsletter" : "Tracking Audit Landing Page",
    SERVICE_INTEREST: Array.isArray(data.serviceInterest) ? data.serviceInterest.join(", ") : "",
    MONTHLY_BUDGET: data.monthlyBudget || "",
  }, data),
  listIds: [listId],
  updateEnabled: true,
});

const toBrevoDoiPayload = (data: Record<string, unknown>, listId: number, templateId: number, redirectUrl: string) => ({
  email: data.email,
  includeListIds: [listId],
  templateId,
  redirectionUrl: redirectUrl,
  attributes: withConsentAttributes({ SOURCE: "Newsletter" }, data),
});

const tryEnsureContactInList = async (email: unknown, listId: number, brevoApiKey: string, source: unknown): Promise<void> => {
  try {
    const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`, {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": brevoApiKey },
      body: JSON.stringify({ emails: [email] }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.warn("Brevo list add failed after contact upsert", { listId, message: errorText.slice(0, 180) });
    }
  } catch (error) {
    console.error("Secondary Brevo list membership call failed", {
      source,
      listId,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const trySendInternalNotification = async (payload: Record<string, unknown>, brevoApiKey: string, listId: number): Promise<void> => {
  try {
    const config = leadNotificationConfig[payload.source as string];
    if (!config) return;
    const { textContent, htmlContent } = buildNotificationEmail(payload, config);
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: { "content-type": "application/json", "api-key": brevoApiKey },
      body: JSON.stringify({
        sender: { name: "AlphaTrack Digital", email: config.senderEmail },
        to: config.recipients.map((email) => ({ email })),
        replyTo: { email: config.senderEmail, name: "AlphaTrack Digital" },
        subject: config.subject,
        htmlContent,
        textContent,
        tags: [payload.source],
      }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lead notification email failed", { source: payload.source, listId, message: errorText.slice(0, 180) });
    }
  } catch (error) {
    console.error("Lead notification email failed", {
      source: payload.source,
      listId,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// --- Handler ---

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers["origin"] as string | undefined;

  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin!);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false, message: "Method not allowed" });

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ ok: false, message: "Too many requests. Please try again shortly." });
  }

  const payload = req.body;
  if (!isValidLeadPayload(payload)) {
    return res.status(400).json({ ok: false, message: "Invalid submission payload." });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const contactListId = Number(process.env.BREVO_CONTACT_LIST_ID || "8");
  const auditListId = Number(process.env.BREVO_AUDIT_LIST_ID || "11");
  const newsletterListId = Number(process.env.BREVO_NEWSLETTER_LIST_ID || "9");
  const newsletterDoiTemplateId = Number(process.env.BREVO_DOI_TEMPLATE_ID || "0");
  const newsletterDoiRedirectUrl = process.env.BREVO_DOI_REDIRECT_URL?.trim() || "";

  const listId =
    payload.source === "contact_form"
      ? contactListId
      : payload.source === "newsletter"
      ? newsletterListId
      : auditListId;

  const dedupeKey = buildLeadDedupeKey(payload);
  const isDuplicate = Boolean(await getIdempotencyRecord(dedupeKey));

  await saveToMongoDB(payload, clientIp);

  if (!brevoApiKey) {
    if (!isDuplicate) {
      await markIdempotencyKey(dedupeKey, { source: payload.source, emailHash: dedupeKey.split("/").at(-1), listId });
    }
    return res.status(200).json({ ok: true, pendingConfirmation: false, duplicate: isDuplicate });
  }

  try {
    const isNewsletterDoiEnabled =
      payload.source === "newsletter" &&
      Number.isInteger(newsletterDoiTemplateId) &&
      newsletterDoiTemplateId > 0 &&
      newsletterDoiRedirectUrl.length > 0;

    if (isDuplicate && isNewsletterDoiEnabled) {
      return res.status(200).json({ ok: true, pendingConfirmation: true, duplicate: true });
    }

    let pendingConfirmation = isNewsletterDoiEnabled;
    let brevoResponse = await fetch(
      isNewsletterDoiEnabled
        ? "https://api.brevo.com/v3/contacts/doubleOptinConfirmation"
        : "https://api.brevo.com/v3/contacts",
      {
        method: "POST",
        headers: { "content-type": "application/json", "api-key": brevoApiKey },
        body: JSON.stringify(
          isNewsletterDoiEnabled
            ? toBrevoDoiPayload(payload, listId, newsletterDoiTemplateId, newsletterDoiRedirectUrl)
            : toBrevoPayload(payload, listId)
        ),
      }
    );

    if (!brevoResponse.ok && isNewsletterDoiEnabled) {
      const errorText = await brevoResponse.text();
      if (errorText.includes("active DOI template") || errorText.includes("invalid_parameter")) {
        pendingConfirmation = false;
        brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
          method: "POST",
          headers: { "content-type": "application/json", "api-key": brevoApiKey },
          body: JSON.stringify(toBrevoPayload(payload, listId)),
        });
      } else {
        return res.status(502).json({ ok: false, message: `Failed to submit lead to provider. ${errorText.slice(0, 180)}` });
      }
    }

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      return res.status(502).json({ ok: false, message: `Failed to submit lead to provider. ${errorText.slice(0, 180)}` });
    }

    if (!pendingConfirmation) {
      await tryEnsureContactInList(payload.email, listId, brevoApiKey, payload.source);
    }

    if (!isDuplicate) {
      await markIdempotencyKey(dedupeKey, { source: payload.source, emailHash: dedupeKey.split("/").at(-1), listId });
      await trySendInternalNotification(payload, brevoApiKey, listId);
    }

    return res.status(200).json({ ok: true, pendingConfirmation, duplicate: isDuplicate });
  } catch {
    return res.status(500).json({ ok: false, message: "Unable to submit lead right now." });
  }
}
