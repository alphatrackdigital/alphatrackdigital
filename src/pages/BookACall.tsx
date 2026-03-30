import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { Check, Clock, Handshake, Lightbulb, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { companyProfile, nextSteps as profileNextSteps } from "@/data/companyProfile";

const expectations: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Clock,
    title: "15 Minutes",
    description: "Quick strategy call to understand your goals, current setup, and growth friction.",
  },
  {
    icon: Handshake,
    title: "Strategy-Led",
    description: "We share what we see, what matters most, and the most sensible next step.",
  },
  {
    icon: Lightbulb,
    title: "Actionable",
    description: "Walk away with at least one clear insight, even if we do not work together.",
  },
];

const schedulerUrl = "https://meet.brevo.com/meet-atd/borderless?l=discovery";
const nextSteps = [
  {
    step: "1",
    title: profileNextSteps[0],
    description: "Choose the time that suits you best and tell us a little about your current setup.",
  },
  {
    step: "2",
    title: profileNextSteps[1],
    description: "We come back with a tailored recommendation and the clearest route forward.",
  },
  {
    step: "3",
    title: profileNextSteps[2],
    description: "We align on what to do first, how long it takes, and what success should look like.",
  },
  {
    step: "4",
    title: profileNextSteps[3],
    description: "Once scope is agreed, we move into setup, launch, and reporting.",
  },
];

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
        title="Book a Free Strategy Call | AlphaTrack Digital"
        description="Book a free strategy call to discuss your growth goals, marketing setup, and the clearest next step."
        canonicalUrl="/book-a-call"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://alphatrack.digital/" },
              { "@type": "ListItem", position: 2, name: "Book a Free Strategy Call", item: "https://alphatrack.digital/book-a-call" },
            ],
          })}
        </script>
      </Helmet>

      <section
        className="py-24 md:py-32"
        style={{
          background: "linear-gradient(180deg, rgba(0,51,153,0.035) 0%, rgba(0,175,239,0.018) 50%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Book a Free Strategy Call" },
            ]}
          />
          <h1 className="mt-2 text-3xl font-bold">Book a Free Strategy Call</h1>
        </div>
      </section>

      <section className="py-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="pt-5">
              <SectionIntro
                eyebrow="Book a Free Strategy Call"
                title={
                  <>
                    Book a Free <span className="text-gradient">Strategy Call</span>
                  </>
                }
                description={`${companyProfile.founder.name} and the AlphaTrack team use this first call to understand your current setup, growth friction, and the clearest next steps.`}
                width="wide"
                titleClassName="text-4xl font-extrabold leading-tight"
                descriptionClassName="max-w-xl text-base"
              />
              <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  Founder-led conversation
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  Strategy-first advice
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  Clear next steps
                </span>
              </div>

              <ul className="mt-10 space-y-0 divide-y divide-white/[0.05] rounded-[24px] border border-white/8 bg-white/[0.02] px-1">
                {expectations.map((item) => (
                  <li key={item.title} className="flex gap-4 px-4 py-4">
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

            <div className="space-y-4">
              <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.02)_100%)] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_64px_rgba(0,0,0,0.35)]">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Strategy Call Scheduler</p>
                    <p className="text-xs text-muted-foreground">Choose a date and time in your timezone</p>
                  </div>
                  <a
                    href={schedulerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Open in new tab <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="overflow-hidden rounded-2xl bg-white">
                  <iframe
                    frameBorder="0"
                    width="100%"
                    src={schedulerUrl}
                    title="Book a Strategy Call"
                    className="block h-[860px] w-full sm:h-[900px] lg:h-[920px] xl:h-[960px]"
                    style={{ border: "none" }}
                    scrolling="no"
                    onLoad={() => setIframeLoaded(true)}
                  />
                </div>
              </div>
              {showFallback && !iframeLoaded && (
                <div className="space-y-3 rounded-xl border border-white/10 bg-background/70 p-5 text-sm">
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
                      <a href={`mailto:${companyProfile.contact.email}?subject=Strategy%20Call%20Request`}>
                        Email us instead <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
              <div className="rounded-[24px] border border-white/8 bg-white/[0.02] p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/85">
                  What Happens Next
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {nextSteps.map((item) => (
                    <div key={item.step} className="rounded-2xl border border-white/8 bg-background/65 p-4">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {item.step}
                      </span>
                      <p className="mt-3 text-sm font-semibold">{item.title}</p>
                      <p className="mt-1 text-xs leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
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
