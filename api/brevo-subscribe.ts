interface SubscribePayload {
  firstName: string;
  email: string;
  website?: string;
  optIn?: boolean;
}

interface Req {
  method?: string;
  body?: SubscribePayload;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

interface Res {
  status: (code: number) => Res;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const SOURCE = "ATD Website Exit Popup";

const requestBuckets = new Map<string, { count: number; windowStart: number }>();

const allowedOrigins = new Set([
  "https://alphatrack.digital",
  "https://www.alphatrack.digital",
  "https://alphatra-serv.netlify.app",
  "https://backend--alphatra-serv.netlify.app",
  "https://website-internal-test.vercel.app",
  "https://atd-website-test.vercel.app",
  "https://atd-website-test-alphatrackdigitals-projects.vercel.app",
]);

const getHeader = (headers: Req["headers"], name: string) => {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const setCorsHeaders = (req: Req, res: Res) => {
  const origin = getHeader(req.headers, "origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
};

const getClientIp = (req: Req) => {
  const directIp = getHeader(req.headers, "x-nf-client-connection-ip");
  if (directIp) return directIp;

  const forwarded = getHeader(req.headers, "x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();

  return getHeader(req.headers, "client-ip") || req.socket?.remoteAddress || "unknown";
};

const isRateLimited = (key: string) => {
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

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidOptionalWebsite = (value: string) => {
  if (!value) return true;

  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
};

const normalizeWebsite = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
};

const validatePayload = (payload: unknown) => {
  if (!payload || typeof payload !== "object") return null;

  const data = payload as Record<string, unknown>;
  const firstName = typeof data.firstName === "string" ? data.firstName.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim().toLowerCase() : "";
  const website = typeof data.website === "string" ? data.website.trim() : "";
  const optIn = data.optIn === true;

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

const withConsentAttributes = (
  attributes: Record<string, string | boolean>,
  lead: ReturnType<typeof validatePayload> extends infer T ? NonNullable<T> : never,
) => {
  if (lead.optIn !== true) return attributes;

  attributes.OPT_IN = true;

  const consentAttribute = process.env.BREVO_CONSENT_ATTRIBUTE?.trim();
  const consentTimestampAttribute = process.env.BREVO_CONSENT_TIMESTAMP_ATTRIBUTE?.trim();

  if (consentAttribute) attributes[consentAttribute] = "Yes";
  if (consentTimestampAttribute) attributes[consentTimestampAttribute] = new Date().toISOString();

  return attributes;
};

const handler = async (req: Req, res: Res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ ok: false, message: "Too many requests. Please try again shortly." });
  }

  const lead = validatePayload(req.body);
  if (!lead) {
    return res.status(400).json({ ok: false, message: "Please check your details and try again." });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const brevoListId = Number(process.env.BREVO_LIST_ID || "10");

  if (!brevoApiKey || !Number.isInteger(brevoListId) || brevoListId <= 0) {
    return res.status(500).json({ ok: false, message: "Lead service is not configured." });
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
      return res.status(502).json({ ok: false, message: "Unable to submit lead right now." });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, message: "Unable to submit lead right now." });
  }
};

export default handler;
