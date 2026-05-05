import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Target,
  ClipboardCheck,
  Layers,
  ShieldCheck,
  FileText,
  Wrench,
  BadgeCheck,
  BookOpen,
  ArrowUpRight,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTASection from "@/components/shared/CTASection";
import FeaturedTestimonialSection from "@/components/shared/FeaturedTestimonialSection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import { BOOK_A_FREE_STRATEGY_CALL_CTA, REQUEST_A_FREE_TRACKING_AUDIT_CTA } from "@/config/cta";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

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
  { num: 1, title: "Measurement Plan", description: "We define what to track and why, based on your actual business goals. No vanity metrics." },
  { num: 2, title: "Implementation", description: "We configure GTM, GA4, Meta Ads, Google Ads, and any other platforms you use." },
  { num: 3, title: "QA & Validation", description: "Every conversion event is tested and proven. If we can't verify it fires correctly, it doesn't go live." },
  { num: 4, title: "Handover & Support", description: "We walk you through what we built and hand over full documentation." },
];

const deliveryPrinciples: IconCard[] = [
  {
    icon: Target,
    title: "Prioritise what changes budget",
    description: "We decide which events matter before any tooling work starts, so the setup follows real business priorities.",
  },
  {
    icon: Layers,
    title: "Keep platforms speaking the same language",
    description: "GA4, GTM, ad platforms, and the CRM are configured around one measurement logic instead of competing definitions.",
  },
  {
    icon: ShieldCheck,
    title: "Validate before anything becomes reporting truth",
    description: "Every critical event is tested before launch and documented clearly enough for the team to trust after handover.",
  },
];

const tiers = [
  {
    tierLabel: "Tier 1",
    name: "Starter",
    description: "Lead-gen websites running ads on 1–2 platforms",
    price: "£750",
    priceNote: "from",
    features: [
      "GA4 setup & configuration",
      "Meta conversion tracking",
      "Google Ads conversion tracking",
      "Core website interaction tracking",
      "Conversion validation & testing",
      "Measurement plan & documentation",
    ],
    enables: "Accurate lead tracking. Reliable ad optimisation. Clear performance reporting.",
    highlighted: true,
    highlightLabel: "MOST POPULAR",
  },
  {
    tierLabel: "Tier 2",
    name: "Growth",
    description: "Scaling paid media across multiple channels",
    price: "£1,500",
    priceNote: "from",
    features: [
      "Everything in Starter",
      "Additional platforms (LinkedIn, TikTok)",
      "Improved conversion signals",
      "Cross-channel consistency",
      "Advanced Looker Studio dashboard",
      "60-day optimisation support",
    ],
    enables: "Better ad performance at scale. Cleaner attribution across channels.",
  },
  {
    tierLabel: "Tier 3",
    name: "Advanced",
    description: "Ecommerce, regulated markets, or conversion optimisation",
    price: "£3,000",
    priceNote: "from",
    features: [
      "Everything in Growth",
      "Ecommerce tracking (Shopify, WooCommerce)",
      "Privacy & consent mode v2 implementation",
      "Enhanced engagement insights",
      "Deeper QA and auditing protocols",
      "90-day support",
    ],
    enables: "Revenue-level reporting. Compliance-ready. Conversion-rate optimisation.",
  },
  {
    tierLabel: "Tier 4",
    name: "Enterprise",
    description: "Complex architectures, large ad budgets, multi-domain",
    price: "Custom",
    features: [
      "Custom tracking architecture",
      "Server-side GTM",
      "Conversion APIs (Meta CAPI, Google EC)",
      "Multi-domain & cross-domain setups",
      "Dedicated technical account manager",
      "Ongoing support & training",
    ],
    enables: "Maximum data reliability. Enterprise-grade attribution. Full-stack measurement.",
  },
];

const whyCards = [
  { title: "Measurement-First Approach", description: "We define what success means before touching any tools. Your tracking is built on a plan, not guesswork." },
  { title: "We Practice What We Preach", description: "Our own website runs on the same tracking stack we set up for clients. We're our own first case study." },
  { title: "Upgrade-Ready Architecture", description: "Start with what you need now. Our setups grow with you, no rebuilds needed when you scale." },
  { title: "Every Event Is Provable", description: "We don't ship tracking that \"probably works.\" Every conversion event is validated before go-live." },
];

const connectedServices: PremiumLinkCard[] = [
  {
    icon: Layers,
    label: "Media optimisation",
    title: "Paid Media",
    shortDescription: "Better signals, cleaner budget decisions.",
    description: "Once signal quality is fixed, campaign optimisation has a stronger foundation and budget decisions get clearer.",
    path: "/service/paid-media",
    ctaLabel: "See Paid Media",
    surfaceClassName:
      "bg-[linear-gradient(180deg,rgba(0,51,153,0.18)_0%,rgba(0,175,239,0.06)_46%,rgba(255,255,255,0.015)_100%)]",
  },
  {
    icon: ClipboardCheck,
    label: "Lead follow-up",
    title: "Marketing Automation",
    shortDescription: "Prioritise the right leads automatically.",
    description: "Tracking reveals which leads and actions matter most, so CRM workflows can prioritise the right follow-up.",
    path: "/service/marketing-automation",
    ctaLabel: "See Marketing Automation",
    surfaceClassName:
      "bg-[linear-gradient(180deg,rgba(51,204,153,0.14)_0%,rgba(0,175,239,0.04)_48%,rgba(255,255,255,0.015)_100%)]",
  },
];

const serviceFaqs = [
  {
    question: "Can you fix our current setup, or do we need to rebuild tracking from scratch?",
    answer: "Usually we start by auditing what is already in place. If the existing setup can be corrected, we fix it. If it is too unreliable or messy to trust, we recommend a cleaner rebuild.",
  },
  {
    question: "Will this work with our existing website and ad accounts?",
    answer: "Yes. We regularly work with WordPress, Shopify, WooCommerce, Webflow, and custom-built sites, and we can configure tracking against your existing Meta, Google Ads, LinkedIn, or TikTok accounts.",
  },
  {
    question: "How long does the setup usually take?",
    answer: "Most tracking setups are completed in 5-7 working days. Larger multi-platform or ecommerce implementations take longer depending on scope, validation requirements, and access to the stack.",
  },
  {
    question: "How do you validate that the tracking is actually working?",
    answer: "We test events before go-live using platform diagnostics such as GTM Preview and GA4 DebugView, then confirm the right actions are being attributed in your reporting stack before handover.",
  },
  {
    question: "What happens after the setup is complete?",
    answer: "You get documentation, walkthroughs, and ownership of the setup. If you want continued support, QA, or optimisation help after launch, we can structure that separately.",
  },
];

const ConversionTracking = () => {
  return (
    <>
      <SEO
        title="Conversion Tracking Setup Services | AlphaTrack Digital"
        description="We set up GA4, Meta, and Google Ads conversion tracking that tells you exactly which channels drive your leads and sales. Accurate, auditable, proven."
        canonicalUrl="/service/conversion-tracking"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Conversion Tracking & Measurement",
          provider: { "@type": "Organization", name: "AlphaTrack Digital", url: "https://alphatrack.digital" },
          description: "We set up GA4, Meta, and Google Ads conversion tracking that tells you exactly which channels drive your leads and sales.",
          areaServed: ["Ghana", "Nigeria", "United Kingdom"],
          url: "https://alphatrack.digital/service/conversion-tracking",
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
              { "@type": "ListItem", position: 3, name: "Conversion Tracking", item: "https://alphatrack.digital/service/conversion-tracking" },
            ],
          })}
        </script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-8 pb-24 text-center md:pt-10 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(0,175,239,0.13)_0%,rgba(0,51,153,0.07)_45%,transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-[62rem]">
            <Breadcrumbs
              items={[
                { label: "Home", path: "/" },
                { label: "Services", path: "/service" },
                { label: "Conversion Tracking" },
              ]}
            />
            <motion.div
              className="mt-16 md:mt-20"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Conversion Tracking & Measurement
              </span>
              <h1 className="title-safe pb-4 text-5xl font-extrabold leading-[1.14] tracking-[-0.035em] md:pb-5 md:text-6xl lg:text-[4.65rem]">
                <span className="block">Stop Guessing and</span>
                <span className="title-safe-inline mt-1 block text-gradient">Start Measuring.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                We set up the tracking that tells you exactly which channels, campaigns, and clicks are driving your leads and sales, so you can spend smarter, not harder.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground hover:bg-primary/90">
                  <Link to={REQUEST_A_FREE_TRACKING_AUDIT_CTA.to}>
                    {REQUEST_A_FREE_TRACKING_AUDIT_CTA.label}
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Problem / Fix ── */}
      <section className="border-t border-white/10 py-4 lg:py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02]"
          >
            <div className="grid lg:grid-cols-2 lg:items-start">
              {/* Left — The Problem */}
              <div className="relative flex h-full flex-col overflow-hidden p-5 lg:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_0%_0%,rgba(239,68,68,0.07),transparent_70%)]" />
                <div className="relative flex flex-1 flex-col">
                  <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-400/80">The Problem</span>
                  <h2 className="text-xl font-extrabold leading-tight lg:text-[1.6rem]">
                    Most businesses are flying blind with their ad data
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    Your platforms rarely agree. When you can't trust the numbers, every budget call is a guess.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {[
                      "Platforms chase the wrong signals",
                      "Teams argue over data instead of acting on it",
                      "No one can prove what's actually driving revenue",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                        <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/20 ring-1 ring-red-400/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 lg:mt-auto lg:pt-8">
                    <Link
                      to={REQUEST_A_FREE_TRACKING_AUDIT_CTA.to}
                      className="text-sm font-medium text-red-400/80 underline-offset-4 hover:text-red-400 hover:underline"
                    >
                      {REQUEST_A_FREE_TRACKING_AUDIT_CTA.label} →
                    </Link>
                  </div>
                </div>
              </div>
              {/* Right — How We Fix It */}
              <div className="flex flex-col border-t border-white/10 p-5 lg:border-l lg:border-t-0 lg:p-10">
                <span className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">How We Fix It</span>
                <h2 className="text-xl font-extrabold leading-tight lg:text-[1.6rem]">
                  Measurement-first. Built to scale.
                </h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  We start with a plan, not tools. Before a single tag goes live, we agree on what success looks like — then build it to last.
                </p>
                <div className="mt-5 flex flex-col divide-y divide-white/[0.06]">
                  {deliveryPrinciples.map((item) => (
                    <div key={item.title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/[0.07]">
                        <item.icon className="h-[13px] w-[13px] text-primary" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold leading-snug">{item.title}</p>
                        <p className="mt-1 hidden text-[12px] leading-[1.65] text-muted-foreground lg:block">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="border-t border-white/10 bg-white/[0.015] py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Implementation Approach
          </span>
          <h2 className="text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">
            Built Around Your Stack
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Every project starts with a measurement plan agreed upfront. All setups are upgrade-ready, no rebuilds as you grow.
          </p>
          {/* Desktop timeline */}
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
                  <p className="mt-6 text-[14px] font-semibold leading-snug">{step.title}</p>
                  <p className="mt-2.5 text-[13px] leading-[1.7] text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile timeline */}
          <div className="relative mt-12 lg:hidden">
            <div className="absolute bottom-8 left-[19px] top-8 w-px bg-gradient-to-b from-primary/10 via-primary/35 to-primary/10" />
            <div className="flex flex-col gap-8">
              {processSteps.map((step) => (
                <div key={step.num} className="relative flex gap-5 pl-1">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-background shadow-[0_0_0_4px_rgba(0,175,239,0.04)]">
                    <span className="text-sm font-black text-primary">0{step.num}</span>
                  </div>
                  <div className="pt-1.5">
                    <p className="text-[14px] font-semibold leading-snug">{step.title}</p>
                    <p className="mt-1.5 text-sm leading-[1.7] text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-4 lg:py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-8 lg:p-12"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why AlphaTrack Digital</span>
            <h2 className="max-w-2xl text-3xl font-extrabold md:text-4xl">
              We don't just install tags. We build measurement systems you can trust.
            </h2>
            <div className="mt-10 grid gap-0 md:grid-cols-2">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-5 border-t border-white/[0.07] py-6 md:px-6 md:first:pl-0 md:[&:nth-child(2)]:pr-0 md:[&:nth-child(3)]:pl-0"
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

      {/* ── What's Included ── */}
      <section className="border-t border-white/10 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
            What's Included
          </span>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-[-0.025em] md:text-3xl">
                Every engagement is scoped to your stack.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
                Scope varies by platform complexity and goals. We send a tailored proposal after a short discovery call.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-3">
            {[
              { icon: FileText,     title: "Measurement Plan" },
              { icon: Wrench,       title: "Full Implementation" },
              { icon: BadgeCheck,   title: "QA & Validation" },
              { icon: BookOpen,     title: "Documentation" },
              { icon: Users,        title: "Handover & Walkthrough" },
              { icon: ArrowUpRight, title: "Upgrade-Ready Setup" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 border-t border-white/[0.07] py-4">
                <item.icon className="h-4 w-4 shrink-0 text-primary" />
                <p className="text-[13px] font-medium leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to={REQUEST_A_FREE_TRACKING_AUDIT_CTA.to}>
                {REQUEST_A_FREE_TRACKING_AUDIT_CTA.label}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <FeaturedTestimonialSection title="What clients say when execution matters." />

      {/* ── What Clean Data Unlocks Next ── */}
      <section className="border-t border-white/10 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center lg:gap-10">
            <div className="flex h-full flex-col justify-center lg:pr-8">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                What Clean Data Unlocks Next
              </span>
              <h2 className="title-safe flex flex-col gap-2 pb-2 text-2xl font-extrabold leading-[1.14] tracking-[-0.03em] md:text-4xl lg:text-[2.16rem]">
                <span className="lg:whitespace-nowrap">Measurement Should Strengthen</span>
                <span className="title-safe-inline text-gradient lg:whitespace-nowrap">The Rest of the System</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground md:text-[15px]">
                Once attribution is trustworthy, media optimisation and lead follow-up get sharper because the rest of the stack can rely on the same signal.
              </p>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.22)] lg:max-w-[42rem] lg:justify-self-end lg:p-3">
              <div className="grid gap-2 md:grid-cols-2 lg:gap-3">
                {connectedServices.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={cn(
                      "group relative overflow-hidden rounded-[22px] border border-white/10 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 lg:rounded-[26px] lg:p-6",
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
                          <h3 className="mt-1.5 text-[1rem] font-semibold leading-[1.15] tracking-[-0.03em] lg:mt-3 lg:text-[1.08rem]">
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
        description="Common questions about setup scope, validation, and handover."
        eyebrow="FAQ"
        variant="minimal"
        density="compact"
        defaultOpenItem={0}
        contentClassName="max-w-[46rem]"
        accordionClassName="space-y-3"
      />

      {/* ── CTA ── */}
      <CTASection
        title={
          <span className="flex flex-col gap-3 md:gap-4">
            <span className="block">Ready to Fix</span>
            <span className="title-safe-inline block text-gradient">Your Tracking?</span>
          </span>
        }
        description=""
        primaryCta={REQUEST_A_FREE_TRACKING_AUDIT_CTA}
        variant="service-close"
        layout="split"
        titleClassName="max-w-[15ch] pb-4 text-[2.38rem] leading-[1.12] tracking-[-0.04em] md:text-[2.82rem] lg:text-[3rem]"
      />
    </>
  );
};

export default ConversionTracking;
