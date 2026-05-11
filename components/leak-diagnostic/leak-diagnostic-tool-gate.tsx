"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LeakDiagnosticTool = dynamic(
  () => import("./leak-diagnostic-tool").then((m) => m.LeakDiagnosticTool),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[22rem] animate-pulse rounded-2xl bg-gradient-to-br from-[#ecf8f8]/90 via-[#f5fbfc] to-[#eef6f8]/80"
        aria-hidden
      />
    ),
  },
);

/**
 * يحمّل مكوّن الاختبار فقط عند اقترابه من منطقة العرض — يخفّض حجم الـ JS الأولي ويحسن Lighthouse.
 */
export function LeakDiagnosticToolGate() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin: "280px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sentinelRef} className="min-h-[22rem]">
      {shouldLoad ? (
        <LeakDiagnosticTool />
      ) : (
        <div
          className="flex min-h-[22rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#c5e3ea] bg-gradient-to-b from-[#f8fcfd] to-[#eef8fa]/90 p-8 text-center shadow-inner"
          role="status"
        >
          <span className="text-sm font-semibold text-[#163d57]">جاري تجهيز الاختبار عند وصولك لهنا…</span>
          <span className="max-w-sm text-xs leading-relaxed text-[#5a7588]">
            نحمّل الأداة عند ظهورها في الشاشة لتبقى الصفحة خفيفة وسريعة.
          </span>
        </div>
      )}
    </div>
  );
}
