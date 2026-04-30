const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const SOURCE = "ATD Website Exit Popup";

const requestBuckets = globalThis.__atdExitPopupRequestBuckets ?? new Map();
globalThis.__atdExitPopupRequestBuckets = requestBuckets;

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

const getClientIp = (request) => {
  const directIp = request.headers.get("x-nf-client-connection-ip");
  if (directIp) return directIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return request.headers.get("client-ip") || "unknown";
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

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidOptionalWebsite = (value) => {
  if (!value) return true;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return Boolean(url.hostname.includes("."));
  } catch {
    return false;
  }
};

const normalizeWebsite = (value) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
};

const validatePayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const firstName = typeof payload.firstName === "string" ? payload.firstName.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";
  const optIn = payload.optIn === true;

  if (!firstName || !isValidEmail(email) || !isValidOptionalWebsite(website)) {
    return null;
  }

  return {
    firstName,
    email,
    website: normalizeWebsite(website),
    optIn,
  };
};

const withConsentAttributes = (attributes, lead) => {
  if (lead.optIn !== true) {
    return attributes;
  }

  attributes.OPT_IN = true;

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

  const lead = validatePayload(payload);
  if (!lead) {
    return json({ ok: false, message: "Please check your details and try again." }, { status: 400 });
  }

  const brevoApiKey = getEnv("BREVO_API_KEY");
  const brevoListId = Number(getEnv("BREVO_LIST_ID"));

  if (!brevoApiKey || !Number.isInteger(brevoListId) || brevoListId <= 0) {
    return json({ ok: false, message: "Lead service is not configured." }, { status: 500 });
  }

  try {
    const brevoResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email: lead.email,
        attributes: withConsentAttributes({
          FIRSTNAME: lead.firstName,
          WEBSITE: lead.website,
          SOURCE,
        }, lead),
        listIds: [brevoListId],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      return json(
        { ok: false, message: "Unable to submit lead right now." },
        { status: 502 },
      );
    }

    return json({ ok: true });
  } catch {
    return json({ ok: false, message: "Unable to submit lead right now." }, { status: 500 });
  }
};

export const config = {
  path: "/api/brevo-subscribe",
};
