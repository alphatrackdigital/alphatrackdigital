import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  FileText,
  Layers,
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
  { num: 1, title: "Account & Signal Audit", description: "We review tracking, account history, creative performance, landing pages, and where budget is currently leaking." },
  { num: 2, title: "Channel Strategy", description: "We decide which channels deserve a role, what each one should do, and how budget should move between them." },
  { num: 3, title: "Campaign Build", description: "We structure campaigns, audiences, creative tests, bidding, and reporting around qualified outcomes." },
  { num: 4, title: "Optimisation & Reporting", description: "We monitor signal quality, improve creative and budget allocation, and report what is driving return." },
];


const whyCards = [
  { title: "Signal Comes First", description: "We do not scale spend on broken attribution. If the account cannot learn from the right events, we fix that first." },
  { title: "Channel Roles Stay Clear", description: "Every platform has a job in the funnel, so budget decisions are deliberate instead of reactive." },
  { title: "Creative Testing Is Structured", description: "Angles, audiences, and offers are tested in a way that produces learning the team can use." },
  { title: "Reporting Connects to Decisions", description: "We report on the numbers that should change budget, creative, landing pages, and follow-up." },
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
      <section className="relative overflow-hidden pt-8 pb-24 text-center md:pt-10 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(0,175,239,0.14)_0%,rgba(0,51,153,0.08)_46%,transparent_72%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-[62rem]">
            <Breadcrumbs
              items={[
                { label: "Home", path: "/" },
                { label: "Services", path: "/service" },
                { label: "Paid Media Management" },
              ]}
            />
            <motion.div
              className="mt-16 md:mt-20"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Paid Media Management
              </span>
              <h1 className="title-safe pb-4 text-5xl font-extrabold leading-[1.14] tracking-[-0.035em] md:pb-5 md:text-6xl lg:text-[4.65rem]">
                <span className="block">Paid Media That</span>
                <span className="title-safe-inline mt-1 block text-gradient">Proves Its Value.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Strategic paid social and search campaigns built to drive qualified demand, improve spend efficiency, and show what every channel is contributing.
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
              Where the budget leaks and how we{" "}
              <span className="title-safe-inline text-gradient">stop the bleed.</span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(80%_60%_at_0%_0%,rgba(239,68,68,0.06),transparent_60%),radial-gradient(80%_60%_at_100%_100%,rgba(51,204,153,0.05),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_30px_80px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            {/* Top gradient border */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(239,107,122,0.4)_25%,rgba(51,204,153,0.4)_75%,transparent)]" />

            {/* Vertical seam — desktop only */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.08)_12%,rgba(255,255,255,0.08)_88%,transparent_100%)] lg:block" />

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_44px_1fr] border-b border-white/[0.07] lg:grid-cols-[1fr_72px_1fr]">
              {/* Problem header */}
              <div className="relative overflow-hidden p-4 lg:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_0%_0%,rgba(239,68,68,0.12),transparent_65%)]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-red-400/30 bg-red-400/[0.1] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-red-400/90">
                    <AlertCircle className="h-3 w-3" />
                    The Problem
                  </span>
                  <p className="mt-4 hidden text-xl font-extrabold leading-snug tracking-[-0.02em] lg:block lg:text-2xl">
                    Most paid media spend disappears{" "}
                    <span className="relative inline-block text-red-400/80 line-through decoration-red-400/60 decoration-2">
                      without proof
                    </span>
                    .
                  </p>
                </div>
              </div>

              <div />

              {/* Fix header */}
              <div className="relative overflow-hidden border-l border-white/[0.07] p-4 lg:border-l lg:p-10">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_100%_0%,rgba(51,204,153,0.1),transparent_65%)]" />
                <div className="relative">
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/[0.1] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                    <ShieldCheck className="h-3 w-3" />
                    How We Fix It
                  </span>
                  <p className="mt-4 hidden text-xl font-extrabold leading-snug tracking-[-0.02em] lg:block lg:text-2xl">
                    Strategy-led. Measurement-backed.<br />
                    <span className="text-gradient">Built for return.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Paired rows */}
            {[
              {
                problem: "Budget shifts without clear proof of what is working",
                fix: { icon: Target, title: "Measure before scaling", description: "Campaigns are built around conversion events and lead quality, not platform vanity metrics." },
              },
              {
                problem: "Broad targeting brings traffic that never converts",
                fix: { icon: Layers, title: "Give every channel a job", description: "Search captures demand, social shapes it, and reach supports recall once the core engine is ready." },
              },
              {
                problem: "Creative wins happen, but there is no system to scale them",
                fix: { icon: ShieldCheck, title: "Optimise toward return", description: "Budget, creative, and audience decisions move toward qualified leads, sales, and efficiency." },
              },
            ].map((pair, i) => (
              <div
                key={i}
                className="group grid grid-cols-[1fr_44px_1fr] items-center border-b border-white/[0.05] px-4 py-4 last:border-b-0 lg:grid-cols-[1fr_72px_1fr] lg:px-10 lg:py-6"
              >
                {/* Problem */}
                <div className="flex items-center gap-3 pr-2">
                  <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-red-400/60">
                    0{i + 1}
                  </span>
                  <p className="text-[14px] font-medium leading-snug text-foreground/80 lg:text-[17px]">
                    {pair.problem}
                  </p>
                </div>

                {/* Connector */}
                <div className="flex items-center justify-center">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-background text-primary transition-colors duration-200 group-hover:border-primary/40 lg:h-7 lg:w-7">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>

                {/* Fix */}
                <div className="flex items-start gap-2 pl-1 lg:gap-3 lg:pl-2">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-[radial-gradient(circle_at_30%_30%,rgba(51,204,153,0.18),transparent_60%),rgba(51,204,153,0.06)] lg:h-8 lg:w-8">
                    <pair.fix.icon className="h-[13px] w-[13px] text-primary lg:h-[15px] lg:w-[15px]" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold leading-snug text-foreground lg:text-[17px]">
                      {pair.fix.title}
                    </p>
                    <p className="mt-1 hidden text-[13px] leading-[1.65] text-muted-foreground lg:block">
                      {pair.fix.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Footer CTA */}
            <div className="flex justify-center border-t border-white/[0.07] px-5 py-6 lg:px-10">
              <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>
                  {BOOK_A_FREE_STRATEGY_CALL_CTA.label}
                </Link>
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
            Built Around Your Acquisition Stack
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
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
            className="overflow-hidden rounded-[32px] border border-sky-400/15 bg-[radial-gradient(ellipse_80%_55%_at_10%_0%,rgba(0,175,239,0.07),transparent_72%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.01)_100%)] p-8 lg:p-12"
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why AlphaTrack Digital</span>
            <h2 className="max-w-2xl text-3xl font-extrabold md:text-4xl">
              We do not just run ads. We build media systems that learn.
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
              <h2 className="text-2xl font-extrabold leading-[1.2] tracking-[-0.025em] md:text-3xl">
                Every engagement is scoped to your growth stage.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
                Scope varies by channel mix, budget, creative needs, and reporting maturity. We send a tailored proposal after discovery.
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-0 sm:grid-cols-3">
            {[
              { icon: FileText, title: "Account Audit" },
              { icon: Megaphone, title: "Channel Strategy" },
              { icon: Wrench, title: "Campaign Buildout" },
              { icon: BadgeCheck, title: "Conversion QA" },
              { icon: BarChart3, title: "Performance Reporting" },
              { icon: BookOpen, title: "Creative Learning Log" },
              { icon: Users, title: "Strategy Reviews" },
              { icon: ClipboardCheck, title: "Optimisation Roadmap" },
              { icon: ArrowUpRight, title: "Scale Recommendations" },
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

      {/* What Paid Media Unlocks Next */}
      <section className="border-t border-white/10 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center lg:gap-10">
            <div className="flex h-full flex-col justify-center lg:pr-8">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                What Paid Media Unlocks Next
              </span>
              <h2 className="title-safe flex flex-col gap-2 pb-2 text-2xl font-extrabold leading-[1.14] tracking-[-0.03em] md:text-4xl lg:text-[2.16rem]">
                <span className="lg:whitespace-nowrap">Ad Spend Should Strengthen</span>
                <span className="title-safe-inline text-gradient lg:whitespace-nowrap">The Rest of the System</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground md:text-[15px]">
                Once campaigns are structured around clean conversion data, budget allocation and lead follow-up get more useful at the same time.
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
        description="Common questions about budget, channel mix, creative direction, and reporting."
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
            <span className="block">Ready to Scale</span>
            <span className="title-safe-inline block text-gradient">Paid Media?</span>
          </span>
        }
        description=""
        primaryCta={BOOK_A_FREE_STRATEGY_CALL_CTA}
        variant="service-close"
        layout="split"
        titleClassName="max-w-[14ch] pb-4 text-[2.38rem] leading-[1.12] tracking-[-0.04em] md:text-[2.82rem] lg:text-[3rem]"
      />
    </>
  );
};

export default PaidMedia;
