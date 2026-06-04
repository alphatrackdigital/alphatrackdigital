import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../../netlify/functions/leads.mjs";
import { resetIdempotencyForTests } from "../../netlify/functions/idempotency.mjs";

const buildRequest = (body: Record<string, unknown>) =>
  new Request("https://alphatrack.digital/api/leads", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-nf-client-connection-ip": `127.1.0.${Math.floor(Math.random() * 200) + 1}`,
    },
    body: JSON.stringify(body),
  });

describe("leads function", () => {
  beforeEach(() => {
    resetIdempotencyForTests();
    process.env.BREVO_API_KEY = "test-api-key";
    process.env.BREVO_CONTACT_LIST_ID = "8";
    process.env.BREVO_AUDIT_LIST_ID = "11";
    process.env.BREVO_NEWSLETTER_LIST_ID = "9";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.BREVO_API_KEY;
    delete process.env.BREVO_CONTACT_LIST_ID;
    delete process.env.BREVO_AUDIT_LIST_ID;
    delete process.env.BREVO_NEWSLETTER_LIST_ID;
  });

  it("routes contact enquiries to the contact list and info inbox", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 123 }), { status: 201 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ contacts: { success: ["ada@example.com"], failure: [] } }), { status: 201 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ messageId: "message-1" }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await handler(buildRequest({
      source: "contact_form",
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
      serviceInterest: ["Growth Strategy"],
      monthlyBudget: "$5,000+",
      message: "Need help with attribution.",
    }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true, pendingConfirmation: false, duplicate: false });

    expect(fetchMock).toHaveBeenCalledTimes(3);
    const [, contactInit] = fetchMock.mock.calls[0];
    expect(JSON.parse(contactInit.body)).toMatchObject({
      email: "ada@example.com",
      listIds: [8],
      attributes: {
        FIRSTNAME: "Ada",
        LASTNAME: "Lovelace",
        SOURCE: "Contact Form",
        SERVICE_INTEREST: "Growth Strategy",
      },
    });

    const [listUrl, listInit] = fetchMock.mock.calls[1];
    expect(listUrl).toBe("https://api.brevo.com/v3/contacts/lists/8/contacts/add");
    expect(JSON.parse(listInit.body)).toEqual({ emails: ["ada@example.com"] });

    const [notificationUrl, notificationInit] = fetchMock.mock.calls[2];
    expect(notificationUrl).toBe("https://api.brevo.com/v3/smtp/email");
    expect(JSON.parse(notificationInit.body)).toMatchObject({
      sender: { name: "AlphaTrack Digital", email: "info@alphatrack.digital" },
      replyTo: { email: "info@alphatrack.digital", name: "AlphaTrack Digital" },
      to: [{ email: "info@alphatrack.digital" }],
      subject: "New website contact form enquiry",
      tags: ["contact_form"],
    });
  });

  it("routes tracking audit leads to the audit list and audit inboxes", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ id: 456 }), { status: 201 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ contacts: { success: ["grace@example.com"], failure: [] } }), { status: 201 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ messageId: "message-2" }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await handler(buildRequest({
      source: "tracking_audit_offer",
      firstName: "Grace",
      lastName: "Hopper",
      email: "grace@example.com",
      websiteUrl: "https://example.com",
      monthlyAdSpend: "5k to 20k per month",
      adPlatforms: "Google Ads, Meta Ads",
      optIn: true,
    }));

    expect(response.status).toBe(200);

    const [, contactInit] = fetchMock.mock.calls[0];
    expect(JSON.parse(contactInit.body)).toMatchObject({
      email: "grace@example.com",
      listIds: [11],
      attributes: {
        FIRSTNAME: "Grace",
        LASTNAME: "Hopper",
        SOURCE: "Tracking Audit Landing Page",
        WEBSITE: "https://example.com",
        AD_SPEND: "5k to 20k per month",
        AD_PLATFORMS: "Google Ads, Meta Ads",
        OPT_IN: true,
      },
    });

    const [listUrl, listInit] = fetchMock.mock.calls[1];
    expect(listUrl).toBe("https://api.brevo.com/v3/contacts/lists/11/contacts/add");
    expect(JSON.parse(listInit.body)).toEqual({ emails: ["grace@example.com"] });

    const [notificationUrl, notificationInit] = fetchMock.mock.calls[2];
    expect(notificationUrl).toBe("https://api.brevo.com/v3/smtp/email");
    expect(JSON.parse(notificationInit.body)).toMatchObject({
      sender: { name: "AlphaTrack Digital", email: "audit@alphatrack.digital" },
      replyTo: { email: "audit@alphatrack.digital", name: "AlphaTrack Digital" },
      to: [{ email: "audit@alphatrack.digital" }, { email: "martech@alphatrack.digital" }],
      subject: "New tracking audit request",
      tags: ["tracking_audit_offer"],
    });
  });

  it("does not resend notifications for duplicate tracking audit submissions", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ id: 456 }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    const payload = {
      source: "tracking_audit_offer",
      firstName: "Grace",
      lastName: "Hopper",
      email: "grace@example.com",
      websiteUrl: "https://example.com",
      monthlyAdSpend: "5k to 20k per month",
      adPlatforms: "Google Ads, Meta Ads",
      optIn: true,
    };

    const firstResponse = await handler(buildRequest(payload));
    await expect(firstResponse.json()).resolves.toMatchObject({ ok: true, duplicate: false });

    const secondResponse = await handler(buildRequest(payload));
    await expect(secondResponse.json()).resolves.toMatchObject({ ok: true, duplicate: true });

    expect(fetchMock).toHaveBeenCalledTimes(5);
    expect(fetchMock.mock.calls.filter(([url]) => url === "https://api.brevo.com/v3/smtp/email")).toHaveLength(1);
  });
});
