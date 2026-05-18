"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { HOME_FAQ_ITEMS } from "@/lib/seo/home-faq-data";

export function HomeFaq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20" aria-labelledby="faq-heading">
      <header className="mb-12 text-center">
        <h2 id="faq-heading" className="mb-4 text-balance text-3xl font-bold text-primary md:text-4xl">
          الأسئلة الشائعة
        </h2>
        <p className="text-muted-foreground text-balance leading-relaxed">
          موسوعة أسئلة وأجوبة حول كشف التسربات والعزل المائي والحراري في منازل وفلل جدة
        </p>
      </header>
      <Accordion multiple className="w-full rounded-xl border bg-card divide-y divide-border px-4">
        {HOME_FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`} className="border-0 not-last:border-b-0 py-3">
            <AccordionTrigger className="text-start text-base font-semibold hover:no-underline py-3">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-3 text-end">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
