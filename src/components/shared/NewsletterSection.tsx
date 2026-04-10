import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { submitLead } from "@/lib/leads";

interface NewsletterSectionProps {
  className?: string;
}

const NewsletterSection = ({ className }: NewsletterSectionProps) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setStatus("loading");
    try {
      await submitLead({
        source: "newsletter",
        firstName: "",
        lastName: "",
        email: trimmed,
        optIn: true,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  };

  return (
    <section className={className}>
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-[24px] border border-primary/15 bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.07),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.01)_100%)] px-6 py-8 shadow-[0_14px_40px_rgba(0,0,0,0.12)] md:px-10 md:py-10"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-2 text-center">
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <p className="text-lg font-semibold">You're subscribed!</p>
              <p className="text-sm text-muted-foreground">
                Expect actionable insights in your inbox every fortnight. No fluff.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-base font-semibold leading-snug">
                    Get insights straight to your inbox
                  </p>
                  <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                    Actionable strategies on tracking, paid media, and automation. Fortnightly. No fluff.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex w-full flex-col gap-2 md:max-w-sm"
              >
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMsg) setErrorMsg("");
                    }}
                    placeholder="your@email.com"
                    required
                    aria-label="Email address"
                    className="h-10 flex-1 rounded-lg border border-white/10 bg-white/[0.05] px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {status === "loading" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Subscribe <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>
                {(errorMsg || status === "error") && (
                  <p className="text-xs text-destructive">
                    {errorMsg || "Something went wrong. Please try again."}
                  </p>
                )}
                <p className="text-[11px] text-muted-foreground/60">
                  No spam. Unsubscribe any time.
                </p>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
