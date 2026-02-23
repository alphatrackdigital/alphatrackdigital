import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SEO from "@/components/shared/SEO";
import { Check, Clock, Handshake, Lightbulb, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const expectations: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Clock,
    title: "15 Minutes",
    description: "Quick intro video call to understand your goals and current setup.",
  },
  {
    icon: Handshake,
    title: "No Pressure",
    description: "We'll share what we see, you decide next steps. No hard sell.",
  },
  {
    icon: Lightbulb,
    title: "Actionable",
    description: "Walk away with at least one insight, even if we don't work together.",
  },
];

const schedulerUrl = "https://meet.brevo.com/meet-atd/borderless?l=discovery";

const BookACall = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!iframeLoaded) setShowFallback(true);
    }, 5500);
    return () => window.clearTimeout(timeoutId);
  }, [iframeLoaded]);

  return (
    <>
      <SEO
        title="Book a Free Discovery Call | AlphaTrack Digital"
        description="Book a free 15-minute intro call to discuss your tracking and measurement needs. No pressure, actionable advice."
        canonicalUrl="/book-a-call"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://alphatrack.digital/" },
              { "@type": "ListItem", position: 2, name: "Book a Call", item: "https://alphatrack.digital/book-a-call" },
            ],
          })}
        </script>
      </Helmet>

      <section
        className="py-24 md:py-32"
        style={{
          background: "linear-gradient(180deg, rgba(62,207,142,0.04) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Book a Call" },
            ]}
          />
          <h1 className="mt-2 text-3xl font-bold">Book a Call</h1>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div className="pt-5">
              <div className="mb-5 inline-block rounded border border-primary/15 bg-primary/[0.08] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                Book a Call
              </div>
              <h2 className="text-4xl font-extrabold leading-tight">
                Let's Talk About
                <br />
                Your <span className="text-gradient">Growth</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Pick a time that works for you. This is a free, no-pressure 15-minute intro call
                where we'll discuss your tracking and measurement needs.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  No-pressure conversation
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  Actionable advice
                </span>
              </div>

              <ul className="mt-10 space-y-0 divide-y divide-white/[0.04]">
                {expectations.map((item) => (
                  <li key={item.title} className="flex gap-4 py-4">
                    <div className="flex h-11 w-11 min-w-[44px] items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold">{item.title}</h4>
                      <p className="mt-1 text-[13px] text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-h-[720px] overflow-hidden rounded-2xl bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_64px_rgba(0,0,0,0.35)]">
              <iframe
                frameBorder="0"
                width="100%"
                height="720"
                src={schedulerUrl}
                title="Book a Discovery Call"
                style={{ border: "none", minHeight: "720px", display: "block" }}
                onLoad={() => setIframeLoaded(true)}
              />
              {showFallback && !iframeLoaded && (
                <div className="space-y-3 border-t border-white/10 bg-background/80 p-5 text-sm">
                  <p className="text-muted-foreground">
                    Having trouble with the embedded scheduler? Use one of these options:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      asChild
                      className="gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <a href={schedulerUrl} target="_blank" rel="noopener noreferrer">
                        Open scheduler in new tab <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="gap-1.5 rounded-lg border-white/20 hover:bg-white/5"
                    >
                      <a href="mailto:info@alphatrack.digital?subject=Discovery%20Call%20Request">
                        Email us instead <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.04] py-10 text-center">
        <div className="container mx-auto px-4">
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-primary" /> Free 15-minute call
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-primary" /> No commitment required
            </span>
            <span className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-primary" /> Get actionable advice
            </span>
          </p>
        </div>
      </section>
    </>
  );
};

export default BookACall;
