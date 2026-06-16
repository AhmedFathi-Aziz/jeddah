import type { Metadata } from "next";

import { isVisualCoverPlaceholder } from "@/lib/articles/cover-display";
import { images } from "@/lib/images";
import type { OgImageDescriptor } from "@/lib/seo/page-og-images";
import { absImageSrc } from "@/lib/site-config";

export function toAbsoluteOgImage(image: OgImageDescriptor) {
  return {
    url: absImageSrc(image.url),
    width: image.width,
    height: image.height,
    alt: image.alt,
  };
}

export function buildSocialMetadataFields(input: {
  title: string;
  description: string;
  ogImages: OgImageDescriptor[];
}): Pick<Metadata, "openGraph" | "twitter" | "robots"> {
  const absoluteImages = input.ogImages.map(toAbsoluteOgImage);
  const primaryImageUrl = absoluteImages[0]?.url;

  return {
    openGraph: {
      type: "article",
      title: input.title,
      description: input.description,
      images: absoluteImages,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...(primaryImageUrl ? { images: [primaryImageUrl] } : {}),
    },
    robots: { index: true, follow: true },
  };
}

export function resolveArticleCoverOgImage(cover: {
  src: string;
  width: number;
  height: number;
  alt: string;
}): OgImageDescriptor {
  if (isVisualCoverPlaceholder(cover.src)) {
    return {
      url: images.blogStains.src,
      width: images.blogStains.width,
      height: images.blogStains.height,
      alt: images.blogStains.alt,
    };
  }
  return {
    url: cover.src,
    width: cover.width,
    height: cover.height,
    alt: cover.alt,
  };
}
