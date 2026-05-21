import type { Handler, HandlerEvent } from "@netlify/functions";
import { corsHeaders, jsonResponse } from "./lib/http";

const SOURCE = "ATD Website Exit Popup";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
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

function getClientIp(event: HandlerEvent): string {
  const direct = event.headers["x-nf-client-connection-ip"];
  if (direct) return direct;
  const forwarded = event.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  return event.headers["client-ip"] || "unknown";
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidOptionalWebsite(value: string): boolean {
  if (!value) return true;
  try {
    const url = new URL(value.startsWith("http") ? value : `https://${value}`);
    return url.hostname.includes(".");
  } catch {
    return false;
  }
}

function normalizeWebsite(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
}

interface BrevoLead {
  firstName: string;
  email: string;
  website: string;
  optIn: boolean;
}

function validatePayload(payload: unknown): BrevoLead | null {
  if (!payload || typeof payload !== "object") return null;
  const d = payload as Record<string, unknown>;

  const firstName = typeof d.firstName === "string" ? d.firstName.trim() : "";
  const email = typeof d.email === "string" ? d.email.trim().toLowerCase() : "";
  const website = typeof d.website === "string" ? d.website.trim() : "";
  const optIn = d.optIn === true;

  if (!firstName || !isValidEmail(email) || !isValidOptionalWebsite(website)) {
    return null;
  }

  return { firstName, email, website: normalizeWebsite(website), optIn };
}

function buildAttributes(lead: BrevoLead): Record<string, unknown> {
  const attrs: Record<string, unknown> = {
    FIRSTNAME: lead.firstName,
    WEBSITE: lead.website,
    SOURCE,
  };

  if (lead.optIn) {
    attrs.OPT_IN = true;

    const consentAttr = process.env.BREVO_CONSENT_ATTRIBUTE?.trim();
    const consentTsAttr = process.env.BREVO_CONSENT_TIMESTAMP_ATTRIBUTE?.trim();

    if (consentAttr) attrs[consentAttr] = "Yes";
    if (consentTsAttr) attrs[consentTsAttr] = new Date().toISOString();
  }

  return attrs;
}

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = corsHeaders(event.headers["origin"]);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405, headers);
  }

  const clientIp = getClientIp(event);
  if (isRateLimited(clientIp)) {
    return jsonResponse(
      { ok: false, message: "Too many requests. Please try again shortly." },
      429,
      headers,
    );
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body || "");
  } catch {
    return jsonResponse({ ok: false, message: "Invalid JSON payload." }, 400, headers);
  }

  const lead = validatePayload(payload);
  if (!lead) {
    return jsonResponse(
      { ok: false, message: "Please check your details and try again." },
      400,
      headers,
    );
  }

  const brevoApiKey = process.env.BREVO_API_KEY?.trim();
  const brevoListId = Number(process.env.BREVO_LIST_ID ?? 10);

  if (!brevoApiKey || !Number.isInteger(brevoListId) || brevoListId <= 0) {
    return jsonResponse(
      { ok: false, message: "Lead service is not configured." },
      500,
      headers,
    );
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
        attributes: buildAttributes(lead),
        listIds: [brevoListId],
        updateEnabled: true,
      }),
    });

    if (!brevoResponse.ok) {
      return jsonResponse(
        { ok: false, message: "Unable to submit lead right now." },
        502,
        headers,
      );
    }

    return jsonResponse({ ok: true }, 200, headers);
  } catch {
    return jsonResponse(
      { ok: false, message: "Unable to submit lead right now." },
      500,
      headers,
    );
  }
};
