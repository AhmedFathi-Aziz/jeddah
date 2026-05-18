import Link from "next/link";
import { Search } from "lucide-react";

import { getTopicsGrouped } from "@/lib/seo/keyword-clusters";

/**
 * فهرس مرئي للكلمات المفتاحية — يربط كل عبارة بحث بصفحة موجودة.
 * يعزّز التغطية الموضوعية دون حشو مخفي.
 */
export function HomeKeywordIndex() {
  const groups = getTopicsGrouped();

  return (
    <section
      id="keywords"
      className="mx-auto max-w-7xl px-6 py-16 md:py-20"
      aria-labelledby="keywords-heading"
    >
      <header className="mb-10 text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#eaf6f7] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
          <Search className="size-4" aria-hidden />
          دليل البحث
        </p>
        <h2
          id="keywords-heading"
          className="text-balance text-3xl font-extrabold tracking-tight text-primary md:text-4xl"
        >
          كل ما تبحث عنه في العزل والتسربات — في مكان واحد
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
          سواء كنت تبحث عن كشف تسربات، عزل أسطح، خزانات، فوم، أو فاتورة مياه مرتفعة في جدة — اختر
          الموضوع الأقرب لحالتك. كل رابط يوجّهك لصفحة الخدمة أو الدليل المناسب في هذا الموقع.
        </p>
      </header>

      <div className="space-y-10">
        {groups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-4 text-xl font-bold text-[#163d57]">{group.label}</h3>
            <ul className="flex flex-row-reverse flex-wrap justify-center gap-2 md:justify-end">
              {group.topics.map((topic) => (
                <li key={topic.keyword}>
                  <Link
                    href={topic.href}
                    className="inline-block rounded-full border border-[#cfe3e8] bg-white px-4 py-2 text-sm font-medium text-[#1b5a73] shadow-sm transition hover:border-[#1f7f8a] hover:bg-[#f0fafb] hover:text-[#163d57]"
                  >
                    {topic.keyword}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm leading-7 text-muted-foreground">
        لم تجد عبارتك؟ تصفّح{" "}
        <Link href="/services" className="font-semibold text-[#1f7f8a] hover:underline">
          دليل الخدمات الكامل
        </Link>{" "}
        أو{" "}
        <Link href="/coverage" className="font-semibold text-[#1f7f8a] hover:underline">
          صفحة حيّك في جدة
        </Link>
        .
      </p>
    </section>
  );
}
