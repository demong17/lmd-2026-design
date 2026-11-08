import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/CookieSettingsButton";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, SITE_ADDRESS, SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_PHONE_TEL, SITE_URL, webPageSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Live Media Digital collects, uses, and protects information on livemediadigital.com, including forms, cookies, analytics, and ads.",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

const ADDRESS = `${SITE_ADDRESS.street}, ${SITE_ADDRESS.city}, ${SITE_ADDRESS.region} ${SITE_ADDRESS.postal}`;

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Privacy Policy",
          path: "/privacy-policy",
          description: metadata.description,
        })}
      />
      <main className="legal-page">
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Privacy Policy
          </p>
          <p className="eyebrow center">LEGAL</p>
          <h1>Privacy Policy</h1>
          <p className="legal-updated">Last updated: August 24, 2026</p>
        </div>
      </section>

      <div className="prose">
        <h4>1. Who we are</h4>
        <p>
          {SITE_NAME} (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a South Florida digital marketing agency based in Doral.
          We help businesses with SEO, paid search, social ads, web development, content, email, AI search (AEO &amp; GEO),
          voice agents, ecommerce, automation, custom software, and digital infrastructure.
        </p>
        <p>
          This policy explains what information we collect through {SITE_URL.replace("https://", "")}, how we use it, and the choices you have.
          The site is a marketing and lead-generation website. It does not have user accounts, logins, or subscriptions.
        </p>

        <h4>2. Information you give us</h4>
        <p>You can contact us by form, email, phone, or in person. When you do, we may receive:</p>
        <ul>
          <li>First and last name</li>
          <li>Email address</li>
          <li>Business name and website URL</li>
          <li>The message or questions you send</li>
          <li>Any other details you include in a consultation or report request</li>
        </ul>
        <p>
          That happens when you use the contact form, request a free AI visibility report, submit the exit-intent form,
          call {SITE_PHONE}, email {SITE_EMAIL}, or message us on Instagram, Facebook, or LinkedIn.
        </p>
        <p>
          Forms send your details to {SITE_EMAIL} through our email provider, Resend, and to our CRM, GoHighLevel. They are not stored in an account on this website.
          A form cannot be sent unless you check the box agreeing to email. Once we receive it, we use it to reply and, if you ask, to talk about our services.
          You can unsubscribe from marketing email with the link in each message or by writing to {SITE_EMAIL}.
        </p>

        <h4>3. Information collected automatically</h4>
        <p>Like most sites, we may collect limited technical data when you visit, such as:</p>
        <ul>
          <li>Pages viewed, referring URL, and approximate location derived from IP</li>
          <li>Browser type, device type, and general usage timing</li>
          <li>Cookie preferences stored on your device</li>
        </ul>
        <p>
          Analytics and advertising tools load only after you allow them. See our <Link href="/cookie-policy">Cookie Policy</Link> and
          use <CookieSettingsButton>Cookie Settings</CookieSettingsButton> at any time.
        </p>

        <h4>4. How we use information</h4>
        <p>We use what we collect to:</p>
        <ul>
          <li>Respond to inquiries and send the consultation or AI visibility report you requested</li>
          <li>Follow up about our services when you have asked to be contacted</li>
          <li>Understand which pages help visitors, if you allow Analytics</li>
          <li>Measure and improve our own ads on Google and Meta, if you allow Advertising</li>
          <li>Keep the site secure and working</li>
          <li>Comply with law or defend a legal claim if needed</li>
        </ul>
        <p>
          A free AI visibility report looks at how public AI tools (including ChatGPT, Google AI Overviews, and Perplexity)
          describe the business website you submit. We use that URL and your contact details to prepare and send the report.
          Requesting a report does not enroll you in a paid plan.
        </p>

        <h4>5. Cookies, analytics, and ads</h4>
        <p>We group cookies into three categories:</p>
        <strong>Essential</strong>
        <p>Needed for the site to work, including remembering your cookie choice. These stay on.</p>
        <strong>Analytics</strong>
        <p>Google Analytics and Hotjar, to see which pages people use. Loaded only with your consent.</p>
        <strong>Advertising</strong>
        <p>Google Ads, Meta Pixel, and TVSquared, to measure campaigns and limit wasted spend. Loaded only with your consent.</p>
        <p>
          Google Consent Mode is set to denied by default. Optional scripts do not run until you choose Analytics or Advertising.
          You can change that later in <CookieSettingsButton>Cookie Settings</CookieSettingsButton>.
        </p>

        <h4>6. Maps and other third parties</h4>
        <p>
          The contact page embeds a Google Map of our office. Google may collect data under its own terms when that map loads.
          Links to Instagram, Facebook, LinkedIn, and other sites are governed by those companies, not by us.
        </p>
        <p>
          Inbound form messages arrive by email at {SITE_EMAIL} and as a contact in GoHighLevel. Resend delivers the email. We do not sell the address you submit.
        </p>

        <h4>7. How we share information</h4>
        <p>
          We do not sell your personal information for money. We also do not share it with other companies so they can
          market their own products to you.
        </p>
        <p>We may share information only:</p>
        <ul>
          <li>With service providers who help us run the site and the business (hosting, email, security)</li>
          <li>With Google, Meta, Hotjar, or TVSquared for analytics or ads, and only if you allowed those cookies</li>
          <li>If the law requires it, or to protect our rights, visitors, or clients</li>
          <li>In connection with a business transfer, such as a merger or sale of assets</li>
        </ul>
        <p>
          If you become a client, your ad accounts, analytics, and other platform logins are used only to deliver the work
          we agreed to, under a separate service agreement, not under this website policy alone.
        </p>

        <h4>8. Retention</h4>
        <p>
          We keep inquiry details as long as we reasonably need them to reply, follow up if you asked us to, deliver a
          report or consultation, or meet legal and accounting duties. Then we delete or de-identify them.
          Cookie choices stay in your browser until you clear them or choose new settings.
        </p>

        <h4>9. Security</h4>
        <p>
          We use HTTPS, security headers, and access limited to people who need it to do their jobs.
          No transmission or storage on the internet is perfectly secure, so we cannot promise absolute security.
        </p>

        <h4>10. Your choices and rights</h4>
        <p>You can:</p>
        <ul>
          <li>Skip optional cookies, or change them later in Cookie Settings</li>
          <li>Ask what information we hold about you</li>
          <li>Ask us to correct or delete it</li>
          <li>Ask us to stop using your details for marketing follow-up</li>
        </ul>
        <p>
          Email <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a> to make a request. We may need to confirm it is you
          before we act. If a consumer privacy law applies to you (for example, certain California or Florida residents),
          we will honor those rights as required. We do not charge for a request unless the law allows a reasonable fee
          for repeated or unfounded asks.
        </p>

        <h4>11. Children</h4>
        <p>
          This site and our services are for businesses, not children. We do not knowingly collect information from anyone under 13.
          If you think a child sent us data, contact us and we will delete it.
        </p>

        <h4>12. Changes</h4>
        <p>
          We may update this policy as the site, tools, or law change. The date at the top is the latest revision.
          Continued use of the site after an update means you are looking at the current version.
        </p>

        <h4>13. Contact</h4>
        <p>
          Questions about privacy: <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>,{" "}
          <a href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE}</a>, or write to {SITE_NAME}, {ADDRESS}.
        </p>
        <p>
          Related: <Link href="/cookie-policy">Cookie Policy</Link> · <Link href="/terms-of-service">Terms of Service</Link> ·{" "}
          <Link href="/contact">Contact</Link>
        </p>
      </div>
    </main>
    </>
  );
}
