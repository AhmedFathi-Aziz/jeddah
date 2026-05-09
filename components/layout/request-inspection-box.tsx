import Link from "next/link";
import { Phone } from "lucide-react";

import { BlogNewsletterForm } from "@/components/blog/blog-newsletter-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  phone: string;
  className?: string;
};

/** بوكس دعوة للفحص المجاني — مقاس مضغوط مناسب للسايدبار */
export function RequestInspectionBox({ phone, className }: Props) {
  const tel = `tel:${phone}`;

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-[#e8f0f3]/80 bg-gradient-to-b from-[#fbfdfe] to-white p-4 shadow-[0_10px_28px_-18px_rgba(19,66,89,0.32)] ring-0 md:p-5",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-l from-[#2f7f86] via-[#197e8f] to-[#0b4c86]"
        aria-hidden
      />
      <div className="relative pt-1">
        <p className="text-center text-[11px] font-semibold text-[#5a7285]">استجابة سريعة</p>
        <h2 className="mt-1.5 text-center text-lg font-extrabold leading-snug text-[#163d57] md:text-xl">
          اطلب فحصاً <span className="text-[#197e8f]">مجانياً</span>
        </h2>
        <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground md:text-[13px]">
          تواصل معنا لتحديد موعد معاينة مناسب في أسرع وقت.
        </p>
        <Link
          href={tel}
          className={cn(
            buttonVariants({ size: "default" }),
            "mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#197e8f] text-sm font-bold text-white shadow-sm hover:bg-[#176f7e]",
          )}
        >
          <Phone className="size-4 shrink-0" aria-hidden />
          اتصل الآن
        </Link>
        <div className="mt-4 border-t border-[#e4eef1] pt-4">
          <p className="mb-2 text-center text-[11px] font-semibold text-[#163d57]">اشترك لتصلك النصائح</p>
          <BlogNewsletterForm compact size="sm" />
        </div>
      </div>
    </section>
  );
}
