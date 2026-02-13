import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceTierCardProps {
  name: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaLabel?: string;
  ctaPath?: string;
}

const ServiceTierCard = ({
  name,
  description,
  features,
  highlighted = false,
  ctaLabel = "Get Started",
  ctaPath = "/book-a-call",
}: ServiceTierCardProps) => {
  return (
    <div
      className={cn(
        "glass-card flex flex-col rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1",
        highlighted && "border-primary/40 ring-1 ring-primary/20"
      )}
    >
      {highlighted && (
        <span className="mb-4 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-muted-foreground">{f}</span>
          </li>
        ))}
      </ul>
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
