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
export const OG_IMAGE = `${SITE_URL}/assets/lmd/testimonials/ultimate-containers-pro.jpg`;

export const SOCIAL = {
  instagram: "https://www.instagram.com/livemediafl/",
  facebook: "https://www.facebook.com/LMDFlorida",
  linkedin: "https://www.linkedin.com/in/abe-rodriguez-4a4a3276/",
};

export const NAV_LINKS = [
  { href: "/process", label: "Process" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/about", label: "About" },
  { href: "/blogs", label: "Resources" },
  { href: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  { slug: "seo", title: "Search Engine Optimization", blurb: "Rank higher and stay there with technical, on-page, and off-page SEO." },
  { slug: "sem", title: "Search Engine Marketing", blurb: "Paid search on Google & Bing that gets qualified traffic fast." },
  { slug: "social-media-marketing", title: "Social Media Marketing", blurb: "Paid social campaigns that turn followers into customers." },
  { slug: "web-development", title: "Web Development", blurb: "Fast, mobile-friendly websites engineered to convert." },
  { slug: "content-marketing", title: "Content Marketing", blurb: "SEO-driven content and landing pages built to rank and sell." },
  { slug: "email-marketing", title: "Email Marketing", blurb: "Targeted campaigns that turn leads into repeat revenue." },
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
    a: 'Yes, in-house. We manage <a href="/services/sem">Google Ads and Local Services Ads</a> and <a href="/services/social-media-marketing">Meta advertising on Facebook and Instagram</a>, built around your actual service areas and tracked back to real leads, not just clicks.',
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

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    image: `${SITE_URL}/assets/images/mainLMD-stacked-navy-gold.png`,
    url: `${SITE_URL}/`,
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
    areaServed: "Florida",
    sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.linkedin],
  };
}

export function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: "schemaA" in item && item.schemaA ? item.schemaA : item.a.replace(/<[^>]+>/g, ""),
      },
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${SITE_URL}${path}`,
    areaServed: "Florida",
    provider: {
      "@type": "LocalBusiness",
      name: SITE_NAME,
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
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
