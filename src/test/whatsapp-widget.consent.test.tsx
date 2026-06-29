import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WhatsAppWidget from "@/components/shared/WhatsAppWidget";

describe("WhatsAppWidget consent gating", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.dataLayer = [];
    document.head.innerHTML = "";
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.head.innerHTML = "";
  });

  it("does not load Brevo Conversations before analytics consent", () => {
    render(<WhatsAppWidget />);

    vi.advanceTimersByTime(20_000);

    expect(document.getElementById("brevo-conversations-script")).not.toBeInTheDocument();
  });

  it("loads Brevo Conversations after analytics consent is granted", () => {
    render(<WhatsAppWidget />);

    window.dataLayer?.push(["consent", "update", { analytics_storage: "granted" }]);
    vi.advanceTimersByTime(6_000);

    const script = document.getElementById("brevo-conversations-script") as HTMLScriptElement | null;
    expect(script).toBeInTheDocument();
    expect(script?.src).toBe("https://conversations-widget.brevo.com/brevo-conversations.js");
  });
});
