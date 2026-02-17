import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, TrendingUp, Handshake, ClipboardCheck, PhoneCall, Rocket, BarChart3, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";

const testimonials = [
  {
    quote: "Working with Alpha Track Digital Limited was an excellent experience. They delivered a sleek, modern, and highly functional website right on schedule. Edits were handled quickly, communication was seamless, and the service was truly top notch. Would definitely recommend!",
    name: "Courtney Quist-Therson",
    title: "CEO & Founder, Pearl House Ghana",
  },
];

const blogPosts = [
  {
    title: "How to Skyrocket Your ROI with Paid Social Campaigns",
    excerpt: "Learn the data-driven strategies that separate profitable paid social campaigns from money pits.",
    url: "https://alphatrack.digital/how-to-skyrocket-your-roi-with-paid-social-campaigns/",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/dlxmedia-hu-ZMlcuVf2URA-unsplash-scaled.jpg",
    readTime: "5 min read",
  },
  {
    title: "The Power of No-Code Web Design for Small Businesses",
    excerpt: "Why modern no-code platforms are levelling the playing field for small business websites.",
    url: "https://alphatrack.digital/the-power-of-no-code-web-design-for-small-businesses/",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/tekimax-AfwnOr1taq0-unsplash-scaled.jpg",
    readTime: "4 min read",
  },
  {
    title: "Why Programmatic Advertising is a Game-Changer",
    excerpt: "Programmatic advertising is reshaping how brands reach audiences at scale — here's what you need to know.",
    url: "https://alphatrack.digital/why-programmatic-advertising-is-a-game-changer/",
    image: "https://alphatrack.digital/wp-content/uploads/2025/09/programmatic-ads.jpg",
    readTime: "6 min read",
  },
];

const stats = [
  { value: "40%", label: "Avg. improvement in data accuracy" },
  { value: "25%", label: "Reduction in wasted ad spend" },
  { value: "3×", label: "Better attribution clarity" },
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
    answer: "We're measurement-first. Every strategy starts with tracking and data — so you always know what's working, what's not, and where to invest next. We don't guess; we prove.",
  },
  {
    question: "Can you help small businesses, or only larger companies?",
    answer: "We work with businesses of all sizes. Our service tiers are designed to scale — from Starter packages for early-stage companies to Enterprise solutions for complex tracking architectures.",
  },
  {
    question: "How quickly can I expect to see results?",
    answer: "Tracking and automation setups are typically live within 1–2 weeks. Campaign performance improvements usually show within the first 30 days, with compounding gains over time.",
  },
  {
    question: "What industries do you specialise in?",
    answer: "We work across B2B, B2C, FMCG, Fashion, Retail, Fintech, and Agritech. Our data-driven approach adapts to any industry — the fundamentals of measurement and optimisation are universal.",
  },
  {
    question: "How transparent are you about performance?",
    answer: "Radical transparency is a core value. You get real-time dashboards, regular reports, and direct access to your data. No vanity metrics, no hidden numbers — just the truth about what's driving your growth.",
  },
];

const Index = () => {
  return (
    <>
      <SEO
        title="AlphaTrack Digital | Data-Driven Performance Marketing Agency"
        description="Conversion tracking, paid media management, and marketing automation for businesses ready to scale. Based in Accra & Lagos."
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AlphaTrack Digital",
          "url": "https://alphatrack.digital",
          "logo": "https://alphatrack.digital/wp-content/uploads/2025/08/Group-320.png",
          "description": "Data-driven performance marketing agency based in Accra and Lagos.",
          "address": [
            { "@type": "PostalAddress", "addressLocality": "Accra", "addressCountry": "GH" },
            { "@type": "PostalAddress", "addressLocality": "Lagos", "addressCountry": "NG" }
          ],
          "contactPoint": { "@type": "ContactPoint", "telephone": "+233530985334", "email": "info@alphatrack.digital", "contactType": "sales" }
        }}
      />
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -right-[20%] h-[80%] w-[60%] rounded-full bg-primary/[0.07] blur-[150px]" />
          <div className="absolute -bottom-[30%] -left-[10%] h-[60%] w-[50%] rounded-full bg-secondary/[0.05] blur-[130px]" />
          <div className="absolute top-[20%] left-[30%] h-[40%] w-[30%] rounded-full bg-primary/[0.04] blur-[100px]" />
        </div>

        <div className="container relative mx-auto px-4 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Performance Marketing That Proves Its Value</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Track Every Conversion. Automate Every Lead.{" "}
              <span className="text-gradient">Scale What Works.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              We build the measurement, automation, and paid media systems that turn your marketing budget into provable revenue. Based in Accra & Lagos.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-1.5 rounded-lg bg-primary px-8 text-primary-foreground hover:bg-primary/90">
                <Link to="/book-a-call">
                  Book a Free Strategy Call <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-1.5 rounded-lg border-white/20 hover:bg-white/5">
                <Link to="/service">
                  Explore Services <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 py-12">
        <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-4 sm:flex-row sm:gap-16 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest text-primary">About Us</span>
            <h2 className="text-3xl font-bold md:text-4xl">Measurement-First. Results-Driven.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Too many businesses spend on marketing without knowing what works. We built AlphaTrack Digital to change that — starting with tracking, then automating what converts, and scaling what's proven.
            </p>
          </div>
        </div>
      </section>

      {/* Services — New Grid (3 Primary + 4 Supporting) */}
      <section className="py-24 border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">What We Do</span>
          <h2 className="text-3xl font-bold md:text-4xl">Our Services</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            We help businesses track what matters, acquire customers profitably, and nurture leads into revenue.
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
                      ? "border-primary bg-gradient-to-br from-card to-[hsl(152_30%_8%)] border-2 hover:shadow-[0_8px_32px_rgba(62,207,142,0.15)]"
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
                  <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  {service.comingSoon ? (
                    <span className="mt-4 text-xs font-medium text-muted-foreground">Coming Soon</span>
                  ) : (
                    <Link
                      to={service.path}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Learn more <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Supporting 4 */}
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
                  className="group rounded-xl border border-border bg-[#0d0d0d] p-6 transition-all duration-300 hover:border-muted-foreground/30 hover:shadow-[0_4px_20px_rgba(62,207,142,0.06)]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
                    <s.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                  </div>
                  <h4 className="text-[15px] font-semibold">{s.title}</h4>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{s.description}</p>
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
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">How We Work</span>
            <h2 className="text-3xl font-bold md:text-4xl">From Discovery to Results in 4 Steps</h2>
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
                className="relative"
              >
                <div className="glass-card p-7 h-full">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary/50">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ArrowRight className="h-4 w-4 text-primary/30" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Card */}
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

      {/* Testimonials */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Testimonials</p>
            <h2 className="mb-10 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card relative overflow-hidden border-l-2 border-primary p-8 md:p-10 text-left">
                <Quote className="absolute top-6 right-6 h-12 w-12 text-primary/10" />
                <p className="text-lg leading-relaxed text-muted-foreground relative z-10">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {t.name.split(" ").map(n => n[0]).join("")}
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

      {/* Blog Preview */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Insights</p>
            <h2 className="mb-10 text-3xl font-bold md:text-4xl">From Our Blog</h2>
          </motion.div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {blogPosts.map((post, i) => (
              <motion.a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group overflow-hidden rounded-xl border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_8px_32px_rgba(62,207,142,0.06)]"
              >
                <div className="h-48 w-full overflow-hidden bg-card">
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <p className="mb-2 text-xs text-muted-foreground">{post.readTime}</p>
                  <h3 className="text-base font-semibold text-foreground leading-snug">{post.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Read more <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion items={faqs} title="Frequently Asked Questions" />

      <CTASection
        title="Ready to Know Exactly What's Driving Your Growth?"
        description="Book a free 15-minute strategy call. We'll audit your current setup and show you exactly where the gaps are."
      />
    </>
  );
};

export default Index;
