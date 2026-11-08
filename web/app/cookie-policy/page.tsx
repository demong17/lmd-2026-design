import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, SITE_EMAIL, SITE_URL, webPageSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Live Media Digital uses necessary, analytics, and advertising cookies on livemediadigital.com, and how to change your preferences.",
  alternates: { canonical: `${SITE_URL}/cookie-policy` },
};

export default function CookiePolicyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookie-policy" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Cookie Policy",
          path: "/cookie-policy",
          description: metadata.description,
        })}
      />
      <main className="legal-page">
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><Link href="/">Home</Link><span>/</span>Cookie Policy</p>
          <p className="eyebrow center">LEGAL</p>
          <h1>Cookie Policy</h1>
          <p className="legal-updated">Last updated: August 24, 2026</p>
        </div>
      </section>
      <div className="prose">
        <h4>1. What are cookies</h4>
        <p>Cookies are small data files stored on your device. We use them only as described here, and optional cookies run after you choose Analytics or Advertising in Cookie Settings.</p>

        <h4>2. How we use cookies</h4>
        <ul>
          <li>Keep the site working (navigation, forms, security headers)</li>
          <li>Remember your cookie preferences</li>
          <li>Measure traffic and page performance, if you allow Analytics</li>
          <li>Measure and improve ads on Google, Meta, and TVSquared, if you allow Advertising</li>
        </ul>

        <h4>3. Categories</h4>
        <strong>Essential</strong>
        <p>Required for core functionality, including storing your cookie choice. These cannot be turned off.</p>
        <strong>Analytics</strong>
        <p>Google Analytics (G-MWB9XB0TWX and G-TW5DCPSRT1) and Hotjar, used to understand which pages visitors use and how they move through the site. Loaded only with your consent.</p>
        <strong>Advertising</strong>
        <p>Google Ads, Meta Pixel, and TVSquared, used to measure campaigns (including TV) and limit wasted ad spend. Loaded only with your consent.</p>

        <h4>4. Managing cookies</h4>
        <p>
          Use <CookieSettingsButton>Cookie Settings</CookieSettingsButton> at any time, or control cookies in your browser. Rejecting optional cookies does not affect essential site features.
        </p>

        <h4>5. Updates</h4>
        <p>We may update this policy as tools change. The date above shows the latest revision.</p>

        <h4>6. Contact</h4>
        <p>Questions: <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a></p>
      </div>
    </main>
    </>
  );
}
