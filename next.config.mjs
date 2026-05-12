import path from "node:path";
import { createRequire } from "node:module";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** يُضبط فقط من ‎npm run build:static‎ — لا تضع نفس الاسم في ‎.env.local‎ حتى لا يتحول ‎npm run build‎ إلى تصدير ثابت بالخطأ */
const staticExport = process.env.TASARUBAT_STATIC_EXPORT === "1";

if (process.env.NODE_ENV === "development" && !staticExport) {
  void initOpenNextCloudflareForDev();
}

const require = createRequire(import.meta.url);

/** إعادة توجيه 301 من المسار القديم `/coverage/[id]` إلى `/coverage/jeddah/[id]` (SEO). */
function legacyCoverageRedirects() {
  try {
    const data = require("./data/coverage-locations.json");
    const jeddah = data.cities?.find((c) => c.slug === "jeddah");
    if (!jeddah?.districts?.length) return [];
    return jeddah.districts.map((d) => ({
      source: `/coverage/${d.slug}`,
      destination: `/coverage/jeddah/${d.slug}`,
      permanent: true,
    }));
  } catch {
    return [];
  }
}

/** مسار نسبي — يُضبط فقط من ‎npm run deploy:cf‎ (‎opennext-staging‎) */
const cfStaging = process.env.OPEN_NEXT_BUILD_OUTPUT?.trim();

const sharedRemotePatterns = [
  {
    protocol: "https",
    hostname: "lh3.googleusercontent.com",
    pathname: "/aida-public/**",
  },
  {
    protocol: "https",
    hostname: "placehold.co",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "res.cloudinary.com",
    pathname: "/**",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(staticExport ? { output: "export" } : {}),
  ...(cfStaging && !staticExport
    ? {
        distDir: path.join(cfStaging, ".next"),
        typescript: { ignoreBuildErrors: true },
        eslint: { ignoreDuringBuilds: true },
      }
    : {}),
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error"] }
        : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: staticExport
    ? {
        unoptimized: true,
        dangerouslyAllowSVG: false,
        remotePatterns: sharedRemotePatterns,
      }
    : {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [128, 256, 384],
        minimumCacheTTL: 86400,
        qualities: [70, 72, 75, 76, 78, 80, 90],
        dangerouslyAllowSVG: false,
        remotePatterns: sharedRemotePatterns,
      },
  ...(staticExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [{ key: "Content-Language", value: "ar-SA" }],
            },
            {
              source: "/blog/:slug*",
              headers: [
                {
                  key: "Cache-Control",
                  value: "public, s-maxage=900, stale-while-revalidate=86400",
                },
              ],
            },
          ];
        },
      }),
  ...(!staticExport
    ? {
        async redirects() {
          return legacyCoverageRedirects();
        },
      }
    : {}),
};

export default nextConfig;
