function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripTags(value: string) {
  return decodeEntities(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

/** Convert stored post HTML into readable Markdown for LLM files. */
export function htmlToMarkdown(html: string) {
  const withBreaks = html
    .replace(/<\/(p|div|h1|h2|h3|h4|li|ul|ol)>/gi, "</$1>\n")
    .replace(/<br\s*\/?>/gi, "\n");

  const markdown = withBreaks
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_, inner) => `\n# ${stripTags(inner)}\n`)
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_, inner) => `\n## ${stripTags(inner)}\n`)
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_, inner) => `\n### ${stripTags(inner)}\n`)
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_, inner) => `\n#### ${stripTags(inner)}\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, inner) => `- ${stripTags(inner)}\n`)
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, inner) => {
      const label = stripTags(inner);
      return label ? `[${label}](${href})` : href;
    })
    .replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, (_, _tag, inner) => `**${stripTags(inner)}**`)
    .replace(/<(em|i)[^>]*>([\s\S]*?)<\/\1>/gi, (_, _tag, inner) => `*${stripTags(inner)}*`)
    .replace(/<[^>]+>/g, " ");

  return decodeEntities(markdown)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeHeading(value: string) {
  return stripTags(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** WordPress posts often start with an H1 that duplicates the page title. Keep a single H1. */
export function demoteArticleHeadings(html: string, title: string) {
  const titleKey = normalizeHeading(title);
  return html.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/gi, (_match, attrs: string, inner: string) => {
    if (titleKey && normalizeHeading(inner) === titleKey) return "";
    return `<h2${attrs}>${inner}</h2>`;
  });
}
