import type { Metadata } from "next";
import Link from "next/link";
import { AccessibilityToolsButton } from "@/components/a11y/AccessibilityToolsButton";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_PHONE_TEL, SITE_URL, webPageSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "How Live Media Digital designs livemediadigital.com for keyboard, screen reader, and low-vision use, plus on-page accessibility tools.",
  alternates: { canonical: `${SITE_URL}/accessibility` },
};

export default function AccessibilityPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Accessibility", path: "/accessibility" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Accessibility Statement",
          path: "/accessibility",
          description: metadata.description,
        })}
      />
      <main className="legal-page">
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              Accessibility
            </p>
            <p className="eyebrow center">COMMITMENT</p>
            <h1>Accessibility</h1>
            <p className="legal-updated">Last updated: August 24, 2026</p>
          </div>
        </section>

        <div className="prose">
          <h4>Our commitment</h4>
          <p>
            {SITE_NAME} wants livemediadigital.com to work for as many people as possible, including people who use a keyboard,
            a screen reader, voice control, or larger text. We design toward the Web Content Accessibility Guidelines (WCAG) 2.2
            Level AA. That is the practical bar most ADA website cases use. It is a standard we keep improving, not a badge we stamp on the site.
          </p>

          <h4>Tools on this site</h4>
          <p>
            Use the accessibility button at the bottom right of every page, or open it from here. Preferences stay in this browser only.
          </p>
          <p>
            <AccessibilityToolsButton>Open accessibility tools</AccessibilityToolsButton>
          </p>
          <ul>
            <li>Skip to main content, as the first keyboard control</li>
            <li>Larger text</li>
            <li>High contrast</li>
            <li>Underlined links</li>
            <li>Stop animations and looping video</li>
            <li>More readable spacing</li>
            <li>Stronger keyboard focus</li>
          </ul>
          <p>
            These tools help you control how the site looks. They do not replace semantic HTML, captions, contrast in the design,
            or a formal WCAG audit.
          </p>

          <h4>What we build for</h4>
          <ul>
            <li>Keyboard access to menus, search, forms, and dialogs</li>
            <li>Visible focus on interactive controls</li>
            <li>Text alternatives on meaningful images; decorative images marked as such</li>
            <li>Respect for reduced-motion settings on the device</li>
            <li>Form labels that stay visible, with errors next to the field</li>
            <li>Language set to English on every page</li>
          </ul>

          <h4>Known limits</h4>
          <p>
            Some older blog articles still contain embedded HTML from the previous site. If a heading, link, or image in an article
            is hard to use, tell us and we will fix that page. Third-party embeds (maps, social posts, or video players) follow their
            own accessibility support.
          </p>

          <h4>Report a barrier</h4>
          <p>
            If something on this site blocks you, email{" "}
            <a href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent("Accessibility feedback")}`}>{SITE_EMAIL}</a> or call{" "}
            <a href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE}</a>. Include the page URL and what you were trying to do. We read these
            notes and treat them as a priority.
          </p>
        </div>
      </main>
    </>
  );
}
