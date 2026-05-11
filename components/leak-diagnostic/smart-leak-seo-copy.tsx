import Link from "next/link";
import { ClipboardList, Headphones, ShieldCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "سؤالان عن الواقع",
    body: "مكان ظهور الرطوبة أو التقطير، ثم نوع مسكنك — لتقريب المصادر الشائعة في جدة.",
  },
  {
    icon: ShieldCheck,
    title: "خلاصة إرشادية",
    body: "قراءة أولية لما يحدث في حالات مشابهة؛ لا تغني عن الفحص الميداني عند الحاجة.",
  },
  {
    icon: Headphones,
    title: "تواصل عبر واتساب",
    body: "أرسل النتيجة لفريقنا لترتيب معاينة وفحص صوتي عندما تراه مناسباً.",
  },
] as const;

/** توضيح مقروء حول أداة التشخيص المبدئي — تصميم متناسق مع صفحة المُشخّص الذكي. */
export function SmartLeakSeoCopy() {
  return (
    <section
      className="mx-auto mt-14 max-w-5xl rounded-3xl border-0 bg-white p-7 text-right shadow-[0_18px_44px_-22px_rgba(19,66,89,0.28)] ring-1 ring-[#cfe8ee]/70 md:mt-16 md:p-10"
      aria-labelledby="smart-leak-seo-title"
    >
      <div className="mx-auto max-w-3xl text-center md:text-right">
        <h2 id="smart-leak-seo-title" className="text-2xl font-extrabold text-[#163d57] md:text-3xl">
          لماذا نبدأ بالمُشخّص قبل الزيارة؟
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#4a6677] md:text-base md:leading-8">
          يوفّر وقتك على الهاتف ويمنح الفني صورة أوضح قبل الوصول — لتكون الزيارة موجّهة بدل التخمين.
        </p>
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
        {steps.map(({ icon: Icon, title, body }, index) => (
          <li
            key={title}
            className="relative rounded-2xl border border-[#e8f4f6]/90 bg-gradient-to-br from-[#fafcfd] to-white p-6 shadow-[0_12px_32px_-20px_rgba(19,66,89,0.2)]"
          >
            <span
              className="absolute -top-3 right-4 flex size-8 items-center justify-center rounded-full bg-[#1f7f8a] text-sm font-bold text-white shadow-md"
              aria-hidden
            >
              {index + 1}
            </span>
            <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-[#ecf8f8] text-[#1f7f8a]">
              <Icon className="size-5" aria-hidden />
            </span>
            <h3 className="text-lg font-bold text-[#163d57]">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4a6677]">{body}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 max-w-3xl space-y-4 rounded-2xl border border-[#e8eef1] bg-white p-6 text-sm leading-relaxed text-[#4a6677] md:p-8 md:text-base md:leading-8">
        <p>
          يكمّل الفحص الحراري والصوتي المعاينة عند الاقتضاء؛ بعد الاختبار يمكنك المتابعة عبر واتساب لتحديد نوع الزيارة المناسبة وفق إجاباتك.
        </p>
        <p className="border-t border-[#d7e8ee]/80 pt-4">
          لمزيد من التفاصيل التقنية قبل الموعد، راجع صفحة{" "}
          <Link href="/leak-detection" className="font-semibold text-[#1f7f8a] underline-offset-4 hover:underline">
            كشف تسربات المياه
          </Link>{" "}
          أو{" "}
          <Link href="/contact" className="font-semibold text-[#1f7f8a] underline-offset-4 hover:underline">
            اتصل بنا
          </Link>{" "}
          لطلب توضيح يناسب حالتك.
        </p>
      </div>
    </section>
  );
}
