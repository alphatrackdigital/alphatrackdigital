import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { EXPLORE_SERVICES_CTA } from "@/config/cta";
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";

const confirmationHighlights = [
  "Practical notes on tracking, paid media, automation, and growth systems",
  "Clear recommendations you can apply without sifting through filler",
  "Easy unsubscribe from any email whenever the timing is not right",
] as const;

const NewsletterConfirmed = () => {
  return (
    <>
      <SEO
        title="Subscription Confirmed | AlphaTrack Digital"
        description="Your AlphaTrack Digital newsletter subscription is confirmed."
        canonicalUrl="/newsletter/confirmed"
        noindex
      />
      <section className="relative flex min-h-[80vh] items-center justify-center py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,175,239,0.06)_0%,rgba(0,51,153,0.08)_34%,transparent_70%)]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-primary/[0.12]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-9 w-9"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </motion.div>

            <h1 className="text-4xl font-extrabold md:text-5xl">
              Subscription <span className="text-gradient">Confirmed</span>
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
              You're in. AlphaTrack Digital insights will now land in your inbox with practical
              thinking on tracking, paid media, automation, and growth systems.
            </p>

            <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 text-left">
              <h2 className="mb-5 text-base font-semibold text-primary">What to expect</h2>
              <ul className="space-y-3">
                {confirmationHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-secondary/[0.04] p-8 text-center">
              <h2 className="text-lg font-bold">Need help sooner?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Explore the services we use to tighten tracking, sharpen paid media decisions, and
                build growth systems with clearer measurement.
              </p>
              <Button
                asChild
                className="mt-5 gap-2 rounded-lg bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Link to={EXPLORE_SERVICES_CTA.to}>{EXPLORE_SERVICES_CTA.label}</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                variant="outline"
                className="rounded-lg border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
              >
                <Link to={EXPLORE_SERVICES_CTA.to}>{EXPLORE_SERVICES_CTA.label}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-lg border-white/10 text-muted-foreground hover:border-white/20 hover:text-foreground"
              >
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewsletterConfirmed;
