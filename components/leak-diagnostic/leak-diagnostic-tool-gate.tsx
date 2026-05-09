"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const LeakDiagnosticTool = dynamic(
  () => import("./leak-diagnostic-tool").then((m) => m.LeakDiagnosticTool),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[22rem] animate-pulse rounded-2xl bg-gradient-to-br from-muted/50 to-muted/20"
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
          className="flex min-h-[22rem] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d7e8ee] bg-[#f8fbfc]/80 p-8 text-center"
          role="status"
        >
          <span className="text-sm font-medium text-[#4a6677]">جاري تجهيز الأداة عند التمرير…</span>
          <span className="text-xs text-muted-foreground">لتحسين سرعة الصفحة يُحمّل الاختبار عند ظهوره في الشاشة.</span>
        </div>
      )}
    </div>
  );
}
