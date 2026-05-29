import Link from "next/link";
import { Phone } from "lucide-react";

import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  phone: string;
  phoneDisplay?: string;
  className?: string;
  /** روابط داخلية سريعة أسفل أزرار التواصل */
  quickLinks?: { href: string; title: string }[];
};

const DEFAULT_QUICK_LINKS = [
  { href: "/leak-detection", title: "كشف بدون تكسير" },
  { href: "/smart-leak-diagnosis", title: "المشخّص الذكي" },
  { href: "/insulation", title: "عزل أسطح وخزانات" },
  { href: "/coverage", title: "أحياء جدة" },
] as const;

export function ArticleStickyCta({
  phone,
  phoneDisplay,
  className,
  quickLinks = [...DEFAULT_QUICK_LINKS],
}: Props) {
  const tel = `tel:${phone}`;
  const whatsappHref = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "مرحباً، قرأت مقالكم وأحتاج معاينة/كشف تسربات في جدة.",
  )}`;

  return (
    <aside
      className={cn(
        "rounded-xl border border-[#d9dee2] bg-white p-3 shadow-sm sm:p-4",
        className,
      )}
      aria-label="طلب معاينة مجانية"
    >
      <h2 className="text-center text-base font-extrabold leading-snug text-[#163d57]">
        اكتشفت تسرباً أو رطوبة؟
      </h2>
      <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
        فريق متخصص — كشف بدون تكسير ورد سريع.
      </p>
      <div className="mt-4 space-y-2">
        <Link
          href={tel}
          className={cn(
            buttonVariants({ size: "default" }),
            "flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#197e8f] text-sm font-bold text-white shadow-sm hover:bg-[#176f7e]",
          )}
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          {phoneDisplay ? `اتصل: ${phoneDisplay}` : "اتصل الآن"}
        </Link>
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "default" }),
            "flex h-10 w-full items-center justify-center gap-2 rounded-lg border-[#25D366]/50 bg-[#25D366] text-sm font-bold text-white shadow-sm hover:bg-[#20bd5a]",
          )}
        >
          <WhatsAppLogo className="size-4 shrink-0 text-white" />
          واتساب
        </Link>
      </div>

      <nav className="mt-4 border-t border-[#e8edf0] pt-3" aria-label="روابط خدمات سريعة">
        <p className="mb-2 text-center text-[11px] font-semibold text-[#5a7d8f]">صفحات ذات صلة</p>
        <ul className="flex flex-wrap justify-center gap-1.5">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block rounded-md bg-[#eef7f9] px-2 py-1 text-[11px] font-semibold text-[#1b5a73] hover:bg-[#dceef2] hover:underline"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
