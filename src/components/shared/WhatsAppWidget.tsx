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

const BrevoChat = () => {
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

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

    const eagerLoadEvents: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll", "touchstart"];
    const loadOnIntent = () => {
      loadWidget();
      eagerLoadEvents.forEach((event) => window.removeEventListener(event, loadOnIntent));
    };

    eagerLoadEvents.forEach((event) => window.addEventListener(event, loadOnIntent, { passive: true }));

    // Defer loading to reduce main-thread work and forced reflows
    timeoutId = setTimeout(loadWidget, 6000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      eagerLoadEvents.forEach((event) => window.removeEventListener(event, loadOnIntent));
    };
  }, []);

  return null;
};

export default BrevoChat;

