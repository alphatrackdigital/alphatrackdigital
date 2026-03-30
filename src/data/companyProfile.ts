export const companyProfile = {
  heroEyebrow: "Data-Driven Marketing, Creative Strategy & Growth Systems",
  heroTitle: "Helping brands grow with data-driven marketing and growth systems.",
  shortDescription:
    "AlphaTrack Digital is a growth-focused marketing agency helping brands attract, convert, and scale through performance marketing, creative strategy, and marketing automation.",
  longDescription:
    "We combine data, creativity, and technology to help businesses attract the right audience, improve performance, and scale with confidence.",
  founderNote:
    "At AlphaTrack Digital, we believe growth should never be guesswork. Brands deserve marketing that is strategic, measurable, and built for long-term impact.",
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
    title: "Founder, AlphaTrack Digital",
    email: "chris@alphatrack.digital",
    phoneDisplay: "+233 24 556 2676",
    phoneHref: "tel:+233245562676",
    websiteDisplay: "alphatrack.digital",
    websiteUrl: "https://alphatrack.digital",
  },
  contact: {
    email: "chris@alphatrack.digital",
    phoneDisplay: "+233 24 556 2676",
    phoneHref: "tel:+233245562676",
    websiteDisplay: "alphatrack.digital",
    websiteUrl: "https://alphatrack.digital",
    responseWindow: "Reply within 1 business day",
  },
} as const;

export const ctmaFramework = [
  {
    title: "Conversion Tracking",
    description:
      "We help set up tracking across key touchpoints so you know exactly what drives revenue. No guesswork, only signal.",
    details: ["GA4", "GTM", "Meta Pixel", "CRM"],
  },
  {
    title: "Traffic & Paid Media",
    description:
      "Google Ads, Meta, YouTube, and programmatic campaigns built for efficiency. We optimise for CAC and ROAS, not vanity metrics.",
    details: ["Google Ads", "Meta", "YouTube", "Programmatic"],
  },
  {
    title: "Marketing Automation",
    description:
      "We build lifecycle journeys from lead capture to retention using automation platforms that nurture prospects into loyal customers.",
    details: ["Lead nurture", "CRM automation", "Retention flows"],
  },
  {
    title: "Analytics & Insights",
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
] as const;

export const whyChoosePoints = [
  {
    title: "Strategy-Led Execution",
    description:
      "We lead with insight. Every campaign is grounded in a full understanding of your market, audience, and business goals before a single ad goes live.",
  },
  {
    title: "Measurement-First by Default",
    description:
      "We instrument tracking before we spend. Every engagement begins with a conversion tracking audit, ensuring your data is clean and your decisions are accurate.",
  },
  {
    title: "Full-Funnel Thinking",
    description:
      "We do not just acquire, we nurture. Our Track → Acquire → Nurture model ensures growth compounds over time, not just in bursts.",
  },
] as const;

export const engagementModels = [
  {
    label: "Starter",
    title: "Audit & Strategy Sprint",
    timeframe: "2–4 weeks",
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
    timeframe: "4–12 weeks",
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
