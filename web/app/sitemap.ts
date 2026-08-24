import type { MetadataRoute } from "next";
import { interiorPages, pagePath } from "@/lib/pages";
import { SITE_URL } from "@/lib/site";

const staticPaths = [
  "/",
  "/about",
  "/process",
  "/contact",
  "/blogs",
  "/case-studies",
  "/privacy-policy",
  "/terms-of-service",
  "/cookie-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamic = interiorPages.map((page) => pagePath(page));
  return [...staticPaths, ...dynamic].map((path) => ({
    url: `${SITE_URL}${path}`,
    priority: path === "/" ? 1 : path.startsWith("/services") || path.startsWith("/industries") ? 0.8 : 0.6,
  }));
}
