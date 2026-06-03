import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Building2, SearchCheck } from "lucide-react";

import { ServicesPageBody } from "@/components/services/services-page-body";
import { EncyclopediaSection } from "@/components/seo/encyclopedia-section";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { buttonVariants } from "@/components/ui/button";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { keywordsForPath } from "@/lib/seo/keyword-clusters";
import { KASHF_JEDDAH_PAGE_PATH } from "@/lib/seo/kashf-tasribat-jeddah-page-data";
import { KASHF_BEDUN_TAKSIR_PAGE_PATH } from "@/lib/seo/kashf-bedun-taksir-jeddah-page-data";
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
    <main className="page-main pb-mobile-fab py-10 md:py-16">
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

      <section
        className="mt-10 overflow-hidden rounded-3xl border border-[#d7e8ee] bg-white text-right shadow-[0_16px_32px_-24px_rgba(19,66,89,0.28)]"
        aria-labelledby="featured-kashf-jeddah-heading"
      >
        <div className="grid min-w-0 lg:grid-cols-2">
          <div className="relative aspect-[16/10] min-h-[220px] lg:aspect-auto lg:min-h-[280px]">
            <Image
              src={images.kashfJeddahPageHero.src}
              alt={images.kashfJeddahPageHero.alt}
              title={images.kashfJeddahPageHero.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <p className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#ecf8f8] px-3 py-1.5 text-xs font-semibold text-[#1f7f8a] sm:text-sm">
              <SearchCheck className="size-4 shrink-0" aria-hidden />
              صفحة خدمة مفصّلة
            </p>
            <h2 id="featured-kashf-jeddah-heading" className="text-2xl font-extrabold leading-snug text-[#163d57] md:text-3xl">
              كشف تسربات المياه بجدة
            </h2>
            <p className="mt-3 text-base leading-8 text-[#4a6677] md:text-lg">
              دليل شامل للفلل والشقق والمباني التجارية: فحص بدون تكسير، خطوات العمل، الأجهزة المستخدمة،
              تغطية أحياء جدة، وأسئلة شائعة — مع إمكانية حجز معاينة مباشرة.
            </p>
            <div className="mt-5 flex flex-row-reverse flex-wrap justify-end gap-3">
              <Link
                href={KASHF_JEDDAH_PAGE_PATH}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "inline-flex h-11 items-center gap-2 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
                )}
              >
                افتح صفحة الخدمة
                <ArrowLeft className="size-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href="/leak-detection"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
                )}
              >
                نظرة عامة على الكشف
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        className="mt-10 overflow-hidden rounded-3xl border border-[#d7e8ee] bg-white text-right shadow-[0_16px_32px_-24px_rgba(19,66,89,0.28)]"
        aria-labelledby="featured-kashf-bedun-taksir-heading"
      >
        <div className="grid min-w-0 lg:grid-cols-2">
          <div className="relative aspect-[16/10] min-h-[220px] lg:order-2 lg:aspect-auto lg:min-h-[280px]">
            <Image
              src={images.kashfBedunTaksirPageHero.src}
              alt={images.kashfBedunTaksirPageHero.alt}
              title={images.kashfBedunTaksirPageHero.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={80}
              loading="lazy"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8 lg:order-1">
            <p className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#ecf8f8] px-3 py-1.5 text-xs font-semibold text-[#1f7f8a] sm:text-sm">
              <SearchCheck className="size-4 shrink-0" aria-hidden />
              فحص غير تداخلي
            </p>
            <h2 id="featured-kashf-bedun-taksir-heading" className="text-2xl font-extrabold leading-snug text-[#163d57] md:text-3xl">
              كشف تسربات بدون تكسير بجدة
            </h2>
            <p className="mt-3 text-base leading-8 text-[#4a6677] md:text-lg">
              للفلل والشقق والمباني التجارية: تصوير حراري، فحص صوتي، تحديد مصدر التسرب بدقة — دون كسر عشوائي
              للجدران أو البلاط. دليل شامل مع أسئلة شائعة وحجز معاينة.
            </p>
            <div className="mt-5 flex flex-row-reverse flex-wrap justify-end gap-3">
              <Link
                href={KASHF_BEDUN_TAKSIR_PAGE_PATH}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "inline-flex h-11 items-center gap-2 rounded-xl bg-[#1f7f8a] px-6 font-bold text-white hover:bg-[#1a6d76]",
                )}
              >
                افتح صفحة الخدمة
                <ArrowLeft className="size-4 shrink-0" aria-hidden />
              </Link>
              <Link
                href={KASHF_JEDDAH_PAGE_PATH}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-xl border-[#8cc7d2] px-6 font-semibold text-[#154c69] hover:bg-[#edf8fa]",
                )}
              >
                كشف تسربات المياه
              </Link>
            </div>
          </div>
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
