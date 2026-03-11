import { Target, Megaphone, Workflow, Mail, Globe, Search, PenTool } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PrimaryService {
  icon: LucideIcon;
  badge: string;
  flagship: boolean;
  title: string;
  description: string;
  path: string;
}

export interface SupportingService {
  icon: LucideIcon;
  title: string;
  bestFor: string;
  description: string;
  path: string;
}

export const primaryServices: PrimaryService[] = [
  {
    icon: Target,
    badge: "Flagship",
    flagship: true,
    title: "Conversion Tracking & Measurement",
    description: "We set up the tracking that tells you exactly which channels, campaigns, and clicks are driving your leads and sales. GA4, Meta, Google Ads \u2014 accurate, auditable, and proven before go-live.",
    path: "/service/conversion-tracking",
  },
  {
    icon: Megaphone,
    badge: "Core",
    flagship: false,
    title: "Paid Media Management",
    description: "Strategic paid social and search campaigns that drive qualified traffic. We combine Meta Ads, Google Ads, and LinkedIn to reach your audience where they are \u2014 and prove every pound spent.",
    path: "/service/paid-media",
  },
  {
    icon: Workflow,
    badge: "Core",
    flagship: false,
    title: "Marketing Automation & CRM",
    description: "Once a lead converts, what happens next? We build the automated workflows, email sequences, and CRM systems that nurture prospects into paying clients \u2014 without manual effort.",
    path: "/service/marketing-automation",
  },
];

export const supportingServices: SupportingService[] = [
  {
    icon: Globe,
    title: "Website Development",
    bestFor: "Launches and landing paths",
    description: "Fast, conversion-focused websites built to support campaigns and capture qualified demand.",
    path: "/service/website-development",
  },
  {
    icon: PenTool,
    title: "Content & Media Strategy",
    bestFor: "Creative direction and planning",
    description: "Campaign messaging and media direction that keep execution aligned to business goals.",
    path: "/service/content-media-strategy",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    bestFor: "Lead nurture and re-engagement",
    description: "Lifecycle email campaigns that turn attention into replies, bookings, and repeat action.",
    path: "/service/email-marketing",
  },
  {
    icon: Search,
    title: "SEO",
    bestFor: "Longer-term demand capture",
    description: "Search foundations that improve discoverability and compound into lower-cost demand over time.",
    path: "/service/seo",
  },
];
