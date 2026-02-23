import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FAQAccordion from "@/components/shared/FAQAccordion";
import ServiceTierCard from "@/components/shared/ServiceTierCard";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, UserX, RotateCcw, Settings, Link2, Building, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const problemCards: IconCard[] = [
  {
    icon: Clock,
    title: "Slow Follow-Up",
    description:
      "Responding within minutes dramatically improves conversion chances, but manual follow-up often takes hours or days.",
  },
  {
    icon: UserX,
    title: "Leads Fall Through",
    description:
      "Without a CRM and automated workflows, enquiries get lost in inboxes and no one has full pipeline visibility.",
  },
  {
    icon: RotateCcw,
    title: "Repetitive Manual Work",
    description:
      "Teams spend hours on repetitive follow-up, updates, and reminders that automation could handle instantly.",
  },
];

const processSteps = [
  { num: 1, title: "Map Your Process", description: "We map your lead journey and identify where leads currently drop off." },
  { num: 2, title: "Build the Workflows", description: "We configure CRM pipelines, lead scoring, and follow-up automations in Brevo." },
  { num: 3, title: "Test & Validate", description: "Every workflow is tested end-to-end with validation before go-live." },
  { num: 4, title: "Handover & Train", description: "Your team gets documentation and training for confident day-to-day use." },
];

const heroSnapshot = [
  { label: "Outcome", value: "Faster follow-up and fewer leads slipping through the cracks" },
  { label: "Timeline", value: "Most setups launch in 1-2 weeks depending on workflow count" },
  { label: "Best Fit", value: "Teams with manual lead handling who need consistent conversion flow" },
];

const tiers = [
  {
    tierLabel: "Tier 1",
    name: "Starter",
    description: "Businesses with manual lead follow-up",
    price: "GBP800",
    priceNote: "from",
    features: [
      "Brevo CRM setup and configuration",
      "Lead form integration (website to CRM)",
      "1 automated email sequence (welcome/nurture)",
      "Basic contact segmentation",
      "New lead notification workflows",
      "Documentation and handover",
    ],
  },
  {
    tierLabel: "Tier 2",
    name: "Growth",
    description: "Businesses scaling lead generation",
    price: "GBP1,800",
    priceNote: "from",
    features: [
      "Everything in Starter",
      "Multiple email sequences (nurture, re-engage)",
      "Lead scoring rules",
      "Multi-channel automation (email + SMS)",
      "A/B testing on sequences",
      "Monthly performance review",
    ],
    highlighted: true,
    highlightLabel: "POPULAR",
  },
  {
    tierLabel: "Tier 3",
    name: "Advanced",
    description: "Complex sales processes and integrations",
    price: "GBP3,500",
    priceNote: "from",
    features: [
      "Everything in Growth",
      "Custom conditional workflows",
      "CRM reporting dashboards",
      "API integrations with other tools",
      "Advanced segmentation and personalization",
      "Ongoing optimization support",
    ],
  },
];

const whyCards: IconCard[] = [
  {
    icon: Settings,
    title: "Built on Brevo",
    description:
      "Brevo gives CRM, email, automation, and meetings in one platform at a fraction of many enterprise alternatives.",
  },
  {
    icon: Link2,
    title: "Paired With Tracking",
    description:
      "We are the same team that builds your conversion tracking, so you get full visibility from click to close.",
  },
  {
    icon: Building,
    title: "We Use It Ourselves",
    description:
      "Our own lead capture, CRM, and automation stack runs on the same platform we implement for clients.",
  },
  {
    icon: TrendingUp,
    title: "Designed to Scale",
    description:
      "Start simple, then grow into scoring, multi-channel automation, and advanced workflows without rebuilding.",
  },
];

const faqs = [
  {
    question: "What CRM and automation platform do you use?",
    answer:
      "We build on Brevo (formerly Sendinblue). It includes CRM, email marketing, automation workflows, meetings scheduling, and SMS in one platform.",
  },
  {
    question: "How long does the setup take?",
    answer:
      "Starter setups usually take 1-2 weeks. Growth and Advanced tiers take 2-4 weeks based on integration complexity.",
  },
  {
    question: "Can it integrate with my existing tools?",
    answer:
      "Yes. Brevo integrates with WordPress, Shopify, Zapier, Google Sheets, Slack, and many other tools through native integrations and APIs.",
  },
  {
    question: "Do I need conversion tracking as well?",
    answer:
      "Not required, but they work best together. Tracking tells you what drives leads, and automation manages what happens after leads arrive.",
  },
  {
    question: "What happens after setup is complete?",
    answer:
      "We hand over full documentation and train your team. You own the account and workflows, with optional ongoing support available.",
  },
  {
    question: "Will I need a Brevo subscription?",
    answer:
      "Brevo has a free plan for small setups. Paid plans are generally much lower cost than many enterprise alternatives.",
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

      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", path: "/" },
              { label: "Services", path: "/service" },
              { label: "Marketing Automation" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold">Marketing Automation & CRM</h1>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="pointer-events-none absolute -right-[200px] -top-[200px] h-[600px] w-[600px] rounded-full bg-secondary/[0.06] blur-[200px]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <div className="mb-5 inline-block rounded border border-primary/15 bg-primary/[0.08] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Marketing Automation & CRM
            </div>
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Capture the Lead.
              <br />
              Nurture the <span className="text-gradient">Sale.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              We build the automated workflows, email sequences, and CRM systems that turn captured leads into paying clients without manual bottlenecks.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground font-bold hover:bg-primary/90">
                <Link to="/book-a-call">Book a Call</Link>
              </Button>
              <Link to="/contact-us" className="text-base font-medium text-primary transition-colors hover:text-primary/80">
                Or tell us about your project
              </Link>
            </div>
            <div className="mt-8 grid gap-3 rounded-xl border border-white/10 bg-card/40 p-5 md:grid-cols-3">
              {heroSnapshot.map((item) => (
                <div key={item.label}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white/[0.015] py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">The Challenge</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Leads Come In. Then What?</h3>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Most businesses invest heavily in lead generation but have no reliable system for what happens after an enquiry arrives.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {problemCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/20"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold">{card.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90">
              <Link to="/book-a-call">Book a Call</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">How We Solve It</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Automated From First Touch to Close</h3>
          <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">
            We design automation around your sales process, not a generic template.
          </p>
          <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute left-16 right-16 top-7 hidden h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 lg:block" />
            {processSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative z-10 text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xl font-extrabold text-primary-foreground shadow-[0_0_30px_rgba(62,207,142,0.2)]">
                  {step.num}
                </div>
                <h4 className="text-base font-bold">{step.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/[0.015] py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">Service Tiers</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Choose the Right Level for Your Business</h3>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Start with what you need now. Every setup is built to grow without rebuilds.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <ServiceTierCard key={tier.name} {...tier} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90">
              <Link to="/book-a-call">Not sure which tier? Book a Call</Link>
            </Button>
          </div>

          <div className="mt-16 rounded-2xl border border-primary/10 bg-gradient-to-br from-primary/5 to-secondary/5 p-10 text-center">
            <h3 className="text-xl font-bold">
              Works Best With <span className="text-gradient">Accurate Tracking</span>
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Automation works best when you know which channels drive your best leads.
            </p>
            <Button asChild className="mt-6 gap-2 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90">
              <Link to="/service/conversion-tracking">See Conversion Tracking</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">Why Us</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Why Work With AlphaTrack Digital</h3>
          <p className="mt-4 max-w-xl text-muted-foreground">We do not just configure tools. We design systems that work for your business.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="glass-card flex gap-5 p-7 transition-all hover:-translate-y-1 hover:border-primary/15"
              >
                <div className="flex h-11 w-11 min-w-[44px] items-center justify-center rounded-xl bg-primary/10">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-bold">{card.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FAQAccordion items={faqs} />

      <section className="relative py-28 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_70%)]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Ready to Automate Your <span className="text-gradient">Growth?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            Book a call. We will map your lead flow and show exactly where automation will increase conversion.
          </p>
          <Button asChild size="lg" className="mt-10 gap-2 rounded-xl bg-primary px-10 text-lg font-bold text-primary-foreground hover:bg-primary/90">
            <Link to="/book-a-call">Book a Call</Link>
          </Button>
          <p className="mt-5 text-sm text-muted-foreground">
            Prefer to write?{" "}
            <Link to="/contact-us" className="font-semibold text-primary">
              Contact us here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default MarketingAutomation;
