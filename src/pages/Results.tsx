import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import HeroEyebrow from "@/components/shared/HeroEyebrow";
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { BOOK_A_FREE_STRATEGY_CALL_CTA } from "@/config/cta";

const Results = () => {
  return (
    <>
      <SEO
        title="Results | AlphaTrack Digital"
        description="AlphaTrack Digital case studies are being prepared with clear context and measurable outcomes."
        canonicalUrl="/results"
      />

      <main className="min-h-screen bg-[#05070d] pt-[70px]">
        <section className="relative flex min-h-[calc(100vh-70px)] items-center overflow-hidden border-b border-white/10 py-16 md:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(51,204,153,0.10),transparent_29%),radial-gradient(circle_at_76%_35%,rgba(0,175,239,0.12),transparent_30%),radial-gradient(circle_at_50%_82%,rgba(0,51,153,0.16),transparent_36%),linear-gradient(180deg,#05070d_0%,#061017_54%,#05070d_100%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle,rgba(0,175,239,0.75)_1px,transparent_1.5px)] [background-size:38px_38px] [mask-image:radial-gradient(ellipse_at_50%_42%,black_0%,transparent_68%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[58%] h-px w-[72rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-secondary/25 to-transparent" />
          <div className="pointer-events-none absolute left-1/2 top-[64%] h-px w-[58rem] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/18 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070d] to-transparent" />
          <div className="container relative mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <HeroEyebrow className="mx-auto">Results</HeroEyebrow>
              <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-normal text-foreground md:text-6xl">
                Case studies are coming soon.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                We are preparing a focused results archive with verified stories, clear context,
                and measurable outcomes.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-11 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground hover:bg-primary/90"
                >
                  <Link to={BOOK_A_FREE_STRATEGY_CALL_CTA.to}>
                    {BOOK_A_FREE_STRATEGY_CALL_CTA.label}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-11 rounded-xl border-white/15 bg-white/[0.035] px-6 text-sm font-bold text-foreground hover:bg-white/[0.07]"
                >
                  <Link to="/service">
                    Explore services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Results;
