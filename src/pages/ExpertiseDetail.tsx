import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import PageSection from "@/components/shared/PageSection";
import SectionIntro from "@/components/shared/SectionIntro";
import SEO from "@/components/shared/SEO";
import ServiceHero from "@/components/shared/ServiceHero";
import { BOOK_A_FREE_STRATEGY_CALL_CTA, EXPLORE_SERVICES_CTA } from "@/config/cta";
import { getExpertiseBySlug } from "@/data/expertise";
import { cn } from "@/lib/utils";

/* ─── Animation variants ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

/* ─── Per-service accent palette (Tracking → Media → Automation) ─── */
const serviceAccents = [
  {
    numColor: "text-secondary",
    topBar: "from-secondary/[0.45] via-secondary/[0.12] to-transparent",
    hoverBorder: "hover:border-secondary/[0.22]",
    hoverShadow: "hover:shadow-[0_12px_40px_rgba(0,175,239,0.07)]",
  },
  {
    numColor: "text-foreground/35",
    topBar: "from-white/[0.12] via-white/[0.04] to-transparent",
    hoverBorder: "hover:border-white/[0.14]",
    hoverShadow: "hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
  },
  {
    numColor: "text-primary",
    topBar: "from-primary/[0.45] via-primary/[0.12] to-transparent",
    hoverBorder: "hover:border-primary/[0.22]",
    hoverShadow: "hover:shadow-[0_12px_40px_rgba(51,204,153,0.07)]",
  },
] as const;

/* ─── Gradient rule between sections ─────────────────────────────── */
const GradientRule = () => (
  <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
);

/* ─────────────────────────────────────────────────────────────────── */

const ExpertiseDetail = () => {
  const { slug } = useParams();
  const expertise = slug ? getExpertiseBySlug(slug) : undefined;

  if (!expertise) {
    return (
      <>
        <SEO
          title="Expertise | AlphaTrack Digital"
          description="Explore the industries AlphaTrack Digital supports across tracking, paid media, and automation."
          canonicalUrl="/expertise"
        />
        <PageSection mode="hero" spacing="compact">
          <SectionIntro
            as="h1"
            eyebrow="Expertise"
            mode="hero"
            title="That expertise page could not be found."
            description="Go back to the homepage or explore our services to see where AlphaTrack Digital can help."
            maxWidth="lg"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Back to Home
            </Link>
            <Link
              to="/service"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-foreground"
            >
              Explore Services
            </Link>
          </div>
        </PageSection>
      </>
    );
  }

  return (
    <>
      <SEO
        title={`${expertise.name} Marketing | AlphaTrack Digital`}
        description={expertise.heroDescription}
        canonicalUrl={`/expertise/${expertise.slug}`}
      />

      {/* ── 1. Hero ──────────────────────────────────────────────── */}
      <ServiceHero
        breadcrumbs={[
          { label: "Expertise", path: "/expertise" },
          { label: expertise.name },
        ]}
        badgeLabel={`${expertise.name} Expertise`}
        title={expertise.heroTitle}
        description={expertise.heroDescription}
        snapshot={expertise.heroSnapshot}
        tone="tracking"
        bodyWidth="wide"
        primaryCta={BOOK_A_FREE_STRATEGY_CALL_CTA}
        secondaryCta={{ ...EXPLORE_SERVICES_CTA, style: "outline" }}
      />

      <GradientRule />

      {/* ── 2. Challenges ────────────────────────────────────────── */}
      <PageSection mode="content" spacing="spacious">
        <SectionIntro
          eyebrow="Common Challenges"
          mode="content"
          title={`What often slows growth in ${expertise.name}.`}
          description="These are the gaps we usually help teams fix first."
          maxWidth="lg"
          className="mb-12"
          titleClassName="text-[1.85rem] leading-[1.18] md:text-[2.15rem]"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid gap-5 sm:grid-cols-3"
        >
          {expertise.challenges.map((challenge, index) => (
            <motion.div
              key={challenge}
              custom={index}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary/[0.18] hover:bg-white/[0.04] hover:shadow-[0_12px_48px_rgba(0,0,0,0.22)]"
            >
              {/* Watermark number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-1 -top-3 select-none text-[6.5rem] font-black leading-none text-white/[0.03] transition-all duration-500 group-hover:text-primary/[0.05]"
              >
                {index + 1}
              </span>

              {/* Top accent bar */}
              <div className="mb-6 h-[2px] w-8 rounded-full bg-primary/40 transition-all duration-300 group-hover:w-14 group-hover:bg-primary/70" />

              <p className="relative text-[15px] leading-[1.75] text-foreground/85">{challenge}</p>

              <span className="mt-5 block text-[10px] font-bold uppercase tracking-[0.28em] text-primary/50">
                Challenge 0{index + 1}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </PageSection>

      <GradientRule />

      {/* ── 3. How We Help ───────────────────────────────────────── */}
      <PageSection mode="content" spacing="spacious" className="bg-white/[0.008]">
        <SectionIntro
          eyebrow="How We Help"
          mode="content"
          title={`How we support ${expertise.name} brands.`}
          description="Our work usually starts with these three areas."
          maxWidth="lg"
          className="mb-12"
          titleClassName="text-[1.85rem] leading-[1.18] md:text-[2.15rem]"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="flex flex-col gap-3"
        >
          {expertise.serviceFocus.map((item, index) => {
            const accent = serviceAccents[index];
            return (
              <motion.div
                key={item.title}
                custom={index}
                variants={fadeUp}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]",
                  "transition-all duration-300",
                  accent.hoverBorder,
                  accent.hoverShadow,
                )}
              >
                {/* Coloured top accent bar */}
                <div
                  className={cn(
                    "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r",
                    accent.topBar,
                  )}
                />

                <div className="grid gap-4 px-7 py-7 md:grid-cols-[56px_1fr_auto] md:items-center md:gap-8">
                  {/* Number */}
                  <span
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-[0.28em] transition-colors duration-300",
                      accent.numColor,
                    )}
                  >
                    0{index + 1}
                  </span>

                  {/* Body */}
                  <div className="space-y-1.5">
                    <h3 className="text-[15px] font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-[1.7] text-muted-foreground">{item.description}</p>
                  </div>

                  {/* CTA */}
                  <div className="shrink-0 md:justify-self-end">
                    <Link
                      to={item.path}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[13px] font-medium text-foreground/75 transition-all duration-200 hover:border-primary/25 hover:bg-primary/[0.07] hover:text-primary"
                    >
                      Explore service
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </PageSection>

      <GradientRule />

      {/* ── 4. Outcomes ──────────────────────────────────────────── */}
      <PageSection mode="content" spacing="spacious">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionIntro
              eyebrow="Results You Can Expect"
              mode="content"
              title="What success should look like."
              description="The work should lead to clearer reporting, better decisions, and stronger commercial performance over time."
              maxWidth="lg"
              titleClassName="text-[1.85rem] leading-[1.18] md:text-[2.15rem]"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-3"
          >
            {expertise.outcomes.map((item, index) => (
              <motion.div
                key={item}
                custom={index}
                variants={fadeUp}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.025] px-6 py-5 transition-all duration-300 hover:border-primary/[0.2] hover:bg-white/[0.04]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.08]">
                  <CheckCircle2 className="h-[17px] w-[17px] text-primary" />
                </div>
                <p className="text-[15px] font-medium leading-snug text-foreground/90">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageSection>

      <GradientRule />

      {/* ── 5. Who This Is Right For ─────────────────────────────── */}
      <PageSection
        mode="content"
        spacing="spacious"
        className="relative overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[55%] top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[120px]" />
          <div className="absolute left-[20%] top-1/3 h-64 w-64 -translate-y-1/2 rounded-full bg-secondary/[0.03] blur-[100px]" />
        </div>

        <div className="relative grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionIntro
              eyebrow="Is This Right For You"
              mode="content"
              title="Built for teams at this stage."
              description="We work best with brands that have foundations in place and are ready to grow more intelligently."
              maxWidth="lg"
              titleClassName="text-[1.85rem] leading-[1.18] md:text-[2.15rem]"
            />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-col gap-3"
          >
            {expertise.idealFor.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.025] px-6 py-5 transition-all duration-300 hover:border-primary/[0.18] hover:bg-white/[0.04]"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/[0.12] text-[10px] font-bold text-primary/80 ring-1 ring-primary/20">
                  {index + 1}
                </span>
                <p className="text-[14.5px] leading-[1.7] text-foreground/85">{item}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageSection>

      <GradientRule />

      {/* ── 6. FAQ ───────────────────────────────────────────────── */}
      <FAQAccordion
        items={expertise.faqs}
        eyebrow="Common Questions"
        title={`Questions about ${expertise.name} marketing.`}
        description="If you have a question we haven't covered, book a call and we will walk you through it."
        variant="panel"
        density="comfortable"
        defaultOpenItem={0}
      />

      {/* ── 7. CTA Close ─────────────────────────────────────────── */}
      <CTASection
        title={
          <>
            Need a clearer growth plan for{" "}
            <span className="text-gradient">{expertise.name}</span>?
          </>
        }
        description="Book a free strategy call and we will show you the clearest next step across tracking, paid media, and automation."
        secondaryCta={{ label: "Explore Services", to: "/service" }}
        variant="hero-close"
        proofChips={["No lock-in contracts", "Free first strategy call", "Built for your sector"]}
      />
    </>
  );
};

export default ExpertiseDetail;
