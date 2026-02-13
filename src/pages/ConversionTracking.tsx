import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import ServiceTierCard from "@/components/shared/ServiceTierCard";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Foundation",
    description: "For businesses just getting started with tracking.",
    features: [
      "Google Analytics 4 setup & configuration",
      "Google Tag Manager implementation",
      "Up to 5 conversion events tracked",
      "Basic reporting dashboard",
      "30-day post-launch support",
    ],
  },
  {
    name: "Growth",
    description: "For scaling businesses that need full-funnel visibility.",
    features: [
      "Everything in Foundation",
      "Server-side tracking setup",
      "Enhanced e-commerce tracking",
      "Custom attribution modeling",
      "Cross-domain tracking",
      "Monthly optimization reviews",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with complex measurement needs.",
    features: [
      "Everything in Growth",
      "Data warehouse integration",
      "Custom API event tracking",
      "Advanced audience segmentation",
      "Dedicated tracking architect",
      "Quarterly strategy sessions",
    ],
  },
];

const faqs = [
  {
    question: "What platforms do you integrate with for conversion tracking?",
    answer: "We work with Google Analytics 4, Google Tag Manager, Meta Pixel, LinkedIn Insight Tag, TikTok Pixel, and more. We also build custom server-side tracking solutions for advanced needs.",
  },
  {
    question: "How long does a typical tracking setup take?",
    answer: "Foundation setups typically take 1-2 weeks. Growth and Enterprise engagements may take 3-6 weeks depending on complexity and the number of platforms involved.",
  },
  {
    question: "Will this work with my existing marketing tools?",
    answer: "Absolutely. Our tracking architectures are designed to integrate seamlessly with your existing CRM, ad platforms, and analytics tools.",
  },
  {
    question: "What's the difference between client-side and server-side tracking?",
    answer: "Client-side tracking runs in the browser and can be blocked by ad blockers. Server-side tracking runs on your server, providing more reliable data capture and better data privacy compliance.",
  },
];

const ConversionTracking = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/6 blur-[120px]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", path: "/" },
            { label: "Services", path: "/service" },
            { label: "Conversion Tracking & Measurement" },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              Conversion Tracking & <span className="text-gradient">Measurement</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Stop guessing, start measuring. We architect bulletproof tracking systems that give you crystal-clear visibility into what's driving real revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2 lg:px-8">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold text-destructive/80">The Problem</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>• You're spending on ads but can't tell which campaigns drive revenue</li>
              <li>• Data is scattered across platforms with no unified view</li>
              <li>• Ad blockers are causing 20-40% data loss</li>
              <li>• Attribution is broken or non-existent</li>
              <li>• You're making decisions based on gut feeling, not data</li>
            </ul>
          </div>
          <div className="glass-card border-primary/20 p-8">
            <h2 className="text-xl font-bold text-primary">The Solution</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>• Full-funnel tracking architecture from first click to closed deal</li>
              <li>• Server-side tracking that bypasses ad blockers</li>
              <li>• Unified dashboard connecting all your data sources</li>
              <li>• Custom attribution models that match your business reality</li>
              <li>• Real-time visibility into what's working and what's not</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold">Choose Your Plan</h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
            Every plan includes expert implementation, thorough QA testing, and post-launch support.
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <ServiceTierCard key={tier.name} {...tier} />
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion items={faqs} />
      <CTASection />
    </>
  );
};

export default ConversionTracking;
