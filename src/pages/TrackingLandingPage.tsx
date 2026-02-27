import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, CheckCircle, BarChart3, Ghost, Flame } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { submitLead } from "@/lib/leads";

const auditSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(100),
  lastName: z.string().trim().min(1, "Last name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  websiteUrl: z.string().trim().url("Please enter a valid URL").max(500),
  monthlyAdSpend: z.string().min(1, "Please select your ad spend"),
  adPlatforms: z.string().trim().min(1, "Please tell us which platforms you use").max(500),
});

type AuditFormData = z.infer<typeof auditSchema>;

interface PainPoint {
  icon: LucideIcon;
  title: string;
  description: string;
}

const painPoints: PainPoint[] = [
  {
    icon: BarChart3,
    title: "GA4 says one thing, Meta says another",
    description:
      "Your numbers do not match across platforms. You cannot trust any of them to make budget decisions.",
  },
  {
    icon: Ghost,
    title: "Conversions are missing or doubled",
    description:
      "Form submissions, calls, and purchases are not being tracked correctly, or they are counted twice.",
  },
  {
    icon: Flame,
    title: "Ad platforms cannot optimize",
    description:
      "Without accurate conversion data, your ads are flying blind and cost per lead keeps climbing.",
  },
];

const offerCards = [
  {
    highlight: true,
    badge: "Free",
    title: "Conversion Tracking Audit",
    description:
      "We review your current tracking setup and deliver a report showing what is working, what is broken, and what it is costing you.",
    features: [
      "GA4 configuration review",
      "Ad platform tracking check (Meta, Google Ads)",
      "Conversion event validation",
      "Tag Manager audit",
      "Written report with fix priorities",
    ],
  },
  {
    highlight: false,
    badge: "20% Off",
    title: "Full Tracking Setup",
    description:
      "If you want us to fix what we find, you get 20% off our standard setup fee. Measurement plan, implementation, and QA included.",
    features: [
      "Measurement plan tailored to your business",
      "GA4 + Meta + Google Ads tracking setup",
      "Every event validated before go-live",
      "Full documentation and handover",
      "20% discount on published tier pricing",
    ],
  },
];

const proofStats = [
  { stat: "97%", label: "Of tracking setups we audit have at least one critical issue" },
  { stat: "5-7", label: "Working days from kickoff to a fully validated tracking setup" },
  { stat: "GBP0", label: "Cost of the audit even if you do not work with us after" },
];

const adSpendOptions = [
  { value: "", label: "Select range" },
  { value: "Under GBP1,000", label: "Under GBP1,000" },
  { value: "GBP1,000 - GBP5,000", label: "GBP1,000 - GBP5,000" },
  { value: "GBP5,000 - GBP20,000", label: "GBP5,000 - GBP20,000" },
  { value: "GBP20,000+", label: "GBP20,000+" },
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
    <div className="flex min-h-screen flex-col" style={{ background: "#080808", color: "#fff" }}>
      <SEO
        title="Free Conversion Tracking Audit | Founders Offer | AlphaTrack Digital"
        description="Get a free conversion tracking audit and 20% off your setup. We show you exactly what is broken and what it is costing you."
        canonicalUrl="/offer/tracking-audit"
      />

      <header
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.04]"
        style={{ background: "rgba(8,8,8,0.95)", backdropFilter: "blur(20px)" }}
      >
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3.5">
          <Link to="/" aria-label="AlphaTrack Digital Home" className="flex items-center gap-2.5">
            <img
              src="/favicon.png"
              alt=""
              aria-hidden="true"
              className="h-8 w-8 rounded-md"
              width={32}
              height={32}
            />
            <span className="text-sm font-semibold tracking-wide">AlphaTrack Digital</span>
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-md bg-primary text-xs font-bold tracking-wide text-primary-foreground hover:bg-primary/90"
          >
            <a href="#claim">Claim Your Audit</a>
          </Button>
        </div>
      </header>

      <div
        className="fixed left-0 right-0 top-[62px] z-40 px-5 py-2.5 text-center text-[13px] font-semibold"
        style={{ background: "linear-gradient(90deg, #003399, #00AFEF)" }}
      >
        <span className="mr-2 rounded bg-white/20 px-2.5 py-0.5">FOUNDERS OFFER</span>
        Limited to the first 10 clients. Free tracking audit + 20% off setup.
      </div>

      <section className="relative pb-24 pt-[160px] text-center">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.1)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-[1100px] px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div
              className="mb-7 inline-block rounded-full border border-primary/25 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-primary"
              style={{ background: "linear-gradient(135deg, rgba(62,207,142,0.15), rgba(0,175,239,0.1))" }}
            >
              Founders Offer - Limited Availability
            </div>
            <h1 className="mx-auto max-w-[800px] text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Your Ads Are Spending.
              <br />
              Is Your <span className="text-gradient">Tracking Working?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-lg leading-relaxed text-muted-foreground">
              Get a free conversion tracking audit and 20% off your setup. We show you exactly what
              is broken, what is missing, and what it is costing you.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-10 gap-2.5 rounded-xl bg-primary px-11 text-lg font-extrabold text-primary-foreground shadow-[0_4px_20px_rgba(62,207,142,0.3)] transition-all hover:-translate-y-1 hover:bg-primary/90"
            >
              <a href="#claim">Claim Your Free Audit</a>
            </Button>
            <p className="mt-3.5 text-sm text-muted-foreground">
              Free audit · No commitment · Limited spots
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white/[0.015] py-20 text-center">
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="text-3xl font-extrabold">If Any of This Sounds Familiar...</h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Most businesses we talk to have at least two of these problems. They are usually spending
            on ads without knowing what is truly working.
          </p>
          <div className="mx-auto mt-12 grid max-w-[900px] gap-5 sm:grid-cols-3">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border p-7 text-left"
                style={{ background: "rgba(255,60,60,0.04)", borderColor: "rgba(255,60,60,0.08)" }}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <p.icon className="h-5 w-5 text-primary" />
                </div>
                <h4 className="text-base font-semibold" style={{ color: "#ff8a8a" }}>
                  {p.title}
                </h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/book-a-call">Book a Call</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
              What You Get
            </span>
            <h2 className="text-4xl font-extrabold">The Founders Offer</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Two things that can change how you spend on ads, starting this week.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {offerCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl border p-9 transition-all hover:-translate-y-1 ${
                  card.highlight
                    ? "border-primary bg-gradient-to-br from-primary/[0.06] to-white/[0.02]"
                    : "border-white/[0.06] bg-white/[0.03]"
                }`}
              >
                <span className="mb-3.5 inline-block rounded bg-primary/[0.12] px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                  {card.badge}
                </span>
                <h3 className="text-xl font-bold">{card.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="font-bold text-primary">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/[0.015] py-16">
        <div className="mx-auto grid max-w-[900px] gap-5 px-6 sm:grid-cols-3">
          {proofStats.map((s) => (
            <div key={s.stat} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 text-center">
              <p className="text-4xl font-black text-primary">{s.stat}</p>
              <p className="mt-2 text-[13px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="claim" className="relative py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-[600px] px-6 text-center">
          <h2 className="text-4xl font-extrabold">
            Claim Your <span className="text-gradient">Free Audit</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Fill in the form below and we will schedule your tracking audit within 48 hours.
          </p>

          <div className="mt-9 rounded-2xl border border-primary/15 bg-white/[0.03] p-9 text-left">
            {isSubmitted ? (
              <div className="py-8 text-center">
                <CheckCircle className="mx-auto mb-4 h-14 w-14 text-primary" />
                <h3 className="text-2xl font-bold">Audit Requested</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  We will review your setup and be in touch within 48 hours.
                </p>
                <Button asChild className="mt-6 gap-2 rounded-lg bg-primary font-bold text-primary-foreground hover:bg-primary/90">
                  <Link to="/book-a-call">Book a Call While You Wait</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
                    <label htmlFor="audit-first-name" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
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
                    <label htmlFor="audit-last-name" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
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
                  <label htmlFor="audit-email" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
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
                  <label htmlFor="audit-website-url" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
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
                  <label htmlFor="audit-monthly-spend" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
                    Monthly Ad Spend
                  </label>
                  <select
                    id="audit-monthly-spend"
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-foreground"
                    aria-invalid={!!errors.monthlyAdSpend}
                    aria-describedby={errors.monthlyAdSpend ? "audit-monthly-spend-error" : undefined}
                    {...register("monthlyAdSpend")}
                  >
                    {adSpendOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
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
                  <label htmlFor="audit-platforms" className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">
                    What platforms are you running ads on?
                  </label>
                  <Input
                    id="audit-platforms"
                    placeholder="e.g. Meta, Google Ads, LinkedIn"
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
                  className="w-full rounded-lg bg-primary py-4 font-extrabold text-primary-foreground hover:bg-primary/90"
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
                  No spam and no hard sell. We respond within 48 hours and keep your data private.
                </p>
              </form>
            )}
          </div>

          {!isSubmitted && (
            <div
              className="mx-auto mt-5 inline-flex items-center gap-2.5 rounded-lg border px-5 py-3 text-sm font-semibold"
              style={{ background: "rgba(255,180,0,0.06)", borderColor: "rgba(255,180,0,0.15)", color: "#ffb400" }}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#ffb400]" />
              7 of 10 spots remaining
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/[0.04] py-6 text-center">
        <div className="mx-auto max-w-[1100px] px-6">
          <p className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              AlphaTrack Digital
            </Link>{" "}
            ·{" "}
            <Link to="/contact-us" className="hover:text-primary">
              Contact
            </Link>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">© AlphaTrack Digital 2026. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TrackingLandingPage;
