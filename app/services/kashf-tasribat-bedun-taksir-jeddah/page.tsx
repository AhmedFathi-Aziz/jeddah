import type { Metadata } from "next";

import { KashfBedunTaksirJeddahPageBody } from "@/components/services/kashf-bedun-taksir-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  buildKashfBedunTaksirFaqSchema,
  buildKashfBedunTaksirServiceSchema,
  KASHF_BEDUN_TAKSIR_PAGE_PATH,
  KASHF_BEDUN_TAKSIR_SEO,
} from "@/lib/seo/kashf-bedun-taksir-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: KASHF_BEDUN_TAKSIR_SEO.title,
    description: KASHF_BEDUN_TAKSIR_SEO.description,
    path: KASHF_BEDUN_TAKSIR_PAGE_PATH,
    keywords: [...KASHF_BEDUN_TAKSIR_SEO.keywords],
    ogTitle: KASHF_BEDUN_TAKSIR_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.kashfBedunTaksirPageHero.src,
        width: images.kashfBedunTaksirPageHero.width,
        height: images.kashfBedunTaksirPageHero.height,
        alt: images.kashfBedunTaksirPageHero.alt,
      },
    ],
  },
};

export default function KashfTasribatBedunTaksirJeddahPage() {
  const faqSchema = buildKashfBedunTaksirFaqSchema();
  const serviceSchema = buildKashfBedunTaksirServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <KashfBedunTaksirJeddahPageBody />
    </>
  );
}
