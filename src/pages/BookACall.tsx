import { Helmet } from "react-helmet-async";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SEO from "@/components/shared/SEO";
import { Check, Clock, Handshake, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const expectations: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Clock, title: "15 Minutes", description: "Quick intro video call to understand your goals and current setup." },
  { icon: Handshake, title: "No Pressure", description: "We'll share what we see, you decide next steps. No hard sell." },
  { icon: Lightbulb, title: "Actionable", description: "Walk away with at least one insight, even if we don't work together." },
];

const BookACall = () => {
  return (
    <>
      <SEO title="Book a Free Discovery Call | AlphaTrack Digital" description="Book a free 15-minute intro call to discuss your tracking and measurement needs. No pressure, actionable advice." />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://alphatrack.digital/" },
            { "@type": "ListItem", "position": 2, "name": "Book a Call", "item": "https://alphatrack.digital/book-a-call" }
          ]
        })}</script>
      </Helmet>
      {/* Page Banner */}
      <section className="py-24 md:py-32" style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.04) 0%, transparent 100%)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="container mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", path: "/" },
            { label: "Book a Call" },
          ]} />
          <h1 className="mt-2 text-3xl font-bold">Book a Call</h1>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            {/* Left */}
            <div className="pt-5">
              <div className="mb-5 inline-block rounded border border-primary/15 bg-primary/[0.08] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                Book a Call
              </div>
              <h2 className="text-4xl font-extrabold leading-tight">
                Let's Talk About<br />Your <span className="text-gradient">Growth</span>
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Pick a time that works for you. This is a free, no-pressure 15-minute intro call where we'll discuss your tracking and measurement needs.
              </p>

              <ul className="mt-10 space-y-0 divide-y divide-white/[0.04]">
                {expectations.map((item) => (
                  <li key={item.title} className="flex gap-4 py-4">
                    <div className="flex h-11 w-11 min-w-[44px] items-center justify-center rounded-xl bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-semibold">{item.title}</h4>
                      <p className="mt-1 text-[13px] text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Embed */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] overflow-hidden min-h-[720px]">
              {/* Production: Replace with <iframe frameBorder="0" width="100%" height="720" src="https://meet.brevo.com/meet-atd/borderless?l=discovery"></iframe> */}
              <div className="flex h-[720px] flex-col items-center justify-center gap-4 p-10" style={{ background: "linear-gradient(135deg, rgba(62,207,142,0.05), rgba(0,175,239,0.05))" }}>
                <span className="text-5xl opacity-60"><Clock className="h-12 w-12 text-primary/40" /></span>
                <h3 className="text-xl font-semibold text-muted-foreground">Brevo Meetings Scheduler</h3>
                <p className="max-w-xs text-center text-sm text-muted-foreground">
                  Select a date and time that works for you. Powered by Brevo Meetings.
                </p>
                <div className="rounded-lg bg-primary/[0.06] border border-primary/[0.12] px-4 py-3 text-xs text-primary text-center">
                  Production: Replace this placeholder with the Brevo iframe embed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-t border-white/[0.04] py-10 text-center">
        <div className="container mx-auto px-4">
          <p className="text-[13px] text-muted-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-primary" /> Free 15-minute call</span>
            <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-primary" /> No commitment required</span>
            <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-primary" /> Get actionable advice</span>
          </p>
        </div>
      </section>
    </>
  );
};

export default BookACall;
