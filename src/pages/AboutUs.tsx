import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import CTASection from "@/components/shared/CTASection";
import PageSection from "@/components/shared/PageSection";
import SEO from "@/components/shared/SEO";
import { companyProfile } from "@/data/companyProfile";

const founderStory = {
  lead:
    "Most agencies start with channels. We start with measurement, because scaling weak data only multiplies waste.",
  support:
    "That belief shaped AlphaTrack Digital. We clean the signal first, then build the media and automation that compound.",
  approach:
    "Start with clean signal, read the numbers honestly, then build growth on top of that truth.",
};

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
              className="flex h-full flex-col justify-between"
            >
              <div>
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

              <div className="mt-8 border-t border-white/[0.08] pt-4 md:mt-12 md:pt-5">
                <p className="text-[13px] leading-6 text-muted-foreground md:text-sm">
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

      {/* ─── Founder ───────────────────────────────────────────────────── */}
      <PageSection mode="content" border="top" spacing="default">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
          className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,175,239,0.05),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(51,204,153,0.05),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.022)_0%,rgba(255,255,255,0.008)_100%)] p-3 shadow-[0_18px_48px_rgba(0,0,0,0.12)] md:hidden"
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <div className="flex min-h-[170px] items-stretch gap-3">

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
            <div className="flex flex-1 flex-col">
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
            className="mx-auto mt-5 max-w-4xl text-[1.58rem] leading-[1.22] tracking-[-0.03em] text-foreground sm:text-[1.78rem] md:text-[2.45rem] md:leading-[1.34]"
          >
            Too many brands run campaigns without reliable tracking, automate
            without a clear view of the pipeline, and make budget calls on
            incomplete data.
          </motion.h2>
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : 0.1 }}
          className="mt-12 border-t border-white/[0.08] pt-10"
        >
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/82 md:text-left">
            Built On
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5 md:justify-start">
            {companyProfile.coreValues.map((value) => (
              <span
                key={value}
                className="rounded-full border border-white/[0.10] bg-white/[0.03] px-4 py-2 text-[11px] font-semibold tracking-[0.1em] text-foreground/80"
              >
                {value}
              </span>
            ))}
          </div>
        </motion.div>
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
