import type { Metadata } from "next";
import { Suspense } from "react";
import { MailtoForm } from "@/components/forms/MailtoForm";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Your Free AI Visibility Report",
  description: "See how ChatGPT, Google AI Overviews, and Perplexity describe your business, free, from Live Media Digital.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/get-report` },
};

function ReportForm() {
  return (
    <MailtoForm id="lead-form" subject="New AI Visibility Report Request" websiteFromQuery>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="lf-first-name">First name</label>
          <input type="text" id="lf-first-name" name="firstName" autoComplete="given-name" required placeholder=" " />
        </div>
        <div className="form-field">
          <label htmlFor="lf-last-name">Last name</label>
          <input type="text" id="lf-last-name" name="lastName" autoComplete="family-name" required placeholder=" " />
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="lf-email">Email</label>
        <input type="email" id="lf-email" name="email" autoComplete="email" required placeholder=" " />
      </div>
      <div className="form-field">
        <label htmlFor="lf-phone">Phone number</label>
        <input type="tel" id="lf-phone" name="phone" autoComplete="tel" required placeholder=" " />
      </div>
      <div className="form-field">
        <label htmlFor="lf-business">Business name</label>
        <input type="text" id="lf-business" name="business" autoComplete="organization" required placeholder=" " />
      </div>
      <div className="form-field">
        <label htmlFor="lf-website">Website</label>
        <input type="text" id="lf-website" name="website" autoComplete="url" inputMode="url" required placeholder=" " />
      </div>
      <button type="submit" className="btn btn-primary btn-block">Get My Free Report</button>
    </MailtoForm>
  );
}

export default function GetReportPage() {
  return (
    <main>
      <section className="lead-form-section">
        <div className="container">
          <div className="lead-form-wrap reveal">
            <div className="lead-form-intro">
              <p className="eyebrow">FREE AI VISIBILITY REPORT</p>
              <h1>See how AI describes your business.</h1>
              <p className="section-sub">Request your free AI visibility report: how ChatGPT, Google AI Overviews, and Perplexity mention your business today, and what to fix if they don&apos;t.</p>
              <ul className="check-list">
                <li>Checked against real AI tools, not guesses</li>
                <li>Reviewed by a strategist before it lands in your inbox</li>
                <li>No obligation, no long-term contract</li>
              </ul>
            </div>
            <Suspense fallback={null}>
              <ReportForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
