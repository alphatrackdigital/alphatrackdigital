import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import ServiceTierCard from "@/components/shared/ServiceTierCard";
import { motion } from "framer-motion";
import { Workflow, Mail, Users, BarChart3 } from "lucide-react";

const steps = [
  { icon: Users, title: "Capture", description: "Capture leads from every channel into one unified CRM." },
  { icon: Workflow, title: "Segment", description: "Automatically segment contacts based on behavior and intent." },
  { icon: Mail, title: "Nurture", description: "Trigger personalized email & SMS sequences at the right moment." },
  { icon: BarChart3, title: "Convert", description: "Score leads, alert your sales team, and close deals faster." },
];

const tiers = [
  {
    name: "Starter",
    description: "For businesses beginning their automation journey.",
    features: [
      "CRM setup & data migration",
      "Up to 3 automated workflows",
      "Basic lead capture forms",
      "Email template design (up to 5)",
      "30-day support",
    ],
  },
  {
    name: "Professional",
    description: "For growing teams ready to scale their pipeline.",
    features: [
      "Everything in Starter",
      "Up to 10 automated workflows",
      "Lead scoring implementation",
      "SMS automation",
      "Pipeline & deal tracking",
      "Monthly optimization",
    ],
    highlighted: true,
  },
  {
    name: "Scale",
    description: "For businesses with complex sales processes.",
    features: [
      "Everything in Professional",
      "Unlimited workflows",
      "Custom API integrations",
      "Advanced reporting & dashboards",
      "Multi-channel automation",
      "Dedicated automation strategist",
    ],
  },
];

const faqs = [
  {
    question: "Which CRM platforms do you work with?",
    answer: "We specialize in HubSpot, Brevo (formerly Sendinblue), ActiveCampaign, and Zoho CRM. We can also integrate with most platforms via APIs.",
  },
  {
    question: "Can you migrate our existing contacts and data?",
    answer: "Yes. Data migration is included in all plans. We'll clean, deduplicate, and organize your data during the transition.",
  },
  {
    question: "How quickly will we see results?",
    answer: "Most clients see improved lead response times within the first week. Meaningful pipeline impact typically shows within 30-60 days.",
  },
  {
    question: "Do you provide training for our team?",
    answer: "Absolutely. Every engagement includes team training sessions and documentation so your team can confidently manage the system day-to-day.",
  },
];

const MarketingAutomation = () => {
  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-secondary/6 blur-[120px]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", path: "/" },
            { label: "Services", path: "/service" },
            { label: "Marketing Automation & CRM" },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
              Marketing Automation & <span className="text-gradient">CRM</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Stop losing leads to manual follow-ups. We build automated systems that nurture, score, and convert — so your team can focus on closing deals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4-Step Framework */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold">Our 4-Step Framework</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-7 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Step {i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-4 text-center text-3xl font-bold">Choose Your Plan</h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-muted-foreground">
            Every plan includes setup, training, and ongoing support to ensure your automation engine runs smoothly.
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

export default MarketingAutomation;
