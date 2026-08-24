import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/pages/InteriorPage";
import { JsonLd } from "@/components/JsonLd";
import { getInteriorPage, getInteriorSlugs, pagePath } from "@/lib/pages";
import { OG_IMAGE, SITE_URL, serviceSchema } from "@/lib/site";

export function generateStaticParams() {
  return getInteriorSlugs("services").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getInteriorPage("services", slug);
  if (!page) return {};
  const path = pagePath(page);
  return {
    title: page.title.replace(" | Live Media Digital", ""),
    description: page.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title: page.title, description: page.description, url: `${SITE_URL}${path}`, images: [OG_IMAGE] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getInteriorPage("services", slug);
  if (!page) notFound();
  return (
    <>
      <JsonLd data={serviceSchema(page.h1, page.description, pagePath(page))} />
      <InteriorPage page={page} />
    </>
  );
}
