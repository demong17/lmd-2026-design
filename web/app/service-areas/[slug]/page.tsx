import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/pages/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { getInteriorPage, getInteriorSlugs, pagePath } from "@/lib/pages";
import { breadcrumbSchema, OG_IMAGE, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getInteriorSlugs("service-areas").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getInteriorPage("service-areas", slug);
  if (!page) return {};
  const path = pagePath(page);
  return {
    title: page.title.replace(" | Live Media Digital", ""),
    description: page.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title: page.title, description: page.description, url: `${SITE_URL}${path}`, images: [OG_IMAGE] },
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getInteriorPage("service-areas", slug);
  if (!page) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema(
          page.crumbs.filter((c) => c.href).map((c) => ({ name: c.label, path: c.href }))
            .concat([{ name: page.h1, path: pagePath(page) }]),
        )}
      />
      <InteriorPage page={page} />
    </>
  );
}
