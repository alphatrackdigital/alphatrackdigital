import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import {
  BarChart3,
  CheckCircle2,
  Flame,
  Ghost,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BOOK_A_FREE_STRATEGY_CALL_CTA, REQUEST_A_FREE_TRACKING_AUDIT_CTA } from "@/config/cta";
import { companyProfile } from "@/data/companyProfile";
import { submitLead } from "@/lib/leads";

const auditSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(100),
  lastName: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  websiteUrl: z.string().trim().url("Enter a valid URL").max(500),
  monthlyAdSpend: z.string().min(1, "Select your spend level"),
  adPlatforms: z.array(z.string()).min(1, "Select at least one platform"),
});

type AuditFormData = z.infer<typeof auditSchema>;

const PAIN_POINTS = [
  {
    icon: BarChart3,
    title: "Platform numbers do not agree",
    body: "GA4, ad platforms, and forms tell different stories, so nobody trusts the data enough to act on it.",
  },
  {
    icon: Ghost,
    title: "Conversions are missing or doubled",
    body: "Leads, calls, or purchases are not counted accurately, which breaks both reporting and automated bidding.",
  },
  {
    icon: Flame,
    title: "Budget is learning from noise",
    body: "When tracking is unreliable, every bid and budget decision is being trained on the wrong signal.",
  },
] as const;

const AUDIT_COVERS = [
  "Which conversion events are firing correctly and which are not",
  "Why your GA4 numbers do not line up with ad platform reporting",
  "Where Tag Manager may be misconfigured or creating duplicates",
  "Which Google Ads and Meta signals look reliable enough to optimize on",
  "A practical order of fixes so the team knows what to tackle first",
] as const;

const REVIEW_VALUES = [
  {
    icon: ShieldCheck,
    title: "Manual review",
    body: "Every request is reviewed by a person on our team. We do not send a generic score or auto-generated report.",
  },
  {
    icon: BarChart3,
    title: "Clear limits",
    body: "If something cannot be confirmed from your form and current setup, we say that plainly instead of guessing.",
  },
  {
    icon: CheckCircle2,
    title: "Useful next step",
    body: "The audit is meant to help you act. We focus on what matters first, not on creating a longer checklist.",
  },
] as const;

const FIT_POINTS = [
  "You are already running ads and the numbers do not line up",
  "You are not sure which conversions are trustworthy enough to optimize on",
  "You want a practical fix order before investing more budget",
  "You would rather get a straight answer than a dramatic pitch",
] as const;

const MOBILE_FIT_POINTS = [
  "Tracking mismatch",
  "Missing conversions",
  "Noisy ad signals",
  "Clear fix order",
] as const;

const REVIEW_STEPS = [
  {
    title: "You send the basics",
    body: "Website, spend band, and active platforms give us enough context to start a first-pass review.",
  },
  {
    title: "We review it manually",
    body: "We check the setup with a human eye and note what looks broken, missing, or unclear.",
  },
  {
    title: "We reply plainly",
    body: "We aim to respond within 48 hours with findings or one clarifying question if we need more context.",
  },
] as const;

const PLATFORM_OPTIONS = [
  "Google Ads",
  "Meta Ads",
  "TikTok Ads",
  "LinkedIn Ads",
  "Microsoft Ads",
  "Other",
] as const;

const SPEND_OPTIONS = [
  { value: "Not spending consistently yet", label: "Not spending consistently yet" },
  { value: "Under 1k per month", label: "Under $1k / mo" },
  { value: "1k to 5k per month", label: "$1k - $5k / mo" },
  { value: "5k to 20k per month", label: "$5k - $20k / mo" },
  { value: "20k+ per month", label: "$20k+ / mo" },
] as const;

const HERO_CHIPS = ["Free manual review", "Reply target: 48 hours", "No obligation"] as const;

const MIN_FILL_MS = 1500;
const THROTTLE_MS = 5000;

const fieldClassName =
  "border-white/10 bg-white/5 aria-[invalid=true]:border-red-500/40";

const Field = ({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) => (
  <div>
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium">
      {label}
    </label>
    {children}
    {error && (
      <p id={`${htmlFor}-err`} role="alert" className="mt-1 text-xs text-red-400">
        {error}
      </p>
    )}
  </div>
);

const AuditFitCard = ({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) => {
  const isMobile = variant === "mobile";

  return (
    <div
      className={
        isMobile
          ? "border-t border-white/10 pt-5"
          : "relative overflow-hidden rounded-[24px] border border-white/12 bg-[radial-gradient(circle_at_top_right,rgba(51,204,153,0.09),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.035)_0%,rgba(255,255,255,0.018)_100%)] p-5 shadow-[0_16px_42px_rgba(0,0,0,0.18)] backdrop-blur-[2px] sm:p-6 md:p-7 lg:rounded-[26px]"
      }
    >
      {!isMobile && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-primary/12 blur-[56px]"
          />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
        </>
      )}
      <p
        className={
          isMobile
            ? "text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/72"
            : "text-[1.08rem] font-semibold text-foreground sm:text-[1.15rem] md:text-[1.2rem]"
        }
      >
        {isMobile ? "Best fit for" : "Best fit if you need:"}
      </p>
      {isMobile ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {MOBILE_FIT_POINTS.map((item) => (
            <span
              key={item}
              className="inline-flex rounded-full border border-white/8 bg-white/[0.025] px-3 py-1.5 text-[12px] font-medium leading-5 text-foreground/82"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <ul className="mt-4 space-y-3 text-[0.96rem] leading-7 text-muted-foreground sm:mt-5 sm:space-y-3.5 sm:text-[0.98rem] md:text-[1.02rem]">
          {FIT_POINTS.map((item) => (
            <li key={item} className="flex gap-3.5">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_rgba(51,204,153,0.45)]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ProcessCard = () => (
  <div className="rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.012)_100%)] px-5 py-4 shadow-[0_14px_36px_rgba(0,0,0,0.12)]">
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
      Startup note
    </p>
    <p className="mt-3 text-sm leading-6 text-foreground/88">
      We are keeping the promise simple: careful review, clear limits, and no pressure to buy more
      work.
    </p>
    <div className="mt-4 space-y-3">
      {REVIEW_STEPS.map((step, index) => (
        <div key={step.title} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-primary/[0.08] text-xs font-semibold text-primary">
            0{index + 1}
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">{step.title}</p>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">{step.body}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TrackingLandingPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const formStart = useRef(0);
  const hasInteracted = useRef(false);
  const lastSubmit = useRef(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuditFormData>({
    resolver: zodResolver(auditSchema),
    defaultValues: { monthlyAdSpend: "", adPlatforms: [] },
  });

  const handleFirstInteraction = () => {
    if (!hasInteracted.current) {
      formStart.current = Date.now();
      hasInteracted.current = true;
    }
  };

  const onSubmit = async (data: AuditFormData) => {
    if (honeypot.trim()) return;

    const now = Date.now();
    if (now - formStart.current < MIN_FILL_MS) {
      toast.error("Please take a moment to fill in the form.");
      return;
    }
    if (now - lastSubmit.current < THROTTLE_MS) {
      toast.error("Please wait a moment before submitting again.");
      return;
    }
    lastSubmit.current = now;

    setIsSubmitting(true);
    try {
      await submitLead({
        source: "tracking_audit_offer",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        websiteUrl: data.websiteUrl,
        monthlyAdSpend: data.monthlyAdSpend,
        adPlatforms: data.adPlatforms.join(", "),
      });
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
    } catch {
      toast.error(`Something went wrong. Email us at ${companyProfile.contact.email}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Free Conversion Tracking Audit | AlphaTrack Digital"
        description="Request a free conversion tracking audit. We review your setup, show you what we can verify, and highlight what to fix first."
        canonicalUrl="/offer/tracking-audit"
      />

      <section className="relative overflow-hidden pb-20 pt-10 md:pb-24 md:pt-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/[0.07] blur-[140px]" />
        </div>
        <div className="container relative mx-auto max-w-3xl px-4 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
              Free tracking audit
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Stop making decisions on{" "}
              <span className="text-gradient title-safe-inline">tracking you cannot trust</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              We review the setup you already have and send a clear audit: what looks broken, what
              looks missing, and what to fix first. If something cannot be confirmed from the
              current setup, we will say that plainly.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-primary px-8 text-primary-foreground shadow-[0_0_36px_rgba(51,204,153,0.18)] hover:bg-primary/90"
              >
                <a href="#claim">
                  {REQUEST_A_FREE_TRACKING_AUDIT_CTA.label}
                </a>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {HERO_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-white/[0.01] py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="mb-10 text-center text-sm font-semibold text-muted-foreground">
            If any of these sound familiar, the tracking needs attention
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {PAIN_POINTS.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.35 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.08]">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Sound familiar?{" "}
            <a href="#claim" className="font-medium text-primary underline-offset-2 hover:underline">
              Claim the free audit
            </a>
          </p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container mx-auto max-w-2xl px-4 text-center lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
            What is included
          </p>
          <h2 className="text-2xl font-bold md:text-3xl">
            A clear audit of your tracking setup
          </h2>
          <p className="mx-auto mt-3 text-sm leading-7 text-muted-foreground">
            We review the main signals behind your reporting and come back with the clearest fix
            order we can justify.
          </p>
          <ul className="mt-8 grid gap-2.5 text-left sm:grid-cols-2">
            {AUDIT_COVERS.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm leading-6"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-muted-foreground">
            If you want help fixing what we find, we can scope that separately after the audit.
          </p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] bg-white/[0.01] py-12 md:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              How we keep it useful
            </p>
            <h2 className="text-2xl font-bold md:text-3xl">Practical, not theatrical</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              We are still an early-stage team, so we would rather make a precise promise than a
              dramatic one: careful review, clear limits, and a sensible next step.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
            {REVIEW_VALUES.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.35 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/15 bg-primary/[0.08]">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="claim" className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-6 md:gap-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(420px,500px)] lg:items-start lg:gap-6 xl:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative order-1 mx-auto flex w-full max-w-[34rem] flex-col text-center lg:mx-0 lg:max-w-none lg:pt-6 lg:pr-4 lg:text-left"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-[90px] lg:left-auto lg:translate-x-0"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-6 top-28 h-24 w-24 rounded-full bg-atd-blue/10 blur-[72px] lg:left-24 lg:right-auto lg:top-40 lg:h-28 lg:w-28"
              />

              <div className="space-y-6 sm:space-y-7 md:space-y-8">
                <span className="inline-flex w-fit items-center self-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90 lg:self-start">
                  Request your audit
                </span>

                <h2 className="mx-auto max-w-[20rem] text-[2.35rem] font-bold leading-[0.96] tracking-tight sm:max-w-[26rem] sm:text-[3rem] md:max-w-[31rem] md:text-[3.55rem] lg:mx-0 lg:max-w-[34rem] lg:text-[2.65rem] xl:text-[2.95rem]">
                  <span className="block text-foreground">Share the setup.</span>
                  <span className="mt-1 block text-gradient-atd-hero lg:mt-0">
                    We will review it honestly.
                  </span>
                </h2>

                <p className="mx-auto max-w-[22rem] text-[14.5px] leading-[1.95] text-muted-foreground sm:max-w-[31rem] sm:text-[15px] sm:leading-8 md:max-w-[35rem] md:text-base md:leading-8 lg:mx-0 lg:max-w-[38rem] lg:pt-2 lg:text-[1.05rem] lg:leading-[2rem]">
                  Tell us where the numbers feel unreliable and share the basics. We will review
                  what we can verify, flag anything unclear, and reply with the clearest next step
                  we see.
                </p>
              </div>

              <div className="hidden max-w-[33.5rem] space-y-4 lg:mt-12 lg:block">
                <AuditFitCard />
                <ProcessCard />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="order-2 mt-4 w-full rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.25)] sm:mt-5 sm:p-8 md:p-10 lg:mt-0 lg:max-w-[31.25rem] lg:justify-self-end lg:self-start lg:rounded-[28px]"
            >
              <div className="hidden lg:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                  Free Tracking Audit
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-6 text-center lg:py-10">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <h2 className="mt-4 text-xl font-semibold">Request received</h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                    We will review the setup and aim to reply within 48 hours. Check{" "}
                    <span className="font-medium text-foreground/80">{submittedEmail}</span>. If
                    we need a little more context first, we will ask.
                  </p>
                  <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <Button
                      asChild
                      className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>{BOOK_A_FREE_STRATEGY_CALL_CTA.label}</Link>
                    </Button>
                    <Button
                      asChild
                      variant="ghost"
                      className="rounded-xl text-muted-foreground hover:text-foreground"
                    >
                      <Link to="/">Back to site</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="border-b border-white/[0.06] pb-5 lg:mt-8">
                    <h2 className="text-xl font-semibold">Request your free audit</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      A few practical details and we can start the review.
                    </p>
                  </div>

                  <div className="hidden" aria-hidden="true">
                    <input
                      name="tracking-audit-company-website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                    />
                  </div>

                  <form
                    id="tracking-audit-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 pt-6 sm:space-y-6"
                    noValidate
                    onFocus={handleFirstInteraction}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="First Name" htmlFor="f-first" error={errors.firstName?.message}>
                        <Input
                          id="f-first"
                          placeholder="Jane"
                          autoComplete="given-name"
                          className={fieldClassName}
                          aria-invalid={!!errors.firstName}
                          aria-describedby={errors.firstName ? "f-first-err" : undefined}
                          {...register("firstName")}
                        />
                      </Field>

                      <Field label="Last Name" htmlFor="f-last" error={errors.lastName?.message}>
                        <Input
                          id="f-last"
                          placeholder="Smith"
                          autoComplete="family-name"
                          className={fieldClassName}
                          aria-invalid={!!errors.lastName}
                          aria-describedby={errors.lastName ? "f-last-err" : undefined}
                          {...register("lastName")}
                        />
                      </Field>
                    </div>

                    <Field label="Work Email" htmlFor="f-email" error={errors.email?.message}>
                      <Input
                        id="f-email"
                        type="email"
                        placeholder="jane@company.com"
                        autoComplete="email"
                        className={fieldClassName}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "f-email-err" : undefined}
                        {...register("email")}
                      />
                    </Field>

                    <Field label="Website URL" htmlFor="f-url" error={errors.websiteUrl?.message}>
                      <Input
                        id="f-url"
                        type="url"
                        placeholder="https://yoursite.com"
                        className={fieldClassName}
                        aria-invalid={!!errors.websiteUrl}
                        aria-describedby={errors.websiteUrl ? "f-url-err" : undefined}
                        {...register("websiteUrl")}
                      />
                    </Field>

                    <Field
                      label="Monthly Ad Spend Level"
                      htmlFor="f-spend"
                      error={errors.monthlyAdSpend?.message}
                    >
                      <Controller
                        control={control}
                        name="monthlyAdSpend"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger
                              id="f-spend"
                              className={fieldClassName}
                              aria-invalid={!!errors.monthlyAdSpend}
                              aria-describedby={errors.monthlyAdSpend ? "f-spend-err" : undefined}
                            >
                              <SelectValue placeholder="Select spend level" />
                            </SelectTrigger>
                            <SelectContent>
                              {SPEND_OPTIONS.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>

                    <fieldset
                      aria-invalid={!!errors.adPlatforms}
                      aria-describedby={errors.adPlatforms ? "f-platforms-err" : undefined}
                      className="space-y-2.5"
                    >
                      <legend className="text-sm font-medium">
                        Which ad platforms are active right now?
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {PLATFORM_OPTIONS.map((platform) => (
                          <label
                            key={platform}
                            className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium transition-colors focus-within:ring-1 focus-within:ring-primary/50 has-[:checked]:border-primary/30 has-[:checked]:bg-primary/[0.08] has-[:checked]:text-primary"
                          >
                            <input
                              type="checkbox"
                              value={platform}
                              className="sr-only"
                              {...register("adPlatforms")}
                            />
                            {platform}
                          </label>
                        ))}
                      </div>
                      {errors.adPlatforms && (
                        <p id="f-platforms-err" role="alert" className="text-xs text-red-400">
                          {errors.adPlatforms.root?.message ?? errors.adPlatforms.message}
                        </p>
                      )}
                    </fieldset>

                    <div className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] leading-6 text-muted-foreground">
                      We use these details only to review your request and reply. If we need deeper
                      access before we can verify something, we will say so before making
                      assumptions.
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full gap-1.5 rounded-xl bg-primary text-primary-foreground shadow-[0_0_18px_rgba(51,204,153,0.12)] hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(51,204,153,0.18)]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        REQUEST_A_FREE_TRACKING_AUDIT_CTA.label
                      )}
                    </Button>

                    <p className="text-center text-xs text-muted-foreground">
                      No spam. No hard sell. This free audit is a manual review from our team.
                    </p>
                  </form>
                </>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.14 }}
              className="order-3 mx-auto w-full max-w-[30rem] space-y-4 lg:hidden"
            >
              <AuditFitCard variant="mobile" />
              <ProcessCard />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackingLandingPage;
