import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart3, Zap, Users, Target, TrendingUp, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import { motion } from "framer-motion";

const services = [
  {
    icon: BarChart3,
    title: "Conversion Tracking & Measurement",
    description: "Get crystal-clear visibility into what's driving revenue. We architect your measurement stack so every click, call, and conversion is tracked accurately.",
    path: "/service/conversion-tracking",
  },
  {
    icon: Zap,
    title: "Marketing Automation & CRM",
    description: "Stop losing leads to manual follow-ups. We build automated journeys that nurture prospects and close deals while you sleep.",
    path: "/service/marketing-automation",
  },
  {
    icon: Target,
    title: "Paid Media Management",
    description: "Data-driven ad campaigns that maximize every dollar. From Google to Meta, we optimize for real business outcomes — not vanity metrics.",
    path: "/service",
  },
];

const stats = [
  { value: "3x", label: "Average ROAS improvement" },
  { value: "95%", label: "Data accuracy achieved" },
  { value: "50+", label: "Businesses transformed" },
];

const Index = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-secondary/5 blur-[100px]" />

        <div className="container relative mx-auto px-4 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Seamless Digital Growth At Your Fingertips</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Everything You Need To Start, Scale, And Watch Your Business{" "}
              <span className="text-gradient">Take Off</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We help businesses measure what matters, automate what slows them down, and scale what works — with data at the center of every decision.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-1.5 rounded-lg bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                <Link to="/book-a-call">
                  Speak To An Expert <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-1.5 rounded-lg border-white/20 hover:bg-white/5">
                <Link to="/service">
                  Choose A Service <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 py-12">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-4 sm:flex-row lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-14 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Our Services</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              End-to-end digital growth solutions tailored for businesses that want to scale with confidence.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={service.path}
                  className="glass-card group flex flex-col p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.description}</p>
                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-primary">
                    Learn More <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="glass-card mx-auto max-w-4xl p-10 text-center md:p-14">
            <Handshake className="mx-auto mb-5 h-10 w-10 text-primary" />
            <h2 className="text-2xl font-bold md:text-3xl">Your Growth Partner, Not Just Another Agency</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We don't just run campaigns — we embed ourselves in your business, aligning every strategy with measurable outcomes. From Accra to Lagos and beyond, we partner with ambitious businesses ready to scale.
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Index;
