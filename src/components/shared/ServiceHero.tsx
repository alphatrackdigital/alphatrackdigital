import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BOOK_A_FREE_STRATEGY_CALL_CTA } from "@/config/cta";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import SectionIntro from "@/components/shared/SectionIntro";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface HeroSnapshotItem {
  label: string;
  value: string;
}

interface SupportingProofItem {
  label: string;
  value: string;
}

interface HeroCta {
  label: string;
  to: string;
  style?: "text" | "outline";
}

interface ServiceHeroProps {
  breadcrumbs: BreadcrumbItem[];
  badgeLabel: string;
  badgeIcon?: LucideIcon;
  title: ReactNode;
  description: string;
  snapshot: HeroSnapshotItem[];
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  tone?: "tracking" | "media" | "automation";
  supportingProof?: SupportingProofItem[];
  bodyWidth?: "default" | "wide";
}

const ServiceHero = ({
  breadcrumbs,
  badgeLabel,
  badgeIcon: BadgeIcon,
  title,
  description,
  snapshot,
  primaryCta = BOOK_A_FREE_STRATEGY_CALL_CTA,
  secondaryCta,
  tone = "tracking",
  supportingProof,
  bodyWidth = "default",
}: ServiceHeroProps) => {
  const toneBackgrounds = {
    tracking: {
      section:
        "linear-gradient(180deg, rgba(0,175,239,0.035) 0%, rgba(51,204,153,0.03) 46%, rgba(255,255,255,0.01) 100%)",
      orbA: "bg-atd-blue/[0.10]",
      orbB: "bg-primary/[0.05]",
      snapshotBorder: "border-primary/20",
    },
    media: {
      section:
        "linear-gradient(180deg, rgba(0,51,153,0.045) 0%, rgba(0,175,239,0.04) 46%, rgba(255,255,255,0.01) 100%)",
      orbA: "bg-secondary/[0.07]",
      orbB: "bg-atd-blue/[0.05]",
      snapshotBorder: "border-secondary/20",
    },
    automation: {
      section:
        "linear-gradient(180deg, rgba(0,51,153,0.03) 0%, rgba(51,204,153,0.03) 52%, rgba(0,175,239,0.02) 100%)",
      orbA: "bg-primary/[0.06]",
      orbB: "bg-atd-blue/[0.05]",
      snapshotBorder: "border-primary/15",
    },
  }[tone];

  return (
    <section
      className="relative overflow-hidden pt-10 pb-20 md:pt-14 md:pb-24"
      style={{ background: toneBackgrounds.section }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={cn(
            "absolute -right-[15%] -top-[30%] h-[70%] w-[50%] rounded-full blur-[140px]",
            toneBackgrounds.orbA,
          )}
        />
        <div
          className={cn(
            "absolute -bottom-[20%] -left-[10%] h-[50%] w-[40%] rounded-full blur-[120px]",
            toneBackgrounds.orbB,
          )}
        />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
              {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
              {badgeLabel}
            </div>

            <SectionIntro
              title={title}
              description={description}
              width={bodyWidth === "wide" ? "wide" : "default"}
              titleClassName="text-4xl font-extrabold leading-[1.12] md:text-5xl lg:text-6xl"
              descriptionClassName={cn(
                "mt-6 text-lg leading-relaxed",
                bodyWidth === "wide" ? "max-w-2xl" : "max-w-xl",
              )}
            />

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                asChild
                size="lg"
                className="gap-2 rounded-xl bg-primary px-9 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Link to={primaryCta.to}>
                  {primaryCta.label} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>

              {secondaryCta?.style === "outline" && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-xl border-white/20 hover:bg-white/5"
                >
                  <Link to={secondaryCta.to}>
                    {secondaryCta.label} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}

              {secondaryCta && secondaryCta.style !== "outline" && (
                <Link to={secondaryCta.to} className="text-base font-medium text-primary transition-colors hover:text-primary/80">
                  {secondaryCta.label}
                </Link>
              )}
            </div>

            {supportingProof && supportingProof.length > 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {supportingProof.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/80">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={cn(
              "overflow-hidden rounded-[28px] border bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.22)]",
              toneBackgrounds.snapshotBorder,
            )}
          >
            {snapshot.map((item) => (
              <div key={item.label} className="border-b border-white/10 p-6 last:border-b-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
