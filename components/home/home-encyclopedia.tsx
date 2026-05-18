import Link from "next/link";
import { BookOpen, ChevronLeft } from "lucide-react";

import { ENCYCLOPEDIA_CATEGORIES } from "@/lib/seo/encyclopedia-topics";

export function HomeEncyclopedia() {
  return (
    <section
      id="encyclopedia"
      className="mx-auto max-w-7xl px-6 py-16 md:py-20"
      aria-labelledby="encyclopedia-heading"
    >
      <header className="mb-10 text-center md:mb-12">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf6f7] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
          <BookOpen className="size-4" aria-hidden />
          موسوعة متخصصة
        </p>
        <h2
          id="encyclopedia-heading"
          className="text-balance text-3xl font-extrabold tracking-tight text-primary md:text-4xl"
        >
          موسوعة كشف التسربات والعزل في جدة
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          مرجع عربي منظم يشرح المصطلحات، المواد، ومسارات الخدمة — من الاشتباه في التسرب حتى اختيار
          نظام العزل المناسب لمناخ الساحل. كل رابط يوجّهك لصفحة موجودة في الموقع.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        {ENCYCLOPEDIA_CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl border border-border bg-card p-6 text-right shadow-sm"
          >
            <h3 className="text-xl font-bold text-[#163d57]">{category.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">{category.description}</p>
            <ul className="mt-5 space-y-3">
              {category.topics.map((topic) => (
                <li key={topic.href + topic.term}>
                  <Link
                    href={topic.href}
                    className="group block rounded-xl border border-[#e8edf0] bg-[#f7f9fa] p-4 transition hover:border-[#c5dde8] hover:bg-white"
                  >
                    <span className="flex flex-row-reverse items-center justify-between gap-2">
                      <span className="font-semibold text-[#163d57] group-hover:text-[#1f7f8a]">
                        {topic.term}
                      </span>
                      <ChevronLeft
                        className="size-4 shrink-0 text-[#1f7f8a] opacity-70 transition group-hover:translate-x-[-2px]"
                        aria-hidden
                      />
                    </span>
                    <span className="mt-2 block text-sm leading-7 text-[#4a6677]">
                      {topic.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm leading-7 text-muted-foreground">
        للتعمّق أكثر، ابدأ من{" "}
        <Link href="/services" className="font-semibold text-[#1f7f8a] hover:underline">
          دليل الخدمات الكامل
        </Link>{" "}
        أو تصفّح{" "}
        <Link href="/blog" className="font-semibold text-[#1f7f8a] hover:underline">
          المدونة
        </Link>
        .
      </p>
    </section>
  );
}
