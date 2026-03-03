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
  variant?: "minimal" | "panel";
  density?: "comfortable" | "compact";
  eyebrow?: string;
}

const FAQAccordion = ({
  items,
  title = "Frequently Asked Questions",
  variant = "panel",
  density = "comfortable",
  eyebrow,
}: FAQAccordionProps) => {
  return (
    <section className={cn("py-20", variant === "minimal" && "bg-white/[0.01]")}>
      <div className="container mx-auto px-4 lg:px-8">
        <SectionIntro
          eyebrow={eyebrow}
          title={title}
          align="center"
          width="narrow"
          className="mb-10"
        />
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className={cn(variant === "minimal" ? "space-y-2" : "space-y-3")}>
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className={cn(
                  "rounded-2xl px-6 transition-colors duration-150 hover:border-primary/25",
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
