import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HeroEyebrowProps {
  children: ReactNode;
  className?: string;
}

const HeroEyebrow = ({ children, className }: HeroEyebrowProps) => (
  <span
    className={cn(
      "inline-flex w-fit items-center rounded-md border border-primary/15 bg-primary/[0.07] px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary backdrop-blur-md sm:text-[11px]",
      className,
    )}
  >
    {children}
  </span>
);

export default HeroEyebrow;
