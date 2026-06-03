import type { Handler, HandlerEvent } from "@netlify/functions";
import { corsHeaders, jsonResponse } from "./lib/http";

const GA4_COLLECT_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const DEFAULT_EVENT_NAME = "meeting_booked_confirmed";

function getEnv(name: string): string | undefined {
  return process.env[name]?.trim() || undefined;
}

function safeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function findFirstString(value: unknown, keys: string[]): string {
  if (!value || typeof value !== "object") return "";

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstString(item, keys);
      if (found) return found;
    }

    return "";
  }

  const record = value as Record<string, unknown>;

  for (const key of keys) {
    const direct = safeString(record[key]);
    if (direct) return direct;
  }

  for (const nested of Object.values(record)) {
    const found = findFirstString(nested, keys);
    if (found) return found;
  }

  return "";
}

function toNumericHash(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0).toString();
}

function getClientId(payload: unknown): string {
  const explicitClientId = findFirstString(payload, ["client_id", "clientId", "ga_client_id", "gaClientId"]);
  if (explicitClientId) return explicitClientId;

  const gaCookie = findFirstString(payload, ["_ga", "ga_cookie", "gaCookie"]);
  const cookieMatch = gaCookie.match(/GA\d+\.\d+\.(\d+\.\d+)$/);
  if (cookieMatch?.[1]) return cookieMatch[1];

  const stableBookingValue = findFirstString(payload, [
    "meeting_id",
    "meetingId",
    "booking_id",
    "bookingId",
    "meeting_start_timestamp",
  ]);
  const hash = toNumericHash(stableBookingValue || `${Date.now()}`);
  return `${hash.slice(0, 10) || "1"}.${hash.slice(10, 20) || "1"}`;
}

function getMeetingParams(payload: unknown) {
  const meetingName = findFirstString(payload, ["meeting_name", "meetingName", "name"]);
  const meetingStart = findFirstString(payload, ["meeting_start_timestamp", "meetingStartTimestamp", "startTime"]);
  const meetingEnd = findFirstString(payload, ["meeting_end_timestamp", "meetingEndTimestamp", "endTime"]);
  const meetingLocation = findFirstString(payload, ["meeting_location", "meetingLocation", "location"]);
  const meetingId = findFirstString(payload, ["meeting_id", "meetingId", "booking_id", "bookingId", "id"]);
  const participantEmail = findFirstString(payload, ["EMAIL", "email"]);

  return {
    booking_id: meetingId || toNumericHash(`${meetingName}:${meetingStart}`),
    booking_email_present: Boolean(participantEmail),
    meeting_name: meetingName || "Brevo meeting",
    meeting_start_timestamp: meetingStart,
    meeting_end_timestamp: meetingEnd,
    meeting_location: meetingLocation,
    source: "brevo_meetings_webhook",
    engagement_time_msec: 1,
  };
}

function shouldIgnorePayload(payload: unknown): boolean {
  const eventText = [
    findFirstString(payload, ["event", "event_name", "eventName", "type", "status", "action"]),
    findFirstString(payload, ["meeting_status", "meetingStatus"]),
  ]
    .join(" ")
    .toLowerCase();

  return /\bcancel|cancelled|canceled|deleted\b/.test(eventText);
}

function authenticate(event: HandlerEvent): boolean {
  const secret = getEnv("BREVO_MEETING_WEBHOOK_SECRET");
  if (!secret) return false;

  const headers = Object.fromEntries(
    Object.entries(event.headers).map(([key, value]) => [key.toLowerCase(), value]),
  );
  const rawQueryToken = new URLSearchParams(event.rawQuery || "").get("token") || undefined;
  const providedSecret =
    headers["x-atd-webhook-secret"] ||
    headers["x-brevo-webhook-secret"] ||
    event.queryStringParameters?.token ||
    rawQueryToken;

  return providedSecret === secret;
}

async function createBrevoContact(payload: unknown) {
  const brevoApiKey = getEnv("BREVO_API_KEY");
  if (!brevoApiKey) return;

  const email = findFirstString(payload, ["EMAIL", "email"]);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

  const listId = Number(getEnv("BREVO_STRATEGY_CALL_LIST_ID") || "7");
  if (!Number.isInteger(listId) || listId <= 0) return;

  const firstName = findFirstString(payload, ["firstName", "first_name", "FIRSTNAME", "attendee_first_name"]);
  const lastName = findFirstString(payload, ["lastName", "last_name", "LASTNAME", "attendee_last_name"]);

  await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": brevoApiKey,
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      attributes: {
        ...(firstName ? { FIRSTNAME: firstName } : {}),
        ...(lastName ? { LASTNAME: lastName } : {}),
        SOURCE: "Strategy Call Booking",
      },
      listIds: [listId],
      updateEnabled: true,
    }),
  });
}

async function sendGa4Event(payload: unknown) {
  const measurementId = getEnv("GA4_MEASUREMENT_ID");
  const apiSecret = getEnv("GA4_MEASUREMENT_PROTOCOL_API_SECRET");

  if (!measurementId || !apiSecret) {
    throw new Error("GA4 Measurement Protocol is not configured.");
  }

  const eventName = getEnv("GA4_MEETING_BOOKED_EVENT_NAME") || DEFAULT_EVENT_NAME;
  const params = getMeetingParams(payload);
  const debugMode = getEnv("GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE") === "true";

  const response = await fetch(
    `${GA4_COLLECT_ENDPOINT}?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: getClientId(payload),
        non_personalized_ads: true,
        events: [
          {
            name: eventName,
            params: {
              ...params,
              ...(debugMode ? { debug_mode: true } : {}),
            },
          },
        ],
      }),
    },
  );

  if (!response.ok) {
    throw new Error("GA4 rejected the booking event.");
  }
}

export const handler: Handler = async (event: HandlerEvent) => {
  const headers = corsHeaders(event.headers["origin"]);

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(
      { ok: false, message: "Method not allowed." },
      405,
      { ...headers, Allow: "POST" },
    );
  }

  if (!authenticate(event)) {
    return jsonResponse({ ok: false, message: "Unauthorized webhook request." }, 401, headers);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse({ ok: false, message: "Invalid JSON payload." }, 400, headers);
  }

  if (!payload || typeof payload !== "object") {
    return jsonResponse({ ok: false, message: "Invalid JSON payload." }, 400, headers);
  }

  if (shouldIgnorePayload(payload)) {
    return jsonResponse({ ok: true, ignored: true }, 200, headers);
  }

  const [ga4Result, brevoResult] = await Promise.allSettled([
    sendGa4Event(payload),
    createBrevoContact(payload).catch(() => null),
  ]);

  if (ga4Result.status === "rejected") {
    const message =
      ga4Result.reason instanceof Error ? ga4Result.reason.message : "Unable to track booking.";
    return jsonResponse({ ok: false, message }, 500, headers);
  }

  return jsonResponse({ ok: true, crm: brevoResult.status === "fulfilled" }, 200, headers);
};
