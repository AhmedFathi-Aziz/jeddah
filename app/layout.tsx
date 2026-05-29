import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";

import "./globals.css";

import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { FloatingWhatsAppButton } from "@/components/layout/floating-whatsapp-button";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { GlobalJsonLd } from "@/components/seo/global-json-ld";
import { images } from "@/lib/images";
import { ALL_SITE_KEYWORDS, PRIMARY_KEYWORDS } from "@/lib/seo/keyword-clusters";
import { absUrl, siteConfig } from "@/lib/site-config";

/** خط عربي مُحمَّل عبر ‎next/font‎ (بدون ‎@import‎) لتقليل حجز النص وتحسين CLS مقارنةً بخطوط الطرف الثالث. */
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#003f87",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "كشف تسربات المياه جدة | عزل أسطح وخزانات وفوم — شركة متخصصة | جدة للتسربات والعزل",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "المرجع الأول في جدة لكشف تسربات المياه بدون تكسير والعزل المائي والحراري: أسطح، خزانات، فوم، حمامات، تقارير معتمدة، 60 حيّاً، وموسوعة كاملة للبحث عن أي خدمة تخص التسربات والعزل.",
  keywords: [...PRIMARY_KEYWORDS, ...ALL_SITE_KEYWORDS],
  alternates: {
    canonical: absUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale.replace("_", "-"),
    url: absUrl("/"),
    siteName: siteConfig.name,
    title: "كشف تسربات المياه والعزل بجدة — جدة للتسربات والعزل",
    description:
      "خدمات كشف تسربات المياه إلكترونياً بدون تكسير، عزل الأسطح والخزانات والفوم في جدة.",
    images: [
      {
        url: images.hero.src,
        width: images.hero.width,
        height: images.hero.height,
        alt: images.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "كشف تسربات المياه والعزل بجدة",
    description:
      "أجهزة صوتية وحرارية بدون تكسير، عزل أسطح وخزانات وفوم في جدة.",
    images: [images.hero.src],
  },
  robots: { index: true, follow: true },
  authors: [{ name: siteConfig.name }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar-SA" dir="rtl" className={`${cairo.variable}`} suppressHydrationWarning>
      <head>
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="JqMAOEQnuwcO52rcELlsHQ"
          async
        />
        <link rel="dns-prefetch" href="//lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href={absUrl("/sitemap.xml")} />
      </head>
      <body lang="ar-SA" dir="rtl" className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased text-start">
        <GoogleAnalytics />
        <GlobalJsonLd />
        <SiteHeader phone={siteConfig.phone} />
        <div className="relative min-h-0 min-w-0 flex-1 overflow-x-hidden">{children}</div>
        <FloatingWhatsAppButton phone={siteConfig.phone} />
        <SiteFooter phone={siteConfig.phone} phoneDisplay={siteConfig.phoneDisplay} />
      </body>
    </html>
  );
}
