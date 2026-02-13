import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
}

const FAQAccordion = ({ items, title = "Frequently Asked Questions" }: FAQAccordionProps) => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="mb-10 text-center text-3xl font-bold">{title}</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="glass-card border border-white/10 px-6"
              >
                <AccordionTrigger className="text-left text-sm font-medium hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
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
