import type { Metadata } from "next";
import Link from "next/link";
import { FaqAccordion } from "@/components/faqs/FaqAccordion";
import { JsonLd } from "@/components/JsonLd";
import { PAGE_FAQS } from "@/lib/faqs";
import { breadcrumbSchema, faqPageSchema, SITE_PHONE, SITE_PHONE_TEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Digital Marketing FAQs",
  description:
    "Answers to common questions about SEO, SEM, paid search, and digital marketing from Live Media Digital, a Miami digital marketing agency.",
  alternates: { canonical: `${SITE_URL}/faqs` },
};

export default function FaqsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faqs" },
        ])}
      />
      <JsonLd data={faqPageSchema(PAGE_FAQS)} />
      <main className="faq-page">
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              FAQs
            </p>
            <h1>Digital Marketing FAQs</h1>
            <p className="section-sub center">
              Straight answers on SEO, search engine marketing, and what a digital marketing team actually does, from Live Media Digital in Miami.
            </p>
          </div>
        </section>
        <section>
          <div className="container">
            <FaqAccordion items={PAGE_FAQS} />
          </div>
        </section>
        <section className="article-cta">
          <div className="container">
            <h2>Still have a question?</h2>
            <p>Talk with a strategist. We&apos;ll tell you what applies to your business, and what does not.</p>
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
    </>
  );
}
