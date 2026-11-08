import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/pages/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { getInteriorPage, getInteriorSlugs, interiorBreadcrumbItems, pagePath } from "@/lib/pages";
import { breadcrumbSchema, caseStudySchema, OG_IMAGE, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getInteriorSlugs("case-studies").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getInteriorPage("case-studies", slug);
  if (!page) return {};
  const path = pagePath(page);
  return {
    title: page.title.replace(" | Live Media Digital", ""),
    description: page.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title: page.title, description: page.description, url: `${SITE_URL}${path}`, images: [OG_IMAGE] },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getInteriorPage("case-studies", slug);
  if (!page) notFound();
  return (
    <>
      <JsonLd data={breadcrumbSchema(interiorBreadcrumbItems(page))} />
      <JsonLd data={caseStudySchema(page)} />
      <InteriorPage page={page} />
    </>
  );
}
