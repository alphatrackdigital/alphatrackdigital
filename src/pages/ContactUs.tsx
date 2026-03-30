import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarCheck,
  Clock3,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Search,
} from "lucide-react";
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
import type { ContactMethod, JourneyStep } from "@/types/page-content";

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    title: "Email the founder",
    description: "Best for project context, requirements, or sharing existing strategy material.",
    detail: companyProfile.contact.email,
    href: `mailto:${companyProfile.contact.email}`,
  },
  {
    icon: Phone,
    title: "Call Chris directly",
    description: "Use the founder contact from the corporate profile if you want a faster first conversation.",
    detail: companyProfile.contact.phoneDisplay,
    href: companyProfile.contact.phoneHref,
    secondaryDetail: companyProfile.contact.websiteDisplay,
    secondaryHref: companyProfile.contact.websiteUrl,
  },
  {
    icon: Clock3,
    title: "Response window",
    description: "Most new enquiries get a direct reply with next steps within one business day.",
    detail: companyProfile.contact.responseWindow,
  },
];

const journeySteps: JourneyStep[] = [
  {
    step: "01",
    title: "We receive your brief",
    description: "Your enquiry goes directly to the team handling strategy and implementation.",
    icon: MessageSquare,
  },
  {
    step: "02",
    title: "We review the growth context",
    description: "We look at the business goals, current setup, and the clearest route to help.",
    icon: Search,
  },
  {
    step: "03",
    title: "We come back with a next step",
    description: "That may be a founder reply, a strategy call, or a recommendation on what to fix first.",
    icon: CalendarCheck,
  },
];

const MIN_FORM_FILL_TIME_MS = 1500;
const SUBMISSION_THROTTLE_MS = 5000;

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
        description="Contact AlphaTrack Digital to discuss data-driven marketing, creative strategy, and the next step in your growth system."
        canonicalUrl="/contact-us"
      />

      <PageSection mode="hero" surface="glow" spacing="spacious">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionIntro
                as="h1"
                eyebrow="Contact Us"
                mode="hero"
                maxWidth="lg"
                title={
                  <>
                    Let’s Talk About How We Can <span className="text-gradient">Grow Your Brand</span>
                  </>
                }
                description="Share the context, the bottleneck, or the goal. We combine data, creativity, and technology to help brands attract the right audience, improve performance, and scale with confidence."
              />

              <div className="mt-6 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  {companyProfile.contact.responseWindow}
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  Direct with the founder
                </span>
                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                  Strategy-led next steps
                </span>
              </div>

              <div className="mt-8">
                <Button
                  asChild
                  variant="outline"
                  className="gap-1.5 rounded-full border-white/20 bg-white/[0.03] hover:bg-white/5"
                >
                  <Link to="/book-a-call">
                    Prefer a call? Book a time instead <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.35 }}
                  className="rounded-[24px] border border-white/8 bg-white/[0.02] p-6"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.04]">
                    <method.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="mt-4 text-base font-semibold">{method.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{method.description}</p>
                  <div className="mt-4 space-y-2 text-sm">
                    {method.href ? (
                      <a href={method.href} className="block font-medium text-foreground transition-colors hover:text-primary">
                        {method.detail}
                      </a>
                    ) : (
                      <p className="font-medium text-foreground">{method.detail}</p>
                    )}
                    {method.secondaryDetail &&
                      (method.secondaryHref ? (
                        <a
                          href={method.secondaryHref}
                          className="block font-medium text-foreground transition-colors hover:text-primary"
                        >
                          {method.secondaryDetail}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{method.secondaryDetail}</p>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="rounded-[28px] border border-white/10 bg-background/75 p-7">
              <SectionIntro
                eyebrow="What Happens Next"
                mode="proof"
                title="A Short, Clear Contact Flow"
                description="You should know what to expect before you hit submit."
                maxWidth="md"
                titleClassName="text-xl md:text-2xl"
              />
              <ol className="mt-6 space-y-5">
                {journeySteps.map((step) => (
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.02)_100%)] p-8 shadow-[0_24px_64px_rgba(0,0,0,0.25)] md:p-10"
          >
            <div className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85">
                  Send a Message
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Share the context</h2>
                <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                  A short brief is enough. Tell us what needs attention and we will respond with a useful next step anchored in strategy, measurement, and delivery.
                </p>
              </div>
              <Link
                to="/book-a-call"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Prefer a call? Book now <ArrowUpRight className="h-4 w-4" />
              </Link>
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
                  rows={5}
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
              <p className="text-center text-xs text-muted-foreground">
                We reply within 1 business day, keep your details private, and only use this information to respond to your enquiry.
              </p>
            </form>
          </motion.div>
        </div>
      </PageSection>
    </>
  );
};

export default ContactUs;
