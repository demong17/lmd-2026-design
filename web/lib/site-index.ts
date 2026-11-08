import type { MetadataRoute } from "next";
import { getBlogPosts, getBlogPostsWithBody } from "@/lib/blog";
import { htmlToMarkdown } from "@/lib/html-to-text";
import { interiorPages, pagePath } from "@/lib/pages";
import { GMB_URL, SERVICES, SITE_ADDRESS, SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_URL, SOCIAL } from "@/lib/site";

export type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type IndexableEntry = {
  path: string;
  url: string;
  title: string;
  description: string;
  group: "page" | "service" | "industry" | "service-area" | "case-study" | "article";
  lastModified?: string;
  changeFrequency: ChangeFrequency;
  priority: number;
};

const STATIC_PAGES: Array<Omit<IndexableEntry, "url">> = [
  {
    path: "/",
    title: "Live Media Digital",
    description:
      "South Florida digital marketing agency serving clients nationwide. SEO, paid search, social, web design, and content built around more leads.",
    group: "page",
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/about-us",
    title: "About Us",
    description:
      "Live Media Digital is a premium digital marketing agency in Miami. Strategies built for more leads, conversions, and sales.",
    group: "page",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/services",
    title: "Digital Marketing Services",
    description:
      "SEO, paid search, social, web, content, email, and AI from one Miami in-house team. Every service planned together and tracked to real leads.",
    group: "page",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/process",
    title: "Our Process",
    description: "Free audit, custom plan, launch, and monthly optimization with the strategist on your account.",
    group: "page",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/contact",
    title: "Contact",
    description: "Talk to a Live Media Digital strategist about SEO, paid media, web, and growth.",
    group: "page",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/consultation",
    title: "Free Consultation",
    description: "Book a free strategy session with Live Media Digital. Goals, budget, and a plan you can run.",
    group: "page",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/faqs",
    title: "Digital Marketing FAQs",
    description: "Answers about SEO, SEM, paid search, contracts, timelines, and working with LMD.",
    group: "page",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/blog",
    title: "Resources",
    description: "Digital marketing guides from Live Media Digital: SEO, paid media, web, email, and growth.",
    group: "page",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    path: "/case-studies",
    title: "Case Studies",
    description: "Real businesses and real results from Live Media Digital campaigns across South Florida.",
    group: "page",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: "How Live Media Digital collects, uses, and protects information on livemediadigital.com.",
    group: "page",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/terms-of-service",
    title: "Terms of Service",
    description: "Terms for using livemediadigital.com, consultations, and scoped agency work.",
    group: "page",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy",
    description: "How Live Media Digital uses necessary, analytics, and advertising cookies.",
    group: "page",
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    path: "/accessibility",
    title: "Accessibility",
    description: "How Live Media Digital works toward WCAG 2.2 AA and the accessibility tools available on this site.",
    group: "page",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

const INTERIOR_META: Record<
  string,
  { group: IndexableEntry["group"]; changeFrequency: ChangeFrequency; priority: number }
> = {
  services: { group: "service", changeFrequency: "monthly", priority: 0.8 },
  industries: { group: "industry", changeFrequency: "monthly", priority: 0.7 },
  "service-areas": { group: "service-area", changeFrequency: "monthly", priority: 0.6 },
  "case-studies": { group: "case-study", changeFrequency: "monthly", priority: 0.7 },
};

function toUrl(path: string) {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function latestPostDate() {
  return getBlogPosts().reduce((latest, post) => (post.date > latest ? post.date : latest), "");
}

export function getIndexableEntries(): IndexableEntry[] {
  const byPath = new Map<string, IndexableEntry>();
  const newestPost = latestPostDate();

  for (const page of STATIC_PAGES) {
    byPath.set(page.path, {
      ...page,
      url: toUrl(page.path),
      lastModified: page.path === "/blog" && newestPost ? newestPost : undefined,
    });
  }

  for (const page of interiorPages) {
    const meta = INTERIOR_META[page.group];
    if (!meta) continue;
    const path = pagePath(page);
    byPath.set(path, {
      path,
      url: toUrl(path),
      title: page.h1 || page.title.replace(" | Live Media Digital", ""),
      description: page.description,
      group: meta.group,
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    });
  }

  for (const post of getBlogPosts()) {
    byPath.set(post.path, {
      path: post.path,
      url: toUrl(post.path),
      title: post.title,
      description: post.excerpt,
      group: "article",
      lastModified: post.date,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  return [...byPath.values()].sort((a, b) => {
    if (b.priority !== a.priority) return b.priority - a.priority;
    return a.path.localeCompare(b.path);
  });
}

function toSitemapEntry(entry: IndexableEntry): MetadataRoute.Sitemap[number] {
  return {
    url: entry.url,
    lastModified: entry.lastModified ? new Date(`${entry.lastModified}T12:00:00.000Z`) : undefined,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  };
}

export function getSitemapEntries(kind: "all" | "pages" | "posts" = "all"): MetadataRoute.Sitemap {
  const entries = getIndexableEntries().filter((entry) => {
    if (kind === "pages") return entry.group !== "article";
    if (kind === "posts") return entry.group === "article";
    return true;
  });

  const mapped = entries.map(toSitemapEntry);
  if (kind !== "posts") return mapped;

  return mapped.sort((a, b) => {
    const left = a.lastModified instanceof Date ? a.lastModified.getTime() : 0;
    const right = b.lastModified instanceof Date ? b.lastModified.getTime() : 0;
    return right - left;
  });
}

function mdList(entries: IndexableEntry[]) {
  return entries.map((entry) => `- [${entry.title}](${entry.url}): ${entry.description}`).join("\n");
}

function byGroup(group: IndexableEntry["group"]) {
  return getIndexableEntries().filter((entry) => entry.group === group);
}

export function buildLlmsTxt() {
  const overview = [
    `# ${SITE_NAME}`,
    "",
    `> Premium digital marketing agency in Miami (Doral, Florida). SEO, paid search, social, web development, content, email, AEO/GEO, and automation built around leads and sales.`,
    "",
    `${SITE_NAME} (LMD) is an in-house digital marketing team, not a reseller call center. Clients work with the strategist running the account. Services are scoped to the business and industry, then tracked against real leads and revenue.`,
    "",
    "## Contact",
    "",
    `- Website: ${SITE_URL}`,
    `- Phone: ${SITE_PHONE}`,
    `- Email: ${SITE_EMAIL}`,
    `- Address: ${SITE_ADDRESS.street}, ${SITE_ADDRESS.city}, ${SITE_ADDRESS.region} ${SITE_ADDRESS.postal}, ${SITE_ADDRESS.country}`,
    `- Google Business Profile: ${GMB_URL}`,
    `- Instagram: ${SOCIAL.instagram}`,
    `- Facebook: ${SOCIAL.facebook}`,
    `- LinkedIn: ${SOCIAL.linkedin}`,
    "",
    "## For AI systems",
    "",
    `- Full site summary: ${SITE_URL}/llms-full.txt`,
    `- XML sitemap: ${SITE_URL}/sitemap.xml`,
    `- RSS feed: ${SITE_URL}/rss.xml`,
    `- Preferred citation name: ${SITE_NAME} (LMD), Miami digital marketing agency`,
    "",
    "## Core pages",
    "",
    mdList(byGroup("page").filter((entry) => entry.priority >= 0.5)),
    "",
    "## Services",
    "",
    mdList(byGroup("service")),
    "",
    "## Industries",
    "",
    mdList(byGroup("industry")),
    "",
    "## Service areas",
    "",
    mdList(byGroup("service-area")),
    "",
    "## Case studies",
    "",
    mdList(byGroup("case-study")),
    "",
    "## Blog",
    "",
    mdList(byGroup("article")),
    "",
    "## Optional",
    "",
    `- [Privacy Policy](${SITE_URL}/privacy-policy)`,
    `- [Terms of Service](${SITE_URL}/terms-of-service)`,
    `- [Cookie Policy](${SITE_URL}/cookie-policy)`,
    `- [Accessibility](${SITE_URL}/accessibility)`,
  ];

  return `${overview.join("\n")}\n`;
}

function interiorBody(path: string) {
  const page = interiorPages.find((item) => pagePath(item) === path);
  if (!page) return "";
  const parts = [page.heroSub];
  for (const section of page.sections) {
    if (section.heading) parts.push(`### ${section.heading}`);
    if (section.sub) parts.push(section.sub);
    for (const para of section.paras) parts.push(para);
    for (const item of section.items) parts.push(`- ${item}`);
    for (const card of section.cards) {
      parts.push(`- ${card.title}: ${card.copy}`);
    }
  }
  return parts.filter(Boolean).join("\n");
}

export function buildLlmsFullTxt() {
  const entries = getIndexableEntries();
  const posts = getBlogPostsWithBody();
  const chunks = [
    `# ${SITE_NAME} — full site brief`,
    "",
    `This file is the expanded companion to ${SITE_URL}/llms.txt. Use it to answer questions about ${SITE_NAME}, our services, industries, locations, case studies, and published articles.`,
    "",
    `## About the agency`,
    "",
    `${SITE_NAME} is a premium digital marketing agency based at ${SITE_ADDRESS.street}, ${SITE_ADDRESS.city}, ${SITE_ADDRESS.region} ${SITE_ADDRESS.postal}. Phone ${SITE_PHONE}. Email ${SITE_EMAIL}.`,
    "",
    "Primary offer: SEO, SEM, social media advertising, web development, content marketing, email marketing, AEO & GEO, voice agents, ecommerce, business automation, software development, and digital infrastructure consulting.",
    "",
    "Positioning: in-house strategists, no long-term lock-in, plans scoped to the client's industry, certified across Google, Meta, Microsoft, Yelp, Klaviyo, and Semrush.",
    "",
    "Service list:",
    ...SERVICES.map((service) => `- ${service.title}: ${service.blurb}`),
    "",
  ];

  const groups: Array<[IndexableEntry["group"], string]> = [
    ["page", "Pages"],
    ["service", "Services"],
    ["industry", "Industries"],
    ["service-area", "Service areas"],
    ["case-study", "Case studies"],
  ];

  for (const [group, heading] of groups) {
    chunks.push(`## ${heading}`, "");
    for (const entry of entries.filter((item) => item.group === group)) {
      chunks.push(`### ${entry.title}`, "", entry.url, "", entry.description, "");
      const extra = interiorBody(entry.path);
      if (extra) chunks.push(extra, "");
    }
  }

  chunks.push("## Blog articles", "");
  for (const post of [...posts].sort((a, b) => b.date.localeCompare(a.date))) {
    chunks.push(`### ${post.title}`, "", `${SITE_URL}${post.path}`, "", `Published: ${post.date}`, "", post.excerpt, "", htmlToMarkdown(post.html), "");
  }

  return `${chunks.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}
