import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import type { FeaturedCoverageDistrict } from "@/lib/coverage-featured-districts";

type Props = {
  districts: FeaturedCoverageDistrict[];
};

export function CoverageFeaturedDistrictCards({ districts }: Props) {
  if (districts.length === 0) return null;

  return (
    <section className="mb-14" aria-labelledby="featured-districts-heading">
      <h2 id="featured-districts-heading" className="mb-2 text-2xl font-bold text-[#163d57] md:text-3xl">
        أحياء بأدلة موسّعة
      </h2>
      <p className="mb-6 max-w-3xl text-base leading-8 text-muted-foreground">
        صفحات محلية مفصّلة بمحتوى فريد لكل حي — مع صور وأسئلة شائعة وروابط للخدمات ذات الصلة.
      </p>

      <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {districts.map((district) => (
          <Link
            key={district.slug}
            href={district.href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#d7e8ee] bg-white shadow-[0_14px_32px_-26px_rgba(19,66,89,0.35)] transition hover:-translate-y-0.5 hover:border-[#1f7f8a]/40"
          >
            <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden bg-[#e8f2f5]">
              <Image
                src={district.coverImage}
                alt={district.coverAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                quality={80}
                loading="lazy"
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-1 flex-col p-5 text-right">
              <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#ecf8f8] px-3 py-1 text-xs font-semibold text-[#1f7f8a]">
                <MapPin className="size-3.5" aria-hidden />
                دليل محلي
              </span>
              <h3 className="text-lg font-bold text-[#163d57] group-hover:text-[#1f7f8a]">
                {district.district}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-[#4a6677] line-clamp-3">{district.summary}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#1f7f8a] group-hover:underline">
                اقرأ دليل الحي
                <ArrowLeft className="size-4" aria-hidden />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
