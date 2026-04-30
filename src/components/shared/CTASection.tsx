import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BOOK_A_FREE_STRATEGY_CALL_CTA, EXPLORE_SERVICES_CTA } from "@/config/cta";
import type { CTAConfig } from "@/types/cta";
import { withCampaignSearch } from "@/lib/campaignAttribution";
import { cn } from "@/lib/utils";
import SectionIntro from "@/components/shared/SectionIntro";

interface CTASectionProps {
  title?: ReactNode;
  description?: string;
  primaryCta?: CTAConfig;
  secondaryCta?: CTAConfig | null;
  variant?: "hero-close" | "inline-proof" | "service-close";
  proofChips?: string[];
  layout?: "centered" | "split";
  titleClassName?: string;
  descriptionClassName?: string;
}

const CTASection = ({
  title = (
    <>
      Ready to Accelerate Your <span className="text-gradient">Growth</span>?
    </>
  ),
  description = "Book a free 15-minute strategy call and walk away with at least one clear insight, even if we never work together.",
  primaryCta = BOOK_A_FREE_STRATEGY_CALL_CTA,
  secondaryCta,
  variant = "hero-close",
  proofChips,
  layout = "centered",
  titleClassName,
  descriptionClassName,
}: CTASectionProps) => {
  const location = useLocation();
  const containerIsSplit = layout === "split";
  const resolvedSecondaryCta =
    secondaryCta === undefined
      ? variant === "hero-close"
        ? EXPLORE_SERVICES_CTA
        : undefined
      : secondaryCta;
  const primaryTo = withCampaignSearch(primaryCta.to, location.search);
  const secondaryTo = resolvedSecondaryCta
    ? withCampaignSearch(resolvedSecondaryCta.to, location.search)
    : undefined;

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-white/10",
        variant === "inline-proof" ? "py-12 md:py-16" : "py-10 md:py-[4.75rem]",
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
            "relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.02] md:rounded-[28px]",
            variant === "hero-close" &&
              "border-primary/15 bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.07),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.025)_0%,rgba(255,255,255,0.01)_100%)] shadow-[0_14px_40px_rgba(0,0,0,0.12)] md:rounded-[24px]",
            variant === "service-close" && "mx-auto max-w-[66rem]",
            variant === "hero-close" && "px-5 py-7 md:px-10 md:py-10",
            variant === "service-close" && "px-6 py-10 md:px-9",
            variant === "inline-proof" && "px-6 py-8 md:px-8",
          )}
        >
          {variant === "hero-close" && (
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          )}
          <div
            className={cn(
              "flex gap-6 md:gap-8",
              containerIsSplit
                ? "flex-col items-start justify-between lg:flex-row lg:items-center"
                : "flex-col items-center text-center",
            )}
          >
            <SectionIntro
              eyebrow={variant === "service-close" ? "Next Step" : undefined}
              title={title}
              description={variant === "service-close" && !resolvedSecondaryCta ? undefined : description}
              align={containerIsSplit ? "left" : "center"}
              width={variant === "hero-close" ? "wide" : "default"}
              className={cn(
                containerIsSplit ? "max-w-2xl" : "w-full",
                variant === "inline-proof" && !containerIsSplit && "max-w-2xl",
                variant === "hero-close" && !containerIsSplit && "max-w-3xl",
              )}
              titleClassName={cn(
                variant === "hero-close" &&
                  "mx-auto max-w-[22rem] text-[1.55rem] leading-[1.12] tracking-[-0.02em] md:max-w-[36rem] md:text-[2.15rem] lg:text-[2.45rem]",
                variant === "inline-proof" && "text-2xl md:text-3xl",
                variant === "service-close" && "text-3xl leading-[1.12] md:text-[2.1rem]",
                titleClassName,
              )}
              descriptionClassName={cn(
                variant === "hero-close" && "mx-auto mt-5 max-w-[32rem] text-sm leading-6 md:mt-8 md:max-w-[44rem] md:text-[15px] md:leading-7",
                variant === "inline-proof" && "max-w-xl text-sm",
                variant === "service-close" && "max-w-xl",
                descriptionClassName,
              )}
            />

            <div
              className={cn(
                "flex w-full flex-col gap-5 md:gap-6",
                containerIsSplit
                  ? resolvedSecondaryCta
                    ? "lg:max-w-md lg:items-end"
                    : "lg:max-w-[17.5rem] lg:items-start"
                  : "items-center",
              )}
            >
              <div className="flex w-full max-w-full flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className={cn(
                    "h-11 max-w-full rounded-xl bg-primary px-5 text-center text-primary-foreground hover:bg-primary/90 sm:px-8 md:h-11",
                    variant === "hero-close" && "shadow-[0_0_18px_rgba(51,204,153,0.10)]",
                  )}
                >
                  <Link to={primaryTo}>{primaryCta.label}</Link>
                </Button>
                {resolvedSecondaryCta && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="h-11 max-w-full rounded-xl border-white/20 px-5 text-center hover:bg-white/5 sm:px-8 md:h-11"
                  >
                    <Link to={secondaryTo ?? resolvedSecondaryCta.to}>{resolvedSecondaryCta.label}</Link>
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
