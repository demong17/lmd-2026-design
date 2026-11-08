import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SearchHitList } from "@/components/search/SearchHitList";
import { SiteSearchForm } from "@/components/search/SiteSearchForm";
import { parseSearchQuery, SEARCH_SUGGESTIONS, searchSite } from "@/lib/search";
import { breadcrumbSchema, SITE_URL, webPageSchema } from "@/lib/site";

function queryFrom(searchParams: { q?: string | string[] }) {
  return parseSearchQuery(searchParams.q);
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}): Promise<Metadata> {
  const query = queryFrom(await searchParams);
  return {
    title: query ? `Search results for “${query}”` : "Search",
    description: query
      ? `Pages, services, and articles on Live Media Digital matching “${query}”.`
      : "Search Live Media Digital services, industries, case studies, FAQs, and articles.",
    robots: { index: false, follow: true },
    alternates: { canonical: `${SITE_URL}/search` },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const query = queryFrom(await searchParams);
  const results = query ? searchSite(query) : [];
  const hasQuery = Boolean(query);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
        ])}
      />
      <JsonLd
        data={{
          ...webPageSchema({
            name: hasQuery ? `Search results for “${query}”` : "Search",
            path: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
            description: hasQuery
              ? `Pages, services, and articles matching “${query}”.`
              : "Search Live Media Digital services, industries, case studies, FAQs, and articles.",
            type: "SearchResultsPage",
          }),
          ...(results.length
            ? {
                mainEntity: {
                  "@type": "ItemList",
                  numberOfItems: results.length,
                  itemListElement: results.slice(0, 10).map((hit, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    name: hit.title,
                    url: `${SITE_URL}${hit.path}`,
                  })),
                },
              }
            : {}),
        }}
      />
      <main className="search-page">
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              Search
            </p>
            <p className="eyebrow center">SEARCH</p>
            <h1>{hasQuery ? "Results" : "Search the site"}</h1>
            <p className="section-sub center">
              {hasQuery
                ? `${results.length} ${results.length === 1 ? "match" : "matches"} for “${query}”.`
                : "Find a service, industry, city, case study, FAQ, or article."}
            </p>
            <SiteSearchForm defaultQuery={query} autoFocus={!hasQuery} />
          </div>
        </section>

        <section className="search-results">
          <div className="container">
            {!hasQuery ? (
              <div className="search-empty">
                <p>Try a topic we cover every week.</p>
                <ul className="search-suggestions">
                  {SEARCH_SUGGESTIONS.map((term) => (
                    <li key={term}>
                      <Link href={`/search?q=${encodeURIComponent(term)}`}>{term}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : results.length === 0 ? (
              <div className="search-empty">
                <p>
                  No pages matched “{query}”. Try a broader term, or start with one of these.
                </p>
                <ul className="search-suggestions">
                  {SEARCH_SUGGESTIONS.map((term) => (
                    <li key={term}>
                      <Link href={`/search?q=${encodeURIComponent(term)}`}>{term}</Link>
                    </li>
                  ))}
                </ul>
                <p className="search-empty-cta">
                  Still stuck? <Link href="/contact">Talk with a strategist</Link> or browse{" "}
                  <Link href="/services/search-engine-optimization">SEO</Link>.
                </p>
              </div>
            ) : (
              <SearchHitList hits={results} />
            )}
          </div>
        </section>
      </main>
    </>
  );
}
