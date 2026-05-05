import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  BookOpen,
  ClipboardCheck,
  FileText,
  GitBranch,
  Link2,
  MailCheck,
  Route,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
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
  { num: 1, title: "Journey Mapping", description: "We map enquiry sources, CRM stages, handoffs, and the points where leads currently slow down or disappear." },
  { num: 2, title: "Workflow Design", description: "We define triggers, segments, scoring rules, notifications, and messages around your real sales process." },
  { num: 3, title: "Build & Integration", description: "We connect forms, CRM fields, email sequences, routing rules, and the tools needed to keep follow-up moving." },
  { num: 4, title: "QA & Handover", description: "Every workflow is tested end to end, documented clearly, and handed over with practical team guidance." },
];

const whyCards = [
  { title: "Built Around Your Sales Process", description: "The workflow logic reflects how your team qualifies, follows up, and closes leads." },
  { title: "Tracking and CRM Work Together", description: "Automation becomes more useful when lead source, campaign quality, and CRM stages connect." },
  { title: "Simple First, Scalable Later", description: "We start with the highest-impact workflows, then leave room for scoring, segmentation, and deeper lifecycle logic." },
  { title: "Clear Handover and Ownership", description: "You own the account, workflows, documentation, and day-to-day operating knowledge after launch." },
];

const connectedServices: PremiumLinkCard[] = [
  {
    icon: Link2,
    label: "Measurement foundation",
    title: "Conversion Tracking",
    shortDescription: "Know which leads are worth automating.",
    description: "Tracking shows which campaigns and conversion paths bring the leads worth prioritising, scoring, and nurturing.",
    path: "/service/conversion-tracking",
    ctaLabel: "See Conversion Tracking",
    surfaceClassName:
      "bg-[linear-gradient(180deg,rgba(0,51,153,0.18)_0%,rgba(0,175,239,0.06)_46%,rgba(255,255,255,0.015)_100%)]",
  },
  {
    icon: TrendingUp,
    label: "Lifecycle messaging",
    title: "Email Marketing",
    shortDescription: "Turn workflow logic into stronger messaging.",
    description: "Once the CRM and workflow foundation is clear, email marketing can support welcome, recovery, nurture, and retention journeys.",
    path: "/service/email-marketing",
    ctaLabel: "See Email Marketing",
    surfaceClassName:
      "bg-[linear-gradient(180deg,rgba(51,204,153,0.16)_0%,rgba(0,175,239,0.04)_48%,rgba(255,255,255,0.015)_100%)]",
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

      {/* Hero */}
      <section className="relative overflow-hidden pt-8 pb-24 text-center md:pt-10 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(51,204,153,0.13)_0%,rgba(0,51,153,0.07)_45%,transparent_70%)]" />
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
              <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Marketing Automation & CRM
              </span>
              <h1 className="title-safe pb-4 text-5xl font-extrabold leading-[1.14] tracking-[-0.035em] md:pb-5 md:text-6xl lg:text-[4.65rem]">
                <span className="block">Capture the Lead.</span>
                <span className="title-safe-inline mt-1 block text-gradient">Nurture the Sale.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                We build the automated workflows, email sequences, and CRM systems that turn captured leads into paying clients without manual bottlenecks slowing your team down.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
      <section className="border-t border-white/10 py-4 lg:py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-8 lg:mb-10">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
              The Problem & How We Fix It
            </span>
            <h2 className="title-safe text-2xl font-extrabold leading-[1.2] tracking-[-0.025em] md:text-3xl lg:whitespace-nowrap">
              Where leads are lost and how we{" "}
              <span className="title-safe-inline text-gradient">fix the follow-up.</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(80%_60%_at_0%_0%,rgba(239,68,68,0.06),transparent_60%),radial-gradient(80%_60%_at_100%_100%,rgba(51,204,153,0.05),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(239,107,122,0.4)_25%,rgba(51,204,153,0.4)_75%,transparent)]" />
            <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.08)_12%,rgba(255,255,255,0.08)_88%,transparent_100%)] lg:block" />
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_44px_1fr] border-b border-white/[0.07] lg:grid-cols-[1fr_72px_1fr]">
              <div className="relative overflow-hidden p-4 lg:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_0%,rgba(239,68,68,0.12),transparent_65%)]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/[0.1] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-400/90">
                    <AlertCircle className="h-3 w-3" />The Problem
                  </span>
                  <p className="mt-4 hidden text-xl font-extrabold leading-snug tracking-[-0.02em] lg:block lg:text-2xl">
                    Leads come in.{" "}
                    <span className="text-red-400/80 line-through decoration-red-400/60 decoration-2">Then momentum gets lost</span>.
                  </p>
                </div>
              </div>
              <div />
              <div className="relative overflow-hidden border-l border-white/[0.07] p-4 lg:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_100%_0%,rgba(51,204,153,0.1),transparent_65%)]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.1] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    <ShieldCheck className="h-3 w-3" />How We Fix It
                  </span>
                  <p className="mt-4 hidden text-xl font-extrabold leading-snug tracking-[-0.02em] lg:block lg:whitespace-nowrap lg:text-2xl">
                    Automated from first touch.{" "}
                    <span className="text-gradient">To the next step.</span>
                  </p>
                </div>
              </div>
            </div>
            {/* Paired rows */}
            {[
              { problem: "Slow first responses lower the chance of conversion",        fix: { icon: Route,      title: "Map the journey before the tool",      description: "Automation follows your buyer journey and sales process instead of forcing the team into a generic template." } },
              { problem: "Enquiries get lost with no pipeline visibility or ownership", fix: { icon: Bell,       title: "Keep handoffs fast and visible",       description: "New leads, hot actions, and follow-up tasks are routed quickly so ownership is clear and response times improve." } },
              { problem: "Teams repeat follow-up that could run automatically",         fix: { icon: ShieldCheck, title: "Test every workflow before launch",    description: "We validate triggers, messages, CRM updates, and notifications before the system becomes part of daily operations." } },
            ].map((pair, i) => (
              <div key={i} className="group grid grid-cols-[1fr_44px_1fr] items-center border-b border-white/[0.05] px-4 py-4 last:border-b-0 lg:grid-cols-[1fr_72px_1fr] lg:px-10 lg:py-6">
                <div className="flex items-center gap-3 pr-2">
                  <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-red-400/60">0{i + 1}</span>
                  <p className="text-[14px] font-medium leading-snug text-foreground/80 lg:text-[17px]">{pair.problem}</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-background text-primary transition-colors duration-200 group-hover:border-primary/40">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="flex items-start gap-2 pl-1">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-[radial-gradient(circle_at_30%_30%,rgba(51,204,153,0.18),transparent_60%),rgba(51,204,153,0.06)]">
                    <pair.fix.icon className="h-[15px] w-[15px] text-primary" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold leading-snug text-foreground lg:text-[17px]">{pair.fix.title}</p>
                    <p className="mt-1 hidden text-[13px] leading-[1.65] text-muted-foreground lg:block">{pair.fix.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-center border-t border-white/[0.07] px-5 py-5 lg:px-10 lg:py-6">
              <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>{BOOK_A_FREE_STRATEGY_CALL_CTA.label}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="border-t border-white/10 bg-white/[0.015] py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Implementation Approach
          </span>
          <h2 className="text-2xl font-extrabold tracking-[-0.025em] md:text-3xl">
            Built Around Your Lead Flow
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Every workflow starts with the journey: where leads come from, what they need next, and who should act when they qualify.
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
                  <p className="mt-6 text-[14px] font-semibold leading-snug">{step.title}</p>
                  <p className="mt-2.5 text-[13px] leading-[1.7] text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
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

      {/* Why Us */}
      <section className="py-4 lg:py-6">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[32px] border border-primary/15 bg-[radial-gradient(ellipse_80%_55%_at_10%_0%,rgba(51,204,153,0.07),transparent_72%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.01)_100%)] p-8 lg:p-12"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why AlphaTrack Digital</span>
            <h2 className="max-w-2xl text-2xl font-extrabold md:text-3xl">
              We do not just configure tools. We design operating systems for follow-up.
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

      {/* What's Included */}
      <section className="border-t border-white/10 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-bold uppercase tracking-[0.22em] text-primary">
            What's Included
          </span>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-[-0.025em] md:text-3xl">
                Every engagement is scoped to your CRM and follow-up reality.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
                Scope varies by integrations, message count, pipeline complexity, and how much ownership your team needs after launch.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-3">
            {[
              { icon: FileText, title: "Journey Map" },
              { icon: GitBranch, title: "Workflow Logic" },
              { icon: Wrench, title: "CRM Setup" },
              { icon: MailCheck, title: "Email Sequences" },
              { icon: Bell, title: "Lead Notifications" },
              { icon: BadgeCheck, title: "QA & Validation" },
              { icon: BookOpen, title: "Documentation" },
              { icon: Users, title: "Team Handover" },
              { icon: ArrowUpRight, title: "Optimisation Plan" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 border-t border-white/[0.07] py-4">
                <item.icon className="h-4 w-4 shrink-0 text-primary" />
                <p className="text-[13px] font-medium leading-snug">{item.title}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center lg:justify-start">
            <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>
                {BOOK_A_FREE_STRATEGY_CALL_CTA.label}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <FeaturedTestimonialSection title="What clients say when execution matters." />

      {/* What Automation Unlocks Next */}
      <section className="border-t border-white/10 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center lg:gap-10">
            <div className="flex h-full flex-col justify-center lg:pr-8">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                What Automation Unlocks Next
              </span>
              <h2 className="title-safe flex flex-col gap-2 pb-2 text-2xl font-extrabold leading-[1.14] tracking-[-0.03em] md:text-4xl lg:text-[2.16rem]">
                <span className="lg:whitespace-nowrap">Follow-Up Should Strengthen</span>
                <span className="title-safe-inline text-gradient lg:whitespace-nowrap">The Rest of the System</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground md:text-[15px]">
                Once leads are routed and nurtured consistently, attribution gets clearer and lifecycle messaging has a stronger system to build on.
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
        description="Common questions about tools, integrations, launch timelines, and ownership."
        eyebrow="FAQ"
        variant="minimal"
        density="compact"
        defaultOpenItem={0}
        contentClassName="max-w-[46rem]"
        accordionClassName="space-y-3"
      />

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
