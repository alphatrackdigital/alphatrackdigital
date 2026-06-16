import type { LeadAttribution } from "@/types/leads";

const STORAGE_KEY = "atd_lead_attribution";

const attributionParamMap = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
  gclid: "gclid",
  fbclid: "fbclid",
} as const;

type AttributionParam = keyof typeof attributionParamMap;

const truncate = (value: string) => value.trim().slice(0, 500);

const getCookieValue = (name: string) => {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escapedName}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
};

const readStoredAttribution = (): LeadAttribution => {
  if (typeof window === "undefined") return {};

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as LeadAttribution) : {};
  } catch {
    return {};
  }
};

const writeStoredAttribution = (attribution: LeadAttribution) => {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Ignore storage failures; attribution should not block form submission.
  }
};

export const getLeadAttribution = (): LeadAttribution => {
  if (typeof window === "undefined") return {};

  const stored = readStoredAttribution();
  const params = new URLSearchParams(window.location.search);
  const current: LeadAttribution = {};

  (Object.keys(attributionParamMap) as AttributionParam[]).forEach((param) => {
    const value = params.get(param);
    if (value) {
      current[attributionParamMap[param]] = truncate(value);
    }
  });

  const next: LeadAttribution = {
    ...stored,
    ...current,
    fbp: stored.fbp || getCookieValue("_fbp"),
    fbc: stored.fbc || getCookieValue("_fbc"),
    landingPage: stored.landingPage || truncate(`${window.location.pathname}${window.location.search}`),
    referrer: stored.referrer || (document.referrer ? truncate(document.referrer) : undefined),
  };

  if (Object.keys(current).length > 0 || !stored.landingPage) {
    writeStoredAttribution(next);
  }

  return next;
};
