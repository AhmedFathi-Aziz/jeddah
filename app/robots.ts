import type { MetadataRoute } from "next";

import { absUrl, siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/dashboard/", "/login/"],
      },
    ],
    sitemap: absUrl("/sitemap.xml"),
    host: new URL(siteConfig.url).host,
  };
}
