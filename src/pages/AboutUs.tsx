import { useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  Check,
  GraduationCap,
  Gamepad2,
  Package2,
  Plane,
  Shirt,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";

import { Link } from "react-router-dom";

import CTASection from "@/components/shared/CTASection";
import PageSection from "@/components/shared/PageSection";
import SectionIntro from "@/components/shared/SectionIntro";
import SEO from "@/components/shared/SEO";
import {
  companyProfile,
  ctmaFramework,
  engagementModels,
  primarySectors,
  sectorSummaries,
  whyChoosePoints,
} from "@/data/companyProfile";
import { cn } from "@/lib/utils";

// ─── Animation variants ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

type SectorName = (typeof primarySectors)[number];

const sectorVisuals: Record<
  SectorName,
  {
    icon: LucideIcon;
    accentClassName: string;
  }
> = {
  "Ecommerce & Retail": {
    icon: ShoppingCart,
    accentClassName: "bg-secondary/14 text-secondary",
  },
  FMCG: {
    icon: Package2,
    accentClassName: "bg-amber-500/14 text-amber-400",
  },
  Education: {
    icon: GraduationCap,
    accentClassName: "bg-violet-500/14 text-violet-400",
  },
  SaaS: {
    icon: BriefcaseBusiness,
    accentClassName: "bg-primary/14 text-primary",
  },
  "Entertainment & Hospitality": {
    icon: Plane,
    accentClassName: "bg-rose-500/14 text-rose-400",
  },
  "Real Estate": {
    icon: Building2,
    accentClassName: "bg-blue-400/14 text-blue-400",
  },
  Fashion: {
    icon: Shirt,
    accentClassName: "bg-pink-500/14 text-pink-400",
  },
  Gaming: {
    icon: Gamepad2,
    accentClassName: "bg-lime-400/14 text-lime-300",
  },
};

const sectorSlugs: Record<SectorName, string> = {
  "Ecommerce & Retail": "ecommerce-retail",
  FMCG: "fmcg",
  Education: "education",
  SaaS: "saas",
  "Entertainment & Hospitality": "entertainment-hospitality",
  "Real Estate": "real-estate",
  Fashion: "fashion",
  Gaming: "gaming",
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

const founderStory = {
  lead:
    "Most agencies start with channels. We start with measurement, because scaling weak data only multiplies waste.",
  support:
    "That belief shaped AlphaTrack Digital. We clean the signal first, then build the media and automation that compound.",
  approach:
    "Start with clean signal, read the numbers honestly, then build growth on top of that truth.",
};

// ─── Gradient chapter separator ────────────────────────────────────────────

function ChapterSeparator() {
  return (
    <div className="pointer-events-none relative py-3">
      <div className="mx-auto h-px max-w-[54%] bg-gradient-to-r from-transparent via-primary/22 to-transparent" />
      <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 bg-background shadow-[0_0_0_6px_rgba(7,10,16,0.9)]" />
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

const AboutUs = () => {
  const shouldReduceMotion = useReducedMotion();
  const [heroImgError, setHeroImgError] = useState(false);
  const [imgError, setImgError] = useState(false);

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
        className="relative overflow-hidden border-b border-white/10 bg-[#111214] py-12 md:py-20 lg:py-24"
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
          <div className="mx-auto grid max-w-6xl items-stretch gap-4 md:gap-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.88fr)]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#121315]/88 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-[2px] sm:p-7 md:rounded-[32px] md:p-10 lg:p-12"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.06)_0%,transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.08)_0%,transparent_26%),radial-gradient(circle_at_bottom_right,rgba(0,175,239,0.05)_0%,transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.01)_100%)]" />
              <div className="pointer-events-none absolute inset-y-0 right-[-12%] w-[48%] bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_24%,transparent_62%)] opacity-50 blur-3xl" />
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
                  backgroundSize: "88px 88px",
                }}
              />
              <div className="relative">
                <span className="inline-flex items-center rounded-full border border-white/[0.10] bg-white/[0.03] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90">
                  About Us
                </span>
                <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/32 md:mt-8 md:text-[12px]">
                  We are
                </p>
                <h1 className="mt-2 max-w-xl text-[2.65rem] font-bold tracking-[-0.04em] text-foreground sm:text-[3.3rem] lg:text-[4.35rem]">
                  <span className="block leading-[0.94]">AlphaTrack</span>
                  <span className="mt-1 block w-fit pb-[0.14em] leading-[0.9] text-gradient">
                    Digital
                  </span>
                </h1>
                <p className="mt-6 max-w-2xl text-[0.98rem] leading-7 text-muted-foreground md:mt-8 md:text-lg md:leading-[1.8]">
                  We are a measurement-first growth agency helping brands fix the
                  parts of marketing that create the most confusion: tracking,
                  paid media, reporting, and follow-through. If the foundation
                  is unclear, we make it clear before scale happens.
                </p>

                <div className="relative mt-6 md:hidden">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,175,239,0.08)_0%,transparent_68%)] blur-2xl" />
                  <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#0f1115] shadow-[0_18px_46px_rgba(0,0,0,0.18)]">
                    {heroImgError ? (
                      <div className="flex h-[188px] items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.16)_0%,rgba(17,17,20,0.92)_62%)]">
                        <span className="text-center text-sm uppercase tracking-[0.22em] text-white/55">
                          Team Visual
                        </span>
                      </div>
                    ) : (
                      <img
                        src="/about-hero-team-2026.png"
                        alt="AlphaTrack Digital team reviewing performance dashboards"
                        className="h-[188px] w-full object-cover object-[center_12%]"
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

              <div className="relative mt-6 border-t border-white/[0.08] pt-4 md:mt-10 md:pt-5">
                <p className="text-[13px] leading-6 text-muted-foreground md:text-sm md:whitespace-nowrap">
                  {companyProfile.established}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.08 }}
              className="relative hidden h-full min-h-[280px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0f1115] shadow-[0_24px_60px_rgba(0,0,0,0.18)] sm:min-h-[320px] md:block md:rounded-[32px] lg:min-h-[420px]"
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

      {/* ─── Manifesto ─────────────────────────────────────────────────── */}
      <PageSection mode="content" spacing="compact" border="top" surface="quiet">
        <div className="relative overflow-hidden rounded-[34px] border border-white/[0.08] bg-[#101214]/88 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.14)] md:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.05)_0%,transparent_26%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.06)_0%,transparent_24%),radial-gradient(circle_at_bottom_right,rgba(0,175,239,0.05)_0%,transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.01)_100%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "96px 96px",
            }}
          />

          <div className="relative mx-auto max-w-4xl text-center">
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
              className="mx-auto mt-5 max-w-4xl text-[1.58rem] leading-[1.22] tracking-[-0.03em] text-foreground sm:text-[1.78rem] md:text-[2.45rem] md:leading-[1.34]"
            >
              Too many brands run campaigns without reliable tracking, automate
              without a clear view of the pipeline, and make budget calls on
              incomplete data.
            </motion.h2>
          </div>
        </div>
      </PageSection>

      <PageSection
        mode="content"
        spacing="compact"
        surface="quiet"
        className="pt-0 md:pt-0"
        containerClassName="px-4 lg:px-8"
      >
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="relative overflow-hidden rounded-[34px] border border-white/[0.08] bg-[#0f1216]/92 p-6 shadow-[0_24px_64px_rgba(0,0,0,0.14)] md:p-7 lg:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.05)_0%,transparent_24%),radial-gradient(circle_at_82%_22%,rgba(255,255,255,0.05)_0%,transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)]" />
          <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

          <div className="relative grid gap-5 lg:grid-cols-[0.34fr_0.66fr] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/82">
                Built On
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-foreground/88 lg:mx-0 lg:mt-4 lg:text-[1.05rem] lg:leading-8">
                The standards we bring into every engagement, every recommendation, and every build.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:flex lg:flex-wrap lg:gap-3">
              {companyProfile.coreValues.map((value, index) => (
                <span
                  key={value}
                  className={cn(
                    "relative overflow-hidden rounded-[18px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.08)_0%,transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.012)_100%)] px-3.5 py-3 text-center text-[11px] font-semibold tracking-[0.1em] text-foreground/84 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
                    index === companyProfile.coreValues.length - 1 && "col-span-2 sm:col-span-3 lg:col-span-1",
                  )}
                >
                  <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
                  {value}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </PageSection>

      <ChapterSeparator />

      {/* ─── How We Think ──────────────────────────────────────────────── */}
      <PageSection mode="content" border="top" spacing="compact">
        <SectionIntro
          eyebrow="How We Think"
          mode="content"
          title="Three principles we don't compromise on."
          description="These ideas shape every brief, every build, and every client relationship."
          maxWidth="lg"
          className="mb-12"
          titleClassName="leading-[1.1] md:text-4xl"
          descriptionClassName="max-w-2xl text-sm leading-6 md:text-base md:leading-7"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoosePoints.map((item, i) => (
            <motion.div
              key={item.title}
              custom={i}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              className="glass-card flex flex-col p-6 lg:p-8"
            >
              <div className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
                0{i + 1}
              </div>
              <h3 className="mb-3 text-lg font-semibold leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* ─── Operating Model ───────────────────────────────────────────── */}
      <PageSection mode="content" border="top" surface="quiet" spacing="compact">
        <SectionIntro
          eyebrow="Operating System"
          mode="content"
          title="One connected operating system."
          description="Tracking, media, automation, and reporting work together as a single commercial system."
          maxWidth="lg"
          className="mb-7 md:mb-10"
          titleClassName="leading-[1.1] md:text-4xl"
          descriptionClassName="max-w-2xl text-sm leading-6 md:text-base md:leading-7"
        />

        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.05),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(0,175,239,0.05),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.01)_100%)] p-4 shadow-[0_22px_54px_rgba(0,0,0,0.14)] md:rounded-[32px] md:p-6 lg:p-7">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
              backgroundSize: "84px 84px",
            }}
          />
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
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/82">
                  System Logic
                </p>
                <h3 className="mt-3 max-w-sm text-[1.72rem] font-semibold tracking-tight text-foreground md:mt-4 md:text-[2rem] md:leading-[1.18]">
                  Every layer hands cleaner signal to the next.
                </h3>
              </div>
              <div className="relative mt-5 flex items-center justify-center lg:mt-6 lg:justify-start">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,175,239,0.08)_0%,transparent_55%)] blur-3xl" />
                <div className="relative w-full max-w-[300px] overflow-hidden rounded-[22px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,175,239,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.01)_100%)] p-2 shadow-[0_20px_44px_rgba(0,0,0,0.16)] sm:max-w-[340px] md:max-w-[360px] md:rounded-[24px] md:p-2.5">
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_80%_20%,rgba(51,204,153,0.08)_0%,transparent_36%)]" />
                  <img
                    src="/ctma-operating-system-optimized.jpg"
                    alt="AlphaTrack Digital connected operating system flow"
                    className="relative w-full rounded-[22px] object-contain"
                    loading="lazy"
                    width={1100}
                    height={604}
                  />
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-2.5 overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/10 p-1.5 md:gap-0 md:rounded-[28px] md:p-0">
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
                    <h3 className="text-[0.95rem] font-semibold tracking-tight text-foreground md:text-[1.06rem]">
                      {item.title}
                    </h3>
                    <p className="mt-1 max-w-xl text-[11px] leading-5 text-muted-foreground whitespace-nowrap md:mt-1.5 md:text-sm md:leading-6 md:whitespace-normal">
                      <span className="md:hidden">
                        {mobileCtmaSummaries[item.title] ?? item.summary}
                      </span>
                      <span className="hidden md:inline">{item.summary}</span>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* ─── Engagement Models ─────────────────────────────────────────── */}
      <PageSection mode="content" border="top">
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
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,175,239,0.05),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(51,204,153,0.05),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_18px_46px_rgba(0,0,0,0.12)]">
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
                  model.label === "Growth" &&
                    "bg-[radial-gradient(circle_at_right,rgba(51,204,153,0.06)_0%,transparent_34%)]",
                )}
              >
                <span
                  className={cn(
                    "inline-flex rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                    model.label === "Growth"
                      ? "border-primary/50 bg-primary/12 text-primary"
                      : "border-white/[0.10] bg-white/[0.05] text-primary/90",
                  )}
                >
                  {model.label}
                </span>
                <h3 className="mt-2.5 text-[1rem] font-semibold tracking-tight text-foreground">
                  {model.title}
                </h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                  {mobileEngagementSummaries[model.label] ?? model.idealFor}
                </p>
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
                "relative flex h-full flex-col overflow-hidden rounded-[24px] border p-5 shadow-[0_18px_46px_rgba(0,0,0,0.10)] md:rounded-[30px] md:p-6 lg:p-7",
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
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span
                      className={cn(
                        "rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                        model.label === "Growth"
                          ? "border-primary/50 bg-primary/12 text-primary"
                          : "border-white/[0.10] bg-white/[0.05] text-primary/90",
                      )}
                    >
                      {model.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{model.timeframe}</span>
                </div>

                <h3 className="text-[1.08rem] font-semibold tracking-tight text-foreground md:text-[1.2rem]">
                  {model.title}
                </h3>
                <p className="mt-3 max-w-[32ch] text-sm leading-6 text-muted-foreground md:leading-7">
                  {model.idealFor}
                </p>

                <ul className="mt-5 space-y-2 border-t border-white/[0.07] pt-4 md:mt-6 md:space-y-2.5 md:pt-5">
                {model.includes.map((item, itemIndex) => (
                  <li
                    key={item}
                    className={cn(
                      "flex items-start gap-2.5",
                      itemIndex >= 3 && "hidden md:flex",
                    )}
                  >
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
                    <span className="text-xs leading-5 text-muted-foreground">{item}</span>
                  </li>
                ))}
                </ul>

              </div>
            </motion.div>
          ))}
        </div>
      </PageSection>

      {/* ─── Industries ────────────────────────────────────────────────── */}
      <PageSection mode="content" border="top" spacing="compact">
        <div data-testid="industries-section">
          <SectionIntro
            eyebrow="Industries"
            mode="content"
            title="Where we do our strongest work."
            maxWidth="lg"
            className="mb-6 md:mb-8"
            titleClassName="leading-[1.1] md:text-4xl"
          />

          <div className="relative overflow-hidden rounded-[30px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,175,239,0.05),transparent_22%),radial-gradient(circle_at_82%_16%,rgba(51,204,153,0.05),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.022)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_18px_50px_rgba(0,0,0,0.12)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.14) 1px, transparent 1px)",
                backgroundSize: "84px 84px",
              }}
            />
            <div className="grid grid-cols-2 md:hidden">
              {primarySectors.map((sector, index) => {
                const visual = sectorVisuals[sector];
                const Icon = visual.icon;

                return (
                  <motion.article
                    key={`${sector}-mobile`}
                    custom={index}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={{ once: true, margin: "-40px" }}
                  variants={fadeUp}
                  className={cn(
                      "group relative flex flex-col items-center justify-center border-white/[0.08] px-3 py-5 text-center transition-colors duration-300 hover:bg-white/[0.02]",
                      index >= 2 && "border-t",
                      index % 2 === 1 && "border-l",
                    )}
                  >
                    <Link
                      to={`/expertise/${sectorSlugs[sector]}`}
                      className="absolute inset-0 z-10"
                      aria-label={sector}
                    />
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]",
                          visual.accentClassName,
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-[0.88rem] font-semibold leading-snug tracking-tight text-foreground">
                        {sector}
                      </h3>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4">
              {primarySectors.map((sector, index) => {
                const visual = sectorVisuals[sector];
                const Icon = visual.icon;

                return (
                  <motion.article
                    key={sector}
                    data-testid="industry-card"
                    custom={index}
                    initial={shouldReduceMotion ? false : "hidden"}
                    whileInView={shouldReduceMotion ? undefined : "visible"}
                    viewport={{ once: true, margin: "-40px" }}
                    variants={fadeUp}
                    className={cn(
                      "group relative min-h-[108px] border-white/[0.08] p-4 transition-colors duration-300 hover:bg-white/[0.02] md:min-h-[160px] md:p-7",
                      index >= 1 && "border-t md:border-t-0",
                      index % 2 === 1 && "md:border-l xl:border-l-0",
                      index >= 4 && "xl:border-t",
                      index % 4 !== 0 && "xl:border-l",
                    )}
                  >
                    <Link
                      to={`/expertise/${sectorSlugs[sector]}`}
                      className="absolute inset-0 z-10"
                      aria-label={sector}
                    />
                    <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] md:h-12 md:w-12 md:rounded-2xl",
                          visual.accentClassName,
                        )}
                      >
                        <Icon className="h-4.5 w-4.5 md:h-5.5 md:w-5.5" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-[1rem] font-semibold leading-snug tracking-tight text-foreground md:text-[1.26rem]">
                          {sector}
                        </h3>
                        <p className="mt-2.5 hidden max-w-[28rem] text-sm leading-6 text-muted-foreground md:block">
                          {sectorSummaries[sector]}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </PageSection>

      <ChapterSeparator />

      {/* ─── Testimonial ───────────────────────────────────────────────── */}

      {/* ─── Founder ───────────────────────────────────────────────────── */}
      <PageSection mode="content" border="top" spacing="compact">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,175,239,0.05),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(51,204,153,0.05),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.022)_0%,rgba(255,255,255,0.008)_100%)] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.12)] md:hidden"
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <div className="flex min-h-[210px] items-stretch gap-3">

            {/* Photo column */}
            <div className="relative w-[38%] shrink-0 overflow-hidden rounded-[16px] border border-white/[0.09] bg-black">
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

            {/* Text column */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-primary/90">
                  The Founder
                </p>
                <h2 className="text-lg font-bold leading-[1.15] tracking-tight text-foreground">
                  Built from a <span className="text-gradient">clear</span> belief.
                </h2>
                <p className="mt-2 line-clamp-4 text-[0.72rem] leading-[1.5] text-muted-foreground">
                  {founderStory.lead}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-white/[0.06] pt-2.5">
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
                  <p className="text-[0.65rem] leading-tight text-muted-foreground">
                    {companyProfile.founder.title}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        <div className="hidden gap-7 md:grid md:gap-10 lg:grid-cols-[360px_1fr] lg:items-center xl:grid-cols-[390px_1fr]">

          {/* Portrait */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 relative w-full max-w-[300px] self-start md:max-w-[340px] lg:order-1 lg:max-w-[360px] lg:self-end"
          >
            {/* Glow halo */}
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-br from-atd-blue/20 via-secondary/10 to-primary/[0.06] blur-3xl" />

            {/* Image frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] border border-white/[0.09] bg-[#0a0d12]">
              {imgError ? (
                /* Fallback initials avatar */
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
              {/* Edge vignette to blend white photo bg into dark site */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(226_38%_7%/0.6)_100%)]" />
              {/* Bottom fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/75 to-transparent" />
            </div>

            {/* Attribution chip overlaid at bottom */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-background/80 px-4 py-3 backdrop-blur-md md:bottom-4 md:left-4 md:right-4">
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
                  {companyProfile.founder.title}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
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
              <h2 className="max-w-none text-[2.2rem] font-bold tracking-tight text-foreground md:whitespace-nowrap md:text-[3.05rem] md:leading-[1.02]">
                Built from a <span className="text-gradient">clear</span> belief.
              </h2>
            </div>

            <div className="mt-6 space-y-4 md:mt-8">
              <p className="text-[1rem] leading-[1.72] text-foreground md:text-lg md:leading-[1.85]">
                {founderStory.lead}
              </p>
              <p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                {founderStory.support}
              </p>
            </div>

            <div className="mt-7 border-t border-white/[0.08] pt-5 md:mt-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/78">
                Approach
              </p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground md:leading-7">
                {founderStory.approach}
              </p>
            </div>

          </motion.div>
        </div>
      </PageSection>

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
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
