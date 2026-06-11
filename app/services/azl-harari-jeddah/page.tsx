import type { Metadata } from "next";

import { AzlHarariJeddahPageBody } from "@/components/services/azl-harari-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  AZL_HARARI_PAGE_PATH,
  AZL_HARARI_SEO,
  buildAzlHarariFaqSchema,
  buildAzlHarariServiceSchema,
} from "@/lib/seo/azl-harari-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: AZL_HARARI_SEO.title,
    description: AZL_HARARI_SEO.description,
    path: AZL_HARARI_PAGE_PATH,
    keywords: [...AZL_HARARI_SEO.keywords],
    ogTitle: AZL_HARARI_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.azlHarariPageHero.src,
        width: images.azlHarariPageHero.width,
        height: images.azlHarariPageHero.height,
        alt: images.azlHarariPageHero.alt,
      },
    ],
  },
};

export default function AzlHarariJeddahPage() {
  const faqSchema = buildAzlHarariFaqSchema();
  const serviceSchema = buildAzlHarariServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <AzlHarariJeddahPageBody />
    </>
  );
}
