/**
 * ربط داخلي ذكي داخل محتوى المقالات:
 * - العزل → صفحة العزل أو الخدمة الفرعية المناسبة
 * - الأحياء → صفحة الحي في /coverage/jeddah/[slug]
 * - الخدمات والمقالات ذات الصلة
 * لا يعدّل أي رابط Markdown موجود مسبقاً.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const COVERAGE_JSON = path.join(process.cwd(), "data", "coverage-locations.json");
const MARKER = "<!-- smart-content-links-v3 -->";
const FORCE = process.argv.includes("--force");
const MAX_PER_PHRASE = 6;

/** قواعد الخدمات والموضوعات — الأطول أولاً */
const TOPIC_RULES = [
  { text: "كشف تسربات المياه بدون تكسير", href: "/leak-detection" },
  { text: "كشف تسربات بدون تكسير", href: "/leak-detection" },
  { text: "فحص تسربات المياه", href: "/leak-detection" },
  { text: "كشف تسربات المياه", href: "/leak-detection" },
  { text: "كشف تسربات", href: "/leak-detection" },
  { text: "ارتفاع فاتورة المياه", href: "/blog/ارتفاع-فاتورة-المياه-جدة" },
  { text: "فاتورة المياه", href: "/blog/irtifaa-fatura-almiyah-jeddah" },
  { text: "عزل فوم حراري ومائي", href: "/insulation-services/foam-thermal-waterproof-insulation" },
  { text: "عزل بولي يوريثان", href: "/insulation-services/foam-thermal-waterproof-insulation" },
  { text: "عزل الفوم", href: "/insulation-services/foam-thermal-waterproof-insulation" },
  { text: "عزل فوم", href: "/insulation-services/foam-thermal-waterproof-insulation" },
  { text: "عزل إيبوكسي", href: "/insulation-services/tank-epoxy-insulation" },
  { text: "الإيبوكسي", href: "/insulation-services/tank-epoxy-insulation" },
  { text: "عزل خزانات المياه", href: "/insulation-services/tank-epoxy-insulation" },
  { text: "عزل الخزانات", href: "/blog/عزل-خزانات-بجدة" },
  { text: "عزل خزانات", href: "/blog/عزل-خزانات-بجدة" },
  { text: "حقن خزانات", href: "/insulation-services/tank-injection" },
  { text: "عزل حمامات بالفوم", href: "/insulation-services/bathroom-foam-insulation" },
  { text: "عزل الحمامات", href: "/insulation-services/bathroom-foam-insulation" },
  { text: "عزل حمامات", href: "/insulation-services/bathroom-foam-insulation" },
  { text: "عزل حمامات حراري", href: "/insulation-services/thermal-bathroom-insulation" },
  { text: "العزل المائي والحراري", href: "/insulation" },
  { text: "العزل الحراري", href: "/insulation-services/thermal-insulation" },
  { text: "عزل حراري", href: "/insulation-services/thermal-insulation" },
  { text: "العزل المائي", href: "/insulation" },
  { text: "عزل مائي", href: "/insulation" },
  { text: "عزل أسطح بجدة", href: "/blog/عزل-أسطح-بجدة" },
  { text: "عزل الأسطح", href: "/blog/عزل-أسطح-بجدة" },
  { text: "عزل مساحات كبيرة", href: "/insulation-services/large-area-thermal-insulation" },
  { text: "عزل هناجر", href: "/insulation-services/large-area-thermal-insulation" },
  { text: "تسربات الحمامات", href: "/blog/كشف-تسربات-الحمامات" },
  { text: "كشف تسربات الحمامات", href: "/blog/كشف-تسربات-الحمامات" },
  { text: "تسربات المطابخ", href: "/blog/كشف-تسربات-المطابخ-بجدة" },
  { text: "كشف تسربات المطابخ", href: "/blog/كشف-تسربات-المطابخ-بجدة" },
  { text: "تسربات الخزانات", href: "/blog/كشف-تسربات-الخزانات-بجدة" },
  { text: "كشف تسربات الخزانات", href: "/blog/كشف-تسربات-الخزانات-بجدة" },
  { text: "تسربات الأسطح", href: "/blog/كشف-تسربات-الأسطح-بجدة" },
  { text: "كشف تسربات الأسطح", href: "/blog/كشف-تسربات-الأسطح-بجدة" },
  { text: "إصلاح تسربات المياه", href: "/blog/إصلاح-تسربات-المياه" },
  { text: "خطورة تسربات المياه", href: "/blog/خطورة-تسربات-المياه" },
  { text: "المشخّص الذكي", href: "/smart-leak-diagnosis" },
  { text: "المشخص الذكي", href: "/smart-leak-diagnosis" },
  { text: "أحياء جدة", href: "/coverage" },
  { text: "دليل أحياء جدة", href: "/coverage" },
  { text: "خدمات العزل", href: "/insulation" },
  { text: "خدمات كشف التسربات", href: "/services" },
  { text: "دليل خدمات", href: "/services" },
  { text: "صفحة العزل", href: "/insulation" },
];

function buildDistrictRules() {
  const raw = JSON.parse(fs.readFileSync(COVERAGE_JSON, "utf8"));
  const jeddah = raw.cities.find((c) => c.slug === "jeddah");
  if (!jeddah) return [];

  const rules = [];
  const seen = new Set();

  for (const d of jeddah.districts) {
    const href = `/coverage/jeddah/${d.slug}`;
    const full = d.district.trim();
    const short = full.replace(/^حي\s+/, "").trim();

    for (const text of [full, short]) {
      if (!text || seen.has(text)) continue;
      seen.add(text);
      rules.push({ text, href, kind: "district" });
    }
  }

  return rules.sort((a, b) => b.text.length - a.text.length);
}

const DISTRICT_RULES = buildDistrictRules();
const ALL_RULES = [...DISTRICT_RULES, ...TOPIC_RULES].sort((a, b) => b.text.length - a.text.length);

function isInsideMarkdownLink(text, index) {
  const before = text.slice(0, index);
  let i = 0;
  while (i < before.length) {
    const open = before.indexOf("[", i);
    if (open === -1) break;
    const close = before.indexOf("]", open);
    if (close === -1) return true;
    if (before[close + 1] === "(") {
      const pClose = before.indexOf(")", close + 1);
      if (pClose === -1) return true;
      i = pClose + 1;
    } else {
      i = close + 1;
    }
  }
  return false;
}

function isAlreadyLinked(text, phrase, href) {
  return (
    text.includes(`[**${phrase}**](${href})`) ||
    text.includes(`[${phrase}](${href})`)
  );
}

function wrapPhrase(text, phrase, href, { bold = false } = {}) {
  if (isAlreadyLinked(text, phrase, href)) return text;

  let result = text;
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
    const charBeforeBold = result[idx - 3];

    if (before === "**" && after.startsWith("**")) {
      if (charBeforeBold === "[") {
        searchFrom = idx + phrase.length;
        continue;
      }
      result =
        result.slice(0, idx - 2) +
        `[**${phrase}**](${href})` +
        result.slice(idx + phrase.length + 2);
      searchFrom = idx + phrase.length + href.length + 12;
    } else if (bold) {
      result = result.slice(0, idx) + `[**${phrase}**](${href})` + result.slice(idx + phrase.length);
      searchFrom = idx + phrase.length + href.length + 12;
    } else {
      result = result.slice(0, idx) + `[${phrase}](${href})` + result.slice(idx + phrase.length);
      searchFrom = idx + phrase.length + href.length + 4;
    }
    replaced++;
  }
  return result;
}

function applyRulesToSegment(segment, phraseCounts, excludeHrefs, { bold = false } = {}) {
  let updated = segment;
  for (const rule of ALL_RULES) {
    if (excludeHrefs.has(rule.href)) continue;
    if (!updated.includes(rule.text)) continue;
    const used = phraseCounts.get(rule.text) ?? 0;
    if (used >= MAX_PER_PHRASE) continue;

    const next = wrapPhrase(updated, rule.text, rule.href, { bold });
    if (next !== updated) {
      const added =
        (next.match(/\]\([^)]+\)/g) ?? []).length - (updated.match(/\]\([^)]+\)/g) ?? []).length;
      phraseCounts.set(rule.text, used + Math.max(added, 1));
      updated = next;
    }
  }
  return updated;
}

function applyRulesToBoldBlocks(line, phraseCounts, excludeHrefs) {
  return line.replace(/\*\*([^*]+)\*\*/g, (match, inner) => {
    if (inner.includes("](")) return match;
    const processed = applyRulesToSegment(inner, phraseCounts, excludeHrefs, { bold: true });
    if (processed === inner) return match;
    return processed;
  });
}

function applyRulesToLine(line, phraseCounts, excludeHrefs) {
  if (/\*\*[^*]+\*\*/.test(line)) {
    const withBold = applyRulesToBoldBlocks(line, phraseCounts, excludeHrefs);
    return applyRulesToSegment(withBold, phraseCounts, excludeHrefs);
  }
  return applyRulesToSegment(line, phraseCounts, excludeHrefs);
}

function shouldSkipLine(line) {
  const t = line.trim();
  if (!t) return true;
  if (t.startsWith("#")) return true;
  if (t.startsWith("|")) return true;
  if (t.startsWith("```")) return true;
  if (t.startsWith("---")) return true;
  if (t.startsWith("<!--")) return true;
  if (/^>\s*(?:📌|🔗)?\s*\*\*/.test(t)) return true;
  if (/^>\s*\*\*اقرأ|^>\s*\*\*صفحات/.test(t)) return true;
  return false;
}

function isContentLine(line) {
  const t = line.trim();
  if (shouldSkipLine(line)) return false;
  if (t.startsWith(">")) return t.length >= 25;
  if (/^[-*]\s/.test(t)) return t.length >= 12;
  if (/^\*\*حي\s/.test(t)) return true;
  if (/^[-*]\s+\*\*حي\s/.test(t)) return true;
  if (/^[-*]\s+\*\*/.test(t) && /حي|عزل|تسرب|فاتورة|كشف/.test(t)) return true;
  return t.length >= 18;
}

function injectSmartLinks(body, articleSlug, data) {
  const smartVersion = data?.contentProcessing?.smartLinks ?? 0;
  if (smartVersion >= 3 && !FORCE) return { body, changed: false, count: 0 };

  let workBody = body.replace(/\n?<!-- smart-content-links-v[23] -->\n?/g, "\n");

  const footerIdx = workBody.search(/\n---\n\n## (?:🔗 )?خدمات/);
  const main = footerIdx === -1 ? workBody : workBody.slice(0, footerIdx);
  const footer = footerIdx === -1 ? "" : workBody.slice(footerIdx);

  const excludeHrefs = new Set();
  if (articleSlug) {
    excludeHrefs.add(`/blog/${articleSlug}`);
  }

  const phraseCounts = new Map();
  let totalNew = 0;

  const out = main.split(/\r?\n/).map((line) => {
    if (!isContentLine(line)) return line;
    const before = (line.match(/\]\([^)]+\)/g) ?? []).length;
    const updated = applyRulesToLine(line, phraseCounts, excludeHrefs);
    const after = (updated.match(/\]\([^)]+\)/g) ?? []).length;
    totalNew += Math.max(0, after - before);
    return updated;
  });

  if (totalNew === 0) return { body: workBody, changed: false, count: 0 };
  return {
    body: out.join("\n").trimEnd() + footer,
    changed: true,
    count: totalNew,
  };
}

function main() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

  let articles = 0;
  let links = 0;
  let districts = 0;

  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const slug = data.slug ?? file.replace(/\.md$/, "");
    const { body, changed, count } = injectSmartLinks(content, slug, data);
    if (!changed) continue;

    data.contentProcessing = { ...(data.contentProcessing ?? {}), smartLinks: 3 };
    fs.writeFileSync(full, matter.stringify(body, data), "utf8");
    articles++;
    links += count;
    const sample = body.match(/\]\(\/coverage\/jeddah\/[^)]+\)/g);
    districts += sample ? sample.length : 0;
    console.log(`✓ ${file} (+${count} روابط)`);
  }

  console.log(`\n${articles} مقال — ${links} رابط جديد (${DISTRICT_RULES.length} حي في السجل).`);
}

main();
