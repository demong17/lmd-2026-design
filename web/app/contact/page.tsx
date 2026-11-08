import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MailtoForm } from "@/components/forms/MailtoForm";
import { breadcrumbSchema, SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL, SITE_URL, SOCIAL, webPageSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to a Live Media Digital strategist about SEO, paid media, web, and growth for your South Florida business.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Contact",
          path: "/contact",
          description: metadata.description,
          type: "ContactPage",
        })}
      />
      <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Contact
          </p>
          <p className="eyebrow center">CONTACT</p>
          <h1>Let&apos;s talk about your business.</h1>
          <p className="section-sub center">Questions about a service, a quote, or just want to see if we&apos;re a fit? Reach out. A real strategist gets back to you, not a bot.</p>
        </div>
      </section>
      <section className="lead-form-section">
        <div className="container">
          <div className="lead-form-wrap reveal">
            <div className="contact-info">
              <div className="contact-info-list">
                <a href={`tel:${SITE_PHONE_TEL}`} className="contact-info-item">
                  <span>
                    <strong>Call us</strong>
                    {SITE_PHONE}
                  </span>
                </a>
                <a href={`mailto:${SITE_EMAIL}`} className="contact-info-item">
                  <span>
                    <strong>Email us</strong>
                    {SITE_EMAIL}
                  </span>
                </a>
                <div className="contact-info-item">
                  <span>
                    <strong>Visit us</strong>
                    3400 NW 78th Ave, Suite 109
                    <br />
                    Doral, FL 33122
                  </span>
                </div>
              </div>
              <div className="contact-map">
                <iframe
                  src="https://www.google.com/maps?q=3400+NW+78th+Ave+Suite+109+Doral+FL+33122&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Live Media Digital office location"
                />
              </div>
              <div className="contact-info-item" style={{ display: "block" }}>
                <strong style={{ display: "block", marginBottom: 8 }}>Also serving</strong>
                <span>
                  <Link href="/service-areas/miami">Miami</Link> · <Link href="/service-areas/miami-lakes">Miami Lakes</Link> · <Link href="/service-areas/hialeah">Hialeah</Link> · <Link href="/service-areas/coral-gables">Coral Gables</Link> · <Link href="/service-areas/sweetwater">Sweetwater</Link>
                </span>
              </div>
              <div className="contact-socials">
                <a href={SOCIAL.instagram} target="_blank" rel="noopener" className="footer-social-btn" aria-label="Instagram">Instagram</a>
                <a href={SOCIAL.facebook} target="_blank" rel="noopener" className="footer-social-btn" aria-label="Facebook">Facebook</a>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener" className="footer-social-btn" aria-label="LinkedIn">LinkedIn</a>
              </div>
            </div>
            <MailtoForm id="contact-form" subject="New Contact Form Submission">
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="cf-first-name">First name</label>
                  <input type="text" id="cf-first-name" name="firstName" autoComplete="given-name" required placeholder=" " />
                </div>
                <div className="form-field">
                  <label htmlFor="cf-last-name">Last name</label>
                  <input type="text" id="cf-last-name" name="lastName" autoComplete="family-name" required placeholder=" " />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="cf-email">Email</label>
                <input type="email" id="cf-email" name="email" autoComplete="email" required placeholder=" " />
              </div>
              <div className="form-field">
                <label htmlFor="cf-business">Business name</label>
                <input type="text" id="cf-business" name="business" autoComplete="organization" required placeholder=" " />
              </div>
              <div className="form-field">
                <label htmlFor="cf-message">Message</label>
                <textarea id="cf-message" name="message" rows={5} required placeholder=" " />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Send Message</button>
            </MailtoForm>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
