import { Target, Megaphone, Workflow, Mail, Globe, Search, PenTool } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PrimaryService {
  icon: LucideIcon;
  badge: string;
  flagship: boolean;
  title: string;
  description: string;
  path: string;
  bestFor: string;
  ctaLabel: string;
}

export interface SupportingService {
  icon: LucideIcon;
  title: string;
  bestFor: string;
  description: string;
  path: string;
  ctaLabel: string;
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
    bestFor: "Teams running paid media, lead-gen funnels, or ecommerce journeys.",
    ctaLabel: "Fix My Tracking",
  },
  {
    icon: Megaphone,
    badge: "Core",
    flagship: false,
    title: "Paid Media Management",
    description:
      "Paid campaigns built to bring in better traffic, stronger leads, and more efficient results.",
    path: "/service/paid-media",
    bestFor: "Brands with demand to capture and budget they want to spend more intelligently.",
    ctaLabel: "Plan My Paid Media",
  },
  {
    icon: Workflow,
    badge: "Core",
    flagship: false,
    title: "Marketing Automation & CRM",
    description:
      "Follow-up systems that turn leads into customers and customers into repeat buyers.",
    path: "/service/marketing-automation",
    bestFor: "Teams losing leads after enquiry or relying on slow manual follow-up.",
    ctaLabel: "Map My Lead Flow",
  },
];

export const supportingServices: SupportingService[] = [
  {
    icon: Globe,
    title: "Website Development",
    bestFor: "Launches and landing paths",
    description:
      "Fast, conversion-focused websites built on WordPress and Webflow — with tracking and SEO built in from day one.",
    path: "/service/website-development",
    ctaLabel: "Plan a Website Build",
  },
  {
    icon: PenTool,
    title: "Content & Media Strategy",
    bestFor: "Creative direction and planning",
    description:
      "Strategic content planning and channel allocation tied to your buyer journey, not just a publishing calendar.",
    path: "/service/content-media-strategy",
    ctaLabel: "Build My Content Plan",
  },
  {
    icon: Mail,
    title: "Email Marketing",
    bestFor: "Lead nurture and re-engagement",
    description:
      "Automated email flows that nurture leads, recover carts, and bring customers back with attribution you can trust.",
    path: "/service/email-marketing",
    ctaLabel: "Plan Email Flows",
  },
  {
    icon: Search,
    title: "SEO",
    bestFor: "Longer-term demand capture",
    description:
      "Technical foundations, keyword strategy, and content that builds organic visibility over time.",
    path: "/service/seo",
    ctaLabel: "Plan My SEO Roadmap",
  },
];

export const allServices = [...primaryServices, ...supportingServices];

export const getServiceBySlug = (slug: string) =>
  allServices.find((service) => service.path === `/service/${slug}`);
