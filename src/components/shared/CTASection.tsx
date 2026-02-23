import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import type { CTAConfig } from "@/types/cta";

interface CTASectionProps {
  title?: ReactNode;
  description?: string;
  primaryCta?: CTAConfig;
  secondaryCta?: CTAConfig;
}

const CTASection = ({
  title = (
    <>
      Ready to Accelerate Your <span className="text-gradient">Growth</span>?
    </>
  ),
  description = "Book a call and discover how data-driven marketing can transform your business.",
  primaryCta = { label: "Book a Call", to: "/book-a-call" },
  secondaryCta = { label: "Explore Services", to: "/service" },
}: CTASectionProps) => {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-24">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 text-center lg:px-8">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{description}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="gap-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to={primaryCta.to}>
              {primaryCta.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-1.5 rounded-lg border-white/20 hover:bg-white/5"
          >
            <Link to={secondaryCta.to}>
              {secondaryCta.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
