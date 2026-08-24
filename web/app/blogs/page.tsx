import type { Metadata } from "next";
import Link from "next/link";
import { getInteriorPage, getInteriorSlugs } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description: "Learn, build, and grow with Live Media Digital.",
  alternates: { canonical: `${SITE_URL}/blogs` },
};

export default function BlogsPage() {
  const slugs = getInteriorSlugs("blog");
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Resources
          </p>
          <h1>Learn, build, and grow with Live Media Digital.</h1>
        </div>
      </section>
      <section className="detail-section">
        <div className="container">
          <div className="related-grid reveal">
            {slugs.map((slug) => {
              const page = getInteriorPage("blog", slug);
              if (!page) return null;
              return (
                <Link href={`/blog/${slug}`} className="related-card" key={slug}>
                  <span className="related-tag">ARTICLE</span>
                  <strong>{page.h1}</strong>
                  <span>{page.description}</span>
                  <span className="related-arrow">Read article →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
