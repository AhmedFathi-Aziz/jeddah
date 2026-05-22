import { ExternalLink } from "lucide-react";

type Props = {
  name: string;
  url: string;
  className?: string;
};

/** رابط المصدر: اسم الموقع يفتح الرابط الأصلي */
export function NewsSourceLink({ name, url, className }: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex flex-row-reverse items-center gap-1 font-semibold text-[#1f7f8a] hover:underline"
      }
    >
      {name}
      <ExternalLink className="size-3.5 shrink-0" aria-hidden />
    </a>
  );
}
