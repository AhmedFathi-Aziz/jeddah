import Link from "next/link";
import { AlertCircle } from "lucide-react";

export function HomeEmergencyFab({ phone }: { phone: string }) {
  return (
    <Link
      href={`tel:${phone}`}
      className="fab-bottom-raised fab-end fixed z-[60] flex h-11 items-center gap-2 rounded-full bg-[#1f7f8a] px-3.5 py-2.5 text-white shadow-lg transition-opacity hover:opacity-95 sm:h-auto sm:px-4 sm:py-3 md:transition-transform md:hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
      aria-label="اتصل لطوارئ التسربات والعزل"
    >
      <AlertCircle className="size-6 shrink-0" aria-hidden />
      <span className="hidden text-sm font-bold sm:inline">طوارئ الإصلاح</span>
    </Link>
  );
}
