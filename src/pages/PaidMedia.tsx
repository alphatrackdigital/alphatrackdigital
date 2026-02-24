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
import ServiceHero from "@/components/shared/ServiceHero";
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
  { name: "YouTube Ads", desc: "Video campaigns for reach, engagement, and conversion-focused storytelling." },
  { name: "Programmatic", desc: "Automated media buying across premium websites and apps with real-time optimization." },
  { name: "Snapchat Ads", desc: "High-attention campaigns designed for younger, mobile-first audiences." },
  { name: "Digital Billboards", desc: "Digital out-of-home placements to extend campaign visibility in high-traffic locations." },
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
        title="Ready to Improve Your Ad Performance?"
        description="Book a call. We'll audit your current paid media and show you exactly where the opportunities are."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
      />
    </>
  );
};

export default PaidMedia;

