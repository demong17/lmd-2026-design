import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { faqPageSchema, localBusinessSchema, OG_IMAGE_META, SITE_URL, webPageSchema, webSiteSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Live Media Digital — Sharp Strategies, Serious Results" },
  description:
    "South Florida digital marketing agency serving clients nationwide. SEO, paid search, social, web design and content built around one goal: more leads for businesses of every size.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Live Media Digital — Sharp Strategies, Serious Results",
    description:
      "South Florida digital marketing agency serving clients nationwide. SEO, paid search, social, web design and content built around one goal: more leads for businesses of every size.",
    url: `${SITE_URL}/`,
    images: [OG_IMAGE_META],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Media Digital — Sharp Strategies, Serious Results",
    description:
      "South Florida digital marketing agency serving clients nationwide. SEO, paid search, social, web design and content built around one goal: more leads for businesses of every size.",
    images: [OG_IMAGE_META],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <JsonLd data={webSiteSchema()} />
      <JsonLd
        data={webPageSchema({
          name: "Miami Digital Marketing Agency",
          path: "/",
          description:
            "South Florida digital marketing agency serving clients nationwide. SEO, paid search, social, web design and content built around one goal: more leads for businesses of every size.",
        })}
      />
      <JsonLd data={faqPageSchema()} />
      <HomePage />
    </>
  );
}
