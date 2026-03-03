import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionIntroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  width?: "default" | "wide" | "narrow";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const widthClasses = {
  default: "max-w-2xl",
  wide: "max-w-3xl",
  narrow: "max-w-xl",
};

const SectionIntro = ({
  eyebrow,
  title,
  description,
  align = "left",
  width = "default",
  className,
  titleClassName,
  descriptionClassName,
}: SectionIntroProps) => {
  const isCentered = align === "center";

  return (
    <div className={cn(isCentered && "text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/90">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl",
          isCentered && "mx-auto",
          widthClasses[width],
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-sm leading-7 text-muted-foreground md:text-base",
            isCentered && "mx-auto",
            widthClasses[width],
            descriptionClassName,
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionIntro;
