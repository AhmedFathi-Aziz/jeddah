/**
 * حقن روابط داخلية سياقية داخل أقسام المقالات (بعد عناوين H2).
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MARKER = "<!-- contextual-links-v1 -->";

const SECTION_RULES = [
  { pattern: /فاتورة|استهلاك|عداد|فواتير/i, line: "> **اقرأ أيضاً:** [ارتفاع فاتورة المياه](/blog/ارتفاع-فاتورة-المياه-جدة) · [المشخّص الذكي](/smart-leak-diagnosis) · [5 علامات تسرب](/blog/5-ayat-tasarab)" },
  { pattern: /حمام|دورة.?ميا|سيفون|بانيو|دش/i, line: "> **اقرأ أيضاً:** [كشف الحمامات](/blog/كشف-تسربات-الحمامات) · [عزل حمامات](/insulation-services/bathroom-foam-insulation) · [كشف بدون تكسير](/leak-detection)" },
  { pattern: /مطبخ|حوض|غسالة/i, line: "> **اقرأ أيضاً:** [كشف المطابخ](/blog/كشف-تسربات-المطابخ-بجدة) · [كشف بدون تكسير](/leak-detection) · [إصلاح التسربات](/blog/إصلاح-تسربات-المياه)" },
  { pattern: /خزان/i, line: "> **اقرأ أيضاً:** [كشف الخزانات](/blog/كشف-تسربات-الخزانات-بجدة) · [عزل الخزانات](/blog/عزل-خزانات-بجدة) · [إيبوكسي](/insulation-services/tank-epoxy-insulation)" },
  { pattern: /سطح|أسطح|سقف|تراس|أمطار/i, line: "> **اقرأ أيضاً:** [عزل الأسطح](/blog/عزل-أسطح-بجدة) · [كشف الأسطح](/blog/كشف-تسربات-الأسطح-بجدة) · [عزل فوم](/insulation-services/foam-thermal-waterproof-insulation)" },
  { pattern: /عزل|فوم|حراري|مائي|إيبوكس/i, line: "> **اقرأ أيضاً:** [صفحة العزل](/insulation) · [أهمية العزل](/blog/ahamiyat-alazl-bi-anwaaih) · [عزل أسطح](/blog/عزل-أسطح-بجدة)" },
  { pattern: /كشف|فحص|أجهزة|بدون.?تكسير|تقن/i, line: "> **اقرأ أيضاً:** [كشف بدون تكسير](/leak-detection) · [دليل الكشف](/blog/كشف-تسربات-بدون-تكسير) · [الأجهزة الحديثة](/blog/كشف-تسربات-المياه-بأحدث-الأجهزة)" },
  { pattern: /إصلاح|ترميم|معالج/i, line: "> **اقرأ أيضاً:** [إصلاح التسربات](/blog/إصلاح-تسربات-المياه) · [كشف بدون تكسير](/leak-detection) · [اتصل](/contact)" },
  { pattern: /خطورة|أضرار|عفن|صحة|إنشائي/i, line: "> **اقرأ أيضاً:** [خطورة التسربات](/blog/خطورة-تسربات-المياه) · [ما هي التسربات](/blog/ما-هي-التسربات-ولماذا-تحدث) · [5 علامات](/blog/5-ayat-tasarab)" },
  { pattern: /جدة|حي|أحي|تغط/i, line: "> **اقرأ أيضاً:** [أحياء جدة](/coverage) · [كشف جدة](/leak-detection) · [شركة كشف](/blog/أفضل-شركة-كشف-تسربات-بجدة)" },
  { pattern: /شركة|اختيار|معايير|موثوق/i, line: "> **اقرأ أيضاً:** [شركة كشف](/blog/أفضل-شركة-كشف-تسربات-بجدة) · [خدماتنا](/services) · [تواصل](/contact)" },
  { pattern: /وقا|نصائح|صيان/i, line: "> **اقرأ أيضاً:** [اكتشاف مبكر](/blog/kaif-taktashif-tasarobat-almiyah) · [المشخّص الذكي](/smart-leak-diagnosis) · [المدونة](/blog)" },
];

const DEFAULT_LINE = "> **صفحات ذات صلة:** [كشف](/leak-detection) · [عزل](/insulation) · [أحياء](/coverage) · [مدونة](/blog)";

function skipHeading(h) {
  return /خدمات وصفحات|اقرأ أيضاً|الكلمات المفتاحية|جدول المحتويات|فهرس/i.test(h);
}

function sectionHasLink(text) {
  return /\]\(\/(leak-detection|insulation|blog|coverage|contact|smart-leak|insulation-services|services)/.test(text);
}

function pickLine(heading) {
  for (const rule of SECTION_RULES) {
    if (rule.pattern.test(heading)) return rule.line;
  }
  return DEFAULT_LINE;
}

function insertAfterFirstPara(sectionLines, linkLine) {
  const out = [...sectionLines];
  for (let i = 0; i < out.length; i++) {
    const t = out[i].trim();
    if (!t || t.startsWith("#") || t.startsWith("|") || t.startsWith(">") || t.startsWith("<!--")) continue;
    // end of first paragraph
    let end = i + 1;
    while (end < out.length && out[end].trim() && !out[end].startsWith("#") && !out[end].startsWith("|")) end++;
    out.splice(end, 0, "", linkLine);
    return out;
  }
  return ["", linkLine, ...out];
}

function isProcessed(data, body) {
  return (data?.contentProcessing?.contextualLinks ?? 0) >= 1 || body.includes(MARKER);
}

function injectContextualLinks(body, data) {
  if (isProcessed(data, body)) return { body, changed: false };

  const footerIdx = body.search(/\n---\n\n## (?:🔗 )?خدمات/);
  const main = footerIdx === -1 ? body : body.slice(0, footerIdx);
  const footer = footerIdx === -1 ? "" : body.slice(footerIdx);

  const lines = main.split(/\r?\n/);
  const out = [];
  let i = 0;
  let injected = 0;

  while (i < lines.length) {
    const h2 = lines[i].match(/^## (.+)/);
    if (!h2) {
      out.push(lines[i]);
      i++;
      continue;
    }

    const heading = h2[1];
    out.push(lines[i]);
    i++;

    const sectionLines = [];
    while (i < lines.length && !/^## /.test(lines[i])) {
      sectionLines.push(lines[i]);
      i++;
    }

    const sectionText = sectionLines.join("\n");
    if (
      injected < 8 &&
      !skipHeading(heading) &&
      !sectionHasLink(sectionText) &&
      sectionLines.some((l) => l.trim().length > 20)
    ) {
      out.push(...insertAfterFirstPara(sectionLines, pickLine(heading)));
      injected++;
    } else {
      out.push(...sectionLines);
    }
  }

  if (injected === 0) return { body, changed: false };
  return { body: out.join("\n").trimEnd() + footer, changed: true };
}

function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");
  let count = 0;
  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const { body, changed } = injectContextualLinks(content, data);
    if (!changed) continue;
    data.contentProcessing = { ...(data.contentProcessing ?? {}), contextualLinks: 1 };
    fs.writeFileSync(full, matter.stringify(body, data), "utf8");
    count++;
    console.log(`✓ ${file}`);
  }
  console.log(`\nحقن روابط سياقية في ${count} مقال.`);
}

main();
