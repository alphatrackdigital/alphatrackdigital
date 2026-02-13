import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart3, Zap, Target, Search, PenTool, Share2 } from "lucide-react";
import CTASection from "@/components/shared/CTASection";
import { motion } from "framer-motion";

const services = [
  {
    icon: BarChart3,
    title: "Conversion Tracking & Measurement",
    description: "Architect a bulletproof measurement stack. Know exactly what drives revenue — every click, call, and conversion tracked with precision.",
    path: "/service/conversion-tracking",
    available: true,
  },
  {
    icon: Zap,
    title: "Marketing Automation & CRM",
    description: "Build automated pipelines that nurture leads, trigger follow-ups, and close deals — so you can focus on growing, not chasing.",
    path: "/service/marketing-automation",
    available: true,
  },
  {
    icon: Target,
    title: "Paid Media Management",
    description: "Data-driven ad campaigns across Google, Meta, and LinkedIn — optimized for real business outcomes, not vanity metrics.",
    path: "/service",
    available: false,
  },
  {
    icon: Search,
    title: "SEO & Organic Growth",
    description: "Rank higher, attract the right audience, and build sustainable organic traffic with technical SEO and strategic content.",
    path: "/service",
    available: false,
  },
  {
    icon: PenTool,
    title: "Web Design & Development",
    description: "High-converting websites that look stunning and perform — built for speed, accessibility, and results.",
    path: "/service",
    available: false,
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Strategic social presence that builds brand authority, engages your audience, and drives measurable business impact.",
    path: "/service",
    available: false,
  },
];

const Services = () => {
  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/6 blur-[120px]" />
        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">Our Services</span>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
              End-to-End Digital Growth <span className="text-gradient">Solutions</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              From measurement to automation to media — we cover every stage of your digital growth journey.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <div className="glass-card group flex h-full flex-col p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.description}</p>
                  {service.available ? (
                    <Link
                      to={service.path}
                      className="mt-5 flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Learn More <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className="mt-5 text-xs font-medium text-muted-foreground">Coming Soon</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Services;
