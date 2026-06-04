import type { Metadata } from "next";

import { KashfMasabihJeddahPageBody } from "@/components/services/kashf-masabih-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  buildKashfMasabihFaqSchema,
  buildKashfMasabihServiceSchema,
  KASHF_MASABIH_PAGE_PATH,
  KASHF_MASABIH_SEO,
} from "@/lib/seo/kashf-masabih-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: KASHF_MASABIH_SEO.title,
    description: KASHF_MASABIH_SEO.description,
    path: KASHF_MASABIH_PAGE_PATH,
    keywords: [...KASHF_MASABIH_SEO.keywords],
    ogTitle: KASHF_MASABIH_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.kashfMasabihPageHero.src,
        width: images.kashfMasabihPageHero.width,
        height: images.kashfMasabihPageHero.height,
        alt: images.kashfMasabihPageHero.alt,
      },
    ],
  },
};

export default function KashfTasribatAlMasabihJeddahPage() {
  const faqSchema = buildKashfMasabihFaqSchema();
  const serviceSchema = buildKashfMasabihServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <KashfMasabihJeddahPageBody />
    </>
  );
}
