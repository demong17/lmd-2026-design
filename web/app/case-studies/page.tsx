import type { Metadata } from "next";
import Link from "next/link";
import { getInteriorSlugs, getInteriorPage } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Real businesses. Real results from Live Media Digital campaigns across South Florida.",
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

export default function CaseStudiesPage() {
  const slugs = getInteriorSlugs("case-studies");
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Case Studies
          </p>
          <p className="eyebrow center">CASE STUDIES</p>
          <h1>Real businesses. Real results.</h1>
        </div>
      </section>
      <section className="detail-section">
        <div className="container">
          <div className="related-grid reveal">
            {slugs.map((slug) => {
              const page = getInteriorPage("case-studies", slug);
              if (!page) return null;
              return (
                <Link href={`/case-studies/${slug}`} className="related-card" key={slug}>
                  <span className="related-tag">CASE STUDY</span>
                  <strong>{page.h1}</strong>
                  <span>{page.heroSub || page.description}</span>
                  <span className="related-arrow">Read case study →</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
