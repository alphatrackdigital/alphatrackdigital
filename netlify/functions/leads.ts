import type { Handler, HandlerEvent } from "@netlify/functions";
import { corsHeaders, jsonResponse } from "./lib/http";
import { connectDB } from "./lib/db";
import { Contact } from "./lib/models/Contact";

type LeadSource = "contact_form" | "tracking_audit_offer" | "newsletter";

interface LeadPayload {
  source: LeadSource;
  firstName: string;
  lastName: string;
  email: string;
  optIn?: boolean;
  company?: string;
  message?: string;
  websiteUrl?: string;
  monthlyAdSpend?: string;
  adPlatforms?: string;
  serviceInterest?: string[];
  monthlyBudget?: string;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;
const buckets = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = buckets.get(ip);
  if (!existing || now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
    buckets.set(ip, { count: 1, windowStart: now });
    return false;
  }
  existing.count += 1;
  return existing.count > RATE_LIMIT_MAX;
}

function withConsentAttributes(
  attributes: Record<string, string | boolean>,
  payload: LeadPayload,
) {
  if (payload.optIn !== true) {
    return attributes;
  }

  attributes.OPT_IN = true;

  const consentAttribute = process.env.BREVO_CONSENT_ATTRIBUTE?.trim();
  const consentTimestampAttribute = process.env.BREVO_CONSENT_TIMESTAMP_ATTRIBUTE?.trim();

  if (consentAttribute) {
    attributes[consentAttribute] = "Yes";
  }

  if (consentTimestampAttribute) {
    attributes[consentTimestampAttribute] = new Date().toISOString();
  }

  return attributes;
}

const leadNotificationConfig: Partial<Record<LeadSource, {
  senderEmail: string;
  recipients: string[];
  subject: string;
  label: string;
}>> = {
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

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildMessageAttribute(payload: LeadPayload): string {
  return payload.message?.trim() || "";
}

function getSourceLabel(source: LeadSource): string {
  if (source === "contact_form") return "Contact Form";
  if (source === "newsletter") return "Newsletter";
  return "Tracking Audit Landing Page";
}

function buildNotificationRows(payload: LeadPayload) {
  return [
    ["Source", getSourceLabel(payload.source)],
    ["Name", `${payload.firstName} ${payload.lastName}`.trim()],
    ["Email", payload.email],
    ["Company", payload.company || ""],
    ["Website", payload.websiteUrl || ""],
    ["Service Interest", Array.isArray(payload.serviceInterest) ? payload.serviceInterest.join(", ") : ""],
    ["Monthly Budget", payload.monthlyBudget || ""],
    ["Monthly Ad Spend", payload.monthlyAdSpend || ""],
    ["Ad Platforms", payload.adPlatforms || ""],
    ["Marketing Opt-in", payload.optIn === true ? "Yes" : "No"],
    ["Message", buildMessageAttribute(payload)],
  ].filter(([, value]) => String(value).trim().length > 0);
}

function buildNotificationEmail(
  payload: LeadPayload,
  config: NonNullable<typeof leadNotificationConfig[LeadSource]>,
) {
  const rows = buildNotificationRows(payload);
  const textContent = [
    config.label,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 700;">${escapeHtml(label)}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
        </tr>`,
    )
    .join("");

  const htmlContent = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; line-height: 1.5;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">${escapeHtml(config.label)}</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 720px; border: 1px solid #e5e7eb;">
        ${htmlRows}
      </table>
    </div>`;

  return { textContent, htmlContent };
}

async function sendInternalNotification(payload: LeadPayload, brevoApiKey: string) {
  const config = leadNotificationConfig[payload.source];
  if (!config) return;

  const { textContent, htmlContent } = buildNotificationEmail(payload, config);
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": brevoApiKey,
    },
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
    throw new Error(`Failed to send internal notification. ${errorText.slice(0, 180)}`);
  }
}

function toBrevoDoiPayload(
  payload: LeadPayload,
  listId: number,
  templateId: number,
  redirectUrl: string,
) {
  return {
    email: payload.email,
    includeListIds: [listId],
    templateId,
    redirectionUrl: redirectUrl,
    attributes: withConsentAttributes({
      SOURCE: "Newsletter",
    }, payload),
  };
}

function isValidLeadPayload(payload: unknown): payload is LeadPayload {
  if (!payload || typeof payload !== "object") return false;
  const d = payload as Record<string, unknown>;
  const validSources: LeadSource[] = ["contact_form", "tracking_audit_offer", "newsletter"];
  if (!validSources.includes(d.source as LeadSource)) return false;
  if (typeof d.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return false;

  if (d.source === "newsletter") {
    return d.optIn === true;
  }

  if (typeof d.firstName !== "string" || !d.firstName.trim()) return false;
  if (typeof d.lastName !== "string" || !d.lastName.trim()) return false;

  if (d.source === "tracking_audit_offer") {
    if (typeof d.websiteUrl !== "string" || !d.websiteUrl.trim()) return false;
    if (typeof d.monthlyAdSpend !== "string" || !d.monthlyAdSpend.trim()) return false;
    if (typeof d.adPlatforms !== "string" || !d.adPlatforms.trim()) return false;
  }

  return true;
}

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = corsHeaders(event.headers["origin"]);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405, headers);
  }

  const ip =
    (event.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    event.headers["client-ip"] ||
    "unknown";

  if (isRateLimited(ip)) {
    return jsonResponse({ ok: false, message: "Too many requests. Please try again later." }, 429, headers);
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) {
    return jsonResponse({ ok: false, message: "Server configuration error." }, 500, headers);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse({ ok: false, message: "Invalid JSON." }, 400, headers);
  }

  if (!isValidLeadPayload(payload)) {
    return jsonResponse({ ok: false, message: "Invalid lead payload." }, 400, headers);
  }

  const contactListId = Number(process.env.BREVO_CONTACT_LIST_ID ?? 8);
  const auditListId = Number(process.env.BREVO_AUDIT_LIST_ID ?? 11);
  const newsletterListId = Number(process.env.BREVO_NEWSLETTER_LIST_ID ?? 9);
  const newsletterDoiTemplateId = Number(process.env.BREVO_DOI_TEMPLATE_ID ?? 0);
  const newsletterDoiRedirectUrl = process.env.BREVO_DOI_REDIRECT_URL?.trim() || "";

  const listId =
    payload.source === "contact_form"
      ? contactListId
      : payload.source === "tracking_audit_offer"
      ? auditListId
      : newsletterListId;

  const serviceInterestStr = Array.isArray(payload.serviceInterest)
    ? payload.serviceInterest.join(", ")
    : "";

  try {
    // Save to MongoDB (non-blocking — don't fail the request if DB is down)
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
        serviceInterest: serviceInterestStr,
        monthlyBudget: payload.monthlyBudget || "",
        ip,
      });
    } catch (dbErr) {
      console.error("[leads] DB save error (non-fatal):", dbErr);
    }

    const isNewsletterDoiEnabled =
      payload.source === "newsletter" &&
      Number.isInteger(newsletterDoiTemplateId) &&
      newsletterDoiTemplateId > 0 &&
      newsletterDoiRedirectUrl.length > 0;

    const brevoRes = await fetch(
      isNewsletterDoiEnabled
        ? "https://api.brevo.com/v3/contacts/doubleOptinConfirmation"
        : "https://api.brevo.com/v3/contacts",
      {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
        body: JSON.stringify(
          isNewsletterDoiEnabled
            ? toBrevoDoiPayload(payload, listId, newsletterDoiTemplateId, newsletterDoiRedirectUrl)
            : {
                email: payload.email,
                attributes: withConsentAttributes({
                  FIRSTNAME: payload.firstName || "",
                  LASTNAME: payload.lastName || "",
                  COMPANY: payload.company || "",
                  MESSAGE: payload.message || "",
                  WEBSITE: payload.websiteUrl || "",
                  AD_SPEND: payload.monthlyAdSpend || "",
                  AD_PLATFORMS: payload.adPlatforms || "",
                  SERVICE_INTEREST: serviceInterestStr,
                  MONTHLY_BUDGET: payload.monthlyBudget || "",
                  SOURCE:
                    payload.source === "contact_form"
                      ? "Contact Form"
                      : payload.source === "tracking_audit_offer"
                      ? "Tracking Audit Landing Page"
                      : "Newsletter",
                }, payload),
                listIds: [listId],
                updateEnabled: true,
              },
        ),
      },
    );

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      console.error("[leads] Brevo error:", errText);
      return jsonResponse(
        { ok: false, message: `Failed to submit lead. ${errText.slice(0, 180)}` },
        502,
        headers,
      );
    }

    await sendInternalNotification(payload, brevoApiKey);

    return jsonResponse({ ok: true, pendingConfirmation: isNewsletterDoiEnabled }, 200, headers);
  } catch (err) {
    console.error("[leads] Network error:", err);
    return jsonResponse({ ok: false, message: "Lead submission failed." }, 500, headers);
  }
};
