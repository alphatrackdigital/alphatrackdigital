import { useEffect, useRef } from "react";

declare global {
  interface Window {
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

// Brevo Conversations is customer-support chat, not an analytics or advertising tag.
// It is loaded independently of analytics_storage/ad_storage/ad_user_data/ad_personalization
// consent so visitors can always reach support, consistent with functionality_storage
// (granted by default) covering core site functionality such as contact/support channels.
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

    const loadWidget = () => {
      if (hasLoadedRef.current) return;
      hasLoadedRef.current = true;

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

    const scheduleIdleLoad = () => {
      if ("requestIdleCallback" in window) {
        idleCallbackId = window.requestIdleCallback(loadWidget, { timeout: 12000 });
        return;
      }

      timeoutId = setTimeout(loadWidget, 12000);
    };

    timeoutId = setTimeout(scheduleIdleLoad, 6000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (idleCallbackId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleCallbackId);
      }
    };
  }, []);

  return null;
};

export default BrevoChat;
