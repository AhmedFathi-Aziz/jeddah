"use server";

import { redirect } from "next/navigation";

export async function subscribeNewsletter(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    redirect("/blog?newsletter=invalid");
  }
  redirect("/blog?newsletter=ok");
}
