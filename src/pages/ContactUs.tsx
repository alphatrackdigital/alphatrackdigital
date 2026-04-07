import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import PageSection from "@/components/shared/PageSection";
import SectionIntro from "@/components/shared/SectionIntro";
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { companyProfile } from "@/data/companyProfile";
import { submitLead } from "@/lib/leads";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const MIN_FORM_FILL_TIME_MS = 1500;
const SUBMISSION_THROTTLE_MS = 5000;

const contactDetails = [
  {
    label: "Email",
    value: companyProfile.contact.email,
    href: `mailto:${companyProfile.contact.email}`,
  },
  {
    label: "Ghana",
    value: companyProfile.contact.phoneDisplay,
    href: companyProfile.contact.phoneHref,
  },
  {
    label: "Nigeria",
    value: companyProfile.contact.secondaryPhoneDisplay,
    href: companyProfile.contact.secondaryPhoneHref,
  },
  {
    label: "Website",
    value: companyProfile.contact.websiteDisplay,
    href: companyProfile.contact.websiteUrl,
  },
] as const;

const messagePrompts = [
  "What you want to grow or improve.",
  "What is not working right now.",
  "Any timeline or launch date we should know.",
] as const;

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
        message: data.message,
      });
      navigate("/contact-us/thank-you");
    } catch {
      toast.error(`Something went wrong. Please try again or email ${companyProfile.contact.email}`);
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

      <PageSection mode="hero" surface="glow" spacing="default">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex h-full flex-col gap-8"
          >
            <SectionIntro
              as="h1"
              eyebrow="Contact Us"
              mode="hero"
              maxWidth="md"
              title="Tell Us What You Need Help With"
              description="Share the challenge, the goal, or the bottleneck. We will review the context and reply with the clearest next step."
            />

            <div className="flex flex-1 flex-col rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.028)_0%,rgba(255,255,255,0.015)_100%)] p-6 shadow-[0_20px_48px_rgba(0,0,0,0.16)] md:p-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                  Contact Details
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight">Reach us directly</h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                  Use the form if you want to share full context. If email or phone is easier, the
                  details below will reach us directly.
                </p>
              </div>

              <div className="mt-8 flex-1 border-t border-white/10 pt-6">
                {contactDetails.map((item) => (
                  <div key={item.label} className="border-b border-white/8 py-4 first:pt-0 last:border-b-0 last:pb-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">
                      {item.label}
                    </p>
                    <a
                      href={item.href}
                      className="mt-1 block break-words text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">
                  Helpful to Include
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                  {messagePrompts.map((prompt) => (
                    <li key={prompt} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/offer/tracking-audit"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Need a deeper review? Get a Free Growth Audit <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="h-full rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.25)] md:p-10"
          >
            <div className="border-b border-white/10 pb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                Send a Message
              </p>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company-website">Website</label>
                <input
                  id="contact-company-website"
                  name="contact-company-website"
                  type="text"
                  autoComplete="off"
                  tabIndex={-1}
                  value={honeypotValue}
                  onChange={(event) => setHoneypotValue(event.target.value)}
                />
              </div>

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

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
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

              <div>
                <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
                  Company
                </label>
                <Input
                  id="company"
                  placeholder="Your company"
                  autoComplete="organization"
                  className="border-white/10 bg-white/5"
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? "company-error" : undefined}
                  {...register("company")}
                />
                {errors.company && (
                  <p id="company-error" className="mt-1 text-xs text-red-500">
                    {errors.company.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about the problem, project, or goal."
                  rows={6}
                  className="border-white/10 bg-white/5"
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

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  "Submit Message"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </PageSection>
    </>
  );
};

export default ContactUs;
