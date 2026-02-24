import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Loader2, MessageSquare, Search, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
      toast.error("Something went wrong. Please try again or email info@alphatrack.digital");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | AlphaTrack Digital"
        description="Have a question or ready to get started? Reach out to AlphaTrack Digital. Offices in Accra and Lagos."
        canonicalUrl="/contact-us"
      />
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-secondary/5 blur-[120px]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-primary">
              Contact Us
            </span>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold md:text-5xl">
              Let's Start a <span className="text-gradient">Conversation</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Have a question, or ready to get started? Reach out. We'd love to hear from you.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Reply within 1 business day
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                No-pressure consultation
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2 lg:px-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold">Get In Touch</h2>
              <p className="mt-2 text-muted-foreground">
                We're here to help and answer any questions you might have.
              </p>
            </div>

            {/* What happens next */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                What Happens Next
              </h3>
              <ol className="space-y-4">
                {[
                  {
                    icon: MessageSquare,
                    step: "01",
                    title: "We receive your message",
                    desc: "Your enquiry lands directly with our team — no bots, no automated queue.",
                  },
                  {
                    icon: Search,
                    step: "02",
                    title: "We review & prepare",
                    desc: "Within 1 business day we review your goals and prepare relevant questions.",
                  },
                  {
                    icon: CalendarCheck,
                    step: "03",
                    title: "We schedule a strategy call",
                    desc: "We book a focused 20-minute call to understand your needs and recommend a plan.",
                  },
                ].map(({ icon: Icon, step, title, desc }) => (
                  <li key={step} className="flex items-start gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-primary/50">
                        {step}
                      </p>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <div className="glass-card flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Our Offices</h3>
                  <p className="mt-1 text-sm text-muted-foreground">Accra, Ghana</p>
                  <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                </div>
              </div>

              <div className="glass-card flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a
                    href="mailto:info@alphatrack.digital"
                    className="mt-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    info@alphatrack.digital
                  </a>
                </div>
              </div>

              <div className="glass-card flex items-start gap-4 p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <a
                    href="tel:+233530985334"
                    className="mt-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    +233 530 985 334 (Ghana)
                  </a>
                  <a
                    href="tel:+2348061992748"
                    className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    +234 806 199 2748 (Nigeria)
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10">
            <h2 className="text-xl font-bold">Send Us a Message</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill out the form and we'll get back to you soon.
            </p>
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
                  placeholder="Tell us about your project..."
                  rows={4}
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
                className="w-full gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
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
                We typically reply within 1 business day. We never sell your data.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
