import { buildBookingDedupeKey, getIdempotencyRecord, markIdempotencyKey } from "./idempotency.js";

interface Req {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
}

interface Res {
  status: (code: number) => Res;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
}

const GA4_COLLECT_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const DEFAULT_EVENT_NAME = ["meeting", "booked", "confirmed"].join("_");

const getHeader = (headers: Req["headers"], name: string) => {
  const value = headers[name] ?? headers[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const getQueryValue = (req: Req, name: string) => {
  const value = req.query?.[name];
  return Array.isArray(value) ? value[0] : value;
};

const getEnv = (name: string) => process.env[name]?.trim();

const safeString = (value: unknown) => (typeof value === "string" ? value.trim() : "");

const findFirstString = (value: unknown, keys: string[]): string => {
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
};

const toNumericHash = (value: string) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0).toString();
};

const getClientId = (payload: unknown) => {
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
};

const getSessionId = (payload: unknown) => {
  const explicitSessionId = findFirstString(payload, ["session_id", "sessionId", "ga_session_id", "gaSessionId"]);
  if (/^\d+$/.test(explicitSessionId)) return explicitSessionId;

  const meetingStart = findFirstString(payload, ["meeting_start_timestamp", "meetingStartTimestamp", "startTime"]);
  const startTimestamp = Date.parse(meetingStart);
  if (Number.isFinite(startTimestamp)) {
    return Math.floor(startTimestamp / 1000).toString();
  }

  return Math.floor(Date.now() / 1000).toString();
};

const getMeetingParams = (payload: unknown) => {
  const meetingName = findFirstString(payload, ["meeting_name", "meetingName", "name"]);
  const meetingStart = findFirstString(payload, ["meeting_start_timestamp", "meetingStartTimestamp", "startTime"]);
  const meetingEnd = findFirstString(payload, ["meeting_end_timestamp", "meetingEndTimestamp", "endTime"]);
  const meetingLocation = findFirstString(payload, ["meeting_location", "meetingLocation", "location"]);
  const meetingId = findFirstString(payload, ["meeting_id", "meetingId", "booking_id", "bookingId", "id"]);
  const participantEmail = findFirstString(payload, ["EMAIL", "email"]);
  const pageLocation =
    findFirstString(payload, ["page_location", "pageLocation"]) ||
    getEnv("GA4_BOOKING_PAGE_LOCATION") ||
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

const shouldIgnorePayload = (payload: unknown) => {
  const eventText = [
    findFirstString(payload, ["event", "event_name", "eventName", "type", "status", "action"]),
    findFirstString(payload, ["meeting_status", "meetingStatus"]),
  ]
    .join(" ")
    .toLowerCase();

  return /\bcancel|cancelled|canceled|deleted\b/.test(eventText);
};

const authenticate = (req: Req) => {
  const secret = getEnv("BREVO_MEETING_WEBHOOK_SECRET");
  if (!secret) return false;

  const providedSecret =
    getHeader(req.headers, "x-atd-webhook-secret") ||
    getHeader(req.headers, "x-brevo-webhook-secret") ||
    getQueryValue(req, "token");

  return providedSecret === secret;
};

const sendGa4Event = async (payload: unknown, meetingParams?: ReturnType<typeof getMeetingParams>) => {
  const measurementId = getEnv("GA4_MEASUREMENT_ID");
  const apiSecret = getEnv("GA4_MEASUREMENT_PROTOCOL_API_SECRET");

  if (!measurementId || !apiSecret) {
    throw new Error("GA4 Measurement Protocol is not configured.");
  }

  const eventName = getEnv("GA4_MEETING_BOOKED_EVENT_NAME") || DEFAULT_EVENT_NAME;
  const params = meetingParams || getMeetingParams(payload);
  const debugMode = getEnv("GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE") === "true";

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

  console.info("Brevo meeting booking sent to GA4.", {
    event_name: eventName,
    booking_id: params.booking_id,
    session_id: params.session_id,
    debug_mode: debugMode,
  });
};

const handler = async (req: Req, res: Res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  if (!authenticate(req)) {
    return res.status(401).json({ ok: false, message: "Unauthorized webhook request." });
  }

  if (!req.body || typeof req.body !== "object") {
    return res.status(400).json({ ok: false, message: "Invalid JSON payload." });
  }

  if (shouldIgnorePayload(req.body)) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  const meetingParams = getMeetingParams(req.body);
  const dedupeKey = buildBookingDedupeKey(meetingParams);
  const existingBooking = await getIdempotencyRecord(dedupeKey);
  const isDuplicate = Boolean(existingBooking);

  try {
    if (!isDuplicate) {
      await sendGa4Event(req.body, meetingParams);
      await markIdempotencyKey(dedupeKey, {
        source: "brevo_meetings_webhook",
        bookingId: meetingParams.booking_id,
      });
    }

    return res.status(200).json({ ok: true, duplicate: isDuplicate });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to track booking.";
    console.error("Brevo meeting booking GA4 tracking failed.", { message });
    return res.status(500).json({ ok: false, message });
  }
};

export default handler;
