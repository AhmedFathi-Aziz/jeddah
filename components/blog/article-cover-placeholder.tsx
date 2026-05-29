import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[#0e7490] via-[#0369a1] to-[#1e3a5f]",
  "from-[#0d9488] via-[#0f766e] to-[#134e4a]",
  "from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a]",
  "from-[#059669] via-[#047857] to-[#14532d]",
] as const;

function gradientClass(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h + seed.charCodeAt(i) * (i + 1)) % 1_000_000;
  }
  return GRADIENTS[h % GRADIENTS.length] ?? GRADIENTS[0];
}

type Props = {
  title: string;
  category: string;
  /** مع حاوٍ relative + aspect أو h ثابت */
  fill?: boolean;
  /** نص أصغر في البطاقات الضيقة */
  compact?: boolean;
  className?: string;
};

export function ArticleCoverPlaceholder({ title, category, fill, compact, className }: Props) {
  const grad = gradientClass(title);

  return (
    <div
      className={cn(
        "flex flex-col justify-between overflow-hidden bg-gradient-to-br p-4 text-white shadow-inner md:p-5",
        grad,
        fill && "absolute inset-0 h-full w-full",
        className,
      )}
      role="img"
      aria-label={title}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.9) 1.5px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-cyan-200/25 blur-2xl" aria-hidden />

      <div className="relative z-[1] flex items-start justify-between gap-2">
        <span className="inline-flex max-w-[85%] items-center rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur-sm md:text-xs">
          <span className="line-clamp-1">{category}</span>
        </span>
      </div>

      <p
        className={cn(
          "relative z-[1] mt-auto text-balance font-extrabold leading-snug text-white drop-shadow-md",
          compact ? "line-clamp-2 text-base md:text-lg" : "line-clamp-3 text-lg md:text-2xl",
        )}
      >
        {title}
      </p>
    </div>
  );
}
