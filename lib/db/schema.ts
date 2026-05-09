import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const articles = sqliteTable("articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull().default(""),
  coverImageUrl: text("cover_image_url").notNull(),
  coverAlt: text("cover_alt").notNull().default(""),
  coverWidth: integer("cover_width").notNull().default(800),
  coverHeight: integer("cover_height").notNull().default(320),
  /** 1 = منشور */
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at").notNull(),
  updatedAt: integer("updated_at").notNull(),
});

export type ArticleRow = typeof articles.$inferSelect;
