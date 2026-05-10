import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileText,
  Megaphone,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTASection from "@/components/shared/CTASection";
import FeaturedTestimonialSection from "@/components/shared/FeaturedTestimonialSection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import HeroEyebrow from "@/components/shared/HeroEyebrow";
import SEO from "@/components/shared/SEO";
import { BOOK_A_FREE_STRATEGY_CALL_CTA } from "@/config/cta";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";


interface PremiumLinkCard {
  icon: LucideIcon;
  title: string;
  label: string;
  description: string;
  shortDescription: string;
  path: string;
  ctaLabel: string;
  surfaceClassName: string;
}

const processSteps = [
  { num: 1, phase: "Audit", title: "Account & Signal Audit", description: "We review tracking, account history, creative performance, landing pages, and where budget is currently leaking.", shortDescription: "We review your account, tracking, and where budget is leaking." },
  { num: 2, phase: "Plan", title: "Channel Strategy", description: "We decide which channels deserve a role, what each one should do, and how budget should move between them.", shortDescription: "We decide which channels to use and what each one needs to do." },
  { num: 3, phase: "Launch", title: "Campaign Build", description: "We structure campaigns, audiences, creative tests, bidding, and reporting around qualified outcomes.", shortDescription: "We build campaigns, audiences, and tests around real outcomes." },
  { num: 4, phase: "Improve", title: "Optimisation & Reporting", description: "We monitor signal quality, improve creative and budget allocation, and report what is driving return.", shortDescription: "We improve what is working and report what is driving return." },
];


const whyCards = [
  { title: "Signal Comes First", mobileTitle: "Signal first", description: "We do not scale spend on broken attribution. If the account cannot learn from the right events, we fix that first." },
  { title: "Channel Roles Stay Clear", mobileTitle: "Clear roles", description: "Every platform has a job in the funnel, so budget decisions are deliberate instead of reactive." },
  { title: "Creative Testing Is Structured", mobileTitle: "Structured testing", description: "Angles, audiences, and offers are tested in a way that produces learning the team can use." },
  { title: "Reporting Connects to Decisions", mobileTitle: "Decision reporting", description: "We report on the numbers that should change budget, creative, landing pages, and follow-up." },
];

const connectedServices: PremiumLinkCard[] = [
  {
    icon: Target,
    label: "Measurement foundation",
    title: "Conversion Tracking",
    shortDescription: "Cleaner events for stronger optimisation.",
    description: "Paid media performs better when Google, Meta, LinkedIn, and your CRM can optimise toward conversion events you actually trust.",
    path: "/service/conversion-tracking",
    ctaLabel: "See Conversion Tracking",
    surfaceClassName:
      "bg-[linear-gradient(180deg,rgba(0,51,153,0.18)_0%,rgba(0,175,239,0.06)_46%,rgba(255,255,255,0.015)_100%)]",
  },
  {
    icon: TrendingUp,
    label: "Lead follow-up",
    title: "Marketing Automation",
    shortDescription: "Turn more demand into pipeline.",
    description: "Once campaigns bring in the right leads, fast CRM follow-up and nurture journeys help convert more of that demand.",
    path: "/service/marketing-automation",
    ctaLabel: "See Marketing Automation",
    surfaceClassName:
      "bg-[linear-gradient(180deg,rgba(51,204,153,0.14)_0%,rgba(0,175,239,0.04)_48%,rgba(255,255,255,0.015)_100%)]",
  },
];

const serviceFaqs = [
  {
    question: "Can you work with our current ad accounts and campaign history?",
    answer: "Yes. We usually begin by auditing the existing account, conversion tracking, campaign structure, and creative history before deciding what to keep, rebuild, or cut.",
  },
  {
    question: "How quickly should we expect to see useful signal or early improvements?",
    answer: "Initial signal often starts showing within the first 2-4 weeks. Stronger efficiency gains usually come after enough data has been collected to improve targeting, creative, and budget allocation.",
  },
  {
    question: "Do you handle creative strategy as well as campaign management?",
    answer: "Yes. We can shape messaging, ad copy, creative direction, and feedback loops with your team, or work alongside an internal or external creative partner if production already sits elsewhere.",
  },
  {
    question: "How do reporting and attribution work?",
    answer: "We tie paid media reporting back to the tracking setup wherever possible, so decisions are based on qualified leads, revenue signals, and channel contribution rather than platform vanity metrics alone.",
  },
  {
    question: "Which platforms do you manage?",
    answer: "We commonly manage Meta Ads, Google Ads, LinkedIn Ads, YouTube, Microsoft Ads, TikTok, Snapchat, and programmatic campaigns. The final channel mix depends on your audience, offer, budget, and measurement readiness.",
  },
];

const PaidMedia = () => {
  return (
    <>
      <SEO
        title="Paid Media Management | AlphaTrack Digital"
        description="Strategic paid social and search campaigns that drive qualified traffic. Meta Ads, Google Ads, and LinkedIn with measurement built in from day one."
        canonicalUrl="/service/paid-media"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Paid Media Management",
          provider: { "@type": "Organization", name: "AlphaTrack Digital", url: "https://alphatrack.digital" },
          description: "Strategic paid social and search campaigns with measurement built in from day one.",
          areaServed: ["Ghana", "Nigeria", "United Kingdom"],
          url: "https://alphatrack.digital/service/paid-media",
        }}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://alphatrack.digital/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://alphatrack.digital/service" },
              { "@type": "ListItem", position: 3, name: "Paid Media Management", item: "https://alphatrack.digital/service/paid-media" },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[36rem] overflow-hidden bg-[#05070d] pb-24 pt-6 text-center md:min-h-[42.5rem] md:pb-36 md:pt-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(0,175,239,0.14)_0%,rgba(0,51,153,0.08)_46%,transparent_72%)]" />
        </div>
        <div className="container relative z-10 mx-auto px-6 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Services", path: "/service" },
              { label: "Paid Media Management" },
            ]}
          />
          <div className="mx-auto max-w-[62rem]">
            <motion.div
              className="mt-14 md:mt-24"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <HeroEyebrow className="mb-4 md:mb-5">Paid Media Management</HeroEyebrow>
              <h1 className="title-safe pb-4 text-[2.25rem] font-extrabold leading-[1.14] tracking-normal md:pb-5 md:text-6xl lg:text-[4.65rem]">
                <span className="block">Paid Media That</span>
                <span className="title-safe-inline mt-1 block text-gradient">Proves Its Value.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:mt-6 md:text-lg">
                Strategic paid social and search campaigns built to drive qualified demand, improve spend efficiency, and show what every channel is contributing.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:mt-10">
                <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground hover:bg-primary/90">
                  <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>
                    {BOOK_A_FREE_STRATEGY_CALL_CTA.label}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem / Fix */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_70%_42%_at_50%_0%,rgba(255,255,255,0.018),transparent_72%),linear-gradient(180deg,rgba(255,255,255,0.008)_0%,rgba(255,255,255,0)_62%)] pb-8 pt-14 lg:pb-12 lg:pt-20">
        <div className="container mx-auto max-w-6xl px-6 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-10">
            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.16em] text-primary md:text-xs md:tracking-[0.22em]">
              The Problem & How We Fix It
            </span>
            <h2 className="title-safe text-xl font-extrabold leading-[1.2] tracking-normal md:text-3xl lg:whitespace-nowrap">
              Where the budget leaks and how we{" "}
              <span className="title-safe-inline text-gradient">stop the leak.</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(80%_60%_at_0%_0%,rgba(0,51,153,0.08),transparent_60%),radial-gradient(80%_60%_at_100%_100%,rgba(51,204,153,0.05),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            {/* Top gradient border */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(0,175,239,0.36)_25%,rgba(51,204,153,0.4)_75%,transparent)]" />

            {/* Column headers */}
            <div className="grid grid-cols-2 border-b border-white/[0.05] lg:items-start">
              {/* Problem header */}
              <div className="relative overflow-hidden p-4 lg:px-10 lg:py-5">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_0%,rgba(0,51,153,0.14),transparent_65%)]" />
                <div className="relative flex flex-col items-center lg:items-start">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-atd-blue/35 bg-atd-blue/[0.12] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-atd-cyan md:gap-2 md:px-3 md:text-[11px] md:tracking-[0.16em]">
                    <AlertCircle className="h-3 w-3" />
                    <span className="md:hidden">Problem</span>
                    <span className="hidden md:inline">The Problem</span>
                  </span>
                  <p className="mt-4 hidden text-xl font-extrabold leading-snug tracking-normal lg:block lg:whitespace-nowrap lg:text-[17px]">
                    Most paid media spend disappears{" "}
                    <span className="relative inline-block text-atd-cyan/85 line-through decoration-atd-cyan/55 decoration-2">
                      without proof
                    </span>
                    .
                  </p>
                </div>
              </div>

              {/* Fix header */}
              <div className="relative overflow-hidden border-l border-white/[0.07] p-4 lg:px-10 lg:py-5">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_100%_0%,rgba(51,204,153,0.1),transparent_65%)]" />
                <div className="relative flex flex-col items-center lg:items-start">
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/30 bg-primary/[0.1] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-primary md:gap-2 md:px-3 md:text-[11px] md:tracking-[0.16em]">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="md:hidden">Fix</span>
                    <span className="hidden md:inline">How We Fix It</span>
                  </span>
                  <p className="mt-4 hidden text-xl font-extrabold leading-snug tracking-normal lg:block lg:whitespace-nowrap lg:text-[17px]">
                    Strategy-led. Measurement-backed.{" "}
                    <span className="text-gradient">Built for return.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Paired rows */}
            {[
              { problem: "Budget moves without knowing what's working.",          fix: { text: "Campaigns built around conversion events, not platform metrics." } },
              { problem: "Broad targeting brings clicks that don't convert.",     fix: { text: "Each channel gets a clear role, search captures demand and social shapes it." } },
              { problem: "Creative wins happen but can't be repeated.",           fix: { text: "Budget and creative decisions move toward qualified leads and return." } },
            ].map((pair, i) => (
              <div
                key={i}
                className="group grid grid-cols-2 border-b border-white/[0.05] last:border-b-0"
              >
                {/* Problem */}
                <div className="flex items-center gap-3 px-4 py-3 lg:px-10 lg:py-4">
                  <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-atd-cyan/70">
                    0{i + 1}
                  </span>
                  <p className="text-[13px] font-medium leading-snug text-foreground/80 lg:text-[14px]">
                    {pair.problem}
                  </p>
                </div>

                {/* Fix */}
                <div className="flex items-center border-l border-white/[0.07] px-4 py-3 lg:px-6 lg:py-4">
                  <p className="text-[13px] leading-snug text-foreground/90 lg:text-[14px]">{pair.fix.text}</p>
                </div>
              </div>
            ))}

            {/* Footer CTA */}
            <div className="flex justify-center border-t border-white/[0.07] px-5 py-5 lg:px-10 lg:py-4">
              <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 lg:h-9 lg:px-6 lg:text-sm">
                <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>
                  {BOOK_A_FREE_STRATEGY_CALL_CTA.label}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="border-t border-white/10 bg-white/[0.015] py-10 lg:py-16">
        <div className="container mx-auto max-w-6xl px-6 sm:px-6 lg:px-8">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-primary md:mb-4 md:tracking-[0.22em]">
            Implementation Approach
          </span>
          <h2 className="text-2xl font-extrabold tracking-normal md:text-3xl">
            Built Around Your Acquisition Stack
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground md:mt-3 md:text-base md:leading-7">
            Campaigns are planned around your offer, conversion path, budget, and the signal quality needed to improve over time.
          </p>
          <div className="relative mt-12 hidden lg:block">
            <div className="absolute left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] top-8 h-px bg-gradient-to-r from-primary/10 via-primary/40 to-primary/10" />
            <div className="grid grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.num} className="relative flex flex-col items-center px-6 text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-background shadow-[0_0_0_6px_rgba(0,175,239,0.04),0_12px_28px_rgba(0,0,0,0.3)]">
                    <span className="bg-[linear-gradient(135deg,#ffffff_0%,#33cc99_55%,#00afef_100%)] bg-clip-text text-xl font-black text-transparent">
                      0{step.num}
                    </span>
                  </div>
                  <span className="mt-4 rounded-full border border-primary/15 bg-primary/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary/80">
                    {step.phase}
                  </span>
                  <p className="mt-3 text-[14px] font-semibold leading-snug">{step.title}</p>
                  <p className="mt-2.5 text-[13px] leading-[1.7] text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-7 lg:hidden">
            <div className="absolute bottom-6 left-[15px] top-6 w-px bg-gradient-to-b from-primary/10 via-primary/30 to-primary/10" />
            <div className="flex flex-col gap-5">
              {processSteps.map((step) => (
                <div key={step.num} className="relative flex gap-4">
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-background shadow-[0_0_0_4px_rgba(0,175,239,0.035)]">
                    <span className="text-[11px] font-black text-primary">0{step.num}</span>
                  </div>
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 rounded-full border border-primary/15 bg-primary/[0.05] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                        {step.phase}
                      </span>
                      <p className="text-[13px] font-semibold leading-snug">{step.title}</p>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-[1.6] text-muted-foreground/80">{step.shortDescription}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-6 lg:py-10">
        <div className="container mx-auto max-w-6xl px-6 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden border-sky-400/15 bg-transparent px-0 py-2 md:p-0"
          >
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary md:mb-4 md:tracking-[0.2em]">Why AlphaTrack Digital</span>
            <h2 className="max-w-2xl text-[1.55rem] font-extrabold leading-tight md:text-4xl">
              <span className="md:hidden">We build media systems that learn.</span>
              <span className="hidden md:inline">We do not just run ads. We build media systems that learn.</span>
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-2.5 md:hidden">
              {whyCards.map((card, i) => (
                <div key={card.title} className="border-t border-white/[0.08] py-4">
                  <span className="bg-[linear-gradient(135deg,#ffffff_0%,#33cc99_55%,#00afef_100%)] bg-clip-text text-[1.65rem] font-black leading-none text-transparent opacity-45">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[0.86rem] font-semibold leading-snug">{card.mobileTitle}</h3>
                </div>
              ))}
            </div>
            <div className="mt-10 hidden border-y border-white/[0.08] md:grid md:grid-cols-2">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    "flex gap-5 border-white/[0.07] py-7",
                    i % 2 === 0 ? "md:pr-8" : "md:border-l md:pl-8",
                    i >= 2 && "md:border-t",
                  )}
                >
                  <span className="bg-[linear-gradient(135deg,#ffffff_0%,#33cc99_55%,#00afef_100%)] bg-clip-text text-[2rem] font-black leading-none text-transparent opacity-40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="pt-1">
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's Included */}
      <section className="relative isolate overflow-hidden border-t border-white/10 py-10 lg:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10 hidden bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.012)_48%,transparent_100%)] lg:block" />
        <div className="pointer-events-none absolute inset-y-0 left-[30%] -z-10 hidden w-[34rem] bg-[radial-gradient(circle_at_center,rgba(51,204,153,0.045),transparent_62%)] lg:block" />
        {/* Mobile */}
        <div className="container mx-auto max-w-6xl px-6 sm:px-6 lg:hidden lg:px-8">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.18em] text-primary">What's Included</span>
          <h2 className="text-2xl font-extrabold tracking-normal">Every engagement is scoped to your growth stage.</h2>
          <div className="mt-6 border-y border-white/[0.08]">
            {[
              { phase: "Audit", items: ["Account Audit", "Conversion QA", "Performance Reporting"] },
              { phase: "Build", items: ["Channel Strategy", "Campaign Buildout", "Creative Learning Log"] },
              { phase: "Improve", items: ["Strategy Reviews", "Optimisation Roadmap", "Scale Recommendations"] },
            ].map((group) => (
              <div key={group.phase} className="grid grid-cols-[4.75rem_minmax(0,1fr)] border-b border-white/[0.08] last:border-b-0">
                <div className="border-r border-white/[0.07] py-4 pr-3">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary/80">{group.phase}</p>
                </div>
                <div>
                  {group.items.map((item) => (
                    <div key={item} className="grid grid-cols-[1rem_minmax(0,1fr)] items-center gap-3 border-b border-white/[0.06] py-3.5 pl-4 last:border-b-0">
                      <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <p className="text-[13px] font-medium leading-snug">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop */}
        <div className="container mx-auto hidden max-w-6xl px-6 sm:px-6 lg:block lg:px-8">
          <div className="relative py-4">
            <div className="relative grid items-center gap-10 lg:grid-cols-[0.66fr_1.34fr] xl:gap-12">
              <div className="relative z-10 flex items-center">
                <div className="max-w-[440px]">
                  <span className="mb-5 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">What's Included</span>
                  <h2 className="max-w-[420px] text-[1.75rem] font-black leading-[1.08] tracking-normal text-white xl:text-[2rem]">
                    Every engagement is scoped to your growth stage.
                  </h2>
                  <p className="mt-5 max-w-[420px] text-[14px] leading-7 text-muted-foreground">
                    Scope varies by channel mix, budget, creative needs, and reporting maturity. We send a tailored proposal after discovery.
                  </p>
                </div>
              </div>
              <div className="relative z-10 ml-auto w-full max-w-[490px] space-y-2">
                <svg aria-hidden="true" viewBox="0 0 320 456" className="pointer-events-none absolute left-[-260px] top-1/2 hidden h-[330px] w-[248px] -translate-y-1/2 text-primary/28 lg:block" fill="none" preserveAspectRatio="none">
                  <defs>
                    <filter id="pmConnectorGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>
                  <circle cx="8" cy="228" r="4" fill="currentColor" filter="url(#pmConnectorGlow)" />
                  <circle cx="8" cy="228" r="58" stroke="currentColor" strokeOpacity="0.07" />
                  <circle cx="8" cy="228" r="88" stroke="currentColor" strokeOpacity="0.04" />
                  {[
                    { d: "M8 228 C140 74 174 34 304 34", dot: [304, 34] as [number,number] },
                    { d: "M8 228 C130 142 174 116 300 116", dot: [300, 116] as [number,number] },
                    { d: "M8 228 C128 210 174 198 296 198", dot: [296, 198] as [number,number] },
                    { d: "M8 228 C128 246 174 258 296 258", dot: [296, 258] as [number,number] },
                    { d: "M8 228 C130 314 174 340 300 340", dot: [300, 340] as [number,number] },
                    { d: "M8 228 C140 382 174 422 304 422", dot: [304, 422] as [number,number] },
                  ].map((path) => (
                    <g key={path.d}>
                      <path d={path.d} stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" strokeLinecap="round" opacity="0.4" />
                      <circle cx={path.dot[0]} cy={path.dot[1]} r="2.2" fill="currentColor" filter="url(#pmConnectorGlow)" />
                    </g>
                  ))}
                </svg>
                <div className="space-y-2">
                  {[
                    { icon: FileText, title: "Account Audit", description: "Tracking, structure, history, spend, and campaign signal quality reviewed." },
                    { icon: Megaphone, title: "Channel Strategy", description: "Channel roles, budget priorities, and funnel responsibilities defined." },
                    { icon: Wrench, title: "Campaign Buildout", description: "Campaigns, audiences, bidding, tests, and reporting structure built." },
                    { icon: BadgeCheck, title: "Conversion QA", description: "Conversion events checked before optimisation depends on them." },
                    { icon: BarChart3, title: "Performance Reporting", description: "Reports focused on budget, creative, lead quality, and return." },
                    { icon: ArrowUpRight, title: "Scale Recommendations", description: "Guidance for increasing budget when the system is ready." },
                  ].map((item, i) => (
                    <div key={item.title} className="relative">
                      <div className="absolute inset-x-4 top-1.5 -z-10 h-full rounded-2xl border border-white/5 bg-white/[0.008]" />
                      <div className={cn(
                        "group relative overflow-hidden rounded-2xl border border-slate-500/18 px-3.5 py-2 shadow-[0_10px_24px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl transition duration-300 hover:border-primary/25",
                        i % 2 === 0 ? "bg-[#101a26]/68" : "translate-x-2 bg-[#0d1724]/68",
                      )}>
                        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                        <div className="pointer-events-none absolute -left-16 top-0 h-full w-28 bg-gradient-to-r from-primary/[0.055] to-transparent" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.052] via-transparent to-primary/[0.025]" />
                        <div className="relative flex items-center gap-3.5">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-slate-500/25 bg-[#0b121b] text-primary shadow-[0_8px_18px_rgba(0,0,0,0.18),inset_0_0_18px_rgba(52,211,153,0.045),inset_0_1px_0_rgba(255,255,255,0.055)]">
                            <item.icon className="h-[15px] w-[15px]" />
                          </div>
                          <div>
                            <h3 className="text-[14px] font-bold tracking-normal text-white">{item.title}</h3>
                            <p className="mt-0.5 text-[12px] leading-5 text-slate-300">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedTestimonialSection title="What clients say when execution matters." />

      {/* What Paid Media Unlocks Next */}
      <section className="border-t border-white/10 py-10 lg:py-16">
        <div className="container mx-auto max-w-6xl px-6 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center lg:gap-10">
            <div className="flex h-full flex-col justify-center lg:pr-8">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-primary md:tracking-[0.22em]">
                What Paid Media Unlocks Next
              </span>
              <h2 className="title-safe flex flex-col gap-2 pb-2 text-2xl font-extrabold leading-[1.14] tracking-normal md:text-4xl lg:text-[2.16rem]">
                <span className="md:hidden">What Paid Media Unlocks</span>
                <span className="hidden md:block lg:whitespace-nowrap">Ad Spend Should Strengthen</span>
                <span className="hidden title-safe-inline text-gradient md:block lg:whitespace-nowrap">The Rest of the System</span>
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground md:mt-3 md:text-[15px] md:leading-7">
                Better campaign structure strengthens tracking and follow-up.
              </p>
            </div>
            <div className="border-y border-white/[0.08] py-1 md:hidden">
              {connectedServices.map((item) => (
                <Link key={item.title} to={item.path} className="flex items-center justify-between gap-4 border-b border-white/[0.08] py-4 last:border-b-0">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">{item.label}</p>
                    <h3 className="mt-1 text-[0.98rem] font-semibold">{item.title}</h3>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-primary" />
                </Link>
              ))}
            </div>
            <div className="hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:block lg:max-w-[42rem] lg:justify-self-end lg:p-3">
              <div className="grid gap-2 md:grid-cols-2 lg:gap-3">
                {connectedServices.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border border-white/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 lg:p-6",
                      item.surfaceClassName,
                    )}
                  >
                    <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-white/[0.05] blur-3xl" />
                    <div className="relative flex h-full flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                            {item.label}
                          </p>
                          <h3 className="mt-1.5 text-[1rem] font-semibold leading-[1.15] tracking-normal lg:mt-3 lg:text-[1.08rem]">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/20 lg:h-10 lg:w-10 lg:rounded-2xl">
                          <item.icon className="h-4 w-4 text-primary lg:h-5 lg:w-5" />
                        </div>
                      </div>
                      <p className="mt-2 text-[12px] leading-[1.6] text-muted-foreground lg:hidden">
                        {item.shortDescription}
                      </p>
                      <p className="mt-5 hidden flex-1 text-sm leading-7 text-muted-foreground lg:block">
                        {item.description}
                      </p>
                      <div className="mt-3 flex justify-end border-t border-white/10 pt-3 lg:mt-6 lg:pt-4">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          {item.ctaLabel}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        items={serviceFaqs}
        title="Frequently Asked Questions"
        description="Common questions about budget, channel mix, creative direction, and reporting."
        eyebrow="FAQ"
        variant="minimal"
        density="compact"
        defaultOpenItem={0}
        contentClassName="max-w-[46rem]"
        accordionClassName="space-y-3"
        mobileInitialItems={3}
      />

      <CTASection
        title={
          <span className="flex flex-col gap-3 md:gap-4">
            <span className="block">Ready to Scale</span>
            <span className="title-safe-inline block text-gradient">Paid Media?</span>
          </span>
        }
        description=""
        primaryCta={BOOK_A_FREE_STRATEGY_CALL_CTA}
        variant="service-close"
        layout="split"
        titleClassName="max-w-[14ch] pb-4 text-[2.38rem] leading-[1.12] tracking-normal md:text-[2.82rem] lg:text-[3rem]"
      />
    </>
  );
};

export default PaidMedia;
