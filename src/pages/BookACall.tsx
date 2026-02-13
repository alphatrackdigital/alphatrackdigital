import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Check, Calendar, MessageSquare, Target, Shield } from "lucide-react";
import { motion } from "framer-motion";

const expectations = [
  { icon: MessageSquare, title: "Discovery Chat", description: "We'll understand your business, goals, and current setup." },
  { icon: Target, title: "Quick Audit", description: "We'll identify quick wins and key gaps in your digital stack." },
  { icon: Calendar, title: "Custom Roadmap", description: "You'll leave with a clear action plan — whether you work with us or not." },
];

const idealFor = [
  "You're spending on ads but can't track ROI",
  "You're losing leads due to manual follow-ups",
  "Your data is scattered across multiple platforms",
  "You want to scale but lack the digital infrastructure",
  "You need expert guidance on marketing technology",
];

const BookACall = () => {
  return (
    <>
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-primary/6 blur-[120px]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <Breadcrumbs items={[
            { label: "Home", path: "/" },
            { label: "Book a Call" },
          ]} />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8">
            <h1 className="max-w-3xl text-4xl font-bold md:text-5xl">
              Book a Free <span className="text-gradient">Strategy Call</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              30 minutes. No pressure. Just actionable insights to help you grow.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:px-8">
          {/* Left — content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold">What To Expect</h2>
              <div className="mt-6 space-y-4">
                {expectations.map((item) => (
                  <div key={item.title} className="glass-card flex items-start gap-4 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold">This Call Is For You If…</h2>
              <ul className="mt-4 space-y-3">
                {idealFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — embed placeholder */}
          <div className="glass-card flex min-h-[500px] flex-col items-center justify-center rounded-3xl p-10 text-center">
            <Calendar className="mb-4 h-12 w-12 text-primary" />
            <h3 className="text-xl font-bold">Schedule Your Call</h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Our Brevo Meetings calendar will appear here. Choose a time that works for you.
            </p>
            <div className="mt-6 rounded-lg border border-dashed border-white/20 p-8 text-xs text-muted-foreground">
              [Brevo Meetings Embed Placeholder]
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="border-t border-white/10 py-10">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-8 px-4 text-sm text-muted-foreground lg:px-8">
          <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> No obligation</div>
          <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> 100% free</div>
          <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-primary" /> Actionable insights guaranteed</div>
        </div>
      </section>
    </>
  );
};

export default BookACall;
