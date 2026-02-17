import { Link } from "react-router-dom";
import { ArrowUpRight, Megaphone, Target, BarChart3, Users, Zap, ShieldCheck, TrendingUp, DollarSign, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface IconCard { icon: LucideIcon; title: string; description: string; }

const problems: IconCard[] = [
  { icon: DollarSign, title: "Wasted Ad Spend", description: "Running campaigns without proper tracking means you're spending money but can't prove what's working." },
  { icon: Eye, title: "Poor Targeting", description: "Broad audiences and guesswork targeting lead to low-quality clicks and wasted budget." },
  { icon: TrendingUp, title: "No Scalable Framework", description: "You've had some wins, but can't replicate them. There's no system to consistently scale what works." },
];

const whyUs: IconCard[] = [
  { icon: Target, title: "Measurement-First Approach", description: "Every campaign starts with proper conversion tracking. We know exactly which ad, audience, and creative drove each result." },
  { icon: BarChart3, title: "Data-Driven Optimisation", description: "Real-time performance monitoring with weekly optimisation cycles. We cut waste fast and double down on what converts." },
  { icon: Users, title: "Full-Funnel Strategy", description: "From awareness to conversion to retention — we build campaigns across the entire customer journey, not just the top." },
  { icon: ShieldCheck, title: "Transparent Reporting", description: "No vanity metrics. You see the real numbers — ROAS, CPA, LTV — in dashboards you can access anytime." },
];

const platforms = [
  { name: "Meta Ads", desc: "Facebook & Instagram campaigns for awareness, leads, and sales." },
  { name: "Google Ads", desc: "Search, Shopping, Display, and Performance Max campaigns." },
  { name: "LinkedIn Ads", desc: "B2B lead generation and thought leadership campaigns." },
  { name: "TikTok Ads", desc: "Short-form video campaigns to reach younger, engaged audiences." },
];

const faqs = [
  { question: "What's the minimum budget for paid media?", answer: "We typically recommend a minimum monthly ad spend of $1,000–$2,000 per platform to gather enough data for meaningful optimisation. Our management fees are separate and scale with complexity." },
  { question: "How quickly will I see results?", answer: "Initial data and performance signals appear within the first 1–2 weeks. Meaningful optimisation results typically show within 30–60 days, with compounding improvements month over month." },
  { question: "Do you manage creative as well?", answer: "Yes — we handle ad creative strategy, copywriting, and basic design. For more complex video or brand creative, we collaborate with your team or our creative partners." },
  { question: "Can you work with our existing tracking setup?", answer: "Absolutely. We'll audit your current tracking first. If there are gaps (there usually are), we'll fix them as part of onboarding — it's what we're known for." },
];

const PaidMedia = () => {
  return (
    <>
      <SEO title="Paid Media Management | AlphaTrack Digital" description="Strategic paid social and search campaigns that drive qualified traffic. Meta Ads, Google Ads, LinkedIn — with measurement built in from day one." />
      
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] h-[70%] w-[50%] rounded-full bg-primary/[0.06] blur-[140px]" />
          <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[40%] rounded-full bg-secondary/[0.04] blur-[120px]" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Services", path: "/service" }, { label: "Paid Media Management" }]} />
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Megaphone className="h-7 w-7 text-primary" />
            </div>
            <span className="rounded bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">Core Service</span>
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl">
            Paid Media That <span className="text-gradient">Proves Its Value</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Strategic paid social and search campaigns that drive qualified traffic. We combine Meta Ads, Google Ads, and LinkedIn to reach your audience where they are — and prove every pound spent.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="gap-1.5 rounded-lg">
              <Link to="/book-a-call">Book a Free Strategy Call <ArrowUpRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-1.5 rounded-lg border-white/20">
              <Link to="/service">View All Services <ArrowUpRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">The Problem</span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Most Paid Media is Guesswork</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {problems.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
                  <p.icon className="h-5 w-5 text-destructive" />
                </div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">Platforms We Manage</span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Your Ads, Everywhere That Matters</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platforms.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="rounded-xl border border-white/10 bg-card p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold">{p.name}</h4>
                <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">Why AlphaTrack</span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">What Makes Our Approach Different</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {whyUs.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-7">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <w.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion items={faqs} />
      <CTASection title="Ready to Make Your Ad Spend Provable?" description="Book a free strategy call. We'll audit your current paid media and show you exactly where the opportunities are." />
    </>
  );
};

export default PaidMedia;
