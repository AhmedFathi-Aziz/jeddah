/** استخراج عناوين Markdown (# … ###) لجدول المحتويات وروابط الـ fragment — مع تجاهل أسطر داخل كتل الكود */

function* iterMarkdownContentLines(markdown: string): Generator<string> {
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    const t = line.trimStart();
    if (t.startsWith("```")) inFence = !inFence;
    if (inFence) continue;
    yield line;
  }
}

function baseSlug(text: string): string {
  const s = text
    .trim()
    .replace(/[\u200c\u200f\u202a-\u202e]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}\-]/gu, "");
  return s.length > 0 ? s : "قسم";
}

function uniqueSlug(text: string, counts: Map<string, number>): string {
  const base = baseSlug(text);
  const n = (counts.get(base) ?? 0) + 1;
  counts.set(base, n);
  return n > 1 ? `${base}-${n}` : base;
}

export type TocEntry = {
  /** يطابق مستوى العنوان في HTML بعد خفض مستوى Markdown داخل المقال: # → h2، إلخ */
  level: 2 | 3 | 4;
  text: string;
  id: string;
};

export function buildMarkdownToc(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const counts = new Map<string, number>();

  for (const line of iterMarkdownContentLines(markdown)) {
    const m = /^(#{1,3})\s+(.+?)\s*$/.exec(line.trim());
    if (!m) continue;
    const hashes = m[1];
    const raw = m[2].replace(/\s+#+$/, "").trim();
    if (!raw || !hashes) continue;
    const level = (hashes.length + 1) as 2 | 3 | 4;
    const id = uniqueSlug(raw, counts);
    entries.push({ level, text: raw, id });
  }

  return entries;
}

export function getMarkdownHeadingIds(markdown: string): string[] {
  return buildMarkdownToc(markdown).map((e) => e.id);
}
