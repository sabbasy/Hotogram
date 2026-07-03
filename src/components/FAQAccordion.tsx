import { useState } from "react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div 
            key={index} 
            className="overflow-hidden rounded-2xl border border-primary/10 bg-surface transition-all duration-200 hover:border-primary-mid/20"
          >
            <h3>
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between px-6 py-5 text-left font-heading text-lg font-semibold text-primary transition-colors hover:text-primary-mid cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <span className="ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/5 transition-transform duration-200">
                  <svg
                    className={`h-4 w-4 text-primary transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            
            {/* Answer block with transition */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="border-t border-primary/5 px-6 py-5 text-base text-text-secondary">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
