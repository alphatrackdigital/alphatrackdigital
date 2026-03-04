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
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { buildCanonicalUrl } from "@/config/seo";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";
import { getFeaturedBlogPosts, blogPosts } from "@/data/blogPosts";
import { cn } from "@/lib/utils";
import makeIcon from "@/assets/tools/make.svg";
import googleAnalyticsIcon from "@/assets/tools/google-analytics.svg";
import metaAdsIcon from "@/assets/tools/meta-ads.svg";
import googleAdsIcon from "@/assets/tools/google-ads.svg";
import microsoftAdsIcon from "@/assets/tools/microsoft-ads.png";
import linkedinAdsIcon from "@/assets/tools/linkedin-ads.svg";
import tiktokAdsIcon from "@/assets/tools/tiktok-favicon.png";
import snapchatAdsIcon from "@/assets/tools/snapchat-ads.svg";
import eskimiIcon from "@/assets/tools/eskimi.png";
import hubspotIcon from "@/assets/tools/hubspot.svg";
import klaviyoIcon from "@/assets/tools/klaviyo.png";
import googleTagManagerIcon from "@/assets/tools/google-tag-manager.svg";
import brevoIcon from "@/assets/tools/brevo.svg";
import lookerStudioIcon from "@/assets/tools/looker-studio.svg";
import shopifyIcon from "@/assets/tools/shopify.svg";
import wordpressIcon from "@/assets/tools/wordpress-favicon-com.png";
import zapierIcon from "@/assets/tools/zapier.svg";

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
    highlights: ["Delivered on schedule", "Fast revisions", "Seamless communication"],
  },
];

const stats = [
  { numericValue: 40, suffix: "%", label: "Avg. improvement in data accuracy" },
  { numericValue: 25, suffix: "%", label: "Reduction in wasted ad spend" },
  { numericValue: 3, suffix: "×", label: "Better attribution clarity" },
  { numericValue: 30, suffix: "+", label: "Businesses served across 3 countries" },
];

const tools = [
  { name: "Make",               icon: makeIcon,              color: "#6D28D9" },
  { name: "Google Analytics 4", icon: googleAnalyticsIcon,   color: "#F37C20" },
  { name: "Meta Ads",           icon: metaAdsIcon,           color: "#0082FB" },
  { name: "Google Ads",         icon: googleAdsIcon,         color: "#4285F4" },
  { name: "Microsoft Ads",      icon: microsoftAdsIcon,      color: "#00A4EF", mode: "image" as const },
  { name: "LinkedIn Ads",       icon: linkedinAdsIcon,       color: "#0A66C2" },
  { name: "TikTok Ads",         icon: tiktokAdsIcon,         color: "#FFFFFF" },
  { name: "Snapchat Ads",       icon: snapchatAdsIcon,       color: "#FFFC00" },
  { name: "Eskimi",             icon: eskimiIcon,            color: "#0B5FFF", mode: "image" as const },
  { name: "HubSpot",            icon: hubspotIcon,           color: "#FF7A59" },
  { name: "Klaviyo",            icon: klaviyoIcon,           color: "#111111", mode: "image" as const },
  { name: "Google Tag Manager", icon: googleTagManagerIcon,  color: "#4285F4" },
  { name: "Brevo",              icon: brevoIcon,             color: "#0B996E" },
  { name: "Looker Studio",      icon: lookerStudioIcon,      color: "#4285F4" },
  { name: "Shopify",            icon: shopifyIcon,           color: "#96BF48" },
  { name: "WordPress",          icon: wordpressIcon,         color: "#21759B" },
  { name: "Zapier",             icon: zapierIcon,            color: "#FF4A00" },
];

const findTool = (name: string) => tools.find((tool) => tool.name === name)!;

const toolCollections = [
  {
    title: "Measurement Stack",
    description: "The setup we use to validate attribution, event quality, and reporting confidence.",
    items: [
      findTool("Google Analytics 4"),
      findTool("Google Tag Manager"),
      findTool("Looker Studio"),
      findTool("Meta Ads"),
      findTool("Google Ads"),
    ],
  },
  {
    title: "Paid Growth Channels",
    description: "A curated mix of channels selected by intent, audience quality, and scaling potential.",
    items: [
      findTool("Meta Ads"),
      findTool("Google Ads"),
      findTool("Microsoft Ads"),
      findTool("LinkedIn Ads"),
      findTool("TikTok Ads"),
      findTool("Snapchat Ads"),
    ],
  },
  {
    title: "Automation & Commerce",
    description: "Tools we connect to turn leads into visible pipeline and repeatable follow-up.",
    items: [
      findTool("Brevo"),
      findTool("HubSpot"),
      findTool("Klaviyo"),
      findTool("Make"),
      findTool("Shopify"),
      findTool("WordPress"),
      findTool("Zapier"),
    ],
  },
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
      "Transparency is a core value. You get real-time dashboards, regular reports, and direct access to your data. No vanity metrics, no hidden numbers — just the truth about what's driving your growth.",
  },
];

// --- Page ---

const Index = () => {
  const shouldReduceMotion = useReducedMotion();
  const featuredBlogPosts = getFeaturedBlogPosts(3);
  const latestPost = featuredBlogPosts[0];

  return (
    <>
      <SEO
        title="AlphaTrack Digital | Data-Driven Performance Marketing Agency"
        description="Conversion tracking, paid media management, and marketing automation for businesses ready to scale."
        canonicalUrl="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AlphaTrack Digital",
          url: "https://alphatrack.digital",
          logo: buildCanonicalUrl("/apple-touch-icon.png?v=20260303a"),
          description: "Data-driven performance marketing agency focused on measurement, paid media, and automation.",
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
      <section className="relative flex min-h-[88vh] items-center overflow-hidden">
        {/* Background layer */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Mesh gradient — multiple focal points for depth */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "radial-gradient(ellipse 70% 60% at 15% 40%, rgba(62,207,142,0.18) 0%, transparent 65%)",
                "radial-gradient(ellipse 55% 50% at 80% 10%, rgba(0,177,255,0.10) 0%, transparent 60%)",
                "radial-gradient(ellipse 40% 40% at 60% 80%, rgba(62,207,142,0.07) 0%, transparent 55%)",
                "radial-gradient(ellipse 30% 30% at 90% 70%, rgba(0,177,255,0.05) 0%, transparent 50%)",
              ].join(", "),
            }}
          />
          {/* Animated primary orb */}
          <div className="animate-pulse-slow absolute left-[8%] top-[15%] h-[65%] w-[50%] rounded-full bg-primary/[0.10] blur-[130px]" />
          {/* Animated cyan orb */}
          <div className="animate-pulse-slow-delay absolute -right-[5%] top-[5%] h-[45%] w-[38%] rounded-full bg-secondary/[0.07] blur-[100px]" />
          {/* Slow lower anchor orb */}
          <div className="animate-pulse-slow-delay-2 absolute -bottom-[15%] left-[20%] h-[40%] w-[35%] rounded-full bg-primary/[0.05] blur-[120px]" />
          {/* Decorative rings — add geometric depth */}
          <div
            className="absolute right-[-8%] top-[5%] h-[90%] w-[55%] rounded-full"
            style={{ border: "1px solid rgba(62,207,142,0.06)" }}
          />
          <div
            className="absolute right-[2%] top-[15%] h-[65%] w-[40%] rounded-full"
            style={{ border: "1px solid rgba(0,177,255,0.04)" }}
          />
          {/* Dot-matrix texture */}
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          {/* Top edge vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 35% at 50% 0%, hsl(0 0% 3.1%) 0%, transparent 100%)",
            }}
          />
          {/* Bottom fade into stats */}
          <div
            className="absolute bottom-0 inset-x-0 h-40"
            style={{ background: "linear-gradient(to top, hsl(0 0% 3.1%) 0%, transparent 100%)" }}
          />
          {/* Bottom gradient border accent — green → cyan */}
          <div
            className="absolute bottom-0 inset-x-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(62,207,142,0.5) 30%, rgba(0,177,255,0.35) 70%, transparent 100%)",
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
              <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/85">
                Measurement. Automation. Paid Media.
              </p>

              <h1 className="max-w-[13ch] text-4xl font-bold leading-[0.96] tracking-[-0.04em] md:text-6xl lg:text-[5.5rem]">
                <span className="block">Track Every</span>
                <span className="block">Conversion.</span>
                <span className="mt-3 block text-foreground/92 md:mt-4">Automate Every</span>
                <span className="block">Lead.</span>
                <span className="mt-3 block text-gradient md:mt-4">Scale What Works.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">
                We build the measurement, automation, and paid media systems that turn your marketing
                budget into provable revenue.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="gap-1.5 rounded-lg bg-primary px-8 text-primary-foreground shadow-[0_0_24px_rgba(62,207,142,0.3)] transition-shadow hover:bg-primary/90 hover:shadow-[0_0_36px_rgba(62,207,142,0.45)]"
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

              {/* Mobile metric tiles — visible when floating cards are hidden on desktop */}
              <div className="mt-10 grid grid-cols-2 gap-3 lg:hidden">
                {[
                  { label: "ROAS", value: "4.2×", sub: "Return on ad spend" },
                  { label: "Lead Volume", value: "+68%", sub: "Month-over-month" },
                  { label: "Accuracy", value: "99.4%", sub: "Tracking accuracy" },
                  { label: "Wasted Spend", value: "−25%", sub: "Budget saved" },
                ].map((m) => (
                  <div key={m.label} className="glass-card p-4 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {m.label}
                    </p>
                    <p className="mt-1 text-xl font-bold text-gradient">{m.value}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{m.sub}</p>
                  </div>
                ))}
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
              {/* Collective card halo glow */}
              <div className="absolute inset-0 rounded-3xl bg-primary/[0.06] blur-[60px]" />
              <div className="absolute inset-0 rounded-3xl bg-secondary/[0.04] blur-[80px]" />

              {/* ROAS card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card absolute left-0 top-8 w-52 border-white/15 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
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
                className="glass-card absolute right-0 top-0 w-56 border-white/15 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
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
                className="glass-card absolute bottom-14 left-8 w-52 border-white/15 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
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
                className="glass-card absolute bottom-0 right-4 w-48 border-white/15 p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Wasted Spend
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">−25%</p>
                <p className="mt-1 text-xs text-muted-foreground">Reduction in wasted budget</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats — animated count-up on scroll */}
      <section
        className="border-b border-white/10 py-14"
        style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.04) 0%, transparent 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            Results we've driven for clients across 3 countries
          </p>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-1 flex-col items-center text-center">
                <p className="text-4xl font-bold text-gradient">
                  <CountUp value={stat.numericValue} suffix={stat.suffix} disabled={shouldReduceMotion} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms & Tools */}
      <section className="border-b border-white/10 bg-white/[0.01] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Platforms & Tools"
            title="A Curated Stack Built for Measurable Growth"
            description="We do not bolt on random tools. We choose a lean stack for measurement, channel execution, and follow-up visibility."
            align="center"
            width="wide"
            className="mb-12"
          />
          <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-3">
            {toolCollections.map((group, index) => (
              <motion.div
                key={group.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: index * 0.06 }}
                className="rounded-[26px] border border-white/10 bg-white/[0.02] p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/85">
                  {group.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/80 px-3 py-1.5 text-sm text-foreground/90"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <img src={tool.icon} alt="" className="h-full w-full object-contain" loading="lazy" />
                      </span>
                      {tool.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-3xl rounded-full border border-white/8 bg-white/[0.02] px-4 py-3 text-center text-xs uppercase tracking-[0.22em] text-muted-foreground/70">
            Measurement first. Channel second. Automation tied to outcomes.
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="relative overflow-hidden border-t border-white/10 py-24"
        style={{
          background: [
            "radial-gradient(ellipse 65% 55% at 15% 55%, rgba(62,207,142,0.04) 0%, transparent 65%)",
            "linear-gradient(180deg, rgba(255,255,255,0.012) 0%, transparent 100%)",
          ].join(", "),
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="What We Do"
            title="Services Designed as a Growth System"
            description="We combine measurement, acquisition, and lead follow-up into one practical operating layer for your marketing."
            width="wide"
            className="mb-12"
          />

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
                  className={cn(
                    "group flex h-full flex-col rounded-[26px] border p-8 transition-all duration-300 hover:-translate-y-1",
                    service.flagship
                      ? "border-primary/30 bg-[linear-gradient(180deg,rgba(62,207,142,0.10)_0%,rgba(255,255,255,0.02)_100%)] shadow-[0_18px_60px_rgba(62,207,142,0.08)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                        service.flagship
                          ? "bg-primary text-primary-foreground"
                          : "border border-white/10 bg-white/[0.04] text-muted-foreground",
                      )}
                    >
                      {service.badge}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground/60">0{i + 1}</span>
                  </div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    to={service.path}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn more{" "}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 border-t border-white/10 pt-10">
            <div className="mb-6 flex items-center justify-between gap-4">
              <SectionIntro
                eyebrow="Complete Scope"
                title="Supporting Services"
                description="Complementary capabilities that complete the growth stack without competing for attention."
                width="wide"
                titleClassName="text-2xl md:text-3xl"
                descriptionClassName="max-w-2xl text-sm"
              />
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
                    className="group flex h-full flex-col rounded-2xl border border-white/8 bg-background/65 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
                      <s.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-[15px] font-semibold">{s.title}</h4>
                    <p className="mt-2 flex-1 text-[13px] leading-6 text-muted-foreground">
                      {s.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary/80 transition-colors group-hover:text-primary">
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
      <section
        className="border-t border-white/10 py-24"
        style={{
          background: [
            "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%)",
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,177,255,0.025) 0%, transparent 65%)",
          ].join(", "),
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="How We Work"
            title="How We Deliver"
            description="A clear, repeatable process so you always know what happens next."
            align="center"
            width="wide"
          />
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
                <div className="h-full rounded-[24px] border border-white/8 bg-white/[0.02] p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/[0.08]">
                      <span className="text-xs font-semibold text-primary">{step.step}</span>
                    </div>
                    <step.icon className="h-5 w-5 text-muted-foreground/70" />
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

      {/* Testimonials */}
      <section
        className="border-t border-white/10 py-20"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(62,207,142,0.03) 100%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow={testimonials.length === 1 ? "Why Clients Trust Us" : "Testimonials"}
            title={testimonials.length === 1 ? "A Client Perspective" : "What Our Clients Say"}
            description="Straight from the businesses we've helped grow."
            align="center"
            width="wide"
            className="mb-10"
          />
          {testimonials.length === 1 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mx-auto max-w-3xl"
            >
              <div className="relative overflow-hidden rounded-[30px] border border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(62,207,142,0.03)_100%)] p-8 md:p-10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
                <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/10" />
                <div className="mb-5 flex justify-center gap-1">
                  {Array.from({ length: testimonials[0].rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="relative z-10 text-center text-lg leading-relaxed text-foreground/90 md:text-xl">
                  "{testimonials[0].quote}"
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {testimonials[0].highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-medium text-primary"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex items-center justify-center gap-3 border-t border-white/10 pt-6 text-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {testimonials[0].name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">{testimonials[0].name}</p>
                    <p className="text-sm text-muted-foreground">{testimonials[0].title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card relative flex flex-col overflow-hidden border-t-2 border-primary p-7"
                >
                  <Quote className="absolute right-5 top-5 h-10 w-10 text-primary/10" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="relative z-10 flex-1 text-sm leading-relaxed text-muted-foreground">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Preview — data from shared source, with image skeleton/fallback */}
      <section
        className="border-t border-white/10 py-20"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,177,255,0.03) 0%, transparent 70%)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <SectionIntro
                eyebrow="Insights"
                title="From Our Blog"
                description="Thoughtful, practical guidance on attribution, paid growth, and automation systems."
                width="wide"
                titleClassName="text-3xl md:text-4xl"
                descriptionClassName="max-w-2xl text-sm"
              />
              <Link
                to={`/blog/${latestPost.slug}`}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/[0.10]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                Latest: {latestPost.category}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                    className={cn(
                      "group flex h-full flex-col overflow-hidden rounded-[24px] border bg-card transition-all duration-300 hover:-translate-y-1",
                      i === 0
                        ? "border-white/14 shadow-[0_18px_60px_rgba(0,0,0,0.18)]"
                        : "border-white/10 hover:border-white/18",
                    )}
                  >
                    <div className={cn("w-full overflow-hidden bg-card", i === 0 ? "h-56" : "h-48")}>
                      <BlogImage src={post.image} alt={post.title} />
                    </div>
                    <div className="p-6">
                      <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                        <span>{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                        <span>{post.readTime}</span>
                      </div>
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
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        items={faqs}
        title="Frequently Asked Questions"
        eyebrow="FAQ"
        variant="minimal"
        density="compact"
      />

      <CTASection
        title={
          <>
            Ready to Know Exactly What's Driving Your <span className="text-gradient">Growth</span>?
          </>
        }
        description="Book a call. We'll audit your current setup and show you exactly where the gaps are."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        secondaryCta={{ label: "Explore Services", to: "/service" }}
        variant="hero-close"
        proofChips={["Response within 1 business day", "No-pressure discovery call", "Measurement-first advice"]}
      />
    </>
  );
};

export default Index;

