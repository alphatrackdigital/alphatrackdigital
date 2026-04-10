import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Target,
  ClipboardCheck,
  Building,
  Layers,
  ShieldCheck,
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

const whyCards: IconCard[] = [
  { icon: ClipboardCheck, title: "Measurement-First Approach", description: "We define what success means before touching any tools. Your tracking is built on a plan, not guesswork." },
  { icon: Building, title: "We Practice What We Preach", description: "Our own website runs on the same tracking stack we set up for clients. We're our own first case study." },
  { icon: Layers, title: "Upgrade-Ready Architecture", description: "Start with what you need now. Our setups grow with you — no rebuilds needed when you scale." },
  { icon: ShieldCheck, title: "Every Event Is Provable", description: "We don't ship tracking that \"probably works.\" Every conversion event is validated before go-live." },
];

const connectedServices: PremiumLinkCard[] = [
  {
    icon: Layers,
    label: "Media optimisation",
    title: "Paid Media",
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
              <div className="inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Target className="h-4 w-4" />
                Conversion Tracking & Measurement
              </div>
              <h1 className="title-safe mt-8 pb-4 text-5xl font-extrabold leading-[1.14] tracking-[-0.035em] md:pb-5 md:text-6xl lg:text-[4.65rem]">
                <span className="block">Stop Guessing and</span>
                <span className="title-safe-inline mt-1 block text-gradient">Start Measuring.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                We set up the tracking that tells you exactly which channels, campaigns, and clicks are driving your leads and sales — so you can spend smarter, not harder.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground hover:bg-primary/90">
                  <Link to={REQUEST_A_FREE_TRACKING_AUDIT_CTA.to}>
                    {REQUEST_A_FREE_TRACKING_AUDIT_CTA.label} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Panel 1: The Problem ── */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center">
            <div className="flex h-full flex-col justify-center lg:pr-8">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                What Clean Data Unlocks Next
              </span>
              <h2 className="title-safe flex flex-col gap-3 pb-4 text-3xl font-extrabold leading-[1.14] tracking-[-0.03em] md:text-4xl lg:text-[2.16rem]">
                <span className="lg:whitespace-nowrap">Measurement Should Strengthen</span>
                <span className="title-safe-inline text-gradient lg:whitespace-nowrap">The Rest of the System</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground md:text-[15px]">
                Once attribution is trustworthy, media optimisation and lead follow-up get sharper because the rest of the stack can rely on the same signal.
              </p>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] lg:max-w-[42rem] lg:justify-self-end">
              <div className="grid gap-3 md:grid-cols-2">
                {connectedServices.map((item) => (
                  <Link
                    key={item.title}
                    to={item.path}
                    className={cn(
                      "group relative overflow-hidden rounded-[26px] border border-white/10 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 lg:p-7",
                      item.surfaceClassName,
                    )}
                  >
                    <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-white/[0.05] blur-3xl" />
                    <div className="relative flex h-full flex-col">
                      <div className="grid grid-cols-[minmax(0,1fr)_2.5rem] items-start gap-4">
                        <div className="min-w-0 pr-1">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                            {item.label}
                          </p>
                          <h3 className="mt-3 text-[1.04rem] font-semibold leading-[1.12] tracking-[-0.035em] md:whitespace-nowrap md:text-[1.08rem] lg:text-[1.12rem]">
                            {item.title}
                          </h3>
                        </div>
                        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <p className="mt-5 flex-1 text-sm leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-6 flex justify-end border-t border-white/10 pt-4">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                          {item.ctaLabel}
                          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

      <section className="py-3">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02]"
          >
            <div className="grid lg:grid-cols-2">
              {/* Text */}
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <span className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">The Problem</span>
                <h2 className="text-2xl font-extrabold leading-tight md:text-[2rem]">
                  Most businesses are flying blind with their ad data
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  GA4, Meta, Google Ads, and the CRM rarely tell the same story. When the signal cannot be trusted, budget and reporting decisions quickly drift into guesswork.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Platforms optimise toward incomplete or conflicting events",
                    "Teams debate reports instead of acting on them",
                    "Revenue contribution is harder to prove with confidence",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                      <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/20 ring-1 ring-red-400/40" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to={REQUEST_A_FREE_TRACKING_AUDIT_CTA.to}>
                      {REQUEST_A_FREE_TRACKING_AUDIT_CTA.label} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              {/* Visual */}
              <div className="flex items-center justify-center border-t border-white/10 bg-white/[0.015] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="w-full max-w-[296px] rounded-2xl border border-red-500/15 bg-black/50 p-4 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-red-400/80">Data Discrepancy</span>
                    <span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-[10px] font-bold text-red-400">3 issues</span>
                  </div>
                  {[
                    { label: "GA4 Conversions", val: "342", err: false },
                    { label: "Meta Attributed", val: "89", err: false },
                    { label: "Google Ads Conv.", val: "127", err: false },
                    { label: "Actual Leads (CRM)", val: "???", err: true },
                  ].map((row) => (
                    <div key={row.label} className="mb-2 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2">
                      <span className="text-[13px] text-muted-foreground">{row.label}</span>
                      <span className={`text-[13px] font-bold ${row.err ? "text-red-400" : ""}`}>{row.val}</span>
                    </div>
                  ))}
                  <div className="mt-3 space-y-1">
                    {["Conversion overlap detected", "22% of events missing", "Attribution broken"].map((msg) => (
                      <p key={msg} className="flex items-center gap-2 text-[11px] text-red-400/75">
                        <span>⚠</span> {msg}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Panel 2: The Solution ── */}
      <section className="py-3">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02]"
          >
            <div className="grid lg:grid-cols-2">
              {/* Visual */}
              <div className="flex items-center justify-center border-b border-white/10 bg-white/[0.015] p-8 lg:border-b-0 lg:border-r lg:p-10">
                <div className="w-full max-w-[296px] rounded-2xl border border-primary/20 bg-black/50 p-4 shadow-[0_0_50px_rgba(0,175,239,0.07)]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">Conversion Events</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold text-green-400">
                      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                      Live
                    </span>
                  </div>
                  {[
                    { event: "form_submit", src: "GA4 + Meta" },
                    { event: "purchase", src: "GA4 + CAPI" },
                    { event: "button_click", src: "GA4" },
                    { event: "lead_qualified", src: "GA4 + Ads" },
                  ].map((ev) => (
                    <div key={ev.event} className="mb-2 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2">
                      <div>
                        <p className="font-mono text-[12px]">{ev.event}</p>
                        <p className="text-[10px] text-muted-foreground/50">{ev.src}</p>
                      </div>
                      <span className="text-[11px] font-semibold text-green-400">✓ Valid</span>
                    </div>
                  ))}
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-primary/[0.07] px-3.5 py-2">
                    <span className="text-[12px] font-medium text-primary">All events validated</span>
                    <span className="text-[12px] font-bold text-primary">100%</span>
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <span className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">How We Fix It</span>
                <h2 className="text-2xl font-extrabold leading-tight md:text-[2rem]">
                  Measurement-first. Built to scale.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  We don't start with tools. We start with your business. Before a single tag is placed, we agree on what success looks like — then build a setup that's accurate, auditable, and ready to grow with you.
                </p>
                <div className="mt-7 grid gap-3 md:grid-cols-3">
                  {deliveryPrinciples.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[20px] border border-white/8 bg-white/[0.02] p-4"
                    >
                      <item.icon className="mb-2.5 h-[18px] w-[18px] text-primary" />
                      <p className="text-[15px] font-semibold leading-snug">{item.title}</p>
                      <p className="mt-1.5 text-[12px] leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      {/* ── Tiers ── */}
      <section className="border-t border-white/10 bg-white/[0.015] py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Implementation Approach
          </span>
          <h2 className="text-3xl font-extrabold tracking-[-0.025em] md:text-4xl">
            Built Around Your Stack
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Every project starts with a measurement plan agreed upfront. All setups are upgrade-ready — no rebuilds as you grow.
          </p>
          <div className="mt-12 overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.012)_100%)] px-6 py-8 shadow-[0_20px_70px_rgba(0,0,0,0.2)] md:px-8 md:py-10">
            <div className="relative hidden lg:block">
              <div className="absolute left-[9%] right-[9%] top-8 h-px bg-gradient-to-r from-primary/10 via-primary/45 to-primary/10" />
              <div className="grid grid-cols-4 gap-5">
                {processSteps.map((step) => (
                  <div key={step.num} className="relative">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/20 bg-background shadow-[0_12px_30px_rgba(0,175,239,0.08)]">
                      <span className="bg-[linear-gradient(135deg,#ffffff_0%,#33cc99_55%,#00afef_100%)] bg-clip-text text-xl font-black text-transparent">
                        0{step.num}
                      </span>
                    </div>
                    <div className="mt-6 rounded-[24px] border border-white/10 bg-black/20 p-5 text-center">
                      <p className="text-sm font-semibold">{step.title}</p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4 lg:hidden">
              {processSteps.map((step) => (
                <div
                  key={step.num}
                  className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/20 p-5 pl-16"
                >
                  <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.08]">
                    <span className="text-sm font-black text-primary">0{step.num}</span>
                  </div>
                  <p className="font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>{BOOK_A_FREE_STRATEGY_CALL_CTA.label} <ArrowUpRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us Panel ── */}
      <section className="py-3">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] p-10 lg:p-14"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why AlphaTrack Digital</span>
            <h2 className="max-w-2xl text-3xl font-extrabold md:text-4xl">
              We don't just install tags. We build measurement systems you can trust.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {whyCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-5 rounded-2xl border border-white/8 bg-white/[0.02] p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07]">
                    <card.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FeaturedTestimonialSection title="What clients say when execution matters." />

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
