import Link from "next/link";

/**
 * نص ثابت حول الأداة — يُعرَض في HTML من الخادم (SEO) بجانب كلمات مفتاحية متعلقة بالخدمة فقط.
 */
export function SmartLeakSeoCopy() {
  return (
    <section
      className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#d7e8ee] bg-white/90 p-6 text-right shadow-sm md:p-8"
      aria-labelledby="smart-leak-seo-title"
    >
      <h2 id="smart-leak-seo-title" className="text-lg font-bold text-[#163d57] md:text-xl">
        كيف يعمل المُشخّص الذكي؟
      </h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#4a6677] md:text-base">
        <p>
          يعتمد المُشخّص على أسئلة بسيطة عن مكان ظهور المشكلة ونوع العقار، ثم يعرض{" "}
          <strong className="font-semibold text-[#163d57]">تشخيصاً أولياً إرشادياً</strong> يشرح أين يكثر
          حدوث التسرب في حالات مشابهة في جدة. النتيجة ليست بديلاً عن المعاينة الميدانية، بل تساعدك على
          فهم الخطوة التالية قبل حجز{" "}
          <strong className="font-semibold text-[#163d57]">فحص إلكتروني</strong> (مثل الإيكوفون) مع فريق
          متخصص.
        </p>
        <p>
          في السوق المحلي تتنوع <strong className="font-semibold text-[#163d57]">أدوات كشف التسرب الحديثة بجدة</strong>{" "}
          بين الفحص الحراري والصوتي؛ نربطك عبر واتساب بفني يحدد لك نوع الزيارة المناسبة بعد إرسال إجاباتك
          من الاختبار.
        </p>
        <p>
          إذا كنت تبحث عن <strong className="font-semibold text-[#163d57]">عروض واضحة لكشف التسرب في جدة</strong>{" "}
          دون مفاجآت، راجع أيضاً صفحة{" "}
          <Link href="/leak-detection" className="font-medium text-[#1f7f8a] underline-offset-2 hover:underline">
            كشف تسربات المياه
          </Link>{" "}
          أو{" "}
          <Link href="/contact" className="font-medium text-[#1f7f8a] underline-offset-2 hover:underline">
            اتصل بنا
          </Link>{" "}
          لطلب تفصيل يتناسب مع حالتك.
        </p>
      </div>
    </section>
  );
}
