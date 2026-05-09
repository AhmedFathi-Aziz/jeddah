import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

declare global {
  /** Google Analytics 4 (يُحقَن عند تعيين NEXT_PUBLIC_GA_MEASUREMENT_ID) */
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }

  /** ربط D1 وكلمة سر الإدارة ودلو الصور على R2 (اختياري حتى تهيئة الحساب) */
  interface CloudflareEnv {
    DB: D1Database;
    ARTICLES_ADMIN_SECRET?: string;
    /** رفع الغلافات؛ أضِف الربط في wrangler بعد إنشاء الدلو وتفعيل R2 */
    UPLOADS?: R2Bucket;
  }
}

export {};
