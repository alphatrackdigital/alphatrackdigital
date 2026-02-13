import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect } from "react";

const steps = [
  { number: "01", title: "Confirmation Email", description: "You'll receive a calendar invite and confirmation email shortly." },
  { number: "02", title: "Pre-Call Prep", description: "Our team will review your business and prepare tailored insights." },
  { number: "03", title: "Strategy Call", description: "We'll meet, discuss your goals, and share actionable recommendations." },
];

const ThankYou = () => {
  useEffect(() => {
    // Add noindex for SEO
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <section className="flex min-h-[80vh] items-center py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card mx-auto max-w-2xl p-10 text-center md:p-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="mx-auto h-16 w-16 text-primary" />
          </motion.div>
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">You're All Set!</h1>
          <p className="mt-3 text-muted-foreground">
            Your strategy call has been booked. We're looking forward to speaking with you.
          </p>

          <div className="mt-10 space-y-4 text-left">
            <h2 className="text-center text-lg font-semibold">What Happens Next</h2>
            {steps.map((step) => (
              <div key={step.number} className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
                <span className="text-2xl font-bold text-primary">{step.number}</span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/service">
                Explore Services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-1.5 rounded-lg border-white/20 hover:bg-white/5">
              <Link to="/">
                Return Home <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ThankYou;
