import { getBlogPosts } from "@/lib/blog";
import { SITE_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 3600;

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = [...getBlogPosts()].sort((a, b) => b.date.localeCompare(a.date));
  const latest = posts[0]?.date ? new Date(`${posts[0].date}T12:00:00Z`).toUTCString() : new Date().toUTCString();
  const items = posts
    .map((post) => {
      const url = `${SITE_URL}${post.path}`;
      const pubDate = new Date(`${post.date}T12:00:00Z`).toUTCString();
      const enclosure = post.image
        ? `\n      <enclosure url="${xmlEscape(`${SITE_URL}${post.image}`)}" type="image/jpeg" />`
        : "";
      return `    <item>
      <title>${xmlEscape(post.title)}</title>
      <link>${xmlEscape(url)}</link>
      <guid isPermaLink="true">${xmlEscape(url)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xmlEscape(post.excerpt)}</description>${enclosure}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xmlEscape(`${SITE_NAME} Resources`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>${xmlEscape("Digital marketing guides from Live Media Digital: SEO, paid media, web, email, and growth for South Florida businesses.")}</description>
    <language>en-us</language>
    <lastBuildDate>${latest}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <managingEditor>${xmlEscape(SITE_EMAIL)} (${xmlEscape(SITE_NAME)})</managingEditor>
    <webMaster>${xmlEscape(SITE_EMAIL)} (${xmlEscape(SITE_NAME)})</webMaster>
${items}
  </channel>
</rss>
`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
