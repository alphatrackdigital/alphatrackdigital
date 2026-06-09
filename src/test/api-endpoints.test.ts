import { describe, expect, it } from "vitest";

import { resolveApiEndpoint } from "@/lib/apiEndpoints";

describe("API endpoint resolution", () => {
  it("uses the live backend for static production hostnames", () => {
    expect(resolveApiEndpoint("/api/leads", undefined, "alphatrack.digital")).toBe(
      "https://alphatra-serv.netlify.app/api/leads",
    );

    expect(resolveApiEndpoint("/api/brevo-subscribe", undefined, "www.alphatrack.digital")).toBe(
      "https://alphatra-serv.netlify.app/api/brevo-subscribe",
    );
  });

  it("keeps same-origin API routes for local hosts", () => {
    expect(resolveApiEndpoint("/api/leads", undefined, "localhost")).toBe("/api/leads");
    expect(resolveApiEndpoint("/api/leads", undefined, "127.0.0.1")).toBe("/api/leads");
    expect(resolveApiEndpoint("/api/leads", undefined, "dev.localhost")).toBe("/api/leads");
  });

  it("uses the live backend for static staging and preview hostnames", () => {
    expect(resolveApiEndpoint("/api/leads", undefined, "alphatrackdigital.netlify.app")).toBe(
      "https://alphatra-serv.netlify.app/api/leads",
    );
    expect(resolveApiEndpoint("/api/leads", undefined, "temporary-namecheap-preview.example")).toBe(
      "https://alphatra-serv.netlify.app/api/leads",
    );
  });

  it("uses explicitly configured endpoints first", () => {
    expect(resolveApiEndpoint("/api/leads", "https://example.com/leads", "alphatrack.digital")).toBe(
      "https://example.com/leads",
    );
  });
});
