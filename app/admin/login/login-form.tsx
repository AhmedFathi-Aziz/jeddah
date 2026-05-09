"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "فشل تسجيل الدخول");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-right">
      <h1 className="text-2xl font-bold text-primary">دخول لوحة المقالات</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div className="space-y-2">
          <label htmlFor="admin-pass" className="text-sm font-medium">
            كلمة سر الإدارة
          </label>
          <Input
            id="admin-pass"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            className="h-10"
            required
          />
        </div>
        {error && (
          <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className={cn(buttonVariants({ size: "default" }), "w-full font-bold")}
        >
          {pending ? "جارٍ التحقق…" : "دخول"}
        </button>
      </form>
    </main>
  );
}
