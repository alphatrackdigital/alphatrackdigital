const GA4_COLLECT_ENDPOINT = "https://www.google-analytics.com/mp/collect";
const DEFAULT_EVENT_NAME = "meeting_booked_confirmed";

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
    return globalThis.Netlify.env.get(name)?.trim();
  }

  if (typeof process !== "undefined") {
    return process.env[name]?.trim();
  }

  return undefined;
};

const safeString = (value) => (typeof value === "string" ? value.trim() : "");

const findFirstString = (value, keys) => {
  if (!value || typeof value !== "object") return "";

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstString(item, keys);
      if (found) return found;
    }

    return "";
  }

  for (const key of keys) {
    const direct = safeString(value[key]);
    if (direct) return direct;
  }

  for (const nested of Object.values(value)) {
    const found = findFirstString(nested, keys);
    if (found) return found;
  }

  return "";
};

const toNumericHash = (value) => {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash >>> 0).toString();
};

const getClientId = (payload) => {
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

const getSessionId = (payload) => {
  const explicitSessionId = findFirstString(payload, ["session_id", "sessionId", "ga_session_id", "gaSessionId"]);
  if (/^\d+$/.test(explicitSessionId)) return explicitSessionId;

  const meetingStart = findFirstString(payload, ["meeting_start_timestamp", "meetingStartTimestamp", "startTime"]);
  const startTimestamp = Date.parse(meetingStart);
  if (Number.isFinite(startTimestamp)) {
    return Math.floor(startTimestamp / 1000).toString();
  }

  return Math.floor(Date.now() / 1000).toString();
};

const getMeetingParams = (payload) => {
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

const shouldIgnorePayload = (payload) => {
  const eventText = [
    findFirstString(payload, ["event", "event_name", "eventName", "type", "status", "action"]),
    findFirstString(payload, ["meeting_status", "meetingStatus"]),
  ]
    .join(" ")
    .toLowerCase();

  return /\bcancel|cancelled|canceled|deleted\b/.test(eventText);
};

const authenticate = (request) => {
  const secret = getEnv("BREVO_MEETING_WEBHOOK_SECRET");
  if (!secret) return false;

  const url = new URL(request.url);
  const providedSecret =
    request.headers.get("x-atd-webhook-secret") ||
    request.headers.get("x-brevo-webhook-secret") ||
    url.searchParams.get("token");

  return providedSecret === secret;
};

const createBrevoContact = async (payload) => {
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
      "content-type": "application/json",
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
};

const sendGa4Event = async (payload) => {
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

export default async (request) => {
  if (request.method !== "POST") {
    return json(
      { ok: false, message: "Method not allowed" },
      { status: 405, headers: { allow: "POST" } },
    );
  }

  if (!authenticate(request)) {
    return json({ ok: false, message: "Unauthorized webhook request." }, { status: 401 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return json({ ok: false, message: "Invalid JSON payload." }, { status: 400 });
  }

  if (shouldIgnorePayload(payload)) {
    return json({ ok: true, ignored: true });
  }

  // Run GA4 tracking and Brevo contact creation in parallel.
  // Each is independently error-handled so a failure in one does not affect the other.
  const [ga4Result, brevoResult] = await Promise.allSettled([
    sendGa4Event(payload),
    createBrevoContact(payload).catch(() => null), // silent — CRM write is best-effort
  ]);

  if (ga4Result.status === "rejected") {
    const message =
      ga4Result.reason instanceof Error ? ga4Result.reason.message : "Unable to track booking.";
    console.error("Brevo meeting booking GA4 tracking failed.", { message });
    return json({ ok: false, message }, { status: 500 });
  }

  const brevoOk = brevoResult.status === "fulfilled";
  return json({ ok: true, crm: brevoOk });
};

export const config = {
  path: "/api/brevo-meeting-webhook",
};
