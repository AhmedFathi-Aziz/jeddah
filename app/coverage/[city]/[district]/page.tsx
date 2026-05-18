import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CoverageDistrictPageContent } from "@/components/coverage/coverage-district-page-content";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { getAllCoverageCityDistrictParams, getDistrictByCityAndSlug } from "@/lib/coverage-data";
import {
  buildCoverageDistrictJsonLd,
  buildCoverageDistrictMetadata,
} from "@/lib/seo/coverage-district-seo";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

type Props = { params: Promise<{ city: string; district: string }> };

export async function generateStaticParams() {
  return getAllCoverageCityDistrictParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, district } = await params;
  const row = getDistrictByCityAndSlug(city, district);
  if (!row) return { title: "المنطقة غير موجودة" };

  return buildCoverageDistrictMetadata(row, city, district);
}

export default async function CoverageCityDistrictPage({ params }: Props) {
  const { city, district } = await params;
  const row = getDistrictByCityAndSlug(city, district);
  if (!row) notFound();

  const path = `/coverage/${city}/${district}`;
  const jsonLd = buildCoverageDistrictJsonLd(row, city, district);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 text-right">
      <CoverageDistrictPageContent row={row} />

      <RelatedServicesSection currentPath={path} heading="خدمات وروابط مرتبطة بالحي" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
    </main>
  );
}
