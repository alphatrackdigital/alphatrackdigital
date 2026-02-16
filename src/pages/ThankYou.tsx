import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";

const steps = [
  { num: "1", text: <>
    <strong className="text-foreground">Check your inbox</strong> — You'll receive a calendar invite with a video call link from Brevo Meetings.
  </> },
  { num: "2", text: <>
    <strong className="text-foreground">No prep needed</strong> — We'll ask about your current tracking setup and goals on the call. Just show up.
  </> },
  { num: "3", text: <>
    <strong className="text-foreground">Get a clear next step</strong> — After the call, we'll send you a summary with our recommendations.
  </> },
];

const ThankYou = () => {
  return (
    <>
    <SEO title="Call Booked | AlphaTrack Digital" description="Your discovery call has been confirmed." noindex />
    <section className="relative flex min-h-[80vh] items-center justify-center py-24">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-primary/[0.12] border-2 border-primary"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </motion.div>

          <h1 className="text-4xl font-extrabold md:text-5xl">
            You're <span className="text-gradient">Booked!</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            Your discovery call has been confirmed. Check your email for the calendar invite with the meeting link.
          </p>

          <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 text-left">
            <h3 className="mb-5 text-base font-semibold text-primary">What Happens Next</h3>
            {steps.map((step) => (
              <div key={step.num} className="flex gap-3.5 py-3 items-start border-b border-white/[0.04] last:border-0">
                <div className="flex h-7 w-7 min-w-[28px] items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {step.num}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className="gap-2 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90">
              <Link to="/service">Explore Our Services →</Link>
            </Button>
            <Button asChild variant="outline" className="gap-2 rounded-lg border-primary/30 text-primary hover:bg-primary/5">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ThankYou;
