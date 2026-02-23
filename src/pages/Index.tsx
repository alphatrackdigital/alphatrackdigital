import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  ClipboardCheck,
  PhoneCall,
  Rocket,
  BarChart3,
  Quote,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";
import { getFeaturedBlogPosts } from "@/data/blogPosts";
import { cn } from "@/lib/utils";

// --- Sub-components ---

const CountUp = ({ value, suffix, disabled = false }: { value: number; suffix: string; disabled?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (disabled) {
      setCount(value);
      return;
    }
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 1500;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [disabled, isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const BlogImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/5">
        <BarChart3 className="h-8 w-8 text-primary/30" />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-card" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0"
        )}
        loading="lazy"
      />
    </div>
  );
};

// --- Data ---

const testimonials = [
  {
    quote:
      "Working with Alpha Track Digital Limited was an excellent experience. They delivered a sleek, modern, and highly functional website right on schedule. Edits were handled quickly, communication was seamless, and the service was truly top notch. Would definitely recommend!",
    name: "Courtney Quist-Therson",
    title: "CEO & Founder, Pearl House Ghana",
    rating: 5,
  },
];

const stats = [
  { numericValue: 40, suffix: "%", label: "Avg. improvement in data accuracy" },
  { numericValue: 25, suffix: "%", label: "Reduction in wasted ad spend" },
  { numericValue: 3, suffix: "×", label: "Better attribution clarity" },
];

const tools = [
  "Google Analytics 4",
  "Meta Ads",
  "Google Ads",
  "LinkedIn Ads",
  "HubSpot",
  "Klaviyo",
  "Google Tag Manager",
  "Brevo",
  "Looker Studio",
  "Shopify",
  "WordPress",
  "Zapier",
];

const processSteps = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Discovery Call",
    description: "We learn about your business, current setup, and goals. 15 minutes, no pressure.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Audit & Strategy",
    description: "We audit your tracking, campaigns, or automation — then build a tailored plan.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Implementation",
    description: "We execute the plan: tracking setup, campaign launch, or automation build.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Measure & Optimise",
    description: "We monitor performance, report transparently, and continuously improve results.",
  },
];

const faqs = [
  {
    question: "What sets AlphaTrack Digital apart from other agencies?",
    answer:
      "We're measurement-first. Every strategy starts with tracking and data — so you always know what's working, what's not, and where to invest next. We don't guess; we prove.",
  },
  {
    question: "Can you help small businesses, or only larger companies?",
    answer:
      "We work with businesses of all sizes. Our service tiers are designed to scale — from Starter packages for early-stage companies to Enterprise solutions for complex tracking architectures.",
  },
  {
    question: "How quickly can I expect to see results?",
    answer:
      "Tracking and automation setups are typically live within 1–2 weeks. Campaign performance improvements usually show within the first 30 days, with compounding gains over time.",
  },
  {
    question: "What industries do you specialise in?",
    answer:
      "We work across B2B, B2C, FMCG, Fashion, Retail, Fintech, and Agritech. Our data-driven approach adapts to any industry — the fundamentals of measurement and optimisation are universal.",
  },
  {
    question: "How transparent are you about performance?",
    answer:
      "Radical transparency is a core value. You get real-time dashboards, regular reports, and direct access to your data. No vanity metrics, no hidden numbers — just the truth about what's driving your growth.",
  },
];

// --- Page ---

const Index = () => {
  const shouldReduceMotion = useReducedMotion();
  const featuredBlogPosts = getFeaturedBlogPosts(3);

  return (
    <>
      <SEO
        title="AlphaTrack Digital | Data-Driven Performance Marketing Agency"
        description="Conversion tracking, paid media management, and marketing automation for businesses ready to scale. Based in Accra & Lagos."
        canonicalUrl="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AlphaTrack Digital",
          url: "https://alphatrack.digital",
          logo: "https://alphatrack.digital/wp-content/uploads/2025/08/Group-320.png",
          description: "Data-driven performance marketing agency based in Accra and Lagos.",
          address: [
            { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
            { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
          ],
          contactPoint: {
            "@type": "ContactPoint",
            telephone: "+233530985334",
            email: "info@alphatrack.digital",
            contactType: "sales",
          },
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[40%] -right-[20%] h-[80%] w-[60%] rounded-full bg-primary/[0.07] blur-[150px]" />
          <div className="absolute -bottom-[30%] -left-[10%] h-[60%] w-[50%] rounded-full bg-secondary/[0.05] blur-[130px]" />
          <div className="absolute top-[20%] left-[30%] h-[40%] w-[30%] rounded-full bg-primary/[0.04] blur-[100px]" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, hsl(0 0% 3.1%) 100%)",
            }}
          />
        </div>

        <div className="container relative mx-auto px-4 py-20 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left: text content */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Performance Marketing That Proves Its Value
                </span>
              </div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                Track Every Conversion. Automate Every Lead.{" "}
                <span className="text-gradient">Scale What Works.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                We build the measurement, automation, and paid media systems that turn your marketing
                budget into provable revenue. Based in Accra & Lagos.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="gap-1.5 rounded-lg bg-primary px-8 text-primary-foreground hover:bg-primary/90"
                >
                  <Link to="/book-a-call">
                    Book a Call <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-1.5 rounded-lg border-white/20 hover:bg-white/5"
                >
                  <Link to="/service">
                    Explore Services <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  No-pressure discovery call
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  Transparent reporting
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  Response within 1 business day
                </span>
              </div>
            </motion.div>

            {/* Right: floating metric cards — desktop only */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: 0.2 }}
              className="relative hidden h-[440px] lg:block"
              aria-hidden="true"
            >
              {/* ROAS card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card absolute left-0 top-8 w-52 p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    ROAS
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">4.2×</p>
                <p className="mt-1 text-xs text-muted-foreground">Return on ad spend</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                  <TrendingUp className="h-3 w-3" /> +31% vs prev. period
                </div>
              </motion.div>

              {/* Lead volume card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="glass-card absolute right-0 top-0 w-56 p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Lead Volume
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">+68%</p>
                <p className="mt-1 text-xs text-muted-foreground">Month-over-month growth</p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/5">
                  <div className="h-1.5 w-[68%] rounded-full bg-gradient-to-r from-primary to-secondary" />
                </div>
              </motion.div>

              {/* Tracking accuracy card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="glass-card absolute bottom-14 left-8 w-52 p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Accuracy
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">99.4%</p>
                <p className="mt-1 text-xs text-muted-foreground">Conversion tracking accuracy</p>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i < 9 ? "bg-primary" : "bg-primary/20"}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Wasted spend card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="glass-card absolute bottom-0 right-4 w-48 p-5"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Wasted Spend
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">-25%</p>
                <p className="mt-1 text-xs text-muted-foreground">Reduction in wasted budget</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats — animated count-up on scroll */}
      <section className="border-y border-white/10 py-12">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-4 sm:flex-row sm:gap-16 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gradient">
                <CountUp value={stat.numericValue} suffix={stat.suffix} disabled={shouldReduceMotion} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms & Tools Marquee */}
      <section className="overflow-hidden border-b border-white/10 py-10">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
          Platforms & Tools We Work With
        </p>
        <div className="relative overflow-hidden">
          <div className={cn("flex gap-6 whitespace-nowrap", !shouldReduceMotion && "animate-marquee")}>
            {[...tools, ...tools].map((tool, i) => (
              <span
                key={i}
                className="inline-flex shrink-0 items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            What We Do
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">Our Services</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            We help businesses track what matters, acquire customers profitably, and nurture leads
            into revenue.
          </p>

          {/* Primary 3 */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                      ? "border-2 border-primary bg-gradient-to-br from-card to-[hsl(152_30%_8%)] hover:shadow-[0_8px_32px_rgba(62,207,142,0.15)]"
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
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                    <service.icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    to={service.path}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Learn more{" "}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting 4 */}
          <div className="mt-14 border-t border-border pt-10">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  We Also Deliver
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Complementary services to round out your digital growth stack.
                </p>
              </div>
              <Link
                to="/service"
                className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
              >
                View all services <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {supportingServices.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                >
                  <Link
                    to={s.path}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card/50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[0_4px_24px_rgba(62,207,142,0.08)]"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                      <s.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    </div>
                    <h4 className="text-[15px] font-semibold">{s.title}</h4>
                    <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    {/* visible at 60% opacity by default, full on hover */}
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

      {/* How We Work — Process */}
      <section className="border-t border-white/10 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              How We Work
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              From Discovery to Results in 4 Steps
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              A clear, repeatable process — so you always know what happens next.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="relative flex flex-col"
              >
                <div className="glass-card h-full p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/50">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                {i < processSteps.length - 1 && (
                  <>
                    {/* Desktop: horizontal arrow between grid columns */}
                    <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-3 lg:flex">
                      <ArrowRight className="h-4 w-4 text-primary/30" />
                    </div>
                    {/* Mobile / tablet: vertical connector between stacked cards */}
                    <div className="flex justify-center pt-4 lg:hidden">
                      <div className="h-6 w-px rounded-full bg-primary/20" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials — with star ratings */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Testimonials
            </p>
            <h2 className="mb-10 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="glass-card relative overflow-hidden border-l-2 border-primary p-8 text-left md:p-10"
              >
                <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/10" />
                {/* Star rating */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="relative z-10 text-lg leading-relaxed text-muted-foreground">
                  {t.quote}
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Preview — data from shared source, with image skeleton/fallback */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Insights
            </p>
            <h2 className="mb-10 text-3xl font-bold md:text-4xl">From Our Blog</h2>
          </motion.div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {featuredBlogPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(62,207,142,0.06)]"
                >
                  <div className="h-48 w-full overflow-hidden bg-card">
                    <BlogImage src={post.image} alt={post.title} />
                  </div>
                  <div className="p-6">
                    <p className="mb-2 text-xs text-muted-foreground">{post.readTime}</p>
                    <h3 className="text-base font-semibold leading-snug text-foreground">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      Read more{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={faqs} title="Frequently Asked Questions" />

      <CTASection
        title="Ready to Know Exactly What's Driving Your Growth?"
        description="Book a call. We'll audit your current setup and show you exactly where the gaps are."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
      />
    </>
  );
};

export default Index;

