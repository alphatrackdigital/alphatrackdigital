import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Megaphone,
  Target,
  BarChart3,
  Users,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import ServiceHero from "@/components/shared/ServiceHero";
import SectionIntro from "@/components/shared/SectionIntro";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import type { PlatformGroup, PlatformItem } from "@/types/platform";
import metaAdsIcon from "@/assets/tools/meta-ads.svg";
import googleAdsIcon from "@/assets/tools/google-ads.svg";
import linkedinAdsIcon from "@/assets/tools/linkedin-ads.svg";
import tiktokAdsIcon from "@/assets/tools/tiktok-favicon.png";
import youtubeAdsIcon from "@/assets/tools/youtube-ads.svg";
import programmaticIcon from "@/assets/tools/programmatic.svg";
import snapchatAdsIcon from "@/assets/tools/snapchat-ads.svg";
import digitalBillboardsIcon from "@/assets/tools/digital-billboards.png";

interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const problems: IconCard[] = [
  {
    icon: DollarSign,
    title: "Wasted Ad Spend",
    description:
      "Running campaigns without proper tracking means budget is spent without clear proof of what is working.",
  },
  {
    icon: Eye,
    title: "Poor Targeting",
    description:
      "Broad audiences and guesswork targeting lead to low-quality traffic and wasted budget.",
  },
  {
    icon: TrendingUp,
    title: "No Scalable Framework",
    description:
      "You may have occasional wins, but no repeatable system to scale what works consistently.",
  },
];

const whyUs: IconCard[] = [
  {
    icon: Target,
    title: "Measurement-First Approach",
    description:
      "Every campaign starts with proper conversion tracking so we know exactly which ads and audiences drive real results.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Optimization",
    description:
      "Real-time performance monitoring and weekly optimization cycles to reduce waste and improve return.",
  },
  {
    icon: Users,
    title: "Full-Funnel Strategy",
    description:
      "From awareness to conversion to retention, campaigns are designed for the full customer journey.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Reporting",
    description:
      "No vanity metrics. You see practical performance data such as ROAS, CPA, and LTV.",
  },
];

const platforms: PlatformItem[] = [
  {
    name: "Meta Ads",
    description: "Facebook and Instagram campaigns for awareness, leads, and sales.",
    icon: metaAdsIcon,
    role: "Paid Social",
    bestFor: "Fast testing, retargeting, and lead-gen funnels.",
  },
  {
    name: "Google Ads",
    description: "Search, Shopping, Display, and Performance Max campaigns.",
    icon: googleAdsIcon,
    role: "Demand Capture",
    bestFor: "High-intent traffic and conversion-ready demand.",
  },
  {
    name: "LinkedIn Ads",
    description: "B2B lead generation and thought leadership campaigns.",
    icon: linkedinAdsIcon,
    role: "Paid Social",
    bestFor: "Decision-maker targeting and qualified B2B pipeline.",
  },
  {
    name: "TikTok Ads",
    description: "Short-form video campaigns for high-engagement audience segments.",
    icon: tiktokAdsIcon,
    role: "Paid Social",
    bestFor: "Creative-led campaigns and upper-funnel demand.",
  },
  {
    name: "YouTube Ads",
    description: "Video campaigns for reach, engagement, and conversion-focused storytelling.",
    icon: youtubeAdsIcon,
    role: "Scaled Reach",
    bestFor: "Brand lift with measurable assisted conversions.",
  },
  {
    name: "Programmatic",
    description: "Automated buying across premium websites and apps with real-time optimization.",
    icon: programmaticIcon,
    role: "Scaled Reach",
    bestFor: "Audience extension beyond social and search.",
  },
  {
    name: "Snapchat Ads",
    description: "High-attention campaigns designed for younger, mobile-first audiences.",
    icon: snapchatAdsIcon,
    role: "Paid Social",
    bestFor: "Younger demographics and high-frequency creative.",
  },
  {
    name: "Digital Billboards",
    description: "Digital out-of-home placements to extend visibility in high-traffic locations.",
    icon: digitalBillboardsIcon,
    role: "Out-of-Home",
    bestFor: "City-level awareness and omnichannel reinforcement.",
  },
];

const platformGroups: PlatformGroup[] = [
  {
    title: "Demand Capture",
    description: "Channels built to convert existing intent into measurable demand.",
    role: "High-intent performance",
    items: platforms.filter((platform) => platform.role === "Demand Capture"),
  },
  {
    title: "Paid Social",
    description: "Creative-led channels for awareness, retargeting, and pipeline generation.",
    role: "Audience shaping",
    items: platforms.filter((platform) => platform.role === "Paid Social"),
  },
  {
    title: "Scaled Reach",
    description: "Extensions that widen quality reach without diluting measurement.",
    role: "Incremental reach",
    items: platforms.filter((platform) => platform.role === "Scaled Reach"),
  },
  {
    title: "Out-of-Home",
    description: "Offline visibility integrated into a broader media mix where needed.",
    role: "Market visibility",
    items: platforms.filter((platform) => platform.role === "Out-of-Home"),
  },
];

const heroSnapshot = [
  { label: "Outcome", value: "More efficient ad spend with channel-level accountability" },
  { label: "Timeline", value: "Initial optimization in 2-4 weeks, stronger gains in 60-90 days" },
  { label: "Best Fit", value: "Businesses already running ads that need reliable performance growth" },
];

const faqs = [
  {
    question: "What is the minimum budget for paid media?",
    answer:
      "Budget depends on your campaign objective, target audience, and growth goals. We'll review your needs on a call and recommend the right plan.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Initial optimization usually takes 2-4 weeks. Stronger performance gains typically build between 60 and 90 days.",
  },
  {
    question: "Do you manage creative as well?",
    answer:
      "Yes. We support creative strategy and ad copy, and we can work with your internal team or external creative partners for full production.",
  },
  {
    question: "Can you work with our existing tracking setup?",
    answer:
      "Yes. We audit your current tracking first and fix gaps during onboarding where needed.",
  },
];

const PaidMedia = () => {
  return (
    <>
      <SEO
        title="Paid Media Management | AlphaTrack Digital"
        description="Strategic paid social and search campaigns that drive qualified traffic. Meta Ads, Google Ads, and LinkedIn with measurement built in from day one."
        canonicalUrl="/service/paid-media"
      />

      <ServiceHero
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Services", path: "/service" },
          { label: "Paid Media Management" },
        ]}
        badgeLabel="Core Service"
        badgeIcon={Megaphone}
        title={
          <>
            Paid Media That <span className="text-gradient">Proves Its Value</span>
          </>
        }
        description="Strategic paid social and search campaigns that drive qualified traffic. We combine Meta Ads, Google Ads, and LinkedIn to reach your audience where they are and prove each spend."
        snapshot={heroSnapshot}
        tone="media"
        bodyWidth="wide"
        supportingProof={[
          { label: "Planning", value: "Channel selection by intent, audience quality, and margin." },
          { label: "Execution", value: "Weekly optimisation and creative feedback loops." },
          { label: "Reporting", value: "Performance framed around outcomes, not vanity metrics." },
        ]}
        secondaryCta={{ label: "View All Services", to: "/service", style: "outline" }}
      />
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            The Problem
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Most Paid Media Is Guesswork</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {problems.map((problem, i) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-7"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
                  <problem.icon className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-semibold">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{problem.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/book-a-call">
                Book a Call <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Platforms We Manage"
            title="Channel Strategy by Role, Not by Hype"
            description="We assign each platform a job in the funnel so the media mix feels strategic, not cluttered."
            width="wide"
            className="mb-10"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            {platformGroups.map((group, groupIndex) => (
              <motion.section
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: groupIndex * 0.06 }}
                className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/85">
                      {group.title}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                      {group.description}
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {group.role}
                  </span>
                </div>
                <div className="space-y-3">
                  {group.items.map((platform) => (
                    <article
                      key={platform.name}
                      className="rounded-2xl border border-white/8 bg-background/65 p-4"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                          <img
                            src={platform.icon}
                            alt={`${platform.name} logo`}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-lg font-semibold leading-tight">{platform.name}</h4>
                          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{platform.description}</p>
                          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                            <span className="font-semibold text-primary">Best for:</span> {platform.bestFor}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </section>
 
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Why AlphaTrack
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">What Makes Our Approach Different</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {whyUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card p-7"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion items={faqs} eyebrow="FAQ" variant="minimal" density="compact" />
      <CTASection
        title="Ready to Improve Your Ad Performance?"
        description="Book a call. We'll audit your current paid media and show you exactly where the opportunities are."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        secondaryCta={{ label: "View All Services", to: "/service" }}
        variant="service-close"
        layout="split"
        proofChips={["2-4 week optimisation window", "Outcome-led reporting", "Creative + channel feedback"]}
      />
    </>
  );
};

export default PaidMedia;

