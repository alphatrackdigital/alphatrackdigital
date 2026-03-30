import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { CTAConfig } from "@/types/cta";
import { cn } from "@/lib/utils";
import SectionIntro from "@/components/shared/SectionIntro";

interface CTASectionProps {
  title?: ReactNode;
  description?: string;
  primaryCta?: CTAConfig;
  secondaryCta?: CTAConfig;
  variant?: "hero-close" | "inline-proof" | "service-close";
  proofChips?: string[];
  layout?: "centered" | "split";
}

const CTASection = ({
  title = (
    <>
      Ready to Accelerate Your <span className="text-gradient">Growth</span>?
    </>
  ),
  description = "Book a free strategy call and discover how data-driven marketing can transform your business.",
  primaryCta = { label: "Book a Free Strategy Call", to: "/book-a-call" },
  secondaryCta = { label: "Explore Services", to: "/service" },
  variant = "hero-close",
  proofChips,
  layout = "centered",
}: CTASectionProps) => {
  const containerIsSplit = layout === "split";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-white/10",
        variant === "inline-proof" ? "py-16" : "py-24",
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        {variant === "hero-close" && (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.015)_0%,rgba(255,255,255,0)_36%,rgba(255,255,255,0.012)_100%)]" />
            <div className="absolute inset-x-[16%] top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
          </>
        )}
        {variant === "service-close" && (
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.01)_0%,rgba(0,175,239,0.03)_45%,rgba(51,204,153,0.035)_100%)]" />
        )}
        {variant === "inline-proof" && (
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,51,153,0.03)_0%,rgba(0,175,239,0.025)_52%,rgba(51,204,153,0.03)_100%)]" />
        )}
      </div>

      <div className="container relative mx-auto px-4 lg:px-8">
        <div
          className={cn(
            "rounded-[28px] border border-white/10 bg-white/[0.02]",
            variant === "hero-close" && "px-6 py-14 md:px-10",
            variant === "service-close" && "px-6 py-10 md:px-8",
            variant === "inline-proof" && "px-6 py-8 md:px-8",
          )}
        >
          <div
            className={cn(
              "flex gap-8",
              containerIsSplit
                ? "flex-col items-start justify-between lg:flex-row lg:items-center"
                : "flex-col items-center text-center",
            )}
          >
            <SectionIntro
              eyebrow={variant === "service-close" ? "Next Step" : undefined}
              title={title}
              description={description}
              align={containerIsSplit ? "left" : "center"}
              width={variant === "hero-close" ? "wide" : "default"}
              className={cn(
                containerIsSplit ? "max-w-2xl" : "w-full",
                variant === "inline-proof" && !containerIsSplit && "max-w-2xl",
              )}
              titleClassName={cn(
                variant === "hero-close" && "mx-auto max-w-4xl text-[2.6rem] leading-[1.06] md:text-[3rem]",
                variant === "inline-proof" && "text-2xl md:text-3xl",
                variant === "service-close" && "text-3xl md:text-[2.1rem]",
              )}
              descriptionClassName={cn(
                variant === "hero-close" && "mx-auto max-w-2xl text-base leading-7",
                variant === "inline-proof" && "max-w-xl text-sm",
                variant === "service-close" && "max-w-xl",
              )}
            />

            <div
              className={cn(
                "flex w-full flex-col gap-5",
                containerIsSplit ? "lg:max-w-md lg:items-end" : "items-center",
              )}
            >
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "gap-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90",
                    variant === "hero-close" && "px-8 shadow-[0_0_18px_rgba(51,204,153,0.10)]",
                  )}
                >
                  <Link to={primaryCta.to}>
                    {primaryCta.label} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                {secondaryCta && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="gap-1.5 rounded-xl border-white/20 hover:bg-white/5"
                  >
                    <Link to={secondaryCta.to}>
                      {secondaryCta.label} <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>

              {proofChips && proofChips.length > 0 && (
                <div
                  className={cn(
                    "flex flex-wrap gap-2",
                    containerIsSplit ? "justify-start lg:justify-end" : "justify-center",
                  )}
                >
                  {proofChips.map((chip) => (
                    <span
                      key={chip}
                      className={cn(
                        "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground",
                        variant === "hero-close" && "px-3.5 py-1.5 text-[10.5px] tracking-[0.12em]",
                      )}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
