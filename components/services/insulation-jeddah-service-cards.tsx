import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { AZL_ASHTOF_PAGE_PATH } from "@/lib/seo/azl-ashtof-jeddah-page-data";
import { AZL_MAEI_PAGE_PATH } from "@/lib/seo/azl-maei-jeddah-page-data";
import { AZL_HARARI_PAGE_PATH } from "@/lib/seo/azl-harari-jeddah-page-data";
import { AZL_FOM_PAGE_PATH } from "@/lib/seo/azl-fom-jeddah-page-data";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    href: AZL_ASHTOF_PAGE_PATH,
    title: "عزل أسطح بجدة",
    summary: "عزل مائي وحراري للفلل والعمائر والمستودعات — فوم، بيتومين، معاينة وتقدير واضح.",
    badge: "صفحة مفصّلة",
    logo: true,
  },
  {
    href: AZL_MAEI_PAGE_PATH,
    title: "عزل مائي بجدة",
    summary: "بيتومين، سيكو بروف، وإيبوكسي للأسطح والخزانات والحمامات — معاينة مجانية وضمان 10 سنوات.",
    badge: "مائي",
    logo: true,
  },
  {
    href: AZL_HARARI_PAGE_PATH,
    title: "عزل حراري بجدة",
    summary: "فوم بولي يوريثان وعزل خزانات خارجي — خفّض فاتورة التكييف مع سماكة محسوبة وضمان.",
    badge: "حراري",
    logo: true,
  },
  {
    href: AZL_FOM_PAGE_PATH,
    title: "عزل فوم بجدة",
    summary: "رش بولي يوريثان حراري ومائي — معاينة، سماكة محسوبة، وطبقة حماية UV.",
    badge: "فوم",
    logo: true,
  },
] as const;

export function InsulationJeddahServiceCards({ className }: { className?: string }) {
  return (
    <section className={cn("mt-10 text-right", className)} aria-labelledby="insulation-services-grid-heading">
      <h2 id="insulation-services-grid-heading" className="text-2xl font-extrabold text-[#163d57] md:text-3xl">
        صفحات العزل في جدة
      </h2>
      <p className="mt-2 text-base leading-8 text-[#4a6677]">اختر الخدمة لفتح الدليل الكامل.</p>

      <div className="mt-6 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d7e8ee] bg-white shadow-[0_14px_32px_-26px_rgba(19,66,89,0.35)] transition hover:-translate-y-0.5 hover:border-[#1f7f8a]/40"
          >
            <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-white">
              <Image
                src={siteConfig.logo.full.src}
                alt={siteConfig.logo.full.alt}
                fill
                sizes="(max-width: 640px) 50vw, 320px"
                quality={90}
                className="object-contain p-6"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#ecf8f8] px-3 py-1 text-xs font-semibold text-[#1f7f8a]">
                <Layers className="size-3.5" aria-hidden />
                {card.badge}
              </span>
              <h3 className="text-lg font-bold text-[#163d57] group-hover:text-[#1f7f8a]">{card.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-[#4a6677]">{card.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1f7f8a] group-hover:underline">
                اقرأ الدليل
                <ArrowLeft className="size-4" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
