import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../../netlify/functions/brevo-meeting-webhook.mjs";

const webhookUrl = "https://alphatrack.digital/api/brevo-meeting-webhook?token=test-webhook-secret";

const buildRequest = (body: Record<string, unknown>, url = webhookUrl) =>
  new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

const bookedPayload = {
  account_email: "owner@example.com",
  currency: "EUR",
  event_participants: [
    {
      EMAIL: "visitor@example.com",
      FIRSTNAME: "Ada",
      LASTNAME: "Lovelace",
    },
  ],
  meeting_id: "meeting-123",
  meeting_end_timestamp: "2026-05-28T08:15:00.000Z",
  meeting_location: "Brevo video call",
  meeting_name: "Discovery",
  meeting_start_timestamp: "2026-05-28T08:00:00.000Z",
};

describe("brevo meeting webhook function", () => {
  beforeEach(() => {
    process.env.BREVO_MEETING_WEBHOOK_SECRET = "test-webhook-secret";
    process.env.GA4_MEASUREMENT_ID = "G-TEST1234";
    process.env.GA4_MEASUREMENT_PROTOCOL_API_SECRET = "ga4-secret";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.BREVO_MEETING_WEBHOOK_SECRET;
    delete process.env.GA4_MEASUREMENT_ID;
    delete process.env.GA4_MEASUREMENT_PROTOCOL_API_SECRET;
    delete process.env.GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE;
  });

  it("rejects unsigned webhook requests", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await handler(buildRequest(bookedPayload, "https://alphatrack.digital/api/brevo-meeting-webhook"));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      message: "Unauthorized webhook request.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("tracks Brevo meeting bookings in GA4 without sending participant PII", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await handler(buildRequest(bookedPayload));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, crm: true });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://www.google-analytics.com/mp/collect?measurement_id=G-TEST1234&api_secret=ga4-secret",
      expect.objectContaining({
        method: "POST",
        headers: { "content-type": "application/json" },
      }),
    );

    const [, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(init.body);

    expect(body).toMatchObject({
      non_personalized_ads: true,
      events: [
        {
          name: "meeting_booked_confirmed",
          params: {
            booking_id: "meeting-123",
            booking_email_present: true,
            meeting_name: "Discovery",
            meeting_start_timestamp: "2026-05-28T08:00:00.000Z",
            meeting_end_timestamp: "2026-05-28T08:15:00.000Z",
            meeting_location: "Brevo video call",
            source: "brevo_meetings_webhook",
            engagement_time_msec: 1,
          },
        },
      ],
    });
    expect(JSON.stringify(body)).not.toContain("visitor@example.com");
    expect(JSON.stringify(body)).not.toContain("Ada");
    expect(JSON.stringify(body)).not.toContain("Lovelace");
  });

  it("adds debug_mode only when explicitly enabled", async () => {
    process.env.GA4_MEASUREMENT_PROTOCOL_DEBUG_MODE = "true";
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    await handler(buildRequest(bookedPayload));

    const [, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(init.body);
    expect(body.events[0].params.debug_mode).toBe(true);
  });

  it("ignores cancel-style payloads", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await handler(buildRequest({
      ...bookedPayload,
      event: "meeting_cancelled",
    }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, ignored: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns a configuration error when GA4 Measurement Protocol is missing", async () => {
    delete process.env.GA4_MEASUREMENT_PROTOCOL_API_SECRET;
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const response = await handler(buildRequest(bookedPayload));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      message: "GA4 Measurement Protocol is not configured.",
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
