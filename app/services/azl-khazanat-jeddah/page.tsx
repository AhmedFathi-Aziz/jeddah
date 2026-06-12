import type { Metadata } from "next";

import { AzlKhazanatJeddahPageBody } from "@/components/services/azl-khazanat-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  AZL_KHAZANAT_PAGE_PATH,
  AZL_KHAZANAT_SEO,
  buildAzlKhazanatFaqSchema,
  buildAzlKhazanatServiceSchema,
} from "@/lib/seo/azl-khazanat-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: AZL_KHAZANAT_SEO.title,
    description: AZL_KHAZANAT_SEO.description,
    path: AZL_KHAZANAT_PAGE_PATH,
    keywords: [...AZL_KHAZANAT_SEO.keywords],
    ogTitle: AZL_KHAZANAT_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.azlKhazanatPageHero.src,
        width: images.azlKhazanatPageHero.width,
        height: images.azlKhazanatPageHero.height,
        alt: images.azlKhazanatPageHero.alt,
      },
    ],
  },
};

export default function AzlKhazanatJeddahPage() {
  const faqSchema = buildAzlKhazanatFaqSchema();
  const serviceSchema = buildAzlKhazanatServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <AzlKhazanatJeddahPageBody />
    </>
  );
}
