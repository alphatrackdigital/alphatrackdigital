import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Eye, Handshake, Lightbulb, Sparkles } from "lucide-react";

import CTASection from "@/components/shared/CTASection";
import PageSection from "@/components/shared/PageSection";
import SEO from "@/components/shared/SEO";
import { companyProfile } from "@/data/companyProfile";

const founderStory = {
  lead:
    "AlphaTrack Digital was built on a simple standard: marketing should be measurable before it is scaled, and every growth decision should be easier to explain.",
  support:
    "That belief shapes how we work with clients: we clean up the signal, clarify what is working, and build campaigns and automation around decisions the team can trust.",
  approach:
    "Clean tracking first. Clear reporting next. Smarter growth decisions after that.",
};

// ─── Page ──────────────────────────────────────────────────────────────────

const focusAreas = [
  {
    title: "Conversion Tracking",
    eyebrow: "Track",
    description: "Set up cleaner attribution so campaign and funnel decisions are based on reliable signal.",
  },
  {
    title: "Paid Media",
    eyebrow: "Acquire",
    description: "Plan, launch, and improve campaigns around business outcomes, not vanity metrics.",
  },
  {
    title: "Marketing Automation",
    eyebrow: "Nurture",
    description: "Build follow-up systems that move leads, customers, and retention journeys forward.",
  },
] as const;

const heroPath = [
  { label: "Track", description: "Clean signal" },
  { label: "Acquire", description: "Qualified demand" },
  { label: "Nurture", description: "Better follow-up" },
] as const;

const valueDetails = [
  {
    title: "Integrity",
    icon: BadgeCheck,
    colorClassName: "border-primary/30 bg-primary/10 text-primary",
  },
  {
    title: "Transparency",
    icon: Eye,
    colorClassName: "border-atd-blue/35 bg-atd-blue/10 text-atd-blue",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    colorClassName: "border-cyan-400/35 bg-cyan-400/10 text-cyan-300",
  },
  {
    title: "Excellence",
    icon: Sparkles,
    colorClassName: "border-secondary/30 bg-secondary/10 text-secondary",
  },
  {
    title: "Client-Centric Service",
    icon: Handshake,
    colorClassName: "border-sky-300/35 bg-sky-300/10 text-sky-200",
  },
] as const;

const AboutUs = () => {
  const shouldReduceMotion = useReducedMotion();
  const [heroImgError, setHeroImgError] = useState(false);
  const [imgError, setImgError] = useState(false);
  const founderDisplayTitle = "Founder & CEO";

  return (
    <>
      <SEO
        title="About Us | AlphaTrack Digital"
        description="AlphaTrack Digital is a measurement-first digital growth agency that builds tracking, paid media, and automation systems so brands can scale on clean data."
        canonicalUrl="/about-us"
      />

      {/* ─── Hero ──────────────────────────────────────────────────────── */}
      <section
        data-testid="about-hero-section"
        className="relative overflow-hidden border-b border-white/10 bg-[#111214] py-10 md:py-20 lg:py-24"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.32) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.32) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage:
              "linear-gradient(180deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 58%, rgba(0,0,0,0.1) 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.08)_0%,transparent_32%),radial-gradient(circle_at_bottom_right,rgba(0,175,239,0.08)_0%,transparent_30%)]" />

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.88fr)]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
              className="flex h-full flex-col justify-between"
            >
              <div className="flex h-full flex-col">
                <span className="inline-flex w-fit items-center rounded-full border border-white/[0.10] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/90 md:text-[11px] md:tracking-[0.18em]">
                  About Us
                </span>
                <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/36 md:mt-8 md:text-[12px] md:tracking-[0.18em]">
                  We are
                </p>
                <h1 className="mt-2 max-w-xl text-[2.35rem] font-bold tracking-tight text-foreground sm:text-[3.3rem] lg:text-[4.35rem] lg:tracking-[-0.04em]">
                  <span className="block leading-[0.94]">AlphaTrack</span>
                  <span className="mt-1 block w-fit pb-[0.14em] leading-[0.9] text-gradient">
                    Digital
                  </span>
                </h1>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-7 text-muted-foreground md:mt-8 md:text-lg md:leading-[1.8]">
                  We are a measurement-first growth agency helping brands improve
                  tracking, paid media, reporting, and follow-up systems. Our
                  work gives teams a clearer foundation before they scale.
                </p>
                <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted-foreground md:text-base md:leading-7">
                  We partner with growing teams that need marketing execution to
                  connect back to clean attribution, faster decisions, and
                  practical customer journeys.
                </p>

                <div className="mt-auto hidden border-t border-white/[0.08] pt-5 md:block md:pt-6">
                  <div className="grid max-w-xl grid-cols-3 gap-2">
                    {heroPath.map((step, index) => (
                      <div key={step.label} className="relative min-w-0">
                        {index < heroPath.length - 1 && (
                          <div className="absolute right-[-0.25rem] top-3 hidden h-px w-4 bg-white/14 sm:block" />
                        )}
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary/82">
                          {step.label}
                        </p>
                        <p className="mt-1 text-sm leading-5 text-foreground/78">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative mt-7 md:hidden">
                  <div className="relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0f1115] shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
                    {heroImgError ? (
                      <div className="flex h-[204px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.12)_0%,rgba(17,17,20,0.92)_62%)]">
                        <span className="text-center text-sm uppercase tracking-[0.22em] text-white/55">
                          Team Visual
                        </span>
                      </div>
                    ) : (
                      <img
                        src="/about-hero-team-2026.png"
                        alt="AlphaTrack Digital team reviewing performance dashboards"
                        className="h-[204px] w-full object-cover object-[center_12%]"
                        loading="eager"
                        width={900}
                        height={1122}
                        onError={() => setHeroImgError(true)}
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,18,0.02)_0%,rgba(12,14,18,0.06)_100%)]" />
                  </div>
                </div>
              </div>

            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="relative hidden h-full min-h-0 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0f1115] shadow-[0_24px_60px_rgba(0,0,0,0.18)] md:block md:rounded-[32px]"
            >
              {heroImgError ? (
                <div className="flex h-full min-h-[280px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.16)_0%,rgba(17,17,20,0.92)_62%)] sm:min-h-[320px] lg:min-h-[420px]">
                  <span className="text-center text-sm uppercase tracking-[0.22em] text-white/55">
                    Team Visual
                  </span>
                </div>
              ) : (
                <img
                  src="/about-hero-team-2026.png"
                  alt="AlphaTrack Digital team reviewing performance dashboards"
                  className="h-full w-full object-cover object-[center_12%]"
                  loading="eager"
                  width={900}
                  height={1122}
                  onError={() => setHeroImgError(true)}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,18,0.04)_0%,rgba(12,14,18,0.05)_36%,rgba(12,14,18,0.34)_100%)]" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.04]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Founder ───────────────────────────────────────────────────── */}
      <PageSection mode="content" border="top" spacing="default" surface="glow">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
              What We Do
            </p>
            <h2 className="mx-auto mt-4 max-w-4xl text-[2rem] font-bold leading-[1.08] tracking-tight text-foreground md:text-[2.8rem]">
              <span className="block">The growth work that makes</span>
              <span className="block">scaling easier to trust.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
              ATD connects the core parts of a modern growth system: clean
              measurement, qualified traffic, and follow-up journeys that keep
              momentum moving after the first click.
            </p>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.08 }}
            className="mx-auto mt-9 grid max-w-5xl gap-3 md:grid-cols-3"
          >
            {focusAreas.map((area, index) => (
              <article
                key={area.title}
                className="group relative overflow-hidden rounded-[16px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.014)_100%)] p-4 transition-colors hover:border-primary/25 md:min-h-[170px] md:p-5"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/82">
                    {area.eyebrow}
                  </p>
                  <span className="text-xs font-semibold text-white/22">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold leading-tight text-foreground md:text-lg">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {area.description}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </PageSection>

      {/* ─── Manifesto + Core Values ───────────────────────────────────── */}
      <PageSection mode="content" spacing="default" border="top" surface="quiet">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
            className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85"
          >
            Why We Exist
          </motion.p>
          <motion.h2
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : 0.04 }}
            className="mx-auto mt-4 max-w-4xl text-[1.65rem] leading-[1.18] tracking-tight text-foreground sm:text-[1.95rem] md:mt-5 md:text-[2.8rem] md:leading-[1.22] md:tracking-[-0.03em]"
          >
            We help teams replace unclear campaign data with tracking, reporting,
            and follow-up systems they can trust.
          </motion.h2>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="mx-auto mt-9 max-w-5xl border-t border-white/[0.08] pt-8 text-center md:mt-12 md:pt-10"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/82">
            Built On
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {valueDetails.map((value) => (
              <div
                key={value.title}
                className="inline-flex min-h-0 items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-left transition-colors hover:border-primary/25"
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${value.colorClassName}`}>
                  <value.icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold leading-tight text-foreground">
                  {value.title}
                </h3>
              </div>
            ))}
          </div>
        </motion.div>
      </PageSection>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <PageSection mode="content" border="top" spacing="compact">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
          className="md:hidden"
        >
          <div className="grid min-h-[176px] grid-cols-[36%_1fr] items-stretch gap-3">
            <div className="relative overflow-hidden rounded-[14px] border border-white/[0.09] bg-black">
              {imgError ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-atd-blue/20 via-background to-primary/10">
                  <span className="text-2xl font-bold text-primary/40">
                    {companyProfile.founder.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              ) : (
                <img
                  src="/founder-portrait-2026.jpg"
                  alt={`${companyProfile.founder.name}, ${companyProfile.founder.title}`}
                  className="h-full w-full object-cover object-top brightness-90"
                  loading="lazy"
                  width={760}
                  height={1140}
                  onError={() => setImgError(true)}
                />
              )}
            </div>

            <div className="flex flex-1 flex-col">
              <div>
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                  The Founder
                </p>
                <h2 className="text-[1rem] font-bold leading-[1.18] tracking-tight text-foreground">
                  Founder-led and measurement-first.
                </h2>
                <p className="mt-2 line-clamp-4 text-[0.72rem] leading-[1.5] text-muted-foreground">
                  {founderStory.lead}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-2 border-t border-white/[0.06] pt-2.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
                  <img
                    src="/atd-circle-logo.png"
                    alt="AlphaTrack Digital logo"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-[0.72rem] font-semibold leading-tight text-foreground">
                    {companyProfile.founder.name}
                  </p>
                  <p className="whitespace-nowrap text-[0.65rem] leading-tight text-muted-foreground">
                    {founderDisplayTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto hidden max-w-5xl gap-7 md:grid md:gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center xl:grid-cols-[240px_minmax(0,1fr)]">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 relative w-full max-w-[220px] self-start md:max-w-[230px] lg:order-1 lg:max-w-[240px] lg:self-center"
          >
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-atd-blue/12 via-secondary/[0.06] to-primary/[0.04] blur-2xl" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0a0d12]">
              {imgError ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-atd-blue/20 via-background to-primary/10">
                  <span className="text-6xl font-bold text-primary/40">
                    {companyProfile.founder.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
              ) : (
                <img
                  src="/founder-portrait-2026.jpg"
                  alt={`${companyProfile.founder.name}, ${companyProfile.founder.title}`}
                  className="h-full w-full object-cover object-[center_10%] brightness-90"
                  loading="lazy"
                  width={760}
                  height={1140}
                  onError={() => setImgError(true)}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(226_38%_7%/0.6)_100%)]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/75 to-transparent" />
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5 rounded-xl border border-white/[0.08] bg-background/80 px-3 py-2.5 backdrop-blur-md">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
                <img
                  src="/atd-circle-logo.png"
                  alt="AlphaTrack Digital logo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight text-foreground">
                  {companyProfile.founder.name}
                </p>
                <p className="mt-0.5 whitespace-nowrap text-[11px] leading-tight text-muted-foreground">
                  {founderDisplayTitle}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.55, delay: shouldReduceMotion ? 0 : 0.12 }}
            className="order-2 flex flex-col self-start lg:order-2"
          >
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
                The Founder
              </p>
              <h2 className="max-w-2xl text-[1.75rem] font-bold tracking-tight text-foreground md:text-[2.15rem] md:leading-[1.08]">
                Founder-led, measurement-first.
              </h2>
            </div>

            <div className="mt-4 max-w-[44rem] space-y-3 md:mt-5">
              <p className="text-[0.98rem] leading-7 text-foreground">
                {founderStory.lead}
              </p>
              <p className="text-sm leading-6 text-muted-foreground md:text-[0.95rem] md:leading-7">
                {founderStory.support}
              </p>
            </div>

            <div className="mt-5 max-w-[44rem] border-t border-white/[0.08] pt-4 md:mt-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/78">
                Approach
              </p>
              <p className="mt-2.5 text-sm leading-6 text-muted-foreground">
                {founderStory.approach}
              </p>
            </div>
          </motion.div>
        </div>
      </PageSection>

      <CTASection
        title={
          <>
            Need a clearer path to <span className="text-gradient">growth?</span>
          </>
        }
        primaryCta={{ label: "Get in Touch", to: "/contact-us" }}
        variant="service-close"
        titleClassName="text-[1.74rem] leading-[1.08] md:text-[1.95rem]"
      />
    </>
  );
};

export default AboutUs;
