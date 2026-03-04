import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionIntroProps {
  as?: "h1" | "h2" | "h3";
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  width?: "default" | "wide" | "narrow";
  maxWidth?: "sm" | "md" | "lg" | "xl";
  mode?: "hero" | "content" | "proof";
  eyebrowTone?: "accent" | "muted";
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

const legacyWidthMap = {
  default: "md",
  wide: "lg",
  narrow: "sm",
} as const;

const widthClasses = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
} as const;

const titleClasses = {
  hero: "text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl",
  content: "text-3xl font-bold tracking-tight md:text-4xl",
  proof: "text-2xl font-bold tracking-tight md:text-3xl",
} as const;

const descriptionClasses = {
  hero: "mt-4 text-base leading-8 text-muted-foreground md:text-lg",
  content: "mt-4 text-sm leading-7 text-muted-foreground md:text-base",
  proof: "mt-4 text-sm leading-6 text-muted-foreground md:text-[15px]",
} as const;

const eyebrowToneClasses = {
  accent: "text-primary/90",
  muted: "text-muted-foreground/75",
};

const SectionIntro = ({
  as = "h2",
  eyebrow,
  title,
  description,
  align = "left",
  width = "default",
  maxWidth,
  mode = "content",
  eyebrowTone = "accent",
  className,
  titleClassName,
  descriptionClassName,
}: SectionIntroProps) => {
  const isCentered = align === "center";
  const resolvedWidth = maxWidth ?? legacyWidthMap[width];
  const TitleTag = as;

  return (
    <div className={cn(isCentered && "text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]",
            eyebrowToneClasses[eyebrowTone],
          )}
        >
          {eyebrow}
        </p>
      )}
      <TitleTag
        className={cn(
          titleClasses[mode],
          isCentered && "mx-auto",
          widthClasses[resolvedWidth],
          titleClassName,
        )}
      >
        {title}
      </TitleTag>
      {description && (
        <p
          className={cn(
            descriptionClasses[mode],
            isCentered && "mx-auto",
            widthClasses[resolvedWidth],
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
