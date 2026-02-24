import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, CheckCircle2 } from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";

const Services = () => {
  return (
    <>
      <SEO
        title="Our Services | AlphaTrack Digital"
        description="End-to-end digital growth solutions. Conversion tracking, paid media management, marketing automation, SEO, email marketing, and website development."
        canonicalUrl="/service"
      />
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/6 blur-[120px]" />
        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Our Services</span>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
              End-to-End Digital Growth <span className="text-gradient">Solutions</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We help businesses track what matters, acquire customers profitably, and nurture leads into revenue.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Measurement-first execution
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Transparent reporting
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Built for growth
              </span>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/book-a-call">
                  Book a Call <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Primary Services */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.4 }}>
                <Link to={service.path} className={`group flex h-full flex-col rounded-xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    service.flagship
                      ? "border-primary bg-gradient-to-br from-card to-[hsl(152_30%_8%)] border-2 hover:shadow-[0_8px_32px_rgba(62,207,142,0.12)]"
                      : "border-primary/60 bg-card hover:shadow-[0_8px_32px_rgba(62,207,142,0.08)]"
                  }`}>
                  <span className={`mb-4 inline-block w-fit rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      service.flagship ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}>{service.badge}</span>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                    <service.icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors">
                    Learn more <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Supporting */}
          <div className="mt-14 border-t border-border pt-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">We Also Deliver</p>
                <p className="mt-1 text-sm text-muted-foreground">Complementary services to round out your digital growth stack.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {supportingServices.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06, duration: 0.35 }}>
                  <Link to={s.path} className="group flex h-full flex-col rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-primary/30 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(62,207,142,0.08)]">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                      <s.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    </div>
                    <h4 className="text-[15px] font-semibold">{s.title}</h4>
                    <p className="mt-1.5 flex-1 text-[13px] text-muted-foreground leading-relaxed">{s.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-60 transition-opacity duration-200 group-hover:opacity-100">
                      Learn more <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Engage */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              How We Engage
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">Pick the Right Engagement Model</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Whether you need a one-time audit or a long-term growth partner, we have a model that fits.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Audit & Strategy",
                badge: "One-time",
                description: "A deep-dive into your current tracking, campaigns, or automation. Ideal if you want clarity before committing to ongoing work.",
                includes: [
                  "Full tracking or campaign audit",
                  "Written findings & recommendations",
                  "30-min walkthrough call",
                  "Priority action plan",
                ],
                cta: "Get an Audit",
                featured: false,
              },
              {
                name: "Growth Retainer",
                badge: "Most Popular",
                description: "Ongoing execution and optimisation across your chosen service. We act as an embedded extension of your team.",
                includes: [
                  "Dedicated account manager",
                  "Monthly strategy sessions",
                  "Continuous optimisation",
                  "Real-time Looker Studio dashboard",
                ],
                cta: "Book a Call",
                featured: true,
              },
              {
                name: "Project Delivery",
                badge: "Fixed scope",
                description: "A defined deliverable with a clear timeline — website build, automation setup, tracking implementation, or campaign launch.",
                includes: [
                  "Fixed-scope proposal",
                  "Milestone-based delivery",
                  "Full handover & documentation",
                  "30-day post-launch support",
                ],
                cta: "Discuss a Project",
                featured: false,
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={`flex flex-col rounded-xl border p-8 ${
                  tier.featured
                    ? "border-primary bg-gradient-to-b from-primary/[0.08] to-transparent shadow-[0_0_40px_rgba(62,207,142,0.08)]"
                    : "border-white/10 bg-card"
                }`}
              >
                <span
                  className={`mb-4 inline-block w-fit rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                    tier.featured ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  {tier.badge}
                </span>
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-a-call"
                  className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    tier.featured
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/20 text-foreground hover:bg-white/5"
                  }`}
                >
                  {tier.cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection primaryCta={{ label: "Book a Call", to: "/book-a-call" }} />
    </>
  );
};

export default Services;
