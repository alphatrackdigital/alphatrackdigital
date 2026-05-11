import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface HeroEyebrowProps {
  children: ReactNode;
  className?: string;
}

const HeroEyebrow = ({ children, className }: HeroEyebrowProps) => (
  <span
    className={cn(
      "inline-flex w-fit items-center rounded-md border border-primary/15 bg-primary/[0.07] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.16em] text-primary backdrop-blur-md sm:px-3 sm:py-1.5 sm:text-[10px]",
      className,
    )}
  >
    {children}
  </span>
);

export default HeroEyebrow;
