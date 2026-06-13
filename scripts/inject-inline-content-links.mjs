/**
 * ربط داخلي داخل نص الفقرات — يحوّل العبارات المفتاحية لروابط Markdown
 * دون تعديل أي رابط موجود مسبقاً.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MARKER = "<!-- inline-content-links-v1 -->";

/** الأطول أولاً لتفادي التطابق الجزئي */
const PHRASE_RULES = [
  { text: "كشف تسربات المياه بدون تكسير", href: "/leak-detection" },
  { text: "كشف تسربات بدون تكسير", href: "/leak-detection" },
  { text: "فحص تسربات المياه", href: "/leak-detection" },
  { text: "كشف تسربات المياه", href: "/leak-detection" },
  { text: "ارتفاع فاتورة المياه", href: "/blog/ارتفاع-فاتورة-المياه-جدة" },
  { text: "فاتورة المياه", href: "/blog/irtifaa-fatura-almiyah-jeddah" },
  { text: "العزل المائي والحراري", href: "/insulation" },
  { text: "العزل المائي", href: "/insulation" },
  { text: "العزل الحراري", href: "/insulation-services/thermal-insulation" },
  { text: "عزل أسطح بجدة", href: "/blog/عزل-أسطح-بجدة" },
  { text: "عزل الأسطح", href: "/blog/عزل-أسطح-بجدة" },
  { text: "عزل الخزانات", href: "/blog/عزل-خزانات-بجدة" },
  { text: "عزل خزانات المياه", href: "/blog/عزل-خزانات-بجدة" },
  { text: "تسربات الحمامات", href: "/blog/كشف-تسربات-الحمامات" },
  { text: "تسرب مياه الحمام", href: "/blog/كشف-تسربات-الحمامات" },
  { text: "تسربات المطابخ", href: "/blog/كشف-تسربات-المطابخ-بجدة" },
  { text: "تسربات الخزانات", href: "/blog/كشف-تسربات-الخزانات-بجدة" },
  { text: "تسربات الأسطح", href: "/blog/كشف-تسربات-الأسطح-بجدة" },
  { text: "إصلاح تسربات المياه", href: "/blog/إصلاح-تسربات-المياه" },
  { text: "خطورة تسربات المياه", href: "/blog/خطورة-تسربات-المياه" },
  { text: "المشخّص الذكي", href: "/smart-leak-diagnosis" },
  { text: "أحياء جدة", href: "/coverage" },
  { text: "عزل الفوم", href: "/insulation-services/foam-thermal-waterproof-insulation" },
  { text: "عزل الحمامات", href: "/insulation-services/bathroom-foam-insulation" },
  { text: "عزل الإيبوكسي", href: "/insulation-services/tank-epoxy-insulation" },
];

const MAX_INLINE_PER_ARTICLE = 14;
const MAX_PER_PHRASE = 2;

function isProseLine(line) {
  const t = line.trim();
  if (!t) return false;
  if (t.startsWith("#")) return false;
  if (t.startsWith(">")) return false;
  if (t.startsWith("|")) return false;
  if (t.startsWith("```")) return false;
  if (t.startsWith("---")) return false;
  if (t.startsWith("<!--")) return false;
  if (t.startsWith("- ") || t.startsWith("* ") || /^\d+\.\s/.test(t)) return false;
  if (t.length < 40) return false;
  return true;
}

function isInsideMarkdownLink(line, index) {
  const before = line.slice(0, index);
  const openBracket = before.lastIndexOf("[");
  const closeBracket = before.lastIndexOf("]");
  const openParen = before.lastIndexOf("(");
  if (openBracket > closeBracket) return true;
  if (closeBracket > openBracket && openParen > closeBracket) return true;
  return false;
}

function wrapPhrase(line, phrase, href) {
  let result = line;
  let searchFrom = 0;
  let replaced = 0;

  while (replaced < MAX_PER_PHRASE) {
    const idx = result.indexOf(phrase, searchFrom);
    if (idx === -1) break;
    if (isInsideMarkdownLink(result, idx)) {
      searchFrom = idx + phrase.length;
      continue;
    }

    const before = result.slice(Math.max(0, idx - 2), idx);
    const after = result.slice(idx + phrase.length, idx + phrase.length + 2);
    if (before === "**" && after.startsWith("**")) {
      result =
        result.slice(0, idx - 2) +
        `[**${phrase}**](${href})` +
        result.slice(idx + phrase.length + 2);
      searchFrom = idx + phrase.length + href.length + 10;
    } else {
      result = result.slice(0, idx) + `[${phrase}](${href})` + result.slice(idx + phrase.length);
      searchFrom = idx + phrase.length + href.length + 4;
    }
    replaced++;
  }
  return result;
}

function isProcessed(data, body) {
  return (data?.contentProcessing?.inlineLinks ?? 0) >= 1 || body.includes(MARKER);
}

function injectInlineLinks(body, data) {
  if (isProcessed(data, body)) return { body, changed: false, count: 0 };

  const footerIdx = body.search(/\n---\n\n## (?:🔗 )?خدمات/);
  const main = footerIdx === -1 ? body : body.slice(0, footerIdx);
  const footer = footerIdx === -1 ? "" : body.slice(footerIdx);

  const lines = main.split(/\r?\n/);
  let totalLinked = 0;
  const phraseCounts = new Map();

  const out = lines.map((line) => {
    if (!isProseLine(line) || totalLinked >= MAX_INLINE_PER_ARTICLE) return line;

    let updated = line;
    for (const rule of PHRASE_RULES) {
      if (totalLinked >= MAX_INLINE_PER_ARTICLE) break;
      if (!updated.includes(rule.text)) continue;
      const used = phraseCounts.get(rule.text) ?? 0;
      if (used >= MAX_PER_PHRASE) continue;

      const next = wrapPhrase(updated, rule.text, rule.href);
      if (next !== updated) {
        const added = (next.match(/\]\(\//g) ?? []).length - (updated.match(/\]\(\//g) ?? []).length;
        totalLinked += added;
        phraseCounts.set(rule.text, used + added);
        updated = next;
      }
    }
    return updated;
  });

  if (totalLinked === 0) return { body, changed: false, count: 0 };
  return {
    body: out.join("\n").trimEnd() + footer,
    changed: true,
    count: totalLinked,
  };
}

function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");
  let articles = 0;
  let links = 0;

  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const { body, changed, count } = injectInlineLinks(content, data);
    if (!changed) continue;
    data.contentProcessing = { ...(data.contentProcessing ?? {}), inlineLinks: 1 };
    fs.writeFileSync(full, matter.stringify(body, data), "utf8");
    articles++;
    links += count;
    console.log(`✓ ${file} (+${count} inline)`);
  }
  console.log(`\n${articles} مقال — ${links} رابط داخل النص.`);
}

main();
