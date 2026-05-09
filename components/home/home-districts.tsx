import Link from "next/link";

import { jeddahDistricts } from "@/lib/coverage-data";

export function HomeDistricts() {
  return (
    <section
      id="coverage"
      className="py-16 md:py-20"
      aria-labelledby="coverage-heading"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-3xl border border-[#d7e8ee] bg-white px-5 py-8 text-center shadow-[0_18px_38px_-28px_rgba(19,66,89,0.35)] md:px-8 md:py-10">
          <h2 id="coverage-heading" className="text-balance text-2xl font-extrabold text-[#163d57] md:text-3xl">
          نخدم أحياء جدة بروابط واضحة لكل منطقة
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-[#4b6677] md:text-base">
            اختر حيّك من القائمة أدناه؛ تم تنظيم البطاقات لتسهيل الوصول للخدمة المناسبة بسرعة مع تجربة قراءة أوضح.
          </p>
          <ul className="mt-8 grid list-none grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {jeddahDistricts.map((area) => (
              <li key={area.id} id={`area-${area.id}`}>
                <Link
                  href={area.href}
                  className="flex min-h-[4.25rem] items-center justify-center rounded-xl border border-[#cfe3e8] bg-white px-4 py-4 text-center text-sm font-semibold leading-relaxed text-[#1b5a73] shadow-[0_10px_24px_-20px_rgba(18,72,96,0.75)] underline-offset-2 transition-all hover:-translate-y-0.5 hover:border-[#b8d8df] hover:bg-[#f8fcfd] hover:text-[#134b63] hover:underline scroll-mt-36"
                >
                  {area.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
