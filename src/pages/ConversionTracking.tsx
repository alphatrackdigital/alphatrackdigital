import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import ServiceTierCard from "@/components/shared/ServiceTierCard";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BadgeDollarSign, TrendingDown, EyeOff, ClipboardCheck, Building, Layers, ShieldCheck, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const problemCards: IconCard[] = [
  { icon: BadgeDollarSign, title: "Wasted Ad Spend", description: "If your conversion tracking is broken, your ad platforms can't learn. They optimise towards the wrong audience, and your cost per lead climbs." },
  { icon: TrendingDown, title: "Unreliable Reports", description: "When GA4 says one thing and Meta says another, no one trusts the data. Decisions stall. Budgets get cut." },
  { icon: EyeOff, title: "Invisible ROI", description: "You're generating leads, but you can't prove which channel brought them. That makes it impossible to scale what works." },
];

const processSteps = [
  { num: 1, title: "Measurement Plan", description: "We define what to track and why, based on your actual business goals. No vanity metrics." },
  { num: 2, title: "Implementation", description: "We configure GTM, GA4, Meta Ads, Google Ads, and any other platforms you use." },
  { num: 3, title: "QA & Validation", description: "Every conversion event is tested and proven. If we can't verify it fires correctly, it doesn't go live." },
  { num: 4, title: "Handover & Support", description: "We walk you through what we built and hand over full documentation." },
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

const faqs = [
  { question: "What is conversion tracking and why do I need it?", answer: "Conversion tracking measures the specific actions people take on your website — like filling out a form, booking a call, or making a purchase. Without it, your ad platforms can't learn which clicks lead to real results, so they waste your budget." },
  { question: "How long does the setup take?", answer: "Starter tier setups typically take 5–7 working days from kickoff to go-live. Growth and Advanced tiers take 2–3 weeks depending on complexity." },
  { question: "What platforms do you support?", answer: "We support GA4, Google Ads, Meta (Facebook & Instagram), LinkedIn, TikTok, and most major ad platforms. If you use a platform we haven't listed, ask us." },
  { question: "Will this work with my existing website?", answer: "Yes. We work with WordPress, Shopify, WooCommerce, Webflow, custom-built sites, and most other platforms. We use Google Tag Manager so the setup is platform-independent." },
  { question: "How do I know the tracking is working?", answer: "We validate every conversion event using GTM Preview mode and GA4 DebugView before anything goes live. You'll see the proof before we ship." },
  { question: "What happens after the setup is complete?", answer: "We hand over full documentation and walk your team through the setup. You own everything. If you want ongoing support or optimisation, we offer that too." },
  { question: "Do I need to change my website?", answer: "Usually no. Most tracking setups are non-invasive and don't require changes to your site design or content. In some cases we may need a developer to add a small code snippet." },
];

const ConversionTracking = () => {
  return (
    <>
      <SEO
        title="Conversion Tracking Setup Services | AlphaTrack Digital"
        description="We set up GA4, Meta, and Google Ads conversion tracking that tells you exactly which channels drive your leads and sales. Accurate, auditable, proven."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Conversion Tracking & Measurement",
          "provider": { "@type": "Organization", "name": "AlphaTrack Digital", "url": "https://alphatrack.digital" },
          "description": "We set up GA4, Meta, and Google Ads conversion tracking that tells you exactly which channels drive your leads and sales.",
          "areaServed": ["Ghana", "Nigeria", "United Kingdom"],
          "url": "https://alphatrack.digital/service/conversion-tracking"
        }}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alphatrack.digital/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://alphatrack.digital/service" },
            { "@type": "ListItem", "position": 3, "name": "Conversion Tracking", "item": "https://alphatrack.digital/service/conversion-tracking" }
          ]
        })}</script>
      </Helmet>
      {/* Page Banner */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", path: "/" },
            { label: "Services", path: "/service" },
            { label: "Conversion Tracking" },
          ]} />
          <h1 className="mt-4 text-3xl font-bold">Conversion Tracking & Measurement</h1>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute -top-[300px] -right-[200px] h-[700px] w-[700px] rounded-full bg-primary/[0.07] blur-[200px] pointer-events-none" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/[0.07] px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary">
              <Target className="h-4 w-4" /> Conversion Tracking & Measurement
            </div>
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Stop Guessing.<br />Start <span className="text-gradient">Measuring.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              We set up the tracking that tells you exactly which channels, campaigns, and clicks are actually driving your leads and sales — so you can spend smarter, not harder.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground font-extrabold hover:bg-primary/90">
                <Link to="/book-a-call">Book a Free Discovery Call →</Link>
              </Button>
              <Link to="/contact-us" className="text-base font-medium text-primary hover:text-primary/80 transition-colors">
                Or tell us about your project →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 bg-white/[0.015]">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">The Challenge</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">The Problem With Most Tracking Setups</h3>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Most businesses are spending on ads without knowing what's actually working. Their Google Analytics data doesn't match their ad platform numbers. Conversions are double-counted or missing entirely. And the team making budget decisions is working with data they can't trust.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problemCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-8 transition-all duration-300 hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-primary/10 border border-primary/10">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold">{card.title}</h4>
                <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">How We Solve It</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Measurement-First. Built to Scale.</h3>
          <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
            We don't start with tools. We start with your business. Before a single tag is placed, we agree on what success looks like — then we build a tracking setup that's accurate, auditable, and ready to grow with you.
          </p>
          <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute top-9 left-20 right-20 hidden h-0.5 bg-gradient-to-r from-primary/25 via-secondary/15 to-primary/5 lg:block" />
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative z-10 text-center"
              >
                <div className="mx-auto mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xl font-extrabold text-primary-foreground shadow-[0_0_40px_rgba(62,207,142,0.2)]">
                  {step.num}
                </div>
                <h4 className="text-lg font-bold">{step.title}</h4>
                <p className="mt-2 text-[15px] text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-24 bg-white/[0.015]">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">Service Tiers</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Choose the Right Level for Your Business</h3>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Every project starts with a measurement plan agreed upfront. All setups are upgrade-ready — no rebuilds needed as you grow.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier) => (
              <ServiceTierCard key={tier.name} {...tier} ctaLabel="Get Started" />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90">
              <Link to="/book-a-call">Not sure which tier? Book a free call →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why ATD */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">Why Us</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Why Work With AlphaTrack Digital</h3>
          <p className="mt-4 max-w-xl text-muted-foreground">We don't just install tags. We build measurement systems you can trust.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="glass-card flex gap-5 p-7 transition-all hover:border-primary/15 hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 min-w-[48px] items-center justify-center rounded-xl bg-primary/10 border border-primary/10">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold">{card.title}</h4>
                  <p className="mt-2 text-[15px] text-muted-foreground leading-relaxed">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={faqs} />

      {/* Final CTA */}
      <section className="relative py-28 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_65%)] pointer-events-none" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-extrabold md:text-5xl">
            Ready to Fix Your <span className="text-gradient">Tracking?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            Book a free 15-minute discovery call. We'll look at your current setup and tell you exactly what needs fixing — even if you don't work with us.
          </p>
          <Button asChild size="lg" className="mt-10 gap-2 rounded-xl bg-primary px-10 text-primary-foreground font-extrabold text-lg hover:bg-primary/90">
            <Link to="/book-a-call">Book a Discovery Call →</Link>
          </Button>
          <p className="mt-5 text-sm text-muted-foreground">
            Prefer to write? <Link to="/contact-us" className="text-primary font-semibold">Contact us here →</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default ConversionTracking;
