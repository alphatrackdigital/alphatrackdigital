import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import WhatsAppWidget from "@/components/shared/WhatsAppWidget";

describe("WhatsAppWidget (Brevo Conversations) functional support widget", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.head.innerHTML = "";
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    document.head.innerHTML = "";
  });

  it("does not load before its lazy-load delay elapses", () => {
    render(<WhatsAppWidget />);

    vi.advanceTimersByTime(1_000);

    expect(document.getElementById("brevo-conversations-script")).not.toBeInTheDocument();
  });

  it("loads without requiring analytics or advertising consent", () => {
    render(<WhatsAppWidget />);

    // No consent signals are pushed to dataLayer; the widget should still load
    // because it is treated as functional customer-support communication.
    vi.advanceTimersByTime(20_000);

    const script = document.getElementById("brevo-conversations-script") as HTMLScriptElement | null;
    expect(script).toBeInTheDocument();
    expect(script?.src).toBe("https://conversations-widget.brevo.com/brevo-conversations.js");
  });
});
