import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, SearchCheck } from "lucide-react";

import { images } from "@/lib/images";
import { siteConfig } from "@/lib/site-config";
import { KASHF_BEDUN_TAKSIR_PAGE_PATH } from "@/lib/seo/kashf-bedun-taksir-jeddah-page-data";
import { KASHF_KHAZANAT_PAGE_PATH } from "@/lib/seo/kashf-khazanat-jeddah-page-data";
import { KASHF_MASABIH_PAGE_PATH } from "@/lib/seo/kashf-masabih-jeddah-page-data";
import { KASHF_JEDDAH_PAGE_PATH } from "@/lib/seo/kashf-tasribat-jeddah-page-data";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    href: KASHF_JEDDAH_PAGE_PATH,
    title: "كشف تسربات المياه بجدة",
    summary: "دليل شامل: فحص بدون تكسير، خطوات العمل، الأجهزة، تغطية الأحياء، وأسئلة شائعة.",
    badge: "صفحة مفصّلة",
    image: images.kashfJeddahPageHero,
  },
  {
    href: KASHF_BEDUN_TAKSIR_PAGE_PATH,
    title: "كشف تسربات بدون تكسير بجدة",
    summary: "تصوير حراري وفحص صوتي — دون كسر عشوائي للجدران أو البلاط.",
    badge: "بدون تكسير",
    image: images.kashfBedunTaksirPageHero,
  },
  {
    href: KASHF_KHAZANAT_PAGE_PATH,
    title: "كشف تسربات الخزانات بجدة",
    summary: "فحص خزان علوي وأرضي، وصلات، عزل، وتقرير فني.",
    badge: "خزانات",
    logo: true,
  },
  {
    href: KASHF_MASABIH_PAGE_PATH,
    title: "كشف تسربات المسابح بجدة",
    summary: "اختبار منسوب، فحص خطوط التغذية والصرف، وتقرير فني.",
    badge: "مسابح",
    logo: true,
  },
] as const;

export function KashfJeddahServiceCards({ className }: { className?: string }) {
  return (
    <section className={cn("mt-10 text-right", className)} aria-labelledby="kashf-services-grid-heading">
      <h2 id="kashf-services-grid-heading" className="text-2xl font-extrabold text-[#163d57] md:text-3xl">
        صفحات كشف التسربات
      </h2>
      <p className="mt-2 text-base leading-8 text-[#4a6677]">اختر الخدمة لفتح الدليل الكامل.</p>

      <div className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
        {CARDS.map((card) => {
          const isLogo = "logo" in card && card.logo;
          return (
          <Link
            key={card.href}
            href={card.href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d7e8ee] bg-white shadow-[0_14px_32px_-26px_rgba(19,66,89,0.35)] transition hover:-translate-y-0.5 hover:border-[#1f7f8a]/40"
          >
            <div
              className={cn(
                "relative aspect-[3/2] w-full shrink-0 overflow-hidden",
                isLogo ? "bg-white" : "bg-[#f8fbfc]",
              )}
            >
              {isLogo ? (
                <Image
                  src={siteConfig.logo.full.src}
                  alt={siteConfig.logo.full.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, 320px"
                  quality={90}
                  loading="lazy"
                  className="object-contain object-center bg-white p-4"
                />
              ) : (
                "image" in card &&
                card.image && (
                  <Image
                    src={card.image.src}
                    alt={card.image.alt}
                    title={card.image.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 320px"
                    quality={80}
                    loading="lazy"
                    className="object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                  />
                )
              )}
            </div>

            <div className="flex flex-1 flex-col border-t border-[#e8edf0] p-4 pt-3">
              <span className="mb-1.5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#ecf8f8] px-2.5 py-0.5 text-xs font-semibold text-[#1f7f8a]">
                <SearchCheck className="size-3.5" aria-hidden />
                {card.badge}
              </span>
              <h3 className="text-lg font-extrabold leading-snug text-[#163d57] group-hover:text-[#1f7f8a]">
                {card.title}
              </h3>
              <p className="mt-1.5 flex-1 text-sm leading-6 text-[#4a6677]">{card.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[#1f7f8a] group-hover:underline">
                افتح الصفحة
                <ArrowLeft className="size-4" aria-hidden />
              </span>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
