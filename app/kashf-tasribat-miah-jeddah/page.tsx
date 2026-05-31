import type { Metadata } from "next";

import { KashfTasribatJeddahPageBody } from "@/components/services/kashf-tasribat-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  buildKashfJeddahFaqSchema,
  buildKashfJeddahServiceSchema,
  KASHF_JEDDAH_PAGE_PATH,
  KASHF_JEDDAH_SEO,
} from "@/lib/seo/kashf-tasribat-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: KASHF_JEDDAH_SEO.title,
    description: KASHF_JEDDAH_SEO.description,
    path: KASHF_JEDDAH_PAGE_PATH,
    keywords: [...KASHF_JEDDAH_SEO.keywords],
    ogTitle: KASHF_JEDDAH_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.kashfJeddahPageHero.src,
        width: images.kashfJeddahPageHero.width,
        height: images.kashfJeddahPageHero.height,
        alt: images.kashfJeddahPageHero.alt,
      },
    ],
  },
};

export default function KashfTasribatMiahJeddahPage() {
  const faqSchema = buildKashfJeddahFaqSchema();
  const serviceSchema = buildKashfJeddahServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <KashfTasribatJeddahPageBody />
    </>
  );
}
