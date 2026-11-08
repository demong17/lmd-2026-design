import type { InteriorRecord } from "@/lib/pages";

export const SITE_URL = "https://livemediadigital.com";
export const SITE_NAME = "Live Media Digital";
export const SITE_PHONE = "(305) 918-2306";
export const SITE_PHONE_TEL = "+13059182306";
export const SITE_PHONE_E164 = "+1-305-918-2306";
export const SITE_EMAIL = "letschat@livemediadigital.com";
export const SITE_ADDRESS = {
  street: "3400 NW 78th Ave, Suite 109",
  city: "Doral",
  region: "FL",
  postal: "33122",
  country: "US",
};
export const OG_IMAGE_PATH = "/assets/lmd/og-share.jpg";
export const OG_IMAGE = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_META = {
  url: OG_IMAGE,
  width: 1024,
  height: 537,
  alt: "Live Media Digital — Miami digital marketing agency",
} as const;
export const GMB_URL = "https://maps.app.goo.gl/bJuY2Zo3LEMR97VD7";
export const SITE_GEO = {
  latitude: 25.806263,
  longitude: -80.323761,
};

export const SOCIAL = {
  instagram: "https://www.instagram.com/livemediafl/",
  facebook: "https://www.facebook.com/LMDFlorida",
  linkedin: "https://www.linkedin.com/in/abe-rodriguez-4a4a3276/",
};

export const SAME_AS = [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.linkedin, GMB_URL] as const;

export const SERVICE_CITIES = [
  { name: "Doral", path: "/contact" },
  { name: "Miami", path: "/service-areas/miami" },
  { name: "Miami Lakes", path: "/service-areas/miami-lakes" },
  { name: "Hialeah", path: "/service-areas/hialeah" },
  { name: "Coral Gables", path: "/service-areas/coral-gables" },
  { name: "Sweetwater", path: "/service-areas/sweetwater" },
] as const;

export const NAV_LINKS = [
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about-us", label: "About" },
  { href: "/blog", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  { slug: "search-engine-optimization", title: "Search Engine Optimization", blurb: "Rank higher and stay there with technical, on-page, and off-page SEO." },
  { slug: "search-engine-marketing", title: "Search Engine Marketing", blurb: "Paid search on Google & Bing that gets qualified traffic fast." },
  { slug: "social-media-paid-marketing", title: "Social Media Marketing", blurb: "Paid social campaigns that turn followers into customers." },
  { slug: "web-development", title: "Web Development", blurb: "Fast, mobile-friendly websites engineered to convert." },
  { slug: "miami-content-marketing", title: "Content Marketing", blurb: "SEO-driven content and landing pages built to rank and sell." },
  { slug: "email-marketing-agency-in-miami", title: "Email Marketing", blurb: "Targeted campaigns that turn leads into repeat revenue." },
  { slug: "aeo-geo", title: "AEO & GEO", blurb: "Get recommended by ChatGPT, Perplexity, and AI Overviews." },
  { slug: "voice-agents", title: "Voice Agents", blurb: "AI voice agents that answer, book, and qualify leads 24/7." },
  { slug: "ecommerce-development", title: "E-commerce Development", blurb: "Online stores engineered to convert browsers into buyers." },
  { slug: "business-automation", title: "Business Automation", blurb: "Connect your tools and automate the manual work eating your team's day." },
  { slug: "software-development", title: "Software Development", blurb: "Custom tools, portals, and integrations built around how you operate." },
  { slug: "digital-infrastructure-consulting", title: "Digital Infrastructure Consulting", blurb: "Hosting, security, and systems built to scale with your growth." },
] as const;

export const HOME_FAQS = [
  {
    q: "How much does this cost?",
    a: 'It depends on your business, your goals, and your market, so we don\'t quote a number until we understand those. Most engagements fall into our Launch, Grow, or Scale plans, and you\'ll get a straight answer on your free strategy call, not a sales pitch.',
    schemaA: "It depends on your business, your goals, and your market, so we don't quote a number until we understand those. Most engagements fall into our Launch, Grow, or Scale plans, and you'll get a straight answer on your free strategy call, not a sales pitch.",
  },
  {
    q: "Do I have to sign a long-term contract?",
    a: "No. We don't lock clients into long-term contracts. You stay because the results are working, not because you're stuck in an agreement.",
  },
  {
    q: "How do I know this will actually work for my business?",
    a: 'We don\'t guess. Every strategy starts with a free audit of your site, your market, and your competitors, so what we build is based on where you actually stand, not a template. Then we track it against real leads and revenue, so you can see what\'s working within weeks. The track record backs it up too: we\'ve taken a car wash from 2 locations to 80+, cut cost per lead for one of Florida\'s largest roofing companies, and scaled a medical clinic network to 16 locations. <a href="/case-studies">See the real case studies</a>.',
    schemaA: "We don't guess. Every strategy starts with a free audit of your site, your market, and your competitors, so what we build is based on where you actually stand, not a template. Then we track it against real leads and revenue, so you can see what's working within weeks. The track record backs it up too: we've taken a car wash from 2 locations to 80+, cut cost per lead for one of Florida's largest roofing companies, and scaled a medical clinic network to 16 locations.",
  },
  {
    q: "How long until I see results?",
    a: "Paid search and social can start generating leads within the first few weeks. SEO usually shows real movement in 3 to 6 months, then keeps compounding after that. We'll give you a realistic timeline for your specific market on the strategy call, not a generic promise.",
    schemaA: "Paid search and social can start generating leads within the first few weeks. SEO usually shows real movement in 3 to 6 months, then keeps compounding after that.",
  },
  {
    q: "What happens after I sign up?",
    a: 'A free audit of your site, SEO, and ad accounts, then a strategy built around what we actually find, not a templated package. <a href="/process">See our full process</a>.',
    schemaA: "A free audit of your site, SEO, and ad accounts, then a strategy built around what we actually find, not a templated package.",
  },
  {
    q: "How are you different from other agencies?",
    a: "You work directly with the strategist running your account, not a rotating account manager. Every plan is scoped to your industry, not copy-pasted from a template, and we're certified across Google, Meta, Microsoft, Yelp, Klaviyo, and Semrush.",
    schemaA: "You work directly with the strategist running your account, not a rotating account manager. Every plan is scoped to your industry, and we're certified across Google, Meta, Microsoft, Yelp, Klaviyo, and Semrush.",
  },
  {
    q: "Do you work with businesses like mine?",
    a: 'We\'ve built strategies across 27+ industries, from home services and healthcare to restaurants, legal, and multi-location franchises. <a href="/#industries">See industries we serve</a>.',
    schemaA: "We've built strategies across 27+ industries, from home services and healthcare to restaurants, legal, and multi-location franchises.",
  },
  {
    q: "Do you run Google and Facebook ads?",
    a: 'Yes, in-house. We manage <a href="/services/search-engine-marketing">Google Ads and Local Services Ads</a> and <a href="/services/social-media-paid-marketing">Meta advertising on Facebook and Instagram</a>, built around your actual service areas and tracked back to real leads, not just clicks.',
    schemaA: "Yes, in-house. We manage Google Ads and Local Services Ads and Meta advertising on Facebook and Instagram, built around your actual service areas and tracked back to real leads, not just clicks.",
  },
  {
    q: "Can you redesign my website, or do I need a separate web company?",
    a: 'We handle <a href="/services/web-development">web design and development</a> ourselves, one team building your site, SEO, and ad campaigns as one connected strategy instead of three vendors who don\'t talk to each other.',
    schemaA: "We handle web design and development ourselves, one team building your site, SEO, and ad campaigns as one connected strategy instead of three vendors who don't talk to each other.",
  },
  {
    q: "What are AI voice agents, and do I need one?",
    a: 'An <a href="/services/voice-agents">AI voice agent</a> answers your phone, books appointments, and qualifies leads 24/7, so a call after hours or during a rush doesn\'t go to voicemail. It matters most for businesses where a missed call means a lost job, like home services, medical, and legal.',
    schemaA: "An AI voice agent answers your phone, books appointments, and qualifies leads 24/7, so a call after hours or during a rush doesn't go to voicemail. It matters most for businesses where a missed call means a lost job, like home services, medical, and legal.",
  },
  {
    q: "Can you help my business show up in ChatGPT and AI search results?",
    a: 'Yes, that\'s <a href="/services/aeo-geo">AEO and GEO</a> (answer and generative engine optimization). As more customers ask ChatGPT, Perplexity, and Google AI Overviews for a recommendation instead of typing a search, we structure your content and listings to be part of that answer.',
    schemaA: "Yes, that's AEO and GEO (answer and generative engine optimization). As more customers ask ChatGPT, Perplexity, and Google AI Overviews for a recommendation instead of typing a search, we structure your content and listings to be part of that answer.",
  },
] as const;

function areaServedPlaces() {
  return [
    { "@type": "Country", name: "United States" },
    {
      "@type": "State",
      name: "Florida",
      containedInPlace: { "@type": "Country", name: "United States" },
    },
    ...SERVICE_CITIES.map((city) => ({
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "State", name: "Florida" },
    })),
  ];
}

function sectionByHeading(page: InteriorRecord, heading: string) {
  return page.sections.find((section) => section.heading.toLowerCase() === heading.toLowerCase());
}

function decodePageText(value: string) {
  return value.replace(/&middot;/gi, "·").replace(/&amp;/gi, "&").replace(/&nbsp;/gi, " ").trim();
}

export function localBusinessSchema() {
  const logo = `${SITE_URL}/assets/images/mainLMD-stacked-navy-gold.png`;
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    alternateName: "LMD",
    description:
      "South Florida digital marketing agency serving clients nationwide. SEO, paid search, social, web design, and content built around more leads.",
    image: logo,
    logo,
    url: SITE_URL,
    telephone: SITE_PHONE_E164,
    email: SITE_EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_ADDRESS.street,
      addressLocality: SITE_ADDRESS.city,
      addressRegion: SITE_ADDRESS.region,
      postalCode: SITE_ADDRESS.postal,
      addressCountry: SITE_ADDRESS.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_GEO.latitude,
      longitude: SITE_GEO.longitude,
    },
    hasMap: GMB_URL,
    areaServed: areaServedPlaces(),
    sameAs: [...SAME_AS],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE_PHONE_E164,
      email: SITE_EMAIL,
      contactType: "sales",
      areaServed: "US",
      availableLanguage: ["English", "Spanish"],
    },
    knowsAbout: SERVICES.map((service) => service.title),
    makesOffer: SERVICES.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_URL}/services/${service.slug}#service`,
        name: service.title,
        description: service.blurb,
        url: `${SITE_URL}/services/${service.slug}`,
      },
    })),
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageSchema({
  name,
  path,
  description,
  type = "WebPage",
}: {
  name: string;
  path: string;
  description?: string | null;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "SearchResultsPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    url: `${SITE_URL}${path}`,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export function faqPageSchema(
  items: ReadonlyArray<{ q: string; a: string; schemaA?: string } | { q: string; a: string[] }> = HOME_FAQS,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "schemaA" in item && item.schemaA
            ? item.schemaA
            : Array.isArray(item.a)
              ? item.a.join(" ")
              : item.a.replace(/<[^>]+>/g, ""),
      },
    })),
  };
}

export function serviceSchema(page: InteriorRecord) {
  const path = `/${page.group}/${page.slug}`;
  const url = `${SITE_URL}${path}`;
  const included = sectionByHeading(page, "What's included");
  const pairs = sectionByHeading(page, "Pairs well with");
  const audience = sectionByHeading(page, "Who this works best for");
  const matched = SERVICES.find((service) => service.slug === page.slug);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: page.h1,
    serviceType: matched?.title ?? decodePageText(page.eyebrow) ?? page.h1,
    description: page.description,
    url,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: areaServedPlaces(),
    mainEntityOfPage: url,
    ...(included?.items.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: included.heading,
            itemListElement: included.items.map((item, index) => ({
              "@type": "Offer",
              position: index + 1,
              itemOffered: { "@type": "Service", name: item },
            })),
          },
        }
      : {}),
    ...(pairs?.cards.length
      ? {
          isRelatedTo: pairs.cards.map((card) => ({
            "@type": "Service",
            name: card.title,
            url: `${SITE_URL}${card.href}`,
            description: card.copy,
          })),
        }
      : {}),
    ...(audience?.cards.length
      ? {
          audience: audience.cards.map((card) => ({
            "@type": "Audience",
            audienceType: card.title,
            description: card.copy,
          })),
        }
      : {}),
  };
}

export function caseStudySchema(page: InteriorRecord) {
  const path = `/${page.group}/${page.slug}`;
  const url = `${SITE_URL}${path}`;
  const challenge = sectionByHeading(page, "The challenge")?.paras.join(" ") ?? "";
  const approach = sectionByHeading(page, "Our approach")?.paras.join(" ") ?? "";
  const result = sectionByHeading(page, "The result")?.paras.join(" ") ?? "";
  const servicesUsed = sectionByHeading(page, "Services used in this project")?.cards ?? [];
  const articleBody = [challenge, approach, result].filter(Boolean).join(" ");

  return {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    "@id": `${url}#casestudy`,
    name: page.h1,
    headline: page.h1,
    description: page.description,
    url,
    inLanguage: "en-US",
    abstract: page.heroSub ? decodePageText(page.heroSub) : page.description,
    articleBody: articleBody || page.description,
    about: {
      "@type": "Organization",
      name: page.h1,
    },
    author: { "@id": `${SITE_URL}/#business` },
    publisher: { "@id": `${SITE_URL}/#business` },
    provider: { "@id": `${SITE_URL}/#business` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntityOfPage: url,
    ...(servicesUsed.length
      ? {
          mentions: servicesUsed.map((card) => ({
            "@type": "Service",
            name: card.title,
            url: `${SITE_URL}${card.href}`,
          })),
          keywords: servicesUsed.map((card) => card.title).join(", "),
        }
      : {}),
  };
}

export function serviceCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/services#collection`,
    name: "Digital Marketing Services",
    url: `${SITE_URL}/services`,
    description:
      "SEO, paid search, social, web, content, email, and AI from one Miami in-house team. Every service planned together and tracked to real leads.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/services/${service.slug}`,
        name: service.title,
        item: {
          "@type": "Service",
          "@id": `${SITE_URL}/services/${service.slug}#service`,
          name: service.title,
          description: service.blurb,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { "@id": `${SITE_URL}/#business` },
        },
      })),
    },
  };
}

export function caseStudyCollectionSchema(pages: InteriorRecord[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/case-studies#collection`,
    name: "Case Studies",
    url: `${SITE_URL}/case-studies`,
    description: "Real businesses and real results from Live Media Digital campaigns across South Florida.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: pages.map((page, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/${page.group}/${page.slug}`,
        name: page.h1,
        item: {
          "@type": "CaseStudy",
          "@id": `${SITE_URL}/${page.group}/${page.slug}#casestudy`,
          name: page.h1,
          description: page.description,
          url: `${SITE_URL}/${page.group}/${page.slug}`,
        },
      })),
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => item.path && !item.path.includes("#"))
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path === "/" ? "/" : item.path}`,
      })),
  };
}
