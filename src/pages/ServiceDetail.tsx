import { Navigate, Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Mail,
  Globe,
  Search,
  PenTool,
  CheckCircle2,
  CircleOff,
  Compass,
  Link2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTASection from "@/components/shared/CTASection";
import FeaturedTestimonialSection from "@/components/shared/FeaturedTestimonialSection";
import FAQAccordion from "@/components/shared/FAQAccordion";
import SEO from "@/components/shared/SEO";
import { BOOK_A_FREE_STRATEGY_CALL_CTA } from "@/config/cta";
import { getServiceBySlug } from "@/data/services";
import { prefetchRoute } from "@/lib/routePrefetch";

interface ServiceCard {
  title: string;
  description: string;
}

interface ServiceFaq {
  question: string;
  answer: string;
}

interface RelatedServiceLink {
  slug: string;
  reason: string;
}

interface ServiceData {
  icon: LucideIcon;
  title: string;
  headline: string;
  gradientWord: string;
  description: string;
  outcomes: string[];
  timeline: string;
  fit: string;
  notIdealFor: string;
  startingPoint: string;
  features: string[];
  approach: ServiceCard[];
  problems: ServiceCard[];
  decisionTitle: string;
  decisionDescription: string;
  decisionCards: ServiceCard[];
  successSignals: ServiceCard[];
  faqs: ServiceFaq[];
  cta: {
    primaryLabel: string;
    primaryTo: string;
    secondaryLabel: string;
    secondaryTo: string;
  };
  relatedServices: RelatedServiceLink[];
  seoTitle: string;
  seoDesc: string;
}

const serviceData: Record<string, ServiceData> = {
  "email-marketing": {
    icon: Mail,
    title: "Email Marketing",
    headline: "Email That Drives",
    gradientWord: "Revenue",
    description:
      "Email remains one of the highest-ROI channels when it is tied to real buyer behaviour. We build lifecycle email systems that welcome leads, recover intent, and bring customers back with reporting you can actually use.",
    outcomes: ["More engaged subscribers", "More repeat purchases", "Clearer email-attributed revenue"],
    timeline: "2-4 weeks depending on the number of flows.",
    fit: "Businesses with an active list, repeat-purchase potential, or a sales process that needs structured nurture.",
    notIdealFor: "Teams without list capture, offer clarity, or any ability to follow up consistently after someone opts in.",
    startingPoint: "A welcome flow, enquiry or cart recovery, and a basic segmentation model before expanding into a larger programme.",
    features: [
      "Welcome sequences that convert new subscribers",
      "Abandoned cart and browse recovery flows",
      "Segmented campaigns based on behaviour and lifecycle stage",
      "A/B testing on subject lines, content, and send times",
      "Monthly performance reports with actionable insights",
      "Brevo, Mailchimp, and Klaviyo integration",
    ],
    approach: [
      {
        title: "Audit and strategy",
        description: "We review list health, current flows, and commercial priorities before deciding what should be built first.",
      },
      {
        title: "Design and build",
        description: "Templates, copy, and segmentation rules are created around your brand and the behaviour you want to change.",
      },
      {
        title: "Automate and test",
        description: "Each flow is tested for trigger logic, deliverability, and the handoff between message, click, and conversion.",
      },
      {
        title: "Report and refine",
        description: "We review what is generating clicks, revenue, and repeat behaviour so the programme keeps compounding.",
      },
    ],
    problems: [
      {
        title: "Lists go stale fast",
        description: "Collecting contacts without a follow-up system means they cool off quickly. Engagement drops, deliverability suffers, and the list becomes less valuable every month.",
      },
      {
        title: "Every subscriber gets the same message",
        description: "Batch campaigns ignore lifecycle stage, purchase intent, and past behaviour. The result is more sends without much relevance.",
      },
      {
        title: "Revenue stays disconnected from email activity",
        description: "Most teams can see opens and clicks, but not whether email is helping qualified leads or repeat purchases. That makes optimisation guesswork.",
      },
    ],
    decisionTitle: "What the first useful version usually includes",
    decisionDescription: "We start with the flows that move buying behaviour first, then layer on more campaigns once the basics are working.",
    decisionCards: [
      {
        title: "Capture and welcome",
        description: "New subscribers or enquiries should receive an immediate, relevant first experience instead of entering silence.",
      },
      {
        title: "Recover intent",
        description: "Carts, abandoned forms, or half-finished journeys need structured reminders before that intent disappears.",
      },
      {
        title: "Build repeat behaviour",
        description: "The strongest email programmes keep buyers coming back through timing, segmentation, and offer sequencing.",
      },
    ],
    successSignals: [
      {
        title: "More clicks from the right segments",
        description: "Performance improves when flows are tied to behaviour, not one-size-fits-all blast campaigns.",
      },
      {
        title: "Clearer view of email-attributed revenue",
        description: "Reporting moves beyond vanity metrics and into what email is actually helping drive.",
      },
      {
        title: "A programme that works between campaigns",
        description: "Automated lifecycle flows keep nurturing and converting even when your team is not sending manually.",
      },
    ],
    faqs: [
      {
        question: "Which email platforms do you work with?",
        answer: "We build primarily on Brevo and Klaviyo, but we can work with Mailchimp and other major platforms. If you are already set up somewhere, we will use what makes sense where possible.",
      },
      {
        question: "Do you write the email copy?",
        answer: "Yes. We write the copy, shape the templates, and build the flows. We will need your positioning and brand guidance, but the execution stays with us.",
      },
      {
        question: "What if my list is still small?",
        answer: "A small, engaged list is still worth nurturing properly. We often start lean and build a system that scales as the list grows.",
      },
      {
        question: "How do you measure success?",
        answer: "We look at engagement metrics, click behaviour, and most importantly the commercial actions email helps influence. The goal is not just activity, but measurable contribution.",
      },
    ],
    cta: {
      primaryLabel: BOOK_A_FREE_STRATEGY_CALL_CTA.label,
      primaryTo: "/book-a-call",
      secondaryLabel: "See Marketing Automation",
      secondaryTo: "/service/marketing-automation",
    },
    relatedServices: [
      {
        slug: "conversion-tracking",
        reason: "Track the forms, purchases, and revenue signals your email programme should optimise around.",
      },
      {
        slug: "marketing-automation",
        reason: "Extend email into CRM tasks, lead scoring, and broader cross-channel follow-up.",
      },
    ],
    seoTitle: "Email Marketing | AlphaTrack Digital",
    seoDesc: "Automated email campaigns that nurture leads and drive revenue. Welcome sequences, recovery flows, segmentation, and reporting built around lifecycle value.",
  },
  "website-development": {
    icon: Globe,
    title: "Website Development",
    headline: "Websites Built to",
    gradientWord: "Convert",
    description:
      "Your website should do more than look polished. We build fast, conversion-focused sites and landing paths that give campaigns somewhere credible to send traffic and give your team something measurable to improve.",
    outcomes: ["Faster load experience", "Higher conversion readiness", "Tracking and SEO built in"],
    timeline: "3-6 weeks based on scope and page count.",
    fit: "Brands with a weak site experience, underperforming landing paths, or campaigns sending traffic to pages that do not convert.",
    notIdealFor: "Teams only looking for cosmetic visual updates without changing offer clarity, funnel structure, or measurement.",
    startingPoint: "A lean set of high-intent pages, conversion architecture, and measurement before expanding into a larger site footprint.",
    features: [
      "Conversion-optimised landing pages",
      "Mobile-first responsive design",
      "WordPress, Webflow, and custom builds",
      "SEO-ready architecture from day one",
      "Integrated analytics and conversion tracking",
      "Ongoing maintenance and support",
    ],
    approach: [
      {
        title: "Discovery",
        description: "We learn what the site needs to achieve, where current friction lives, and what actions matter most.",
      },
      {
        title: "Structure and design",
        description: "Wireframes and interface decisions prioritise clarity, trust, and conversion flow before visual polish.",
      },
      {
        title: "Build and launch",
        description: "Implementation includes performance, analytics, tracking, and SEO foundations from the start.",
      },
      {
        title: "Optimise",
        description: "Post-launch changes are guided by real behaviour, not design opinions or assumptions.",
      },
    ],
    problems: [
      {
        title: "Built for looks, not results",
        description: "Many sites look polished but have weak conversion architecture. Visitors land, browse a little, and leave without much guidance on what to do next.",
      },
      {
        title: "No measurement inside the experience",
        description: "If the site is missing proper tracking, you can see visits but not the behaviour that explains why leads do or do not happen.",
      },
      {
        title: "Hard to update under campaign pressure",
        description: "When every landing-page change needs a developer, marketing momentum slows down and campaign learning gets delayed.",
      },
    ],
    decisionTitle: "How a high-performing site usually gets built",
    decisionDescription: "The strongest websites are clear on where a visitor should go next and instrumented so those decisions can be measured.",
    decisionCards: [
      {
        title: "Clarify the conversion path",
        description: "We define what a visitor needs to understand, trust, and do on each important page.",
      },
      {
        title: "Design around decisions",
        description: "Layouts, copy hierarchy, and page flow are shaped by user action, not just visual preference.",
      },
      {
        title: "Launch with tracking built in",
        description: "Forms, buttons, and landing-path behaviour are measurable from day one so optimisation can start early.",
      },
    ],
    successSignals: [
      {
        title: "A faster, cleaner visit experience",
        description: "Performance and responsiveness improve how people experience the brand before they ever enquire.",
      },
      {
        title: "A clearer path from click to enquiry",
        description: "Visitors are guided toward the right action instead of wandering through generic pages.",
      },
      {
        title: "A site your team can keep improving",
        description: "Launch is not the endpoint. The build should make iteration and campaign support easier after go-live.",
      },
    ],
    faqs: [
      {
        question: "What platforms do you build on?",
        answer: "Primarily WordPress and Webflow. We recommend the best fit based on your team, editing needs, and how much flexibility the build requires.",
      },
      {
        question: "Do you handle SEO and tracking as part of the build?",
        answer: "Yes. Every build includes SEO-ready structure and integrated conversion tracking so performance does not need to be retrofitted later.",
      },
      {
        question: "How long does a website project take?",
        answer: "Most builds land in the 3-6 week range depending on scope. Lean landing pages move faster than multi-page sites with migration or custom functionality.",
      },
      {
        question: "What happens after launch?",
        answer: "We can support with iteration, maintenance, and measurement. The important thing is that you leave with a site built for ongoing learning, not just a one-off launch.",
      },
    ],
    cta: {
      primaryLabel: BOOK_A_FREE_STRATEGY_CALL_CTA.label,
      primaryTo: "/book-a-call",
      secondaryLabel: "See Conversion Tracking",
      secondaryTo: "/service/conversion-tracking",
    },
    relatedServices: [
      {
        slug: "conversion-tracking",
        reason: "Measure the forms, calls, and page interactions that show whether the new site is actually performing.",
      },
      {
        slug: "seo",
        reason: "Technical structure, page speed, and information architecture all influence how well organic growth compounds.",
      },
    ],
    seoTitle: "Website Development | AlphaTrack Digital",
    seoDesc: "Fast, conversion-focused websites and landing pages built on WordPress and Webflow, with SEO structure and tracking included from launch.",
  },
  seo: {
    icon: Search,
    title: "SEO",
    headline: "Organic Visibility That",
    gradientWord: "Compounds",
    description:
      "SEO is a compounding growth channel when the fundamentals are sound. We combine technical cleanup, keyword strategy, and content direction so search visibility grows into qualified demand instead of random traffic spikes.",
    outcomes: ["Steadier organic growth", "Higher search visibility", "Better-quality inbound demand"],
    timeline: "6-8 weeks for initial momentum, then stronger compounding over 3-6 months.",
    fit: "Businesses willing to invest beyond quick wins and improve both site foundations and content quality over time.",
    notIdealFor: "Teams expecting instant lead volume next week or unwilling to change site structure, content, or internal priorities.",
    startingPoint: "Technical cleanup, keyword-to-page mapping, and a realistic 90-day content priority list.",
    features: [
      "Technical SEO audits and fixes",
      "Keyword research and content strategy",
      "On-page optimisation including metadata, headings, and schema",
      "Local SEO for relevant multi-location businesses",
      "Backlink outreach and authority support",
      "Monthly ranking and traffic reporting",
    ],
    approach: [
      {
        title: "Technical audit",
        description: "We identify the structural issues that stop search engines and users from having a clean experience.",
      },
      {
        title: "Keyword strategy",
        description: "Priority keywords are mapped to intent, demand, and your buyer journey rather than broad vanity targets.",
      },
      {
        title: "Content and on-page execution",
        description: "Pages are improved or created so they can rank for meaningful demand and move visitors toward action.",
      },
      {
        title: "Authority and reporting",
        description: "Progress is tracked through rankings, traffic quality, and business-facing visibility into what is improving.",
      },
    ],
    problems: [
      {
        title: "Technical debt blocks progress",
        description: "Crawl errors, slow pages, weak internal structure, and indexation problems suppress performance long before content quality even gets a chance to help.",
      },
      {
        title: "Content is published without search intent",
        description: "When topics are not mapped to demand and buyer intent, teams create output that looks active but rarely compounds into useful traffic.",
      },
      {
        title: "Progress feels invisible",
        description: "Without clear reporting, SEO can feel abstract. Rankings change, traffic shifts, and no one knows what is actually moving in the right direction.",
      },
    ],
    decisionTitle: "Where SEO work creates momentum first",
    decisionDescription: "The first wins usually come from removing friction, targeting intent more clearly, and building pages that deserve to rank.",
    decisionCards: [
      {
        title: "Fix technical drag",
        description: "Speed, crawlability, indexing, and page structure often need attention before content can work properly.",
      },
      {
        title: "Map demand to intent",
        description: "We connect keywords to the pages and commercial questions that matter most to your pipeline.",
      },
      {
        title: "Turn rankings into pipeline",
        description: "Traffic only matters if the pages attracting it can move the right visitor toward enquiry or sale.",
      },
    ],
    successSignals: [
      {
        title: "Steadier inbound from the right queries",
        description: "The traffic profile becomes more aligned with real demand instead of broad, low-intent visits.",
      },
      {
        title: "Content tied to commercial priority",
        description: "Page creation and optimisation are led by opportunity, not just a publishing quota.",
      },
      {
        title: "Visibility into progress beyond ranking screenshots",
        description: "Your team can see what is improving, where momentum is building, and how the work connects to pipeline.",
      },
    ],
    faqs: [
      {
        question: "How long until we see results?",
        answer: "Initial movement often appears within 6-8 weeks, especially when technical issues are significant. More meaningful commercial impact usually compounds over several months.",
      },
      {
        question: "Do you write the content as well?",
        answer: "We can build the content strategy and support writing. The right model depends on your internal team, review process, and production capacity.",
      },
      {
        question: "Is local SEO included?",
        answer: "Yes, where it is relevant. We incorporate location signals, profile optimisation, and geo-targeted content when the business model needs it.",
      },
      {
        question: "How do you report on progress?",
        answer: "We report on rankings, traffic quality, and movement against agreed priorities. The aim is usable visibility, not just a long list of vanity charts.",
      },
    ],
    cta: {
      primaryLabel: BOOK_A_FREE_STRATEGY_CALL_CTA.label,
      primaryTo: "/book-a-call",
      secondaryLabel: "See Website Development",
      secondaryTo: "/service/website-development",
    },
    relatedServices: [
      {
        slug: "website-development",
        reason: "Technical structure, page speed, and user experience shape how much SEO can realistically compound.",
      },
      {
        slug: "content-media-strategy",
        reason: "A stronger editorial system makes it easier to turn keyword priorities into consistent, useful content.",
      },
    ],
    seoTitle: "SEO Services | AlphaTrack Digital",
    seoDesc: "Technical SEO, keyword strategy, and content optimisation that compounds over time, with reporting tied to visibility and demand quality.",
  },
  "content-media-strategy": {
    icon: PenTool,
    title: "Content & Media Strategy",
    headline: "Content That Fuels",
    gradientWord: "Growth",
    description:
      "Content only becomes leverage when each channel has a job and each piece supports a buyer decision. We build content and media strategy around pipeline goals, not just publishing activity.",
    outcomes: ["More consistent execution", "Stronger audience engagement", "Content tied to business goals"],
    timeline: "2-3 weeks for strategy setup, then ongoing monthly execution.",
    fit: "Teams with offer clarity that need a repeatable content system, stronger channel roles, or better planning discipline.",
    notIdealFor: "Brands looking only for day-to-day posting or community management without strategy, measurement, or prioritisation work.",
    startingPoint: "Channel role definition, editorial rhythm, and a 90-day plan tied to demand and pipeline goals.",
    features: [
      "Content audits and gap analysis",
      "Editorial calendar and content planning",
      "Blog writing and thought leadership",
      "Social media content strategy",
      "Media planning and channel allocation",
      "Performance measurement and reporting",
    ],
    approach: [
      {
        title: "Audit and research",
        description: "We assess what exists, where performance is weak, and which buyer-journey gaps matter most to fill.",
      },
      {
        title: "Strategy and planning",
        description: "Channels, formats, and cadence are defined around business goals rather than volume for its own sake.",
      },
      {
        title: "Create and distribute",
        description: "Content is produced and routed to the channels most likely to influence awareness, trust, or conversion.",
      },
      {
        title: "Measure and refine",
        description: "We look at what is assisting traffic, demand, and conversion so the plan keeps getting sharper.",
      },
    ],
    problems: [
      {
        title: "No clear direction",
        description: "Teams often publish reactively, following requests or trends without any consistent connection to funnel stage or business priority.",
      },
      {
        title: "Content activity does not translate into pipeline",
        description: "Traffic or engagement might happen, but the content is not mapped closely enough to conversion intent to support revenue goals.",
      },
      {
        title: "Output quality is inconsistent",
        description: "Without a planning system, cadence fluctuates, voice drifts, and useful ideas get lost between urgent tasks.",
      },
    ],
    decisionTitle: "What turns content from activity into leverage",
    decisionDescription: "Good strategy clarifies what each channel is for, what should be created next, and how to judge whether it is helping the business.",
    decisionCards: [
      {
        title: "Decide what each channel is for",
        description: "Different formats should support different parts of the journey instead of competing for the same vague objective.",
      },
      {
        title: "Plan around buyer-journey gaps",
        description: "The content calendar should answer real questions and objections that block progression toward enquiry or sale.",
      },
      {
        title: "Measure against demand, not vanity",
        description: "We look for movement in useful traffic, engagement quality, and assisted conversion influence rather than surface-level output metrics.",
      },
    ],
    successSignals: [
      {
        title: "More consistent publishing with purpose",
        description: "The team moves from ad hoc output to a rhythm connected to priorities and deadlines.",
      },
      {
        title: "Content mapped to offers and funnel stages",
        description: "Each piece is easier to justify because it supports a clear role in the journey.",
      },
      {
        title: "Channel decisions driven by business goals",
        description: "The plan gets clearer about where to invest effort and what should be trimmed back.",
      },
    ],
    faqs: [
      {
        question: "What types of content do you produce?",
        answer: "We support blog content, thought leadership, email copy, landing-page messaging, social strategy, and creative briefing. The right mix depends on the role each channel needs to play.",
      },
      {
        question: "Do you handle social posting as well?",
        answer: "We can shape the strategy and create the content system. Day-to-day publishing can stay with your internal team or be scoped separately depending on the support level you need.",
      },
      {
        question: "How do you measure content performance?",
        answer: "We connect content to buyer-journey stages, traffic quality, engagement, and assisted conversion signals so performance is evaluated in business context.",
      },
      {
        question: "Can you work with our existing content team?",
        answer: "Yes. We often work as a strategic layer above an internal team, providing direction, prioritisation, and quality control while they execute.",
      },
    ],
    cta: {
      primaryLabel: BOOK_A_FREE_STRATEGY_CALL_CTA.label,
      primaryTo: "/book-a-call",
      secondaryLabel: "See SEO",
      secondaryTo: "/service/seo",
    },
    relatedServices: [
      {
        slug: "seo",
        reason: "Search strategy helps prioritise the topics and page opportunities that content should support first.",
      },
      {
        slug: "paid-media",
        reason: "Content and creative direction improve when paid campaigns generate feedback on audience response and offer resonance.",
      },
    ],
    seoTitle: "Content & Media Strategy | AlphaTrack Digital",
    seoDesc: "Strategic content planning and media strategy aligned to growth goals, with channel roles, editorial structure, and reporting tied to business outcomes.",
  },
};

const qualificationCards = [
  {
    key: "fit",
    title: "Best fit",
    icon: CheckCircle2,
    getDescription: (service: ServiceData) => service.fit,
  },
  {
    key: "not-fit",
    title: "Not ideal for",
    icon: CircleOff,
    getDescription: (service: ServiceData) => service.notIdealFor,
  },
  {
    key: "start",
    title: "Good starting point",
    icon: Compass,
    getDescription: (service: ServiceData) => service.startingPoint,
  },
] as const;

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : undefined;

  if (!service || !slug) return <Navigate to="/service" replace />;

  const serviceUrl = `https://alphatrack.digital/service/${slug}`;
  const relatedServices = service.relatedServices
    .map((item) => {
      const related = getServiceBySlug(item.slug);
      return related ? { ...item, ...related } : null;
    })
    .filter(Boolean);

  return (
    <>
      <SEO
        title={service.seoTitle}
        description={service.seoDesc}
        canonicalUrl={`/service/${slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          provider: {
            "@type": "Organization",
            name: "AlphaTrack Digital",
            url: "https://alphatrack.digital",
          },
          description: service.seoDesc,
          areaServed: ["Ghana", "Nigeria", "United Kingdom"],
          url: serviceUrl,
        }}
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://alphatrack.digital/" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://alphatrack.digital/service" },
              { "@type": "ListItem", position: 3, name: service.title, item: serviceUrl },
            ],
          })}
        </script>
      </Helmet>

      <section className="relative overflow-hidden pt-8 pb-24 text-center md:pt-10 md:pb-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-5%,rgba(0,175,239,0.10)_0%,rgba(0,51,153,0.06)_45%,transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-[60rem]">
            <Breadcrumbs
              items={[
                { label: "Home", path: "/" },
                { label: "Services", path: "/service" },
                { label: service.title },
              ]}
            />
            <motion.div
              className="mt-16 md:mt-20"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className="inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
                <service.icon className="h-4 w-4" />
                {service.title}
              </div>
              <h1 className="title-safe mt-8 pb-4 text-5xl font-extrabold leading-[1.14] tracking-[-0.035em] md:pb-5 md:text-6xl lg:text-[4.5rem]">
                {service.headline} <span className="title-safe-inline text-gradient">{service.gradientWord}</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg" className="gap-2 rounded-xl bg-primary px-9 text-primary-foreground hover:bg-primary/90">
                  <Link to={service.cta.primaryTo}>{service.cta.primaryLabel}</Link>
                </Button>
              </div>
              <div className="hidden mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {[
                  { label: "Outcome", value: service.outcomes[0] },
                  { label: "Timeline", value: service.timeline },
                  { label: "Start with", value: service.startingPoint },
                ].map((stat) => (
                  <div key={stat.label} className="bg-background px-5 py-4 text-left">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/70">{stat.label}</p>
                    <p className="mt-1.5 line-clamp-3 text-sm font-medium">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.015] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Decision Snapshot
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Where This Service Fits Best</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {qualificationCards.map((card, index) => (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07]">
                  <card.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.getDescription(service)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-primary">
            The Challenge
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Why This Matters</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {service.problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
              >
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary/50">
                  0{index + 1}
                </span>
                <h3 className="font-semibold">{problem.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.015] py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            What We Prioritise
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">{service.decisionTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
            {service.decisionDescription}
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {service.decisionCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[26px] border border-white/10 bg-background/75 p-6"
              >
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            What Good Looks Like
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Signals We Want to Improve</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {service.successSignals.map((signal, index) => (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-primary/12 bg-gradient-to-br from-primary/6 to-transparent p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                  Outcome {index + 1}
                </p>
                <h3 className="mt-3 font-semibold">{signal.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{signal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.015] py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Scope
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">What This Usually Includes</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-start gap-3 rounded-xl border border-white/10 bg-card p-5"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Our Approach
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">How We Work</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[26px] border border-white/10 bg-white/[0.02] p-7"
              >
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary/50">
                  0{index + 1}
                </span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.015] py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07]">
              <Link2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Related Services</p>
              <h2 className="mt-1 text-3xl font-bold md:text-4xl">What This Works Best With</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {relatedServices.map((related) => (
              <motion.div
                key={related.path}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Link
                  to={related.path}
                  onMouseEnter={() => prefetchRoute(related.path)}
                  onFocus={() => prefetchRoute(related.path)}
                  className="group flex h-full flex-col rounded-[26px] border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <related.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{related.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{related.reason}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.15em] text-muted-foreground/65">
                    Best for {related.bestFor}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {related.ctaLabel}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedTestimonialSection title="What clients say when execution matters." />

      <FAQAccordion
        items={service.faqs}
        title="Common Questions"
        description="Everything you need to know before getting started."
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
            Ready to Improve Your <span className="title-safe-inline text-gradient">{service.title}?</span>
          </>
        }
        description={`If ${service.title.toLowerCase()} is the constraint, we can map the right starting scope and next steps with you.`}
        primaryCta={{ label: service.cta.primaryLabel, to: service.cta.primaryTo }}
        secondaryCta={{ label: service.cta.secondaryLabel, to: service.cta.secondaryTo }}
        variant="service-close"
        layout="split"
      />
    </>
  );
};

export default ServiceDetail;
