import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import PageSection from "@/components/shared/PageSection";
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { companyProfile } from "@/data/companyProfile";
import { submitLead } from "@/lib/leads";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(200),
  lastName: z.string().trim().min(1, "Last name is required").max(200),
  email: z.string().trim().email("Please enter a valid email"),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  serviceInterest: z.array(z.string()).min(1, "Please select at least one area of interest"),
  monthlyBudget: z.string().optional(),
  preferredCallTime: z.string().min(1, "Please select a preferred call time"),
  optIn: z.boolean().refine((val) => val === true, {
    message: "You must agree to be contacted to submit this form",
  }),
});

type ContactFormData = z.infer<typeof contactSchema>;

const MIN_FORM_FILL_TIME_MS = 1500;
const SUBMISSION_THROTTLE_MS = 5000;

const serviceOptions = [
  { label: "Paid Ads", value: "Paid Ads" },
  { label: "Marketing Automation", value: "Marketing Automation" },
  { label: "Analytics & Tracking", value: "Analytics/Tracking" },
  { label: "Website / CRO", value: "Website/CRO" },
  { label: "SEO", value: "SEO" },
  { label: "Other", value: "Other" },
] as const;

const budgetOptions = [
  { label: "Under $500", value: "<$500" },
  { label: "$500 – $1,500", value: "$500-$1,500" },
  { label: "$1,500 – $5,000", value: "$1,500-$5,000" },
  { label: "$5,000+", value: "$5,000+" },
] as const;

const callTimeOptions = [
  { label: "Weekday mornings", value: "Weekday mornings" },
  { label: "Weekday afternoons", value: "Weekday afternoons" },
  { label: "Weekday evenings", value: "Weekday evenings" },
  { label: "Weekends", value: "Weekends" },
  { label: "Not sure yet", value: "Not sure yet" },
] as const;

const focusAreas = [
  "Getting attribution right before scaling spend",
  "Running paid media with full-funnel visibility",
  "Automating lead and customer workflows",
  "Building growth infrastructure that compounds",
  "Entering new markets with a clear strategy",
  "Long-term agency partnerships",
] as const;

const selectClassName =
  "h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const ContactUs = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState("");
  const formStartTime = useRef(Date.now());
  const lastSubmissionTime = useRef(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { serviceInterest: [] },
  });

  const onSubmit = async (data: ContactFormData) => {
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
        source: "contact_form",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        company: data.company || "",
        serviceInterest: data.serviceInterest,
        monthlyBudget: data.monthlyBudget || "",
        preferredCallTime: data.preferredCallTime,
      });
      navigate("/contact-us/thank-you");
    } catch {
      toast.error(
        `Something went wrong. Please email us directly at ${companyProfile.contact.email}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | AlphaTrack Digital"
        description="Contact AlphaTrack Digital to discuss measurement, automation, paid media, or your next growth priority."
        canonicalUrl="/contact-us"
      />

      <PageSection mode="hero" surface="glow" spacing="spacious">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* LEFT COLUMN — Hero narrative + proof panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 flex flex-col gap-8 lg:order-1"
          >
            <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
              Contact Us
            </span>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-[3.25rem]">
              Ready to Work With a{" "}
              <span className="text-gradient">Measurement-First</span> Growth Team?
            </h1>

            <p className="max-w-lg text-base leading-8 text-muted-foreground">
              We build lasting partnerships around clear measurement, efficient growth, and
              compounding results. Tell us where you are and where you want to be.
            </p>

            {/* Proof panel */}
            <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.015)_100%)] p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                We Work With Teams Focused On
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
                {focusAreas.map((area) => (
                  <li key={area} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/offer/tracking-audit"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Want a structured review? Get a Free Growth Audit{" "}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="order-1 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.25)] md:p-10 lg:order-2"
          >
            <div className="border-b border-white/10 pb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                Talk to Our Team
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Tell us where you are and where you want to be.
              </p>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Honeypot */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  value={honeypotValue}
                  onChange={(e) => setHoneypotValue(e.target.value)}
                />
              </div>

              {/* Name */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="mb-1.5 block text-sm font-medium">
                    First Name
                  </label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    autoComplete="given-name"
                    className="border-white/10 bg-white/5"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? "first-name-error" : undefined}
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p id="first-name-error" className="mt-1 text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="last-name" className="mb-1.5 block text-sm font-medium">
                    Last Name
                  </label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    autoComplete="family-name"
                    className="border-white/10 bg-white/5"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? "last-name-error" : undefined}
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p id="last-name-error" className="mt-1 text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  autoComplete="email"
                  className="border-white/10 bg-white/5"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
                  Company{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <Input
                  id="company"
                  placeholder="Company / Brand Name"
                  autoComplete="organization"
                  className="border-white/10 bg-white/5"
                  {...register("company")}
                />
              </div>

              {/* Service Interest — pill checkboxes */}
              <div>
                <p className="mb-2 text-sm font-medium">
                  Service Interest{" "}
                  <span className="text-xs font-normal text-primary/70">
                    (select all that apply)
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {serviceOptions.map((opt) => (
                    <label key={opt.value} className="cursor-pointer">
                      <input
                        type="checkbox"
                        value={opt.value}
                        className="peer sr-only"
                        {...register("serviceInterest")}
                      />
                      <span className="flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 peer-checked:border-primary/40 peer-checked:bg-primary/10 peer-checked:text-primary">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.serviceInterest && (
                  <p className="mt-2 text-xs text-red-500">
                    Please select at least one area of interest.
                  </p>
                )}
              </div>

              {/* Budget + Call Time */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="monthly-budget" className="mb-1.5 block text-sm font-medium">
                    Monthly Budget{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <select
                    id="monthly-budget"
                    className={selectClassName}
                    {...register("monthlyBudget")}
                  >
                    <option value="" className="bg-background text-muted-foreground">
                      Select range...
                    </option>
                    {budgetOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-background">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="preferred-call-time"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Preferred Call Time
                  </label>
                  <select
                    id="preferred-call-time"
                    className={selectClassName}
                    aria-invalid={!!errors.preferredCallTime}
                    aria-describedby={
                      errors.preferredCallTime ? "call-time-error" : undefined
                    }
                    {...register("preferredCallTime")}
                  >
                    <option value="" className="bg-background text-muted-foreground">
                      Select time...
                    </option>
                    {callTimeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-background">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.preferredCallTime && (
                    <p id="call-time-error" className="mt-1 text-xs text-red-500">
                      {errors.preferredCallTime.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Consent */}
              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="opt-in"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20 bg-white/5 accent-primary"
                    aria-invalid={!!errors.optIn}
                    aria-describedby={errors.optIn ? "opt-in-error" : undefined}
                    {...register("optIn")}
                  />
                  <label htmlFor="opt-in" className="cursor-pointer text-sm leading-6 text-muted-foreground">
                    I agree to be contacted about my enquiry. You may unsubscribe at any time.
                  </label>
                </div>
                {errors.optIn && (
                  <p id="opt-in-error" className="mt-1 text-xs text-red-500">
                    {errors.optIn.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  "Send Your Message"
                )}
              </Button>

              <p className="text-center text-xs text-muted-foreground/60">
                {companyProfile.contact.responseWindow} · No spam, no pressure.
              </p>
            </form>
          </motion.div>
        </div>
      </PageSection>

    </>
  );
};

export default ContactUs;
