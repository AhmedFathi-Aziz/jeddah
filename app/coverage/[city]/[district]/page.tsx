import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CoverageDistrictPageContent } from "@/components/coverage/coverage-district-page-content";
import { RelatedServicesSection } from "@/components/layout/related-services-section";
import { getAllCoverageCityDistrictParams, getDistrictByCityAndSlug } from "@/lib/coverage-data";
import { SCHEMA_LOCAL_BUSINESS_ID } from "@/lib/seo/schema-ids";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";
import { absUrl, siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ city: string; district: string }> };

export async function generateStaticParams() {
  return getAllCoverageCityDistrictParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, district } = await params;
  const row = getDistrictByCityAndSlug(city, district);
  if (!row) return { title: "المنطقة غير موجودة" };

  const path = absUrl(`/coverage/${city}/${district}`);
  return {
    title: row.label,
    description: `صفحة خدمات ${row.district} في ${row.city.nameAr}: كشف تسربات المياه، العزل المائي والحراري، وإرشادات الصيانة.`,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${row.label} | ${siteConfig.name}`,
      description: `تفاصيل خدماتنا في ${row.district} بـ${row.city.nameAr} مع نصائح لتشخيص التسربات واختيار العزل المناسب.`,
      locale: siteConfig.locale.replace("_", "-"),
    },
  };
}

export default async function CoverageCityDistrictPage({ params }: Props) {
  const { city, district } = await params;
  const row = getDistrictByCityAndSlug(city, district);
  if (!row) notFound();

  const path = `/coverage/${city}/${district}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: row.label,
    url: absUrl(path),
    areaServed: {
      "@type": "Place",
      name: `${row.district}، ${row.city.nameAr}`,
    },
    provider: { "@id": SCHEMA_LOCAL_BUSINESS_ID },
  };

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-10 text-right">
      <CoverageDistrictPageContent row={row} />

      <RelatedServicesSection currentPath={path} heading="خدمات وروابط مرتبطة بالحي" />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
    </main>
  );
}
