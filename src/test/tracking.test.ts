import { describe, expect, it, beforeEach } from "vitest";

import { getConversionEventForPath, pushDataLayerEvent } from "@/lib/tracking";

describe("tracking helpers", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it("maps thank-you routes to canonical conversion events", () => {
    expect(getConversionEventForPath("/book-a-call/thank-you")).toBe("generate_lead");
    expect(getConversionEventForPath("/book-a-call/thank-you/")).toBe("generate_lead");
    expect(getConversionEventForPath("/contact-us/thank-you")).toBe("contact_form_submit");
    expect(getConversionEventForPath("/contact-us/thank-you/")).toBe("contact_form_submit");
    expect(getConversionEventForPath("/contact-us")).toBeNull();
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
});
