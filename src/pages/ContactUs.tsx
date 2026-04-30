import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import PageSection from "@/components/shared/PageSection";
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companyProfile, featuredTestimonial } from "@/data/companyProfile";
import { submitLead } from "@/lib/leads";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(200),
  lastName: z.string().trim().min(1, "Last name is required").max(200),
  email: z.string().trim().email("Please enter a valid email"),
  serviceInterest: z.string().min(1, "Please select a service"),
  monthlyBudget: z.string().optional(),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  marketingOptIn: z.boolean().optional().default(false),
});

type ContactFormData = z.infer<typeof contactSchema>;

const MIN_FORM_FILL_TIME_MS = 1500;
const SUBMISSION_THROTTLE_MS = 5000;

const serviceOptions = [
  { label: "Paid Ads", value: "Paid Ads" },
  { label: "Marketing Automation", value: "Marketing Automation" },
  { label: "Analytics & Tracking", value: "Analytics/Tracking" },
  { label: "Growth Strategy", value: "Growth Strategy" },
  { label: "CRM & Lifecycle", value: "CRM & Lifecycle" },
  { label: "Other", value: "Other" },
] as const;

const budgetOptions = [
  { label: "Under $500", value: "<$500" },
  { label: "$500 - $1,500", value: "$500-$1,500" },
  { label: "$1,500 - $5,000", value: "$1,500-$5,000" },
  { label: "$5,000+", value: "$5,000+" },
] as const;

const focusAreas = [
  "Clearer attribution across channels",
  "Paid media with better visibility",
  "Lead and customer automation",
  "Growth systems built to scale",
] as const;

const mobileProofItems = [
  "Attribution clarity",
  "Paid media visibility",
  "Lead automation",
  "Growth systems",
] as const;

const testimonialPreview = `${featuredTestimonial.quote.split(". ")[0]}.`;

const selectClassName =
  "h-10 w-full appearance-none rounded-md border border-white/10 bg-white/5 px-3 pr-8 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

const BestFitCard = ({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) => {
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
          {mobileProofItems.map((item) => (
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
          {focusAreas.map((area) => (
            <li key={area} className="flex gap-3.5">
              <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary shadow-[0_0_12px_rgba(51,204,153,0.45)]" />
              <span>{area}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const TestimonialCard = () => (
  <div className="rounded-[20px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.012)_100%)] px-5 py-4 shadow-[0_14px_36px_rgba(0,0,0,0.12)]">
    <p className="text-sm leading-6 text-foreground/88">"{testimonialPreview}"</p>
    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">
      {featuredTestimonial.name}
    </p>
    <p className="mt-1 text-xs leading-5 text-muted-foreground/80">
      {featuredTestimonial.title}
    </p>
  </div>
);

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
    defaultValues: { marketingOptIn: false },
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
        optIn: data.marketingOptIn === true,
        serviceInterest: [data.serviceInterest],
        monthlyBudget: data.monthlyBudget || "",
        message: data.message || "",
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

      <PageSection
        mode="hero"
        surface="glow"
        spacing="spacious"
        className="pt-16 md:pt-24"
      >
        <div className="grid gap-6 md:gap-10 lg:grid-cols-[minmax(0,1.16fr)_minmax(420px,500px)] lg:gap-6 lg:items-start xl:gap-10">
          {/* LEFT COLUMN - Hero narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative order-1 mx-auto flex w-full max-w-[34rem] flex-col text-center lg:col-start-1 lg:mx-0 lg:max-w-none lg:pt-6 lg:pr-4 lg:text-left"
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
                Contact Us
              </span>

              <h1 className="mx-auto max-w-[20rem] text-[2.35rem] font-bold leading-[0.96] tracking-tight sm:max-w-[26rem] sm:text-[3rem] md:max-w-[31rem] md:text-[3.55rem] lg:mx-0 lg:max-w-[34rem] lg:text-[2.65rem] xl:text-[2.95rem]">
                <span className="block text-foreground">Talk to a Team That</span>
                <span className="mt-1 block text-gradient-atd-hero lg:mt-0">
                  Measures What Matters
                </span>
              </h1>

              <p className="mx-auto max-w-[22rem] text-[14.5px] leading-[1.95] text-muted-foreground sm:max-w-[31rem] sm:text-[15px] sm:leading-8 md:max-w-[35rem] md:text-base md:leading-8 lg:mx-0 lg:max-w-[38rem] lg:pt-2 lg:text-[1.05rem] lg:leading-[2rem]">
                Tell us what you are trying to grow, fix, or understand, and share a little context
                about your goals, current bottlenecks, or where performance feels unclear. We will
                review it and reply with the clearest next step within 3 business days.
              </p>
            </div>

            <div className="hidden max-w-[33.5rem] space-y-4 lg:mt-12 lg:block">
              <BestFitCard />
              <TestimonialCard />
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="order-2 mt-4 w-full rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.25)] sm:mt-5 sm:p-8 md:p-10 lg:col-start-2 lg:row-span-2 lg:order-2 lg:mt-0 lg:max-w-[31.25rem] lg:justify-self-end lg:self-start lg:rounded-[28px]"
          >
            <div className="hidden lg:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                Talk to Our Team
              </p>
            </div>

            <form
              id="contact-form"
              className="space-y-5 lg:mt-8 sm:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
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
              <div>
                <label htmlFor="first-name" className="mb-1.5 block text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="first-name"
                  placeholder="John"
                  autoComplete="given-name"
                  className="border-white/10 bg-white/5 aria-[invalid=true]:border-red-500/40"
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
                  className="border-white/10 bg-white/5 aria-[invalid=true]:border-red-500/40"
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

              {/* Email */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Company Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  className="border-white/10 bg-white/5 aria-[invalid=true]:border-red-500/40"
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

              {/* Service Interest - dropdown */}
              <div>
                <label htmlFor="service-interest" className="mb-1.5 block text-sm font-medium">
                  Service Interest
                </label>
                <div className="relative">
                  <select
                    id="service-interest"
                    className={selectClassName}
                    aria-invalid={!!errors.serviceInterest}
                    aria-describedby={errors.serviceInterest ? "service-interest-error" : undefined}
                    {...register("serviceInterest")}
                  >
                    <option value="" className="bg-background text-muted-foreground">
                      Select a service...
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-background">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                </div>
                {errors.serviceInterest && (
                  <p id="service-interest-error" className="mt-1 text-xs text-red-500">
                    {errors.serviceInterest.message}
                  </p>
                )}
              </div>

              {/* Monthly Media Budget */}
              <div>
                <label htmlFor="monthly-budget" className="mb-1.5 block text-sm font-medium">
                  Monthly Media Budget{" "}
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground/50">
                    optional
                  </span>
                </label>
                <div className="relative">
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
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Share a little context about what you need help with."
                  rows={5}
                  className="min-h-[128px] border-white/10 bg-white/5"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="rounded-[18px] border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] leading-6 text-muted-foreground">
                By submitting this form, you agree that we can review your enquiry and reply
                directly about it. Marketing updates remain optional.
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="marketing-opt-in"
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border border-white/20 bg-white/5 accent-primary"
                    {...register("marketingOptIn")}
                  />
                  <label
                    htmlFor="marketing-opt-in"
                    className="cursor-pointer text-[13.5px] leading-6 text-muted-foreground sm:text-sm"
                  >
                    Yes, you can also send me occasional insights and service updates by email.
                  </label>
                </div>
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
                  "Start the Conversation"
                )}
              </Button>
            </form>
          </motion.div>

          {/* LEFT COLUMN - Proof + testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="order-3 mx-auto w-full max-w-[30rem] lg:hidden"
          >
            <TestimonialCard />
          </motion.div>
        </div>
      </PageSection>
    </>
  );
};

export default ContactUs;
