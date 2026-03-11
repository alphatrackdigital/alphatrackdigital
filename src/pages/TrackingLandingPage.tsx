import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageSection from "@/components/shared/PageSection";
import SectionIntro from "@/components/shared/SectionIntro";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  CheckSquare,
  Flame,
  Ghost,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { submitLead } from "@/lib/leads";
import type { JourneyStep, OfferCard, ProofMetric } from "@/types/page-content";

const auditSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  websiteUrl: z.string().trim().url("Please enter a valid URL").max(500),
  monthlyAdSpend: z.string().min(1, "Please select your ad spend"),
  adPlatforms: z.string().trim().min(1, "Please tell us which platforms you use").max(500),
});

type AuditFormData = z.infer<typeof auditSchema>;

interface DiagnosticItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const diagnosticItems: DiagnosticItem[] = [
  {
    icon: BarChart3,
    title: "Platform numbers do not agree",
    description:
      "GA4, ad platforms, and forms are telling different stories, so nobody trusts the numbers enough to act on them.",
  },
  {
    icon: Ghost,
    title: "Conversions are missing or duplicated",
    description:
      "Leads, calls, or purchases are not being counted properly, which breaks both reporting and optimization.",
  },
  {
    icon: Flame,
    title: "Campaigns are optimizing on weak signals",
    description:
      "If the tracking is unreliable, budget decisions and automated bidding are both learning from noise.",
  },
];

const offerCards: OfferCard[] = [
  {
    highlight: true,
    badge: "Included",
    title: "Free Conversion Tracking Audit",
    description:
      "We review your setup and send back a clear audit covering what is working, what is broken, and what needs attention first.",
    features: [
      "GA4 configuration review",
      "Meta and Google Ads tracking check",
      "Conversion event validation",
      "Tag Manager review",
      "Written fix priorities",
    ],
  },
  {
    highlight: false,
    badge: "Founders Offer",
    title: "20% Off Implementation",
    description:
      "If you want us to fix what we find, the same offer includes 20% off a full tracking setup and validation project.",
    features: [
      "Measurement plan tailored to your business",
      "GA4 and ad platform implementation",
      "QA before go-live",
      "Documentation and handover",
      "Discount applied to published setup tiers",
    ],
  },
];

const proofMetrics: ProofMetric[] = [
  {
    value: "97%",
    label: "Of tracking setups we review have at least one critical issue",
  },
  {
    value: "5-7",
    label: "Working days for a validated setup once implementation begins",
  },
  {
    value: "48h",
    label: "Response window for the audit request",
  },
];

const auditSteps: JourneyStep[] = [
  {
    step: "01",
    title: "Share the setup",
    description: "Tell us the site, the platforms you run, and the budget level you are working with.",
    icon: CheckSquare,
  },
  {
    step: "02",
    title: "We review the signal quality",
    description: "We check tracking logic, event setup, and the gaps that are distorting decisions.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "You get a practical audit",
    description: "We come back with findings, fix priorities, and the next sensible step.",
    icon: CheckCircle2,
  },
];

const adSpendOptions = [
  { value: "", label: "Select level" },
  { value: "Not spending consistently yet", label: "Not spending consistently yet" },
  { value: "Under 1k per month", label: "Under 1k per month" },
  { value: "1k to 5k per month", label: "1k to 5k per month" },
  { value: "5k to 20k per month", label: "5k to 20k per month" },
  { value: "20k+ per month", label: "20k+ per month" },
];

const MIN_FORM_FILL_TIME_MS = 1500;
const SUBMISSION_THROTTLE_MS = 5000;

const TrackingLandingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState("");
  const formStartTime = useRef(Date.now());
  const lastSubmissionTime = useRef(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
    defaultValues: { monthlyAdSpend: "" },
  });

  const onSubmit = async (data: AuditFormData) => {
    if (honeypotValue.trim()) return;

    const now = Date.now();
    if (now - formStartTime.current < MIN_FORM_FILL_TIME_MS) {
      toast.error("Please take a moment to complete the form.");
      return;
    }
    if (now - lastSubmissionTime.current < SUBMISSION_THROTTLE_MS) {
      toast.error("Please wait a few seconds before submitting again.");
      return;
    }
    lastSubmissionTime.current = now;

    setIsSubmitting(true);
    try {
      await submitLead({
        source: "tracking_audit_offer",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        websiteUrl: data.websiteUrl,
        monthlyAdSpend: data.monthlyAdSpend,
        adPlatforms: data.adPlatforms,
      });
      setIsSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again or email info@alphatrack.digital");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO
        title="Free Conversion Tracking Audit | AlphaTrack Digital"
        description="Request a free conversion tracking audit to find what is broken, what is missing, and what to fix first before you scale spend."
        canonicalUrl="/offer/tracking-audit"
      />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-4 lg:px-8">
          <Link to="/" aria-label="AlphaTrack Digital Home" className="flex items-center">
            <img
              src="/logo-wordmark.png"
              alt="AlphaTrack Digital"
              className="h-8 w-auto sm:h-9"
              width={800}
              height={188}
            />
          </Link>
          <Button asChild size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#claim">Claim Your Audit</a>
          </Button>
        </div>
      </header>

      <div className="fixed left-0 right-0 top-[72px] z-40 border-b border-white/10 bg-white/[0.03] px-4 py-2.5 text-center text-xs text-muted-foreground backdrop-blur-md">
        <span className="font-semibold text-foreground">Founders offer:</span> Free audit plus 20% off implementation for the first 10 qualified teams.
      </div>

      <PageSection
        mode="hero"
        surface="glow"
        spacing="compact"
        className="pt-[150px] pb-20 md:pt-[168px] md:pb-24"
      >
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionIntro
              as="h1"
              eyebrow="Conversion Tracking Audit"
              mode="hero"
              maxWidth="xl"
              align="center"
              title={
                <>
                  Get a Clear Audit of What Your <span className="text-gradient">Tracking</span> Is Missing
                </>
              }
              description="We review your current setup, validate the core conversion paths, and show you what is broken, what is missing, and what to fix first."
              titleClassName="mx-auto"
              descriptionClassName="mx-auto max-w-3xl"
            />

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Free audit
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Response within 48 hours
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                No obligation to continue
              </span>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="gap-1.5 rounded-xl bg-primary px-8 text-primary-foreground shadow-[0_0_24px_rgba(51,204,153,0.14)] hover:bg-primary/90"
              >
                <a href="#claim">
                  Claim Your Free Audit <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-1.5 rounded-xl border-white/20 bg-white/[0.02] hover:bg-white/5"
              >
                <Link to="/book-a-call">
                  Book a Call Instead <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Clear findings, written priorities, and a calmer path to fixing attribution.
            </p>
          </motion.div>
        </div>
      </PageSection>

      <PageSection mode="content" surface="quiet" border="top">
        <SectionIntro
          eyebrow="Diagnostic Signals"
          mode="content"
          title="If Any of These Sound Familiar, the Tracking Layer Needs Attention"
          description="Most audit requests start here: spending is happening, but the data is too weak to support confident decisions."
          maxWidth="xl"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {diagnosticItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className="rounded-[24px] border border-white/8 bg-background/70 p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04]">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <PageSection mode="content" border="top">
        <SectionIntro
          eyebrow="What You Get"
          mode="content"
          title="A Founders Offer Built to Remove Friction"
          description="The audit gives you clarity first. If you want implementation after that, the offer carries forward."
          maxWidth="lg"
          className="mb-10"
        />
        <div className="grid gap-5 lg:grid-cols-2">
          {offerCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className={
                card.highlight
                  ? "rounded-[28px] border border-primary/20 bg-[linear-gradient(180deg,rgba(0,51,153,0.14)_0%,rgba(0,175,239,0.035)_42%,rgba(51,204,153,0.03)_100%)] p-8"
                  : "rounded-[28px] border border-white/10 bg-white/[0.02] p-8"
              }
            >
              <span
                className={
                  card.highlight
                    ? "inline-flex rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground"
                    : "inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                }
              >
                {card.badge}
              </span>
              <h2 className="mt-5 text-2xl font-semibold">{card.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.description}</p>
              <ul className="mt-6 space-y-3">
                {card.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <PageSection mode="proof" surface="quiet" border="top">
        <div className="grid gap-4 md:grid-cols-3">
          {proofMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.35 }}
              className="rounded-[24px] border border-white/8 bg-background/70 p-6 text-center"
            >
              <p className="text-3xl font-bold text-gradient">{metric.value}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <PageSection id="claim" mode="content" border="top">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <SectionIntro
              eyebrow="Claim the Audit"
              mode="content"
              title="Tell Us About the Current Setup"
              description="A few details are enough for us to judge whether the audit is a good fit and what we should review first."
              maxWidth="md"
            />

            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.02] p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                What Happens After You Submit
              </p>
              <ol className="mt-6 space-y-5">
                {auditSteps.map((step) => (
                  <li key={step.step} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      {step.icon ? <step.icon className="h-4 w-4 text-primary" /> : <span className="text-xs font-semibold text-primary">{step.step}</span>}
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">{step.step}</p>
                      <p className="mt-1 text-sm font-semibold">{step.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.24)] md:p-10"
          >
            {isSubmitted ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
                <h2 className="mt-5 text-2xl font-semibold">Audit Requested</h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">
                  We will review the context and come back within 48 hours with the next step.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild className="gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to="/book-a-call">
                      Book a Call While You Wait <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="gap-1.5 rounded-xl border-white/20 hover:bg-white/5">
                    <Link to="/">
                      Back to site <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="border-b border-white/10 pb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                    Audit Request Form
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold">Share the essentials</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Keep it concise. We only need enough context to understand the setup and the current risk.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5" noValidate>
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="tracking-audit-company-website">Website</label>
                    <input
                      id="tracking-audit-company-website"
                      name="tracking-audit-company-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypotValue}
                      onChange={(event) => setHoneypotValue(event.target.value)}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="audit-first-name" className="mb-1.5 block text-sm font-medium">
                        First Name
                      </label>
                      <Input
                        id="audit-first-name"
                        placeholder="John"
                        autoComplete="given-name"
                        className="border-white/10 bg-white/5"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? "audit-first-name-error" : undefined}
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <p id="audit-first-name-error" className="mt-1 text-xs text-red-500">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="audit-last-name" className="mb-1.5 block text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="audit-last-name"
                        placeholder="Doe"
                        autoComplete="family-name"
                        className="border-white/10 bg-white/5"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? "audit-last-name-error" : undefined}
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <p id="audit-last-name-error" className="mt-1 text-xs text-red-500">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="audit-email" className="mb-1.5 block text-sm font-medium">
                      Work Email
                    </label>
                    <Input
                      id="audit-email"
                      type="email"
                      placeholder="john@company.com"
                      autoComplete="email"
                      className="border-white/10 bg-white/5"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "audit-email-error" : undefined}
                      {...register("email")}
                    />
                    {errors.email && (
                      <p id="audit-email-error" className="mt-1 text-xs text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="audit-website-url" className="mb-1.5 block text-sm font-medium">
                      Website URL
                    </label>
                    <Input
                      id="audit-website-url"
                      type="url"
                      placeholder="https://yourwebsite.com"
                      className="border-white/10 bg-white/5"
                      aria-invalid={!!errors.websiteUrl}
                      aria-describedby={errors.websiteUrl ? "audit-website-url-error" : undefined}
                      {...register("websiteUrl")}
                    />
                    {errors.websiteUrl && (
                      <p id="audit-website-url-error" className="mt-1 text-xs text-red-500">
                        {errors.websiteUrl.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="audit-monthly-spend" className="mb-1.5 block text-sm font-medium">
                      Monthly Ad Spend Level
                    </label>
                    <select
                      id="audit-monthly-spend"
                      className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-foreground"
                      aria-invalid={!!errors.monthlyAdSpend}
                      aria-describedby={errors.monthlyAdSpend ? "audit-monthly-spend-error" : undefined}
                      {...register("monthlyAdSpend")}
                    >
                      {adSpendOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.monthlyAdSpend && (
                      <p id="audit-monthly-spend-error" className="mt-1 text-xs text-red-500">
                        {errors.monthlyAdSpend.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="audit-platforms" className="mb-1.5 block text-sm font-medium">
                      Which ad platforms are active right now?
                    </label>
                    <Input
                      id="audit-platforms"
                      placeholder="Meta, Google Ads, LinkedIn, TikTok, or similar"
                      className="border-white/10 bg-white/5"
                      aria-invalid={!!errors.adPlatforms}
                      aria-describedby={errors.adPlatforms ? "audit-platforms-error" : undefined}
                      {...register("adPlatforms")}
                    />
                    {errors.adPlatforms && (
                      <p id="audit-platforms-error" className="mt-1 text-xs text-red-500">
                        {errors.adPlatforms.message}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      "Submit Audit Request"
                    )}
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    No spam, no hard sell, and no hidden catch. We use this information only to review the audit request and respond.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </PageSection>

      <footer className="border-t border-white/10 py-6 text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-xs text-muted-foreground">
            <Link to="/" className="transition-colors hover:text-primary">
              AlphaTrack Digital
            </Link>
            {" | "}
            <Link to="/contact-us" className="transition-colors hover:text-primary">
              Contact
            </Link>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Copyright AlphaTrack Digital 2026. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TrackingLandingPage;
