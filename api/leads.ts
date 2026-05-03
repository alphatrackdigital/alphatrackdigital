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

interface Req {
  method?: string;
  body?: LeadPayload;
  headers: Record<string, string | string[] | undefined>;
  socket?: { remoteAddress?: string };
}

interface Res {
  status: (code: number) => Res;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestBuckets = new Map<string, { count: number; windowStart: number }>();

const isValidLeadPayload = (payload: unknown): payload is LeadPayload => {
  if (!payload || typeof payload !== "object") return false;
  const data = payload as Record<string, unknown>;
  if (data.source !== "contact_form" && data.source !== "tracking_audit_offer" && data.source !== "newsletter") return false;
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

const getClientIp = (req: Req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (Array.isArray(forwarded)) return forwarded[0] || "unknown";
  if (typeof forwarded === "string") return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "unknown";
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

const buildMessageAttribute = (data: LeadPayload) => {
  return data.message?.trim() || "";
};

const withConsentAttributes = (
  attributes: Record<string, string | boolean>,
  data: LeadPayload,
) => {
  if (data.optIn !== true) {
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
};

const toBrevoPayload = (data: LeadPayload, listId: number) => ({
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

const handler = async (req: Req, res: Res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ ok: false, message: "Too many requests. Please try again shortly." });
  }

  const payload = req.body;
  if (!isValidLeadPayload(payload)) {
    return res.status(400).json({ ok: false, message: "Invalid submission payload." });
  }

  const brevoApiKey = process.env.BREVO_API_KEY;
  const contactListId = Number(process.env.BREVO_CONTACT_LIST_ID || "2");
  const auditListId = Number(process.env.BREVO_AUDIT_LIST_ID || "3");
  const newsletterListId = Number(process.env.BREVO_NEWSLETTER_LIST_ID || "4");

  if (!brevoApiKey) {
    return res.status(500).json({ ok: false, message: "Lead service is not configured." });
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
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify(toBrevoPayload(payload, listId)),
    });

    if (!brevoResponse.ok) {
      const errorText = await brevoResponse.text();
      return res.status(502).json({
        ok: false,
        message: `Failed to submit lead to provider. ${errorText.slice(0, 180)}`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ ok: false, message: "Unable to submit lead right now." });
  }
};

export default handler;
