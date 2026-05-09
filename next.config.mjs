import path from "node:path";
import { createRequire } from "node:module";

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

if (process.env.NODE_ENV === "development") {
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

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(cfStaging
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
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [128, 256, 384],
    minimumCacheTTL: 86400,
    /** يجب أن تتطابق مع أي `quality={n}` على `<Image />` */
    qualities: [70, 72, 75, 76, 78, 80, 90],
    dangerouslyAllowSVG: false,
    remotePatterns: [
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
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Language", value: "ar-SA" }],
      },
    ];
  },
  async redirects() {
    return legacyCoverageRedirects();
  },
};

export default nextConfig;
