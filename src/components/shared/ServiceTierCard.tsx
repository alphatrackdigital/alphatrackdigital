import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceTierCardProps {
  tierLabel?: string;
  name: string;
  description: string;
  price?: string;
  priceNote?: string;
  features: string[];
  highlighted?: boolean;
  highlightLabel?: string;
  enables?: string;
  ctaLabel?: string;
  ctaPath?: string;
}

const ServiceTierCard = ({
  tierLabel,
  name,
  description,
  price,
  priceNote,
  features,
  highlighted = false,
  highlightLabel = "RECOMMENDED",
  enables,
  ctaLabel = "Get Started",
  ctaPath = "/book-a-call",
}: ServiceTierCardProps) => {
  return (
    <div
      className={cn(
        "glass-card relative flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1",
        highlighted && "border-primary/40 ring-1 ring-primary/20"
      )}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground whitespace-nowrap">
          {highlightLabel}
        </span>
      )}
      {tierLabel && (
        <span className="mb-1 text-xs font-bold uppercase tracking-widest text-primary">{tierLabel}</span>
      )}
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {price && (
        <>
          <p className="mt-5 text-3xl font-extrabold">
            {price} {priceNote && <span className="text-sm font-normal text-muted-foreground">{priceNote}</span>}
          </p>
          <div className="my-5 h-px bg-border" />
        </>
      )}
      <ul className={cn("flex-1 space-y-2", !price && "mt-6 space-y-3")}>
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>
      {enables && (
        <div className="mt-5 rounded-xl bg-primary/5 border border-primary/10 p-4 text-sm text-muted-foreground">
          <strong className="text-primary">Enables:</strong> {enables}
        </div>
      )}
      <Button
        asChild
        className={cn(
          "mt-8 gap-1.5 rounded-lg",
          highlighted
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "border border-white/20 bg-transparent hover:bg-white/5"
        )}
      >
        <Link to={ctaPath}>
          {ctaLabel} <ArrowUpRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default ServiceTierCard;
