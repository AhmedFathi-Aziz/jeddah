import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { jeddahDistricts } from "@/lib/coverage-data";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "أحياء جدة",
  description: "دليل رسمي لصفحات أحياء جدة. اختر الحي للوصول إلى تفاصيل الخدمة المناسبة بسرعة.",
  alternates: { canonical: "/coverage" },
  openGraph: {
    url: "/coverage",
    title: `أحياء جدة | ${siteConfig.name}`,
    description: "تصفح جميع أحياء جدة واختر صفحتك للوصول إلى الخدمة المناسبة.",
    locale: siteConfig.locale.replace("_", "-"),
  },
};

export default function CoverageIndexPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 text-right">
      <header className="mb-10 rounded-2xl bg-gradient-to-b from-[#f8fbfc] to-white p-6 shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)] md:p-8">
        <p className="mb-3 text-base font-semibold text-[#2f556d]">أحياء جدة</p>
        <h1 className="text-balance text-4xl font-extrabold leading-tight text-primary md:text-5xl">
          دليل أحياء جدة للخدمات الميدانية
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
          تم تنظيم الصفحات التالية بطريقة رسمية وواضحة لتسهيل الوصول إلى تفاصيل كل حي، مع تنقل سريع بين المناطق.
        </p>
      </header>

      <section aria-labelledby="districts-heading">
        <h2 id="districts-heading" className="mb-6 text-2xl font-bold text-[#163d57]">
          جميع الأحياء
        </h2>
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jeddahDistricts.map((district) => (
            <li key={district.id}>
              <Link
                href={district.href}
                className="group flex h-full items-start justify-between gap-3 rounded-xl bg-white px-4 py-4 shadow-[0_10px_24px_-18px_rgba(19,66,89,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#f8fbfc]"
              >
                <span className="text-base font-semibold leading-relaxed text-[#1b5a73] group-hover:text-[#163d57]">
                  {district.district}
                </span>
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#1f7f8a]" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
