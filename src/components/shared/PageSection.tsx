import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageSectionProps {
  children: ReactNode;
  id?: string;
  mode?: "hero" | "content" | "proof";
  border?: "none" | "top" | "bottom" | "both";
  surface?: "default" | "quiet" | "glow";
  spacing?: "compact" | "default" | "spacious";
  className?: string;
  containerClassName?: string;
}

const borderClasses = {
  none: "",
  top: "border-t border-white/10",
  bottom: "border-b border-white/10",
  both: "border-y border-white/10",
} as const;

const spacingClasses = {
  hero: {
    compact: "py-20 md:py-24",
    default: "py-24 md:py-28",
    spacious: "py-24 md:py-32",
  },
  content: {
    compact: "py-14 md:py-16",
    default: "py-16 md:py-20",
    spacious: "py-20 md:py-24",
  },
  proof: {
    compact: "py-12 md:py-14",
    default: "py-14 md:py-16",
    spacious: "py-16 md:py-20",
  },
} as const;

const surfaceClasses = {
  default: "",
  quiet: "bg-white/[0.01]",
  glow: "bg-[linear-gradient(180deg,rgba(255,255,255,0.012)_0%,rgba(0,51,153,0.018)_44%,transparent_100%)]",
} as const;

const PageSection = ({
  children,
  id,
  mode = "content",
  border = "none",
  surface = "default",
  spacing = "default",
  className,
  containerClassName,
}: PageSectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        borderClasses[border],
        spacingClasses[mode][spacing],
        surfaceClasses[surface],
        className,
      )}
    >
      {surface === "glow" && (
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-atd-blue/[0.10] blur-[120px]" />
          <div className="absolute bottom-0 right-[10%] h-48 w-48 rounded-full bg-secondary/[0.05] blur-[120px]" />
        </div>
      )}
      <div className={cn("container relative mx-auto px-4 lg:px-8", containerClassName)}>{children}</div>
    </section>
  );
};

export default PageSection;
