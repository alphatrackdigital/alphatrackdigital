import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionIntro from "@/components/shared/SectionIntro";
import { cn } from "@/lib/utils";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  variant?: "minimal" | "panel";
  density?: "comfortable" | "compact";
  eyebrow?: string;
  defaultOpenItem?: number;
  contentClassName?: string;
  accordionClassName?: string;
}

const FAQAccordion = ({
  items,
  title = "Frequently Asked Questions",
  description,
  variant = "panel",
  density = "comfortable",
  eyebrow,
  defaultOpenItem,
  contentClassName,
  accordionClassName,
}: FAQAccordionProps) => {
  const defaultValue =
    typeof defaultOpenItem === "number" && defaultOpenItem >= 0 && defaultOpenItem < items.length
      ? `faq-${defaultOpenItem}`
      : undefined;

  return (
    <section className={cn("py-20", variant === "minimal" && "bg-white/[0.01]")}>
      <div className="container mx-auto px-4 lg:px-8">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          width="narrow"
          className="mb-10"
        />
        <div className={cn("mx-auto max-w-3xl", contentClassName)}>
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultValue}
            className={cn(variant === "minimal" ? "space-y-2" : "space-y-3", accordionClassName)}
          >
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className={cn(
                  "rounded-2xl px-6 transition-all duration-200 hover:border-primary/25 data-[state=open]:border-primary/20 data-[state=open]:bg-white/[0.035] data-[state=open]:shadow-[0_14px_34px_rgba(0,0,0,0.12)]",
                  variant === "panel"
                    ? "border border-white/10 bg-white/[0.03]"
                    : "border border-white/8 bg-transparent",
                  density === "compact" && "px-5",
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "text-left hover:text-primary",
                    density === "compact" ? "py-3 text-sm font-medium" : "text-sm font-medium",
                  )}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className={cn("text-sm text-muted-foreground", density === "compact" && "text-[13px]")}>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
