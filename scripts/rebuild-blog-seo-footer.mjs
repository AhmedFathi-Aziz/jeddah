/**
 * إعادة بناء أقسام SEO في نهاية المقالات بشكل صحيح
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const SERVICE_LINKS = [
  { href: "/leak-detection", title: "كشف تسربات المياه بدون تكسير", desc: "فحص إلكتروني حراري وصوتي مع تقرير واضح قبل أي تكسير." },
  { href: "/smart-leak-diagnosis", title: "المشخّص الذكي للتسربات", desc: "اختبار أولي بالعربية ثم توجيهك للخطوة المناسبة." },
  { href: "/insulation", title: "عزل أسطح وخزانات بجدة", desc: "عزل مائي وحراري يناسب مناخ الساحل ويقلل الرطوبة والحرارة." },
  { href: "/contact", title: "احجز معاينة مجانية", desc: "التكلفة تُحدَّد حسب المطلوب مع خصومات وعروض مميزة." },
];

const TOPIC_BLOG_HINTS = [
  { pattern: /حمام|دورة.?ميا|سيفون/i, slugs: ["كشف-تسربات-الحمامات", "كشف-تسربات-بدون-تكسير"] },
  { pattern: /مطبخ|حوض/i, slugs: ["كشف-تسربات-المطابخ-بجدة", "كشف-تسربات-بدون-تكسير"] },
  { pattern: /خزان/i, slugs: ["كشف-تسربات-الخزانات-بجدة", "عزل-خزانات-بجدة"] },
  { pattern: /سطح|أسطح/i, slugs: ["عزل-أسطح-بجدة", "كشف-تسربات-الأسطح-بجدة"] },
  { pattern: /فاتورة|استهلاك/i, slugs: ["ارتفاع-فاتورة-المياه-جدة", "irtifaa-fatura-almiyah-jeddah"] },
  { pattern: /إصلاح|ترميم/i, slugs: ["إصلاح-تسربات-المياه", "كشف-تسربات-بدون-تكسير"] },
  { pattern: /بدون.?تكسير|أجهزة|فحص/i, slugs: ["كشف-تسربات-بدون-تكسير", "كشف-تسربات-المياه-بأحدث-الأجهزة"] },
  { pattern: /عزل/i, slugs: ["عزل-أسطح-بجدة", "عزل-خزانات-بجدة", "ahamiyat-alazl-bi-anwaaih"] },
  { pattern: /رياض/i, slugs: ["kashf-tasarubat-alriyadh", "كشف-تسربات-المياه-الرياض"] },
  { pattern: /خطورة|أضرار|عفن/i, slugs: ["خطورة-تسربات-المياه", "ما-هي-التسربات-ولماذا-تحدث"] },
  { pattern: /علام|5.?علام/i, slugs: ["5-ayat-tasarab", "kaif-taktashif-tasarobat-almiyah"] },
  { pattern: /مسابح/i, slugs: ["كشف-تسربات-المسابح"] },
  { pattern: /شركة|أفضل/i, slugs: ["أفضل-شركة-كشف-تسربات-بجدة", "كشف-تسربات-المياه-بجدة-أفضل-شركة-متخصصة"] },
];
const DEFAULT_BLOG = ["kaif-taktashif-tasarobat-almiyah", "كشف-تسربات-بدون-تكسير", "خطورة-تسربات-المياه", "ارتفاع-فاتورة-المياه-جدة"];

function stripSeoFooter(content) {
  let c = content;
  c = c.replace(/\n<!--\s*(?:seo-enhanced-v2|contextual-links-v1|inline-content-links-v1|smart-content-links-v[23])\s*-->\n?/g, "\n");
  // remove from first broken/seo footer signal to end
  const patterns = [
    /\n---\n\n## (?:🔗 )?خدمات[\s\S]*$/,
    /\n\n- \*\*\[كشف تسربات المياه بدون تكسير\][\s\S]*$/,
    /\n\n\| المقال \| لماذا يهمك[\s\S]*$/,
    /\n---\n\n\*\*الكلمات المفتاحية[\s\S]*$/,
    /\n\n\*\*الكلمات المفتاحية[\s\S]*$/,
  ];
  for (const p of patterns) {
    c = c.replace(p, "");
  }
  // remove orphan empty seo headings at end
  c = c.replace(/\n---\n\n## خدمات وصفحات ذات صلة\s*\n---\s*(\n## 📚 اقرأ أيضاً[^\n]*\s*\n---\s*)?$/g, "");
  return c.trimEnd();
}

function extractKeywordsLine(content) {
  const m = content.match(/\*\*الكلمات المفتاحية ذات الصلة:\*\*[^\n]*/);
  return m ? m[0] : null;
}

function pickRelated(article, all) {
  const text = `${article.title} ${article.slug} ${article.category}`;
  const scores = new Map();
  for (const h of TOPIC_BLOG_HINTS) {
    if (h.pattern.test(text)) for (const s of h.slugs) scores.set(s, (scores.get(s) ?? 0) + 5);
  }
  for (const s of DEFAULT_BLOG) scores.set(s, (scores.get(s) ?? 0) + 1);
  return all
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({ ...a, score: (scores.get(a.slug) ?? 0) + (a.category === article.category ? 2 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function displayExcerpt(excerpt, title) {
  const raw = String(excerpt ?? "")
    .replace(/دليل\s*SEO\s*متخصص\s*:\s*/gi, "")
    .replace(/\s*[—–-]\s*نصائح\s*عملية\s*،?\s*ربط\s*داخلي\s*،?\s*وخطوات\s*واضحة\s*لـ[^\n.]+[.]?/gi, "")
    .trim();
  const text = raw || String(title ?? "").trim();
  return text.length > 85 ? `${text.slice(0, 85).trim()}…` : text;
}

function buildFooter(related, keywordsLine) {
  const services = SERVICE_LINKS.map((s) => `- **[${s.title}](${s.href})** — ${s.desc}`).join("\n");
  const rows = related
    .map((a) => `| [${a.title.replace(/\|/g, "/")}](/blog/${a.slug}) | ${displayExcerpt(a.excerpt, a.title)} |`)
    .join("\n");
  const kw = keywordsLine ?? "**الكلمات المفتاحية ذات الصلة:** كشف تسربات المياه جدة | عزل أسطح جدة | جدة للعزل والتسربات";
  return `

---

## خدمات وصفحات ذات صلة

${services}

---

## اقرأ أيضاً في مدونة جدة للعزل والتسربات

| المقال | لماذا يهمك؟ |
|---|---|
${rows}

---

${kw}
`;
}

function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");
  const articles = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return { file, slug: String(data.slug), title: String(data.title), category: String(data.category), excerpt: String(data.excerpt ?? ""), data, content };
  });

  for (const article of articles) {
    const savedKw = extractKeywordsLine(article.content);
    const body = stripSeoFooter(article.content);
    const related = pickRelated(article, articles);
    const footer = buildFooter(related, savedKw);
    article.data.contentProcessing = { ...(article.data.contentProcessing ?? {}), seo: 2 };
    const out = matter.stringify(body + footer, article.data);
    fs.writeFileSync(path.join(CONTENT_DIR, article.file), out, "utf8");
    console.log(`✓ ${article.file}`);
  }
}

main();
