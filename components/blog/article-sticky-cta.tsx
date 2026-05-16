import Link from "next/link";
import { Phone, ShieldCheck } from "lucide-react";

import { WhatsAppLogo } from "@/components/icons/whatsapp-logo";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  phone: string;
  phoneDisplay?: string;
  className?: string;
};

export function ArticleStickyCta({ phone, phoneDisplay, className }: Props) {
  const tel = `tel:${phone}`;
  const whatsappHref = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "مرحباً، قرأت مقالكم وأحتاج معاينة/كشف تسربات في جدة.",
  )}`;

  return (
    <aside
      className={cn(
        "rounded-xl border border-[#d9dee2] bg-white p-4 shadow-sm",
        className,
      )}
      aria-label="طلب معاينة مجانية"
    >
      <div className="flex items-center justify-center gap-2 text-[#197e8f]">
        <ShieldCheck className="size-4 shrink-0" aria-hidden />
        <p className="text-xs font-semibold">معاينة مجانية في جدة</p>
      </div>
      <h2 className="mt-2 text-center text-base font-extrabold leading-snug text-[#163d57]">
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
    </aside>
  );
}
