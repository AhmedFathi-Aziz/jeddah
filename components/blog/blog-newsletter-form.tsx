import { subscribeNewsletter } from "@/app/blog/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  compact?: boolean;
  /** نسخة مصغّرة للسايدبار داخل بوكس الفحص المجاني */
  size?: "default" | "sm";
};

export function BlogNewsletterForm({ compact = true, size = "default" }: Props) {
  const isSm = size === "sm";

  const formClass = isSm
    ? "flex flex-col gap-2"
    : compact
      ? "flex flex-row-reverse items-center gap-3"
      : "flex flex-col-reverse gap-3 md:flex-row-reverse md:flex-wrap md:justify-center";

  const inputClass = isSm
    ? "h-9 w-full rounded-lg border border-[#dce8ec] bg-white px-3 text-sm shadow-none placeholder:text-muted-foreground text-end"
    : compact
      ? "h-11 flex-1 rounded-xl border-0 bg-white px-4 text-xl shadow-[0_8px_20px_-16px_rgba(19,66,89,0.24)] placeholder:text-[#6a7f90] text-end md:text-start"
      : "min-h-12 max-w-md flex-1 border-0 shadow-sm text-end md:text-start";

  const buttonClass = isSm
    ? "h-9 w-full shrink-0 rounded-lg bg-[#197e8f] text-sm font-bold text-white shadow-sm hover:bg-[#176f7e]"
    : compact
      ? "h-11 shrink-0 rounded-xl bg-[#197e8f] px-6 text-3xl font-extrabold text-white shadow-sm hover:bg-[#176f7e]"
      : "min-h-12 shrink-0 bg-[#197e8f] font-bold text-white shadow-sm hover:bg-[#176f7e]";

  return (
    <form action={subscribeNewsletter} className={formClass} aria-label="نشرة بريدية">
      <Input name="email" type="email" dir="ltr" required autoComplete="email" placeholder="name@domain.com" className={inputClass} />
      <Button type="submit" size={isSm ? "sm" : "lg"} className={buttonClass}>
        اشترك
      </Button>
    </form>
  );
}
