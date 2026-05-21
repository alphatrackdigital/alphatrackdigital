type DataLayerValue = string | number | boolean | null | undefined;

export type DataLayerPayload = Record<string, DataLayerValue>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export const pushDataLayerEvent = (event: string, payload: DataLayerPayload = {}) => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
};

export const getConversionEventForPath = (pathname: string) => {
  const normalizedPath = pathname.endsWith("/") && pathname !== "/"
    ? pathname.slice(0, -1)
    : pathname;

  if (normalizedPath === "/book-a-call/thank-you") {
    return "generate_lead";
  }

  if (normalizedPath === "/contact-us/thank-you") {
    return "contact_form_submit";
  }

  return null;
};
