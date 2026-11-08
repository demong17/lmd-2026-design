import type { Metadata } from "next";
import Link from "next/link";
import { BlogCard } from "@/components/blog/BlogCard";
import { JsonLd } from "@/components/JsonLd";
import { getBlogPosts } from "@/lib/blog";
import { breadcrumbSchema, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description: "Digital marketing guides from Live Media Digital: SEO, paid media, web, email, and growth for South Florida businesses.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: { "application/rss+xml": `${SITE_URL}/rss.xml` },
  },
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resources", path: "/blog" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Live Media Digital Resources",
          url: `${SITE_URL}/blog`,
          description: metadata.description,
          isPartOf: { "@id": `${SITE_URL}/#website` },
        }}
      />
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Resources
          </p>
          <p className="eyebrow center">RESOURCES</p>
          <h1>Ideas that help you get found, and get hired.</h1>
          <p className="section-sub center">SEO, paid media, web, and email, written for owners who want more of the right leads, not more noise.</p>
        </div>
      </section>
      <section className="resources">
        <div className="container">
          {featured ? (
            <div className="blog-featured-wrap">
              <BlogCard post={featured} featured headingAs="h2" />
            </div>
          ) : null}
          <div className="blog-grid">
            {rest.map((post) => (
              <BlogCard post={post} headingAs="h2" key={post.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
