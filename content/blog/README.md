# مقالات المدونة (Markdown)

كل ملف `.md` هنا يُصبح مقالاً في المسار `/blog/[slug]`.

## الحقول (YAML بين `---`)

| الحقل       | مطلوب | مثال |
|------------|--------|------|
| `id`       | نعم    | معرف ثابت (نص) |
| `slug`     | نعم    | يطابق اسم الملف بدون `.md` مفضّل |
| `category` | نعم    | تصنيف عربي |
| `title`    | نعم    | عنوان المقال |
| `excerpt`  | نعم    | وصف قصير لمحركات البحث |
| `coverSrc` | نعم    | رابط HTTPS للصورة أو مسار يبدأ بـ `/` |
| `coverAlt` | نعم    | وصف الصورة |
| `coverWidth` / `coverHeight` | لا | أرقام، افتراضي 800×320 |
| `createdAt` | نعم   | تاريخ ISO مثل `2026-05-02T00:00:00.000Z` |

بعد `---` الثانية يأتي **جسم المقال** بصيغة Markdown.

## أوامر مفيدة

- توليد المقالات الأربعة من العرض التجريبي إلى هذا المجلد:  
  `npm run articles:from-demo`
- **تصدير كل المقالات من D1** (منشورة + مسودات) إلى ملفات Markdown (بعد `npx wrangler login`):  
  `npm run articles:export-from-d1`  
  - المنشور → `content/blog/<slug>.md` (يظهر في الموقع).  
  - غير المنشور → `content/blog-drafts/<slug>.md` (نسخة احتياطية، لا تُعرض في الواجهة).  
  **منشورات فقط:** ضبط المتغير `EXPORT_D1_PUBLISHED_ONLY=1` ثم نفس الأمر.  
  **قاعدة محلية (Wrangler):** `EXPORT_D1_LOCAL=1` بدل الاستعلام عن البعيد.  
  بعد التصدير راقب في الطرفية: **عدد الصفوف في D1** مقابل **عدد ملفات blog + drafts**؛ إن كان الفرق كبيراً راجع `wrangler login` واسم القاعدة في `wrangler.jsonc`.  
  ثم ادفع `content/blog/` إلى Git ليظهر المحتوى على **Cloudflare Pages** (المسودات في `content/blog-drafts/` لا تُعرض في الموقع).

### نفس قائمة الـ Worker على Pages (بدون نسخ يدوي لكل مقال)

على **Cloudflare Pages** البناء الثابت لا يرى D1 أثناء تشغيل الموقع، لذلك نصدّر من D1 **في خطوة البناء** ثم نولّد `out/`:

1. في لوحة Pages → **Settings → Environment variables** (للبناء): أضف **`CLOUDFLARE_API_TOKEN`** (صلاحيات تشمل قراءة D1 لنفس الحساب)، ويفضّل **`CLOUDFLARE_ACCOUNT_ID`**.
2. غيّر **Build command** إلى:
   ```bash
   npm run build:pages
   ```
   (هذا يشغّل `articles:export-from-d1` ثم `build:static` فينزل كل المقالات المنشورة من D1 إلى `content/blog/` ثم يبني الموقع.)
3. **Build output directory** يبقى: `out`.

لو أردت بناء Pages من Git فقط بدون استعلام D1: استخدم `npm run build:static` كما كان، مع التأكد أن ملفات `content/blog/*.md` مكتملة في الريبو.
- ثم البناء والنشر إلى Cloudflare كالمعتاد:  
  `npm run deploy:cf`

> **الدمج:** ما في هذا المجلد (وما يُكمله من العرض التجريبي) يتقدّم على مقال D1 إن كانا نفس المقال (slug أو مرادف). باقي المقالات المنشورة في D1 تظهر في المدونة تلقائياً.
