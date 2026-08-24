import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InteriorPage } from "@/components/pages/InteriorPage";
import { getInteriorPage, getInteriorSlugs } from "@/lib/pages";
import { OG_IMAGE, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getInteriorSlugs("blog").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getInteriorPage("blog", slug);
  if (!page) return {};
  const path = `/blog/${slug}`;
  return {
    title: page.title.replace(" | Live Media Digital", ""),
    description: page.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: { title: page.title, description: page.description, url: `${SITE_URL}${path}`, images: [OG_IMAGE] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getInteriorPage("blog", slug);
  if (!page) notFound();
  return <InteriorPage page={page} />;
}
