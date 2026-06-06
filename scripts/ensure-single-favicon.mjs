/**
 * يمنع تعارض Next.js: public/favicon.ico + app/favicon.ico على نفس المسار → خطأ 500.
 * المصدر الوحيد المسموح: app/favicon.ico (Metadata API).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicFavicon = path.join(root, "public", "favicon.ico");

if (fs.existsSync(publicFavicon)) {
  console.error(
    "\n[favicon] تعارض: يوجد public/favicon.ico و app/favicon.ico معاً.\n" +
      "احذف public/favicon.ico — Next.js يخدم الأيقونة من app/favicon.ico فقط.\n" +
      "راجع: https://nextjs.org/docs/messages/conflicting-public-file-page\n",
  );
  process.exit(1);
}
