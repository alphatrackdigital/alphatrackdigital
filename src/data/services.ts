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
      "Tracking that shows what is driving leads, sales, and revenue.",
    path: "/service/conversion-tracking",
  },
  {
    icon: Megaphone,
    badge: "Core",
    flagship: false,
    title: "Paid Media Management",
    description:
      "Paid campaigns built to bring in better traffic, stronger leads, and more efficient results.",
    path: "/service/paid-media",
  },
  {
    icon: Workflow,
    badge: "Core",
    flagship: false,
    title: "Marketing Automation & CRM",
    description:
      "Follow-up systems that turn leads into customers and customers into repeat buyers.",
    path: "/service/marketing-automation",
  },
];

export const supportingServices: SupportingService[] = [
  {
    icon: Globe,
    title: "Website Development",
    bestFor: "Launches and landing paths",
    description:
      "Websites and landing pages built to help your campaigns convert more visitors.",
    path: "/service/website-development",
  },
  {
    icon: PenTool,
    title: "Content & Media Strategy",
    bestFor: "Creative direction and planning",
    description:
      "Messaging and creative direction for clear, consistent campaigns.",
    path: "/service/content-media-strategy",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    bestFor: "Lead nurture and re-engagement",
    description:
      "Email flows that keep leads engaged and bring customers back.",
    path: "/service/email-marketing",
  },
  {
    icon: Search,
    title: "SEO",
    bestFor: "Longer-term demand capture",
    description:
      "Search visibility that helps more of the right people find you over time.",
    path: "/service/seo",
  },
];
