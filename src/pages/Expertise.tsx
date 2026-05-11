import { Link } from "react-router-dom";
import {
  BriefcaseBusiness,
  Building2,
  Gamepad2,
  GraduationCap,
  Package2,
  Plane,
  Shirt,
  ShoppingCart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import SEO from "@/components/shared/SEO";
import SectionIntro from "@/components/shared/SectionIntro";
import { expertisePages } from "@/data/expertise";
import { prefetchRoute } from "@/lib/routePrefetch";

const expertiseIcons: Record<string, LucideIcon> = {
  "ecommerce-retail": ShoppingCart,
  fmcg: Package2,
  education: GraduationCap,
  saas: BriefcaseBusiness,
  "entertainment-hospitality": Plane,
  "real-estate": Building2,
  fashion: Shirt,
  gaming: Gamepad2,
};

const expertiseSummaries: Record<string, string> = {
  saas: "Connect signups, demos, CRM stages, and campaign source into one clearer growth view.",
  education: "Track enquiries, applications, and enrolment demand across intake campaigns and follow-up.",
  "ecommerce-retail": "Tie traffic, carts, orders, and repeat purchase signals back to the channels creating revenue.",
  fmcg: "Measure launch activity, retailer intent, owned audiences, and practical demand signals.",
  "entertainment-hospitality": "Connect campaigns, booking intent, event pushes, and guest re-engagement.",
  "real-estate": "Improve lead-source visibility, viewing intent, sales handoff, and pipeline follow-up.",
  fashion: "Track launches, collection demand, paid campaigns, cart recovery, and repeat purchases.",
  gaming: "Connect launch buzz, signups, wishlists, community actions, and event demand.",
};

const Expertise = () => (
  <>
    <SEO
      title="Expertise | AlphaTrack Digital"
      description="Explore the industries AlphaTrack Digital supports across tracking, paid media, automation, and growth systems."
      canonicalUrl="/expertise"
    />

    <section className="relative min-h-[27rem] overflow-hidden border-t border-white/10 bg-[#05070d] pb-8 pt-20 text-center md:min-h-[31rem] md:pb-10 md:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(51,204,153,0.10),transparent_29%),radial-gradient(circle_at_76%_35%,rgba(0,175,239,0.12),transparent_30%),radial-gradient(circle_at_50%_82%,rgba(0,51,153,0.16),transparent_36%),linear-gradient(180deg,#05070d_0%,#061017_54%,#05070d_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:radial-gradient(circle,rgba(0,175,239,0.75)_1px,transparent_1.5px)] [background-size:38px_38px] [mask-image:radial-gradient(ellipse_at_50%_42%,black_0%,transparent_68%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#05070d] to-transparent" />

      <div className="container relative mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl pt-3 md:pt-8">
          <SectionIntro
            as="h1"
            eyebrow="Expertise"
            mode="hero"
            align="center"
            title={
              <>
                Growth Systems for <span className="text-gradient">Specific Markets</span>
              </>
            }
            description="Choose the market closest to your business to see how we connect tracking, paid media, and follow-up around the way demand actually moves."
            maxWidth="xl"
            titleClassName="mx-auto max-w-4xl tracking-normal"
            descriptionClassName="mx-auto max-w-3xl"
          />
        </div>
      </div>
    </section>

    <section className="border-t border-white/10 bg-[#070a10] py-8 md:py-10">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {expertisePages.map((item) => {
            const Icon = expertiseIcons[item.slug] ?? BriefcaseBusiness;
            const path = `/expertise/${item.slug}`;

            return (
              <Link
                key={item.slug}
                to={path}
                onMouseEnter={() => prefetchRoute(path)}
                onFocus={() => prefetchRoute(path)}
                className="group flex min-h-[11rem] flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:bg-white/[0.028] md:p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.035] text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-[1rem] font-semibold leading-snug tracking-normal text-foreground">
                  {item.name}
                </h2>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                  {expertiseSummaries[item.slug] ?? item.heroDescription}
                </p>
                <span className="mt-auto pt-4 text-sm font-medium text-primary">View expertise</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  </>
);

export default Expertise;
