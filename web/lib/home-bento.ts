export type HomeBentoService = {
  href: string;
  title: string;
  copy: string;
  video: string;
  extra: boolean;
  extraClass?: string;
};

export const HOME_BENTO_SERVICES: HomeBentoService[] = [
  { href: "/services/search-engine-optimization", title: "Search Engine Optimization", copy: "The foundation of every strategy. On-page, off-page, and technical SEO so you rank where it matters, and stay there.", video: "bento-seo", extra: false },
  { href: "/services/search-engine-marketing", title: "Search Engine Marketing", copy: "Paid search on Google & Bing that gets qualified traffic fast, ideal while your organic rankings are still building.", video: "bento-sem", extra: false },
  { href: "/services/social-media-paid-marketing", title: "Social Media Marketing", copy: "Paid campaigns on Facebook, Instagram and beyond that turn followers into customers, coordinated with your internal team.", video: "bento-social", extra: false },
  { href: "/services/web-development", title: "Web Development", copy: "Fast, mobile-friendly websites engineered to convert the traffic we drive, not just look good.", video: "bento-webdev", extra: false },
  { href: "/services/miami-content-marketing", title: "Content Marketing", copy: "SEO-driven content, blogs, and landing pages written to rank on Google and sell once they get there.", video: "bento-content", extra: false },
  { href: "/services/email-marketing-agency-in-miami", title: "Email Marketing", copy: "Targeted campaigns that turn warm leads and past customers into repeat revenue.", video: "bento-email", extra: false },
  { href: "/services/aeo-geo", title: "AEO & GEO", copy: "Answer and generative engine optimization so ChatGPT, Perplexity, and AI Overviews recommend your business by name.", video: "bento-aeogeo", extra: true, extraClass: "bento-card-extra-1" },
  { href: "/services/voice-agents", title: "Voice Agents", copy: "AI voice agents that answer calls, book appointments, and qualify leads around the clock.", video: "bento-voice", extra: true, extraClass: "bento-card-extra-2" },
  { href: "/services/ecommerce-development", title: "E-commerce Development", copy: "Online stores built to convert, from product pages to checkout, so browsers become buyers.", video: "bento-ecommerce", extra: true, extraClass: "bento-card-extra-3" },
  { href: "/services/business-automation", title: "Business Automation", copy: "Connect your tools and automate the manual work eating your team's day.", video: "bento-automation", extra: true, extraClass: "bento-card-extra-4" },
  { href: "/services/software-development", title: "Software Development", copy: "Custom tools, portals, and integrations built around how you operate.", video: "bento-softwaredev", extra: true, extraClass: "bento-card-extra-5" },
  { href: "/services/digital-infrastructure-consulting", title: "Digital Infrastructure Consulting", copy: "Hosting, security, and systems built to scale with your growth.", video: "bento-infra", extra: true, extraClass: "bento-card-extra-6" },
];
