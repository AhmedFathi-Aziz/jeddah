import { Timer, BadgeCheck, Wrench } from "lucide-react";

const points = [
  {
    Icon: BadgeCheck,
    title: "خبرة محلية في كشف تسربات المياه بجدة",
    desc: "نعالج مشاكل التسرب وفق طبيعة مباني جدة الساحلية، مع اختيار طريقة التشخيص والعزل المناسبة لكل حالة.",
  },
  {
    Icon: Wrench,
    title: "فحص دقيق وتقارير فنية واضحة",
    desc: "نوفر معاينة دقيقة مع توثيق فني يساعدك على اتخاذ قرار الإصلاح أو العزل بثقة قبل التنفيذ.",
  },
  {
    Icon: Timer,
    title: "سرعة استجابة داخل أحياء جدة",
    desc: "نرتب الزيارات حسب الأولوية ونلتزم بالمواعيد لتقليل الضرر الناتج عن تسرب المياه في المنازل والمنشآت.",
  },
];

export function HomeWhy() {
  return (
    <section className="bg-muted/50 py-20" aria-labelledby="why-heading">
      <div className="mx-auto max-w-5xl px-6">
        <div className="space-y-10 text-right">
          <header className="space-y-4">
            <h2 id="why-heading" className="text-balance text-3xl font-bold text-primary md:text-4xl">
              لماذا تختار فريقنا في جدة؟
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              إذا كنت تبحث عن <strong>شركة كشف تسربات المياه في جدة</strong> تقدم فحصًا دقيقًا، تقريرًا واضحًا،
              وحلول عزل مائي وحراري عملية، فنحن نوفر خدمة متخصصة تركّز على حل السبب الجذري للمشكلة وليس الأعراض فقط.
            </p>
          </header>

          <ul className="grid gap-6 md:grid-cols-2">
            {points.map(({ Icon, title, desc }) => (
              <li key={title} className="flex flex-row-reverse gap-4 rounded-2xl border bg-card p-5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full border bg-card shadow-sm">
                  <Icon className="size-6 text-primary" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">{title}</h3>
                  <p className="mt-1 text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
