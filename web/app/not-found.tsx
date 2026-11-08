import type { Metadata } from "next";
import Link from "next/link";
import { SiteImage } from "@/components/media/SiteImage";
import { SiteSearchForm } from "@/components/search/SiteSearchForm";
import { SERVICES, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "This page is missing. Browse Live Media Digital SEO, paid search, social media, web development, content, email, AEO, voice agents, and automation services, or talk with a strategist.",
};

export default function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-intro">
        <div className="container">
          <SiteImage
            className="not-found-art"
            src="/assets/lmd/404.png"
            width={400}
            height={251}
            alt="Illustration of a UFO flying through clouds in front of a 404 sign"
            sizes="(max-width: 768px) 90vw, 400px"
            style={{ width: "min(520px, 100%)", height: "auto" }}
          />
          <SiteSearchForm id="not-found-search" />
          <h1>Can&apos;t find the service you&apos;re looking for?</h1>
          <p className="section-sub center">
            This page is gone or never existed. Review our recommended services below. We run SEO, paid search, social, web, content, and AI in-house, so a strategist can still point you to the right fit.
          </p>
        </div>
      </section>

      <section className="not-found-services" aria-labelledby="not-found-services-heading">
        <div className="container">
          <h2 id="not-found-services-heading">Recommended services</h2>
          <ul className="not-found-list">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`}>
                  <span className="not-found-list-text">
                    <strong>{service.title}</strong>
                    <span>{service.blurb}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="article-cta">
        <div className="container">
          <h2>Still looking for the right fit?</h2>
          <p>Call a strategist or send a note. We&apos;ll map what you need to a service, or tell you if it is not a match.</p>
          <div className="hero-ctas center">
            <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">
              Call {SITE_PHONE}
            </a>
            <Link href="/contact" className="btn btn-primary">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
