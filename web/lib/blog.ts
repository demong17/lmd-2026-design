import posts from "./blog/posts.json";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type BlogPost = {
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  imageAlt: string;
  minutes: number;
  html: string;
};

export type BlogPostMeta = Omit<BlogPost, "html">;

const allPosts = posts as BlogPost[];
const bySlug = new Map(allPosts.map((post) => [post.slug, post]));

export function getBlogPosts(): BlogPostMeta[] {
  return allPosts.map(({ html: _html, ...meta }) => meta);
}

export function getBlogPostsWithBody(): BlogPost[] {
  return allPosts;
}

export function getBlogPost(slug: string) {
  return bySlug.get(slug);
}

export function getRelatedPosts(slug: string, count = 3): BlogPostMeta[] {
  return getBlogPosts()
    .filter((post) => post.slug !== slug)
    .slice(0, count);
}

export function formatPostDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function postCoverAlt(post: Pick<BlogPostMeta, "title" | "imageAlt">) {
  const alt = post.imageAlt?.trim() ?? "";
  if (!alt || alt.toLowerCase() === post.title.toLowerCase()) {
    return `Cover image for ${post.title}`;
  }
  return alt;
}

export function articleSchema(post: BlogPost, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: post.image ? `${SITE_URL}${post.image}` : undefined,
    mainEntityOfPage: url,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/lmd/favicon.png`,
      },
    },
  };
}
