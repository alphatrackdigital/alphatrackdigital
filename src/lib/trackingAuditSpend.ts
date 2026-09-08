import { useEffect, useMemo, useState } from "react";

import { getVisitorCountryEndpoint } from "@/lib/apiEndpoints";

export type TrackingAuditSpendCurrency = "GHS" | "USD";

export const TRACKING_AUDIT_SPEND_VALUES = [
  "paused_or_not_spending",
  "ghs_5000_9999",
  "ghs_10000_24999",
  "ghs_25000_49999",
  "ghs_50000_plus",
  "usd_500_999",
  "usd_1000_2499",
  "usd_2500_4999",
  "usd_5000_plus",
  "not_sure",
] as const;

export type TrackingAuditSpendValue = (typeof TRACKING_AUDIT_SPEND_VALUES)[number];

export type TrackingAuditSpendOption = {
  value: TrackingAuditSpendValue;
  label: string;
};

export const GHS_TRACKING_AUDIT_SPEND_OPTIONS: TrackingAuditSpendOption[] = [
  { value: "paused_or_not_spending", label: "Not currently spending" },
  { value: "ghs_5000_9999", label: "GHS 5,000–9,999" },
  { value: "ghs_10000_24999", label: "GHS 10,000–24,999" },
  { value: "ghs_25000_49999", label: "GHS 25,000–49,999" },
  { value: "ghs_50000_plus", label: "GHS 50,000+" },
  { value: "not_sure", label: "Not sure" },
];

export const USD_TRACKING_AUDIT_SPEND_OPTIONS: TrackingAuditSpendOption[] = [
  { value: "paused_or_not_spending", label: "Not currently spending" },
  { value: "usd_500_999", label: "$500–999" },
  { value: "usd_1000_2499", label: "$1,000–2,499" },
  { value: "usd_2500_4999", label: "$2,500–4,999" },
  { value: "usd_5000_plus", label: "$5,000+" },
  { value: "not_sure", label: "Not sure" },
];

const STORAGE_KEY = "atd-tracking-audit-spend-currency";
const GEO_LOOKUP_TIMEOUT_MS = 1500;

const readStoredCurrency = (): TrackingAuditSpendCurrency | null => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "GHS" || stored === "USD" ? stored : null;
};

const browserLooksGhanaian = () => {
  if (typeof window === "undefined") return false;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  if (languages.some((language) => /(?:^|-)GH(?:$|-)/i.test(language))) return true;
  return Intl.DateTimeFormat().resolvedOptions().timeZone === "Africa/Accra";
};

export const useGeneralAuditSpendCurrency = () => {
  const storedCurrency = readStoredCurrency();
  const [currency, setCurrencyState] = useState<TrackingAuditSpendCurrency>(
    storedCurrency ?? (browserLooksGhanaian() ? "GHS" : "USD"),
  );
  const [isAutoDetected, setIsAutoDetected] = useState(Boolean(storedCurrency));

  useEffect(() => {
    if (storedCurrency) {
      setIsAutoDetected(true);
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), GEO_LOOKUP_TIMEOUT_MS);

    fetch(getVisitorCountryEndpoint(), {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("country_lookup_failed");
        return response.json() as Promise<{ countryCode?: string | null }>;
      })
      .then((payload) => {
        setCurrencyState(payload.countryCode?.toUpperCase() === "GH" ? "GHS" : "USD");
      })
      .catch(() => {
        // Keep the browser-derived fallback. Currency can always be changed manually.
      })
      .finally(() => {
        window.clearTimeout(timeout);
        setIsAutoDetected(true);
      });

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [storedCurrency]);

  const setCurrency = (next: TrackingAuditSpendCurrency) => {
    setCurrencyState(next);
    setIsAutoDetected(true);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, next);
  };

  const options = useMemo(
    () => {
      if (!isAutoDetected) return [];
      return currency === "GHS" ? GHS_TRACKING_AUDIT_SPEND_OPTIONS : USD_TRACKING_AUDIT_SPEND_OPTIONS;
    },
    [currency, isAutoDetected],
  );

  return { currency, setCurrency, options, isAutoDetected };
};
