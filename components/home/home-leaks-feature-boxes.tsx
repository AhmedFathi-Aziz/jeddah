import { FileBadge2, ScanSearch, Wrench } from "lucide-react";

import { images } from "@/lib/images";

const leakCards = [
  {
    title: "كشف دقيق",
    summary:
      "أجهزة حساسة ومسار غير تدميري لتتبع نقطة التسرب وتقليل الضرر والفوضى أثناء التشخيص.",
    image: images.leakLocalTools02,
    Icon: ScanSearch,
    cta: "تشخيص مبدئي سريع",
  },
  {
    title: "تقارير شركة المياه",
    summary:
      "توثيق معتمد يدعم إجراءاتكم مع شركة المياه ويوضح نتائج الفحص والملاحظات الفنية.",
    image: images.leakLocalTools03,
    Icon: FileBadge2,
    cta: "تقرير واضح ومعتمد",
  },
  {
    title: "علاج وإصلاح",
    summary:
      "تنفيذ الإصلاح على السبب الحقيقي وليس العرض فقط، مع تتبع مراحل العمل حتى إغلاق المشكلة.",
    image: images.leakLocalRepair01,
    Icon: Wrench,
    cta: "إصلاح فعلي مستدام",
  },
] as const;

export function HomeLeaksFeatureBoxes() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-14" aria-labelledby="leaks-feature-boxes-heading">
      <header className="mb-8 text-right">
        <h3 id="leaks-feature-boxes-heading" className="text-2xl font-extrabold text-[#173f55] md:text-3xl">
          مراحل خدمة التسربات
        </h3>
        <p className="mt-2 text-sm leading-7 text-muted-foreground md:text-base">
          ثلاث خطوات واضحة من التشخيص وحتى الإصلاح النهائي، بنفس جودة التنفيذ في كل مرحلة.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {leakCards.map((card) => (
          <article
            key={card.title}
            className="overflow-hidden rounded-2xl border border-[#d7e8ee] bg-white text-right shadow-[0_14px_32px_-26px_rgba(20,67,86,0.8)]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#eef6f8]">
              {/* <img> مباشرة من public — يضمن ظهور الصور في كل بيئات النشر دون كاش تحسين Next */}
              <img
                src={card.image.src}
                alt={card.image.alt}
                title={card.image.title}
                width={card.image.width}
                height={card.image.height}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="p-5">
              <div className="mb-3 flex justify-end">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-[#e8f5f7] text-[#2f7f86]">
                  <card.Icon className="size-5" aria-hidden />
                </span>
              </div>
              <h4 className="text-2xl font-extrabold leading-8 text-[#163c55]">{card.title}</h4>
              <p className="mt-2 text-base leading-8 text-muted-foreground">{card.summary}</p>
              <p className="mt-4 border-t border-[#e2ecef] pt-3 text-sm font-semibold text-[#1f6f79]">{card.cta}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
