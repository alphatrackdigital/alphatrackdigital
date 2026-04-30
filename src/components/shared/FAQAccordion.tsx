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
    <section className={cn("py-14 md:py-20", variant === "minimal" && "bg-white/[0.01]")}>
      <div className="container mx-auto px-4 lg:px-8">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          width="narrow"
          className="mb-6 md:mb-10"
        />
        <div className={cn("mx-auto max-w-3xl", contentClassName)}>
          <Accordion
            type="single"
            collapsible
            defaultValue={defaultValue}
            className={cn(
              variant === "minimal"
                ? "overflow-hidden rounded-[22px] border border-white/[0.08] bg-white/[0.015]"
                : "space-y-3",
              accordionClassName,
            )}
          >
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className={cn(
                  "px-5 transition-all duration-300 ease-out data-[state=open]:bg-white/[0.035]",
                  variant === "panel"
                    ? "rounded-2xl border border-white/10 bg-white/[0.03] data-[state=open]:border-primary/20 data-[state=open]:shadow-[0_14px_34px_rgba(0,0,0,0.12)]"
                    : "border-b border-white/[0.07] bg-transparent data-[state=open]:bg-white/[0.025] last:border-b-0",
                  density === "compact" && "px-5",
                )}
              >
                <AccordionTrigger
                  className={cn(
                    "justify-start gap-4 text-left leading-6 hover:text-primary [&>svg]:order-first",
                    density === "compact" ? "py-4 text-sm font-medium" : "text-sm font-medium",
                  )}
                >
                  {item.question}
                </AccordionTrigger>
                <AccordionContent
                  className={cn(
                    "pl-8 pr-2 text-sm leading-7 text-muted-foreground",
                    density === "compact" && "text-[13px] leading-6",
                  )}
                >
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
