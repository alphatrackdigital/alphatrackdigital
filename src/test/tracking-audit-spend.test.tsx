import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  GHS_TRACKING_AUDIT_SPEND_OPTIONS,
  USD_TRACKING_AUDIT_SPEND_OPTIONS,
  useGeneralAuditSpendCurrency,
} from "@/lib/trackingAuditSpend";

describe("Tracking Audit spend bands", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("starts the Ghana campaign bands at GHS 5,000", () => {
    expect(GHS_TRACKING_AUDIT_SPEND_OPTIONS.map((option) => option.label)).toEqual([
      "Not currently spending",
      "GHS 5,000–9,999",
      "GHS 10,000–24,999",
      "GHS 25,000–49,999",
      "GHS 50,000+",
      "Not sure",
    ]);
  });

  it("uses fixed international USD bands starting at $500", () => {
    expect(USD_TRACKING_AUDIT_SPEND_OPTIONS.map((option) => option.label)).toEqual([
      "Not currently spending",
      "$500–999",
      "$1,000–2,499",
      "$2,500–4,999",
      "$5,000+",
      "Not sure",
    ]);
  });

  it("switches the General Audit page to GHS when the first-party country lookup returns Ghana", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true, countryCode: "GH" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      ),
    );

    const { result } = renderHook(() => useGeneralAuditSpendCurrency());

    await waitFor(() => expect(result.current.currency).toBe("GHS"));
    expect(result.current.options[1]?.value).toBe("ghs_5000_9999");
  });

  it("does not expose spend choices until a delayed country lookup settles", async () => {
    let resolveLookup: ((response: Response) => void) | undefined;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () =>
          new Promise<Response>((resolve) => {
            resolveLookup = resolve;
          }),
      ),
    );

    const { result } = renderHook(() => useGeneralAuditSpendCurrency());

    expect(result.current.isAutoDetected).toBe(false);
    expect(result.current.options).toEqual([]);

    await act(async () => {
      resolveLookup?.(
        new Response(JSON.stringify({ ok: true, countryCode: "GH" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      );
      await Promise.resolve();
    });

    await waitFor(() => expect(result.current.isAutoDetected).toBe(true));
    expect(result.current.currency).toBe("GHS");
    expect(result.current.options[1]?.value).toBe("ghs_5000_9999");
  });

  it("uses USD for visitors outside Ghana", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: true, countryCode: "NG" }), {
          status: 200,
          headers: { "content-type": "application/json" },
        }),
      ),
    );

    const { result } = renderHook(() => useGeneralAuditSpendCurrency());

    await waitFor(() => expect(result.current.currency).toBe("USD"));
    expect(result.current.options[1]?.value).toBe("usd_500_999");
  });

  it("persists a visitor's manual currency override", () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => new Promise(() => {})));
    const { result } = renderHook(() => useGeneralAuditSpendCurrency());

    act(() => result.current.setCurrency("GHS"));

    expect(result.current.currency).toBe("GHS");
    expect(result.current.options[1]?.value).toBe("ghs_5000_9999");
    expect(window.localStorage.getItem("atd-tracking-audit-spend-currency")).toBe("GHS");
  });
});
