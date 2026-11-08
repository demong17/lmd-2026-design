import slugs from "@/lib/blog/slugs.json";

export function isBlogPostPath(pathname: string) {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug || slug.includes("/")) return false;
  return (slugs as string[]).includes(slug);
}
