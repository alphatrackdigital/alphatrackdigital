import { Link } from "react-router-dom";
import { ArrowUpRight, Link2 } from "lucide-react";
import { motion } from "framer-motion";

import CTASection from "@/components/shared/CTASection";
import FeaturedTestimonialSection from "@/components/shared/FeaturedTestimonialSection";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { prefetchRoute } from "@/lib/routePrefetch";
import { ctmaFramework, tractionMetrics } from "@/data/companyProfile";
import { primaryServices, supportingServices } from "@/data/services";

const Services = () => {
  return (
    <>
      <SEO
        title="Our Services | AlphaTrack Digital"
        description="Performance marketing, creative strategy, and growth execution across conversion tracking, paid media, automation, SEO, content, and web development."
        canonicalUrl="/service"
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-atd-blue/[0.07] blur-[140px]" />
          <div className="absolute right-[8%] bottom-[10%] h-[280px] w-[280px] rounded-full bg-primary/[0.05] blur-[100px]" />
        </div>
        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="mb-5 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Services
            </span>
            <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Marketing Systems That{" "}
              <span className="text-gradient">Track, Acquire, and Retain</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              We build the measurement, paid media, and automation infrastructure that makes growth
              predictable — not accidental. Every service is designed to connect, compound, and
              prove its value.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="gap-1.5 rounded-xl bg-primary px-8 text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/book-a-call">
                  Book a Call <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-1.5 rounded-xl border-white/20 hover:bg-white/5"
              >
                <Link to="/offer/tracking-audit">
                  Request a Tracking Audit <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTMA Method */}
      <section className="border-y border-white/10 bg-white/[0.01] py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10 text-center">
            <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              The ATD Method
            </span>
            <h2 className="text-2xl font-bold md:text-3xl">
              Four Disciplines. One Connected System.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
              Most agencies specialise in one channel. We build an integrated system where each
              discipline reinforces the others — tracking powers media, media feeds automation,
              automation drives retention.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ctmaFramework.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.015)_100%)] p-6"
              >
                <div className="pointer-events-none absolute right-5 top-3 text-[4.75rem] font-black leading-none text-white/[0.04]">
                  {item.title.charAt(0)}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/[0.08] shadow-[0_14px_30px_rgba(51,204,153,0.08)]">
                    <span className="bg-[linear-gradient(135deg,#ffffff_0%,#33cc99_55%,#00afef_100%)] bg-clip-text text-3xl font-black tracking-[-0.06em] text-transparent">
                      {item.title.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                      {item.title.charAt(0)}
                    </p>
                    <h3 className="mt-2 text-[15px] font-semibold">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="pt-16 pb-0">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="Core Services"
            title="Where We Deliver the Most Impact"
            description="Our three core services form the backbone of every engagement. They're designed to work together — but each delivers measurable value on its own."
            width="wide"
            titleClassName="text-2xl md:text-3xl"
            descriptionClassName="max-w-2xl text-sm"
            className="mb-8"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to={service.path}
                  onMouseEnter={() => prefetchRoute(service.path)}
                  onFocus={() => prefetchRoute(service.path)}
                  className={cn(
                    "group flex h-full flex-col rounded-[26px] border p-7 transition-all duration-300 hover:-translate-y-1",
                    service.flagship
                      ? "border-primary/25 bg-[linear-gradient(180deg,rgba(0,51,153,0.16)_0%,rgba(0,175,239,0.04)_42%,rgba(51,204,153,0.04)_100%)] shadow-[0_18px_60px_rgba(0,51,153,0.12)]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20",
                  )}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
                        service.flagship
                          ? "bg-primary text-primary-foreground"
                          : "border border-white/10 bg-white/[0.04] text-muted-foreground",
                      )}
                    >
                      {service.badge}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground/60">0{i + 1}</span>
                  </div>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  <div className="mt-5 rounded-2xl border border-white/8 bg-black/10 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                      Best For
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.bestFor}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors">
                    {service.ctaLabel}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* How they connect */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/15 bg-primary/[0.07]">
                <Link2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Built to work together</p>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  Tracking makes paid media smarter. Paid media generates the leads. Automation
                  closes and retains them. Together they form a compounding growth system — not
                  just a collection of tactics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supporting Services */}
      <section className="pb-20 pt-14">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="border-t border-border pt-10">
            <SectionIntro
              eyebrow="Supporting Services"
              title="More Services"
              description="Built to strengthen your core marketing infrastructure — from the site visitors land on, to the search visibility and content that brings them in."
              width="wide"
              titleClassName="text-2xl md:text-3xl"
              descriptionClassName="max-w-2xl text-sm"
              className="mb-6"
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {supportingServices.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06, duration: 0.35 }}
                >
                  <Link
                    to={service.path}
                    onMouseEnter={() => prefetchRoute(service.path)}
                    onFocus={() => prefetchRoute(service.path)}
                    className="group flex h-full flex-col rounded-2xl border border-white/8 bg-background/70 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-[15px] font-semibold">{service.title}</h4>
                    <p className="mt-1 mb-1 text-[11px] font-medium uppercase tracking-[0.15em] text-primary/60">
                      {service.bestFor}
                    </p>
                    <p className="flex-1 text-[13px] leading-6 text-muted-foreground">
                      {service.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary/80 transition-colors group-hover:text-primary">
                      {service.ctaLabel} <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof strip */}
      <section className="border-t border-white/10 bg-white/[0.01] py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
            {tractionMetrics.map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
                  {m.value}
                </p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground/70">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-muted-foreground/40">
            Performance milestones across client campaigns since 2022.
          </p>
        </div>
      </section>

      <FeaturedTestimonialSection
        title="What clients say about working with us."
        className="bg-white/[0.01]"
      />

      <CTASection
        title={
          <>
            Not Sure Where to Start?{" "}
            <span className="text-gradient">We'll Show You.</span>
          </>
        }
        description="Tell us where growth is getting stuck and we'll point you to the service that should come first."
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        secondaryCta={{ label: "Request a Tracking Audit", to: "/offer/tracking-audit" }}
        variant="service-close"
        layout="split"
      />
    </>
  );
};

export default Services;
