import type { Metadata } from "next";

import { AzlHamamatJeddahPageBody } from "@/components/services/azl-hamamat-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  AZL_HAMAMAT_PAGE_PATH,
  AZL_HAMAMAT_SEO,
  buildAzlHamamatFaqSchema,
  buildAzlHamamatServiceSchema,
} from "@/lib/seo/azl-hamamat-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: AZL_HAMAMAT_SEO.title,
    description: AZL_HAMAMAT_SEO.description,
    path: AZL_HAMAMAT_PAGE_PATH,
    keywords: [...AZL_HAMAMAT_SEO.keywords],
    ogTitle: AZL_HAMAMAT_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.azlHamamatPageHero.src,
        width: images.azlHamamatPageHero.width,
        height: images.azlHamamatPageHero.height,
        alt: images.azlHamamatPageHero.alt,
      },
    ],
  },
};

export default function AzlHamamatJeddahPage() {
  const faqSchema = buildAzlHamamatFaqSchema();
  const serviceSchema = buildAzlHamamatServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <AzlHamamatJeddahPageBody />
    </>
  );
}
