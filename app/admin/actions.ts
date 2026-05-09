"use server";

import { createArticleFromForm } from "@/lib/articles/create-article-from-form";

/** احتياطي — الواجهة تستخدم `/api/admin/articles/create` على الإنتاج */
export async function submitNewArticle(_prevState: unknown, formData: FormData) {
  return createArticleFromForm(formData);
}
