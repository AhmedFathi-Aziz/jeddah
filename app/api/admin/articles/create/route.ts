import { NextResponse } from "next/server";

import { createArticleFromForm } from "@/lib/articles/create-article-from-form";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const result = await createArticleFromForm(formData);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { ok: false as const, message: "تعذّر معالجة الطلب." },
      { status: 500 },
    );
  }
}
