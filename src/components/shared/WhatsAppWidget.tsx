import { useEffect } from "react";

/**
 * Brevo Conversations chat widget
 * Replaces WhatsApp — provides live chat / automated responses via Brevo dashboard
 * Configure widget appearance at: app.brevo.com > Conversations > Settings > Chat Widget
 */
const BrevoChat = () => {
  useEffect(() => {
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

    return () => {
      try { document.head.removeChild(script); } catch {}
    };
  }, []);

  return null;
};

export default BrevoChat;
