"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";

type Props = {
  text: string;
  className?: string;
  /** على خلفية داكنة — النص العريض والروابط بلون فاتح */
  tone?: "default" | "onDark";
};

function isInternalHref(href: string | undefined): href is string {
  return typeof href === "string" && href.startsWith("/");
}

/** فقرة واحدة من Markdown — عريض وروابط داخلية فقط */
export function CoverageInlineMarkdown({ text, className, tone = "default" }: Props) {
  const onDark = tone === "onDark";

  return (
    <span className={className}>
      <ReactMarkdown
        components={{
          p: ({ children }) => <>{children}</>,
          strong: ({ children }) => (
            <strong
              className={
                onDark
                  ? "font-bold text-white"
                  : "font-semibold text-[#163d57]"
              }
            >
              {children}
            </strong>
          ),
          a: ({ href, children }) =>
            isInternalHref(href) ? (
              <Link
                href={href}
                className={
                  onDark
                    ? "font-semibold text-white underline decoration-white/50 underline-offset-2 hover:decoration-white"
                    : "font-semibold text-[#1f7f8a] hover:underline"
                }
              >
                {children}
              </Link>
            ) : (
              <a
                href={href}
                className={
                  onDark
                    ? "font-semibold text-white underline decoration-white/50 underline-offset-2 hover:decoration-white"
                    : "font-semibold text-[#1f7f8a] hover:underline"
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {children}
              </a>
            ),
        }}
      >
        {text}
      </ReactMarkdown>
    </span>
  );
}
