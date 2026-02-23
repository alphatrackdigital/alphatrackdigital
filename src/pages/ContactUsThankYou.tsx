import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/shared/SEO";
import { motion } from "framer-motion";

const ContactUsThankYou = () => {
  return (
    <>
    <SEO
      title="Message Received | AlphaTrack Digital"
      description="Thanks for reaching out. We'll be in touch."
      canonicalUrl="/contact-us/thank-you"
      noindex
    />
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
            Message <span className="text-gradient">Received!</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground leading-relaxed">
            Thanks for reaching out. We've received your enquiry and a member of our team will be in touch.
          </p>

          {/* Response info */}
          <div className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-7 text-left">
            <p className="text-sm text-muted-foreground leading-relaxed">
              We review every enquiry personally. Expect a response within <strong className="text-foreground">1 business day</strong>. We'll reach out via the email address you provided.
            </p>
            <p className="mt-3 text-sm font-semibold text-primary flex items-center gap-2">
              ⚡ Typical response: under 4 hours
            </p>
          </div>

          {/* Upsell */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-primary/[0.06] to-secondary/[0.04] border border-primary/15 p-8 text-center">
            <h3 className="text-lg font-bold">Want to speak sooner?</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Skip the wait — book a free 15-minute discovery call and we'll chat about your needs right away.
            </p>
            <Button asChild className="mt-5 gap-2 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90">
              <Link to="/book-a-call">Book a Call Now →</Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="outline" className="rounded-lg border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20">
              <Link to="/service">Explore Our Services</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-lg border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ContactUsThankYou;
