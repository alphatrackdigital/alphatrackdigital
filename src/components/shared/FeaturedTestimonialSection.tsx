import { Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { featuredTestimonial } from "@/data/companyProfile";
import { cn } from "@/lib/utils";

type FeaturedTestimonialSectionProps = {
  eyebrow?: string;
  title?: string;
  className?: string;
};

const FeaturedTestimonialSection = ({
  eyebrow = "Client Perspective",
  title = "What clients say about working with us.",
  className,
}: FeaturedTestimonialSectionProps) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      data-testid="featured-testimonial-section"
      className={cn("border-t border-white/10 py-14 md:py-16", className)}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-[248px_minmax(0,1fr)] lg:items-stretch">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
            className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(51,204,153,0.06),transparent_26%),radial-gradient(circle_at_78%_18%,rgba(0,175,239,0.05),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.022)_0%,rgba(255,255,255,0.008)_100%)] p-5 shadow-[0_18px_48px_rgba(0,0,0,0.12)] md:p-6"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
            <div className="pointer-events-none absolute left-6 top-0 h-px w-20 bg-gradient-to-r from-primary/75 to-transparent" />

            <div className="relative flex h-full flex-col justify-between gap-5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-primary/86">
                  {eyebrow}
                </p>
                <h2 className="mt-3 max-w-[10ch] text-[1.08rem] font-bold leading-[1.1] tracking-tight text-foreground md:text-[1.48rem]">
                  {title}
                </h2>
              </div>

              <div className="flex flex-1 items-center justify-start lg:justify-center">
                <div className="relative flex h-[118px] w-[118px] items-center justify-center rounded-[28px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(0,175,239,0.14),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(51,204,153,0.10),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.012)_100%)] shadow-[0_18px_46px_rgba(0,0,0,0.18)] md:h-[128px] md:w-[128px]">
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_62%)]" />
                  <img
                    src="/pearlhouse-ghana-logo.png"
                    alt="Pearl House Ghana"
                    className="h-[86px] w-[86px] object-contain md:h-[94px] md:w-[94px]"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="relative flex h-full flex-col justify-between overflow-hidden rounded-[32px] border border-white/[0.08] bg-[radial-gradient(circle_at_top_right,rgba(0,175,239,0.06)_0%,transparent_22%),radial-gradient(circle_at_bottom_left,rgba(51,204,153,0.05)_0%,transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.024)_0%,rgba(255,255,255,0.008)_100%)] p-6 shadow-[0_20px_54px_rgba(0,0,0,0.12)] md:p-7 lg:p-8"
          >
            <Quote className="relative mb-5 h-7 w-7 text-primary/35" />
            <blockquote className="relative max-w-[60ch] text-base leading-[1.8] text-foreground md:text-[1.14rem] md:leading-[1.72]">
              "{featuredTestimonial.quote}"
            </blockquote>
            <div className="relative mt-6 flex flex-wrap items-start gap-x-3 gap-y-1 border-t border-white/10 pt-5">
              <p className="text-sm font-semibold text-foreground">{featuredTestimonial.name}</p>
              <p className="text-xs text-muted-foreground/88">{featuredTestimonial.title}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonialSection;
