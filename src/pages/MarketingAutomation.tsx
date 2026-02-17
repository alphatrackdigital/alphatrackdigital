import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import FAQAccordion from "@/components/shared/FAQAccordion";
import ServiceTierCard from "@/components/shared/ServiceTierCard";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Clock, UserX, RotateCcw, Settings, Link2, Building, TrendingUp, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface IconCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const problemCards: IconCard[] = [
  { icon: Clock, title: "Slow Follow-Up", description: "Research shows that responding within 5 minutes makes a lead 21x more likely to convert. Manual follow-up can take hours or days." },
  { icon: UserX, title: "Leads Fall Through", description: "Without a CRM and automated workflows, enquiries get lost in inboxes. No one knows who was contacted, when, or what was said." },
  { icon: RotateCcw, title: "Repetitive Manual Work", description: "Your team spends hours on follow-up emails, spreadsheet updates, and reminders that a system could handle automatically." },
];

const processSteps = [
  { num: 1, title: "Map Your Process", description: "We understand how leads come in, how they're qualified, and where they drop off today." },
  { num: 2, title: "Build the Workflows", description: "Automated email sequences, CRM pipelines, lead scoring, and notification rules — all configured in Brevo." },
  { num: 3, title: "Test & Validate", description: "Every automation is tested end-to-end. We trigger test leads, verify emails fire, and confirm CRM entries are correct." },
  { num: 4, title: "Handover & Train", description: "We walk your team through the system and hand over documentation so you can manage it independently." },
];

const tiers = [
  {
    tierLabel: "Tier 1",
    name: "Starter",
    description: "Businesses with manual lead follow-up",
    price: "£800",
    priceNote: "from",
    features: [
      "Brevo CRM setup & configuration",
      "Lead form integration (website → CRM)",
      "1 automated email sequence (welcome/nurture)",
      "Basic contact segmentation",
      "New lead notification workflows",
      "Documentation & handover",
    ],
  },
  {
    tierLabel: "Tier 2",
    name: "Growth",
    description: "Businesses scaling lead generation",
    price: "£1,800",
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
    description: "Complex sales processes & integrations",
    price: "£3,500",
    priceNote: "from",
    features: [
      "Everything in Growth",
      "Custom conditional workflows",
      "CRM reporting dashboards",
      "API integrations with other tools",
      "Advanced segmentation & personalisation",
      "Ongoing optimisation support",
    ],
  },
];

const whyCards: IconCard[] = [
  { icon: Settings, title: "Built on Brevo", description: "No expensive enterprise tools. Brevo gives you CRM, email, automation, and meetings in one platform — at a fraction of the cost of HubSpot or Marketo." },
  { icon: Link2, title: "Paired With Tracking", description: "We're the same team that builds your conversion tracking. That means complete visibility from ad click to closed deal — no gaps." },
  { icon: Building, title: "We Use It Ourselves", description: "Our own lead capture, CRM, and automation runs on the same Brevo stack we build for clients. We're our own proof of concept." },
  { icon: TrendingUp, title: "Designed to Scale", description: "Start with a simple welcome sequence. Grow into lead scoring, multi-channel automation, and advanced workflows — all without rebuilding." },
];

const faqs = [
  { question: "What CRM and automation platform do you use?", answer: "We build on Brevo (formerly Sendinblue). It includes CRM, email marketing, automation workflows, meetings scheduling, and SMS — all in one platform. It's cost-effective and powerful enough for most growing businesses." },
  { question: "How long does the setup take?", answer: "Starter setups take about 1–2 weeks. Growth and Advanced tiers take 2–4 weeks depending on the number of workflows and integrations involved." },
  { question: "Can it integrate with my existing tools?", answer: "Yes. Brevo integrates with WordPress, Shopify, Zapier, Google Sheets, Slack, and hundreds of other tools via native integrations and APIs. We'll assess your stack during the discovery call." },
  { question: "Do I need conversion tracking as well?", answer: "Not necessarily, but they work best together. Tracking tells you which channels bring leads. Automation handles what happens after they arrive. Together, you get complete visibility from click to close." },
  { question: "What happens after the setup is complete?", answer: "We hand over full documentation and train your team. You own the Brevo account and all the workflows. If you want ongoing optimisation, we offer monthly support retainers." },
  { question: "Will I need a Brevo subscription?", answer: "Brevo has a free plan that works for small setups. As you scale, paid plans start from about $25/month — significantly cheaper than HubSpot or similar platforms." },
];

const MarketingAutomation = () => {
  return (
    <>
      <SEO
        title="Marketing Automation & CRM Services | AlphaTrack Digital"
        description="We build automated workflows, email sequences, and CRM systems on Brevo that turn captured leads into paying clients without the manual work."
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Marketing Automation & CRM",
          "provider": { "@type": "Organization", "name": "AlphaTrack Digital", "url": "https://alphatrack.digital" },
          "description": "We build automated workflows, email sequences, and CRM systems that turn captured leads into paying clients.",
          "areaServed": ["Ghana", "Nigeria", "United Kingdom"],
          "url": "https://alphatrack.digital/service/marketing-automation"
        }}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alphatrack.digital/" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://alphatrack.digital/service" },
            { "@type": "ListItem", "position": 3, "name": "Marketing Automation", "item": "https://alphatrack.digital/service/marketing-automation" }
          ]
        })}</script>
      </Helmet>
      {/* Page Banner */}
      <section className="relative overflow-hidden py-24 md:py-32" style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", path: "/" },
            { label: "Services", path: "/service" },
            { label: "Marketing Automation" },
          ]} />
          <h1 className="mt-4 text-3xl font-bold">Marketing Automation & CRM</h1>
        </div>
      </section>

      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute -top-[200px] -right-[200px] h-[600px] w-[600px] rounded-full bg-secondary/[0.06] blur-[200px] pointer-events-none" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl">
            <div className="mb-5 inline-block rounded border border-primary/15 bg-primary/[0.08] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              Marketing Automation & CRM
            </div>
            <h2 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
              Capture the Lead.<br />Nurture the <span className="text-gradient">Sale.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              We build the automated workflows, email sequences, and CRM systems that turn your captured leads into paying clients — without the manual work that lets them slip through the cracks.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground font-bold hover:bg-primary/90">
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
          <h3 className="text-3xl font-extrabold md:text-4xl">Leads Come In. Then What?</h3>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Most businesses invest heavily in getting leads — ads, content, SEO — but have no system for what happens after someone fills out a form or sends an enquiry. Follow-up is manual, inconsistent, and slow. Leads go cold before anyone picks up the phone.
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
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <card.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold">{card.title}</h4>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">How We Solve It</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Automated From First Touch to Close</h3>
          <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">
            We design automation around your actual sales process — not a template. Every workflow is built to move leads forward without your team needing to chase.
          </p>
          <div className="relative mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="absolute top-7 left-16 right-16 hidden h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 lg:block" />
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

      {/* Tiers */}
      <section className="py-24 bg-white/[0.015]">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">Service Tiers</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Choose the Right Level for Your Business</h3>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Start with what you need now. Every automation setup is built to grow — no rebuilds when you're ready to scale.
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <ServiceTierCard key={tier.name} {...tier} ctaLabel="Get Started" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="gap-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90">
              <Link to="/book-a-call">Not sure which tier? Book a free call →</Link>
            </Button>
          </div>

          {/* Cross-sell */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 p-10 text-center">
            <h3 className="text-xl font-bold">Works Best With <span className="text-gradient">Accurate Tracking</span></h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] text-muted-foreground leading-relaxed">
              Marketing automation is most powerful when you know exactly which channels are driving your leads. Pair it with our Conversion Tracking service for end-to-end visibility.
            </p>
            <Button asChild className="mt-6 gap-2 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90">
              <Link to="/service/conversion-tracking">See Conversion Tracking →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why ATD */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">Why Us</span>
          <h3 className="text-3xl font-extrabold md:text-4xl">Why Work With AlphaTrack Digital</h3>
          <p className="mt-4 max-w-xl text-muted-foreground">We don't just configure tools. We design systems that work for your business.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {whyCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="glass-card flex gap-5 p-7 transition-all hover:border-primary/15 hover:-translate-y-1"
              >
                <div className="flex h-11 w-11 min-w-[44px] items-center justify-center rounded-xl bg-primary/10">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-bold">{card.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.description}</p>
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-extrabold md:text-4xl">
            Ready to Automate Your <span className="text-gradient">Growth?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
            Book a free 15-minute discovery call. We'll look at how your leads flow today and show you exactly where automation can help.
          </p>
          <Button asChild size="lg" className="mt-10 gap-2 rounded-xl bg-primary px-10 text-primary-foreground font-bold text-lg hover:bg-primary/90">
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

export default MarketingAutomation;
