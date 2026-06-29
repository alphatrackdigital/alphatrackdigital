import { useEffect, useRef } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown> | IArguments | unknown[]>;
    BrevoConversationsID?: string;
    BrevoConversations?: {
      (...args: unknown[]): void;
      q?: unknown[][];
    };
  }
}

const BREVO_WIDGET_ID = "68bf7ba05e611d228d09f91c";
const BREVO_SCRIPT_ID = "brevo-conversations-script";
const BREVO_SCRIPT_SRC = "https://conversations-widget.brevo.com/brevo-conversations.js";
const ANALYTICS_PURPOSE_KEYS = new Set([
  "analytics",
  "analytics_measurement",
  "analytics_and_measurement",
  "analytics_storage",
]);

const normalizeConsentKey = (key: string) => key.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

const isGranted = (value: unknown) => value === true || value === "true" || value === "granted" || value === "1";

const hasAnalyticsConsentInRecord = (record: Record<string, unknown>) =>
  Object.entries(record).some(([key, value]) => ANALYTICS_PURPOSE_KEYS.has(normalizeConsentKey(key)) && isGranted(value));

const hasAnalyticsConsent = () => {
  const dataLayer = window.dataLayer || [];

  return dataLayer.some((entry) => {
    if (Array.isArray(entry) || Object.prototype.toString.call(entry) === "[object Arguments]") {
      const args = Array.from(entry as ArrayLike<unknown>);
      return args[0] === "consent" && args[1] === "update" && hasAnalyticsConsentInRecord((args[2] || {}) as Record<string, unknown>);
    }

    return Boolean(entry && typeof entry === "object" && hasAnalyticsConsentInRecord(entry as Record<string, unknown>));
  });
};

const BrevoChat = () => {
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let blurTimeoutId: ReturnType<typeof setTimeout> | null = null;
    const formSelector = "#contact-form, #tracking-audit-form";

    const clearBlurTimeout = () => {
      if (!blurTimeoutId) return;
      clearTimeout(blurTimeoutId);
      blurTimeoutId = null;
    };

    const removeFocusClassIfOutsideForms = () => {
      const activeElement = document.activeElement;
      if (activeElement instanceof Element && activeElement.closest(formSelector)) return;

      document.documentElement.classList.remove("chat-widget-form-focus");
    };

    const handleFocusIn = (event: FocusEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest(formSelector)) return;

      clearBlurTimeout();
      document.documentElement.classList.add("chat-widget-form-focus");
    };

    const handleFocusOut = () => {
      clearBlurTimeout();
      blurTimeoutId = setTimeout(removeFocusClassIfOutsideForms, 0);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);

    return () => {
      clearBlurTimeout();
      document.documentElement.classList.remove("chat-widget-form-focus");
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleCallbackId: number | null = null;
    let consentCheckIntervalId: ReturnType<typeof setInterval> | null = null;
    let originalDataLayerPush: ((...items: Array<Record<string, unknown> | IArguments | unknown[]>) => number) | null = null;

    const loadWidget = () => {
      if (hasLoadedRef.current) return;
      hasLoadedRef.current = true;
      if (consentCheckIntervalId) {
        clearInterval(consentCheckIntervalId);
        consentCheckIntervalId = null;
      }

      window.BrevoConversationsID = BREVO_WIDGET_ID;
      window.BrevoConversations =
        window.BrevoConversations ||
        function (...args: unknown[]) {
          (window.BrevoConversations!.q = window.BrevoConversations!.q || []).push(args);
        };

      const existingScript = document.getElementById(BREVO_SCRIPT_ID);
      if (existingScript) return;

      const script = document.createElement("script");
      script.id = BREVO_SCRIPT_ID;
      script.async = true;
      script.src = BREVO_SCRIPT_SRC;
      document.head.appendChild(script);
    };

    const loadWidgetIfConsented = () => {
      if (!hasAnalyticsConsent()) return;
      loadWidget();
    };

    const scheduleIdleLoad = () => {
      if (!hasAnalyticsConsent()) return;

      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(loadWidget, { timeout: 12000 });
        return;
      }

      timeoutId = setTimeout(loadWidget, 12000);
    };

    const installConsentAwareDataLayerPush = () => {
      window.dataLayer = window.dataLayer || [];
      const dataLayer = window.dataLayer;
      originalDataLayerPush = dataLayer.push.bind(dataLayer);

      dataLayer.push = (...items) => {
        const result = originalDataLayerPush?.(...items) ?? dataLayer.length;
        loadWidgetIfConsented();
        return result;
      };
    };

    installConsentAwareDataLayerPush();
    consentCheckIntervalId = setInterval(loadWidgetIfConsented, 1000);
    timeoutId = setTimeout(scheduleIdleLoad, 6000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (consentCheckIntervalId) clearInterval(consentCheckIntervalId);
      if (idleCallbackId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (originalDataLayerPush && window.dataLayer) {
        window.dataLayer.push = originalDataLayerPush;
      }
    };
  }, []);

  return null;
};

export default BrevoChat;

