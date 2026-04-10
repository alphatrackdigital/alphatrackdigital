import type { FAQItem } from "@/components/shared/FAQAccordion";

export interface HeroSnapshotItem {
  label: string;
  value: string;
}

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
  heroSnapshot: HeroSnapshotItem[];
  challenges: string[];
  serviceFocus: ExpertiseServiceFocus[];
  outcomes: string[];
  idealFor: string[];
  faqs: FAQItem[];
}

export const expertisePages: ExpertisePage[] = [
  {
    slug: "saas",
    name: "SaaS",
    heroTitle: "SaaS marketing that turns interest into qualified pipeline.",
    heroDescription:
      "We help SaaS teams improve tracking, paid acquisition, landing journeys, and lead follow-up so growth is easier to measure and scale.",
    heroSnapshot: [
      {
        label: "Pipeline Clarity",
        value: "Connect signups, demos, and trials to the campaigns that generated them — no more guessing what's driving pipeline.",
      },
      {
        label: "Paid Acquisition",
        value: "Search, social, and retargeting built to bring in qualified demand, not just traffic volume.",
      },
      {
        label: "Lead Follow-Up",
        value: "Lifecycle emails and CRM automations that keep prospects warm from first click to closed deal.",
      },
    ],
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
    idealFor: [
      "You're running paid media but can't trace which campaigns drive demos or trials",
      "Your MQL-to-SQL conversion is weak and follow-up is inconsistent",
      "You want to scale paid spend but need cleaner data before increasing budget",
      "Your team is growing and needs a measurement foundation before the next round",
    ],
    faqs: [
      {
        question: "How quickly can you get tracking in place for a SaaS product?",
        answer:
          "For most SaaS setups we can complete a full GA4 and GTM implementation with CRM event tracking within two to three weeks. More complex multi-product environments take longer, but we start with a clear measurement plan so you know exactly what gets built and when.",
      },
      {
        question: "Do you work with early-stage SaaS teams or only established products?",
        answer:
          "Both. Early-stage teams benefit most from getting tracking right from the start — it prevents the painful retroactive cleanup many fast-growing companies face. Established products often come to us to fix attribution gaps or rebuild paid acquisition efficiency after plateau periods.",
      },
      {
        question: "Can you help with both product-led and sales-led growth models?",
        answer:
          "Yes. For PLG, we focus on product event tracking, trial conversion flows, and lifecycle automation. For sales-led, the emphasis is on CRM integration, lead scoring, and handoff automation between marketing and sales. Many SaaS teams operate in a hybrid model and we support that too.",
      },
      {
        question: "What paid channels do you run for SaaS companies?",
        answer:
          "Primarily Google Search for high-intent demand capture, LinkedIn for enterprise and B2B SaaS audience targeting, and Meta or retargeting for nurturing prospects already in your funnel. Channel mix depends on your ICP, ACV, and where your buyers actually research solutions.",
      },
      {
        question: "How do you handle attribution across long SaaS sales cycles?",
        answer:
          "We set up multi-touch attribution using GA4 and your CRM so you can see the full journey from first ad click to closed deal, even when the cycle spans weeks or months. We also build reporting dashboards that give both marketing and sales a shared view of pipeline by source.",
      },
    ],
  },
  {
    slug: "education",
    name: "Education",
    heroTitle: "Education marketing that makes enrolment demand easier to track.",
    heroDescription:
      "We help schools, training brands, and education teams improve tracking, campaign performance, and enquiry follow-up so marketing supports enrolment goals more clearly.",
    heroSnapshot: [
      {
        label: "Enrolment Visibility",
        value: "Know exactly which campaigns, channels, and touchpoints are driving enquiries and applications.",
      },
      {
        label: "Seasonal Campaigns",
        value: "Paid media built to perform during intake windows and application deadlines when demand is highest.",
      },
      {
        label: "Enquiry Follow-Up",
        value: "Automated journeys that respond to prospects faster and guide them from first enquiry to enrolment.",
      },
    ],
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
    idealFor: [
      "You're running ads for open days or intake periods but can't measure which drive actual applications",
      "Your enquiry response time is slow and prospects go cold before follow-up happens",
      "You have multiple programmes and need clearer data on which ones attract the strongest demand",
      "You want to reduce cost-per-enquiry without cutting reach during key enrolment windows",
    ],
    faqs: [
      {
        question: "Do you work with schools, universities, or private training providers?",
        answer:
          "All three. Our tracking and campaign work applies across K-12 schools, higher education institutions, vocational training providers, and ed-tech platforms. The fundamentals — clear attribution, efficient paid acquisition, and consistent follow-up — are the same across these contexts.",
      },
      {
        question: "How do you handle the seasonal nature of education marketing?",
        answer:
          "We structure campaigns around your intake calendar. That means building audience lists in advance, running awareness activity early, then shifting to direct-response conversion campaigns as application deadlines approach. We also set up retargeting so prospects who engaged earlier get a timely nudge.",
      },
      {
        question: "Can you help us track enquiries that come through multiple forms and channels?",
        answer:
          "Yes. We consolidate tracking across your website forms, landing pages, phone call tracking, and any CRM or admissions system you use so every lead has a clear source attributed to it. This is often the first thing we fix because it affects every other decision downstream.",
      },
      {
        question: "What does your enquiry automation setup involve?",
        answer:
          "We build email sequences triggered by form submissions, configure lead scoring based on programme interest and engagement, and set up CRM workflows that alert admissions staff when a prospect shows high intent. The goal is to reduce manual follow-up effort while improving response speed and consistency.",
      },
      {
        question: "How long before an intake period should we start working with you?",
        answer:
          "Ideally eight to twelve weeks before your main intake period opens. This gives enough time to set up tracking, build campaign structure, warm audiences, and have follow-up automation ready before the high-demand window begins. Starting later is still worthwhile but compresses the setup timeline.",
      },
    ],
  },
  {
    slug: "ecommerce-retail",
    name: "Ecommerce & Retail",
    heroTitle: "Ecommerce marketing that turns traffic into measurable sales.",
    heroDescription:
      "We help ecommerce and retail brands tighten tracking, improve paid media performance, and build follow-up systems that support repeat purchases.",
    heroSnapshot: [
      {
        label: "Purchase Attribution",
        value: "See exactly which channels and campaigns are driving revenue — not just clicks and sessions.",
      },
      {
        label: "Paid Performance",
        value: "Shopping, social, and retargeting campaigns optimised for return on ad spend, not vanity metrics.",
      },
      {
        label: "Retention Systems",
        value: "Abandoned cart, post-purchase, and repeat demand flows that turn one-time buyers into loyal customers.",
      },
    ],
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
    idealFor: [
      "You're spending on Meta or Google but ROAS reporting feels unreliable or inconsistent",
      "Your abandoned cart recovery is manual or non-existent and you're losing recoverable revenue",
      "You have traffic but conversion rate is weak and you need to understand where the drop-off is",
      "You want to grow LTV not just acquisition spend",
    ],
    faqs: [
      {
        question: "My Meta ROAS looks strong but overall revenue isn't growing. What's happening?",
        answer:
          "This is a common issue caused by over-attribution in platform reporting. Meta counts view-through and click-through conversions that often overlap with organic and direct traffic. We audit your attribution setup, implement server-side tracking to improve signal quality, and build a cleaner revenue picture that separates incremental gains from credited traffic.",
      },
      {
        question: "What ecommerce platforms do you work with?",
        answer:
          "Primarily Shopify and WooCommerce, which cover the majority of our ecommerce clients. We also have experience with Magento, BigCommerce, and custom-built stores. The tracking implementation varies slightly by platform but the measurement framework we apply is consistent.",
      },
      {
        question: "How do you approach abandoned cart and post-purchase automation?",
        answer:
          "We build multi-step email sequences triggered by cart abandonment, browse behaviour, and purchase events. Abandoned cart flows typically run three emails over 24-72 hours. Post-purchase flows focus on onboarding, cross-sell timing, and review requests — the touchpoints that most brands skip but that significantly affect repeat purchase rates.",
      },
      {
        question: "Do you manage paid media on an ongoing retainer or project basis?",
        answer:
          "Both. Ongoing retainers suit brands that want continuous campaign management, optimisation, and reporting. We also work on fixed-scope campaign activations for product launches or seasonal pushes. We'll recommend the right engagement model based on your budget, team size, and how much internal resource you already have.",
      },
      {
        question: "Can you help us scale internationally?",
        answer:
          "Yes. We've supported ecommerce brands expanding into new markets, which typically involves restructuring campaigns for new audience targeting, adapting creative messaging, and ensuring tracking handles multi-currency and multi-region attribution correctly.",
      },
    ],
  },
  {
    slug: "fmcg",
    name: "FMCG",
    heroTitle: "FMCG marketing that connects campaign activity to real demand.",
    heroDescription:
      "We help FMCG and consumer brands improve campaign measurement, paid media coordination, and follow-up systems so launches and growth pushes are easier to manage.",
    heroSnapshot: [
      {
        label: "Campaign Measurement",
        value: "See which awareness and conversion campaigns are generating real demand signals, not just impressions.",
      },
      {
        label: "Launch Media",
        value: "Coordinated paid media support for product launches, brand pushes, and seasonal campaign bursts.",
      },
      {
        label: "Consumer Engagement",
        value: "CRM and automation workflows that capture first-party data and keep audiences engaged after the initial campaign.",
      },
    ],
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
    idealFor: [
      "You're running awareness campaigns and need to understand what's actually moving the needle downstream",
      "You're preparing a product launch and need media and reporting infrastructure in place before it goes live",
      "Your brand has limited first-party data and you want to start building an owned audience",
      "You need a cleaner view of performance before committing to the next major campaign investment",
    ],
    faqs: [
      {
        question: "How do you measure FMCG campaign effectiveness when most purchases happen in-store?",
        answer:
          "We focus on the digital signals that correlate with demand — website visits to stockist pages, retailer click-throughs, coupon or sample redemption rates, and social engagement quality. Where direct e-commerce tracking is possible, we implement it. For purely in-store products, we help build measurement frameworks that give you the best available proxies for commercial impact.",
      },
      {
        question: "Can you help coordinate media across a product launch?",
        answer:
          "Yes. We structure launch campaigns across awareness, consideration, and conversion phases — typically covering social video, display, search, and influencer-adjacent targeting — with a shared reporting setup so you can see performance across the full launch window in one place.",
      },
      {
        question: "Do you help with D2C ecommerce for FMCG brands?",
        answer:
          "Yes. If your brand sells directly online as well as through retail, we apply the same conversion tracking, paid media, and retention automation framework we use for ecommerce brands. The combination of retail and D2C data often gives the clearest picture of total demand.",
      },
      {
        question: "How do you help FMCG brands build first-party data?",
        answer:
          "We design lead capture mechanisms appropriate to FMCG — competition mechanics, product registration, sample request forms, and newsletter sign-ups tied to recipe content or lifestyle campaigns. These are paired with email automation sequences that maintain engagement and create a direct channel to consumers outside of paid media.",
      },
      {
        question: "What's a realistic timeline for seeing clearer campaign reporting?",
        answer:
          "Basic tracking and reporting improvements can be in place within two to three weeks. If you have a campaign running in four to six weeks, that's usually enough lead time to get meaningful measurement set up before it goes live. The more complex the media mix, the more lead time helps.",
      },
    ],
  },
  {
    slug: "entertainment-hospitality",
    name: "Entertainment & Hospitality",
    heroTitle: "Hospitality marketing that helps more visits, bookings, and repeat demand happen.",
    heroDescription:
      "We help hospitality and entertainment brands improve campaign visibility, booking-focused media performance, and follow-up systems that keep demand moving.",
    heroSnapshot: [
      {
        label: "Booking Visibility",
        value: "Track which campaigns drive actual bookings and visits — not just page views and form submissions.",
      },
      {
        label: "Event & Seasonal Campaigns",
        value: "Paid media built for launches, seasonal occupancy windows, and events that need to sell quickly.",
      },
      {
        label: "Repeat Demand",
        value: "Email and CRM workflows that re-engage past visitors and keep your brand front of mind between bookings.",
      },
    ],
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
    idealFor: [
      "You're running promotional campaigns but can't see clearly which ones are driving bookings or visits",
      "You have seasonal peaks and need campaigns that are ready to convert when demand spikes",
      "Your past guests aren't being re-engaged and repeat business is lower than it should be",
      "You want to reduce dependence on OTAs or aggregators by building a stronger direct channel",
    ],
    faqs: [
      {
        question: "How do you track bookings made through third-party reservation systems?",
        answer:
          "We implement tracking that captures the moment a user arrives at a third-party booking page and, where possible, uses UTM parameters and CRM integration to attribute the full journey. For direct booking engines, we can typically implement full funnel tracking. For OTA-dependent models, we focus on measuring the intent signals and click behaviour that precede the booking.",
      },
      {
        question: "What channels work best for hospitality and entertainment brands?",
        answer:
          "Meta and Instagram tend to work well for visually-driven venues — restaurants, hotels, and experience brands. Google Search captures high-intent bookings. YouTube and programmatic display suit awareness pushes for events or seasonal campaigns. The right mix depends on your venue type, booking lead time, and whether you're targeting local or destination audiences.",
      },
      {
        question: "Can you help with both B2C guest marketing and B2B corporate bookings?",
        answer:
          "Yes. Many hospitality brands serve both audiences. We structure campaigns and CRM automation separately for each — typically LinkedIn and email sequences for corporate and events clients, and social plus search for leisure guests. Measurement and reporting are kept separate so you can evaluate each segment independently.",
      },
      {
        question: "How do you re-engage past guests?",
        answer:
          "We build post-visit email sequences triggered by stay or visit events in your CRM, combined with seasonal re-engagement campaigns around key dates. For venues with online bookings, we set up lookalike audience targeting based on past bookers. The goal is to reduce acquisition cost by improving repeat visit rates before spending more on new customer growth.",
      },
      {
        question: "We have multiple venues or locations. Can you support that?",
        answer:
          "Yes. We structure campaigns, tracking, and reporting at both the brand and venue level so you can see overall performance and drill into individual locations. This matters most for hospitality groups where some venues may be under-performing or where budgets need to be allocated by expected return.",
      },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    heroTitle: "Real estate marketing that helps you track leads and improve follow-up.",
    heroDescription:
      "We help real estate teams improve lead-source visibility, paid media performance, and follow-up systems so marketing supports serious enquiries more effectively.",
    heroSnapshot: [
      {
        label: "Lead Source Clarity",
        value: "Know which portals, campaigns, and channels are generating your best-quality enquiries — not just the most volume.",
      },
      {
        label: "Paid Lead Generation",
        value: "Campaigns on Meta, Google, and LinkedIn that attract serious buyers and tenants, not just casual browsers.",
      },
      {
        label: "Sales Handoff Automation",
        value: "CRM workflows that route leads to the right agent instantly and keep prospects moving through the pipeline.",
      },
    ],
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
    idealFor: [
      "You're generating leads from multiple portals and paid campaigns but have no clear view of which source converts best",
      "Your team takes too long to respond to new enquiries and prospects go cold",
      "You want to reduce reliance on property portals by building a stronger direct pipeline",
      "You're scaling a development, launch, or new office and need marketing infrastructure that can move quickly",
    ],
    faqs: [
      {
        question: "Can you integrate with the CRM systems real estate teams use?",
        answer:
          "Yes. We've worked with teams using Salesforce, HubSpot, Brevo, and property-specific CRMs. We build lead routing, automated follow-up sequences, and pipeline stage triggers that work within whatever system your agents are already using. If you don't have a CRM, we can recommend and implement one.",
      },
      {
        question: "How do you improve lead quality from paid campaigns?",
        answer:
          "Lead quality usually improves by tightening audience targeting (focusing on purchase or rental intent signals), improving landing pages so casual browsers self-select out, and adding qualification questions to forms. We also set up lead scoring so agents prioritise the highest-intent enquiries first.",
      },
      {
        question: "We use Rightmove and Zoopla. Can you add value beyond portal listings?",
        answer:
          "Yes. Portal listings generate passive demand. We build complementary paid campaigns that target buyers or tenants earlier in their research process — before they're comparison shopping on portals — giving your listings a better chance of converting when prospects do arrive. We also help build re-marketing audiences from portal traffic where technically possible.",
      },
      {
        question: "How quickly can you help us set up follow-up automation?",
        answer:
          "A basic automated follow-up sequence — instant confirmation email, 24-hour follow-up, and a 7-day re-engagement touch — can typically be live within one to two weeks. More complex workflows involving agent routing, lead scoring, and multi-stage nurture campaigns take three to four weeks, depending on CRM complexity.",
      },
      {
        question: "Do you work with residential, commercial, or both?",
        answer:
          "Both. The tracking and automation principles are the same. Commercial real estate campaigns typically involve longer sales cycles and smaller audience sizes, which changes how we structure paid media — LinkedIn becomes more relevant, and lead nurture sequences run over longer periods. We adjust the approach to fit the asset type and buyer profile.",
      },
    ],
  },
];

export const getExpertiseBySlug = (slug: string) =>
  expertisePages.find((page) => page.slug === slug);
