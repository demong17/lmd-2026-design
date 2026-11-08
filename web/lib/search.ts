import { getBlogPostsWithBody } from "@/lib/blog";
import { PAGE_FAQS } from "@/lib/faqs";
import { interiorPages, pagePath, type InteriorRecord } from "@/lib/pages";
import type { SearchHit, SearchType } from "@/lib/search-types";
import { HOME_FAQS, SERVICES, SITE_NAME } from "@/lib/site";

export type { SearchHit, SearchType } from "@/lib/search-types";

type SearchDoc = {
  path: string;
  title: string;
  type: SearchType;
  description: string;
  body: string;
};

const SYNONYMS: Record<string, string[]> = {
  seo: ["search engine optimization"],
  sem: ["search engine marketing", "paid search"],
  ppc: ["pay per click", "paid search"],
  smm: ["social media marketing"],
  aeo: ["answer engine optimization"],
  geo: ["generative engine optimization"],
};

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "at",
  "for",
  "from",
  "in",
  "is",
  "of",
  "on",
  "or",
  "our",
  "the",
  "to",
  "with",
  "your",
]);

const TYPE_BY_GROUP: Record<string, SearchType> = {
  services: "Service",
  industries: "Industry",
  "service-areas": "Service area",
  "case-studies": "Case study",
};

const STATIC_PAGES: Array<{
  path: string;
  title: string;
  type: SearchType;
  description: string;
  body: string;
}> = [
  {
    path: "/",
    title: SITE_NAME,
    type: "Page",
    description:
      "South Florida digital marketing agency serving clients nationwide. SEO, paid search, social, web design and content built around one goal: more leads.",
    body: [
      "home digital marketing agency miami doral seo sem social media web design content email aeo geo voice agents",
      SERVICES.map((service) => `${service.title} ${service.blurb}`).join(" "),
      HOME_FAQS.map((item) => `${item.q} ${"schemaA" in item && item.schemaA ? item.schemaA : item.a}`).join(" "),
    ].join(" "),
  },
  {
    path: "/about-us",
    title: "About Us",
    type: "Page",
    description:
      "Live Media Digital is a premium digital marketing agency in Miami. We build digital strategies that bring more leads, conversions, repeat customers, and more sales.",
    body: "we are live media digital miami agency brand services integrated digital strategies web development business process management boost revenue meet our team abe schneider",
  },
  {
    path: "/services",
    title: "Digital Marketing Services",
    type: "Page",
    description:
      "SEO, paid search, social, web, content, email, and AI from one Miami in-house team. Every service planned together and tracked to real leads.",
    body: "services hub seo sem social web development content email aeo geo voice agents ecommerce automation software infrastructure",
  },
  {
    path: "/process",
    title: "Our Process",
    type: "Page",
    description:
      "How Live Media Digital builds your strategy: a free audit, a custom plan, and a launch built to be tracked and optimized every month.",
    body: "audit custom plan launch optimize roi monthly reporting strategy",
  },
  {
    path: "/contact",
    title: "Contact",
    type: "Page",
    description: "Talk to a Live Media Digital strategist about SEO, paid media, web, and growth for your South Florida business.",
    body: "email phone doral letschat consultation strategy call",
  },
  {
    path: "/consultation",
    title: "Free Consultation",
    type: "Page",
    description: "Book a free strategy session with Live Media Digital. Tell us your goals, budget, and what you need.",
    body: "free consultation strategy session budget seo sem social web email aeo letschat",
  },
  {
    path: "/faqs",
    title: "Digital Marketing FAQs",
    type: "FAQ",
    description:
      "Answers to common questions about SEO, SEM, paid search, and digital marketing from Live Media Digital.",
    body: PAGE_FAQS.map((item) => `${item.q} ${item.a.join(" ")}`).join(" "),
  },
  {
    path: "/blog",
    title: "Resources",
    type: "Page",
    description:
      "Digital marketing guides from Live Media Digital: SEO, paid media, web, email, and growth for South Florida businesses.",
    body: "blog articles resources guides",
  },
  {
    path: "/case-studies",
    title: "Case Studies",
    type: "Page",
    description: "Real businesses. Real results from Live Media Digital campaigns across South Florida.",
    body: "case studies results leads revenue clients",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    type: "Page",
    description:
      "How Live Media Digital collects, uses, and protects information on livemediadigital.com, including forms, cookies, analytics, and ads.",
    body: "privacy cookies analytics personal information",
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service",
    type: "Page",
    description:
      "Terms for using livemediadigital.com, including free consultations, AI visibility reports, and how paid agency work is scoped separately.",
    body: "terms of service legal agreement",
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy",
    type: "Page",
    description:
      "How Live Media Digital uses necessary, analytics, and advertising cookies on livemediadigital.com, and how to change your preferences.",
    body: "cookies analytics advertising preferences",
  },
];

export const SEARCH_SUGGESTIONS = ["SEO", "SEM", "Coral Gables", "email marketing", "roofing", "FAQs"] as const;

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function flattenInterior(page: InteriorRecord) {
  const parts = [page.h1, page.title, page.description, page.heroSub, page.eyebrow, page.cta, page.ctaSub];
  for (const section of page.sections) {
    parts.push(section.heading, section.sub, ...section.items, ...section.paras);
    for (const card of section.cards) {
      parts.push(card.tag, card.title, card.copy);
    }
  }
  return parts.filter(Boolean).join(" ");
}

function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = STATIC_PAGES.map((page) => ({
    path: page.path,
    title: page.title,
    type: page.type,
    description: page.description,
    body: `${page.title} ${page.description} ${page.body}`,
  }));

  for (const page of interiorPages) {
    const type = TYPE_BY_GROUP[page.group];
    if (!type) continue;
    docs.push({
      path: pagePath(page),
      title: page.h1 || page.title.replace(" | Live Media Digital", ""),
      type,
      description: page.description,
      body: flattenInterior(page),
    });
  }

  for (const post of getBlogPostsWithBody()) {
    docs.push({
      path: post.path,
      title: post.title,
      type: "Article",
      description: post.excerpt,
      body: `${post.title} ${post.excerpt} ${stripHtml(post.html)}`,
    });
  }

  return docs;
}

const INDEX = buildIndex();

export function getSearchTitles() {
  return Array.from(new Set(INDEX.map((doc) => doc.title))).sort((a, b) => a.localeCompare(b));
}

export function parseSearchQuery(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return (value ?? "").trim().slice(0, 120);
}

function normalize(text: string) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function expandedPhrases(tokens: string[]) {
  return tokens.flatMap((token) => SYNONYMS[token] ?? []);
}

function tokenize(text: string) {
  return normalize(text)
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 2 && !STOPWORDS.has(token));
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlight(text: string, tokens: string[]) {
  let html = escapeHtml(text);
  const unique = Array.from(new Set(tokens)).sort((a, b) => b.length - a.length);
  for (const token of unique) {
    const pattern = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    html = html.replace(new RegExp(`(${pattern})`, "gi"), "<mark>$1</mark>");
  }
  return html;
}

function snippetAround(text: string, tokens: string[]) {
  const compact = text.replace(/\s+/g, " ").trim();
  const lower = normalize(compact);
  let index = -1;
  for (const token of tokens) {
    index = lower.indexOf(token);
    if (index !== -1) break;
  }
  if (index === -1) {
    return compact.slice(0, 180);
  }
  const start = Math.max(0, index - 70);
  const end = Math.min(compact.length, index + 110);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < compact.length ? "…" : "";
  return `${prefix}${compact.slice(start, end).trim()}${suffix}`;
}

function scoreDoc(doc: SearchDoc, tokens: string[], phrase: string) {
  const title = normalize(doc.title);
  const description = normalize(doc.description);
  const body = normalize(doc.body);
  let score = 0;

  if (phrase.length >= 3 && title.includes(phrase)) score += 50;
  else if (phrase.length >= 3 && description.includes(phrase)) score += 18;
  else if (phrase.length >= 3 && body.includes(phrase)) score += 8;

  for (const extra of expandedPhrases(tokens)) {
    if (title.includes(extra)) score += 42;
    else if (description.includes(extra)) score += 16;
    else if (body.includes(extra)) score += 6;
  }

  for (const token of tokens) {
    const inTitle = title.includes(token);
    const inDescription = description.includes(token);
    const inBody = body.includes(token);
    if (!inTitle && !inDescription && !inBody && !expandedPhrases([token]).some((extra) => title.includes(extra) || description.includes(extra) || body.includes(extra))) {
      return 0;
    }
    if (inTitle) score += 22;
    if (inDescription) score += 10;
    if (inBody) score += 3;
  }

  const typeBoost: Record<SearchType, number> = {
    Service: 18,
    Industry: 6,
    "Service area": 4,
    "Case study": 8,
    Article: 2,
    FAQ: 5,
    Page: 1,
  };
  return score + typeBoost[doc.type];
}

export function searchSite(rawQuery: string, limit = 40): SearchHit[] {
  const query = parseSearchQuery(rawQuery);
  const tokens = tokenize(query);
  if (!query || tokens.length === 0) return [];

  const phrase = normalize(query);
  return INDEX.map((doc) => {
    const score = scoreDoc(doc, tokens, phrase);
    if (score <= 0) return null;
    const haystack = tokens.some((token) => normalize(doc.description).includes(token))
      ? doc.description
      : doc.body;
    const snippet = snippetAround(haystack, tokens);
    return {
      path: doc.path,
      title: doc.title,
      type: doc.type,
      description: doc.description,
      snippet,
      snippetHtml: highlight(snippet, tokens),
      score,
    };
  })
    .filter((hit): hit is SearchHit => Boolean(hit))
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
