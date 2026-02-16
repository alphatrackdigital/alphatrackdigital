import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";

const primaryServices = [
  {
    emoji: "📊",
    badge: "Flagship",
    flagship: true,
    title: "Conversion Tracking & Measurement",
    description: "We set up the tracking that tells you exactly which channels, campaigns, and clicks are driving your leads and sales. GA4, Meta, Google Ads — accurate, auditable, and proven before go-live.",
    path: "/service/conversion-tracking",
    available: true,
  },
  {
    emoji: "📣",
    badge: "Core",
    flagship: false,
    title: "Paid Media Management",
    description: "Strategic paid social and search campaigns that drive qualified traffic. We combine Meta Ads, Google Ads, and LinkedIn to reach your audience where they are — and prove every pound spent.",
    path: "/service",
    available: false,
  },
  {
    emoji: "⚡",
    badge: "Core",
    flagship: false,
    title: "Marketing Automation & CRM",
    description: "Once a lead converts, what happens next? We build the automated workflows, email sequences, and CRM systems that nurture prospects into paying clients — without manual effort.",
    path: "/service/marketing-automation",
    available: true,
  },
];

const supportingServices = [
  { emoji: "✉️", title: "Email Marketing", description: "Targeted email campaigns that engage your audience and drive action." },
  { emoji: "💻", title: "Website Development", description: "Fast, conversion-focused websites built on WordPress and modern platforms." },
  { emoji: "📈", title: "SEO", description: "Organic search visibility that compounds over time." },
  { emoji: "✏️", title: "Content & Media Strategy", description: "Strategic content and media planning aligned to your growth goals." },
];

const Services = () => {
  return (
    <>
      <SEO title="Our Services | AlphaTrack Digital" description="End-to-end digital growth solutions. Conversion tracking, paid media management, marketing automation, SEO, email marketing, and website development." />
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
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Primary Services */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div
                  className={`group flex h-full flex-col rounded-xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                    service.flagship
                      ? "border-primary bg-gradient-to-br from-card to-[hsl(152_30%_8%)] border-2 hover:shadow-[0_8px_32px_rgba(62,207,142,0.12)]"
                      : "border-primary/60 bg-card hover:shadow-[0_8px_32px_rgba(62,207,142,0.08)]"
                  }`}
                >
                  <span
                    className={`mb-4 inline-block w-fit rounded px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      service.flagship
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {service.badge}
                  </span>
                  <span className="mb-4 text-4xl">{service.emoji}</span>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  {service.available ? (
                    <Link
                      to={service.path}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className="mt-5 text-xs font-medium text-muted-foreground">Coming Soon</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting */}
          <div className="mt-14 border-t border-border pt-8">
            <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">We Also Deliver</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {supportingServices.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="rounded-xl border border-border bg-[#0d0d0d] p-6 transition-colors hover:border-muted-foreground/30"
                >
                  <span className="mb-3 block text-2xl">{s.emoji}</span>
                  <h4 className="text-[15px] font-semibold">{s.title}</h4>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Services;
