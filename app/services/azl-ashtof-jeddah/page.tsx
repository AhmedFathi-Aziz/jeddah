import type { Metadata } from "next";

import { AzlAshtofJeddahPageBody } from "@/components/services/azl-ashtof-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  AZL_ASHTOF_PAGE_PATH,
  AZL_ASHTOF_SEO,
  buildAzlAshtofFaqSchema,
  buildAzlAshtofServiceSchema,
} from "@/lib/seo/azl-ashtof-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: AZL_ASHTOF_SEO.title,
    description: AZL_ASHTOF_SEO.description,
    path: AZL_ASHTOF_PAGE_PATH,
    keywords: [...AZL_ASHTOF_SEO.keywords],
    ogTitle: AZL_ASHTOF_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.azlAshtofPageHero.src,
        width: images.azlAshtofPageHero.width,
        height: images.azlAshtofPageHero.height,
        alt: images.azlAshtofPageHero.alt,
      },
    ],
  },
};

export default function AzlAshtofJeddahPage() {
  const faqSchema = buildAzlAshtofFaqSchema();
  const serviceSchema = buildAzlAshtofServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <AzlAshtofJeddahPageBody />
    </>
  );
}
