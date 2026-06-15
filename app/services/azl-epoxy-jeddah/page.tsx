import type { Metadata } from "next";

import { AzlEpoxyJeddahPageBody } from "@/components/services/azl-epoxy-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  AZL_EPOXY_PAGE_PATH,
  AZL_EPOXY_SEO,
  buildAzlEpoxyFaqSchema,
  buildAzlEpoxyServiceSchema,
} from "@/lib/seo/azl-epoxy-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: AZL_EPOXY_SEO.title,
    description: AZL_EPOXY_SEO.description,
    path: AZL_EPOXY_PAGE_PATH,
    keywords: [...AZL_EPOXY_SEO.keywords],
    ogTitle: AZL_EPOXY_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.azlEpoxyPageHero.src,
        width: images.azlEpoxyPageHero.width,
        height: images.azlEpoxyPageHero.height,
        alt: images.azlEpoxyPageHero.alt,
      },
    ],
  },
};

export default function AzlEpoxyJeddahPage() {
  const faqSchema = buildAzlEpoxyFaqSchema();
  const serviceSchema = buildAzlEpoxyServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <AzlEpoxyJeddahPageBody />
    </>
  );
}
