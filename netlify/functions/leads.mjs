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

const getEnv = (name) => {
  if (globalThis.Netlify?.env?.get) {
    return globalThis.Netlify.env.get(name);
  }

  if (typeof process !== "undefined") {
    return process.env[name];
  }

  return undefined;
};

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

const buildMessageAttribute = (data) => {
  const baseMessage = data.message?.trim() || "";

  if (data.source !== "contact_form") {
    return baseMessage;
  }

  const consentNote = `Contact consent confirmed on ${new Date().toISOString()}`;
  return baseMessage ? `${baseMessage}\n\n${consentNote}` : consentNote;
};

const withConsentAttributes = (attributes, data) => {
  if (data.source !== "contact_form") {
    return attributes;
  }

  const consentAttribute = getEnv("BREVO_CONSENT_ATTRIBUTE")?.trim();
  const consentTimestampAttribute = getEnv("BREVO_CONSENT_TIMESTAMP_ATTRIBUTE")?.trim();

  if (consentAttribute) {
    attributes[consentAttribute] = "Yes";
  }

  if (consentTimestampAttribute) {
    attributes[consentTimestampAttribute] = new Date().toISOString();
  }

  return attributes;
};

const toBrevoPayload = (data, listId) => ({
  email: data.email,
  attributes: withConsentAttributes({
    FIRSTNAME: data.firstName,
    LASTNAME: data.lastName,
    COMPANY: data.company || "",
    MESSAGE: buildMessageAttribute(data),
    WEBSITE: data.websiteUrl || "",
    AD_SPEND: data.monthlyAdSpend || "",
    AD_PLATFORMS: data.adPlatforms || "",
    SOURCE: data.source === "contact_form"
      ? "Contact Form"
      : data.source === "newsletter"
        ? "Newsletter"
        : "Tracking Audit Landing Page",
    SERVICE_INTEREST: Array.isArray(data.serviceInterest) ? data.serviceInterest.join(", ") : "",
    MONTHLY_BUDGET: data.monthlyBudget || "",
  }, data),
  listIds: [listId],
  updateEnabled: true,
});

export default async (request) => {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        allow: "POST, OPTIONS",
        "cache-control": "no-store",
      },
    });
  }

  if (request.method !== "POST") {
    return json(
      { ok: false, message: "Method not allowed" },
      {
        status: 405,
        headers: { allow: "POST, OPTIONS" },
      },
    );
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return json(
      { ok: false, message: "Too many requests. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  if (!isValidLeadPayload(payload)) {
    return json({ ok: false, message: "Invalid submission payload." }, { status: 400 });
  }

  const brevoApiKey = getEnv("BREVO_API_KEY");
  const contactListId = Number(getEnv("BREVO_CONTACT_LIST_ID") || "2");
  const auditListId = Number(getEnv("BREVO_AUDIT_LIST_ID") || "3");
  const newsletterListId = Number(getEnv("BREVO_NEWSLETTER_LIST_ID") || "4");

  if (!brevoApiKey) {
    return json({ ok: false, message: "Lead service is not configured." }, { status: 500 });
  }

  const listId =
    payload.source === "contact_form"
      ? contactListId
      : payload.source === "newsletter"
        ? newsletterListId
        : auditListId;

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(toBrevoPayload(payload, listId)),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      return json(
        {
          ok: false,
          message: `Failed to submit lead to provider. ${errorText.slice(0, 180)}`,
        },
        { status: 502 },
      );
    }

    return json({ ok: true });
  } catch {
    return json({ ok: false, message: "Unable to submit lead right now." }, { status: 500 });
  }
};
