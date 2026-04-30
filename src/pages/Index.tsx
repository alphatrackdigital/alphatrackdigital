import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ClipboardCheck,
  PhoneCall,
  Rocket,
  BarChart3,
  Quote,
  ShoppingCart,
  Package2,
  GraduationCap,
  BriefcaseBusiness,
  Plane,
  Building2,
  Shirt,
  Gamepad2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import { BOOK_A_FREE_STRATEGY_CALL_CTA } from "@/config/cta";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { buildCanonicalUrl } from "@/config/seo";
import { motion, useReducedMotion } from "framer-motion";
import { primaryServices, supportingServices } from "@/data/services";
import { getFeaturedBlogPosts } from "@/data/blogPosts";
import { companyProfile, featuredTestimonial, primarySectors, sectorSummaries } from "@/data/companyProfile";
import type { PrimarySector } from "@/data/companyProfile";
import { homepageProofLine, homepageProofMetrics } from "@/data/homepageProof";
import { withCampaignSearch } from "@/lib/campaignAttribution";
import { cn } from "@/lib/utils";
import makeIcon from "@/assets/tools/make.svg";
import googleAnalyticsIcon from "@/assets/tools/google-analytics.svg";
import metaAdsIcon from "@/assets/tools/meta-ads.svg";
import googleAdsIcon from "@/assets/tools/google-ads.svg";
import microsoftAdsIcon from "@/assets/tools/microsoft-ads.png";
import linkedinAdsIcon from "@/assets/tools/linkedin-ads.svg";
import hubspotIcon from "@/assets/tools/hubspot.svg";
import klaviyoIcon from "@/assets/tools/klaviyo.png";
import googleTagManagerIcon from "@/assets/tools/google-tag-manager.svg";
import brevoIcon from "@/assets/tools/brevo.svg";
import lookerStudioIcon from "@/assets/tools/looker-studio.svg";
import microsoftClarityIcon from "@/assets/tools/microsoft-clarity.ico";

const HOMEPAGE_SEO_TITLE = "AlphaTrack Digital | Data-Driven Performance Marketing Agency";
const HOMEPAGE_SEO_DESCRIPTION =
  "Data-driven marketing, creative strategy, and growth systems for brands ready to attract, convert, and scale.";

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
        decoding="async"
        width={600}
        height={338}
        sizes="(min-width: 768px) 33vw, 85vw"
      />
    </div>
  );
};

// --- Data ---

const tools = [
  { name: "Make", icon: makeIcon },
  { name: "Google Analytics 4", icon: googleAnalyticsIcon },
  { name: "Meta Ads", icon: metaAdsIcon },
  { name: "Google Ads", icon: googleAdsIcon },
  { name: "Microsoft Ads", icon: microsoftAdsIcon },
  { name: "LinkedIn Ads", icon: linkedinAdsIcon },
  { name: "HubSpot", icon: hubspotIcon },
  { name: "Klaviyo", icon: klaviyoIcon },
  { name: "Google Tag Manager", icon: googleTagManagerIcon },
  { name: "Brevo", icon: brevoIcon },
  { name: "Looker Studio", icon: lookerStudioIcon },
  { name: "Microsoft Clarity", icon: microsoftClarityIcon },
];

const findTool = (name: string) => tools.find((tool) => tool.name === name)!;

const toolCollections = [
  {
    title: "Measurement",
    description: "Tracking and reporting tools.",
    items: [
      findTool("Google Analytics 4"),
      findTool("Google Tag Manager"),
      findTool("Looker Studio"),
      findTool("Microsoft Clarity"),
    ],
  },
  {
    title: "Paid Media",
    description: "Ad platforms we use.",
    items: [
      findTool("Meta Ads"),
      findTool("Google Ads"),
      findTool("Microsoft Ads"),
      findTool("LinkedIn Ads"),
    ],
  },
  {
    title: "Automation",
    description: "Automation and follow-up tools.",
    items: [
      findTool("Brevo"),
      findTool("HubSpot"),
      findTool("Klaviyo"),
      findTool("Make"),
    ],
  },
];

const processSteps = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Discovery Call",
    description: "The first call covers your goals and current setup.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Audit & Strategy",
    description: "An audit shows what is working and what needs to change.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Implementation",
    description: "The agreed fixes, campaigns, and systems go live.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Measure & Refine",
    description: "Results are tracked, reviewed, and improved over time.",
  },
];

const sectorVisuals = {
  "Ecommerce & Retail": {
    icon: ShoppingCart,
    accentClassName: "bg-secondary/14 text-secondary",
    glowColor: "rgba(0, 210, 255, 0.10)",
  },
  FMCG: {
    icon: Package2,
    accentClassName: "bg-amber-500/14 text-amber-400",
    glowColor: "rgba(251, 191, 36, 0.09)",
  },
  Education: {
    icon: GraduationCap,
    accentClassName: "bg-violet-500/14 text-violet-400",
    glowColor: "rgba(139, 92, 246, 0.10)",
  },
  SaaS: {
    icon: BriefcaseBusiness,
    accentClassName: "bg-primary/14 text-primary",
    glowColor: "rgba(52, 211, 153, 0.10)",
  },
  "Entertainment & Hospitality": {
    icon: Plane,
    accentClassName: "bg-rose-500/14 text-rose-400",
    glowColor: "rgba(251, 113, 133, 0.10)",
  },
  "Real Estate": {
    icon: Building2,
    accentClassName: "bg-blue-400/14 text-blue-400",
    glowColor: "rgba(96, 165, 250, 0.10)",
  },
  Fashion: {
    icon: Shirt,
    accentClassName: "bg-pink-500/14 text-pink-400",
    glowColor: "rgba(244, 114, 182, 0.10)",
  },
  Gaming: {
    icon: Gamepad2,
    accentClassName: "bg-lime-400/14 text-lime-300",
    glowColor: "rgba(190, 242, 100, 0.09)",
  },
} as const;

const sectorExpertisePaths: Record<PrimarySector, string> = {
  "Ecommerce & Retail": "/expertise/ecommerce-retail",
  FMCG: "/expertise/fmcg",
  Education: "/expertise/education",
  SaaS: "/expertise/saas",
  "Entertainment & Hospitality": "/expertise/entertainment-hospitality",
  "Real Estate": "/expertise/real-estate",
  Fashion: "/expertise/fashion",
  Gaming: "/expertise/gaming",
};

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

const homepageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": buildCanonicalUrl("/#organization"),
      name: "AlphaTrack Digital",
      url: buildCanonicalUrl("/"),
      logo: buildCanonicalUrl("/apple-touch-icon.png?v=20260415a"),
      description:
        "Growth-focused marketing agency helping brands attract, convert, and scale through data-driven marketing, creative strategy, and measurable performance systems.",
      address: [
        { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
        { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "NG" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: companyProfile.contact.phoneHref.replace("tel:", ""),
        email: companyProfile.contact.email,
        contactType: "sales",
      },
    },
    {
      "@type": "WebSite",
      "@id": buildCanonicalUrl("/#website"),
      name: "AlphaTrack Digital",
      url: buildCanonicalUrl("/"),
      publisher: { "@id": buildCanonicalUrl("/#organization") },
    },
    {
      "@type": "WebPage",
      "@id": buildCanonicalUrl("/#webpage"),
      url: buildCanonicalUrl("/"),
      name: HOMEPAGE_SEO_TITLE,
      description: HOMEPAGE_SEO_DESCRIPTION,
      isPartOf: { "@id": buildCanonicalUrl("/#website") },
      about: { "@id": buildCanonicalUrl("/#organization") },
      primaryImageOfPage: buildCanonicalUrl("/social-preview.png"),
      potentialAction: {
        "@type": "ScheduleAction",
        name: BOOK_A_FREE_STRATEGY_CALL_CTA.label,
        target: buildCanonicalUrl(BOOK_A_FREE_STRATEGY_CALL_CTA.to),
      },
    },
    {
      "@type": "Service",
      "@id": buildCanonicalUrl("/#performance-marketing-service"),
      name: "Performance marketing, conversion tracking, and marketing automation",
      provider: { "@id": buildCanonicalUrl("/#organization") },
      areaServed: [
        { "@type": "Country", name: "Ghana" },
        { "@type": "Country", name: "Nigeria" },
      ],
      serviceType: primaryServices.map((service) => service.title),
      url: buildCanonicalUrl("/service"),
    },
    {
      "@type": "FAQPage",
      "@id": buildCanonicalUrl("/#homepage-faq"),
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

// --- Page ---

const Index = () => {
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const featuredBlogPosts = getFeaturedBlogPosts(3);
  const strategyCallTo = withCampaignSearch(BOOK_A_FREE_STRATEGY_CALL_CTA.to, location.search);
  const testimonialInitials = featuredTestimonial.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <SEO
        title={HOMEPAGE_SEO_TITLE}
        description={HOMEPAGE_SEO_DESCRIPTION}
        canonicalUrl="/"
        ogImageAlt="AlphaTrack Digital - Data-Driven Performance Marketing Agency"
        schema={homepageSchema}
      />

      <section className="relative z-0 flex min-h-[64svh] items-start overflow-hidden md:min-h-[80vh]">
        <div className="absolute inset-0 pointer-events-none bg-[#050812]" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute inset-0 hidden opacity-[0.028] sm:block"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "84px 84px",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.08)_0%,rgba(5,8,18,0.22)_52%,rgba(5,8,18,0.82)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,17,39,0)_0%,rgba(5,8,18,0.05)_44%,rgba(4,7,16,0.36)_76%,rgba(2,4,10,0.78)_100%)]" />
          <div className="absolute left-1/2 top-[17%] h-[15rem] w-[18rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(28,182,244,0.16)_0%,rgba(68,211,154,0.09)_40%,transparent_74%)] blur-[58px] md:top-[18%] md:h-[22rem] md:w-[36rem] md:blur-[108px]" />
          <div className="absolute left-1/2 top-[16%] h-[18rem] w-[21rem] -translate-x-1/2 rounded-full bg-[#050812]/80 blur-[70px] md:top-[18%] md:h-[26rem] md:w-[42rem] md:blur-[132px]" />
          <div className="absolute left-1/2 top-[18%] hidden h-[18rem] w-[22rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(28,182,244,0.14)_0%,rgba(68,211,154,0.08)_42%,transparent_72%)] blur-[92px] sm:block md:top-[20%] md:h-[24rem] md:w-[40rem] md:blur-[124px]" />
          <div className="absolute -left-[16%] bottom-[-8%] hidden h-[18rem] w-[18rem] rounded-full bg-[#1a67ff]/[0.18] blur-[96px] sm:block md:h-[24rem] md:w-[24rem] md:blur-[126px]" />
          <div className="absolute left-[6%] bottom-[18%] hidden h-28 w-28 rounded-full bg-secondary/[0.15] blur-[72px] sm:block md:h-40 md:w-40 md:blur-[94px]" />
          <div className="absolute -left-[6%] bottom-[12%] h-20 w-28 rounded-full bg-[radial-gradient(circle_at_center,rgba(10,70,201,0.12)_0%,rgba(28,182,244,0.06)_42%,transparent_74%)] blur-[42px] md:h-36 md:w-48 md:blur-[72px]" />
          <div className="absolute right-[1%] top-[57%] hidden h-24 w-24 rounded-full bg-[radial-gradient(circle_at_center,rgba(68,211,154,0.18)_0%,rgba(28,182,244,0.13)_34%,rgba(10,70,201,0.06)_58%,transparent_76%)] blur-[50px] sm:block md:right-[5%] md:top-[42%] md:h-32 md:w-32 md:blur-[70px]" />
          <div className="absolute right-[-6%] top-[18%] hidden h-[14rem] w-[10rem] rotate-[18deg] bg-[radial-gradient(circle_at_center,rgba(17,125,255,0.32),transparent_62%)] blur-[72px] sm:block md:h-[21rem] md:w-[14rem] md:blur-[96px]" />
          <svg
            viewBox="0 0 1600 760"
            aria-hidden="true"
            className="absolute inset-x-[-9%] bottom-[-18%] h-[78%] w-[122%] origin-bottom rotate-[8deg] opacity-75 md:inset-x-[-13%] md:bottom-[-14%] md:h-[92%] md:w-[126%] md:rotate-[7deg] md:opacity-90"
          >
            <defs>
              <linearGradient id="hero-arc-main" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A46C9" stopOpacity="0" />
                <stop offset="6%" stopColor="#0A46C9" stopOpacity="0.94" />
                <stop offset="48%" stopColor="#1CB6F4" stopOpacity="0.92" />
                <stop offset="84%" stopColor="#44D39A" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#44D39A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hero-arc-soft" x1="8%" y1="100%" x2="100%" y2="12%">
                <stop offset="0%" stopColor="#0A46C9" stopOpacity="0" />
                <stop offset="9%" stopColor="#0A46C9" stopOpacity="0.34" />
                <stop offset="50%" stopColor="#1CB6F4" stopOpacity="0.28" />
                <stop offset="82%" stopColor="#44D39A" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#44D39A" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="hero-arc-glow" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A46C9" stopOpacity="0" />
                <stop offset="9%" stopColor="#0A46C9" stopOpacity="0.42" />
                <stop offset="52%" stopColor="#1CB6F4" stopOpacity="0.3" />
                <stop offset="84%" stopColor="#44D39A" stopOpacity="0.26" />
                <stop offset="100%" stopColor="#44D39A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M-220 724 C -136 708, -44 708, 46 728 C 126 746, 206 774, 294 784 C 366 792, 434 782, 500 746"
              fill="none"
              stroke="url(#hero-arc-soft)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.18"
            />
            <path
              d="M-210 706 C -34 688, 86 696, 214 722 C 346 748, 468 792, 610 776 C 738 762, 862 682, 1004 560 C 1168 418, 1322 308, 1490 210 C 1568 164, 1632 130, 1688 110"
              fill="none"
              stroke="url(#hero-arc-glow)"
              strokeWidth="28"
              strokeLinecap="round"
              opacity="0.24"
            />
            <path
              d="M-210 706 C -34 688, 86 696, 214 722 C 346 748, 468 792, 610 776 C 738 762, 862 682, 1004 560 C 1168 418, 1322 308, 1490 210 C 1568 164, 1632 130, 1688 110"
              fill="none"
              stroke="url(#hero-arc-main)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M-182 730 C -6 714, 112 724, 246 744 C 386 766, 518 798, 660 788 C 798 778, 930 710, 1072 608 C 1228 494, 1374 386, 1518 300 C 1606 248, 1678 208, 1730 176"
              fill="none"
              stroke="url(#hero-arc-soft)"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.74"
            />
            <path
              d="M-82 690 C 24 684, 118 694, 212 714 C 308 736, 396 758, 492 760 C 580 760, 664 736, 748 692"
              fill="none"
              stroke="url(#hero-arc-soft)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeDasharray="2 10"
              opacity="0.42"
            />
            <path
              d="M1606 244 L1688 110"
              fill="none"
              stroke="url(#hero-arc-glow)"
              strokeWidth="16"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.12"
            />
            <path
              d="M1606 244 L1688 110"
              fill="none"
              stroke="url(#hero-arc-main)"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.88"
            />
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(5,8,18,0)_0%,rgba(5,8,18,0.16)_26%,rgba(5,8,18,0.68)_74%,rgba(5,8,18,0.96)_100%)] md:h-44" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/16 to-transparent" />
        </div>

        <div className="container relative mx-auto px-4 pb-4 pt-20 sm:pt-24 md:pb-10 md:pt-32 lg:px-8">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 1, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
            className="mx-auto max-w-[54rem] text-center"
          >
            <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/[0.08] px-3 py-0.5 shadow-[0_0_16px_rgba(51,204,153,0.08)] sm:mb-6 sm:gap-2 sm:px-3.5 sm:py-1 md:mb-6 md:gap-2.5 md:px-4 md:py-1.5">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="absolute hidden h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping sm:inline-flex" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary sm:h-2 sm:w-2" />
              </span>
              <span className="text-[11px] font-medium text-primary sm:text-[12.5px] md:text-sm">{companyProfile.heroEyebrow}</span>
            </div>

            <h1 className="mx-auto max-w-4xl text-[2.12rem] font-bold leading-[0.98] tracking-tight sm:text-[2.95rem] md:text-[4.05rem] lg:text-[4.95rem] xl:text-[5.3rem]">
              <span className="block">Growth should never</span>
              <span className="mt-2 block">
                be <span className="text-gradient">guesswork.</span>
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[21.5rem] text-[13px] leading-[1.9] text-muted-foreground sm:max-w-[31rem] sm:text-[14px] sm:leading-7 md:mt-6 md:max-w-[41rem] md:text-[18px] md:leading-8">
              We build the measurement, automation, and paid media systems that turn your
              marketing budget into measurable revenue. So you can see what&apos;s working,{" "}
              <span className="whitespace-nowrap">fix what isn&apos;t</span>, and scale with
              confidence.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-2.5 sm:mt-9 sm:flex-row sm:gap-3.5">
              <Button
                asChild
                size="lg"
                className="h-11 w-full max-w-[16rem] gap-1.5 rounded-lg bg-primary px-6 text-[15px] text-primary-foreground shadow-[0_0_24px_rgba(51,204,153,0.22)] transition-shadow hover:bg-primary/90 hover:shadow-[0_0_36px_rgba(0,175,239,0.18)] sm:h-12 sm:w-auto sm:max-w-none sm:px-8 sm:text-base"
              >
                <Link to={strategyCallTo}>{BOOK_A_FREE_STRATEGY_CALL_CTA.label}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 w-full max-w-[16rem] gap-1.5 rounded-lg border-white/20 px-6 text-[15px] hover:bg-white/5 sm:h-12 sm:w-auto sm:max-w-none sm:px-8 sm:text-base"
              >
                <Link to="/service">Explore Services</Link>
              </Button>
            </div>

          </motion.div>
        </div>
      </section>

      <section
        data-testid="proof-strip-section"
        className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#050812]/92 py-4 backdrop-blur-[2px] md:py-8"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(5,8,18,0.98)_0%,rgba(5,8,18,0.88)_42%,rgba(5,8,18,0)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,18,0.92)_0%,rgba(5,8,18,0.84)_18%,rgba(5,8,18,0.9)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/28 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute left-[18%] top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[90px]" />
          <div className="absolute right-[18%] top-1/2 h-36 w-36 -translate-y-1/2 rounded-full bg-secondary/[0.02] blur-[90px]" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <p className="mb-2.5 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-muted-foreground/68 sm:text-[10px]">
            {homepageProofLine}
          </p>
          <div className="mx-auto grid max-w-5xl grid-cols-3">
            {homepageProofMetrics.map((metric, i) => (
              <motion.div
                key={metric.sourceRef}
                data-testid="proof-metric"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={cn(
                  "flex flex-col items-center justify-start px-2 text-center sm:min-h-[5.1rem] sm:px-6",
                  i > 0 && "border-l border-white/[0.08]",
                )}
              >
                <p className="text-[1.22rem] font-bold leading-none text-gradient sm:text-[1.6rem] md:text-[1.95rem]">
                  {metric.value}
                </p>
                <p className="mt-1.5 flex min-h-[1rem] max-w-none items-start justify-center whitespace-nowrap text-[9px] leading-4 text-muted-foreground sm:mt-2 sm:min-h-[2rem] sm:max-w-[9.4rem] sm:whitespace-normal sm:text-[12.5px] sm:leading-5 md:max-w-[10rem]">
                  <span className="sm:hidden">{metric.compactLabel}</span>
                  <span className="hidden sm:inline">{metric.label}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-14 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-atd-blue/[0.09] blur-[95px]" />
          <div className="absolute right-[-6%] top-[18%] h-56 w-56 rounded-full bg-secondary/[0.045] blur-[105px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/24 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Services"
            title="What We Do"
            description="Tracking, paid ads, and automation that help your marketing perform better."
            width="wide"
            className="mb-6 md:mb-10"
            descriptionClassName="max-w-4xl"
          />

          <div className="mt-6 space-y-3 md:hidden">
            {primaryServices.map((service, i) => (
              <motion.div
                key={`${service.title}-mobile`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <div
                  className={cn(
                    "group flex h-full flex-col rounded-[22px] border p-4",
                    service.flagship
                      ? "border-primary/30 bg-[linear-gradient(180deg,rgba(0,51,153,0.16)_0%,rgba(0,175,239,0.04)_42%,rgba(51,204,153,0.04)_100%)] shadow-[0_18px_60px_rgba(0,51,153,0.12)]"
                      : "border-white/10 bg-white/[0.02]",
                  )}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]",
                        service.flagship
                          ? "bg-primary text-primary-foreground"
                          : "border border-white/10 bg-white/[0.04] text-muted-foreground",
                      )}
                    >
                      {service.badge}
                    </span>
                  </div>
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <service.icon className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <h3 className="text-[1.02rem] font-semibold leading-snug tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    to={service.path}
                    className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-primary transition-colors hover:text-primary/80"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn more<span className="sr-only"> about {service.title}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
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
                    "group flex h-full flex-col rounded-[24px] border p-5 transition-all duration-300 hover:-translate-y-1 md:p-7",
                    service.flagship
                      ? "border-primary/30 bg-[linear-gradient(180deg,rgba(0,51,153,0.16)_0%,rgba(0,175,239,0.04)_42%,rgba(51,204,153,0.04)_100%)] shadow-[0_18px_60px_rgba(0,51,153,0.12)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <div className="mb-5 flex items-start justify-between gap-4 md:mb-6">
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
                  </div>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] md:mb-4 md:h-11 md:w-11">
                    <service.icon className="h-5 w-5 text-primary md:h-6 md:w-6" />
                  </div>
                  <h3
                    className={cn(
                      "font-semibold leading-snug tracking-tight",
                      service.flagship
                        ? "text-[1.16rem] md:text-[1.28rem] lg:text-[1.12rem] lg:whitespace-nowrap xl:text-[1.28rem]"
                        : "text-[1.18rem] md:text-[1.35rem]",
                    )}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  <Link
                    to={service.path}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:mt-6"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn more<span className="sr-only"> about {service.title}</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 md:mt-14 md:pt-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between md:gap-4">
              <SectionIntro
                eyebrow="More Services"
                title="Other Ways We Help"
                description="Website, content, email, and search services that help your marketing work better."
                width="wide"
                className="max-w-2xl"
                titleClassName="max-w-2xl text-[1.65rem] md:text-[2.45rem]"
                descriptionClassName="max-w-2xl text-[15px] leading-7 md:text-[17px]"
              />
              <Link
                to="/service"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                View all services
              </Link>
            </div>
            <div className="relative mt-5 overflow-hidden rounded-[22px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,51,153,0.10),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(0,175,239,0.04),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0.01)_100%)] shadow-[0_16px_50px_rgba(0,8,22,0.12)] md:mt-6 md:rounded-[26px]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                {supportingServices.map((s, i) => (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className={cn(
                      i > 0 && "border-t border-white/10",
                      i < 2 && "md:border-t-0",
                      i >= 2 && "md:border-t md:border-white/10",
                      i % 2 === 1 && "md:border-l md:border-white/10",
                      i < 3 && "xl:border-t-0",
                      i >= 3 && "xl:border-t xl:border-white/10",
                      i > 0 && "xl:border-l xl:border-white/10",
                    )}
                  >
                    <Link
                      to={s.path}
                      data-testid="supporting-service-item"
                       className="group flex h-full items-center gap-3 px-4 py-3.5 transition-colors duration-300 hover:bg-white/[0.025] md:flex-col md:items-stretch md:gap-0 md:px-6 md:py-5"
                      >
                       <div className="flex shrink-0 items-center justify-between gap-3 md:mb-4">
                         <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] md:h-10 md:w-10">
                           <s.icon className="h-4.5 w-4.5 text-primary md:h-5 md:w-5" />
                          </div>
                        </div>
                       <div className="min-w-0 flex-1 md:flex md:flex-col">
                         <div className="flex items-start justify-between gap-3">
                           <h4 className="text-[0.94rem] font-semibold leading-snug md:text-[1.02rem]">{s.title}</h4>
                         </div>
                         <p className="mt-1 flex-1 text-[12.5px] leading-5 text-muted-foreground md:mt-3 md:text-sm md:leading-7">
                           {s.description}
                         </p>
                       </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="industries-section"
        data-testid="industries-section"
        className="relative scroll-mt-24 overflow-hidden border-t border-white/10 py-14 md:py-24"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-8%] top-8 h-72 w-72 rounded-full bg-secondary/[0.035] blur-[120px]" />
          <div className="absolute right-[10%] bottom-6 h-56 w-56 rounded-full bg-primary/[0.03] blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: "88px 88px",
            }}
          />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Expertise"
            title="Who We Work With"
            description="We work with brands in ecommerce, FMCG, education, SaaS, hospitality, real estate, fashion, and gaming."
            width="wide"
            className="mb-6 md:mb-10"
            descriptionClassName="max-w-3xl"
          />

          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-4">
              {primarySectors.map((sector, index) => {
                const visual = sectorVisuals[sector];

                return (
                <motion.div
                  key={sector}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  <Link
                    to={sectorExpertisePaths[sector]}
                    data-testid="industry-card"
                    aria-label={`View ${sector} expertise`}
                    className="group relative flex h-full min-h-[4.5rem] items-center gap-2.5 overflow-hidden rounded-[16px] border border-white/[0.075] bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.012)_100%)] p-3 shadow-[0_10px_26px_rgba(0,0,0,0.09)] transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-white/[0.13] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 md:block md:min-h-0 md:rounded-[20px] md:p-5 md:shadow-[0_12px_34px_rgba(0,0,0,0.10)]"
                  >
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035] transition-[border-color] duration-300 group-hover:border-white/[0.16] md:mb-4 md:h-12 md:w-12 md:rounded-2xl", visual.accentClassName)}>
                      <visual.icon className="h-4 w-4 md:h-6 md:w-6" />
                    </div>
                    <h3 className="text-[0.86rem] font-semibold leading-snug tracking-tight text-foreground/92 md:mb-1.5 md:text-[1.05rem]">
                      {sector}
                    </h3>
                    <p className="hidden text-[0.85rem] leading-relaxed text-muted-foreground/70 md:block">
                      {sectorSummaries[sector]}
                    </p>
                  </Link>
                </motion.div>
              )})}
          </div>

          <div className="mt-7 flex justify-center md:mt-9">
            <p className="max-w-[22rem] text-center text-sm leading-6 text-muted-foreground/60 sm:max-w-none">
              Don't see your industry?{" "}
              <Link
                to="/contact-us"
                className="font-medium text-foreground/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
              >
                Let's talk
              </Link>{" "}
              — we've likely worked in it.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 py-14 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-12 h-64 w-[55%] -translate-x-1/2 rounded-full bg-atd-blue/[0.10] blur-[115px]" />
          <div className="absolute inset-x-[14%] top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Process"
            title="How We Work"
            description="We keep the work clear from the first call to reporting."
            width="wide"
            className="mb-6 md:mb-10"
            descriptionClassName="max-w-3xl"
          />
          <div className="relative mt-6 rounded-[30px] border border-white/[0.06] bg-[radial-gradient(circle_at_top_center,rgba(0,51,153,0.11),transparent_40%),radial-gradient(circle_at_30%_0%,rgba(0,175,239,0.05),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)] px-3 py-4 shadow-[0_16px_48px_rgba(0,8,22,0.12)] sm:px-4 sm:py-5 lg:mt-8 lg:px-5 lg:py-7">
          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute inset-x-[9%] top-2">
              <div className="absolute inset-x-0 top-[1.85rem] h-px bg-white/[0.10]" />
              <div className="relative flex justify-between">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex flex-col items-center">
                    <span className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/75">
                      {step.step}
                    </span>
                    <span className="h-3 w-3 rounded-full border border-primary/35 bg-background shadow-[0_0_0_4px_rgba(6,10,12,0.65)]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-4">
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
                  <div className="flex h-full w-full flex-col rounded-[26px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.012)_100%)] p-5 shadow-[0_14px_40px_rgba(0,0,0,0.14)]">
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">
                          Step {step.step}
                        </p>
                        <h3 className="mt-3 text-[1.18rem] font-semibold">{step.title}</h3>
                      </div>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                        <step.icon className="h-5 w-5 text-primary/85" />
                      </div>
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-3 lg:hidden">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                data-testid="process-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="relative"
              >
                <div className="flex h-full flex-col rounded-[20px] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.012)_100%)] p-3.5 shadow-[0_12px_34px_rgba(0,0,0,0.12)]">
                  <div>
                    <span className="inline-flex rounded-full border border-primary/25 bg-primary/[0.08] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      {step.step}
                    </span>
                    <h3 className="mt-2 whitespace-nowrap text-[clamp(0.78rem,3.7vw,0.96rem)] font-semibold leading-snug">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 line-clamp-3 flex-1 text-[12.5px] leading-5 text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="growth-stack-heading"
        data-testid="growth-stack-section"
        className="border-t border-white/10 bg-white/[0.01] py-12 md:py-16"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Platforms"
            title="Tools We Use"
            description="A few tools we use for tracking, ads, and automation."
            width="wide"
            className="mb-5 md:mb-6"
            titleClassName="max-w-3xl"
            descriptionClassName="max-w-4xl text-sm md:text-[15px]"
            titleId="growth-stack-heading"
          />

          <div className="space-y-4 md:hidden">
            {toolCollections.map((group) => (
              <div
                key={`${group.title}-mobile`}
                className="pb-4 last:pb-0 [&+&]:border-t [&+&]:border-white/[0.08] [&+&]:pt-4"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                    {group.title}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">
                    {group.description}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-white/[0.06] pt-3">
                  {group.items.map((tool) => (
                    <span
                      key={tool.name}
                      className="flex min-h-[1.75rem] items-center gap-2 text-[11.5px] text-foreground/88"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                        <img
                          src={tool.icon}
                          alt=""
                          className="block h-full w-full max-h-full max-w-full object-contain opacity-95"
                          loading="lazy"
                          decoding="async"
                          width={20}
                          height={20}
                        />
                      </span>
                      <span className="min-w-0 leading-4">{tool.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="hidden border-y border-white/[0.08] md:block">
            <div className="md:grid md:grid-cols-3 md:gap-0 lg:grid-cols-[1.1fr_0.95fr_0.95fr]">
              {toolCollections.map((group, index) => (
                <div
                  key={group.title}
                  data-testid="growth-stack-card"
                  className={cn(
                    "flex h-full flex-col py-5",
                    index === 0 ? "pr-6" : "md:border-l md:border-white/[0.08] md:px-6",
                  )}
                >
                  <div className="min-h-[70px]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
                      {group.title}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">{group.description}</p>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/[0.06] pt-4">
                    {group.items.map((tool) => (
                      <span
                        key={tool.name}
                        className="flex min-h-[1.8rem] items-center gap-2.5 text-[12.5px] text-foreground/88"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
                          <img
                            src={tool.icon}
                            alt=""
                            className="block h-full w-full max-h-full max-w-full object-contain opacity-95"
                            loading="lazy"
                            decoding="async"
                            width={20}
                            height={20}
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

        </div>
      </section>

      <section
        data-testid="testimonial-section"
        className="relative overflow-hidden border-t border-white/10 py-8 md:py-16"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[12%] top-12 h-44 w-44 rounded-full bg-secondary/[0.03] blur-[100px]" />
          <div className="absolute right-[10%] bottom-8 h-40 w-40 rounded-full bg-primary/[0.03] blur-[100px]" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Testimonials"
            title="What Our Clients Say"
            align="center"
            width="wide"
            className="mb-4 md:mb-8"
            titleClassName="mx-auto max-w-3xl text-[1.7rem] md:text-[2.4rem]"
          />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-[36rem] rounded-[22px] border border-primary/35 bg-[linear-gradient(180deg,rgba(255,255,255,0.022)_0%,rgba(255,255,255,0.01)_100%)] p-3.5 shadow-[0_14px_36px_rgba(0,8,22,0.12)] md:max-w-[50rem] md:rounded-[24px] md:p-7"
          >
            <div className="flex justify-end">
              <Quote className="h-6 w-6 text-primary/20 md:h-8 md:w-8" />
            </div>
            <blockquote className="-mt-1 max-w-[34rem] text-[0.88rem] leading-6 text-foreground/86 md:max-w-[42rem] md:text-[1.08rem] md:leading-8">
              "{featuredTestimonial.quote}"
            </blockquote>
            <div className="mt-3 border-t border-white/[0.08] pt-3 md:mt-6 md:pt-4">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/[0.12] text-[11px] font-semibold text-primary md:h-9 md:w-9 md:text-xs">
                  {testimonialInitials}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-foreground md:text-[15px]">{featuredTestimonial.name}</p>
                  <p className="mt-0.5 text-[13px] text-muted-foreground md:text-sm">{featuredTestimonial.title}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/10 py-12 md:py-20">
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
               className="mb-5 flex flex-col items-start gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4"
            >
              <SectionIntro
                eyebrow="Insights"
                title="From Our Blog"
                description="Simple, practical articles on tracking, paid ads, and automation."
                width="wide"
                titleClassName="text-3xl md:text-[2.4rem]"
                descriptionClassName="max-w-2xl text-sm"
              />
              <Link
                to="/blog"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/[0.10]"
              >
                View all insights
              </Link>
            </motion.div>
            <div className="space-y-3 md:hidden">
              {featuredBlogPosts[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                >
                  <Link
                    to={`/blog/${featuredBlogPosts[0].slug}`}
                    className="group block overflow-hidden rounded-[20px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)] p-4"
                  >
                    <div className="relative mb-3 overflow-hidden rounded-[16px] border border-white/10 bg-black/20">
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                      <div className="h-24">
                        <BlogImage src={featuredBlogPosts[0].image} alt={featuredBlogPosts[0].title} />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/65">
                      <span>{featuredBlogPosts[0].category}</span>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/35" />
                      <span>{featuredBlogPosts[0].readTime}</span>
                    </div>
                    <h3 className="mt-3 text-[1rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {featuredBlogPosts[0].title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-6 text-muted-foreground">
                      {featuredBlogPosts[0].excerpt}
                    </p>
                  </Link>
                </motion.div>
              )}

              <div className="space-y-2">
                {featuredBlogPosts.slice(1).map((post, i) => (
                  <motion.div
                    key={`${post.slug}-mobile`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.08 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex items-start gap-3 rounded-[18px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)] p-3"
                    >
                      <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-[12px] border border-white/10 bg-black/20">
                        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        <BlogImage src={post.image} alt={post.title} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/65">
                          <span>{post.category}</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/35" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="mt-2 line-clamp-2 text-[0.95rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hidden overflow-hidden rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)] shadow-[0_16px_44px_rgba(0,0,0,0.11)] md:block">
              <div className="md:grid md:grid-cols-3 md:divide-x md:divide-y-0">
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
                      className="group flex h-full flex-col px-5 py-5 transition-colors duration-200 hover:bg-white/[0.02] lg:px-5"
                    >
                      <div className="relative mb-4 overflow-hidden rounded-[18px] border border-white/10 bg-black/20">
                        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                        <div className="h-28">
                          <BlogImage src={post.image} alt={post.title} />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-muted-foreground/65">
                        <span>{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/35" />
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="mt-4 text-[1.08rem] font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-muted-foreground">
                        {post.excerpt}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-primary/90">
                        Read more
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion
        items={faqs}
        title="Frequently Asked Questions"
        description="A few practical answers before you request an audit."
        eyebrow="FAQ"
        variant="minimal"
        density="compact"
        defaultOpenItem={0}
        contentClassName="max-w-[46rem]"
      />

      <CTASection
        title={
          <>
            Ready to Know
            <br />
            Exactly What&apos;s Driving Your <span className="text-gradient">Growth</span>?
          </>
        }
        description="Book a free 15-minute strategy call. We will review your setup, share what we see, and give you a clear next step."
        secondaryCta={null}
        variant="hero-close"
      />
    </>
  );
};

export default Index;

