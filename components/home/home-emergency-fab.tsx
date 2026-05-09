import Link from "next/link";
import { AlertCircle } from "lucide-react";

export function HomeEmergencyFab({ phone }: { phone: string }) {
  return (
    <Link
      href={`tel:${phone}`}
      className="fixed bottom-6 end-6 z-[60] flex items-center gap-2 rounded-full bg-[#1f7f8a] px-4 py-3 text-white shadow-lg transition-opacity hover:opacity-95 md:transition-transform md:hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      aria-label="اتصل لطوارئ التسربات والعزل"
    >
      <AlertCircle className="size-6 shrink-0" aria-hidden />
      <span className="hidden text-sm font-bold sm:inline">طوارئ الإصلاح</span>
    </Link>
  );
}
