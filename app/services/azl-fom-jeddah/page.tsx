import type { Metadata } from "next";

import { AzlFomJeddahPageBody } from "@/components/services/azl-fom-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  AZL_FOM_PAGE_PATH,
  AZL_FOM_SEO,
  buildAzlFomFaqSchema,
  buildAzlFomServiceSchema,
} from "@/lib/seo/azl-fom-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: AZL_FOM_SEO.title,
    description: AZL_FOM_SEO.description,
    path: AZL_FOM_PAGE_PATH,
    keywords: [...AZL_FOM_SEO.keywords],
    ogTitle: AZL_FOM_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.azlFomPageHero.src,
        width: images.azlFomPageHero.width,
        height: images.azlFomPageHero.height,
        alt: images.azlFomPageHero.alt,
      },
    ],
  },
};

export default function AzlFomJeddahPage() {
  const faqSchema = buildAzlFomFaqSchema();
  const serviceSchema = buildAzlFomServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <AzlFomJeddahPageBody />
    </>
  );
}
