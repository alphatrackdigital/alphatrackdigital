import { buildLeadDedupeKey, getIdempotencyRecord, markIdempotencyKey } from "./lib/idempotency.mjs";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const buckets = globalThis.__atdLeadRequestBuckets ?? new Map();
globalThis.__atdLeadRequestBuckets = buckets;

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

const json = (payload, init = {}) =>
  new Response(JSON.stringify(payload), {
    status: init.status ?? 200,
    headers: { "content-type": "application/json", "cache-control": "no-store", ...(init.headers ?? {}) },
  });

const getEnv = (name) => {
  if (globalThis.Netlify?.env?.get) return globalThis.Netlify.env.get(name);
  if (typeof process !== "undefined") return process.env[name];
  return undefined;
};

const isAllowedOrigin = (origin) => {
  if (!origin) return false;
  try {
    const url = new URL(origin);
    return url.protocol === "https:" && (
      allowedHostnames.has(url.hostname) ||
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

const getClientIp = (request) =>
  request.headers.get("x-nf-client-connection-ip") ||
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("client-ip") ||
  "unknown";

const isRateLimited = (key) => {
  const now = Date.now();
  const existing = buckets.get(key);
  if (!existing || now - existing.windowStart > RATE_LIMIT_WINDOW_MS) {
    buckets.set(key, { count: 1, windowStart: now });
    return false;
  }
  existing.count += 1;
  buckets.set(key, existing);
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
};

const validSources = ["contact_form", "tracking_audit_offer", "newsletter"];

const isValidLeadPayload = (data) => {
  if (!data || typeof data !== "object") return false;
  if (!validSources.includes(data.source)) return false;
  if (typeof data.email !== "string" || !data.email.trim()) return false;
  if (data.source !== "newsletter") {
    if (typeof data.firstName !== "string" || !data.firstName.trim()) return false;
    if (typeof data.lastName !== "string" || !data.lastName.trim()) return false;
  }
  if (data.source === "contact_form" && (!Array.isArray(data.serviceInterest) || data.serviceInterest.length === 0)) return false;
  if (data.source === "newsletter" && data.optIn !== true) return false;
  if (data.source === "tracking_audit_offer") {
    if (typeof data.websiteUrl !== "string" || !data.websiteUrl.trim()) return false;
    if (typeof data.monthlyAdSpend !== "string" || !data.monthlyAdSpend.trim()) return false;
    if (typeof data.adPlatforms !== "string" || !data.adPlatforms.trim()) return false;
  }
  return true;
};

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

const buildMessageAttribute = (data) => data.message?.trim() || "";

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

  if (data.optIn === true) {
    nextAttributes.OPT_IN = true;
    const consentAttribute = getEnv("BREVO_CONSENT_ATTRIBUTE")?.trim();
    const consentTimestampAttribute = getEnv("BREVO_CONSENT_TIMESTAMP_ATTRIBUTE")?.trim();
    if (consentAttribute) nextAttributes[consentAttribute] = "Yes";
    if (consentTimestampAttribute) nextAttributes[consentTimestampAttribute] = timestamp;
  }

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

const toBrevoDoiPayload = (data, listId, templateId, redirectionUrl) => ({
  email: data.email,
  includeListIds: [listId],
  templateId,
  redirectionUrl,
  attributes: withCampaignAndConsentAttributes({ SOURCE: "Newsletter" }, data),
});

const ensureContactInList = async (email, listId, apiKey) => {
  const response = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`, {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
    body: JSON.stringify({ emails: [email] }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.warn("Brevo list add failed after contact upsert", {
      listId,
      message: errorText.slice(0, 180),
    });
  }
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

const escapeHtml = (value) =>
  String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

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

const sendInternalNotification = async (data, apiKey) => {
  const config = leadNotificationConfig[data.source];
  if (!config) return;
  const { textContent, htmlContent } = buildNotificationEmail(data, config);
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": apiKey },
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

  if (isRateLimited(getClientIp(request))) {
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

  if (!brevoApiKey) {
    return json({ ok: false, message: "Lead service is not configured." }, { status: 500, headers: corsHeaders });
  }

  const listId = payload.source === "contact_form" ? contactListId : payload.source === "newsletter" ? newsletterListId : auditListId;
  const dedupeKey = buildLeadDedupeKey(payload);
  const isDuplicate = Boolean(await getIdempotencyRecord(dedupeKey));

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

    if (!pendingConfirmation) await ensureContactInList(payload.email, listId, brevoApiKey);

    if (!isDuplicate) {
      await markIdempotencyKey(dedupeKey, {
        source: payload.source,
        emailHash: dedupeKey.split("/").at(-1),
        listId,
      });
      await sendInternalNotification(payload, brevoApiKey);
    }

    return json({ ok: true, pendingConfirmation, duplicate: isDuplicate }, { headers: corsHeaders });
  } catch {
    return json({ ok: false, message: "Unable to submit lead right now." }, { status: 500, headers: corsHeaders });
  }
};
