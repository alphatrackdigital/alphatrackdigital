import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, Eye, Filter, Handshake, Lightbulb, Sparkles, Target, TrendingUp } from "lucide-react";

import CTASection from "@/components/shared/CTASection";
import HeroEyebrow from "@/components/shared/HeroEyebrow";
import PageSection from "@/components/shared/PageSection";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { companyProfile, whyChoosePoints } from "@/data/companyProfile";

const founderStory = {
  lead:
    "AlphaTrack Digital was built on a simple standard: marketing should be measurable before it is scaled, and every growth decision should be easier to explain.",
  support:
    "That belief shapes how we work with clients: we clean up the signal, clarify what is working, and build campaigns and automation around decisions the team can trust.",
  approach:
    "Clean tracking first. Clear reporting next. Smarter growth decisions after that.",
};

// ─── Page ──────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

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
        className="relative overflow-hidden border-b border-white/10 bg-[#05070d] py-10 md:py-20 lg:py-24"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_20%,rgba(51,204,153,0.11)_0%,transparent_30%),radial-gradient(circle_at_78%_28%,rgba(0,175,239,0.13)_0%,transparent_32%),radial-gradient(circle_at_74%_86%,rgba(0,51,153,0.16)_0%,transparent_34%),linear-gradient(180deg,#05070d_0%,#071016_48%,#05070d_100%)]" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "84px 84px",
            maskImage:
              "radial-gradient(ellipse at 42% 38%, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.38) 46%, rgba(0,0,0,0) 78%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle,rgba(0,175,239,0.75)_1px,transparent_1.5px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_at_74%_44%,black_0%,transparent_62%)]" />
        <svg
          className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[58%] opacity-70 lg:block"
          viewBox="0 0 760 620"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="aboutHeroSignal" x1="30" x2="730" y1="310" y2="310">
              <stop stopColor="#00AFEF" stopOpacity="0" />
              <stop offset="0.48" stopColor="#00AFEF" stopOpacity="0.26" />
              <stop offset="1" stopColor="#33CC99" stopOpacity="0.18" />
            </linearGradient>
          </defs>
          <path d="M40 180C174 132 276 166 386 246C504 332 616 356 734 288" stroke="url(#aboutHeroSignal)" strokeWidth="1.4" />
          <path d="M88 440C226 372 322 404 444 334C558 268 640 260 738 318" stroke="url(#aboutHeroSignal)" strokeWidth="1.4" />
          <path d="M246 98V532M526 74V574M674 132V512" stroke="rgba(255,255,255,0.04)" />
        </svg>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#05070d] to-transparent" />

        <div className="container relative mx-auto px-6 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.88fr)]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
              className="flex h-full flex-col justify-between"
            >
              <div className="flex h-full flex-col">
                <HeroEyebrow>About Us</HeroEyebrow>
                <p className="mt-9 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/36 md:mt-8 md:text-[12px] md:tracking-[0.18em]">
                  We are
                </p>
                <h1 className="mt-2 max-w-xl whitespace-nowrap text-[2.08rem] font-bold tracking-tight text-foreground sm:text-[3.3rem] lg:text-[4.35rem] lg:tracking-[-0.04em]">
                  <span className="inline leading-[0.94] sm:block">AlphaTrack</span>
                  <span className="ml-2 inline w-fit pb-[0.14em] leading-[0.9] text-gradient sm:ml-0 sm:mt-1 sm:block">
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
                  <div className="absolute -inset-3 rounded-[24px] bg-[radial-gradient(circle_at_70%_24%,rgba(0,175,239,0.18),transparent_42%),radial-gradient(circle_at_18%_80%,rgba(51,204,153,0.13),transparent_42%)] blur-xl" />
                  <div className="relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0f1115] shadow-[0_14px_34px_rgba(0,0,0,0.16)]">
                    {heroImgError ? (
                      <div className="flex h-[330px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.12)_0%,rgba(17,17,20,0.92)_62%)]">
                        <span className="text-center text-sm uppercase tracking-[0.22em] text-white/55">
                          Team Visual
                        </span>
                      </div>
                    ) : (
                      <img
                        src="/about-hero-team-2026.png"
                        alt="AlphaTrack Digital team reviewing performance dashboards"
                        className="h-[330px] w-full object-cover object-[center_12%]"
                        loading="eager"
                        width={900}
                        height={1122}
                        onError={() => setHeroImgError(true)}
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,18,0.02)_0%,rgba(12,14,18,0.06)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/[0.08]" />
                  </div>
                </div>
              </div>

            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="relative hidden h-full min-h-0 md:block"
            >
              <div className="pointer-events-none absolute -inset-5 rounded-[38px] bg-[radial-gradient(circle_at_72%_20%,rgba(0,175,239,0.20),transparent_42%),radial-gradient(circle_at_12%_78%,rgba(51,204,153,0.13),transparent_46%)] blur-2xl" />
              <div className="relative h-full min-h-0 overflow-hidden rounded-[28px] border border-white/[0.09] bg-[#0f1115] shadow-[0_24px_70px_rgba(0,0,0,0.26)] md:rounded-[32px]">
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
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(12,14,18,0.02)_0%,rgba(12,14,18,0.06)_36%,rgba(12,14,18,0.36)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(0,175,239,0.10)_0%,transparent_30%)]" />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-primary/[0.08]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Founder ───────────────────────────────────────────────────── */}
      <PageSection mode="content" border="top" spacing="default" surface="glow" containerClassName="px-6 sm:px-6 lg:px-8">
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
      <PageSection mode="content" spacing="default" border="top" surface="quiet" containerClassName="px-6 sm:px-6 lg:px-8">
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

      {/* How We Think */}
      <section className="border-t border-white/10 py-16 md:py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <SectionIntro
            eyebrow="How We Think"
            mode="content"
            title="Three principles we don't compromise on."
            description="These ideas shape every brief, every build, and every client relationship."
            align="center"
            maxWidth="lg"
            className="mb-5 md:mb-7"
            titleClassName="text-[1.65rem] leading-[1.12] md:text-4xl"
            descriptionClassName="hidden max-w-2xl text-sm leading-6 sm:block md:text-base md:leading-7"
          />

          {/* Desktop diagram */}
          <div className="relative mx-auto hidden max-w-6xl lg:block" style={{ height: "260px" }}>
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 1100 260"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="hwt-g1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#003399" stopOpacity="0.55" />
                  <stop offset="55%" stopColor="#00AFEF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#33CC99" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="hwt-g2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00AFEF" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#33CC99" stopOpacity="0.55" />
                </linearGradient>
                <filter id="hwt-glow" x="-20%" y="-80%" width="140%" height="260%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <path d="M 190 36 C 320 36, 380 52, 508 36" stroke="url(#hwt-g1)" strokeWidth="2" strokeDasharray="10 7" filter="url(#hwt-glow)" />
              <path d="M 581 36 C 710 52, 770 36, 899 36" stroke="url(#hwt-g2)" strokeWidth="2" strokeDasharray="10 7" filter="url(#hwt-glow)" />
              <circle cx="190" cy="36" r="3.5" fill="#003399" opacity="0.7" />
              <circle cx="508" cy="36" r="3.5" fill="#00AFEF" opacity="0.7" />
              <circle cx="581" cy="36" r="3.5" fill="#00AFEF" opacity="0.7" />
              <circle cx="899" cy="36" r="3.5" fill="#33CC99" opacity="0.7" />
            </svg>

            {whyChoosePoints.map((item, i) => {
              const nodeStyles = [
                { left: "0%", top: "0" },
                { left: "35.5%", top: "18px" },
                { left: "71%", top: "0" },
              ] as const;
              const NodeIcon = [Target, TrendingUp, Filter][i];
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView={shouldReduceMotion ? undefined : "visible"}
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className="text-center"
                  style={{ position: "absolute", width: "28%", ...nodeStyles[i] }}
                >
                  <motion.div
                    style={{
                      background: "linear-gradient(135deg, #003399, #00AFEF, #33CC99)",
                      padding: "2px",
                      borderRadius: "50%",
                      width: "72px",
                      height: "72px",
                      marginBottom: "12px",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                    animate={shouldReduceMotion ? {} : {
                      boxShadow: [
                        "0 0 0 0 rgba(0,175,239,0.18)",
                        "0 0 0 10px rgba(0,175,239,0)",
                        "0 0 0 0 rgba(0,175,239,0.18)",
                      ],
                    }}
                    transition={{ duration: 3.2, repeat: Infinity, delay: i * 1, ease: "easeInOut" }}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full" style={{ background: "rgba(8,13,26,0.85)" }}>
                      <NodeIcon className="h-7 w-7 text-primary" />
                    </div>
                  </motion.div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/75">0{i + 1}</p>
                  <h3 className="mb-2.5 text-[1.2rem] font-semibold leading-snug text-foreground">{item.title}</h3>
                  <p className="text-[13.5px] leading-[1.7] text-muted-foreground">{item.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile / tablet editorial list */}
          <div className="border-y border-white/[0.08] divide-y divide-white/[0.08] lg:hidden">
            {whyChoosePoints.map((item, i) => {
              const MobileIcon = [Target, TrendingUp, Filter][i];
              return (
                <motion.div
                  key={item.title}
                  custom={i}
                  initial={shouldReduceMotion ? false : "hidden"}
                  whileInView={shouldReduceMotion ? undefined : "visible"}
                  viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className="grid grid-cols-[42px_minmax(0,1fr)] items-start gap-4 py-5 sm:grid-cols-[64px_minmax(0,1fr)] sm:py-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.04] sm:h-12 sm:w-12">
                    <MobileIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80 sm:mb-2 sm:text-[11px] sm:tracking-[0.22em]">0{i + 1}</div>
                    <h3 className="text-base font-semibold leading-snug text-foreground sm:text-lg">{item.title}</h3>
                    <p className="mt-1.5 text-[13px] leading-6 text-muted-foreground sm:text-sm sm:leading-7">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <PageSection mode="content" border="top" spacing="compact" containerClassName="px-6 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
          className="md:hidden"
        >
          {/* Photo */}
          <div className="relative h-[240px] overflow-hidden rounded-[16px] border border-white/[0.09] bg-black mx-2">
            {imgError ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-atd-blue/20 via-background to-primary/10">
                <span className="text-3xl font-bold text-primary/40">
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

          {/* Text */}
          <div className="mt-5 px-2">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/90">
              The Founder
            </p>
            <h2 className="whitespace-nowrap text-[clamp(0.95rem,4.8vw,1.5rem)] font-bold leading-[1.15] tracking-tight text-foreground">
              Founder-led. Measurement-first.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {founderStory.lead}
            </p>
            <div className="mt-5 flex items-center gap-3 border-t border-white/[0.07] pt-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-white/10">
                <img
                  src="/atd-circle-logo.png"
                  alt="AlphaTrack Digital logo"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight text-foreground">
                  {companyProfile.founder.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {founderDisplayTitle}
                </p>
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
            Need a clearer path to
            <br />
            <span className="text-gradient">growth?</span>
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
