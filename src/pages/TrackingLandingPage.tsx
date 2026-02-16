import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const painPoints = [
  { emoji: "📊", title: "GA4 Says One Thing, Meta Says Another", description: "Your numbers don't match across platforms. You can't trust any of them to make budget decisions." },
  { emoji: "👻", title: "Conversions Are Missing or Doubled", description: "Form submissions, calls, and purchases aren't being tracked — or they're counted twice." },
  { emoji: "🔥", title: "Ad Platforms Can't Optimise", description: "Without accurate conversion data, your ads are flying blind. Cost per lead keeps climbing." },
];

const offerCards = [
  {
    highlight: true,
    badge: "Free",
    title: "Conversion Tracking Audit",
    description: "We review your current tracking setup and deliver a report showing exactly what's working, what's broken, and what it's costing you.",
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
    description: "If you want us to fix what we find, you get 20% off our standard setup fee. Measurement plan, implementation, QA — the works.",
    features: [
      "Measurement plan tailored to your business",
      "GA4 + Meta + Google Ads tracking setup",
      "Every event validated before go-live",
      "Full documentation & handover",
      "20% discount on published tier pricing",
    ],
  },
];

const proofStats = [
  { stat: "97%", label: "Of tracking setups we audit have at least one critical issue" },
  { stat: "5–7", label: "Working days from kickoff to a fully validated tracking setup" },
  { stat: "£0", label: "Cost of the audit — even if you don't work with us after" },
];

const TrackingLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#080808", color: "#fff" }}>
      <SEO title="Free Conversion Tracking Audit | Founders Offer | AlphaTrack Digital" description="Get a free conversion tracking audit and 20% off your setup. We'll show you exactly what's broken and what it's costing you." />
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04]" style={{ background: "rgba(8,8,8,0.95)", backdropFilter: "blur(20px)" }}>
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3.5">
          <Link to="/"><img src={logo} alt="AlphaTrack Digital" className="h-8" /></Link>
          <Button asChild size="sm" className="rounded-md bg-primary text-primary-foreground font-bold text-xs tracking-wide hover:bg-primary/90">
            <a href="#claim">Claim Your Audit →</a>
          </Button>
        </div>
      </header>

      {/* Urgency Bar */}
      <div className="fixed top-[62px] left-0 right-0 z-40 text-center py-2.5 px-5 text-[13px] font-semibold" style={{ background: "linear-gradient(90deg, #003399, #00AFEF)" }}>
        <span className="mr-2 rounded bg-white/20 px-2.5 py-0.5">FOUNDERS OFFER</span>
        Limited to the first 10 clients — free tracking audit + 20% off setup
      </div>

      {/* Hero */}
      <section className="relative pt-[160px] pb-24 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.1)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative mx-auto max-w-[1100px] px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-7 inline-block rounded-full border border-primary/25 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-primary" style={{ background: "linear-gradient(135deg, rgba(62,207,142,0.15), rgba(0,175,239,0.1))" }}>
              🎯 Founders Offer — Limited Availability
            </div>
            <h1 className="mx-auto max-w-[800px] text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
              Your Ads Are Spending.<br />Is Your <span className="text-gradient">Tracking Working?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[560px] text-lg text-muted-foreground leading-relaxed">
              Get a free conversion tracking audit and 20% off your setup. We'll show you exactly what's broken, what's missing, and what it's costing you — then fix it.
            </p>
            <Button asChild size="lg" className="mt-10 gap-2.5 rounded-xl bg-primary px-11 text-primary-foreground font-extrabold text-lg shadow-[0_4px_20px_rgba(62,207,142,0.3)] hover:bg-primary/90 hover:-translate-y-1 transition-all">
              <a href="#claim">Claim Your Free Audit →</a>
            </Button>
            <p className="mt-3.5 text-sm text-muted-foreground">Free audit · No commitment · Limited spots</p>
          </motion.div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20 bg-white/[0.015] text-center">
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="text-3xl font-extrabold">If Any of This Sounds Familiar...</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            Most businesses we talk to have at least two of these problems. They're usually spending real money on ads without knowing what's working.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-3 max-w-[900px] mx-auto">
            {painPoints.map((p) => (
              <div key={p.title} className="rounded-xl border p-7 text-left" style={{ background: "rgba(255,60,60,0.04)", borderColor: "rgba(255,60,60,0.08)" }}>
                <span className="text-3xl mb-3 block">{p.emoji}</span>
                <h4 className="text-base font-semibold" style={{ color: "#ff8a8a" }}>{p.title}</h4>
                <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">What You Get</span>
            <h2 className="text-4xl font-extrabold">The Founders Offer</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">Two things that will change how you spend on ads — starting this week.</p>
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
                <p className="mt-2.5 text-[15px] text-muted-foreground leading-relaxed">{card.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary font-bold">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-white/[0.015]">
        <div className="mx-auto max-w-[900px] px-6 grid gap-5 sm:grid-cols-3">
          {proofStats.map((s) => (
            <div key={s.stat} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 text-center">
              <p className="text-4xl font-black text-primary">{s.stat}</p>
              <p className="mt-2 text-[13px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section id="claim" className="relative py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(62,207,142,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="relative mx-auto max-w-[600px] px-6 text-center">
          <h2 className="text-4xl font-extrabold">
            Claim Your <span className="text-gradient">Free Audit</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Fill in the form below and we'll schedule your tracking audit within 48 hours.</p>

          <div className="mt-9 rounded-2xl border border-primary/15 bg-white/[0.03] p-9 text-left">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">First Name</label>
                  <Input placeholder="John" className="border-white/10 bg-white/5" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">Last Name</label>
                  <Input placeholder="Doe" className="border-white/10 bg-white/5" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">Work Email</label>
                <Input type="email" placeholder="john@company.com" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">Website URL</label>
                <Input type="url" placeholder="https://yourwebsite.com" className="border-white/10 bg-white/5" />
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">Monthly Ad Spend</label>
                <select className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-foreground">
                  <option>Select range</option>
                  <option>Under £1,000</option>
                  <option>£1,000 – £5,000</option>
                  <option>£5,000 – £20,000</option>
                  <option>£20,000+</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-[13px] font-semibold text-muted-foreground">What platforms are you running ads on?</label>
                <Input placeholder="e.g. Meta, Google Ads, LinkedIn" className="border-white/10 bg-white/5" />
              </div>
              <Button type="submit" className="w-full rounded-lg bg-primary py-4 text-primary-foreground font-extrabold hover:bg-primary/90">
                Get My Free Audit →
              </Button>
              <p className="text-center text-xs text-muted-foreground">No spam, no hard sell. We'll review your setup and send a written report.</p>
            </form>
          </div>

          <div className="mt-5 mx-auto inline-flex items-center gap-2.5 rounded-lg border px-5 py-3 text-sm font-semibold" style={{ background: "rgba(255,180,0,0.06)", borderColor: "rgba(255,180,0,0.15)", color: "#ffb400" }}>
            <span className="h-2 w-2 rounded-full bg-[#ffb400] animate-pulse" />
            7 of 10 spots remaining
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] py-6 text-center">
        <div className="mx-auto max-w-[1100px] px-6">
          <p className="text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">AlphaTrack Digital</Link> · <Link to="/contact-us" className="hover:text-primary">Contact</Link>
          </p>
          <p className="mt-2 text-xs text-muted-foreground">© AlphaTrack Digital 2026. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default TrackingLandingPage;
