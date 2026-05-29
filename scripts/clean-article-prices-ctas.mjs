/**
 * إزالة CTAs الهاتف/واتساب والأسعار المحددة من مقالات المدونة.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const PRICING_NOTE = `> **الأسعار:** تُحدَّد تكلفة الخدمة بناءً على طبيعة المطلوب ومساحة العمل والمواد المستخدمة. نوفر **خصومات وعروض مميزة** — [تواصل معنا](/contact) للحصول على معاينة مجانية وعرض سعر مناسب لاحتياجك.`;

function cleanBody(body) {
  let b = body;

  // —— CTAs: أرقام واتساب/هاتف ——
  b = b.replace(/^📞[^\n]*\n/gm, "");
  b = b.replace(/^💬[^\n]*\n/gm, "");
  b = b.replace(/^🕐 \*\*خدمة 24[^\n]*\n/gm, "");
  b = b.replace(/^>\s*📞[^\n]*\n/gm, "");
  b = b.replace(/^>\s*\*\*اتصل بنا الآن[^\n]*\n/gm, "");

  // —— أقسام 📞 تواصل ——
  b = b.replace(/\n## 📞[^\n]*\n[\s\S]*?(?=\n---\n)/g, "\n");
  b = b.replace(/\n### 📞[^\n]*\n[\s\S]*?(?=\n---\n|\n\*جدة للعزل)/g, "\n");

  // —— أقسام أسعار كاملة (جدول + فقرات) ——
  b = b.replace(
    /\n## أسعار[^\n]*\n[\s\S]*?(?=\n---\n)/g,
    `\n## الأسعار والعروض\n\n${PRICING_NOTE}\n`,
  );

  b = b.replace(
    /\n## الأسعار والمتابعة[^\n]*\n[\s\S]*?(?=\n---\n|\n## )/g,
    `\n## الأسعار والعروض\n\n${PRICING_NOTE}\n\n`,
  );

  b = b.replace(
    /\n## الأسعار المناسبة\n\nيجب[^\n]+\.\n/g,
    `\n## الأسعار والعروض\n\n${PRICING_NOTE.replace(/\n/g, " ")}\n\n`,
  );

  // —— فقرات أسعار شائعة ——
  const priceParagraphs = [
    /بشكل عام، تبدأ تكلفة كشف التسربات من \d+ ريال[^\n]+\n/g,
    /بشكل عام، تبدأ تكلفة الكشف الأولي من \d+ ريال[^\n]+\n/g,
    /بشكل عام تبدأ تكلفة كشف التسربات من \d+ ريال[^\n]+\n/g,
    /تتفاوت التكلفة بناءً[^\n]*من [٢\d]+ ريال[^\n]+\n/g,
    /تتفاوت التكلفة بحسب[^\n]*بين \*\*\d+ و\d+ ريال[^\n]+\n/g,
    /تبدأ تكلفة \[?\*?\*?كشف[^\n]*من (?:حوالي )?[٢\d]+ ريال[^\n]+\n/g,
    /تبدأ تكلفة الكشف بالأجهزة من \*\*[٢\d]+ ريال\*\*[^\n]+\n/g,
    /الأجهزة ذات الجودة العالية تكلف من \d+ إلى \d+ ريال[^\n]+\n/g,
    /قيمته لا تتجاوز \d+ إلى \d+ ريال[^\n]+\n/g,
    /التسرب الذي كان علاجه يكلّف \d[\d,]* ريال[^\n]+\n/g,
  ];
  for (const re of priceParagraphs) {
    b = b.replace(re, `${PRICING_NOTE}\n\n`);
  }

  // —— أسئلة FAQ عن السعر ——
  b = b.replace(
    /\*\*س: كم تكلفة[^\n]+\n[^\n]+\n/g,
    `**س: كم تكلفة الخدمة؟**\nج: ${PRICING_NOTE.replace(/^>\s*/, "").replace(/\n/g, " ")}\n\n`,
  );

  b = b.replace(
    /\*\*٤\. لا تختار بناءً على السعر الأرخص فقط\*\*\n\n[^\n]+\n\n[^\n]+\n/g,
    `**٤. لا تختار بناءً على السعر الأرخص فقط**\n\n${PRICING_NOTE.replace(/^>\s*/, "")}\n\n`,
  );

  // —— إزالة أسعار من جداول (عمود السعر) ——
  b = b.replace(/\| متوسط السعر[^\n]+\n/g, "");
  b = b.replace(/\| \*\*[^|]+\*\* \| [^|]+ \| [^|]+ \| \d+[–\-]\d+ ريال \|/g, (row) => {
    const parts = row.split("|").filter(Boolean);
    if (parts.length >= 4) {
      return `| ${parts[0].trim()} | ${parts[1].trim()} | ${parts[2].trim()} | ${parts[parts.length - 1].trim()} |`;
    }
    return row;
  });

  // —— ملاحظات أسعار قديمة ——
  b = b.replace(/> (?:📌 )?\*\*ملاحظة\*\*: الأسعار تقديرية[^\n]+\n/g, `${PRICING_NOTE}\n\n`);
  b = b.replace(/> \*\*ملاحظة:\*\* هذه أسعار استرشادية[^\n]+\n/g, "");
  b = b.replace(/> \*\*السعر الدقيق يُحدَّد[^\n]+\n/g, `${PRICING_NOTE}\n\n`);

  // —— excerpt في YAML يُعالَج منفصل ——
  b = b.replace(/\n{3,}/g, "\n\n");
  return b;
}

function cleanFrontmatter(data) {
  if (typeof data.excerpt === "string") {
    data.excerpt = data.excerpt
      .replace(/وأسعار تنافسية\.?\s*/g, "")
      .replace(/\.?\s*خدمة 24[^\n]*/g, "")
      .trim();
  }
  if (typeof data.keywords === "string") {
    // لا تغيير
  }
  return data;
}

function main() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((n) => n.endsWith(".md") && n.toLowerCase() !== "readme.md");

  for (const file of files) {
    const full = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data, content } = matter(raw);
    const cleanedData = cleanFrontmatter({ ...data });
    const cleaned = cleanBody(content);
    if (cleaned === content && JSON.stringify(cleanedData) === JSON.stringify(data)) continue;
    fs.writeFileSync(full, matter.stringify(cleaned, cleanedData), "utf8");
    console.log(`✓ ${file}`);
  }
}

main();
