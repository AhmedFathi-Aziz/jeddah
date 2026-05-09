import type { MetadataRoute } from "next";

import { absUrl } from "@/lib/site-config";
import { listPublishedArticles } from "@/lib/articles/repository";
import { getAllCoverageCityDistrictParams } from "@/lib/coverage-data";
import { insulationServices } from "@/lib/insulation-services";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await listPublishedArticles();

  const base: MetadataRoute.Sitemap = [
    {
      url: absUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absUrl("/services"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absUrl("/leak-detection"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absUrl("/smart-leak-diagnosis"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.88,
    },
    {
      url: absUrl("/insulation"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absUrl("/coverage"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  const articles: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absUrl(`/blog/${p.slug}`),
    lastModified: p.createdAt,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const districts: MetadataRoute.Sitemap = getAllCoverageCityDistrictParams().map(({ city, district }) => ({
    url: absUrl(`/coverage/${city}/${district}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.72,
  }));

  const insulationDetails: MetadataRoute.Sitemap = insulationServices.map((service) => ({
    url: absUrl(`/insulation-services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...base, ...articles, ...districts, ...insulationDetails];
}
