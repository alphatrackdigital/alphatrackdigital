import { useParams, Navigate } from "react-router-dom";
import { Mail, Globe, Search, PenTool, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import CTASection from "@/components/shared/CTASection";
import SEO from "@/components/shared/SEO";
import ServiceHero from "@/components/shared/ServiceHero";

interface ServiceData {
  icon: LucideIcon;
  title: string;
  headline: string;
  gradientWord: string;
  description: string;
  outcomes: string[];
  timeline: string;
  fit: string;
  features: string[];
  approach: { title: string; description: string }[];
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
      "Email remains one of the highest-ROI marketing channels when done right. We build automated email systems that nurture leads, recover abandoned carts, and turn one-time buyers into repeat customers.",
    outcomes: [
      "Higher open and click-through rates",
      "More repeat purchases",
      "Clear visibility of email-driven revenue",
    ],
    timeline: "2-4 weeks depending on the number of flows.",
    fit: "Best for businesses with an active contact list and repeat purchase cycle.",
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
        title: "Audit & Strategy",
        description: "We review your current email setup, list health, and flows, then build a plan to close the gaps.",
      },
      {
        title: "Design & Build",
        description: "We create on-brand templates and write copy that sounds human, not robotic.",
      },
      {
        title: "Automate & Test",
        description: "We set up automated flows, run A/B tests, and optimize based on real engagement data.",
      },
      {
        title: "Report & Scale",
        description: "Monthly reports with clear metrics: open rates, click rates, and attributed revenue.",
      },
    ],
    seoTitle: "Email Marketing | AlphaTrack Digital",
    seoDesc:
      "Automated email campaigns that nurture leads and drive revenue. Welcome sequences, cart recovery, segmented campaigns built on Brevo and Klaviyo.",
  },
  "website-development": {
    icon: Globe,
    title: "Website Development",
    headline: "Websites Built to",
    gradientWord: "Convert",
    description:
      "Your website is your digital storefront. We build fast, conversion-focused websites on WordPress and modern platforms that look great, load quickly, and turn visitors into leads.",
    outcomes: ["Faster load times", "Improved conversion rate", "SEO-ready architecture from launch"],
    timeline: "3-6 weeks based on scope and page count.",
    fit: "Best for brands that need a modern site focused on measurable lead generation.",
    features: [
      "Conversion-optimised landing pages",
      "Mobile-first responsive design",
      "WordPress, Webflow, and custom builds",
      "SEO-ready architecture from day one",
      "Integrated analytics and tracking",
      "Ongoing maintenance and support",
    ],
    approach: [
      {
        title: "Discovery",
        description: "We learn your business goals, brand, and what your ideal customer journey looks like.",
      },
      {
        title: "Design",
        description: "Wireframes and mockups that prioritize conversion, not just aesthetics.",
      },
      {
        title: "Build & Launch",
        description: "Clean, fast implementation with proper SEO foundations, analytics, and tracking built in.",
      },
      {
        title: "Optimize",
        description: "Post-launch monitoring, A/B testing, and iterative improvements based on real user data.",
      },
    ],
    seoTitle: "Website Development | AlphaTrack Digital",
    seoDesc:
      "Fast, conversion-focused websites built on WordPress and modern platforms. Mobile-first, SEO-ready, with analytics and tracking built in.",
  },
  seo: {
    icon: Search,
    title: "SEO",
    headline: "Organic Visibility That",
    gradientWord: "Compounds",
    description:
      "SEO is not a quick fix. It is a compounding investment. We build the technical foundations, content strategy, and authority signals that get you ranking and keep you there.",
    outcomes: ["Sustainable organic traffic growth", "Higher search visibility", "Better quality inbound leads"],
    timeline: "6-8 weeks for initial momentum, then compounding growth over 3-6 months.",
    fit: "Best for businesses investing in long-term visibility and inbound demand.",
    features: [
      "Technical SEO audits and fixes",
      "Keyword research and content strategy",
      "On-page optimisation (meta, headings, schema)",
      "Local SEO for multi-location businesses",
      "Backlink outreach and authority building",
      "Monthly ranking and traffic reports",
    ],
    approach: [
      {
        title: "Technical Audit",
        description: "We crawl your site, identify technical issues, and fix foundations such as speed and indexing.",
      },
      {
        title: "Keyword Strategy",
        description: "We map keywords to your buyer journey and prioritize by volume, intent, and competition.",
      },
      {
        title: "Content & On-Page",
        description: "We optimize existing pages and create new content that ranks and converts.",
      },
      {
        title: "Authority & Reporting",
        description: "Backlink outreach plus monthly reporting of ranking progress, traffic growth, and revenue impact.",
      },
    ],
    seoTitle: "SEO Services | AlphaTrack Digital",
    seoDesc:
      "Technical SEO, keyword strategy, and content optimisation that compounds over time. Monthly ranking reports and transparent results.",
  },
  "content-media-strategy": {
    icon: PenTool,
    title: "Content & Media Strategy",
    headline: "Content That Fuels",
    gradientWord: "Growth",
    description:
      "Content is the fuel that powers digital growth. We build strategic content plans aligned to your goals, from blog articles and social content to full media strategy.",
    outcomes: ["Consistent content pipeline", "Better audience engagement", "Content tied to business goals"],
    timeline: "2-3 weeks for strategy setup, then ongoing monthly execution.",
    fit: "Best for teams that need structured content execution tied to measurable outcomes.",
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
        title: "Audit & Research",
        description: "We review your existing content, competitors, and audience to identify gaps and opportunities.",
      },
      {
        title: "Strategy & Planning",
        description: "We build an editorial calendar mapped to each stage of your buyer journey.",
      },
      {
        title: "Create & Distribute",
        description: "We produce content and distribute it across the channels where your audience lives.",
      },
      {
        title: "Measure & Refine",
        description: "We track content performance against business KPIs and iterate based on what works.",
      },
    ],
    seoTitle: "Content & Media Strategy | AlphaTrack Digital",
    seoDesc:
      "Strategic content planning and media strategy aligned to growth goals. Audits, editorial calendars, social strategy, and performance reporting.",
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : undefined;
  if (!service) return <Navigate to="/service" replace />;

  return (
    <>
      <SEO title={service.seoTitle} description={service.seoDesc} canonicalUrl={`/service/${slug}`} />
      <ServiceHero
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Services", path: "/service" },
          { label: service.title },
        ]}
        badgeLabel={service.title}
        badgeIcon={service.icon}
        title={
          <>
            {service.headline} <span className="text-gradient">{service.gradientWord}</span>
          </>
        }
        description={service.description}
        snapshot={[
          { label: "Outcome", value: service.outcomes[0] },
          { label: "Timeline", value: service.timeline },
          { label: "Best Fit", value: service.fit },
        ]}
      />
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            What's Included
          </span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Everything You Get</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {service.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
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
                className="glass-card p-7"
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

      <CTASection
        title={`Ready to Level Up Your ${service.title}?`}
        description="Book a call and let's build a plan tailored to your business."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
      />
    </>
  );
};

export default ServiceDetail;

