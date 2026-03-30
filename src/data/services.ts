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
    description:
      "We help set up tracking across key touchpoints so you know exactly what drives revenue. GA4, GTM, Meta Pixel, and CRM reporting configured for signal, not guesswork.",
    path: "/service/conversion-tracking",
  },
  {
    icon: Megaphone,
    badge: "Core",
    flagship: false,
    title: "Paid Media Management",
    description:
      "Google Ads, Meta, YouTube, and channel mixes built for efficiency. We optimise for CAC and ROAS, not vanity metrics, so spend stays tied to qualified demand.",
    path: "/service/paid-media",
  },
  {
    icon: Workflow,
    badge: "Core",
    flagship: false,
    title: "Marketing Automation & CRM",
    description:
      "We build lifecycle journeys from lead capture to retention using automation, email, and CRM systems that nurture prospects into loyal customers.",
    path: "/service/marketing-automation",
  },
];

export const supportingServices: SupportingService[] = [
  {
    icon: Globe,
    title: "Website Development",
    bestFor: "Launches and landing paths",
    description:
      "Fast, conversion-focused websites and landing experiences built to support campaigns and capture qualified demand.",
    path: "/service/website-development",
  },
  {
    icon: PenTool,
    title: "Content & Media Strategy",
    bestFor: "Creative direction and planning",
    description:
      "Creative strategy, campaign messaging, and media direction that keep execution aligned to business goals.",
    path: "/service/content-media-strategy",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    bestFor: "Lead nurture and re-engagement",
    description:
      "Lifecycle email campaigns that support lead nurture, retargeting, retention, and re-engagement.",
    path: "/service/email-marketing",
  },
  {
    icon: Search,
    title: "SEO",
    bestFor: "Longer-term demand capture",
    description:
      "Search foundations that improve discoverability, strengthen content visibility, and compound into lower-cost demand over time.",
    path: "/service/seo",
  },
];
