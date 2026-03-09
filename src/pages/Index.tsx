import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  PhoneCall,
  Quote,
  Rocket,
  ShieldCheck,
  Star,
  Workflow,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { buildCanonicalUrl } from "@/config/seo";
import { getFeaturedBlogPosts } from "@/data/blogPosts";
import { primaryServices, supportingServices } from "@/data/services";
import { cn } from "@/lib/utils";
import brevoIcon from "@/assets/tools/brevo.svg";
import eskimiIcon from "@/assets/tools/eskimi.png";
import googleAdsIcon from "@/assets/tools/google-ads.svg";
import googleAnalyticsIcon from "@/assets/tools/google-analytics.svg";
import googleTagManagerIcon from "@/assets/tools/google-tag-manager.svg";
import hubspotIcon from "@/assets/tools/hubspot.svg";
import klaviyoIcon from "@/assets/tools/klaviyo.png";
import linkedinAdsIcon from "@/assets/tools/linkedin-ads.svg";
import lookerStudioIcon from "@/assets/tools/looker-studio.svg";
import makeIcon from "@/assets/tools/make.svg";
import metaAdsIcon from "@/assets/tools/meta-ads.svg";
import microsoftAdsIcon from "@/assets/tools/microsoft-ads.png";
import shopifyIcon from "@/assets/tools/shopify.svg";
import snapchatAdsIcon from "@/assets/tools/snapchat-ads.svg";
import tiktokAdsIcon from "@/assets/tools/tiktok-favicon.png";
import wordpressIcon from "@/assets/tools/wordpress-favicon-com.png";
import zapierIcon from "@/assets/tools/zapier.svg";

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
      {!loaded && <div className="absolute inset-0 animate-pulse bg-card" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "h-full w-full object-cover transition-all duration-500 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0",
        )}
        loading="lazy"
      />
    </div>
  );
};

const heroProofChips = [
  "48-hour audit response",
  "GA4, Meta, and Google Ads review",
  "Measurement-first recommendations",
];

const resultHighlights = [
  { value: "4.8M", label: "Impressions delivered in one approved campaign" },
  { value: "55%", label: "Conversion rate achieved in one approved campaign" },
  { value: "272K", label: "Views generated in one approved campaign" },
];

const auditChecklist = [
  "Check where GA4 and ad platforms stop agreeing on the same conversion path.",
  "Validate event firing, conversion mapping, and missing signals.",
  "Review whether captured leads are visible after the form submission.",
];

const operatingModel = [
  {
    icon: ClipboardCheck,
    title: "Measure before changing budget",
    description:
      "If the signal is weak, we fix that before recommending more media spend or broader targeting.",
  },
  {
    icon: Workflow,
    title: "Connect acquisition to follow-up",
    description:
      "We treat attribution and post-lead workflow as one system, not two unrelated deliverables.",
  },
  {
    icon: ShieldCheck,
    title: "Report with accountability",
    description:
      "The point is clearer decisions, visible assumptions, and next steps your team can defend.",
  },
];

const flagshipJourney = [
  {
    stage: "Measure",
    outcome: "Know which channels and campaigns deserve more budget.",
    bestFit: "Teams already running paid media but not trusting the conversion data.",
    service: primaryServices[0],
  },
  {
    stage: "Acquire",
    outcome: "Scale the channels driving qualified demand with less waste.",
    bestFit: "Teams with live campaigns that need tighter targeting and clearer reporting.",
    service: primaryServices[1],
  },
  {
    stage: "Nurture",
    outcome: "Improve follow-up speed and lead visibility after the click converts.",
    bestFit: "Teams losing visibility after a form fill or handling lead flow manually.",
    service: primaryServices[2],
  },
];

const processSteps = [
  {
    icon: ClipboardCheck,
    step: "01",
    title: "Audit the signal",
    description: "We review attribution, event quality, and handoff logic first.",
  },
  {
    icon: PhoneCall,
    step: "02",
    title: "Set fix priorities",
    description: "You get a practical order of operations instead of vague recommendations.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Implement and validate",
    description: "We ship the agreed fixes and test the conversion paths before go-live.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Report and iterate",
    description: "Once the data is trustworthy, we use it to improve performance.",
  },
];

const clientProof = {
  quote:
    "Working with Alpha Track Digital Limited was an excellent experience. They delivered a sleek, modern, and highly functional website right on schedule. Edits were handled quickly, communication was seamless, and the service was truly top notch. Would definitely recommend!",
  name: "Courtney Quist-Therson",
  title: "CEO & Founder, Pearl House Ghana",
  rating: 5,
  scope: "Website design and build",
  outcomes: ["Delivered on schedule", "Fast revisions", "Seamless communication"],
};

const tools = {
  measurement: [
    { name: "Google Analytics 4", icon: googleAnalyticsIcon },
    { name: "Google Tag Manager", icon: googleTagManagerIcon },
    { name: "Looker Studio", icon: lookerStudioIcon },
    { name: "Meta Ads", icon: metaAdsIcon },
    { name: "Google Ads", icon: googleAdsIcon },
  ],
  media: [
    { name: "Meta Ads", icon: metaAdsIcon },
    { name: "Google Ads", icon: googleAdsIcon },
    { name: "Microsoft Ads", icon: microsoftAdsIcon },
    { name: "LinkedIn Ads", icon: linkedinAdsIcon },
    { name: "TikTok Ads", icon: tiktokAdsIcon },
    { name: "Snapchat Ads", icon: snapchatAdsIcon },
    { name: "Eskimi", icon: eskimiIcon },
  ],
  automation: [
    { name: "Brevo", icon: brevoIcon },
    { name: "HubSpot", icon: hubspotIcon },
    { name: "Klaviyo", icon: klaviyoIcon },
    { name: "Make", icon: makeIcon },
    { name: "Shopify", icon: shopifyIcon },
    { name: "WordPress", icon: wordpressIcon },
    { name: "Zapier", icon: zapierIcon },
  ],
};

const faqs = [
  {
    question: "How do you know whether our tracking is actually wrong?",
    answer:
      "We review event logic, platform mapping, and the way conversions are counted across GA4 and ad platforms. The goal is to surface where the signal breaks before another budget decision is made.",
  },
  {
    question: "Can you work with our existing GTM, GA4, and ad accounts?",
    answer:
      "Yes. We look at what already exists first. If the setup is salvageable, we improve it. If the architecture is weak, we show you what needs to change and why.",
  },
  {
    question: "How quickly can we expect something usable?",
    answer:
      "For the audit path, we reply within 48 hours with the next step. Validated tracking setups are typically delivered in 5 to 7 working days once implementation begins.",
  },
  {
    question: "Do you only help with tracking?",
    answer:
      "No. The core model is measurement, acquisition, and lead follow-up. We can fix attribution, improve paid media performance, and tighten the workflow that happens after a lead is captured.",
  },
  {
    question: "What does working with ATD feel like in practice?",
    answer:
      "Direct, practical, and transparent. We explain tradeoffs, document what changed, and report on what is actually improving.",
  },
];

const Index = () => {
  const shouldReduceMotion = useReducedMotion();
  const featuredBlogPosts = getFeaturedBlogPosts(3);

  return (
    <>
      <SEO
        title="AlphaTrack Digital | Measurement-First Growth for Paid Media Teams"
        description="Conversion tracking, paid media management, and CRM automation for teams that need trustworthy attribution before they scale."
        canonicalUrl="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AlphaTrack Digital",
          url: "https://alphatrack.digital",
          logo: buildCanonicalUrl("/apple-touch-icon.png?v=20260303a"),
          description: "Measurement-first digital growth agency focused on attribution, paid media, and automation.",
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

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{
              background: [
                "radial-gradient(ellipse 72% 60% at 18% 26%, rgba(62,207,142,0.15) 0%, transparent 65%)",
                "radial-gradient(ellipse 52% 44% at 82% 12%, rgba(0,177,255,0.09) 0%, transparent 58%)",
                "linear-gradient(180deg, rgba(255,255,255,0.012) 0%, rgba(255,255,255,0) 100%)",
              ].join(", "),
            }}
          />
          <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "26px 26px" }} />
          <div className="absolute left-[6%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-primary/[0.08] blur-[140px]" />
          <div className="absolute right-[2%] top-[6%] h-[20rem] w-[20rem] rounded-full bg-secondary/[0.06] blur-[120px]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="container relative mx-auto px-4 py-20 lg:px-8 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.55 }}
            >
              <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/[0.08] px-4 py-1.5 shadow-[0_0_16px_rgba(62,207,142,0.08)]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-sm font-medium text-primary">For paid-media teams with attribution gaps</span>
              </div>

              <h1 className="mt-7 max-w-3xl text-[2.2rem] font-bold leading-[1.03] tracking-tight sm:text-[2.7rem] md:text-[3.15rem] lg:text-[3.45rem] xl:text-[3.75rem]">
                If You Cannot Trust the Numbers,
                <span className="mt-2 block text-gradient">You Cannot Scale the Budget.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-[17px]">
                AlphaTrack Digital helps paid-media teams fix attribution, tighten campaign visibility, and connect lead capture to real follow-up so more spend is backed by cleaner evidence.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="gap-1.5 rounded-xl bg-primary px-8 text-primary-foreground shadow-[0_0_24px_rgba(62,207,142,0.24)] hover:bg-primary/90">
                  <Link to="/offer/tracking-audit">
                    Get Free Tracking Audit <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-1.5 rounded-xl border-white/20 bg-white/[0.02] hover:bg-white/5">
                  <Link to="/book-a-call">
                    Book a Call <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-7 flex flex-wrap gap-2.5">
                {heroProofChips.map((chip) => (
                  <span key={chip} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.65, delay: 0.08 }}
              className="relative mx-auto w-full max-w-xl lg:max-w-none"
            >
              <div className="absolute inset-0 rounded-[32px] bg-primary/[0.08] blur-[70px]" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">Audit Snapshot</p>
                    <h2 className="mt-2 text-2xl font-semibold leading-tight">A grounded view of where paid-media systems usually break.</h2>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                      We review attribution confidence, event quality, and lead handoff visibility before recommending more spend.
                    </p>
                  </div>
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    Free audit
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  {auditChecklist.map((item, index) => (
                    <div key={item} className="rounded-2xl border border-white/8 bg-background/70 p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">Check {index + 1}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {resultHighlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-primary/10 bg-primary/[0.05] p-4">
                      <p className="text-2xl font-bold text-gradient">{item.value}</p>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.01] py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <SectionIntro
              eyebrow="Proof Before Promises"
              title="Approved results and a live audit offer before a single pitch-deck flourish."
              description="We lead with evidence already in the repo: approved campaign outcomes, a real audit path, and an operating model built around cleaner decisions."
              width="wide"
              className="max-w-2xl"
            />

            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
              <div className="grid gap-4 sm:grid-cols-3">
                {resultHighlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.35 }}
                    className="rounded-[24px] border border-primary/10 bg-primary/[0.05] p-5"
                  >
                    <p className="text-3xl font-bold text-gradient">{item.value}</p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="rounded-[24px] border border-white/8 bg-background/75 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/85">Live offer</p>
                <h2 className="mt-3 text-lg font-semibold">Free audit first. Clear next step second.</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Qualified teams can start with the audit and carry a 20% implementation discount into the fix phase.
                </p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Reply within 48 hours
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No-pressure next step
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-24" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Why ATD Works"
            title="Built for teams who need signal quality, not agency theatre."
            description="The point is to tighten measurement, acquisition, and follow-up so the next decision is easier to defend."
            width="wide"
            className="mb-12"
          />

          <div className="grid gap-5 md:grid-cols-3">
            {operatingModel.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="rounded-[26px] border border-white/8 bg-white/[0.025] p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="The Growth System"
            title="Measure. Acquire. Nurture."
            description="The flagship services are designed to work in order: fix measurement, improve media decisions, then protect conversion value after the lead is captured."
            width="wide"
            className="mb-12"
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {flagshipJourney.map((item, index) => (
              <motion.div
                key={item.service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
              >
                <Link
                  to={item.service.path}
                  className={cn(
                    "group flex h-full flex-col rounded-[28px] border p-8 transition-all duration-300 hover:-translate-y-1",
                    item.service.flagship
                      ? "border-primary/25 bg-[linear-gradient(180deg,rgba(62,207,142,0.10)_0%,rgba(255,255,255,0.02)_100%)] shadow-[0_18px_60px_rgba(62,207,142,0.08)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">{item.stage}</p>
                      <span className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {item.service.badge}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground/60">0{index + 1}</span>
                  </div>

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <item.service.icon className="h-6 w-6 text-primary" />
                  </div>

                  <h2 className="text-xl font-semibold">{item.service.title}</h2>

                  <div className="mt-5 space-y-4 rounded-2xl border border-white/8 bg-background/50 p-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">Outcome</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.outcome}</p>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">Best fit</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.bestFit}</p>
                    </div>
                  </div>

                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                    Explore this layer <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 rounded-[28px] border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <SectionIntro
                eyebrow="Supporting Capabilities"
                title="Additional services that support the core system."
                description="These stay compact on the homepage so the flagship path stays clear."
                width="wide"
                titleClassName="text-2xl md:text-3xl"
                descriptionClassName="max-w-2xl text-sm"
              />
              <Link to="/service" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                View all services <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {supportingServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <Link to={service.path} className="group flex h-full flex-col rounded-2xl border border-white/8 bg-background/65 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-[15px] font-semibold">{service.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-6 text-muted-foreground">{service.description}</p>
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

      <section className="border-b border-white/10 py-24" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.01) 0%, transparent 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="How We Work"
            title="A tighter sequence from audit to iteration."
            description="We understand the signal first, set the fix priorities second, and only then decide what deserves implementation effort."
            align="center"
            width="wide"
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="relative flex flex-col"
              >
                <div className="h-full rounded-[24px] border border-white/8 bg-white/[0.02] p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-primary/[0.08]">
                      <span className="text-xs font-semibold text-primary">{step.step}</span>
                    </div>
                    <step.icon className="h-5 w-5 text-muted-foreground/70" />
                  </div>
                  <h2 className="text-lg font-semibold">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <>
                    <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-3 lg:flex">
                      <ArrowRight className="h-4 w-4 text-primary/30" />
                    </div>
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

      <section className="border-b border-white/10 py-20" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.01) 0%, rgba(62,207,142,0.03) 100%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Client Proof"
            title="One substantial proof block is better than a wall of weak testimonials."
            description="Where proof depth is limited, we would rather show one stronger client perspective with delivery context."
            align="center"
            width="wide"
            className="mb-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-primary/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(62,207,142,0.03)_100%)] p-8 md:p-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
              <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/10" />
              <div className="mb-5 flex gap-1">
                {Array.from({ length: clientProof.rating }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="relative z-10 text-lg leading-relaxed text-foreground/90 md:text-xl">"{clientProof.quote}"</p>
              <div className="mt-7 flex flex-wrap gap-2">
                {clientProof.outcomes.map((outcome) => (
                  <span key={outcome} className="rounded-full border border-primary/20 bg-primary/[0.08] px-3 py-1 text-xs font-medium text-primary">
                    {outcome}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {clientProof.name.split(" ").map((name) => name[0]).join("")}
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{clientProof.name}</p>
                  <p className="text-sm text-muted-foreground">{clientProof.title}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-white/10 bg-background/75 p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/85">Scope delivered</p>
                <h2 className="mt-3 text-xl font-semibold">{clientProof.scope}</h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  The quote on this page is intentionally specific about the delivery experience instead of vague agency praise.
                </p>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/85">Selected approved performance highlights</p>
                <div className="mt-5 space-y-4">
                  {resultHighlights.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/8 bg-background/65 p-4">
                      <p className="text-2xl font-bold text-gradient">{item.value}</p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.01] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Platform Stack"
            title="A curated stack by role, not a logo wall."
            description="These platforms matter because of the job they do in the system, not because they look good in a grid."
            align="center"
            width="wide"
            className="mb-12"
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              { title: "Measurement", description: "Attribution, event quality, and reporting clarity.", items: tools.measurement },
              { title: "Paid Media", description: "Channel coverage based on audience quality and intent.", items: tools.media },
              { title: "Automation", description: "Follow-up, CRM visibility, and workflow orchestration.", items: tools.automation },
            ].map((group, index) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.3 }}
                className="rounded-[24px] border border-white/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.01)_100%)] p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/85">{group.title}</p>
                <p className="mt-3 min-h-[48px] text-sm leading-6 text-muted-foreground">{group.description}</p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {group.items.slice(0, 5).map((tool) => (
                    <span key={tool.name} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/[0.06] bg-background/75 px-3.5 text-sm text-foreground/90">
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

          <div className="mx-auto mt-8 flex max-w-3xl items-center justify-center gap-2.5 text-center text-xs tracking-[0.14em] text-muted-foreground/68">
            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
              Operating principle
            </span>
            <span className="uppercase">Measure first. Scale second. Automate what converts.</span>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-16" style={{ background: "radial-gradient(ellipse 75% 48% at 50% 0%, rgba(0,177,255,0.03) 0%, transparent 70%)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionIntro
                eyebrow="Insights"
                title="From the blog"
                description="Practical guidance on attribution, paid growth, and automation. Useful, but deliberately secondary to the main proof and service story."
                width="wide"
                titleClassName="text-3xl md:text-4xl"
                descriptionClassName="max-w-2xl text-sm"
              />
              <Link to="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                View all insights <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {featuredBlogPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                >
                  <Link to={`/blog/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                    <div className="h-48 overflow-hidden bg-card">
                      <BlogImage src={post.image} alt={post.title} />
                    </div>
                    <div className="p-5">
                      <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70">
                        <span>{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-base font-semibold leading-snug text-foreground">{post.title}</h2>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                        Read article <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        items={faqs}
        title="Questions Paid-Media Teams Usually Ask First"
        eyebrow="FAQ"
        variant="minimal"
        density="compact"
      />

      <CTASection
        title={
          <>
            Need Clarity Before You Scale More <span className="text-gradient">Spend</span>?
          </>
        }
        description="Start with the free tracking audit. We review the signal, reply within 48 hours, and give you a no-pressure next step grounded in what the data quality actually supports."
        primaryCta={{ label: "Get Free Tracking Audit", to: "/offer/tracking-audit" }}
        secondaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        variant="hero-close"
        proofChips={["Reply within 48 hours", "No-pressure next step", "Measurement-first recommendations"]}
      />
    </>
  );
};

export default Index;
