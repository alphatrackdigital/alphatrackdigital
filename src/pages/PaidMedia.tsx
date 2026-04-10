import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Megaphone,
  Target,
  BarChart3,
  Users,
  ShieldCheck,
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
import type { PlatformItem } from "@/types/platform";
import metaAdsIcon from "@/assets/tools/meta-ads.svg";
import googleAdsIcon from "@/assets/tools/google-ads.svg";
import linkedinAdsIcon from "@/assets/tools/linkedin-ads.svg";
import tiktokAdsIcon from "@/assets/tools/tiktok-favicon.png";
import youtubeAdsIcon from "@/assets/tools/youtube-ads.svg";
import programmaticIcon from "@/assets/tools/programmatic.svg";
import snapchatAdsIcon from "@/assets/tools/snapchat-ads.svg";
import digitalBillboardsIcon from "@/assets/tools/digital-billboards.png";
import microsoftAdsIcon from "@/assets/tools/microsoft-ads.png";
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

interface ChannelRolePlaybook {
  label: string;
  title: string;
  description: string;
  bestUse: string;
  platforms: PlatformItem[];
  surfaceClassName: string;
}

interface DecisionSignal {
  title: string;
  description: string;
  spanClassName: string;
  surfaceClassName: string;
}

const whyUs: IconCard[] = [
  {
    icon: Target,
    title: "Measure before scaling",
    description: "We fix conversion signal first so the account learns from real outcomes.",
  },
  {
    icon: BarChart3,
    title: "Give each channel a job",
    description: "Search captures intent, social shapes demand, and wider reach supports recall.",
  },
  {
    icon: ShieldCheck,
    title: "Optimise to return",
    description: "Budget and creative decisions move toward qualified leads, revenue, and efficiency.",
  },
];

const platforms: PlatformItem[] = [
  { name: "Meta Ads", description: "Facebook and Instagram campaigns for awareness, leads, and sales.", icon: metaAdsIcon, role: "Paid Social", bestFor: "Fast testing, retargeting, and lead-gen funnels." },
  { name: "Google Ads", description: "Search, Shopping, Display, and Performance Max campaigns.", icon: googleAdsIcon, role: "Demand Capture", bestFor: "High-intent traffic and conversion-ready demand." },
  { name: "Microsoft Ads", description: "Search campaigns that extend demand capture across Bing, Yahoo, and partner inventory.", icon: microsoftAdsIcon, role: "Demand Capture", bestFor: "Additional high-intent search volume with efficient CPCs." },
  { name: "LinkedIn Ads", description: "B2B lead generation and thought leadership campaigns.", icon: linkedinAdsIcon, role: "Paid Social", bestFor: "Decision-maker targeting and qualified B2B pipeline." },
  { name: "TikTok Ads", description: "Short-form video campaigns for high-engagement audience segments.", icon: tiktokAdsIcon, role: "Paid Social", bestFor: "Creative-led campaigns and upper-funnel demand." },
  { name: "YouTube Ads", description: "Video campaigns for reach, engagement, and conversion-focused storytelling.", icon: youtubeAdsIcon, role: "Scaled Reach", bestFor: "Brand lift with measurable assisted conversions." },
  { name: "Programmatic", description: "Automated buying across premium websites and apps with real-time optimisation.", icon: programmaticIcon, role: "Scaled Reach", bestFor: "Audience extension beyond social and search." },
  { name: "Snapchat Ads", description: "High-attention campaigns designed for younger, mobile-first audiences.", icon: snapchatAdsIcon, role: "Paid Social", bestFor: "Younger demographics and high-frequency creative." },
  { name: "Digital Billboards", description: "Digital out-of-home placements to extend visibility in high-traffic locations.", icon: digitalBillboardsIcon, role: "Out-of-Home", bestFor: "City-level awareness and omnichannel reinforcement." },
];

const premiumLinkCards: PremiumLinkCard[] = [
  {
    icon: Target,
    label: "Measurement Foundation",
    title: "Conversion Tracking",
    description:
      "Paid media gets sharper when Google, Meta, and your CRM can optimise toward conversion events you actually trust.",
    path: "/service/conversion-tracking",
    ctaLabel: "See Conversion Tracking",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(0,51,153,0.16),transparent_72%),linear-gradient(180deg,rgba(8,20,46,0.94)_0%,rgba(10,17,32,0.9)_100%)]",
  },
  {
    icon: TrendingUp,
    label: "Lead Follow-Up",
    title: "Marketing Automation",
    description:
      "Once campaigns bring in the right leads, fast CRM follow-up and nurture journeys help convert more of that demand.",
    path: "/service/marketing-automation",
    ctaLabel: "See Marketing Automation",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.16),transparent_72%),linear-gradient(180deg,rgba(13,40,36,0.94)_0%,rgba(12,23,26,0.9)_100%)]",
  },
];

const channelPlaybooks: ChannelRolePlaybook[] = [
  {
    label: "Demand Capture",
    title: "Convert existing intent fast",
    description:
      "Search-led campaigns intercept people already looking for the offer and route that demand into pages built to convert.",
    bestUse: "Best when intent already exists and efficiency matters most.",
    platforms: platforms.filter((platform) =>
      ["Google Ads", "Microsoft Ads"].includes(platform.name),
    ),
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_72%),linear-gradient(180deg,rgba(10,20,44,0.9)_0%,rgba(9,16,31,0.94)_100%)]",
  },
  {
    label: "Paid Social",
    title: "Create demand with a clear role",
    description:
      "Creative-led channels build demand, test angles, and re-engage visitors without letting retargeting hide weak prospecting.",
    bestUse: "Best when message-market fit is improving and speed of testing matters.",
    platforms: platforms.filter((platform) =>
      ["Meta Ads", "LinkedIn Ads", "TikTok Ads", "Snapchat Ads"].includes(platform.name),
    ),
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.14),transparent_72%),linear-gradient(180deg,rgba(8,22,36,0.9)_0%,rgba(9,16,31,0.94)_100%)]",
  },
  {
    label: "Scaled Reach",
    title: "Expand without diluting signal",
    description:
      "Video, programmatic, and broader placements expand recall after the core acquisition engine is already working.",
    bestUse: "Best when the account is proven and the next move is broader reach.",
    platforms: platforms.filter((platform) =>
      ["YouTube Ads", "Programmatic", "Digital Billboards"].includes(platform.name),
    ),
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.13),transparent_72%),linear-gradient(180deg,rgba(11,18,38,0.9)_0%,rgba(11,17,28,0.94)_100%)]",
  },
];

const decisionSignals: DecisionSignal[] = [
  {
    title: "The offer already has traction",
    description:
      "Paid media scales faster when there is a clear offer, a conversion path, and some evidence that the market responds to it.",
    spanClassName: "xl:col-span-3",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_72%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.015)_100%)]",
  },
  {
    title: "Measurement is ready for decisions",
    description:
      "The channel mix only improves when the data can distinguish qualified demand from noise, overlap, and platform self-reporting.",
    spanClassName: "xl:col-span-3",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(0,175,239,0.12),transparent_72%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.015)_100%)]",
  },
  {
    title: "Landing pages can convert attention",
    description:
      "If the landing experience is unclear, slow, or generic, extra spend usually magnifies waste rather than growth.",
    spanClassName: "xl:col-span-2",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.11),transparent_72%),linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.012)_100%)]",
  },
  {
    title: "The team can act on the learning",
    description:
      "The strongest accounts improve quickly because creative, budget, landing-page, and follow-up decisions move together instead of waiting on separate teams.",
    spanClassName: "xl:col-span-4",
    surfaceClassName:
      "bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.11),transparent_72%),linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.012)_100%)]",
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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-8 pb-24 text-center md:pt-10 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-5%,rgba(0,51,153,0.14)_0%,rgba(0,175,239,0.08)_45%,transparent_70%)]" />
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
              <div className="inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <Megaphone className="h-4 w-4" />
                Paid Media Management
              </div>
              <h1 className="title-safe mt-8 pb-4 text-5xl font-extrabold leading-[1.14] tracking-[-0.035em] md:pb-5 md:text-6xl lg:text-[4.5rem]">
                Paid Media That{" "}
                <span className="title-safe-inline text-gradient">Proves Its Value</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Strategic paid social and search campaigns built to drive qualified traffic. We combine Meta Ads, Google Ads, and LinkedIn to reach your audience where they are — and prove every spend.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground hover:bg-primary/90">
                  <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>{BOOK_A_FREE_STRATEGY_CALL_CTA.label} <ArrowUpRight className="h-4 w-4" /></Link>
                </Button>
              </div>
              {/* Quick stats */}
              <div className="hidden mx-auto mt-14 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {[
                  { label: "Outcome", value: "Efficient, proven ad spend" },
                  { label: "Optimisation", value: "2–4 weeks initial" },
                  { label: "Best for", value: "Businesses scaling paid" },
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

      {/* ── Panel 1: The Problem ── */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center">
            <div className="flex h-full flex-col justify-center lg:pr-8">
              <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                What Paid Media Unlocks Next
              </span>
              <h2 className="title-safe flex flex-col gap-3 pb-4 text-3xl font-extrabold leading-[1.14] tracking-[-0.03em] md:text-4xl lg:text-[2.16rem]">
                <span className="lg:whitespace-nowrap">Ad Spend Should Strengthen</span>
                <span className="title-safe-inline text-gradient lg:whitespace-nowrap">The Rest of the System</span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-muted-foreground md:text-[15px]">
                Once campaigns are structured around clean conversion data, creative testing, budget allocation, and
                follow-up all get more useful at the same time.
              </p>
            </div>
            <div className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.01)_100%)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.22)] lg:max-w-[42rem] lg:justify-self-end">
              <div className="grid gap-3 md:grid-cols-2">
                {premiumLinkCards.map((item) => (
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
                  Most paid media spend disappears without proof
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  Without proper tracking and a deliberate channel strategy, ad budgets are allocated on instinct. Platforms report the numbers they want to show — and your real return stays invisible.
                </p>
                <ul className="mt-6 space-y-2.5">
                  {[
                    "Budget moves without clear proof of what is actually working",
                    "Broad targeting brings traffic that never converts",
                    "Wins happen, but there is no repeatable system to scale them",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                      <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500/20 ring-1 ring-red-400/40" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>{BOOK_A_FREE_STRATEGY_CALL_CTA.label} <ArrowUpRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
              {/* Visual: mock wasted budget */}
              <div className="flex items-center justify-center border-t border-white/10 bg-white/[0.015] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="w-full max-w-[296px] rounded-2xl border border-red-500/15 bg-black/50 p-4 shadow-[0_0_50px_rgba(239,68,68,0.05)]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-red-400/80">Budget Attribution</span>
                    <span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-[10px] font-bold text-red-400">Untracked</span>
                  </div>
                  {[
                    { channel: "Google Ads", spend: "£4,200", conv: "—" },
                    { channel: "Meta Ads", spend: "£3,800", conv: "—" },
                    { channel: "LinkedIn", spend: "£1,200", conv: "—" },
                  ].map((row) => (
                    <div key={row.channel} className="mb-2 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2">
                      <span className="text-[13px]">{row.channel}</span>
                      <span className="text-[13px] text-red-300">{row.spend}</span>
                      <span className="text-[13px] text-muted-foreground/30">{row.conv}</span>
                    </div>
                  ))}
                  <div className="mt-3 space-y-1">
                    {["No conversion attribution", "Budget allocation: guesswork"].map((msg) => (
                      <p key={msg} className="flex items-center gap-2 text-[11px] text-red-400/70">
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

      {/* ── Panel 2: Our Approach ── */}
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
              {/* Visual: mock campaign dashboard */}
              <div className="flex items-center justify-center border-b border-white/10 bg-white/[0.015] p-8 lg:border-b-0 lg:border-r lg:p-10">
                <div className="w-full max-w-[296px] rounded-2xl border border-primary/20 bg-black/50 p-4 shadow-[0_0_50px_rgba(0,175,239,0.07)]">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">Campaign Performance</span>
                    <span className="flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-[10px] font-bold text-green-400">
                      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                      Live
                    </span>
                  </div>
                  {[
                    { metric: "ROAS", value: "4.2×", change: "+18%", up: true },
                    { metric: "CAC", value: "£14.80", change: "−24%", up: true },
                    { metric: "CTR", value: "3.8%", change: "+0.9pp", up: true },
                    { metric: "Qualified Leads", value: "342", change: "+61%", up: true },
                  ].map((m) => (
                    <div key={m.metric} className="mb-2 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3.5 py-2">
                      <span className="text-[13px] text-muted-foreground">{m.metric}</span>
                      <span className="text-[13px] font-bold">{m.value}</span>
                      <span className="text-[11px] font-semibold text-green-400">{m.change}</span>
                    </div>
                  ))}
                  <p className="mt-3 text-[11px] text-muted-foreground/40">Last 30 days · Updated daily</p>
                </div>
              </div>
              {/* Text */}
              <div className="flex flex-col justify-center p-8 lg:p-10">
                <span className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">How We Run Campaigns</span>
                <h2 className="text-2xl font-extrabold leading-tight md:text-[2rem]">
                  Strategy-led. Measurement-backed. Built for return.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
                  Every campaign starts with clean conversion data. Then we assign each channel a clear role and
                  optimise around qualified outcomes instead of platform vanity.
                </p>
                <div className="mt-7 grid gap-3 md:grid-cols-3">
                  {whyUs.map((item) => (
                    <div key={item.title} className="rounded-[20px] border border-white/8 bg-white/[0.02] p-4">
                      <item.icon className="mb-2.5 h-4.5 w-4.5 text-primary" />
                      <p className="text-[15px] font-semibold leading-snug">{item.title}</p>
                      <p className="mt-1.5 text-[12px] leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex max-w-3xl flex-col gap-3">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Channel Playbook
            </span>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
              Three media roles. One controlled system.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-muted-foreground md:text-[15px]">
              Each channel earns its budget by doing one clear job in the funnel, so the media mix feels deliberate,
              compact, and easier to scale.
            </p>
          </div>
          <div className="mt-10 rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.01)_100%)] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.18)] lg:p-4">
            <div className="grid gap-4 xl:grid-cols-3">
            {channelPlaybooks.map((group, index) => (
              <motion.section
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={cn(
                  "relative overflow-hidden rounded-[28px] border border-white/10 p-6 shadow-[0_18px_48px_rgba(0,0,0,0.16)] lg:p-7",
                  group.surfaceClassName,
                )}
              >
                <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-white/[0.05] blur-3xl" />
                <div className="relative flex h-full flex-col">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/85">
                      {group.label}
                    </p>
                    <h3 className="mt-3 text-[1.28rem] font-semibold leading-[1.12] tracking-[-0.03em]">
                      {group.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{group.description}</p>
                  </div>
                  <div className="-mx-6 mt-5 border-y border-white/10 bg-black/18 px-6 py-4 lg:-mx-7 lg:px-7">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      Best fit
                    </p>
                    <p className="mt-2 text-sm leading-6 text-foreground/90">{group.bestUse}</p>
                  </div>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/75">
                      Platforms
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2.5">
                      {group.platforms.map((platform) => (
                        <div
                          key={platform.name}
                          className="flex items-center gap-2.5 rounded-full border border-white/10 bg-background/75 px-3 py-2"
                        >
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.18)]">
                            <img
                              src={platform.icon}
                              alt={`${platform.name} logo`}
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-xs font-medium leading-none text-foreground/90">{platform.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      <section className="border-t border-white/10 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Decision Check
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">
              When paid media is the right lever
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-[15px]">
              More spend is not automatically the answer. We want paid media to be the next sensible move, with the
              structure around it ready to turn budget into learning and return.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-6">
            {decisionSignals.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className={cn(
                  "group relative overflow-hidden rounded-[28px] border border-white/10 p-6 shadow-[0_16px_45px_rgba(0,0,0,0.14)]",
                  item.spanClassName,
                  item.surfaceClassName,
                )}
              >
                <div className="pointer-events-none absolute -right-4 bottom-0 text-[5rem] font-semibold tracking-[-0.08em] text-white/[0.05] md:text-[6rem]">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/75">
                    Signal {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-xl font-semibold leading-[1.15] tracking-[-0.025em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-[34rem] text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="hidden border-t border-white/10 bg-white/[0.015] py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Works Best With
          </span>
          <h2 className="text-3xl font-extrabold md:text-4xl">Paid Media Performs Better Inside A Connected System</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            Campaign performance improves faster when tracking is trustworthy and follow-up keeps pace with the demand being generated.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {premiumLinkCards.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="group rounded-[26px] border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {item.ctaLabel}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FeaturedTestimonialSection title="What clients say when execution matters." />

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

      {/* ── CTA ── */}
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
