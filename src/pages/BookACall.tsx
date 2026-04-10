import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowUpRight,
  Clock,
  Handshake,
  Lightbulb,
  LoaderCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { companyProfile, featuredTestimonial } from "@/data/companyProfile";

const schedulerUrl = "https://meet.brevo.com/meet-atd/borderless?l=discovery";

const expectations: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Clock,
    title: "15 focused minutes",
    description: "A short call to understand your current setup and where growth is getting stuck.",
  },
  {
    icon: Handshake,
    title: "Straightforward advice",
    description: "We focus on the clearest next step, not a drawn-out sales conversation.",
  },
  {
    icon: Lightbulb,
    title: "Actionable outcome",
    description: "You should leave with more clarity on what to fix, test, or prioritise next.",
  },
];

const schedulerLoadingSteps = [
  "Preparing the live calendar",
  "Checking available time slots",
  "Getting the booking view ready",
];

const BookACall = () => {
  const [iframeLoadCount, setIframeLoadCount] = useState(0);
  const [schedulerVisible, setSchedulerVisible] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const iframeHasLoaded = iframeLoadCount > 0;

  useEffect(() => {
    const id = window.setTimeout(() => {
      if (!iframeHasLoaded) setShowFallback(true);
    }, 5500);

    return () => window.clearTimeout(id);
  }, [iframeHasLoaded]);

  useEffect(() => {
    if (!iframeHasLoaded || schedulerVisible) return;

    setShowFallback(false);

    const revealDelay = iframeLoadCount >= 2 ? 350 : 1600;
    const id = window.setTimeout(() => {
      setSchedulerVisible(true);
    }, revealDelay);

    return () => window.clearTimeout(id);
  }, [iframeHasLoaded, iframeLoadCount, schedulerVisible]);

  return (
    <>
      <SEO
        title="Book a Free Strategy Call | AlphaTrack Digital"
        description="Book a free 15-minute strategy call with AlphaTrack Digital. Understand what is slowing growth and leave with a clearer next step."
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

      <section className="relative overflow-hidden border-b border-white/[0.05] pt-8 pb-16 md:pt-10 md:pb-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_54%_at_50%_-6%,rgba(0,51,153,0.12)_0%,rgba(0,175,239,0.05)_42%,transparent_72%)]" />
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/6 blur-[130px]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-[76rem]">
            <Breadcrumbs
              items={[
                { label: "Home", path: "/" },
                { label: "Book a Free Strategy Call" },
              ]}
            />

            <div className="mt-12 grid gap-4 md:mt-20 md:grid-cols-[minmax(0,34rem)_minmax(0,420px)] md:justify-center md:items-stretch lg:grid-cols-[minmax(0,36rem)_minmax(0,460px)] lg:gap-6">
              <div className="flex h-full w-full flex-col">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-primary md:px-4 md:py-2 md:text-xs">
                    Free Strategy Call
                  </div>

                  <h1 className="title-safe mt-6 pb-2 text-[2.55rem] font-extrabold leading-[1.04] tracking-[-0.045em] md:mt-8 md:pb-3 md:whitespace-nowrap md:text-[3.35rem] lg:text-[3.6rem]">
                    Book a <span className="title-safe-inline text-gradient">Strategy</span> Call
                  </h1>

                  <p className="mt-3 max-w-[31rem] text-[14px] leading-7 text-muted-foreground md:mt-4 md:text-base md:leading-8">
                    A simple 15-minute conversation to understand your current setup, identify the main point of
                    friction, and help you leave with a clearer next move.
                  </p>

                  <div className="hidden max-w-[31rem] md:mt-10 md:block">
                    <div>
                      <p className="text-base font-semibold tracking-[-0.025em] md:text-lg">How the call moves</p>
                    </div>

                    <div className="relative mt-4 pl-3 md:mt-6 md:pl-4">
                      <div className="absolute left-[1.1rem] top-4 bottom-4 w-px bg-gradient-to-b from-primary/75 via-secondary/35 to-transparent" />

                      {expectations.map((item, index) => (
                        <div key={item.title} className="relative grid gap-1.5 pb-5 pl-10 last:pb-0 md:gap-2 md:pb-7 md:pl-12">
                          <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-primary/15 bg-background/90 shadow-[0_10px_24px_rgba(0,0,0,0.14)] md:h-9 md:w-9">
                            <item.icon className="h-4 w-4 text-primary md:h-4.5 md:w-4.5" />
                          </div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/75">
                            Step {String(index + 1).padStart(2, "0")}
                          </p>
                          <p className="text-[13px] font-semibold leading-snug text-foreground md:text-sm">{item.title}</p>
                          <p className="max-w-[26rem] text-[12px] leading-5 text-muted-foreground md:text-[13px] md:leading-6">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_100%)] p-2.5 shadow-[0_20px_64px_rgba(0,0,0,0.22)] md:rounded-[28px] md:p-3">
                <div className="relative overflow-hidden rounded-[18px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.12),transparent_58%),linear-gradient(180deg,rgba(9,17,28,0.92)_0%,rgba(9,14,24,0.96)_100%)] md:rounded-[22px]">
                  <div className="relative overflow-hidden rounded-[18px] bg-background/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] md:rounded-[22px]">
                    {!schedulerVisible && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.11),transparent_42%),linear-gradient(180deg,rgba(7,11,18,0.78)_0%,rgba(7,11,18,0.88)_100%)] px-4 py-5 text-center backdrop-blur-sm md:px-6 md:py-8">
                        <div className="w-full max-w-sm rounded-[18px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.18)] md:rounded-[22px] md:p-6">
                          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.08] md:h-12 md:w-12">
                            <LoaderCircle className="h-4 w-4 animate-spin text-primary md:h-5 md:w-5" />
                          </div>
                          <p className="mt-3 text-[13px] font-semibold text-foreground md:mt-4 md:text-sm">Loading the live booking calendar</p>
                          <p className="mt-2 text-[12px] leading-5 text-muted-foreground md:text-[13px] md:leading-6">
                            This booking page can take a few seconds to show up. Please wait while it loads.
                          </p>

                          <div className="mt-4 space-y-2 text-left md:mt-5 md:space-y-2.5">
                            {schedulerLoadingSteps.map((item) => (
                              <div
                                key={item}
                                className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-background/60 px-3 py-2.5 md:gap-3 md:px-3.5 md:py-3"
                              >
                                <div className="h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_rgba(0,175,239,0.45)]" />
                                <span className="text-[12px] text-foreground/88 md:text-[13px]">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div
                      className={`overflow-hidden rounded-[22px] bg-white transition-opacity duration-300 ${
                        schedulerVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <iframe
                        frameBorder="0"
                        width="100%"
                        src={schedulerUrl}
                        title="Book a Strategy Call"
                        className="block h-[560px] w-full bg-white min-[380px]:h-[620px] sm:h-[880px]"
                        style={{ border: "none" }}
                        scrolling="no"
                        onLoad={() => setIframeLoadCount((count) => count + 1)}
                      />
                    </div>
                  </div>
                </div>

                {showFallback && !iframeHasLoaded && (
                  <div className="mt-2.5 space-y-3 rounded-[18px] border border-white/10 bg-background/75 p-4 text-sm md:mt-3 md:rounded-[22px] md:p-5">
                    <p className="text-muted-foreground">
                      Having trouble with the embedded scheduler? Use one of these options:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        asChild
                        className="gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <a href={schedulerUrl} target="_blank" rel="noopener noreferrer">
                          Open scheduler
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="gap-1.5 rounded-xl border-white/20 hover:bg-white/5"
                      >
                        <a href={`mailto:${companyProfile.contact.email}?subject=Strategy%20Call%20Request`}>
                          Email us instead
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.05] py-10 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.015)_100%)] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] md:rounded-[30px] md:px-8 md:py-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                  Client feedback
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.03em] md:text-[2rem]">
                  What the first experience feels like
                </h2>
              </div>
              <span aria-hidden="true" className="text-3xl leading-none text-primary/35 md:text-5xl">
                "
              </span>
            </div>

            <p className="mt-4 max-w-3xl text-[13px] italic leading-6 text-foreground/90 md:mt-6 md:text-base md:leading-8">
              {featuredTestimonial.quote}
            </p>

            <div className="mt-4 border-t border-white/10 pt-4 md:mt-6 md:pt-5">
              <p className="text-sm font-semibold">{featuredTestimonial.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{featuredTestimonial.title}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookACall;
