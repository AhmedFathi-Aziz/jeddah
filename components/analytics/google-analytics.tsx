"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

/**
 * يحمّل gtag.js ويعرّف `window.gtag` عند وجود `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
 * ‎lazyOnload‎ يؤجّل التنفيذ إلى بعد اكتمال التحميل — يقلّل ضغط الخيط الرئيسي ويحسّن ‎INP/LCP‎ في اختبارات مثل PageSpeed (مقابل تأخير طفيف لأول ‎page_view‎).
 */
export function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
      <Script id="ga4-gtag-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}
      </Script>
    </>
  );
}
