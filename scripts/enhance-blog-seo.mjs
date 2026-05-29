/**
 * تحسين SEO والربط الداخلي لجميع مقالات content/blog/*.md
 * — لا يعدّل الروابط الموجودة مسبقاً
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const MARKER = "<!-- seo-enhanced-v2 -->";

function isSeoProcessed(data, content) {
  const flags = data?.contentProcessing ?? {};
  return flags.seo >= 2 || content.includes(MARKER);
}

const SERVICE_LINKS = [
  {
    href: "/leak-detection",
    title: "كشف تسربات المياه بدون تكسير",
    desc: "فحص إلكتروني حراري وصوتي مع تقرير واضح قبل أي تكسير.",
    tags: ["كشف", "تسرب", "فحص", "بدون تكسير", "رطوبة", "فاتورة"],
  },
  {
    href: "/smart-leak-diagnosis",
    title: "المشخّص الذكي للتسربات",
    desc: "اختبار أولي بالعربية ثم حجز فحص مجاني عبر واتساب.",
    tags: ["تشخيص", "كشف", "تسرب", "فاتورة", "علامات"],
  },
  {
    href: "/insulation",
    title: "عزل أسطح وخزانات بجدة",
    desc: "عزل مائي وحراري يناسب مناخ الساحل ويقلل الرطوبة والحرارة.",
    tags: ["عزل", "أسطح", "خزان", "حراري", "مائي", "فوم"],
  },
  {
    href: "/insulation-services/foam-thermal-waterproof-insulation",
    title: "عزل فوم حراري ومائي",
    desc: "طبقة بولي يوريثان للأسطح الكبيرة والفلل.",
    tags: ["فوم", "عزل", "أسطح", "حراري"],
  },
  {
    href: "/insulation-services/tank-epoxy-insulation",
    title: "عزل خزانات بالإيبوكسي",
    desc: "حماية داخلية للخزانات ومنع تلوث المياه.",
    tags: ["خزان", "إيبوكسي", "عزل"],
  },
  {
    href: "/insulation-services/bathroom-foam-insulation",
    title: "عزل حمامات بالفوم",
    desc: "منع تسرب المياه إلى الطوابق المجاورة بعد الإصلاح.",
    tags: ["حمام", "عزل", "فوم"],
  },
  {
    href: "/services",
    title: "خدمات كشف التسربات والعزل",
    desc: "نظرة شاملة على التشخيص والعزل والتنفيذ الميداني.",
    tags: ["خدمات", "كشف", "عزل", "شركة"],
  },
  {
    href: "/contact",
    title: "اتصل واحجز زيارة",
    desc: "هاتف واستفسارات لمعاينات كشف التسربات والعزل.",
    tags: ["تواصل", "حجز", "معاينة"],
  },
  {
    href: "/coverage",
    title: "تغطية أحياء جدة",
    desc: "صفحات محلية لخدمات الكشف والعزل حسب الحي.",
    tags: ["أحياء", "جدة", "تغطية"],
  },
  {
    href: "/blog",
    title: "مدونة التسربات والعزل",
    desc: "أدلة عملية عن الفواتير والرطوبة وعزل الأسطح.",
    tags: ["مدونة", "دليل"],
  },
];

const TOPIC_BLOG_HINTS = [
  { pattern: /حمام|دورة.?ميا|سيفون|بانيو|دش/i, slugs: ["كشف-تسربات-الحمامات", "كشف-تسربات-بدون-تكسير"] },
  { pattern: /مطبخ|حوض|غسالة/i, slugs: ["كشف-تسربات-المطابخ-بجدة", "كشف-تسربات-بدون-تكسير"] },
  { pattern: /خزان/i, slugs: ["كشف-تسربات-الخزانات-بجدة", "عزل-خزانات-بجدة"] },
  { pattern: /سطح|أسطح|تراس|مظلة/i, slugs: ["عزل-أسطح-بجدة", "كشف-تسربات-الأسطح-بجدة"] },
  { pattern: /فاتورة|استهلاك|عداد/i, slugs: ["ارتفاع-فاتورة-المياه-جدة", "irtifaa-fatura-almiyah-jeddah", "high-water-bill-jeddah"] },
  { pattern: /إصلاح|ترميم/i, slugs: ["إصلاح-تسربات-المياه", "كشف-تسربات-بدون-تكسير"] },
  { pattern: /بدون.?تكسير|أجهزة|فحص|كشف/i, slugs: ["كشف-تسربات-بدون-تكسير", "كشف-تسربات-المياه-بأحدث-الأجهزة"] },
  { pattern: /عزل/i, slugs: ["عزل-أسطح-بجدة", "عزل-خزانات-بجدة", "ahamiyat-alazl-bi-anwaaih"] },
  { pattern: /رياض/i, slugs: ["kashf-tasarubat-alriyadh", "كشف-تسربات-المياه-الرياض"] },
  { pattern: /خطورة|أضرار|عفن|صحة/i, slugs: ["خطورة-تسربات-المياه", "ما-هي-التسربات-ولماذا-تحدث"] },
  { pattern: /علام|إشارة|5.?علام/i, slugs: ["5-ayat-tasarab", "kaif-taktashif-tasarobat-almiyah"] },
  { pattern: /مسابح|بركة/i, slugs: ["كشف-تسربات-المسابح"] },
  { pattern: /شركة|أفضل/i, slugs: ["أفضل-شركة-كشف-تسربات-بجدة", "كشف-تسربات-المياه-بجدة-أفضل-شركة-متخصصة"] },
];

const DEFAULT_BLOG_SLUGS = [
  "kaif-taktashif-tasarobat-almiyah",
  "كشف-تسربات-بدون-تكسير",
  "خطورة-تسربات-المياه",
  "ارتفاع-فاتورة-المياه-جدة",
  "عزل-أسطح-بجدة",
];

function extractH1(content) {
  for (const line of content.split(/\r?\n/)) {
    const t = line.trim();
    if (t.startsWith("# ") && !t.startsWith("## ")) return t.replace(/^#\s+/, "").trim();
  }
  return "";
}

function extractKeywords(title, h1, category, slug) {
  const base = [h1 || title, title, category].join(" ");
  const city = /رياض/i.test(base) ? "الرياض" : "جدة";
  const terms = new Set();

  const add = (s) => {
    const t = s.trim();
    if (t.length > 3) terms.add(t);
  };

  add(h1 || title);
  if (/كشف|تسرب|فحص/i.test(base)) {
    add(`كشف تسربات المياه ${city}`);
    add(`كشف تسربات بدون تكسير ${city}`);
    add("تسربات المياه في المنزل");
  }
  if (/عزل|أسطح|خزان|فوم|حراري|مائي/i.test(base)) {
    add(`عزل أسطح ${city}`);
    add(`عزل مائي ${city}`);
    add(`عزل خزانات ${city}`);
    add("عزل حراري ومائي");
  }
  if (/فاتورة|استهلاك|عداد/i.test(base)) add(`ارتفاع فاتورة المياه ${city}`);
  if (/إصلاح|ترميم/i.test(base)) add(`إصلاح تسربات المياه ${city}`);
  if (/حمام/i.test(base)) add(`كشف تسربات الحمامات ${city}`);
  if (/مطبخ/i.test(base)) add(`كشف تسربات المطابخ ${city}`);
  if (/خزان/i.test(base)) add(`كشف تسربات الخزانات ${city}`);
  if (/سطح|أسطح/i.test(base)) add(`كشف تسربات الأسطح ${city}`);
  if (/شركة/i.test(base)) add(`شركة كشف تسربات المياه ${city}`);
  if (/خطورة|أضرار/i.test(base)) add("خطورة تسربات المياه");
  if (/علام/i.test(base)) add("علامات تسرب المياه");

  add("جدة للعزل والتسربات");
  add("رطوبة الجدران");
  add("فحص تسربات المياه");

  return [...terms].slice(0, 16);
}

function scoreServiceLink(link, text) {
  let score = 0;
  for (const tag of link.tags) {
    if (text.includes(tag)) score += 2;
  }
  return score;
}

function pickServiceLinks(text, count = 4) {
  return [...SERVICE_LINKS]
    .map((l) => ({ ...l, score: scoreServiceLink(l, text) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count);
}

function pickRelatedBlogs(article, allArticles, count = 4) {
  const text = `${article.title} ${article.h1} ${article.slug} ${article.category}`;
  const slugScores = new Map();

  for (const hint of TOPIC_BLOG_HINTS) {
    if (hint.pattern.test(text)) {
      for (const s of hint.slugs) slugScores.set(s, (slugScores.get(s) ?? 0) + 5);
    }
  }
  for (const s of DEFAULT_BLOG_SLUGS) slugScores.set(s, (slugScores.get(s) ?? 0) + 1);

  const candidates = allArticles
    .filter((a) => a.slug !== article.slug)
    .map((a) => ({
      ...a,
      score: (slugScores.get(a.slug) ?? 0) + (a.category === article.category ? 2 : 0),
    }))
    .filter((a) => a.score > 0)
    .sort((a, b) => b.score - a.score);

  if (candidates.length >= count) return candidates.slice(0, count);

  const fallback = allArticles
    .filter((a) => a.slug !== article.slug && !candidates.some((c) => c.slug === a.slug))
    .slice(0, count - candidates.length);
  return [...candidates, ...fallback].slice(0, count);
}

function hasExistingSection(content, heading) {
  return new RegExp(`^##\\s+.*${heading}`, "m").test(content);
}

function hasKeywordsFooter(content) {
  return /\*\*الكلمات المفتاحية/i.test(content);
}

function buildIntroCallout(title, services) {
  const links = services
    .slice(0, 3)
    .map((s) => `[${s.title}](${s.href})`)
    .join(" · ");
  return `> **ملخص سريع:** يغطي هذا الدليل **${title.replace(/\|.*$/, "").trim()}** بأسلوب عملي يساعدك على اتخاذ قرار صحيح قبل تفاقم الضرر. للخطوة التالية: ${links}.`;
}

function buildInlineContextParagraph(services, related) {
  const svc = services[0];
  const blog = related[0];
  if (!svc || !blog) return "";
  return `\nإذا احتجت مساعدة فورية، راجع صفحة [${svc.title}](${svc.href}) أو اطّلع على مقالنا: [${blog.title}](/blog/${blog.slug}).\n`;
}

function buildServicesSection(services) {
  const rows = services
    .map((s) => `- **[${s.title}](${s.href})** — ${s.desc}`)
    .join("\n");
  return `\n---\n\n## خدمات وصفحات ذات صلة\n\n${rows}\n`;
}

function displayExcerpt(excerpt, title) {
  const raw = String(excerpt ?? "")
    .replace(/دليل\s*SEO\s*متخصص\s*:\s*/gi, "")
    .replace(/\s*[—–-]\s*نصائح\s*عملية\s*،?\s*ربط\s*داخلي\s*،?\s*وخطوات\s*واضحة\s*لـ[^\n.]+[.]?/gi, "")
    .trim();
  const text = raw || String(title ?? "").trim();
  return text.length > 90 ? `${text.slice(0, 90).trim()}…` : text;
}

function buildRelatedSection(related) {
  const rows = related
    .map((a) => `| [${a.title}](/blog/${a.slug}) | ${displayExcerpt(a.excerpt, a.title)} |`)
    .join("\n");
  return `\n---\n\n## اقرأ أيضاً في مدونة جدة للعزل والتسربات\n\n| المقال | لماذا يهمك؟ |\n|---|---|\n${rows}\n`;
}

function buildKeywordsFooter(keywords) {
  return `\n---\n\n**الكلمات المفتاحية ذات الصلة:** ${keywords.join(" | ")}\n`;
}

function insertAfterFirstParagraph(content, insert) {
  const lines = content.split(/\r?\n/);
  let paraEnd = -1;
  let inPara = false;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t) {
      if (inPara) {
        paraEnd = i;
        break;
      }
      continue;
    }
    if (t.startsWith("#") || t.startsWith("---") || t.startsWith(">") || t.startsWith("|") || t.startsWith("<!--")) {
      if (inPara) {
        paraEnd = i;
        break;
      }
      continue;
    }
    inPara = true;
  }
  if (paraEnd === -1) return content + insert;
  lines.splice(paraEnd, 0, insert.trim());
  return lines.join("\n");
}

function ensureTocHint(content) {
  if (/##\s*(جدول المحتويات|فهرس المحتو)/.test(content)) return content;
  const h2Count = (content.match(/^##\s+/gm) ?? []).length;
  if (h2Count < 4) return content;
  if (/>\s*نصيحة للقراءة/.test(content)) return content;
  return content.replace(
    /^(#\s+.+\n\n)/m,
    `$1> **نصيحة للقراءة:** هذا المقال طويل ومفصّل — استخدم العناوين أدناه للانتقال مباشرة إلى القسم الذي يهمك.\n\n`,
  );
}

function enhanceContent(article, allArticles) {
  let content = article.content;
  if (isSeoProcessed(article.data, content)) return { content, changed: false };

  const textBlob = `${article.title} ${article.h1} ${article.category} ${content.slice(0, 2000)}`;
  const services = pickServiceLinks(textBlob, 4);
  const related = pickRelatedBlogs(article, allArticles, 4);
  const keywords = extractKeywords(article.title, article.h1, article.category, article.slug);

  content = ensureTocHint(content);

  if (!/>\s*\*\*ملخص سريع/.test(content)) {
    const callout = buildIntroCallout(article.h1 || article.title, services);
    content = insertAfterFirstParagraph(content, `\n${callout}\n`);
  }

  if (!/\]\(\/(leak-detection|insulation|services|smart-leak|contact|coverage|blog)/.test(content)) {
    content = insertAfterFirstParagraph(content, buildInlineContextParagraph(services, related));
  }

  if (!hasExistingSection(content, "خدمات")) {
    content += buildServicesSection(services);
  }
  if (!hasExistingSection(content, "اقرأ أيض")) {
    content += buildRelatedSection(related);
  }
  if (!hasKeywordsFooter(content)) {
    content += buildKeywordsFooter(keywords);
  }

  content = content.trim() + "\n";
  return { content, changed: true, keywords };
}

function updateFrontmatter(data, article, keywords) {
  const h1 = article.h1;
  if (h1 && h1 !== data.title && data.title.includes("كيف تكتشف تسربات المياه في المنزل")) {
    data.title = h1.replace(/\s*[—–-]\s*.*$/, "").trim();
  }
  const excerpt = String(data.excerpt ?? "");
  if (
    !excerpt ||
    excerpt.includes("دليل شامل لاكتشاف تسربات المياه في المنزل مبكراً") ||
    /دليل\s*SEO/i.test(excerpt) ||
    /ربط\s*داخلي/i.test(excerpt)
  ) {
    const base = (h1 || data.title).replace(/\|.*$/, "").trim();
    const city = /رياض/i.test(`${data.title} ${article.slug}`) ? "الرياض" : "جدة";
    data.excerpt = `دليل عملي عن ${base} — نصائح وخطوات واضحة لأصحاب المنازل في ${city}.`;
  }
  if (!data.keywords) {
    data.keywords = keywords.join(", ");
  }
}

function main() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

  const articles = files.map((name) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, name), "utf8");
    const { data, content } = matter(raw);
    const h1 = extractH1(content);
    return {
      file: name,
      slug: String(data.slug ?? ""),
      title: String(data.title ?? h1),
      h1,
      category: String(data.category ?? ""),
      excerpt: String(data.excerpt ?? ""),
      content,
      data,
      raw,
    };
  });

  let updated = 0;
  for (const article of articles) {
    const { content, changed, keywords } = enhanceContent(article, articles);
    if (!changed) continue;

    const { data } = matter(article.raw);
    updateFrontmatter(data, article, keywords ?? extractKeywords(article.title, article.h1, article.category, article.slug));
    data.contentProcessing = { ...(data.contentProcessing ?? {}), seo: 2 };
    const out = matter.stringify(content, data);
    fs.writeFileSync(path.join(CONTENT_DIR, article.file), out, "utf8");
    updated++;
    console.log(`✓ ${article.file}`);
  }
  console.log(`\nتم تحديث ${updated} من ${articles.length} مقال.`);
}

main();
