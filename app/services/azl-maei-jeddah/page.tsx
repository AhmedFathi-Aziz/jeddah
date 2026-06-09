import type { Metadata } from "next";

import { AzlMaeiJeddahPageBody } from "@/components/services/azl-maei-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  AZL_MAEI_PAGE_PATH,
  AZL_MAEI_SEO,
  buildAzlMaeiFaqSchema,
  buildAzlMaeiServiceSchema,
} from "@/lib/seo/azl-maei-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: AZL_MAEI_SEO.title,
    description: AZL_MAEI_SEO.description,
    path: AZL_MAEI_PAGE_PATH,
    keywords: [...AZL_MAEI_SEO.keywords],
    ogTitle: AZL_MAEI_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.azlMaeiPageHero.src,
        width: images.azlMaeiPageHero.width,
        height: images.azlMaeiPageHero.height,
        alt: images.azlMaeiPageHero.alt,
      },
    ],
  },
};

export default function AzlMaeiJeddahPage() {
  const faqSchema = buildAzlMaeiFaqSchema();
  const serviceSchema = buildAzlMaeiServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <AzlMaeiJeddahPageBody />
    </>
  );
}
