import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SiteImage } from "@/components/media/SiteImage";
import { getInteriorPage, getInteriorSlugs } from "@/lib/pages";
import { breadcrumbSchema, caseStudyCollectionSchema, SITE_PHONE, SITE_PHONE_TEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from real Live Media Digital clients: SEO, web design, and local search case studies from South Florida businesses.",
  alternates: { canonical: `${SITE_URL}/case-studies` },
};

const STUDIES = [
  {
    slug: "el-car-wash",
    title: "El Car Wash",
    image: "/assets/lmd/testimonials/el-car-wash.webp",
    imageAlt: "El Car Wash location with unlimited membership branding",
    stat: "500K+",
    statLabel: "unlimited members, up from 10,000",
    tags: ["Web Design", "SEO", "Paid Media"],
    copy: "From 2 locations to 80+, and 10,000 members to 500,000+. A full-funnel website, SEO, and paid media system built to scale with one of Florida's fastest-growing car wash brands.",
  },
  {
    slug: "ultimate-containers-pro",
    title: "Ultimate Containers Pro",
    image: "/assets/lmd/testimonials/ultimate-containers-pro.jpg",
    imageAlt: "Ultimate Containers Pro shipping containers at a South Florida yard",
    stat: "142%",
    statLabel: "increase in monthly leads since launch",
    tags: ["Web Design", "SEO"],
    copy: "Partner since day one. Full website build, SEO, and paid campaigns running as one strategy.",
  },
  {
    slug: "sushi-sake-sunset",
    title: "Sushi Sake Sunset",
    image: "/assets/lmd/testimonials/sushi-sake-sunset.jpg",
    imageAlt: "Sushi Sake Sunset restaurant interior and dining room",
    stat: "54%",
    statLabel: "increase in online reservations, year over year",
    tags: ["Web Design", "Social"],
    copy: "Web design and paid social, coordinated by one team.",
  },
  {
    slug: "miracle-leaf",
    title: "Miracle Leaf",
    image: "/assets/lmd/testimonials/miracle-leaf-ribbon.webp",
    imageAlt: "Miracle Leaf clinic storefront with grand opening ribbon",
    stat: "50",
    statLabel: "clinic locations, up from 8",
    tags: ["SEO", "Local Search", "Business Automation"],
    copy: "From 8 clinics to 50 across 3 states. A 5+ year partnership building compliant SEO, paid search, and automation for one of the country's largest medical marijuana certification clinic networks.",
  },
  {
    slug: "engineered-tax-services",
    title: "Engineered Tax Services",
    image: "/assets/lmd/testimonials/engineered-tax-services.webp",
    imageAlt: "Engineered Tax Services office building",
    stat: "+58%",
    statLabel: "increase in online leads",
    tags: ["Web Design", "SEO", "Business Automation"],
    copy: "A 2+ year partnership driving a 58% increase in online leads for the nation's only licensed engineering firm focused entirely on tax incentives.",
  },
  {
    slug: "crown-roofing",
    title: "Crown Roofing & Waterproofing",
    image: "/assets/lmd/testimonials/crown-roofing.webp",
    imageAlt: "Crown Roofing and Waterproofing crew working on a Florida roof",
    stat: "+32%",
    statLabel: "increase in leads",
    tags: ["Web Design", "SEO", "Paid Media"],
    copy: "A rebuilt website and market-by-market SEO and paid media system that grew leads 32% and lowered cost per lead for Florida's largest residential roofing and waterproofing company.",
  },
  {
    slug: "family-medical-group",
    title: "The Family Medical Group",
    image: "/assets/lmd/testimonials/family-medical-group.webp",
    imageAlt: "The Family Medical Group clinic exterior",
    stat: "16",
    statLabel: "clinic locations, up from 2",
    tags: ["Paid Media", "Social", "Business Automation"],
    copy: "From 2 clinics to 16 across 4 Florida counties. Paid search, social advertising, and business automation built a patient-acquisition system that scales with every new location.",
  },
] as const;

export default function CaseStudiesPage() {
  const pages = getInteriorSlugs("case-studies")
    .map((slug) => getInteriorPage("case-studies", slug))
    .filter((page): page is NonNullable<typeof page> => Boolean(page));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />
      <JsonLd data={caseStudyCollectionSchema(pages)} />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              Case Studies
            </p>
            <p className="eyebrow center">CASE STUDIES</p>
            <h1>Real businesses. Real results.</h1>
            <p className="section-sub center">
              Not staged metrics, just the outcomes our clients talk about when they call us back.
            </p>
          </div>
        </section>

        <section className="detail-section">
          <div className="container">
            <div className="cs-grid reveal">
              {STUDIES.map((study) => (
                <Link href={`/case-studies/${study.slug}`} className="cs-card" key={study.slug}>
                  <div className="cs-card-media">
                    <SiteImage
                      src={study.image}
                      alt={study.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="cs-card-stat">
                      <strong>{study.stat}</strong>
                      <span>{study.statLabel}</span>
                    </div>
                  </div>
                  <div className="cs-card-body">
                    <span className="case-tags">
                      {study.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </span>
                    <h2>{study.title}</h2>
                    <p>{study.copy}</p>
                    <span className="cs-card-arrow">Read case study →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-final" id="consultation">
          <div className="cta-glow" aria-hidden="true" />
          <div className="container reveal">
            <h2>Your business could be next.</h2>
            <p className="section-sub">
              Free strategy session. No long-term contracts, no guesswork, just strategy that works.
            </p>
            <div className="hero-ctas center">
              <Link href="/consultation" className="btn btn-primary">
                Get Free Consultation
              </Link>
              <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">
                Call {SITE_PHONE}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
