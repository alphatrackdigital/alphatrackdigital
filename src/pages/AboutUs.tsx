import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Compass,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";

import CTASection from "@/components/shared/CTASection";
import PageSection from "@/components/shared/PageSection";
import SectionIntro from "@/components/shared/SectionIntro";
import SEO from "@/components/shared/SEO";
import {
  companyProfile,
  ctmaFramework,
  primarySectors,
  tractionMetrics,
  whyChoosePoints,
} from "@/data/companyProfile";

const whyChooseIcons = [Compass, BarChart3, Users] as const;
const valueIcons = [Target, Lightbulb, CheckCircle2] as const;

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us | AlphaTrack Digital"
        description="AlphaTrack Digital is a growth-focused marketing agency helping brands attract, convert, and scale through data-driven marketing, creative strategy, and measurable performance systems."
        canonicalUrl="/about-us"
      />

      <PageSection mode="hero" surface="glow" spacing="spacious">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionIntro
              as="h1"
              eyebrow="About Us"
              mode="hero"
              maxWidth="xl"
              title={
                <>
                  Data, Creativity, and Systems Built for <span className="text-gradient">Growth</span>
                </>
              }
              description={`${companyProfile.established} ${companyProfile.shortDescription}`}
              titleClassName="max-w-4xl"
              descriptionClassName="max-w-3xl"
            />

            <div className="mt-8 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Data-driven marketing
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Creative strategy
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Measurable performance systems
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(0,51,153,0.18)_0%,rgba(0,175,239,0.05)_45%,rgba(255,255,255,0.02)_100%)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/80">
              A Note From Our Founder
            </p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{companyProfile.founder.name}</h2>
            <p className="mt-1 text-sm text-primary/85">{companyProfile.founder.title}</p>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">{companyProfile.founderNote}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{companyProfile.longDescription}</p>
            <div className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm">
              <a href={`mailto:${companyProfile.founder.email}`} className="block transition-colors hover:text-primary">
                {companyProfile.founder.email}
              </a>
              <a href={companyProfile.founder.phoneHref} className="block transition-colors hover:text-primary">
                {companyProfile.founder.phoneDisplay}
              </a>
              <a
                href={companyProfile.founder.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-primary"
              >
                {companyProfile.founder.websiteDisplay}
              </a>
            </div>
          </motion.div>
        </div>
      </PageSection>

      <PageSection mode="proof" surface="quiet" border="top">
        <SectionIntro
          eyebrow="Our Traction"
          mode="proof"
          title="Performance Milestones Across Client Campaigns"
          description="The corporate profile is built around measurable output, so the website should reflect the same operating standard."
          maxWidth="lg"
          className="mb-10"
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {tractionMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-3xl font-bold text-gradient">{metric.value}</p>
              <p className="mt-3 text-sm font-semibold text-foreground">{metric.label}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{metric.note}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <PageSection mode="content" border="top">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Inside AlphaTrack"
              mode="content"
              title="A Growth Agency Built Around Clarity"
              description={companyProfile.shortDescription}
              maxWidth="lg"
            />
            <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
              <p>{companyProfile.longDescription}</p>
              <p>
                Our goal is to build growth systems that turn ambition into results and brands into market leaders.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-white/10 bg-background/75 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Vision</p>
              <p className="mt-3 text-lg font-semibold">{companyProfile.vision}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-background/75 p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Mission</p>
              <p className="mt-3 text-lg font-semibold">{companyProfile.mission}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-background/75 p-6 sm:col-span-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Core Values</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {companyProfile.coreValues.map((value, index) => {
                  const Icon = valueIcons[index % valueIcons.length];

                  return (
                    <div key={value} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4">
                      <Icon className="h-4 w-4 text-primary" />
                      <p className="mt-3 text-sm font-medium text-foreground">{value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection mode="content" surface="quiet" border="top">
        <SectionIntro
          eyebrow="CTMA Method"
          mode="content"
          title="Our Service Framework"
          description="Every engagement is built on four integrated disciplines that work together to drive performance."
          maxWidth="lg"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {ctmaFramework.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">CTMA Pillar</p>
              <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.details.map((detail) => (
                  <span key={detail} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-muted-foreground">
                    {detail}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(0,51,153,0.14)_0%,rgba(255,255,255,0.015)_100%)] p-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">Primary Sectors</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            We have supported brands across consumer, service, and education sectors, with repeat delivery across the categories below.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {primarySectors.map((sector) => (
              <span key={sector} className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm">
                {sector}
              </span>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection mode="proof" border="top">
        <SectionIntro
          eyebrow="Why Choose AlphaTrack"
          mode="proof"
          title="The Three Pillars Behind the Profile"
          description="These are the positioning pillars that now need to stay consistent across the website, proposals, and marketing assets."
          maxWidth="lg"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {whyChoosePoints.map((item, index) => {
            const Icon = whyChooseIcons[index];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.02] p-7"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </PageSection>

      <CTASection
        title={
          <>
            Need a Team That Can Turn Strategy Into <span className="text-gradient">Measurable Growth</span>?
          </>
        }
        description="Book a free strategy call and we will show you the clearest next move across measurement, paid media, creative strategy, or automation."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        secondaryCta={{ label: "Contact Us", to: "/contact-us" }}
        variant="service-close"
        layout="split"
        proofChips={["Strategy-led execution", "Measurement-first by default", "Full-funnel thinking"]}
      />
    </>
  );
};

export default AboutUs;
