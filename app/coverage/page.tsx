import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, BookOpen } from "lucide-react";

import { jeddahDistricts } from "@/lib/coverage-data";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buildCoverageIndexJsonLd } from "@/lib/seo/coverage-district-seo";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { keywordsForPath } from "@/lib/seo/keyword-clusters";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "أحياء جدة | دليل كشف تسربات وعزل المياه لـ 60 حيّاً محلياً",
  description:
    "ستون صفحة محلية لأحياء جدة: كشف تسربات بدون تكسير، عزل أسطح وخزانات، أسئلة شائعة لكل حي، وكلمات بحث محلية تساعدك على العثور على خدمة قريبة منك.",
  path: "/coverage",
  keywords: keywordsForPath("/coverage"),
  ogTitle: `أحياء جدة | ${siteConfig.name}`,
});

export default function CoverageIndexPage() {
  const jsonLd = buildCoverageIndexJsonLd();

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 text-right">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <header className="mb-10 rounded-2xl bg-gradient-to-b from-[#f8fbfc] to-white p-6 shadow-[0_12px_30px_-20px_rgba(19,66,89,0.32)] md:p-8">
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#1f7f8a]">
          <BookOpen className="size-4" aria-hidden />
          SEO محلي — جدة
        </p>
        <h1 className="text-balance text-4xl font-extrabold leading-tight text-primary md:text-5xl">
          دليل أحياء جدة: كشف تسربات المياه والعزل
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
          {jeddahDistricts.length} صفحة محلية تغطي أحياء جدة — كل صفحة تشرح خدمات كشف التسربات
          والعزل المائي والحراري داخل الحي: معاينة، فحص إلكتروني، تقارير، وأسئلة شائعة باسم
          المنطقة. اختر حيّك أدناه أو ارجع إلى{" "}
          <Link href="/#coverage" className="font-semibold text-[#1f7f8a] hover:underline">
            خريطة الأحياء في الرئيسية
          </Link>
          .
        </p>
        <p className="mt-3 max-w-3xl text-base leading-8 text-muted-foreground">
          للمحتوى العام راجع{" "}
          <Link href="/services" className="font-semibold text-[#1f7f8a] hover:underline">
            دليل الخدمات
          </Link>
          ،{" "}
          <Link href="/leak-detection" className="font-semibold text-[#1f7f8a] hover:underline">
            كشف التسربات
          </Link>
          ، و{" "}
          <Link href="/insulation" className="font-semibold text-[#1f7f8a] hover:underline">
            العزل
          </Link>
          .
        </p>
      </header>

      <section aria-labelledby="districts-heading">
        <h2 id="districts-heading" className="mb-6 text-2xl font-bold text-[#163d57]">
          جميع أحياء جدة ({jeddahDistricts.length})
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

      <section className="mt-14 rounded-2xl border border-[#e8edf0] bg-[#f8fbfc] p-6 md:p-8" aria-labelledby="coverage-guides-heading">
        <h2 id="coverage-guides-heading" className="mb-4 text-2xl font-extrabold text-[#163d57]">
          أدلة مرتبطة بخدمات الأحياء
        </h2>
        <p className="mb-5 max-w-3xl text-base leading-8 text-muted-foreground">
          قبل اختيار حيّك، قد يساعدك أحد هذه الأدلة على فهم المشكلة — ثم انتقل لصفحة حيّك للتفاصيل المحلية.
        </p>
        <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: "/leak-detection", title: "كشف تسربات بدون تكسير" },
            { href: "/blog/كشف-تسربات-بدون-تكسير", title: "دليل الكشف الشامل" },
            { href: "/blog/5-ayat-tasarab", title: "5 علامات تسرب" },
            { href: "/blog/ارتفاع-فاتورة-المياه-جدة", title: "ارتفاع فاتورة المياه" },
            { href: "/insulation", title: "عزل أسطح وخزانات" },
            { href: "/blog/عزل-أسطح-بجدة", title: "دليل عزل الأسطح" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-xl bg-white px-4 py-3 text-base font-semibold text-[#1b5a73] shadow-sm hover:bg-[#eef7f9] hover:text-[#163d57] hover:underline"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-14">
        <RelatedServicesSection currentPath="/coverage" heading="خدمات وروابط ذات صلة" />
      </div>
    </main>
  );
}
