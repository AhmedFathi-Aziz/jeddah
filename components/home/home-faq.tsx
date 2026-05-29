"use client";

import Link from "next/link";

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
          موسوعة أسئلة وأجوبة حول كشف التسربات والعزل المائي والحراري في منازل وفلل جدة — مع روابط
          لصفحات{" "}
          <Link href="/leak-detection" className="font-semibold text-[#1f7f8a] hover:underline">
            الكشف
          </Link>
          {" و"}
          <Link href="/insulation" className="font-semibold text-[#1f7f8a] hover:underline">
            العزل
          </Link>
          {" و"}
          <Link href="/blog" className="font-semibold text-[#1f7f8a] hover:underline">
            المدونة
          </Link>
          .
        </p>
      </header>
      <Accordion multiple className="w-full rounded-xl border bg-card divide-y divide-border px-4">
        {HOME_FAQ_ITEMS.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`} className="border-0 not-last:border-b-0 py-3">
            <AccordionTrigger className="text-start text-base font-semibold hover:no-underline py-3">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-3 text-end">
              <p>{item.answer}</p>
              {item.links && item.links.length > 0 ? (
                <nav className="mt-3 flex flex-wrap justify-end gap-2" aria-label={`روابط: ${item.question}`}>
                  {item.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full bg-[#eef7f9] px-3 py-1 text-xs font-semibold text-[#1b5a73] hover:bg-[#dceef2] hover:underline"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
