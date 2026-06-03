import type { Metadata } from "next";

import { KashfKhazanatJeddahPageBody } from "@/components/services/kashf-khazanat-jeddah-page-body";
import { images } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import {
  buildKashfKhazanatFaqSchema,
  buildKashfKhazanatServiceSchema,
  KASHF_KHAZANAT_PAGE_PATH,
  KASHF_KHAZANAT_SEO,
} from "@/lib/seo/kashf-khazanat-jeddah-page-data";
import { serializeJsonLd } from "@/lib/seo/serialize-json-ld";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: KASHF_KHAZANAT_SEO.title,
    description: KASHF_KHAZANAT_SEO.description,
    path: KASHF_KHAZANAT_PAGE_PATH,
    keywords: [...KASHF_KHAZANAT_SEO.keywords],
    ogTitle: KASHF_KHAZANAT_SEO.ogTitle,
  }),
  openGraph: {
    images: [
      {
        url: images.kashfKhazanatPageHero.src,
        width: images.kashfKhazanatPageHero.width,
        height: images.kashfKhazanatPageHero.height,
        alt: images.kashfKhazanatPageHero.alt,
      },
    ],
  },
};

export default function KashfTasribatAlKhazanatJeddahPage() {
  const faqSchema = buildKashfKhazanatFaqSchema();
  const serviceSchema = buildKashfKhazanatServiceSchema();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }} />
      <KashfKhazanatJeddahPageBody />
    </>
  );
}
