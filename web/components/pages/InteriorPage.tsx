import Link from "next/link";
import { SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import type { InteriorRecord } from "@/lib/pages";

export function InteriorPage({ page }: { page: InteriorRecord }) {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            {page.crumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`}>
                {i > 0 ? <span>/</span> : null}
                {crumb.href ? <Link href={crumb.href}>{crumb.label}</Link> : crumb.label}
              </span>
            ))}
          </p>
          {page.eyebrow ? <p className="eyebrow center">{page.eyebrow}</p> : null}
          <h1>{page.h1}</h1>
          {page.heroSub ? <p className="section-sub center">{page.heroSub}</p> : null}
          <div className="hero-ctas center">
            <Link href="/get-report" className="btn btn-primary">
              Get Free Consultation
            </Link>
            <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">
              Call {SITE_PHONE}
            </a>
          </div>
        </div>
      </section>

      {page.sections.map((section, index) => (
        <section className={`detail-section${index % 2 === 1 ? " tint" : ""}`} key={`${section.heading}-${index}`}>
          <div className="container">
            {section.cards.length ? (
              <>
                <div className="section-head reveal center" style={{ textAlign: "center" }}>
                  <h2>{section.heading}</h2>
                  {section.sub ? <p className="section-sub center">{section.sub}</p> : null}
                </div>
                <div className="related-grid reveal">
                  {section.cards.map((card) => (
                    <Link href={card.href} className="related-card" key={card.href}>
                      <span className="related-tag">{card.tag}</span>
                      <strong>{card.title}</strong>
                      <span>{card.copy}</span>
                      <span className="related-arrow">Learn more →</span>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="detail-grid">
                <div className="section-head reveal" style={{ textAlign: "left", margin: 0, maxWidth: "none" }}>
                  <h2>{section.heading}</h2>
                </div>
                {section.items.length ? (
                  <ul className="detail-list reveal">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="detail-copy reveal">
                    {section.paras.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      ))}

      {page.cta ? (
        <section className="cta-final" id="consultation">
          <div className="cta-glow" aria-hidden="true" />
          <div className="container reveal">
            <h2>{page.cta}</h2>
            {page.ctaSub ? <p className="section-sub">{page.ctaSub}</p> : null}
            <div className="hero-ctas center">
              <Link href="/get-report" className="btn btn-primary">
                Get Free Consultation
              </Link>
              <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">
                Call {SITE_PHONE}
              </a>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
