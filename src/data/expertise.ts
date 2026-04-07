export interface ExpertiseServiceFocus {
  title: string;
  description: string;
  path: string;
}

export interface ExpertisePage {
  slug: string;
  name: string;
  heroTitle: string;
  heroDescription: string;
  challenges: string[];
  serviceFocus: ExpertiseServiceFocus[];
  outcomes: string[];
}

export const expertisePages: ExpertisePage[] = [
  {
    slug: "saas",
    name: "SaaS",
    heroTitle: "SaaS marketing that turns interest into qualified pipeline.",
    heroDescription:
      "We help SaaS teams improve tracking, paid acquisition, landing journeys, and lead follow-up so growth is easier to measure and scale.",
    challenges: [
      "It is hard to see which channels are driving demos, trials, and pipeline.",
      "Paid campaigns bring traffic, but not enough qualified leads.",
      "Good leads drop off between the first click, the form, and sales follow-up.",
    ],
    serviceFocus: [
      {
        title: "Tracking that connects signups to revenue",
        description:
          "Clear tracking across signups, demos, trials, and CRM stages so the team can see what is really driving growth.",
        path: "/service/conversion-tracking",
      },
      {
        title: "Paid acquisition built for qualified demand",
        description:
          "Search, social, and retargeting campaigns focused on bringing in the right traffic instead of vanity volume.",
        path: "/service/paid-media",
      },
      {
        title: "Follow-up that keeps pipeline moving",
        description:
          "Lifecycle emails, CRM automations, and nurture flows that keep leads engaged after the first touch.",
        path: "/service/marketing-automation",
      },
    ],
    outcomes: [
      "Clearer demo and trial attribution",
      "Better lead quality from paid campaigns",
      "Stronger follow-up between marketing and sales",
    ],
  },
  {
    slug: "education",
    name: "Education",
    heroTitle: "Education marketing that makes enrolment demand easier to track.",
    heroDescription:
      "We help schools, training brands, and education teams improve tracking, campaign performance, and enquiry follow-up so marketing supports enrolment goals more clearly.",
    challenges: [
      "Leads come in from multiple channels, but enrolment reporting stays unclear.",
      "Campaign windows are seasonal and need to perform quickly.",
      "Parent and student enquiries are not followed up consistently.",
    ],
    serviceFocus: [
      {
        title: "Tracking that shows where enrolment leads come from",
        description:
          "Better visibility across ads, landing pages, forms, and CRM touchpoints so the team knows what is driving enquiries.",
        path: "/service/conversion-tracking",
      },
      {
        title: "Campaigns built for applications and enquiries",
        description:
          "Paid media that focuses on lead quality, efficient acquisition, and stronger campaign performance during peak periods.",
        path: "/service/paid-media",
      },
      {
        title: "Follow-up that keeps prospects warm",
        description:
          "Email and CRM journeys that help schools respond faster and guide prospects from first enquiry to application.",
        path: "/service/marketing-automation",
      },
    ],
    outcomes: [
      "Clearer source reporting for enquiries",
      "Better campaign efficiency during intake periods",
      "Faster, more consistent lead follow-up",
    ],
  },
  {
    slug: "ecommerce-retail",
    name: "Ecommerce & Retail",
    heroTitle: "Ecommerce marketing that turns traffic into measurable sales.",
    heroDescription:
      "We help ecommerce and retail brands tighten tracking, improve paid media performance, and build follow-up systems that support repeat purchases.",
    challenges: [
      "Traffic numbers look good, but it is hard to see which channels are really driving sales.",
      "Ad spend leaks through weak landing pages, product journeys, or poor retargeting.",
      "Customers buy once, then disappear without any structured follow-up.",
    ],
    serviceFocus: [
      {
        title: "Tracking that shows which campaigns drive purchases",
        description:
          "Clear ecommerce tracking across ads, website actions, and reporting so performance can be tied to sales instead of assumptions.",
        path: "/service/conversion-tracking",
      },
      {
        title: "Paid campaigns built to improve return on spend",
        description:
          "Campaign management focused on product demand, better audience targeting, and stronger conversion efficiency.",
        path: "/service/paid-media",
      },
      {
        title: "Retention systems that bring customers back",
        description:
          "Email, CRM, and automation journeys for abandoned carts, post-purchase follow-up, and repeat demand.",
        path: "/service/marketing-automation",
      },
    ],
    outcomes: [
      "Clearer purchase attribution",
      "Better return on paid campaigns",
      "Stronger retention and repeat sales",
    ],
  },
  {
    slug: "fmcg",
    name: "FMCG",
    heroTitle: "FMCG marketing that connects campaign activity to real demand.",
    heroDescription:
      "We help FMCG and consumer brands improve campaign measurement, paid media coordination, and follow-up systems so launches and growth pushes are easier to manage.",
    challenges: [
      "Awareness campaigns are active, but downstream performance is hard to measure clearly.",
      "Brand launches need coordinated media and reporting across several touchpoints.",
      "Teams need a clearer view of what is working before the next campaign burst starts.",
    ],
    serviceFocus: [
      {
        title: "Measurement that gives clearer campaign visibility",
        description:
          "Tracking and reporting setups that help consumer brands understand reach, response, and demand signals more clearly.",
        path: "/service/conversion-tracking",
      },
      {
        title: "Media execution for launches and growth pushes",
        description:
          "Paid media support for launches, awareness bursts, and demand-building campaigns across the right channels.",
        path: "/service/paid-media",
      },
      {
        title: "Follow-up systems that support retail and consumer journeys",
        description:
          "Automation and CRM workflows that help capture demand and keep audiences engaged after the initial campaign.",
        path: "/service/marketing-automation",
      },
    ],
    outcomes: [
      "Better launch reporting",
      "Clearer channel performance",
      "Stronger coordination across campaigns",
    ],
  },
  {
    slug: "entertainment-hospitality",
    name: "Entertainment & Hospitality",
    heroTitle: "Hospitality marketing that helps more visits, bookings, and repeat demand happen.",
    heroDescription:
      "We help hospitality and entertainment brands improve campaign visibility, booking-focused media performance, and follow-up systems that keep demand moving.",
    challenges: [
      "Promotions move fast, but reporting is often too slow or too shallow.",
      "It is hard to see which campaigns are driving visits, enquiries, or bookings.",
      "Retargeting and follow-up are inconsistent after the first interaction.",
    ],
    serviceFocus: [
      {
        title: "Tracking that gives clearer booking and visit visibility",
        description:
          "Measurement setups that help teams see which campaigns and channels are leading to real commercial activity.",
        path: "/service/conversion-tracking",
      },
      {
        title: "Campaigns built for launches, events, and occupancy periods",
        description:
          "Paid media support for promotions, seasonal windows, and audience growth across the channels that matter.",
        path: "/service/paid-media",
      },
      {
        title: "Follow-up that keeps demand active after the first click",
        description:
          "Email and CRM workflows for retargeting, re-engagement, and repeat demand across future visits or offers.",
        path: "/service/marketing-automation",
      },
    ],
    outcomes: [
      "Clearer campaign-to-booking visibility",
      "Better performance during key demand windows",
      "Stronger repeat engagement",
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    heroTitle: "Real estate marketing that helps you track leads and improve follow-up.",
    heroDescription:
      "We help real estate teams improve lead-source visibility, paid media performance, and follow-up systems so marketing supports serious enquiries more effectively.",
    challenges: [
      "Leads arrive from many channels, but it is hard to know which source is producing quality enquiries.",
      "Marketing and sales handoff is often too slow or too unclear.",
      "Budget goes into lead generation without enough visibility into what converts.",
    ],
    serviceFocus: [
      {
        title: "Tracking that shows which channels are driving real enquiries",
        description:
          "Clear visibility across ad clicks, forms, CRM stages, and reporting so teams can trust the data behind lead generation.",
        path: "/service/conversion-tracking",
      },
      {
        title: "Paid campaigns focused on better lead quality",
        description:
          "Campaigns built to attract stronger enquiries and reduce wasted spend across property marketing pushes.",
        path: "/service/paid-media",
      },
      {
        title: "Follow-up systems that help leads move faster",
        description:
          "Automation and CRM workflows that support quicker responses and more consistent lead handling after the first enquiry.",
        path: "/service/marketing-automation",
      },
    ],
    outcomes: [
      "Clearer lead-source reporting",
      "Better quality enquiries from paid media",
      "Stronger follow-up after the first contact",
    ],
  },
];

export const getExpertiseBySlug = (slug: string) =>
  expertisePages.find((page) => page.slug === slug);
