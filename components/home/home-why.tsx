import { Timer, BadgeCheck, Wrench } from "lucide-react";

const points = [
  {
    Icon: BadgeCheck,
    title: "أكثر من 500 مشروع في جدة",
    desc: "خبرة ميدانية في كشف التسربات وعزل الأسطح والخزانات — نعرف أنماط المباني الساحلية: رطوبة، ملوحة، وأمطار موسمية.",
  },
  {
    Icon: Wrench,
    title: "ضمان 10 سنوات على أعمال العزل",
    desc: "مواد معتمدة (فوم بولي يوريثان، بيتومين APP/SBS، إيبوكسي) مع تقارير فنية واضحة قبل أي تنفيذ.",
  },
  {
    Icon: Timer,
    title: "استجابة سريعة — 60 حيّاً",
    desc: "نرتّب الزيارات حسب الأولوية داخل جميع أحياء جدة، مع فريق فني متخصص — لا وسيط بدون حضور ميداني.",
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
