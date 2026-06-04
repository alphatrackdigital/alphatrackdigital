import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

import SEO from "@/components/shared/SEO";
import HeroEyebrow from "@/components/shared/HeroEyebrow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { REQUEST_A_FREE_TRACKING_AUDIT_CTA } from "@/config/cta";
import { companyProfile } from "@/data/companyProfile";
import { submitLead } from "@/lib/leads";
import { pushLeadSubmissionEvent } from "@/lib/tracking";

const auditSchema = z.object({
  firstName: z.string().trim().min(1, "Required").max(100),
  lastName: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  websiteUrl: z.string().trim().url("Enter a valid URL").max(500),
  monthlyAdSpend: z.string().min(1, "Select your spend level"),
  adPlatforms: z.array(z.string()).min(1, "Select at least one platform"),
  marketingOptIn: z.boolean().optional().default(false),
});

type AuditFormData = z.infer<typeof auditSchema>;

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

const MIN_FILL_MS = 1500;
const THROTTLE_MS = 5000;

const fieldClassName =
  "h-11 rounded-xl border-white/10 bg-white/[0.045] text-foreground shadow-none placeholder:text-muted-foreground/55 focus-visible:ring-primary/45 aria-[invalid=true]:border-red-500/40";

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
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-foreground/90">
      {label}
    </label>
    {children}
    {error && (
      <p id={`${htmlFor}-err`} role="alert" className="mt-1.5 text-xs text-red-400">
        {error}
      </p>
    )}
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
    defaultValues: { monthlyAdSpend: "", adPlatforms: [], marketingOptIn: false },
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
      const result = await submitLead({
        source: "tracking_audit_offer",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        websiteUrl: data.websiteUrl,
        monthlyAdSpend: data.monthlyAdSpend,
        adPlatforms: data.adPlatforms.join(", "),
        optIn: data.marketingOptIn === true,
      });
      if (!result.duplicate) {
        pushLeadSubmissionEvent("tracking_audit_submit", {
          form_id: "tracking-audit-form",
          lead_source: "tracking_audit_offer",
          opt_in: data.marketingOptIn === true,
        });
      }
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
        description="Request a free conversion tracking audit. We review your website, ad platforms, and conversion setup, then show what to fix first."
        canonicalUrl="/offer/tracking-audit"
      />

      <section className="relative overflow-hidden border-b border-white/[0.05] pb-14 pt-28 md:pb-20 md:pt-32 lg:pb-24 lg:pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_74%_46%_at_50%_-8%,rgba(0,51,153,0.16)_0%,rgba(0,175,239,0.055)_43%,transparent_74%)]" />
          <div className="absolute right-[-7rem] top-16 h-80 w-80 rounded-full bg-primary/[0.055] blur-[120px]" />
          <div className="absolute left-[-8rem] bottom-[-5rem] h-96 w-96 rounded-full bg-atd-blue/[0.12] blur-[150px]" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(410px,480px)] lg:items-center lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="pt-2"
            >
              <HeroEyebrow>Free tracking audit</HeroEyebrow>

              <h1 className="title-safe mt-6 max-w-3xl text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-5xl md:text-[4rem] lg:text-[4.35rem]">
                Check if your{" "}
                <span className="title-safe-inline text-gradient-atd-hero">tracking is reliable.</span>
              </h1>

              <p className="mt-5 max-w-[38rem] text-base leading-8 text-muted-foreground md:text-lg">
                We check your website, ad platforms, and conversion setup, then show what is
                broken, missing, and worth fixing first.
              </p>
            </motion.div>

            <motion.div
              id="claim"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
              className="w-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.018)_100%)] p-6 shadow-[0_26px_80px_rgba(0,0,0,0.26)] sm:p-7 md:p-8 lg:sticky lg:top-28"
            >
              {isSubmitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <h2 className="mt-4 text-2xl font-semibold">Request received</h2>
                  <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    We will review your setup and aim to reply within 48 hours.
                  </p>
                  <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-muted-foreground">
                    We will send the reply to{" "}
                    <span className="font-medium text-foreground/85">{submittedEmail}</span>.
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    className="mt-7 rounded-xl text-muted-foreground hover:text-foreground"
                  >
                    <Link to="/">Back to site</Link>
                  </Button>
                </div>
              ) : (
                <>
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
                    className="space-y-6"
                    noValidate
                    aria-label="Request your free audit"
                    onFocus={handleFirstInteraction}
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
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
                      className="space-y-3"
                    >
                      <legend className="text-sm font-medium text-foreground/90">
                        Which ad platforms are active right now?
                      </legend>
                      <div className="flex flex-wrap gap-2.5">
                        {PLATFORM_OPTIONS.map((platform) => (
                          <label
                            key={platform}
                            className="flex cursor-pointer items-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-foreground/82 transition-colors focus-within:ring-1 focus-within:ring-primary/50 has-[:checked]:border-primary/35 has-[:checked]:bg-primary/[0.09] has-[:checked]:text-primary"
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

                    <div className="flex items-start gap-3 pt-1">
                      <input
                        type="checkbox"
                        id="f-marketing-opt-in"
                        className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20 bg-white/5 accent-primary"
                        {...register("marketingOptIn")}
                      />
                      <label
                        htmlFor="f-marketing-opt-in"
                        className="cursor-pointer text-[13.5px] leading-6 text-muted-foreground sm:text-sm"
                      >
                        Yes, you can also send me occasional insights and service updates by email.
                      </label>
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
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackingLandingPage;
