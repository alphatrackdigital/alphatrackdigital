import { useEffect, useRef } from "react";

/**
 * Brevo Conversations chat widget
 * Replaces WhatsApp — provides live chat / automated responses via Brevo dashboard
 * Configure widget appearance at: app.brevo.com > Conversations > Settings > Chat Widget
 */
const BrevoChat = () => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    let loaded = false;
    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const loadWidget = () => {
      if (loaded) return;
      loaded = true;

      (window as any).BrevoConversationsID = "67b3e8d09d03de35e0bc2f3e";
      (window as any).BrevoConversations =
        (window as any).BrevoConversations ||
        function (...args: any[]) {
          ((window as any).BrevoConversations.q =
            (window as any).BrevoConversations.q || []).push(args);
        };

      const script = document.createElement("script");
      script.async = true;
      script.src = "https://conversations-widget.brevo.com/brevo-conversations.js";
      document.head.appendChild(script);
      scriptRef.current = script;
    };

    const eagerLoadEvents: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll", "touchstart"];
    const loadOnIntent = () => {
      loadWidget();
      eagerLoadEvents.forEach((event) => window.removeEventListener(event, loadOnIntent));
    };

    eagerLoadEvents.forEach((event) => window.addEventListener(event, loadOnIntent, { passive: true }));

    if ("requestIdleCallback" in window) {
      idleId = (window as any).requestIdleCallback(loadWidget, { timeout: 4500 });
    } else {
      timeoutId = window.setTimeout(loadWidget, 3500);
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (idleId && "cancelIdleCallback" in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      eagerLoadEvents.forEach((event) => window.removeEventListener(event, loadOnIntent));
      if (scriptRef.current) {
        try {
          document.head.removeChild(scriptRef.current);
        } catch {
          // no-op
        }
      }
    };
  }, []);

  return null;
};

export default BrevoChat;
