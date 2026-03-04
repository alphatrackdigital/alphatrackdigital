import { motion } from "framer-motion";
import {
  BarChart3,
  CheckCircle2,
  Handshake,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";

import CTASection from "@/components/shared/CTASection";
import PageSection from "@/components/shared/PageSection";
import SectionIntro from "@/components/shared/SectionIntro";
import SEO from "@/components/shared/SEO";
import type { ProofMetric } from "@/types/page-content";

const proofMetrics: ProofMetric[] = [
  {
    value: "2+",
    label: "Years building measurement-first systems",
    note: "Focused on tracking, paid media, and lifecycle automation.",
  },
  {
    value: "6+",
    label: "Industries served",
    note: "Applied across B2B, retail, fintech, and service-led businesses.",
  },
  {
    value: "3",
    label: "Core disciplines under one roof",
    note: "Measurement, acquisition, and follow-up systems built to work together.",
  },
  {
    value: "100%",
    label: "Reporting built for clarity",
    note: "Real numbers, visible assumptions, and accountable next steps.",
  },
];

const principles = [
  {
    icon: Target,
    title: "Measurement First",
    description:
      "Every engagement starts by making sure the data is trustworthy enough to support real decisions.",
  },
  {
    icon: BarChart3,
    title: "Transparency",
    description:
      "We show what is working, what is not, and what should change next. No vanity reporting.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Thinking",
    description:
      "Execution is tied to outcomes. Every setup, campaign, and workflow has a business reason behind it.",
  },
];

const expectations = [
  {
    icon: Users,
    title: "A partner who can translate technical work",
    description:
      "You get direct answers, practical tradeoffs, and clear explanations without the usual agency fog.",
  },
  {
    icon: CheckCircle2,
    title: "Clear priorities instead of endless recommendations",
    description:
      "We focus on the fixes and opportunities that materially improve attribution, lead flow, or spend efficiency.",
  },
  {
    icon: Handshake,
    title: "A working style built around accountability",
    description:
      "We prefer visible progress, documented handover, and honest reporting over vague momentum.",
  },
];

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us | AlphaTrack Digital"
        description="AlphaTrack Digital is a measurement-first digital growth agency focused on conversion tracking, paid media, and automation systems that drive accountable growth."
        canonicalUrl="/about-us"
      />

      <PageSection mode="hero" surface="glow" spacing="spacious">
        <div className="mx-auto max-w-6xl">
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
              align="center"
              title={
                <>
                  We Build the Systems Behind Measurable <span className="text-gradient">Growth</span>
                </>
              }
              description="AlphaTrack Digital helps businesses track what matters, improve conversion visibility, and build the operational layer that turns marketing into accountable revenue."
              titleClassName="mx-auto"
              descriptionClassName="mx-auto max-w-3xl"
            />
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {proofMetrics.map((metric, index) => (
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
                {metric.note && (
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{metric.note}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection mode="content" surface="quiet" border="top">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
          <SectionIntro
            eyebrow="Our Story"
              mode="content"
              title="Why AlphaTrack Digital Exists"
              description="The agency was built around a simple problem: too many businesses were spending on growth without being able to trust the data behind it."
              maxWidth="lg"
            />
            <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
              <p>
                We kept seeing the same pattern. Campaigns were live, forms were coming in, budgets were moving, but nobody could say with confidence which channels were creating real value.
              </p>
              <p>
                That gap usually showed up in three places: weak attribution, broken handoff between marketing and follow-up, and reporting that created activity without clarity.
              </p>
              <p>
                AlphaTrack Digital was built to solve that layer first. We help teams measure accurately, automate the right follow-up, and scale the parts of their system that can actually be defended with data.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-background/80 p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
              The Standard We Hold
            </p>
            <p className="mt-5 text-xl font-semibold leading-relaxed md:text-2xl">
              Real growth needs reliable signals, transparent reporting, and execution that can stand up to scrutiny.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <p>We do not treat reporting as decoration.</p>
              <p>We do not separate strategy from implementation.</p>
              <p>We do not ask clients to make blind budget decisions.</p>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection mode="content" border="top">
        <SectionIntro
          eyebrow="How We Work"
          mode="content"
          title="The Principles Behind the Work"
          description="These are the standards that shape how we scope, build, and report every engagement."
          maxWidth="lg"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {principles.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="rounded-[24px] border border-white/10 bg-white/[0.02] p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <PageSection mode="proof" surface="quiet" border="top">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionIntro
            eyebrow="What Clients Can Expect"
            mode="proof"
            title="A Working Style Built for Clarity"
            description="We aim to be easy to work with because the work itself is already complicated enough."
            maxWidth="md"
          />

          <div className="space-y-4">
            {expectations.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="rounded-[24px] border border-white/8 bg-background/70 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.04]">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </PageSection>

      <CTASection
        title={
          <>
            Need a Team That Can Make Your <span className="text-gradient">Growth System</span> Clear?
          </>
        }
        description="Book a call and we will show you where measurement, automation, or paid media needs to tighten up next."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        secondaryCta={{ label: "Contact Us", to: "/contact-us" }}
        variant="service-close"
        layout="split"
        proofChips={["Measurement first", "Transparent reporting", "Clear handover"]}
      />
    </>
  );
};

export default AboutUs;
