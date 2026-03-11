import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
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
import { homepageProofCards, homepageProofSection } from "@/data/homepageProof";
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
  { name: "Shopify",            icon: shopifyIcon,           color: "#96BF48" },
  { name: "WordPress",          icon: wordpressIcon,         color: "#21759B" },
  { name: "Zapier",             icon: zapierIcon,            color: "#FF4A00" },
];

const findTool = (name: string) => tools.find((tool) => tool.name === name)!;

const toolCollections = [
  {
    title: "Measurement",
    description: "Attribution clarity across analytics, tags, and reporting.",
    items: [
      findTool("Google Analytics 4"),
      findTool("Google Tag Manager"),
      findTool("Looker Studio"),
      findTool("Meta Ads"),
      findTool("Google Ads"),
    ],
  },
  {
    title: "Paid Media",
    description: "The core paid channels we manage based on intent, quality, and scale.",
    items: [
      findTool("Meta Ads"),
      findTool("Google Ads"),
      findTool("Microsoft Ads"),
      findTool("LinkedIn Ads"),
      findTool("TikTok Ads"),
    ],
  },
  {
    title: "Automation",
    description: "Follow-up visibility and conversion handoff across your revenue stack.",
    items: [
      findTool("Brevo"),
      findTool("HubSpot"),
      findTool("Klaviyo"),
      findTool("Make"),
      findTool("Shopify"),
    ],
  },
];

const heroReviewItems = [
  {
    title: "Tracking Audit",
    detail: "GA4 events, GTM triggers, and primary conversion goals reviewed before media decisions.",
    status: "Event map checked",
    icon: ClipboardCheck,
  },
  {
    title: "Campaign Review",
    detail: "Channel mix, landing paths, and creative-to-offer alignment benchmarked for the next optimisation pass.",
    status: "Optimisation plan",
    icon: BarChart3,
  },
  {
    title: "Lead Follow-up",
    detail: "Forms, CRM routing, and automation triggers validated so leads do not stall after the click.",
    status: "Handoff verified",
    icon: Rocket,
  },
];

const heroCommonGaps = [
  "Wrong primary conversion",
  "Landing-page friction",
  "Broken UTM capture",
  "No lead routing",
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
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
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
          <div className="animate-pulse-slow absolute left-[8%] top-[15%] h-[65%] w-[50%] rounded-full bg-primary/[0.10] blur-[130px]" />
          <div className="animate-pulse-slow-delay absolute -right-[5%] top-[5%] h-[45%] w-[38%] rounded-full bg-secondary/[0.07] blur-[100px]" />
          <div className="animate-pulse-slow-delay-2 absolute -bottom-[15%] left-[20%] h-[40%] w-[35%] rounded-full bg-primary/[0.05] blur-[120px]" />
          <div
            className="absolute right-[-8%] top-[5%] h-[90%] w-[55%] rounded-full"
            style={{ border: "1px solid rgba(62,207,142,0.06)" }}
          />
          <div
            className="absolute right-[2%] top-[15%] h-[65%] w-[40%] rounded-full"
            style={{ border: "1px solid rgba(0,177,255,0.04)" }}
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
              background: "radial-gradient(ellipse 100% 35% at 50% 0%, hsl(0 0% 3.1%) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-40"
            style={{ background: "linear-gradient(to top, hsl(0 0% 3.1%) 0%, transparent 100%)" }}
          />
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
              {/* Pulsing badge */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 shadow-[0_0_16px_rgba(62,207,142,0.08)]">
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
              {/* Mobile review panel */}
              <div
                data-testid="hero-review-panel"
                className="mt-8 rounded-[26px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.012)_100%)] p-5 shadow-[0_12px_40px_rgba(0,0,0,0.18)] lg:hidden"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/85">
                      What We Review First
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">A grounded first-pass audit before any scaling decisions.</p>
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                    Measurement-first
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {heroReviewItems.map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/8 bg-background/65 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                            <item.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">{item.title}</p>
                            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-primary/75">{item.status}</p>
                          </div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/75">
                    Common Gaps We Uncover
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {heroCommonGaps.map((gap) => (
                      <span
                        key={gap}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                      >
                        {gap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: audit workflow panel — desktop only */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.7, delay: 0.2 }}
              className="relative hidden h-[470px] lg:block"
              aria-hidden="true"
            >
              <div className="absolute inset-0 rounded-[34px] bg-primary/[0.05] blur-[70px]" />
              <div className="absolute inset-4 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.012)_100%)] p-8 shadow-[0_18px_70px_rgba(0,0,0,0.28)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                      What We Review First
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                      Measurement before media scaling
                    </h2>
                    <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                      Our first pass is operational, not theatrical. We review tracking, campaign paths,
                      and lead follow-up before deciding what to scale.
                    </p>
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                    Audit workflow
                  </span>
                </div>

                <div className="mt-8 space-y-4">
                  {heroReviewItems.map((item, index) => (
                    <div
                      key={item.title}
                      className="rounded-[22px] border border-white/8 bg-background/60 p-5"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                          <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-base font-semibold text-foreground">{item.title}</p>
                              <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-primary/75">
                                {item.status}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-muted-foreground/55">0{index + 1}</span>
                          </div>
                          <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 md:grid-cols-[1.2fr_0.8fr]">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/75">
                      Common gaps we uncover
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {heroCommonGaps.map((gap) => (
                        <span
                          key={gap}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground"
                        >
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[22px] border border-white/8 bg-white/[0.02] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/75">
                      What this unlocks
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        Clearer attribution before budget shifts
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        Faster optimisation decisions across channels
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        Stronger lead handoff after every click
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Selected Outcomes */}
      <section
        aria-labelledby="selected-outcomes-heading"
        data-testid="proof-section"
        className="border-b border-white/10 py-16"
        style={{
          background: [
            "linear-gradient(180deg, rgba(62,207,142,0.05) 0%, transparent 100%)",
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,177,255,0.03) 0%, transparent 70%)",
          ].join(", "),
        }}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow={homepageProofSection.eyebrow}
            title={homepageProofSection.title}
            description={homepageProofSection.description}
            align="center"
            width="wide"
            className="mb-10"
            titleClassName="max-w-3xl"
            descriptionClassName="max-w-2xl"
            titleId="selected-outcomes-heading"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {homepageProofCards.map((proof, i) => (
              <motion.article
                key={proof.sourceRef}
                data-testid="proof-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.012)_100%)] p-6 md:p-7"
              >
                <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {proof.clientLabel}
                  </span>
                  <span className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-primary">
                    {proof.campaignType}
                  </span>
                  {proof.timeframe && (
                    <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/85">
                      {proof.timeframe}
                    </span>
                  )}
                </div>
                <p className="mt-6 text-3xl font-bold tracking-tight text-gradient md:text-[2.2rem]">
                  {proof.result}
                </p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{proof.context}</p>
              </motion.article>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground/65">
            {homepageProofSection.confidentialityNote}
          </p>
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

      {/* Core Growth Stack */}
      <section
        aria-labelledby="growth-stack-heading"
        data-testid="growth-stack-section"
        className="border-t border-white/10 bg-white/[0.01] py-16"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Core Growth Stack"
            title="Built Across the Core Growth Stack"
            description="A lean stack for attribution clarity, channel execution, and follow-up visibility."
            align="center"
            width="wide"
            className="mb-10"
            titleClassName="max-w-3xl"
            descriptionClassName="max-w-2xl"
            titleId="growth-stack-heading"
          />

          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {toolCollections.map((group) => (
              <div
                key={group.title}
                data-testid="growth-stack-card"
                className="relative rounded-[22px] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)] p-6"
              >
                <div className="absolute left-6 top-0 h-px w-12 bg-primary/30" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                  {group.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.06] bg-background/75 px-3.5 text-sm text-foreground/90"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <img src={tool.icon} alt="" className="h-full w-full object-contain" loading="lazy" />
                      </span>
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
            Measure first. Scale second. Automate what converts.
          </p>
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
        proofChips={["Registered company in Ghana", "Response within 1 business day", "No-pressure discovery call"]}
      />
    </>
  );
};

export default Index;

