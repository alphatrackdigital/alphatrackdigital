export const companyProfile = {
  heroEyebrow: "Measurement-First Digital Growth Agency",
  heroTitle: "Helping brands grow with data-driven marketing and growth systems.",
  shortDescription:
    "AlphaTrack Digital is a growth-focused marketing agency helping brands attract, convert, and scale through performance marketing, creative strategy, and marketing automation.",
  longDescription:
    "We combine data, creativity, and technology to help businesses attract the right audience, improve performance, and scale with confidence.",
  founderNote:
    "At AlphaTrack Digital, we believe marketing should always be accountable. Brands deserve systems that are strategic, measurable, and built for long-term impact.",
  established: "Established in 2022 and incorporated in 2023.",
  vision: "To shape future-ready brands through bold ideas.",
  mission:
    "To help brands grow through data-driven marketing, creative strategy, and measurable performance systems.",
  coreValues: [
    "Integrity",
    "Transparency",
    "Innovation",
    "Excellence",
    "Client-Centric Service",
  ],
  founder: {
    name: "Chris Chukwuma",
    title: "Founder & CEO, AlphaTrack Digital",
    email: "chris@alphatrack.digital",
    phoneDisplay: "+233 24 556 2676",
    phoneHref: "tel:+233245562676",
    websiteDisplay: "alphatrack.digital",
    websiteUrl: "https://alphatrack.digital",
  },
  contact: {
    email: "info@alphatrack.digital",
    phoneDisplay: "+233 530 985 334 (Ghana)",
    phoneHref: "tel:+233530985334",
    secondaryPhoneDisplay: "+234 806 199 2748 (Nigeria)",
    secondaryPhoneHref: "tel:+2348061992748",
    websiteDisplay: "alphatrack.digital",
    websiteUrl: "https://alphatrack.digital",
    responseWindow: "Reply within 3 business days",
  },
} as const;

export const ctmaFramework = [
  {
    title: "Conversion Tracking",
    summary: "Clean attribution before bigger bets.",
    description:
      "We help set up tracking across key touchpoints so you know exactly what drives revenue. No guesswork, only signal.",
    details: ["GA4", "GTM", "Meta Pixel", "CRM"],
  },
  {
    title: "Traffic & Paid Media",
    summary: "Channel execution built around efficiency, not vanity.",
    description:
      "Google Ads, Meta, YouTube, and programmatic campaigns built for efficiency. We optimise for CAC and ROAS, not vanity metrics.",
    details: ["Google Ads", "Meta", "YouTube", "Programmatic"],
  },
  {
    title: "Marketing Automation",
    summary: "Lead follow-up and retention flows that keep momentum moving.",
    description:
      "We build lifecycle journeys from lead capture to retention using automation platforms that nurture prospects into loyal customers.",
    details: ["Lead nurture", "CRM automation", "Retention flows"],
  },
  {
    title: "Analytics & Insights",
    summary: "Reporting leaders can read quickly and act on with confidence.",
    description:
      "Dashboards, attribution models, and performance reporting that translate data into decisions executives can act on.",
    details: ["Dashboards", "Attribution", "Performance reporting"],
  },
] as const;

export const valueChain = [
  {
    title: "Track",
    summary: "Measure everything first.",
    bullets: [
      "Set up conversion tracking",
      "Set up GA4 + GTM",
      "Define KPIs and attribution",
      "Baseline performance audit",
    ],
  },
  {
    title: "Acquire",
    summary: "Drive qualified demand.",
    bullets: [
      "Paid media strategy",
      "Creative development",
      "Campaign launch and testing",
      "Audience targeting and optimisation",
    ],
  },
  {
    title: "Nurture",
    summary: "Convert and retain.",
    bullets: [
      "Lead nurturing flows",
      "Email and CRM automation",
      "Retargeting sequences",
      "Retention and loyalty loops",
    ],
  },
] as const;

export const tractionMetrics = [
  {
    value: "6.2M+",
    label: "Total campaign impressions",
    note: "Performance milestones across client campaigns.",
  },
  {
    value: "278K+",
    label: "Video views delivered",
    note: "Scaled through awareness and conversion-led media campaigns.",
  },
  {
    value: "55%",
    label: "Peak view-to-visit rate",
    note: "A benchmark outcome from hospitality campaign delivery.",
  },
  {
    value: "83",
    label: "Direct lead conversions",
    note: "Captured in an education campaign focused on qualified demand.",
  },
  {
    value: "4",
    label: "Countries targeted",
    note: "Campaign execution across Ghana, Nigeria, the UK, and the US.",
  },
] as const;

export const primarySectors = [
  "Ecommerce & Retail",
  "FMCG",
  "Education",
  "SaaS",
  "Entertainment & Hospitality",
  "Real Estate",
  "Fashion",
  "Gaming",
] as const;

export type PrimarySector = (typeof primarySectors)[number];

export const sectorSummaries: Record<PrimarySector, string> = {
  "Ecommerce & Retail":
    "Clearer ROAS visibility across campaigns, landing pages, and retention.",
  FMCG:
    "Awareness, traffic, and sell-through reporting tied back to one decision view.",
  Education:
    "Lead generation built around intent, qualification, and faster follow-up.",
  SaaS:
    "Measurement, nurture, and paid acquisition aligned to pipeline quality.",
  "Entertainment & Hospitality":
    "Creative campaigns paired with practical reporting for launches and bookings.",
  "Real Estate":
    "Lead capture and remarketing systems that keep demand moving through the funnel.",
  Fashion:
    "Campaign tracking, launch support, and retention journeys for style-led brands.",
  Gaming:
    "Audience growth, launch campaigns, and community funnels tied to clearer reporting.",
};

export const whyChoosePoints = [
  {
    title: "Strategy-Led Execution",
    description:
      "We start with business goals, not random tactics. That keeps the work focused on what matters most.",
  },
  {
    title: "Measurement-First by Default",
    description:
      "We fix tracking before we scale spend, so decisions are based on clean data instead of guesswork.",
  },
  {
    title: "Full-Funnel Thinking",
    description:
      "We connect tracking, paid media, and follow-up so growth can build over time instead of stopping at the first click.",
  },
] as const;

export const engagementModels = [
  {
    label: "Starter",
    title: "Audit & Strategy Sprint",
    timeframe: "2-4 weeks",
    idealFor: "New brands, re-launches, or any business unsure where to start.",
    includes: [
      "Full conversion tracking audit",
      "Channel performance diagnosis",
      "90-day growth roadmap",
      "Platform and tool recommendations",
      "1 strategy presentation",
    ],
  },
  {
    label: "Growth",
    title: "Performance Retainer",
    timeframe: "3-month minimum",
    idealFor: "Brands ready to invest in sustained, compounding digital growth.",
    includes: [
      "Full CTMA implementation",
      "Paid media management",
      "Monthly strategy reviews",
      "Weekly performance reports",
      "Creative support included",
    ],
  },
  {
    label: "Project",
    title: "Campaign Activation",
    timeframe: "4-12 weeks",
    idealFor: "Defined launches, growth pushes, or execution-heavy campaign windows.",
    includes: [
      "Campaign strategy and setup",
      "Full creative brief and execution",
      "Paid media management",
      "Post-campaign analysis",
      "Results report and learnings",
    ],
  },
] as const;

export const nextSteps = [
  "Book a Free Strategy Call",
  "Receive Your Custom Proposal",
  "Agree on Scope and Timeline",
  "Project Kick-Off",
] as const;

export const featuredTestimonial = {
  quote:
    "Working with AlphaTrack Digital Limited was an excellent experience. They delivered a sleek, modern, and highly functional website right on schedule. Edits were handled quickly, communication was seamless, and the service was truly top notch. Would definitely recommend!",
  name: "Courtney Quist-Therson",
  title: "CEO & Founder, Pearl House Ghana",
} as const;
