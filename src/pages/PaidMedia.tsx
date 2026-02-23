import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Megaphone,
  Target,
  BarChart3,
  Users,
  Zap,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

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

const platforms = [
  { name: "Meta Ads", desc: "Facebook and Instagram campaigns for awareness, leads, and sales." },
  { name: "Google Ads", desc: "Search, Shopping, Display, and Performance Max campaigns." },
  { name: "LinkedIn Ads", desc: "B2B lead generation and thought leadership campaigns." },
  { name: "TikTok Ads", desc: "Short-form video campaigns for high-engagement audience segments." },
];

const heroSnapshot = [
  { label: "Outcome", value: "More efficient ad spend with channel-level accountability" },
  { label: "Timeline", value: "Initial optimization signals in 1-2 weeks, stronger gains in 30-60 days" },
  { label: "Best Fit", value: "Businesses already running ads that need reliable performance growth" },
];

const faqs = [
  {
    question: "What is the minimum budget for paid media?",
    answer:
      "We typically recommend at least $1,000-$2,000 monthly per platform to gather enough data for meaningful optimization. Management fees are separate.",
  },
  {
    question: "How quickly will I see results?",
    answer:
      "Initial signals usually appear in 1-2 weeks. Meaningful optimization improvements often show within 30-60 days.",
  },
  {
    question: "Do you manage creative as well?",
    answer:
      "Yes. We handle creative strategy and copy. For advanced creative production, we collaborate with your team or creative partners.",
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

      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-[15%] -top-[30%] h-[70%] w-[50%] rounded-full bg-primary/[0.06] blur-[140px]" />
          <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[40%] rounded-full bg-secondary/[0.04] blur-[120px]" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Services", path: "/service" },
              { label: "Paid Media Management" },
            ]}
          />
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Megaphone className="h-7 w-7 text-primary" />
            </div>
            <span className="rounded bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
              Core Service
            </span>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl">
            Paid Media That <span className="text-gradient">Proves Its Value</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Strategic paid social and search campaigns that drive qualified traffic. We combine Meta
            Ads, Google Ads, and LinkedIn to reach your audience where they are and prove each spend.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="gap-1.5 rounded-lg">
              <Link to="/book-a-call">
                Book a Call <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-1.5 rounded-lg border-white/20">
              <Link to="/service">
                View All Services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-3 rounded-xl border border-white/10 bg-card/40 p-5 md:grid-cols-3">
            {heroSnapshot.map((item) => (
              <div key={item.label}>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.label}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Platforms We Manage
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Your Ads, Everywhere That Matters</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-white/10 bg-card p-6"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold">{platform.name}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{platform.desc}</p>
              </motion.div>
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

      <FAQAccordion items={faqs} />
      <CTASection
        title="Ready to Make Your Ad Spend Provable?"
        description="Book a call. We'll audit your current paid media and show you exactly where the opportunities are."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
      />
    </>
  );
};

export default PaidMedia;
