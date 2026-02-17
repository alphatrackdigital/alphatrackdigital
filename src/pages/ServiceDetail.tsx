import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowUpRight, Mail, Globe, Search, PenTool, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/shared/CTASection";
import SEO from "@/components/shared/SEO";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ServiceData {
  icon: LucideIcon;
  title: string;
  headline: string;
  gradientWord: string;
  description: string;
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
    description: "Email remains one of the highest-ROI marketing channels — when done right. We build automated email systems that nurture leads, recover abandoned carts, and turn one-time buyers into repeat customers.",
    features: [
      "Welcome sequences that convert new subscribers",
      "Abandoned cart and browse recovery flows",
      "Segmented campaigns based on behaviour and lifecycle stage",
      "A/B testing on subject lines, content, and send times",
      "Monthly performance reports with actionable insights",
      "Brevo, Mailchimp, and Klaviyo integration",
    ],
    approach: [
      { title: "Audit & Strategy", description: "We review your current email setup, list health, and flows — then build a plan to plug the gaps." },
      { title: "Design & Build", description: "We create on-brand templates and write copy that sounds human, not robotic." },
      { title: "Automate & Test", description: "We set up automated flows, run A/B tests, and optimise based on real engagement data." },
      { title: "Report & Scale", description: "Monthly reports with clear metrics — open rates, click rates, revenue attributed to email." },
    ],
    seoTitle: "Email Marketing | AlphaTrack Digital",
    seoDesc: "Automated email campaigns that nurture leads and drive revenue. Welcome sequences, cart recovery, segmented campaigns — built on Brevo and Klaviyo.",
  },
  "website-development": {
    icon: Globe,
    title: "Website Development",
    headline: "Websites Built to",
    gradientWord: "Convert",
    description: "Your website is your digital storefront. We build fast, conversion-focused websites on WordPress and modern platforms that look great, load fast, and turn visitors into leads.",
    features: [
      "Conversion-optimised landing pages",
      "Mobile-first responsive design",
      "WordPress, Webflow, and custom builds",
      "SEO-ready architecture from day one",
      "Integrated analytics and tracking",
      "Ongoing maintenance and support",
    ],
    approach: [
      { title: "Discovery", description: "We learn your business goals, brand, and what your ideal customer journey looks like." },
      { title: "Design", description: "Wireframes and mockups that prioritise conversion — not just aesthetics." },
      { title: "Build & Launch", description: "Clean, fast code with proper SEO foundations, analytics, and tracking built in." },
      { title: "Optimise", description: "Post-launch monitoring, A/B testing, and iterative improvements based on real user data." },
    ],
    seoTitle: "Website Development | AlphaTrack Digital",
    seoDesc: "Fast, conversion-focused websites built on WordPress and modern platforms. Mobile-first, SEO-ready, with analytics and tracking built in.",
  },
  seo: {
    icon: Search,
    title: "SEO",
    headline: "Organic Visibility That",
    gradientWord: "Compounds",
    description: "SEO isn't a quick fix — it's a compounding investment. We build the technical foundations, content strategy, and authority signals that get you ranking and keep you there.",
    features: [
      "Technical SEO audits and fixes",
      "Keyword research and content strategy",
      "On-page optimisation (meta, headings, schema)",
      "Local SEO for multi-location businesses",
      "Backlink outreach and authority building",
      "Monthly ranking and traffic reports",
    ],
    approach: [
      { title: "Technical Audit", description: "We crawl your site, identify technical issues, and fix the foundations — speed, indexing, structure." },
      { title: "Keyword Strategy", description: "We map keywords to your buyer journey and prioritise based on volume, intent, and competition." },
      { title: "Content & On-Page", description: "We optimise existing pages and create new content that ranks and converts." },
      { title: "Authority & Reporting", description: "Backlink outreach and monthly reports showing ranking progress, traffic growth, and revenue impact." },
    ],
    seoTitle: "SEO Services | AlphaTrack Digital",
    seoDesc: "Technical SEO, keyword strategy, and content optimisation that compounds over time. Monthly ranking reports and transparent results.",
  },
  "content-media-strategy": {
    icon: PenTool,
    title: "Content & Media Strategy",
    headline: "Content That Fuels",
    gradientWord: "Growth",
    description: "Content is the fuel that powers digital growth. We build strategic content plans aligned to your business goals — from blog posts and social content to full media strategies.",
    features: [
      "Content audits and gap analysis",
      "Editorial calendar and content planning",
      "Blog writing and thought leadership",
      "Social media content strategy",
      "Media planning and channel allocation",
      "Performance measurement and reporting",
    ],
    approach: [
      { title: "Audit & Research", description: "We review your existing content, competitors, and audience to find the gaps and opportunities." },
      { title: "Strategy & Planning", description: "We build an editorial calendar with content mapped to each stage of your buyer journey." },
      { title: "Create & Distribute", description: "We produce content and distribute it across the channels where your audience lives." },
      { title: "Measure & Refine", description: "We track content performance against business KPIs and iterate based on what's working." },
    ],
    seoTitle: "Content & Media Strategy | AlphaTrack Digital",
    seoDesc: "Strategic content planning and media strategy aligned to your growth goals. Audits, editorial calendars, social strategy, and performance reporting.",
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : undefined;
  if (!service) return <Navigate to="/service" replace />;

  return (
    <>
      <SEO title={service.seoTitle} description={service.seoDesc} />
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[30%] -right-[15%] h-[70%] w-[50%] rounded-full bg-primary/[0.06] blur-[140px]" />
        </div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "Services", path: "/service" }, { label: service.title }]} />
          <div className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <service.icon className="h-7 w-7 text-primary" />
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold md:text-5xl lg:text-6xl">
            {service.headline} <span className="text-gradient">{service.gradientWord}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{service.description}</p>
          <div className="mt-8">
            <Button asChild size="lg" className="gap-1.5 rounded-lg">
              <Link to="/book-a-call">Book a Free Strategy Call <ArrowUpRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">What's Included</span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">Everything You Get</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {service.features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="flex items-start gap-3 rounded-xl border border-white/10 bg-card p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="border-t border-white/10 py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">Our Approach</span>
          <h2 className="max-w-2xl text-3xl font-bold md:text-4xl">How We Work</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass-card p-7">
                <span className="mb-3 inline-block text-xs font-bold uppercase tracking-widest text-primary/50">0{i + 1}</span>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={`Ready to Level Up Your ${service.title}?`} description="Book a free strategy call and let's build a plan tailored to your business." />
    </>
  );
};

export default ServiceDetail;
