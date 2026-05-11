/**
 * يستخرج slugs المقالات المنشورة من D1 البعيد ويكتب ‎data/article-slugs-export.json‎
 * ليُدرَج كل مسار في ‎generateStaticParams‎ مع ‎dynamicParams: false‎.
 */
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const DB_NAME = "tasarubat-articles";
const SQL = "SELECT slug FROM articles WHERE published = 1";

function parseWranglerJson(stdout) {
  const trimmed = String(stdout).trim();
  if (!trimmed) return [];
  const parsed = JSON.parse(trimmed);
  const batches = Array.isArray(parsed) ? parsed : [parsed];
  const slugs = [];
  for (const batch of batches) {
    const rows = batch?.results;
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      if (row && typeof row.slug === "string" && row.slug.trim() !== "") {
        slugs.push(row.slug.trim());
      }
    }
  }
  return slugs;
}

function exportD1BlogSlugs(projectRoot) {
  const outDir = path.join(projectRoot, "data");
  const outFile = path.join(outDir, "article-slugs-export.json");

  const stdout = execSync(
    `npx wrangler d1 execute ${DB_NAME} --remote --command "${SQL}" --json`,
    {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    },
  );

  const slugs = [...new Set(parseWranglerJson(stdout))];
  if (!slugs.length) {
    console.warn("[export-d1-blog-slugs] لا توجد صفوف؛ يُتخطى كتابة الملف.");
    return null;
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, `${JSON.stringify({ slugs }, null, 0)}\n`, "utf8");
  console.log(`[export-d1-blog-slugs] كُتب ${slugs.length} slug → ${path.relative(projectRoot, outFile)}`);
  return { count: slugs.length, file: outFile };
}

module.exports = { exportD1BlogSlugs, DB_NAME };

if (require.main === module) {
  const root = path.join(__dirname, "..");
  exportD1BlogSlugs(root);
}
