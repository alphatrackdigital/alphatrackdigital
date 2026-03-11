import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  ClipboardCheck,
  PhoneCall,
  Rocket,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { buildCanonicalUrl } from "@/config/seo";
import { motion, useReducedMotion } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";
import { getFeaturedBlogPosts } from "@/data/blogPosts";
import { homepageProofMetrics, homepageProofSection } from "@/data/homepageProof";
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
import microsoftClarityIcon from "@/assets/tools/microsoft-clarity.ico";
import shopifyIcon from "@/assets/tools/shopify.svg";
import wordpressIcon from "@/assets/tools/wordpress-favicon-com.png";
import zapierIcon from "@/assets/tools/zapier.svg";

// --- Sub-components ---

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
  { name: "Microsoft Clarity",  icon: microsoftClarityIcon,  color: "#2563EB" },
  { name: "Shopify",            icon: shopifyIcon,           color: "#96BF48" },
  { name: "WordPress",          icon: wordpressIcon,         color: "#21759B" },
  { name: "Zapier",             icon: zapierIcon,            color: "#FF4A00" },
];

const findTool = (name: string) => tools.find((tool) => tool.name === name)!;

const toolCollections = [
  {
    title: "Measurement",
    description: "Analytics, tagging, and reporting tools we work with.",
    items: [
      findTool("Google Analytics 4"),
      findTool("Google Tag Manager"),
      findTool("Looker Studio"),
      findTool("Microsoft Clarity"),
    ],
  },
  {
    title: "Paid Media",
    description: "Channel platforms we use based on campaign fit and audience.",
    items: [
      findTool("Meta Ads"),
      findTool("Google Ads"),
      findTool("Microsoft Ads"),
      findTool("LinkedIn Ads"),
    ],
  },
  {
    title: "Automation",
    description: "Follow-up and handoff tools we work with across the revenue stack.",
    items: [
      findTool("Brevo"),
      findTool("HubSpot"),
      findTool("Klaviyo"),
      findTool("Make"),
    ],
  },
];

const heroMetrics = [
  {
    label: "Reach",
    value: "2.1M+",
    sub: "Unique users reached",
    note: "~4.9M impressions served",
  },
  {
    label: "Viewer-to-Site Rate",
    value: "55%",
    sub: "Video viewers who visited the website",
    barWidth: "55%",
  },
  {
    label: "Completion Rate",
    value: "25.14%",
    sub: "Teaser video completion rate",
    filledSegments: 3,
  },
  {
    label: "Website Visits",
    value: "3,151",
    sub: "Generated in a 12-day hospitality campaign",
  },
] as const;

const processSteps = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Discovery Call",
    description: "We align on goals, funnel friction, timeline, and the commercial outcome that matters most.",
    output: "Fit check and priority scope",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Audit & Strategy",
    description: "We audit tracking, campaigns, and follow-up systems to find the clearest leverage points.",
    output: "Prioritised action plan",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Implementation",
    description: "We ship the agreed fixes, launches, and automation pieces without losing the commercial thread.",
    output: "Live setup and workflow launch",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Measure & Refine",
    description: "We report clearly, review performance, and refine what is already proving its value.",
    output: "Reporting rhythm and next steps",
  },
];

const faqs = [
  {
    question: "Can you work with our existing setup, or do we need to rebuild everything?",
    answer:
      "Usually we start with what you already have. We audit your tracking, campaigns, and follow-up systems first, then recommend only the fixes or rebuilds that are actually necessary.",
  },
  {
    question: "Can you work alongside our in-house team or current agency?",
    answer:
      "Yes. We can plug into an existing team, handle a specific layer like tracking or paid media, or take ownership of a broader scope if needed. The working model depends on where the gaps are.",
  },
  {
    question: "How quickly can we launch or start seeing fixes go live?",
    answer:
      "Smaller tracking and reporting fixes can often be implemented within days. Larger setup, campaign, or automation work depends on scope, but we aim to move quickly once priorities are clear.",
  },
  {
    question: "What does reporting look like, and do we keep access to the data?",
    answer:
      "You keep access to your ad accounts, analytics, dashboards, and automation tools. We focus on clear reporting, shared visibility, and clean handoff rather than locking anything away.",
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
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: [
                "radial-gradient(ellipse 70% 60% at 15% 40%, rgba(51,204,153,0.14) 0%, transparent 65%)",
                "radial-gradient(ellipse 55% 50% at 80% 10%, rgba(0,175,239,0.10) 0%, transparent 60%)",
                "radial-gradient(ellipse 42% 42% at 60% 80%, rgba(0,51,153,0.12) 0%, transparent 55%)",
                "radial-gradient(ellipse 30% 30% at 90% 70%, rgba(0,175,239,0.04) 0%, transparent 50%)",
              ].join(", "),
            }}
          />
          <div className="animate-pulse-slow absolute left-[8%] top-[15%] h-[65%] w-[50%] rounded-full bg-primary/[0.10] blur-[130px]" />
          <div className="animate-pulse-slow-delay absolute -right-[5%] top-[5%] h-[45%] w-[38%] rounded-full bg-secondary/[0.07] blur-[100px]" />
          <div className="animate-pulse-slow-delay-2 absolute -bottom-[15%] left-[20%] h-[40%] w-[35%] rounded-full bg-primary/[0.05] blur-[120px]" />
          <div
            className="absolute right-[-8%] top-[5%] h-[90%] w-[55%] rounded-full"
            style={{ border: "1px solid rgba(51,204,153,0.05)" }}
          />
          <div
            className="absolute right-[2%] top-[15%] h-[65%] w-[40%] rounded-full"
            style={{ border: "1px solid rgba(0,175,239,0.05)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 35% at 50% 0%, hsl(var(--background)) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-40"
            style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)" }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(0,51,153,0.32) 12%, rgba(0,175,239,0.35) 52%, rgba(51,204,153,0.32) 86%, transparent 100%)",
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
              {/* Pulsing badge */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 shadow-[0_0_16px_rgba(51,204,153,0.08)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-sm font-medium text-primary">
                  Performance Marketing That Proves Its Value
                </span>
              </div>

              <h1 className="max-w-none text-[2rem] font-bold leading-[1.08] tracking-tight sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3.2rem] xl:text-[3.5rem]">
                <span className="block lg:whitespace-nowrap">Track Every Conversion.</span>
                <span className="mt-2 block text-foreground/92 md:mt-2.5 lg:whitespace-nowrap">
                  Automate Every Lead.
                </span>
                <span className="mt-2 block text-gradient md:mt-2.5 lg:whitespace-nowrap">
                  Scale What Works.
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-base text-muted-foreground md:text-[17px]">
                We build the measurement, automation, and paid media systems that turn your marketing
                budget into provable revenue.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="gap-1.5 rounded-lg bg-primary px-8 text-primary-foreground shadow-[0_0_24px_rgba(51,204,153,0.22)] transition-shadow hover:bg-primary/90 hover:shadow-[0_0_36px_rgba(0,175,239,0.18)]"
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

              {/* Trust items */}
              <div className="mt-7 flex flex-col gap-2">
                {[
                  "No-pressure discovery call",
                  "Transparent reporting — real numbers, always",
                  "Response within 1 business day",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    {item}
                  </div>
                ))}
              </div>
              {/* Mobile metric tiles — visible when floating cards are hidden on desktop */}
              <div className="mt-8 grid grid-cols-2 gap-3 lg:hidden">
                {heroMetrics.map((m) => (
                  <div key={m.label} className="glass-card p-4 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {m.label}
                    </p>
                    <p className="mt-1 text-xl font-bold text-gradient">{m.value}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{m.sub}</p>
                    {"note" in m && m.note && (
                      <p className="mt-2 text-[10px] font-medium text-primary">{m.note}</p>
                    )}
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

              {/* Reach card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card absolute left-0 top-8 w-52 border-white/[0.07] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {heroMetrics[0].label}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">{heroMetrics[0].value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{heroMetrics[0].sub}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-primary">
                  <TrendingUp className="h-3 w-3" /> {heroMetrics[0].note}
                </div>
              </motion.div>

              {/* Viewer-to-site rate card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -14, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="glass-card absolute right-0 top-0 w-56 border-white/[0.07] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {heroMetrics[1].label}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">{heroMetrics[1].value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{heroMetrics[1].sub}</p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-white/5">
                  <div
                    className="h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: heroMetrics[1].barWidth }}
                  />
                </div>
              </motion.div>

              {/* Completion rate card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="glass-card absolute bottom-14 left-8 w-52 border-white/[0.07] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <ClipboardCheck className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {heroMetrics[2].label}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">{heroMetrics[2].value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{heroMetrics[2].sub}</p>
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i < heroMetrics[2].filledSegments ? "bg-primary" : "bg-primary/20"}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Website visits card */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="glass-card absolute bottom-0 right-4 w-48 border-white/[0.07] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              >
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
                    <Rocket className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {heroMetrics[3].label}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gradient">{heroMetrics[3].value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{heroMetrics[3].sub}</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Outcomes */}
      <section
        data-testid="proof-strip-section"
        className="border-b border-white/10 py-14"
        style={{ background: "linear-gradient(180deg, rgba(0,51,153,0.035) 0%, rgba(0,175,239,0.02) 52%, transparent 100%)" }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
            {homepageProofSection.eyebrow}
          </p>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/10">
            {homepageProofMetrics.map((metric, i) => (
              <motion.div
                key={metric.sourceRef}
                data-testid="proof-metric"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-1 flex-col items-center px-6 text-center"
              >
                <p className="text-4xl font-bold text-gradient md:text-5xl">{metric.value}</p>
                <p className="mt-2 max-w-[18rem] text-sm leading-6 text-muted-foreground">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        className="relative overflow-hidden border-t border-white/10 py-20 md:py-24"
        style={{
          background: [
            "radial-gradient(ellipse 65% 55% at 15% 55%, rgba(0,51,153,0.08) 0%, transparent 65%)",
            "linear-gradient(180deg, rgba(255,255,255,0.012) 0%, rgba(0,175,239,0.01) 48%, transparent 100%)",
          ].join(", "),
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-atd-blue/[0.09] blur-[95px]" />
          <div className="absolute right-[-6%] top-[18%] h-56 w-56 rounded-full bg-secondary/[0.045] blur-[105px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/24 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="What We Do"
            title="Services Designed as a Growth System"
            description="Measurement, acquisition, and follow-up built into one practical growth system."
            width="wide"
            className="mb-10 md:mb-12"
            descriptionClassName="max-w-4xl md:whitespace-nowrap"
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
                      ? "border-primary/30 bg-[linear-gradient(180deg,rgba(0,51,153,0.16)_0%,rgba(0,175,239,0.04)_42%,rgba(51,204,153,0.04)_100%)] shadow-[0_18px_60px_rgba(0,51,153,0.12)]"
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                  We Also Deliver
                </p>
                <p className="mt-3 text-base text-muted-foreground md:text-[17px]">
                  Complementary services to round out your digital growth stack.
                </p>
              </div>
              <Link
                to="/service"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                View all services <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="relative mt-8 overflow-hidden rounded-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,51,153,0.10),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(0,175,239,0.04),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0.01)_100%)]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="grid xl:grid-cols-4 sm:grid-cols-2">
                {supportingServices.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className={cn(
                      i > 0 && "border-t border-white/10",
                      i >= 2 && "sm:border-t sm:border-white/10",
                      i % 2 === 1 && "sm:border-l sm:border-white/10",
                      i < 2 && "sm:border-t-0",
                      i % 2 === 0 && "sm:border-l-0",
                      i > 0 && "xl:border-l xl:border-white/10",
                      "xl:border-t-0",
                    )}
                  >
                    <Link
                      to={s.path}
                      data-testid="supporting-service-item"
                      className="group flex h-full flex-col px-5 py-6 transition-colors duration-300 hover:bg-white/[0.025] sm:px-6"
                    >
                      <div className="mb-5 flex items-start justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04]">
                          <s.icon className="h-5 w-5 text-primary" />
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-primary/55 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                      </div>
                      <h4 className="text-lg font-semibold">{s.title}</h4>
                      <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                        {s.description}
                      </p>
                      <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.16em] text-primary/72">
                        {s.bestFor}
                      </p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work — Process */}
      <section
        className="relative overflow-hidden border-t border-white/10 py-20 md:py-24"
        style={{
          background: [
            "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%)",
            "radial-gradient(ellipse 70% 60% at 50% 100%, rgba(0,51,153,0.04) 0%, transparent 65%)",
          ].join(", "),
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-12 h-64 w-[55%] -translate-x-1/2 rounded-full bg-atd-blue/[0.10] blur-[115px]" />
          <div className="absolute inset-x-[14%] top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="How We Work"
            title="How We Deliver"
            description="A connected delivery rhythm from first call to reporting loop, so you always know what happens next."
            align="center"
            width="wide"
          />
          <div className="relative mt-14 rounded-[32px] border border-white/[0.06] bg-[radial-gradient(circle_at_top_center,rgba(0,51,153,0.11),transparent_40%),radial-gradient(circle_at_30%_0%,rgba(0,175,239,0.05),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)] px-3 py-6 shadow-[0_18px_60px_rgba(0,8,22,0.14)] sm:px-5 lg:px-6 lg:py-8">
          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute inset-x-[10%] top-6">
              <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
              <div className="absolute inset-x-[8%] top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-secondary/35 blur-sm" />
            </div>
            <div className="grid gap-6 lg:grid-cols-4">
              {processSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  data-testid="process-step"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="relative flex pt-14"
                >
                  <div className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center">
                    <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl" />
                    <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-primary/25 bg-background/95 text-xs font-semibold text-primary shadow-[0_0_0_6px_rgba(6,10,12,0.72)]">
                      {step.step}
                    </div>
                    <div className="h-10 w-px bg-gradient-to-b from-primary/45 via-primary/18 to-transparent" />
                  </div>
                  <div className="flex h-full w-full flex-col rounded-[28px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.012)_100%)] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.16)]">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">
                          Step {step.step}
                        </p>
                        <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                        <step.icon className="h-5 w-5 text-primary/85" />
                      </div>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{step.description}</p>
                    <div className="mt-5 min-h-[4.5rem] border-t border-white/10 pt-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                        Output
                      </p>
                      <p className="mt-2 text-sm text-foreground/90">{step.output}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative mt-2 space-y-6 lg:hidden">
            <div className="pointer-events-none absolute bottom-0 left-5 top-3">
              <div className="h-full w-px bg-gradient-to-b from-primary/35 via-primary/14 to-transparent" />
              <div className="absolute left-0 top-8 h-[calc(100%-2rem)] w-px bg-primary/20 blur-[1px]" />
            </div>
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                data-testid="process-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="relative pl-14"
              >
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-background/95 text-xs font-semibold text-primary shadow-[0_0_0_5px_rgba(6,10,12,0.75)]">
                  {step.step}
                </div>
                <div className="flex flex-col rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.012)_100%)] p-5 shadow-[0_14px_42px_rgba(0,0,0,0.14)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">
                        Step {step.step}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                      <step.icon className="h-5 w-5 text-primary/85" />
                    </div>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{step.description}</p>
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      Output
                    </p>
                    <p className="mt-2 text-sm text-foreground/90">{step.output}</p>
                  </div>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="absolute left-5 top-10 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-primary/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* Core Growth Stack */}
      <section
        aria-labelledby="growth-stack-heading"
        data-testid="growth-stack-section"
        className="border-t border-white/10 bg-white/[0.01] py-16"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Selected Platforms"
            title="Built Across Your Revenue Stack"
            description="Representative platforms we work with across analytics, paid media, and automation."
            align="center"
            width="wide"
            className="mb-8"
            titleClassName="max-w-3xl"
            descriptionClassName="max-w-4xl text-sm md:text-[15px] md:whitespace-nowrap"
            titleId="growth-stack-heading"
          />

          <div className="mx-auto max-w-6xl overflow-hidden rounded-[28px] border border-white/[0.07] bg-[radial-gradient(circle_at_top_left,rgba(0,51,153,0.12),transparent_34%),radial-gradient(circle_at_52%_0%,rgba(0,175,239,0.05),transparent_22%),radial-gradient(circle_at_82%_12%,rgba(51,204,153,0.05),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_24px_70px_rgba(0,8,22,0.20)]">
            <div className="grid md:grid-cols-[0.92fr_1.04fr_1.04fr]">
              {toolCollections.map((group, index) => (
                <div
                  key={group.title}
                  data-testid="growth-stack-card"
                  className={cn(
                    "relative flex h-full flex-col px-5 py-6 sm:px-6",
                    index > 0 && "border-t border-white/[0.08] md:border-l md:border-t-0",
                  )}
                >
                  <div className="absolute left-6 top-0 h-px w-12 bg-primary/26" />
                  <div className="min-h-[76px]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      {group.title}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {group.items.map((tool) => (
                      <span
                        key={tool.name}
                        className="flex min-h-[2.85rem] items-center gap-2.5 rounded-lg border border-white/[0.04] bg-black/10 px-3 py-2 text-[12.5px] text-foreground/88"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                          <img
                            src={tool.icon}
                            alt=""
                            className="block h-full w-full max-h-full max-w-full object-contain opacity-95"
                            loading="lazy"
                          />
                        </span>
                        <span className="min-w-0 leading-4">{tool.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
            Measure first. Scale second. Automate what converts.
          </p>
        </div>
      </section>

      {/* Blog Preview — data from shared source, with image skeleton/fallback */}
      <section
        className="relative overflow-hidden border-t border-white/10 py-16 md:py-20"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,51,153,0.06) 0%, rgba(0,175,239,0.02) 34%, transparent 70%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-16 h-48 w-48 rounded-full bg-atd-blue/[0.08] blur-[100px]" />
          <div className="absolute right-[6%] bottom-8 h-44 w-44 rounded-full bg-primary/[0.035] blur-[105px]" />
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <SectionIntro
                eyebrow="Insights"
                title="From Our Blog"
                description="Short, practical reads on tracking, paid media, and automation systems."
                width="wide"
                titleClassName="text-3xl md:text-4xl"
                descriptionClassName="max-w-2xl text-sm"
              />
              <Link
                to="/blog"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/[0.10]"
              >
                View all insights
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
            <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_18px_60px_rgba(0,0,0,0.12)]">
              <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
                {featuredBlogPosts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex h-full flex-col px-5 py-5 transition-colors duration-200 hover:bg-white/[0.02] lg:px-6"
                    >
                      <div className="relative mb-4 overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
                        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        <div className="h-32">
                          <BlogImage src={post.image} alt={post.title} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
                        <span>{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/35" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-4 text-[1.18rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-primary/90">
                        Read more
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion
        items={faqs}
        title="Frequently Asked Questions"
        description="A few practical answers before you book a call."
        eyebrow="FAQ"
        variant="minimal"
        density="compact"
        defaultOpenItem={0}
        contentClassName="max-w-[46rem]"
        accordionClassName="space-y-3"
      />

      <CTASection
        title={
          <>
            Ready to See What's Driving <span className="text-gradient">Growth</span>?
          </>
        }
        description="Book a call and we'll show you where tracking, media, or follow-up is leaking revenue."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        secondaryCta={{ label: "View Services", to: "/service" }}
        variant="hero-close"
      />
    </>
  );
};

export default Index;

