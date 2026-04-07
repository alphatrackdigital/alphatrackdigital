import { Link } from "react-router-dom";
import { ArrowUpRight, Quote } from "lucide-react";
import { motion } from "framer-motion";

import CTASection from "@/components/shared/CTASection";
import PageSection from "@/components/shared/PageSection";
import SectionIntro from "@/components/shared/SectionIntro";
import SEO from "@/components/shared/SEO";
import {
  companyProfile,
  featuredTestimonial,
  primarySectors,
  whyChoosePoints,
} from "@/data/companyProfile";
import { primaryServices } from "@/data/services";
import { cn } from "@/lib/utils";

const AboutUs = () => {
  return (
    <>
      <SEO
        title="About Us | AlphaTrack Digital"
        description="AlphaTrack Digital is a measurement-first digital growth agency helping brands improve tracking, paid media, and automation."
        canonicalUrl="/about-us"
      />

      <PageSection mode="hero" surface="glow" spacing="compact">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <SectionIntro
              as="h1"
              eyebrow="About Us"
              mode="hero"
              maxWidth="xl"
              title={
                <>
                  A measurement-first agency built to make{" "}
                  <span className="text-gradient">growth easier to trust</span>.
                </>
              }
              description="AlphaTrack Digital helps brands improve tracking, paid media, and automation so marketing works better and decisions are easier to make."
              titleClassName="max-w-4xl"
              descriptionClassName="max-w-3xl"
            />

            <div className="mt-6 max-w-3xl space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
              <p>
                {companyProfile.established} We started AlphaTrack Digital
                because too many brands were running campaigns without clear
                tracking, reliable follow-up, or confidence in what was really
                driving results.
              </p>
              <p>
                Our work brings measurement, paid media, and automation into
                one clearer system so teams can stop guessing and start making
                better growth decisions.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
              <Link
                to="/offer/tracking-audit"
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Get a Free Growth Audit <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                to="/service"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-white/5"
              >
                Explore Services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-atd-blue/12 via-transparent to-secondary/12 blur-2xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <img
                src="/social-preview.png"
                alt="AlphaTrack Digital brand visual"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </PageSection>

      <PageSection mode="content" border="top">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <SectionIntro
            eyebrow="Our Story"
            mode="content"
            title="Our story in a nutshell."
            description="The agency exists to help brands replace disconnected marketing activity with clearer systems, better reporting, and stronger follow-up."
            maxWidth="lg"
          />

          <div className="space-y-8 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                Why we exist
              </p>
              <p className="mt-3 max-w-2xl text-base leading-8 text-foreground">
                {companyProfile.founderNote}
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                What that means in practice
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                We focus on the parts of marketing that usually create the most
                confusion: tracking, paid media, lead handoff, and the systems
                that help teams understand what is working.
              </p>
            </div>

            <div className="border-t border-white/10 pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                What clients should expect
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                Clear communication, honest reporting, and work that is tied to
                commercial outcomes rather than surface-level activity.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      <PageSection mode="content" surface="quiet" border="top">
        <SectionIntro
          eyebrow="How We Work"
          mode="content"
          title="Three principles guide how we deliver."
          description="These are the ideas that shape how AlphaTrack Digital works with every client."
          maxWidth="lg"
          className="mb-10"
        />

        <div className="border-t border-white/10">
          {whyChoosePoints.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
              className={cn(
                "grid gap-3 py-6 md:grid-cols-[80px_240px_1fr] md:gap-6 md:py-8",
                index > 0 && "border-t border-white/10",
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                0{index + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </PageSection>

      <PageSection mode="content" border="top">
        <SectionIntro
          eyebrow="What We Do"
          mode="content"
          title="What we do best."
          description="Most of our work starts in one of these three areas."
          maxWidth="lg"
          className="mb-10"
        />

        <div className="border-t border-white/10">
          {primaryServices.map((service, index) => (
            <div
              key={service.title}
              className={cn(
                "grid gap-3 py-6 md:grid-cols-[80px_280px_1fr_auto] md:gap-6 md:py-8",
                index > 0 && "border-t border-white/10",
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                0{index + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                {service.description}
              </p>
              <div className="md:justify-self-end">
                <Link
                  to={service.path}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  Explore service <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection mode="content" border="top">
        <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <SectionIntro
            eyebrow="Industries"
            mode="content"
            title="Where we do our best work."
            description="We work across consumer, service, and education categories, with the strongest repeat experience in the sectors below."
            maxWidth="lg"
          />

          <div className="grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-2 lg:border-t-0 lg:pt-0">
            {primarySectors.map((sector, index) => (
              <div
                key={sector}
                className={cn(
                  "border-white/10 py-3 text-base font-medium text-foreground md:text-lg",
                  index > 0 && "border-t sm:border-t-0",
                )}
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      <PageSection mode="content" surface="quiet" border="top">
        <SectionIntro
          eyebrow="Client Feedback"
          mode="content"
          title="What one client said about working with us."
          description="The work should feel clear, reliable, and easy to move forward with."
          maxWidth="lg"
          className="mb-8"
        />

        <div className="relative border-t border-white/10 pt-8">
          <Quote className="absolute right-0 top-8 hidden h-10 w-10 text-primary/30 md:block" />
          <blockquote className="max-w-4xl text-xl leading-[1.8] text-foreground md:text-[1.7rem] md:leading-[1.7]">
            "{featuredTestimonial.quote}"
          </blockquote>
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-base font-semibold text-foreground">
              {featuredTestimonial.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {featuredTestimonial.title}
            </p>
          </div>
        </div>
      </PageSection>

      <CTASection
        title={
          <>
            Want to see what is holding back your{" "}
            <span className="text-gradient">growth system</span>?
          </>
        }
        description="Get a free growth audit and we will show you the clearest next step across tracking, paid media, or automation."
        primaryCta={{ label: "Get a Free Growth Audit", to: "/offer/tracking-audit" }}
        secondaryCta={{ label: "Explore Services", to: "/service" }}
        variant="service-close"
      />
    </>
  );
};

export default AboutUs;
