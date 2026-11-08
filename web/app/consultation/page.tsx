import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MailtoForm } from "@/components/forms/MailtoForm";
import { breadcrumbSchema, SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL, SITE_URL, SOCIAL, webPageSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Consultation",
  description:
    "Book a free strategy session with Live Media Digital. Tell us your goals, budget, and what you need — a strategist will follow up, not a bot.",
  alternates: { canonical: `${SITE_URL}/consultation` },
};

const LOOKING_FOR = [
  "SEO",
  "Paid search (SEM / PPC)",
  "Social media advertising",
  "Web design / development",
  "Content marketing",
  "Email marketing",
  "AEO / GEO (AI search)",
  "Voice agents",
  "E-commerce",
  "Automation / software",
  "Full-funnel strategy",
  "Not sure yet",
];

const BUDGETS = [
  "Under $2,000 / month",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Prefer to discuss",
];

const SOURCES = [
  "Google search",
  "Referral / word of mouth",
  "Social media",
  "Existing client",
  "Event or networking",
  "Other",
];

export default function ConsultationPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Free Consultation", path: "/consultation" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Free Consultation",
          path: "/consultation",
          description: metadata.description,
        })}
      />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              Free Consultation
            </p>
            <p className="eyebrow center">CONSULTATION</p>
            <h1>Let&apos;s plan your next 90 days.</h1>
            <p className="section-sub center">
              Book a free strategy session. We&apos;ll look at where you are, what&apos;s leaking, and a plan you can actually run. A real strategist gets back to you, not a bot.
            </p>
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
              <MailtoForm id="consultation-form" subject="New Consultation Request">
                <div className="form-field">
                  <label htmlFor="cs-full-name">Full Name</label>
                  <input type="text" id="cs-full-name" name="fullName" autoComplete="name" required placeholder=" " />
                </div>
                <div className="form-field">
                  <label htmlFor="cs-email">Work Email</label>
                  <input type="email" id="cs-email" name="email" autoComplete="email" required placeholder=" " />
                </div>
                <div className="form-field">
                  <label htmlFor="cs-website">Company Website</label>
                  <input type="text" id="cs-website" name="website" autoComplete="url" inputMode="url" placeholder=" " />
                </div>
                <div className="form-row">
                  <div className="form-field form-field-select">
                    <label htmlFor="cs-looking">What are you looking for?</label>
                    <select id="cs-looking" name="lookingFor" required defaultValue="">
                      <option value="" disabled>
                        Select one
                      </option>
                      {LOOKING_FOR.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field form-field-select">
                    <label htmlFor="cs-budget">Monthly Marketing Budget</label>
                    <select id="cs-budget" name="budget" required defaultValue="">
                      <option value="" disabled>
                        Select one
                      </option>
                      {BUDGETS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="cs-goals">Tell us about your goals</label>
                  <textarea id="cs-goals" name="goals" rows={5} placeholder=" " />
                </div>
                <div className="form-field form-field-select">
                  <label htmlFor="cs-source">How did you hear about us?</label>
                  <select id="cs-source" name="source" defaultValue="">
                    <option value="">Select one</option>
                    {SOURCES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Get Free Consultation</button>
              </MailtoForm>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
