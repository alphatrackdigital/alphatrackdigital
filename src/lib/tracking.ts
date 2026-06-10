type DataLayerValue = string | number | boolean | null | undefined;

export type DataLayerPayload = Record<string, DataLayerValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const pushDataLayerEvent = (event: string, payload: DataLayerPayload = {}) => {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  } catch (error) {
    console.warn("Tracking event push failed", {
      event,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const pushLeadSubmissionEvent = (
  event: string,
  payload: DataLayerPayload = {},
) => {
  if (typeof window === "undefined") return;

  pushDataLayerEvent(event, {
    page_path: window.location.pathname,
    page_location: window.location.href,
    ...payload,
  });
};

export const getBookingClickEventForUrl = (href: string, baseUrl = "https://alphatrack.digital") => {
  try {
    const url = new URL(href, baseUrl);
    const normalizedPath = url.pathname.endsWith("/") && url.pathname !== "/"
      ? url.pathname.slice(0, -1)
      : url.pathname;

    if (url.hostname === "meet.brevo.com") {
      return "booking_scheduler_open";
    }

    if (normalizedPath === "/book-a-call") {
      return "booking_cta_click";
    }
  } catch {
    return null;
  }

  return null;
};

export const pushBookingClickEvent = (anchor: HTMLAnchorElement) => {
  if (typeof window === "undefined") return;

  const event = getBookingClickEventForUrl(anchor.href, window.location.origin);
  if (!event) return;

  const linkText = anchor.textContent?.replace(/\s+/g, " ").trim() || anchor.getAttribute("aria-label") || "";
  const isSchedulerOpen = event === "booking_scheduler_open";

  pushDataLayerEvent(event, {
    page_path: window.location.pathname,
    page_location: window.location.href,
    link_url: anchor.href,
    link_text: linkText,
    booking_provider: isSchedulerOpen ? "brevo_meetings" : undefined,
    booking_stage: isSchedulerOpen ? "scheduler_open" : "booking_page_intent",
  });
};

export const getConversionEventsForPath = (pathname: string) => {
  const normalizedPath = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  if (normalizedPath === "/book-a-call/thank-you") {
    return ["generate_lead", "meeting_booking_redirect"];
  }

  if (normalizedPath === "/contact-us/thank-you") {
    return ["contact_form_submit"];
  }

  return [];
};

export const getConversionEventForPath = (pathname: string) => {
  return getConversionEventsForPath(pathname)[0] ?? null;
};
