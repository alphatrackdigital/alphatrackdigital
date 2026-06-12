import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  buildBookingDedupeKey,
  getIdempotencyRecord,
  markIdempotencyKey,
} from "./_lib/idempotency";

const GA4_COLLECT_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const DEFAULT_EVENT_NAME = ["meeting", "booked", "confirmed"].join("_");

const safeString = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

const findFirstString = (value: unknown, keys: string[]): string => {
  if (!value || typeof value !== "object") return "";

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstString(item, keys);
      if (found) return found;
    }
    return "";
  }

  const obj = value as Record<string, unknown>;
  for (const key of keys) {
    const direct = safeString(obj[key]);
    if (direct) return direct;
  }

  for (const nested of Object.values(obj)) {
    const found = findFirstString(nested, keys);
    if (found) return found;
  }

  return "";
};

const toNumericHash = (value: string): string => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash >>> 0).toString();
};

const getClientId = (payload: unknown): string => {
  const explicitClientId = findFirstString(payload, ["client_id", "clientId", "ga_client_id", "gaClientId"]);
  if (explicitClientId) return explicitClientId;

  const gaCookie = findFirstString(payload, ["_ga", "ga_cookie", "gaCookie"]);
  const cookieMatch = gaCookie.match(/GA\d+\.\d+\.(\d+\.\d+)$/);
  if (cookieMatch?.[1]) return cookieMatch[1];

  const stableBookingValue = findFirstString(payload, [
    "meeting_id", "meetingId", "booking_id", "bookingId", "meeting_start_timestamp",
  ]);
  const hash = toNumericHash(stableBookingValue || `${Date.now()}`);
  return `${hash.slice(0, 10) || "1"}.${hash.slice(10, 20) || "1"}`;
};

const getSessionId = (payload: unknown): string => {
  const explicitSessionId = findFirstString(payload, ["session_id", "sessionId", "ga_session_id", "gaSessionId"]);
  if (/^\d+$/.test(explicitSessionId)) return explicitSessionId;

  const meetingStart = findFirstString(payload, ["meeting_start_timestamp", "meetingStartTimestamp", "startTime"]);
  const startTimestamp = Date.parse(meetingStart);
  if (Number.isFinite(startTimestamp)) return Math.floor(startTimestamp / 1000).toString();

  return Math.floor(Date.now() / 1000).toString();
};

const getMeetingParams = (payload: unknown): Record<string, unknown> => {
  const meetingName = findFirstString(payload, ["meeting_name", "meetingName", "name"]);
  const meetingStart = findFirstString(payload, ["meeting_start_timestamp", "meetingStartTimestamp", "startTime"]);
  const meetingEnd = findFirstString(payload, ["meeting_end_timestamp", "meetingEndTimestamp", "endTime"]);
  const meetingLocation = findFirstString(payload, ["meeting_location", "meetingLocation", "location"]);
  const meetingId = findFirstString(payload, ["meeting_id", "meetingId", "booking_id", "bookingId", "id"]);
  const participantEmail = findFirstString(payload, ["EMAIL", "email"]);
  const pageLocation =
    findFirstString(payload, ["page_location", "pageLocation"]) ||
    process.env.GA4_BOOKING_PAGE_LOCATION ||
    "https://alphatrack.digital/book-a-call";

  return {
    booking_id: meetingId || toNumericHash(`${meetingName}:${meetingStart}`),
    booking_email_present: Boolean(participantEmail),
    meeting_name: meetingName || "Brevo meeting",
    meeting_start_timestamp: meetingStart,
    meeting_end_timestamp: meetingEnd,
    meeting_location: meetingLocation,
    source: "brevo_meetings_webhook",
    page_location: pageLocation,
    page_title: "Book A Free Strategy Call | AlphaTrack Digital",
    session_id: getSessionId(payload),
    engagement_time_msec: 1,
  };
};

const shouldIgnorePayload = (payload: unknown): boolean => {
  const eventText = [
    findFirstString(payload, ["event", "event_name", "eventName", "type", "status", "action"]),
    findFirstString(payload, ["meeting_status", "meetingStatus"]),
  ]
    .join(" ")
    .toLowerCase();
  return /\bcancel|cancelled|canceled|deleted\b/.test(eventText);
};

const authenticate = (req: VercelRequest): boolean => {
  const secret = process.env.BREVO_MEETING_WEBHOOK_SECRET;
  if (!secret) return false;

  const providedSecret =
    String(req.headers["x-atd-webhook-secret"] || "") ||
    String(req.headers["x-brevo-webhook-secret"] || "") ||
    String(req.query.token || "");

  return providedSecret === secret;
};

const createBrevoContact = async (payload: unknown): Promise<void> => {
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (!brevoApiKey) return;

  const email = findFirstString(payload, ["EMAIL", "email"]);
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;

  const listId = Number(process.env.BREVO_STRATEGY_CALL_LIST_ID || "7");
  if (!Number.isInteger(listId) || listId <= 0) return;

  const firstName = findFirstString(payload, ["firstName", "first_name", "FIRSTNAME", "attendee_first_name"]);
  const lastName = findFirstString(payload, ["lastName", "last_name", "LASTNAME", "attendee_last_name"]);
  const normalizedEmail = email.trim().toLowerCase();

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": brevoApiKey },
    body: JSON.stringify({
      email: normalizedEmail,
      attributes: {
        ...(firstName ? { FIRSTNAME: firstName } : {}),
        ...(lastName ? { LASTNAME: lastName } : {}),
        SOURCE: "Strategy Call Booking",
      },
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!response.ok) throw new Error("Brevo rejected the booking contact.");

  const listResponse = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`, {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": brevoApiKey },
    body: JSON.stringify({ emails: [normalizedEmail] }),
  });

  if (!listResponse.ok) throw new Error("Brevo rejected the booking list membership.");
};

const sendGa4Event = async (payload: unknown, meetingParams: Record<string, unknown>): Promise<void> => {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_MEASUREMENT_PROTOCOL_API_SECRET;

  if (!measurementId || !apiSecret) throw new Error("GA4 Measurement Protocol is not configured.");

  const eventName = process.env.GA4_MEETING_BOOKED_EVENT_NAME || DEFAULT_EVENT_NAME;
  const debugMode = process.env.GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE === "true";

  const response = await fetch(
    `${GA4_COLLECT_ENDPOINT}?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: getClientId(payload),
        non_personalized_ads: true,
        events: [
          {
            name: eventName,
            params: { ...meetingParams, ...(debugMode ? { debug_mode: true } : {}) },
          },
        ],
      }),
    }
  );

  if (!response.ok) throw new Error("GA4 rejected the booking event.");

  console.info("Brevo meeting booking sent to GA4.", {
    event_name: eventName,
    booking_id: meetingParams.booking_id,
    session_id: meetingParams.session_id,
    debug_mode: debugMode,
  });
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  if (!authenticate(req)) {
    return res.status(401).json({ ok: false, message: "Unauthorized webhook request." });
  }

  const payload = req.body;
  if (!payload || typeof payload !== "object") {
    return res.status(400).json({ ok: false, message: "Invalid JSON payload." });
  }

  if (shouldIgnorePayload(payload)) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  const meetingParams = getMeetingParams(payload);
  const dedupeKey = buildBookingDedupeKey(meetingParams as { booking_id?: string });
  const isDuplicate = Boolean(await getIdempotencyRecord(dedupeKey));

  const [ga4Result, brevoResult] = await Promise.allSettled([
    isDuplicate ? Promise.resolve() : sendGa4Event(payload, meetingParams),
    createBrevoContact(payload).catch(() => null),
  ]);

  if (ga4Result.status === "rejected") {
    const message = ga4Result.reason instanceof Error ? ga4Result.reason.message : "Unable to track booking.";
    console.error("Brevo meeting booking GA4 tracking failed.", { message });
    return res.status(500).json({ ok: false, message });
  }

  if (!isDuplicate) {
    await markIdempotencyKey(dedupeKey, {
      source: "brevo_meetings_webhook",
      bookingId: meetingParams.booking_id,
    });
  }

  const brevoOk = brevoResult.status === "fulfilled";
  return res.status(200).json({ ok: true, crm: brevoOk, duplicate: isDuplicate });
}
