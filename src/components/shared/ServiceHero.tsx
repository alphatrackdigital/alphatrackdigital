import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Button } from "@/components/ui/button";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface HeroSnapshotItem {
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
}

const ServiceHero = ({
  breadcrumbs,
  badgeLabel,
  badgeIcon: BadgeIcon,
  title,
  description,
  snapshot,
  primaryCta = { label: "Book a Call", to: "/book-a-call" },
  secondaryCta,
}: ServiceHeroProps) => {
  return (
    <section
      className="relative overflow-hidden pt-10 pb-20 md:pt-14 md:pb-24"
      style={{ background: "linear-gradient(180deg, rgba(62,207,142,0.03) 0%, transparent 100%)" }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[15%] -top-[30%] h-[70%] w-[50%] rounded-full bg-primary/[0.06] blur-[140px]" />
        <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[40%] rounded-full bg-secondary/[0.04] blur-[120px]" />
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-primary/15 bg-primary/[0.07] px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary">
              {BadgeIcon && <BadgeIcon className="h-4 w-4" />}
              {badgeLabel}
            </div>

            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>

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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="glass-card divide-y divide-white/10 overflow-hidden"
          >
            {snapshot.map((item) => (
              <div key={item.label} className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">{item.label}</p>
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
