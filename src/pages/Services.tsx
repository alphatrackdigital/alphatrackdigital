import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

import CTASection from "@/components/shared/CTASection";
import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { companyProfile, ctmaFramework, engagementModels } from "@/data/companyProfile";
import { primaryServices, supportingServices } from "@/data/services";

const Services = () => {
  return (
    <>
      <SEO
        title="Our Services | AlphaTrack Digital"
        description="Performance marketing, creative strategy, and growth execution across conversion tracking, paid media, automation, SEO, content, and web development."
        canonicalUrl="/service"
      />

      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-atd-blue/8 blur-[120px]" />
        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <SectionIntro
              eyebrow="Our Services"
              title={
                <>
                  Data-Driven Marketing and <span className="text-gradient">Growth Systems</span>
                </>
              }
              description={`${companyProfile.shortDescription} We deliver performance marketing, growth, and digital execution services for both B2B and B2C brands.`}
              align="center"
              width="wide"
              titleClassName="mx-auto text-4xl md:text-5xl"
              descriptionClassName="mx-auto max-w-3xl text-lg"
            />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground">
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Data-driven marketing
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Creative strategy
              </span>
              <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
                Growth systems
              </span>
            </div>
            <div className="mt-8">
              <Button asChild size="lg" className="gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/book-a-call">
                  Book a Call <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.01] py-14">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="CTMA Method"
            title="Our Service Framework"
            description="Every engagement is built on four integrated disciplines that work together to drive performance."
            align="center"
            width="wide"
            className="mb-8"
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ctmaFramework.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.35 }}
                className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/80">Framework</p>
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 pt-16">
        <div className="container mx-auto px-4 lg:px-8">
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
                  className={cn(
                    "group flex h-full flex-col rounded-[26px] border p-8 transition-all duration-300 hover:-translate-y-1",
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
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">{service.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors">
                    Learn more about {service.title}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <SectionIntro
              eyebrow="More Services"
              title="Other Ways We Help"
              description="Website, content, email, and search services that help your marketing work better."
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
                    className="group flex h-full flex-col rounded-2xl border border-white/8 bg-background/70 p-6 transition-all duration-300 hover:border-primary/20 hover:-translate-y-0.5"
                  >
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
                      <service.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="text-[15px] font-semibold">{service.title}</h4>
                    <p className="mt-2 flex-1 text-[13px] leading-6 text-muted-foreground">{service.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-primary/80 transition-colors group-hover:text-primary">
                      Learn more <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-white/[0.01] py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionIntro
            eyebrow="How to Work With Us"
            title="Three Flexible Engagement Models"
            description="Designed around your stage of growth, your current clarity level, and how much execution support you need."
            align="center"
            width="wide"
            className="mb-12"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {engagementModels.map((tier) => (
              <div
                key={tier.title}
                className={`flex flex-col rounded-[26px] border p-8 ${
                  tier.label === "Growth"
                    ? "border-primary/25 bg-[linear-gradient(180deg,rgba(0,51,153,0.16)_0%,rgba(0,175,239,0.04)_42%,rgba(51,204,153,0.04)_100%)] shadow-[0_18px_60px_rgba(0,51,153,0.10)]"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <span
                  className={`mb-4 inline-block w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                    tier.label === "Growth"
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/10 bg-white/[0.04] text-muted-foreground"
                  }`}
                >
                  {tier.label}
                </span>
                <h3 className="text-xl font-bold">{tier.title}</h3>
                <p className="mt-2 text-sm font-medium text-primary/85">{tier.timeframe}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tier.idealFor}</p>
                <ul className="mt-6 flex-1 space-y-2">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book-a-call"
                  className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    tier.label === "Growth"
                      ? "bg-primary text-primary-foreground"
                      : "border border-white/20 text-foreground hover:bg-white/5"
                  }`}
                >
                  Book a Call <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        primaryCta={{ label: "Book a Call", to: "/book-a-call" }}
        secondaryCta={{ label: "Explore Core Services", to: "/service/conversion-tracking" }}
        variant="service-close"
        layout="split"
        proofChips={["Data-driven marketing", "Creative strategy", "Growth systems"]}
      />
    </>
  );
};

export default Services;
