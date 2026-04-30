import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import handler from "../../netlify/functions/brevo-subscribe.mjs";

const buildRequest = (body: Record<string, unknown>) =>
  new Request("https://alphatrack.digital/api/brevo-subscribe", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-nf-client-connection-ip": `127.0.0.${Math.floor(Math.random() * 200) + 1}`,
    },
    body: JSON.stringify(body),
  });

describe("brevo-subscribe function", () => {
  beforeEach(() => {
    process.env.BREVO_API_KEY = "test-api-key";
    process.env.BREVO_LIST_ID = "7";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    delete process.env.BREVO_API_KEY;
    delete process.env.BREVO_LIST_ID;
  });

  it("sends exit popup contacts to Brevo with updateEnabled", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 123 }), { status: 201 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await handler(buildRequest({
      firstName: "Ada",
      email: "ADA@Example.com",
      website: "alphatrack.digital",
    }));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledWith("https://api.brevo.com/v3/contacts", expect.objectContaining({
      method: "POST",
      headers: {
        "content-type": "application/json",
        "api-key": "test-api-key",
      },
    }));

    const [, init] = fetchMock.mock.calls[0];
    expect(JSON.parse(init.body)).toEqual({
      email: "ada@example.com",
      attributes: {
        FIRSTNAME: "Ada",
        WEBSITE: "https://alphatrack.digital",
        SOURCE: "ATD Website Exit Popup",
      },
      listIds: [7],
      updateEnabled: true,
    });
  });

  it("returns a clean error when Brevo rejects the request", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ message: "sensitive provider detail" }), { status: 400 })),
    );

    const response = await handler(buildRequest({
      firstName: "Ada",
      email: "ada@example.com",
      website: "",
    }));

    await expect(response.json()).resolves.toEqual({
      ok: false,
      message: "Unable to submit lead right now.",
    });
    expect(response.status).toBe(502);
  });
});
