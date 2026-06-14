import mongoose from "mongoose";
import { buildLeadDedupeKey, getIdempotencyRecord, markIdempotencyKey } from "./lib/idempotency.mjs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;

const requestBuckets = globalThis.__atdLeadRequestBuckets ?? new Map();
globalThis.__atdLeadRequestBuckets = requestBuckets;

const json = (payload, init = {}) =>
  new Response(JSON.stringify(payload), {
    status: init.status ?? 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      ...(init.headers ?? {}),
    },
  });

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

const isAllowedOrigin = (origin) => {
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

const getCorsHeaders = (request) => {
  const origin = request.headers.get("origin");
  const headers = {
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization",
  };
  if (isAllowedOrigin(origin)) {
    headers["access-control-allow-origin"] = origin;
    headers.vary = "Origin";
  }
  return headers;
};

const getEnv = (name) => {
  if (globalThis.Netlify?.env?.get) return globalThis.Netlify.env.get(name);
  if (typeof process !== "undefined") return process.env[name];
  return undefined;
};

// --- MongoDB ---

const ContactSchema = new mongoose.Schema(
  {
    source: String,
    firstName: String,
    lastName: String,
    email: String,
    company: { type: String, default: "" },
    message: { type: String, default: "" },
    websiteUrl: { type: String, default: "" },
    monthlyAdSpend: { type: String, default: "" },
    adPlatforms: { type: String, default: "" },
    serviceInterest: { type: String, default: "" },
    monthlyBudget: { type: String, default: "" },
    ip: { type: String, default: "" },
    read: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Contact =
  mongoose.models["Contact"] || mongoose.model("Contact", ContactSchema);

const saveToMongoDB = async (payload, ip) => {
  const uri = getEnv("MONGODB_URI");
  if (!uri) {
    console.warn("[leads] MONGODB_URI is not set — skipping DB save");
    return;
  }
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri, { dbName: "alphatrack" });
    }
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

// --- Validation ---

const isValidLeadPayload = (payload) => {
  if (!payload || typeof payload !== "object") return false;
  const data = payload;
  const validSources = ["contact_form", "tracking_audit_offer", "newsletter"];
  if (!validSources.includes(data.source)) return false;
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

const getClientIp = (request) => {
  const directIp = request.headers.get("x-nf-client-connection-ip");
  if (directIp) return directIp;
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = request.headers.get("client-ip");
  if (realIp) return realIp;
  return "unknown";
};

const isRateLimited = (key) => {
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

// --- Brevo helpers ---

const buildMessageAttribute = (data) => data.message?.trim() || "";

const sourceLabels = {
  contact_form: "Contact Form",
  newsletter: "Newsletter",
  tracking_audit_offer: "Tracking Audit Landing Page",
};

const campaignMetadata = {
  contact_form: { leadSource: "contact_form", websiteRoute: "/contact-us", offer: "general-enquiry" },
  newsletter: { leadSource: "newsletter", websiteRoute: "/newsletter", offer: "newsletter-signup" },
  tracking_audit_offer: { leadSource: "tracking_audit_offer", websiteRoute: "/offer/tracking-audit", offer: "tracking-audit" },
};

const leadNotificationConfig = {
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
    senderEmail: "marketing@alphatrack.digital",
    recipients: ["marketing@alphatrack.digital"],
    subject: "New newsletter signup",
    label: "Newsletter signup",
  },
};

const crmConfig = {
  ownerId: "68bf7b64faf0e9c68b0ccdb4",
  pipelineId: "68bf7ba1f6e11688cf7a2164",
  taskTypeId: "68bf7ba1f6e11688cf7a215e",
  stages: {
    new: "8dae99f7-6de0-4c1f-9ca6-b5ee72a40d85",
    qualifying: "089c5fc7-da86-489a-a3b5-503bc5d4bd54",
  },
};

const getNextBusinessDayIso = () => {
  const dueDate = new Date();
  dueDate.setUTCDate(dueDate.getUTCDate() + 1);
  dueDate.setUTCHours(10, 0, 0, 0);

  const day = dueDate.getUTCDay();
  if (day === 6) dueDate.setUTCDate(dueDate.getUTCDate() + 2);
  if (day === 0) dueDate.setUTCDate(dueDate.getUTCDate() + 1);

  return dueDate.toISOString();
};

const getLeadDisplayName = (data) => `${data.firstName || ""} ${data.lastName || ""}`.trim() || data.email;

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const buildNotificationRows = (data) => [
  ["Source", sourceLabels[data.source] || data.source],
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
].filter(([, value]) => String(value).trim().length > 0);

const buildNotificationEmail = (data, config) => {
  const rows = buildNotificationRows(data);
  const textContent = [config.label, "", ...rows.map(([label, value]) => `${label}: ${value}`)].join("\n");
  const htmlRows = rows.map(([label, value]) => `
    <tr>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 700;">${escapeHtml(label)}</td>
      <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb;">${escapeHtml(value).replace(/\n/g, "<br />")}</td>
    </tr>`).join("");
  const htmlContent = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #111827; line-height: 1.5;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">${escapeHtml(config.label)}</h1>
      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 720px; border: 1px solid #e5e7eb;">
        ${htmlRows}
      </table>
    </div>`;
  return { textContent, htmlContent };
};

const getCrmHandoff = (data) => {
  if (data.source === "contact_form") {
    return {
      dealStage: crmConfig.stages.qualifying,
      dealName: `${data.company || getLeadDisplayName(data)} - General enquiry`,
      taskName: `Reply to contact enquiry - ${data.company || getLeadDisplayName(data)}`,
      taskNotes: "Website contact form enquiry. Review service interest and reply within 1 business day.",
    };
  }

  if (data.source === "tracking_audit_offer") {
    return {
      dealStage: crmConfig.stages.new,
      dealName: `${data.websiteUrl || data.company || getLeadDisplayName(data)} - Tracking audit`,
      taskName: `Review tracking audit request - ${data.websiteUrl || getLeadDisplayName(data)}`,
      taskNotes: "Tracking audit request. Review website, ad platforms, and monthly ad spend within 1 business day.",
    };
  }

  return null;
};

const createCrmDealAndTask = async (data, contactId, apiKey) => {
  const handoff = getCrmHandoff(data);
  if (!handoff || !contactId) return;

  const descriptionRows = buildNotificationRows(data)
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  const dealResponse = await fetch("https://api.brevo.com/v3/crm/deals", {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      name: handoff.dealName,
      attributes: {
        deal_owner: crmConfig.ownerId,
        pipeline: crmConfig.pipelineId,
        deal_stage: handoff.dealStage,
        deal_description: descriptionRows,
      },
      linkedContactsIds: [Number(contactId)],
    }),
  });

  if (!dealResponse.ok) {
    const errorText = await dealResponse.text();
    throw new Error(`Brevo CRM deal creation failed. ${errorText.slice(0, 180)}`);
  }

  const deal = await dealResponse.json().catch(() => ({}));
  const taskResponse = await fetch("https://api.brevo.com/v3/crm/tasks", {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({
      name: handoff.taskName,
      date: getNextBusinessDayIso(),
      taskTypeId: crmConfig.taskTypeId,
      assignToId: crmConfig.ownerId,
      contactsIds: [Number(contactId)],
      dealsIds: deal.id ? [deal.id] : [],
      notes: handoff.taskNotes,
      done: false,
    }),
  });

  if (!taskResponse.ok) {
    const errorText = await taskResponse.text();
    throw new Error(`Brevo CRM task creation failed. ${errorText.slice(0, 180)}`);
  }
};

const sendInternalNotification = async (data, brevoApiKey) => {
  const config = leadNotificationConfig[data.source];
  if (!config) return;
  const { textContent, htmlContent } = buildNotificationEmail(data, config);
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
      tags: [data.source],
    }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send internal notification. ${errorText.slice(0, 180)}`);
  }
};

const trySendInternalNotification = async (payload, brevoApiKey, listId) => {
  try {
    await sendInternalNotification(payload, brevoApiKey);
  } catch (error) {
    console.error("Lead notification email failed after Brevo contact capture", {
      source: payload.source,
      listId,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const normalizeRoute = (value) => {
  if (typeof value !== "string" || !value.trim()) return "";
  const trimmed = value.trim();
  try {
    const url = new URL(trimmed);
    return url.pathname || "/";
  } catch {
    return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  }
};

const getSubmittedRoute = (data) =>
  normalizeRoute(data.websiteRoute) ||
  normalizeRoute(data.route) ||
  normalizeRoute(data.pagePath) ||
  campaignMetadata[data.source]?.websiteRoute ||
  "/";

const withCampaignAndConsentAttributes = (attributes, data) => {
  const meta = campaignMetadata[data.source] ?? {};
  const timestamp = new Date().toISOString();
  const nextAttributes = {
    ...attributes,
    LEAD_SOURCE: meta.leadSource ?? data.source,
    WEBSITE_ROUTE: getSubmittedRoute(data),
    OFFER: meta.offer ?? "",
    CONSENT_STATUS: data.optIn === true ? "opted_in" : "not_provided",
    CONSENT_TIMESTAMP: timestamp,
  };

  if (data.optIn !== true) return nextAttributes;

  nextAttributes.OPT_IN = true;
  const consentAttribute = getEnv("BREVO_CONSENT_ATTRIBUTE")?.trim();
  const consentTimestampAttribute = getEnv("BREVO_CONSENT_TIMESTAMP_ATTRIBUTE")?.trim();
  if (consentAttribute) nextAttributes[consentAttribute] = "Yes";
  if (consentTimestampAttribute) nextAttributes[consentTimestampAttribute] = timestamp;
  return nextAttributes;
};

const toBrevoPayload = (data, listId) => ({
  email: data.email,
  attributes: withCampaignAndConsentAttributes({
    FIRSTNAME: data.firstName,
    LASTNAME: data.lastName,
    COMPANY: data.company || "",
    MESSAGE: buildMessageAttribute(data),
    WEBSITE: data.websiteUrl || "",
    AD_SPEND: data.monthlyAdSpend || "",
    AD_PLATFORMS: data.adPlatforms || "",
    SOURCE: sourceLabels[data.source] || data.source,
    SERVICE_INTEREST: Array.isArray(data.serviceInterest) ? data.serviceInterest.join(", ") : "",
    MONTHLY_BUDGET: data.monthlyBudget || "",
  }, data),
  listIds: [listId],
  updateEnabled: true,
});

const toBrevoDoiPayload = (data, listId, templateId, redirectUrl) => ({
  email: data.email,
  includeListIds: [listId],
  templateId,
  redirectionUrl: redirectUrl,
  attributes: withCampaignAndConsentAttributes({ SOURCE: "Newsletter" }, data),
});

const getBrevoContactIdByEmail = async (email, brevoApiKey) => {
  const response = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
    headers: { "api-key": brevoApiKey },
  });

  if (!response.ok) return undefined;

  const contact = await response.json().catch(() => ({}));
  return contact.id;
};

const ensureContactInList = async (email, listId, brevoApiKey) => {
  const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`, {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": brevoApiKey },
    body: JSON.stringify({ emails: [email] }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.warn("Brevo list add failed after contact upsert", { listId, message: errorText.slice(0, 180) });
  }
};

const tryEnsureContactInList = async (email, listId, brevoApiKey, source) => {
  try {
    await ensureContactInList(email, listId, brevoApiKey);
  } catch (error) {
    console.error("Secondary Brevo list membership call failed after contact upsert", {
      source,
      listId,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

// --- Handler ---

export default async (request) => {
  const corsHeaders = getCorsHeaders(request);

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { allow: "POST, OPTIONS", "cache-control": "no-store", ...corsHeaders },
    });
  }

  if (request.method !== "POST") {
    return json({ ok: false, message: "Method not allowed" }, { status: 405, headers: { allow: "POST, OPTIONS", ...corsHeaders } });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return json({ ok: false, message: "Too many requests. Please try again shortly." }, { status: 429, headers: corsHeaders });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid JSON payload." }, { status: 400, headers: corsHeaders });
  }

  if (!isValidLeadPayload(payload)) {
    return json({ ok: false, message: "Invalid submission payload." }, { status: 400, headers: corsHeaders });
  }

  const brevoApiKey = getEnv("BREVO_API_KEY");
  const contactListId = Number(getEnv("BREVO_CONTACT_LIST_ID") || "8");
  const auditListId = Number(getEnv("BREVO_AUDIT_LIST_ID") || "11");
  const newsletterListId = Number(getEnv("BREVO_NEWSLETTER_LIST_ID") || "9");
  const newsletterDoiTemplateId = Number(getEnv("BREVO_DOI_TEMPLATE_ID") || "0");
  const newsletterDoiRedirectUrl = getEnv("BREVO_DOI_REDIRECT_URL")?.trim() || "";

  const listId =
    payload.source === "contact_form"
      ? contactListId
      : payload.source === "newsletter"
        ? newsletterListId
        : auditListId;

  const dedupeKey = buildLeadDedupeKey(payload);
  const isDuplicate = Boolean(await getIdempotencyRecord(dedupeKey));

  // Always save to MongoDB first
  await saveToMongoDB(payload, clientIp);

  // Return early if Brevo is not configured
  if (!brevoApiKey) {
    if (!isDuplicate) {
      await markIdempotencyKey(dedupeKey, { source: payload.source, emailHash: dedupeKey.split("/").at(-1), listId });
    }
    return json({ ok: true, pendingConfirmation: false, duplicate: isDuplicate }, { headers: corsHeaders });
  }

  try {
    const isNewsletterDoiEnabled =
      payload.source === "newsletter" &&
      Number.isInteger(newsletterDoiTemplateId) &&
      newsletterDoiTemplateId > 0 &&
      newsletterDoiRedirectUrl.length > 0;

    if (isDuplicate && isNewsletterDoiEnabled) {
      return json({ ok: true, pendingConfirmation: true, duplicate: true }, { headers: corsHeaders });
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
            : toBrevoPayload(payload, listId),
        ),
      },
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
        return json({ ok: false, message: `Failed to submit lead to provider. ${errorText.slice(0, 180)}` }, { status: 502, headers: corsHeaders });
      }
    }

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      return json({ ok: false, message: `Failed to submit lead to provider. ${errorText.slice(0, 180)}` }, { status: 502, headers: corsHeaders });
    }

    const brevoContact = await brevoResponse.clone().json().catch(() => ({}));
    const brevoContactId = brevoContact.id || await getBrevoContactIdByEmail(payload.email, brevoApiKey);

    if (!pendingConfirmation) {
      await tryEnsureContactInList(payload.email, listId, brevoApiKey, payload.source);
    }

    if (!isDuplicate) {
      await markIdempotencyKey(dedupeKey, { source: payload.source, emailHash: dedupeKey.split("/").at(-1), listId });
      await createCrmDealAndTask(payload, brevoContactId, brevoApiKey).catch((error) => {
        console.error("Brevo CRM handoff failed after successful capture", {
          source: payload.source,
          listId,
          message: error instanceof Error ? error.message : String(error),
        });
      });
      await trySendInternalNotification(payload, brevoApiKey, listId);
    }

    return json({ ok: true, pendingConfirmation, duplicate: isDuplicate }, { headers: corsHeaders });
  } catch {
    return json({ ok: false, message: "Unable to submit lead right now." }, { status: 500, headers: corsHeaders });
  }
};
