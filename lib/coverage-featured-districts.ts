import fs from "node:fs";
import path from "node:path";

import { getCity } from "@/lib/coverage-data";
import { getDistrictMarkdownBundle } from "@/lib/seo/coverage-district-markdown";

const CONTENT_ROOT = path.join(process.cwd(), "content", "coverage");

export type FeaturedCoverageDistrict = {
  slug: string;
  district: string;
  label: string;
  href: string;
  coverImage: string;
  coverAlt: string;
  summary: string;
};

/** أحياء لها محتوى Markdown موسّع + صورة غلاف — تُعرض في بطاقات صفحة /coverage */
export function listFeaturedCoverageDistricts(citySlug: string): FeaturedCoverageDistrict[] {
  const cityDir = path.join(CONTENT_ROOT, citySlug);
  if (!fs.existsSync(cityDir)) return [];

  const city = getCity(citySlug);
  if (!city) return [];

  const featured: FeaturedCoverageDistrict[] = [];

  for (const file of fs.readdirSync(cityDir)) {
    if (!file.endsWith(".md")) continue;
    const slug = file.replace(/\.md$/, "");
    const bundle = getDistrictMarkdownBundle(citySlug, slug);
    if (!bundle?.coverImage) continue;

    const row = city.districts.find((d) => d.slug === slug);
    if (!row) continue;

    const coverAlt =
      bundle.coverAlt ??
      bundle.imageAlts?.[0] ??
      `كشف تسربات المياه في ${row.district} جدة`;

    featured.push({
      slug,
      district: bundle.district ?? row.district,
      label: row.label,
      href: `/coverage/${citySlug}/${slug}`,
      coverImage: bundle.coverImage,
      coverAlt,
      summary:
        bundle.metaDescription ??
        `دليل كشف تسربات المياه والعزل في ${row.district} — معاينة وفحص بدون تكسير.`,
    });
  }

  return featured;
}
