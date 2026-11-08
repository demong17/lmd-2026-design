import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const PRIVATE = ["/get-report", "/onboard", "/search", "/api/"];
const PUBLIC_HINTS = ["/", "/llms.txt", "/llms-full.txt", "/sitemap.xml", "/blog/sitemap.xml", "/rss.xml"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: PUBLIC_HINTS,
        disallow: PRIVATE,
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended"],
        allow: PUBLIC_HINTS,
        disallow: PRIVATE,
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/blog/sitemap.xml`],
    host: new URL(SITE_URL).host,
  };
}
