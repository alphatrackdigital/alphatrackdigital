import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Settings,
  Link2,
  Building,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTASection from "@/components/shared/CTASection";
import FeaturedTestimonialSection from "@/components/shared/FeaturedTestimonialSection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import { BOOK_A_FREE_STRATEGY_CALL_CTA } from "@/config/cta";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PremiumLinkCard {
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  path: string;
  ctaLabel: string;
  surfaceClassName: string;
}

const processSteps = [
  { num: 1, title: "Map the journey", description: "We identify the drop-off points that should be automated first." },
  { num: 2, title: "Build the workflows", description: "CRM stages, scoring, and follow-up logic are configured around your sales process." },
  { num: 3, title: "Test every handoff", description: "Each workflow is validated end to end before anything goes live." },
  { num: 4, title: "Handover clearly", description: "Your team gets documentation and practical training for day-to-day use." },
];

const tiers = [
  {
    tierLabel: "Tier 1",
    name: "Starter",
    description: "Businesses with manual lead follow-up",
    price: "£800",
    priceNote: "from",
    features: [
      "Brevo CRM setup and configuration",
      "Lead form integration (website to CRM)",
      "1 automated email sequence (welcome/nurture)",
      "Basic contact segmentation",
      "New lead notification workflows",
      "Documentation and handover",
    ],
  },
  {
    tierLabel: "Tier 2",
    name: "Growth",
    description: "Businesses scaling lead generation",
    price: "£1,800",
    priceNote: "from",
    features: [
      "Everything in Starter",
      "Multiple email sequences (nurture, re-engage)",
      "Lead scoring rules",
      "Multi-channel automation (email + SMS)",
      "A/B testing on sequences",
      "Monthly performance review",
    ],
    highlighted: true,
    highlightLabel: "POPULAR",
  },
  {
    tierLabel: "Tier 3",
    name: "Advanced",
    description: "Complex sales processes and integrations",
    price: "£3,500",
    priceNote: "from",
    features: [
      "Everything in Growth",
      "Custom conditional workflows",
      "CRM reporting dashboards",
      "API integrations with other tools",
      "Advanced segmentation and personalisation",
      "Ongoing optimisation support",
    ],
  },
];

const whyCards: IconCard[] = [
  {
    icon: Settings,
    title: "Built on Brevo",
    description: "Brevo gives CRM, email, automation, and meetings in one platform at a fraction of many enterprise alternatives.",
  },
  {
    icon: Link2,
    title: "Paired With Tracking",
    description: "We are the same team that builds your conversion tracking, so you get full visibility from click to close.",
  },
  {
    icon: Building,
    title: "We Use It Ourselves",
    description: "Our own lead capture, CRM, and automation stack runs on the same platform we implement for clients.",
  },
  {
    icon: TrendingUp,
    title: "Designed to Scale",
    description: "Start simple, then grow into scoring, multi-channel automation, and advanced workflows without rebuilding.",
  },
];

const automationPriorities = [
  {
    title: "Lead capture and routing",
    description: "Forms, notifications, and CRM creation should happen instantly so new enquiries never sit in limbo.",
  },
  {
    title: "Follow-up sequences",
    description: "Welcome, nurture, and reminder flows keep the conversation moving while your team focuses on higher-value work.",
  },
  {
    title: "Sales handoff and scoring",
    description: "The right leads should be surfaced at the right moment with context your team can act on quickly.",
  },
  {
    title: "Re-engagement and retention",
    description: "Automation should not stop at first contact. It should help revive cold leads and support repeat business too.",
  },
];

const connectedServices: PremiumLinkCard[] = [
  {
    icon: Link2,
    label: "Measurement foundation",
    title: "Conversion Tracking",
    description: "Know which channels bring the leads worth automating, and which journeys need follow-up first.",
    path: "/service/conversion-tracking",
    ctaLabel: "See Conversion Tracking",
    surfaceClassName:
      "bg-[linear-gradient(180deg,rgba(0,51,153,0.18)_0%,rgba(0,175,239,0.06)_46%,rgba(255,255,255,0.015)_100%)]",
  },
  {
    icon: TrendingUp,
    label: "Lifecycle messaging",
    title: "Email Marketing",
    description: "Turn CRM logic into stronger welcome, recovery, and lifecycle email programmes once the workflow foundation is in place.",
    path: "/service/email-marketing",
    ctaLabel: "See Email Marketing",
    surfaceClassName:
      "bg-[linear-gradient(180deg,rgba(51,204,153,0.14)_0%,rgba(0,175,239,0.04)_48%,rgba(255,255,255,0.015)_100%)]",
  },
];

const serviceFaqs = [
  {
    question: "Do we need to already be using Brevo before we start?",
    answer: "No. We can help you set up the account structure, import contacts where appropriate, and decide which parts of the workflow should live inside Brevo from day one.",
  },
  {
    question: "Can the automation connect to our current forms, site, and internal tools?",
    answer: "Usually yes. We can connect website forms, landing pages, spreadsheets, ecommerce tools, and other systems through native integrations or workflow tooling, depending on what your setup needs.",
  },
  {
    question: "How long does a typical automation setup take?",
    answer: "Smaller automation setups are usually launched in 1-2 weeks. More complex CRM pipelines, scoring rules, and multi-step workflows take longer depending on the number of integrations and edge cases involved.",
  },
  {
    question: "Do we need conversion tracking as well?",
    answer: "Not always, but the two work much better together. Tracking tells you which channels are bringing the right leads, and automation makes sure those leads are followed up consistently once they arrive.",
  },
  {
    question: "What happens after launch, and do we own the workflows?",
    answer: "You own the account, workflows, and documentation. We hand everything over clearly, train your team where needed, and can stay involved for optimisation or support if you want ongoing help.",
  },
];

const MarketingAutomation = () => {
  return (
    <>
      <SEO
        title="Marketing Automation & CRM Services | AlphaTrack Digital"
        description="We build automated workflows, email sequences, and CRM systems on Brevo that turn captured leads into paying clients without the manual work."
        canonicalUrl="/service/marketing-automation"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Marketing Automation & CRM",
          provider: { "@type": "Organization", name: "AlphaTrack Digital", url: "https://alphatrack.digital" },
          description: "We build automated workflows, email sequences, and CRM systems that turn captured leads into paying clients.",
          areaServed: ["Ghana", "Nigeria", "United Kingdom"],
          url: "https://alphatrack.digital/service/marketing-automation",
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
              { "@type": "ListItem", position: 3, name: "Marketing Automation", item: "https://alphatrack.digital/service/marketing-automation" },
            ],
          })}
        </script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-8 pb-24 text-center md:pt-10 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(51,204,153,0.11)_0%,rgba(0,51,153,0.07)_45%,transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-[62rem]">
            <Breadcrumbs
              items={[
                { label: "Home", path: "/" },
                { label: "Services", path: "/service" },
                { label: "Marketing Automation" },
              ]}
            />
            <motion.div
              className="mt-16 md:mt-20"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Settings className="h-4 w-4" />
                Marketing Automation & CRM
              </div>
              <h1 className="title-safe mt-8 pb-4 text-5xl font-extrabold leading-[1.14] tracking-[-0.035em] md:pb-5 md:text-6xl lg:text-[4.5rem]">
                Capture the Lead.{" "}
                <span className="title-safe-inline text-gradient">Nurture the Sale.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                We build the automated workflows, email sequences, and CRM systems that turn captured leads into paying clients — without the manual bottlenecks slowing your team down.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground hover:bg-primary/90">
                  <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>{BOOK_A_FREE_STRATEGY_CALL_CTA.label}</Link>
                </Button>
              </div>
              {/* Quick stats */}
              <div className="hidden mx-auto mt-14 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {[
                  { label: "Outcome", value: "Faster follow-up, fewer lost leads" },
                  { label: "Typical launch", value: "1–2 weeks" },
                  { label: "Best for", value: "Teams with manual lead flow" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background px-5 py-4 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">{stat.label}</p>
                    <p className="mt-1.5 text-sm font-medium">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center">
            <div className="flex h-full flex-col justify-center lg:pr-8">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                What Automation Unlocks Next
              </span>
              <h2 className="title-safe flex flex-col gap-3 pb-4 text-3xl font-extrabold leading-[1.14] tracking-[-0.03em] md:text-4xl lg:text-[2.16rem]">
                <span className="lg:whitespace-nowrap">Follow-Up Should Strengthen</span>
                <span className="title-safe-inline text-gradient lg:whitespace-nowrap">The Rest of the System</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground md:text-[15px]">
                Once leads are routed and nurtured consistently, attribution gets clearer and lifecycle messaging has a stronger system to build on.
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

      {/* ── Panel 1: The Problem ── */}
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
                  Leads come in. Then what?
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  Many teams spend heavily to generate enquiries, then rely on inboxes and manual reminders to keep the process moving. That delay quietly kills conversion momentum.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Slow first responses lower the chance of conversion",
                    "Enquiries get lost with no pipeline visibility or ownership",
                    "Teams repeat follow-up that could run automatically",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                      <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/20 ring-1 ring-red-400/40" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>{BOOK_A_FREE_STRATEGY_CALL_CTA.label}</Link>
                  </Button>
                </div>
              </div>
              {/* Visual: manual chaos mock */}
              <div className="flex items-center justify-center border-t border-white/10 bg-white/[0.015] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="w-full max-w-[296px] rounded-2xl border border-red-500/15 bg-black/50 p-4 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-red-400/80">Without Automation</span>
                    <span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-[10px] font-bold text-red-400">Manual</span>
                  </div>
                  {[
                    { msg: "Lead arrived — no follow-up sent", time: "6h ago" },
                    { msg: "3 enquiries missed this week", time: "3d ago" },
                    { msg: "Manual reminder: call lead back", time: "5d ago" },
                    { msg: "Proposal email sent manually", time: "1w ago" },
                  ].map((item) => (
                    <div key={item.msg} className="mb-2 rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2">
                      <p className="text-[12px] text-muted-foreground">{item.msg}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground/40">{item.time}</p>
                    </div>
                  ))}
                  <p className="mt-3 flex items-center gap-2 text-[11px] text-red-400/70">
                    <span>⚠</span> No automated system in place
                  </p>
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
              {/* Visual: workflow mock */}
              <div className="flex items-center justify-center border-b border-white/10 bg-white/[0.015] p-8 lg:border-b-0 lg:border-r lg:p-10">
                <div className="w-full max-w-[300px]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">Automated Workflow</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold text-green-400">
                      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                      Active
                    </span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { step: "Lead captured via form", delay: "Instant" },
                      { step: "Welcome email sent", delay: "0 seconds" },
                      { step: "CRM contact created", delay: "Instant" },
                      { step: "Follow-up sequence starts", delay: "D+2" },
                      { step: "Lead score updated", delay: "On open" },
                      { step: "Sales team notified", delay: "On qualify" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/[0.08] text-[10px] font-bold text-primary">
                          {i + 1}
                        </div>
                        <div className="flex flex-1 items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-1.5">
                          <span className="text-[12px]">{item.step}</span>
                          <span className="ml-2 shrink-0 text-[10px] text-primary/60">{item.delay}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <span className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">How We Fix It</span>
                <h2 className="text-2xl font-extrabold leading-tight md:text-[2rem]">
                  Automated from first touch to close
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  We design automation around your sales process, not a generic template. Every workflow is mapped, tested, and validated before it goes live — and you own everything after handover.
                </p>
                <div className="mt-7 grid gap-3 md:grid-cols-2">
                  {processSteps.map((step) => (
                    <div key={step.num} className="rounded-[20px] border border-white/8 bg-white/[0.02] p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-atd-blue to-primary text-[11px] font-extrabold text-primary-foreground">
                          {step.num}
                        </div>
                        <p className="text-[15px] font-semibold leading-snug">{step.title}</p>
                      </div>
                      <p className="mt-2 text-[12px] leading-6 text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">What We Usually Automate First</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            The goal is not to automate everything. It is to automate the few moments that most affect conversion speed and lead quality.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {automationPriorities.map((item) => (
              <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tiers ── */}
      

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
              We don't just configure tools. We design systems that work for your business.
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
        description="Common questions about tools, integrations, launch timelines, and ownership."
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
            <span className="block">Ready to Automate</span>
            <span className="title-safe-inline block text-gradient">Your Growth?</span>
          </span>
        }
        description=""
        primaryCta={BOOK_A_FREE_STRATEGY_CALL_CTA}
        variant="service-close"
        layout="split"
        titleClassName="max-w-[15ch] pb-4 text-[2.38rem] leading-[1.12] tracking-[-0.04em] md:text-[2.82rem] lg:text-[3rem]"
      />
    </>
  );
};

export default MarketingAutomation;
