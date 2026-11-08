import rawPages from "./pages.json";

export type PageCard = {
  href: string;
  tag: string;
  title: string;
  copy: string;
};

export type PageSection = {
  heading: string;
  sub: string;
  items: string[];
  paras: string[];
  cards: PageCard[];
};

export type InteriorRecord = {
  group: string;
  slug: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  heroSub: string;
  crumbs: { href: string; label: string }[];
  sections: PageSection[];
  cta: string;
  ctaSub: string;
};

export const interiorPages = rawPages as InteriorRecord[];

export function getInteriorPage(group: string, slug: string) {
  return interiorPages.find((page) => page.group === group && page.slug === slug);
}

export function getInteriorSlugs(group: string) {
  return interiorPages.filter((page) => page.group === group).map((page) => page.slug);
}

export function pagePath(page: InteriorRecord) {
  return `/${page.group}/${page.slug}`;
}

export function interiorBreadcrumbItems(page: InteriorRecord) {
  return page.crumbs
    .filter((crumb) => crumb.href && !crumb.href.includes("#"))
    .map((crumb) => ({ name: crumb.label, path: crumb.href }))
    .concat([{ name: page.h1, path: pagePath(page) }]);
}
