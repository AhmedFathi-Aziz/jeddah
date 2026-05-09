import type { Metadata } from "next";

/** يضمن أن `cookies()` وقراءة السر تعمل في طلب ديناميكي على Workers */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "لوحة المقالات",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[60vh]">{children}</div>;
}
