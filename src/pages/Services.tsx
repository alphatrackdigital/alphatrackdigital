import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import CTASection from "@/components/shared/CTASection";
import FeaturedTestimonialSection from "@/components/shared/FeaturedTestimonialSection";
import HeroEyebrow from "@/components/shared/HeroEyebrow";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { BOOK_A_FREE_STRATEGY_CALL_CTA, REQUEST_A_FREE_TRACKING_AUDIT_CTA } from "@/config/cta";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";
import { ctmaFramework, engagementModels, tractionMetrics } from "@/data/companyProfile";
import { primaryServices, supportingServices } from "@/data/services";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const mobileCtmaSummaries: Record<string, string> = {
  "Conversion Tracking": "Attribution before bigger bets.",
  "Traffic & Paid Media": "Efficient channel execution.",
  "Marketing Automation": "Follow-up that keeps pace.",
  "Analytics & Insights": "Reporting leaders can act on.",
};

const mobileEngagementSummaries: Record<string, string> = {
  Starter: "Clarity first, before a bigger commitment.",
  Growth: "Steady, compounding execution for active growth.",
  Project: "Focused execution for launches and short pushes.",
};

const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <SEO
        title="Our Services | AlphaTrack Digital"
        description="Performance marketing, creative strategy, and growth execution across conversion tracking, paid media, automation, SEO, content, and web development."
        canonicalUrl="/service"
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-t border-white/10 bg-[#05070d] pb-14 pt-6 text-center md:pb-20 md:pt-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,13,1)_0%,rgba(7,10,16,0.94)_54%,rgba(5,7,13,1)_100%)]" />
          <div
            className="absolute inset-0 hidden opacity-[0.026] sm:block"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
              backgroundSize: "84px 84px",
            }}
          />
          <div className="absolute left-1/2 top-[28%] h-[18rem] w-[24rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,175,239,0.12)_0%,rgba(51,204,153,0.07)_42%,transparent_74%)] blur-[76px] md:h-[25rem] md:w-[42rem] md:blur-[124px]" />
          <div className="absolute -left-[12%] bottom-[-20%] hidden h-[22rem] w-[22rem] rounded-full bg-atd-blue/[0.14] blur-[118px] md:block" />
          <div className="absolute right-[-8%] top-[18%] hidden h-[18rem] w-[14rem] rotate-[18deg] bg-[radial-gradient(circle_at_center,rgba(0,51,153,0.24),transparent_64%)] blur-[88px] md:block" />
        </div>
        <div className="container relative mx-auto px-6 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <HeroEyebrow className="mb-5 mx-auto">Services</HeroEyebrow>
            <h1 className="title-safe mx-auto max-w-3xl font-extrabold leading-[1.08] tracking-normal md:text-5xl lg:text-6xl">
              <span className="block whitespace-nowrap text-[1.45rem] min-[360px]:text-[1.7rem] min-[390px]:text-[1.8rem] min-[430px]:text-[1.95rem] sm:text-[2.15rem] md:text-5xl lg:text-6xl">
                Marketing Systems That
              </span>
              <span className="mt-2 block text-[1.45rem] leading-[1.04] text-gradient min-[360px]:text-[1.7rem] min-[390px]:text-[1.8rem] min-[430px]:text-[1.95rem] sm:text-[2.15rem] md:text-5xl md:leading-tight lg:text-6xl">
                <span className="block whitespace-nowrap">Track, Acquire, and</span>
                <span className="block">Retain</span>
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[1.02rem] leading-8 text-muted-foreground sm:text-lg sm:leading-relaxed">
              We build the measurement, paid media, and automation infrastructure that makes growth
              predictable, not accidental. Every service is designed to connect, compound, and
              prove its value.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="w-full max-w-[17rem] gap-1.5 rounded-xl bg-primary px-8 text-primary-foreground hover:bg-primary/90 sm:w-auto sm:max-w-none"
              >
                <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>
                  {BOOK_A_FREE_STRATEGY_CALL_CTA.label}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full max-w-[17rem] gap-1.5 rounded-xl border-white/20 hover:bg-white/5 sm:w-auto sm:max-w-none"
              >
                <Link to={REQUEST_A_FREE_TRACKING_AUDIT_CTA.to}>
                  {REQUEST_A_FREE_TRACKING_AUDIT_CTA.label}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Core Services */}
      <section className="border-t border-white/10 bg-[#070a10] pt-12 pb-0 md:pt-16">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionIntro
            eyebrow="Core Services"
            title="Where We Deliver the Most Impact"
            description="Our three core services form the backbone of every engagement. They're designed to work together, but each delivers measurable value on its own."
            width="wide"
            titleClassName="text-[1.65rem] md:text-3xl"
            descriptionClassName="hidden max-w-2xl text-sm sm:block"
            className="mb-5 md:mb-8"
          />

          <div className="grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {primaryServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={service.path}
                  onMouseEnter={() => prefetchRoute(service.path)}
                  onFocus={() => prefetchRoute(service.path)}
                  className={cn(
                    "group grid h-full grid-cols-[44px_minmax(0,1fr)] items-start gap-3 rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 md:flex md:flex-col md:p-6",
                    service.flagship
                      ? "border-primary/25 bg-[linear-gradient(180deg,rgba(0,51,153,0.16)_0%,rgba(0,175,239,0.04)_42%,rgba(51,204,153,0.04)_100%)] shadow-[0_18px_60px_rgba(0,51,153,0.12)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <div className="flex items-start md:mb-5 md:items-center md:gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] md:h-10 md:w-10">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    {service.flagship && (
                      <span className="hidden rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground md:inline-flex">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold leading-snug md:text-xl">{service.title}</h3>
                      {service.flagship && (
                        <span className="inline-flex shrink-0 rounded-full bg-primary px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary-foreground md:hidden">
                          Core
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-6 text-muted-foreground md:mt-2.5 md:line-clamp-none md:flex-1 md:text-sm md:leading-7">
                      {service.description}
                    </p>
                    <p className="mt-4 hidden border-t border-white/[0.07] pt-4 text-[13px] leading-6 text-muted-foreground/70 md:block">
                      <span className="mr-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-primary/60">Best for</span>
                      {service.bestFor}
                    </p>
                    <span className="mt-2.5 inline-flex items-center gap-1 text-[13px] font-medium text-primary transition-colors md:mt-4 md:text-sm">
                      {service.ctaLabel}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Supporting Services */}
      <section className="bg-[#070a10] pb-14 pt-10 md:pb-20 md:pt-14">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="border-t border-border pt-8 md:pt-10">
            <SectionIntro
              eyebrow="Supporting Services"
              title="More Services"
              width="wide"
              titleClassName="text-[1.65rem] md:text-3xl"
              className="mb-5 md:mb-6"
            />
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] md:grid md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
              {supportingServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  <Link
                    to={service.path}
                    onMouseEnter={() => prefetchRoute(service.path)}
                    onFocus={() => prefetchRoute(service.path)}
                    className="group grid h-full grid-cols-[40px_minmax(0,1fr)] items-start gap-3 py-4 transition-colors duration-300 hover:bg-white/[0.015] md:px-5 md:py-6 lg:px-6"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.035]">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 lg:flex lg:h-full lg:flex-col lg:self-stretch">
                      <h4 className="truncate text-[15px] font-semibold md:truncate-none">{service.title}</h4>
                      <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                        {service.description}
                      </p>
                      <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-primary/80 transition-colors group-hover:text-primary sm:mt-4 lg:pt-3">
                        {service.ctaLabel}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operating System */}
      <section className="border-t border-white/10 bg-[#080b10] py-12 md:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionIntro
            eyebrow="Operating System"
            mode="content"
            title="One connected operating system."
            description="Tracking, media, automation, and reporting work together as a single commercial system."
            maxWidth="lg"
            className="mb-5 md:mb-10"
            titleClassName="text-[1.65rem] leading-[1.12] md:text-4xl"
            descriptionClassName="hidden max-w-2xl text-sm leading-6 sm:block md:text-base md:leading-7"
          />
          <div className="relative mx-auto w-full max-w-[24rem] lg:hidden">
            {ctmaFramework.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className="relative grid grid-cols-[44px_minmax(0,1fr)] items-start gap-4 py-3.5"
              >
                {i < ctmaFramework.length - 1 && (
                  <div className="absolute left-[21px] top-12 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/45 to-white/10" />
                )}
                <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-background text-[0.76rem] font-bold text-primary">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-[1.06rem] font-semibold tracking-normal text-foreground">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-muted-foreground">
                    {mobileCtmaSummaries[item.title] ?? item.summary}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.05),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(0,175,239,0.05),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.01)_100%)] p-4 shadow-[0_22px_54px_rgba(0,0,0,0.14)] md:p-6 lg:block lg:p-7">
            <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "84px 84px" }} />
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
            <div className="relative grid gap-5 lg:grid-cols-[0.66fr_1.34fr] lg:gap-8">
              <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
                className="flex h-full flex-col"
              >
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/82">System Logic</p>
                  <h3 className="mt-3 max-w-sm text-[1.72rem] font-semibold tracking-normal text-foreground md:mt-4 md:text-[2rem] md:leading-[1.18]">
                    Every layer hands cleaner signal to the next.
                  </h3>
                </div>
                <div className="relative mt-5 flex items-center justify-center lg:mt-6 lg:justify-start">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,175,239,0.08)_0%,transparent_55%)] blur-3xl" />
                  <div className="relative w-full max-w-[300px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,175,239,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.01)_100%)] p-2 shadow-[0_20px_44px_rgba(0,0,0,0.16)] sm:max-w-[340px] md:max-w-[360px] md:p-2.5">
                    <img src="/ctma-operating-system-optimized.jpg" alt="AlphaTrack Digital connected operating system flow" className="relative w-full rounded-xl object-contain" loading="lazy" width={1100} height={604} />
                  </div>
                </div>
              </motion.div>
              <div className="grid grid-cols-1 gap-2.5 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/10 p-1.5 md:gap-0 md:p-0">
                {ctmaFramework.map((item, i) => (
                  <motion.div
                    key={item.title}
                    custom={i}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    className={cn(
                      "grid grid-cols-[42px_minmax(0,1fr)] items-center gap-3 rounded-[18px] border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 transition-colors duration-300 hover:bg-white/[0.03] md:min-h-0 md:rounded-none md:border-0 md:bg-transparent md:grid-cols-[74px_minmax(0,1fr)] md:items-start md:gap-4 md:px-5 md:py-[1.125rem]",
                      i !== 0 && "md:border-t md:border-white/[0.08]",
                    )}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(0,175,239,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.012)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_14px_26px_rgba(0,0,0,0.14)] md:h-11 md:w-11 md:rounded-[18px]">
                      <span className="bg-[linear-gradient(135deg,#ffffff_0%,#33cc99_48%,#00afef_100%)] bg-clip-text text-[0.88rem] font-black tracking-[0.18em] text-transparent md:text-[0.98rem]">
                        {item.title.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-[0.95rem] font-semibold tracking-normal text-foreground md:text-[1.06rem]">{item.title}</h3>
                      <p className="mt-1 max-w-xl text-[11px] leading-5 text-muted-foreground whitespace-nowrap md:mt-1.5 md:text-sm md:leading-6 md:whitespace-normal">
                        <span className="md:hidden">{mobileCtmaSummaries[item.title] ?? item.summary}</span>
                        <span className="hidden md:inline">{item.summary}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Engage */}
      <section className="border-t border-white/10 bg-[#070a10] py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionIntro
            eyebrow="How We Engage"
            mode="content"
            title="Three ways to work with us."
            description="Choose the shape of engagement that fits the stage you are in now, not a bloated retainer by default."
            maxWidth="lg"
            className="mb-7 md:mb-10"
            titleClassName="leading-[1.1] md:text-4xl"
            descriptionClassName="max-w-2xl text-sm leading-6 md:text-base md:leading-7"
          />
          <div className="md:hidden">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,175,239,0.05),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(51,204,153,0.05),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_18px_46px_rgba(0,0,0,0.12)]">
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
              {engagementModels.map((model, i) => (
                <motion.article
                  key={`${model.label}-mobile`}
                  custom={i}
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView={shouldReduceMotion ? undefined : "visible"}
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className={cn(
                    "relative px-4 py-4",
                    i !== 0 && "border-t border-white/[0.08]",
                    model.label === "Growth" && "bg-[radial-gradient(circle_at_right,rgba(51,204,153,0.06)_0%,transparent_34%)]",
                  )}
                >
                  <span className={cn("inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]", model.label === "Growth" ? "border-primary/50 bg-primary/12 text-primary" : "border-white/[0.10] bg-white/[0.05] text-primary/90")}>
                    {model.label}
                  </span>
                  <h3 className="mt-2.5 text-[1rem] font-semibold tracking-normal text-foreground">{model.title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{mobileEngagementSummaries[model.label] ?? model.idealFor}</p>
                </motion.article>
              ))}
            </div>
          </div>
          <div className="hidden gap-4 md:grid md:gap-5 lg:grid-cols-[0.92fr_1.16fr_0.92fr] lg:items-stretch">
            {engagementModels.map((model, i) => (
              <motion.div
                key={model.label}
                custom={i}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 shadow-[0_18px_46px_rgba(0,0,0,0.10)] md:p-6 lg:p-7",
                  model.label === "Growth"
                    ? "order-first border-primary/18 bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.09)_0%,transparent_28%),radial-gradient(circle_at_bottom_right,rgba(51,204,153,0.08)_0%,transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.01)_100%)] lg:order-none lg:-translate-y-4"
                    : "border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.008)_100%)]",
                )}
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.05]">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
                <div className="relative flex h-full flex-col">
                  <div className="mb-5 flex items-start justify-between gap-3 md:mb-6">
                    <span className={cn("rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]", model.label === "Growth" ? "border-primary/50 bg-primary/12 text-primary" : "border-white/[0.10] bg-white/[0.05] text-primary/90")}>
                      {model.label}
                    </span>
                    <span className="text-[11px] text-muted-foreground">{model.timeframe}</span>
                  </div>
                  <h3 className="text-[1.08rem] font-semibold tracking-normal text-foreground md:text-[1.2rem]">{model.title}</h3>
                  <p className="mt-3 max-w-[32ch] text-sm leading-6 text-muted-foreground md:leading-7">{model.idealFor}</p>
                  <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-4 md:mt-6 md:space-y-2.5 md:pt-5">
                    {model.includes.map((item, itemIndex) => (
                      <li key={item} className={cn("flex items-start gap-2.5", itemIndex >= 3 && "hidden md:flex")}>
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
                        <span className="text-xs leading-5 text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-t border-white/10 bg-[#080b10] py-12">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {tractionMetrics.map((m, i) => {
              const colors = ["#003399", "#00AFEF", "#33CC99", "#00AFEF", "#003399"];
              return (
                <div
                  key={m.label}
                  className={cn(
                    "text-center",
                    tractionMetrics.length % 2 === 1 &&
                      i === tractionMetrics.length - 1 &&
                      "col-span-2 sm:col-span-1",
                  )}
                >
                  <p className="text-3xl font-extrabold tracking-normal md:text-4xl" style={{ color: colors[i] }}>
                    {m.value}
                  </p>
                  <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground/70">
                    {m.label}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground/50">
            Performance milestones across client campaigns.
          </p>
        </div>
      </section>

      <FeaturedTestimonialSection
        title="What clients say about working with us."
        className="bg-white/[0.01]"
      />

      <CTASection
        title={
          <>
            Not Sure Where to Start?{" "}
            <br />
            <span className="text-gradient">We'll Point You in the Right Direction.</span>
          </>
        }
        description="Tell us where growth is getting stuck and we'll point you to the service that should come first."
        primaryCta={BOOK_A_FREE_STRATEGY_CALL_CTA}
        secondaryCta={REQUEST_A_FREE_TRACKING_AUDIT_CTA}
        variant="hero-close"
      />
    </>
  );
};

export default Services;
