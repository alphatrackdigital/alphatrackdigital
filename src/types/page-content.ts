import type { LucideIcon } from "lucide-react";

export interface ProofMetric {
  value: string;
  label: string;
  note?: string;
}

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export interface ContactMethod {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  href?: string;
  secondaryDetail?: string;
  secondaryHref?: string;
}

export interface OfferCard {
  badge: string;
  title: string;
  description: string;
  features: string[];
  highlight?: boolean;
}
