"use client";

import { ArticleForm } from "./article-form";
import { ArticleManagement } from "./article-management";

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-2">
      <ArticleForm />
      <ArticleManagement />
    </div>
  );
}
