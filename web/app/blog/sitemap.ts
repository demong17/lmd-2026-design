import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/site-index";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries("posts");
}
