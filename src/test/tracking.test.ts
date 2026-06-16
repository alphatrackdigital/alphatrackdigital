import { describe, expect, it, beforeEach } from "vitest";

import {
  getBookingClickEventForUrl,
  getConversionEventForPath,
  getConversionEventsForPath,
  pushBookingClickEvent,
  pushDataLayerEvent,
  pushLeadSubmissionEvent,
} from "@/lib/tracking";

describe("tracking helpers", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it("maps thank-you routes to canonical conversion events", () => {
    expect(getConversionEventForPath("/book-a-call/thank-you")).toBe("generate_lead");
    expect(getConversionEventForPath("/book-a-call/thank-you/")).toBe("generate_lead");
    expect(getConversionEventsForPath("/book-a-call/thank-you")).toEqual([
      "generate_lead",
      "meeting_booking_redirect",
    ]);
    expect(getConversionEventForPath("/contact-us/thank-you")).toBe("contact_form_submit");
    expect(getConversionEventForPath("/contact-us/thank-you/")).toBe("contact_form_submit");
    expect(getConversionEventForPath("/contact-us")).toBeNull();
  });

  it("maps booking links to booking flow events", () => {
    expect(getBookingClickEventForUrl("/book-a-call")).toBe("booking_cta_click");
    expect(getBookingClickEventForUrl("https://alphatrack.digital/book-a-call/")).toBe("booking_cta_click");
    expect(getBookingClickEventForUrl("https://meet.brevo.com/meet-atd/borderless?l=discovery")).toBe(
      "booking_scheduler_open",
    );
    expect(getBookingClickEventForUrl("/services")).toBeNull();
  });

  it("pushes events into the GTM dataLayer", () => {
    pushDataLayerEvent("contact_form_submit", {
      page_path: "/contact-us/thank-you",
      page_location: "https://alphatrack.digital/contact-us/thank-you",
    });

    expect(window.dataLayer).toContainEqual({
      event: "contact_form_submit",
      page_path: "/contact-us/thank-you",
      page_location: "https://alphatrack.digital/contact-us/thank-you",
    });
  });

  it("adds current page context to lead submission events", () => {
    window.history.pushState({}, "", "/offer/tracking-audit");

    pushLeadSubmissionEvent("tracking_audit_submit", {
      event_id: "atd-test-event",
      eventID: "atd-test-event",
      form_id: "tracking-audit-form",
      lead_source: "tracking_audit_offer",
    });

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: "tracking_audit_submit",
        event_id: "atd-test-event",
        eventID: "atd-test-event",
        page_path: "/offer/tracking-audit",
        page_location: expect.stringContaining("/offer/tracking-audit"),
        form_id: "tracking-audit-form",
        lead_source: "tracking_audit_offer",
      }),
    ]);
  });

  it("adds current page context to booking click events", () => {
    window.history.pushState({}, "", "/services");

    const anchor = document.createElement("a");
    anchor.href = "/book-a-call";
    anchor.textContent = "Book A Free Strategy Call";

    pushBookingClickEvent(anchor);

    expect(window.dataLayer).toEqual([
      expect.objectContaining({
        event: "booking_cta_click",
        page_path: "/services",
        page_location: expect.stringContaining("/services"),
        link_url: expect.stringContaining("/book-a-call"),
        link_text: "Book A Free Strategy Call",
        booking_stage: "booking_page_intent",
      }),
    ]);
  });
});
