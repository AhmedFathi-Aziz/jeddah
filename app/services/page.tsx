import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Building2 } from "lucide-react";

import { ServicesPageBody } from "@/components/services/services-page-body";
import { EncyclopediaSection } from "@/components/seo/encyclopedia-section";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { keywordsForPath } from "@/lib/seo/keyword-clusters";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "دليل خدمات كشف التسربات والعزل في جدة",
  description:
    "كل خدمات كشف تسربات المياه والعزل في جدة: بدون تكسير، فوم، خزانات، حمامات، فواتير، تقارير، و60 حيّاً — مرجع واحد لأي بحث في المجال.",
  path: "/services",
  keywords: keywordsForPath("/services"),
  ogTitle: `خدمات التسربات والعزل — ${siteConfig.name}`,
});

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-14 md:py-16">
      <section className="rounded-3xl border border-[#d7e8ee] bg-white p-7 text-right shadow-[0_16px_32px_-24px_rgba(19,66,89,0.35)] md:p-10">
        <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#ecf8f8] px-4 py-2 text-sm font-semibold text-[#1f7f8a]">
          <ShieldCheck className="size-4" aria-hidden />
          دليل الخدمات الكامل
        </p>
        <h1 className="text-3xl font-extrabold leading-tight text-[#163d57] md:text-5xl">
          خدمات كشف التسربات والعزل في جدة
        </h1>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-[#4a6677]">
          صفحة موسعة تشرح كل ما نقدمه في مجال كشف تسربات المياه والعزل الحراري والمائي — من الفحص الإلكتروني إلى عزل الخزانات والأسطح —
          لتختار بثقة ثم تتواصل معنا لمعاينة أو استفسار.
        </p>
        <div className="mt-7 flex flex-row-reverse flex-wrap justify-end gap-3">
          <a
            href={`tel:${siteConfig.phone}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
            )}
          >
            احجز زيارة فنية
          </a>
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
            )}
          >
            تواصل معنا
          </Link>
        </div>
      </section>

      <div className="mt-10 max-w-4xl">
        <ServicesPageBody />
      </div>

      <EncyclopediaSection
        heading="فهرس موسوعة التسربات والعزل"
        className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[#e8eef1] bg-[#f7f9fa] p-6 text-right md:p-8"
      />

      <section className="mx-auto mt-12 max-w-4xl rounded-2xl border border-[#e8eef1] bg-white p-6 text-right shadow-[0_12px_32px_-20px_rgba(19,66,89,0.28)]">
        <h2 className="inline-flex items-center gap-2 text-xl font-bold text-[#163d57]">
          <Building2 className="size-5 text-[#1f7f8a]" aria-hidden />
          تغطية أحياء جدة
        </h2>
        <p className="mt-2 leading-8 text-[#4a6677]">
          نغطي معظم أحياء جدة بخدمات ميدانية سريعة. اختر منطقتك من الصفحة الرئيسية للاطلاع على معلومات تناسب موقعك.
        </p>
        <Link href="/#coverage" className="mt-3 inline-flex font-semibold text-[#1f7f8a] hover:underline">
          عرض روابط الأحياء
        </Link>
      </section>

      <RelatedServicesSection currentPath="/services" />
    </main>
  );
}
