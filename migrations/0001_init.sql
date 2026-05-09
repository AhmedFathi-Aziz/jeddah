-- جدول المقالات (D1 / SQLite)

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  cover_image_url TEXT NOT NULL,
  cover_alt TEXT NOT NULL DEFAULT '',
  cover_width INTEGER NOT NULL DEFAULT 800,
  cover_height INTEGER NOT NULL DEFAULT 320,
  published INTEGER NOT NULL DEFAULT 1,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_pub_created ON articles (published, created_at DESC);
