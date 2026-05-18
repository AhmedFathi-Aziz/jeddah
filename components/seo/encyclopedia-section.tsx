import Link from "next/link";
import { BookOpen } from "lucide-react";

import {
  ENCYCLOPEDIA_CATEGORIES,
  type EncyclopediaCategory,
} from "@/lib/seo/encyclopedia-topics";

type Props = {
  /** عرض فئة واحدة فقط، أو الكل إن لم يُحدَّد */
  categoryId?: EncyclopediaCategory["id"];
  heading?: string;
  className?: string;
};

export function EncyclopediaSection({ categoryId, heading, className }: Props) {
  const categories = categoryId
    ? ENCYCLOPEDIA_CATEGORIES.filter((c) => c.id === categoryId)
    : ENCYCLOPEDIA_CATEGORIES;

  if (categories.length === 0) return null;

  return (
    <section
      className={className}
      aria-labelledby={heading ? "encyclopedia-section-heading" : undefined}
    >
      {heading ? (
        <header className="mb-5 text-right">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[#1f7f8a]">
            <BookOpen className="size-4" aria-hidden />
            من موسوعة الموقع
          </p>
          <h2 id="encyclopedia-section-heading" className="text-2xl font-extrabold text-[#163d57]">
            {heading}
          </h2>
        </header>
      ) : null}

      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id}>
            {!categoryId ? (
              <h3 className="mb-3 text-lg font-bold text-[#163d57]">{category.title}</h3>
            ) : null}
            <ul className="grid gap-2 sm:grid-cols-2">
              {category.topics.map((topic) => (
                <li key={topic.href + topic.term}>
                  <Link
                    href={topic.href}
                    className="block rounded-lg border border-[#e8edf0] bg-[#f7f9fa] px-4 py-3 text-right transition hover:border-[#c5dde8] hover:bg-white"
                  >
                    <span className="font-semibold text-[#163d57]">{topic.term}</span>
                    <span className="mt-1 block text-sm leading-6 text-[#4a6677]">
                      {topic.summary}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
