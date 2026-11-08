import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, SITE_ADDRESS, SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_PHONE_TEL, SITE_URL, webPageSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using livemediadigital.com, including free consultations, AI visibility reports, and how paid agency work is scoped separately.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
};

const ADDRESS = `${SITE_ADDRESS.street}, ${SITE_ADDRESS.city}, ${SITE_ADDRESS.region} ${SITE_ADDRESS.postal}`;

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms-of-service" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Terms of Service",
          path: "/terms-of-service",
          description: metadata.description,
        })}
      />
      <main className="legal-page">
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Terms of Service
          </p>
          <p className="eyebrow center">LEGAL</p>
          <h1>Terms of Service</h1>
          <p className="legal-updated">Last updated: August 23, 2026</p>
        </div>
      </section>

      <div className="prose">
        <h4>1. Agreement to these terms</h4>
        <p>
          These Terms of Service govern your use of {SITE_URL.replace("https://", "")} (the &quot;Site&quot;), operated by {SITE_NAME},
          a digital marketing agency based in Doral, Florida. By using the Site, you agree to these terms.
        </p>
        <p>
          The Site is a marketing website. It does not require an account or login. Browsing, filling a form, or requesting a
          free report does not, by itself, make you a client or create a paid service contract.
        </p>

        <h4>2. Who we are and what we offer</h4>
        <p>
          {SITE_NAME} provides digital marketing and related services for businesses, including SEO, search engine marketing
          (Google and Microsoft), social media advertising, web and ecommerce development, content, email, AEO and GEO
          (visibility in ChatGPT, Perplexity, and Google AI Overviews), AI voice agents, business automation, custom software,
          and digital infrastructure consulting.
        </p>
        <p>
          We work with companies in South Florida and with clients nationwide. Industry pages, case studies, and plan names
          on the Site describe the kind of work we do. They are not a public offer to sell a fixed package at a posted price.
        </p>

        <h4>3. Using the Site</h4>
        <p>You may use the Site to learn about our work, read resources, and contact us. You agree to use it only for lawful purposes and not to:</p>
        <ul>
          <li>Break the law or infringe anyone else&apos;s rights</li>
          <li>Try to gain unauthorized access to the Site or its systems</li>
          <li>Interfere with or overload the Site</li>
          <li>Scrape, copy, or republish Site content for commercial redistribution without our written permission</li>
          <li>Submit false, misleading, or someone else&apos;s information in a form</li>
        </ul>
        <p>
          We may suspend access to the Site if we reasonably believe these terms are being abused.
          We may also change or take down pages at any time.
        </p>

        <h4>4. Free consultation and AI visibility report</h4>
        <p>
          A strategy consultation and the AI visibility report described on the Site are complimentary and come with no
          obligation to hire us. We may decline a request that is incomplete, spam, unrelated to our work, or that we cannot
          reasonably fulfill.
        </p>
        <p>
          The report looks at how public AI tools currently describe the website you submit. It is informational.
          It is not legal, financial, or medical advice, and it is not a guarantee of future rankings, citations, or leads.
        </p>
        <p>
          Sending a form requires one checkbox: you agree to emails from {SITE_NAME} at the address you provide.
          That consent is not a condition of buying a paid service. The form then emails {SITE_EMAIL}.
          You are responsible for what you send. Do not include payment card numbers or other highly sensitive data.
        </p>

        <h4>5. Paid services are a separate agreement</h4>
        <p>
          Hiring {SITE_NAME} is governed by a written proposal, statement of work, or service agreement that you and we sign
          (or otherwise accept in writing), not by these website terms alone. That document controls scope, fees, timelines,
          ad-account access, and how either party can end the work.
        </p>
        <p>
          Launch, Grow, Scale, and Enterprise on the Site are starting points for a conversation, not a take-it-or-leave-it menu.
          Pricing depends on your market, goals, and the work involved. We do not publish a single rate that applies to every business.
        </p>
        <p>
          As we describe on the Site, we do not lock clients into long-term contracts as a condition of working together.
          If a signed agreement says something different, that agreement wins.
        </p>
        <p>
          Media spend on Google, Meta, Microsoft, and similar platforms is typically billed by those platforms to the client
          (or prepaid by the client) and is separate from our management fees, unless a signed agreement says otherwise.
          You remain responsible for the accuracy of your business information, offers, licenses, and claims in ads and on your site.
        </p>

        <h4>6. Results, case studies, and testimonials</h4>
        <p>
          Case studies, statistics, and quotes on the Site reflect specific past client outcomes. They are not a promise that
          your business will get the same leads, revenue, rankings, or locations. Paid search and social can move quickly;
          SEO and AI visibility usually take longer and depend on competition, budget, your website, and factors we do not control.
        </p>
        <p>Nothing on the Site is a guarantee of position in Google, ChatGPT, or any other platform.</p>

        <h4>7. Intellectual property</h4>
        <p>
          The Site&apos;s text, layout, graphics, logos, and the {SITE_NAME} name are owned by us or our licensors.
          You may not copy or reuse them for your own marketing without written permission, except for ordinary browsing
          and sharing a page link.
        </p>
        <p>
          Work we create for a paying client (sites, creatives, copy, and the like) is handled in that client&apos;s agreement,
          including who owns what after invoices are paid.
        </p>
        <p>
          Third-party marks (Google, Meta, Microsoft, and others) belong to their owners. Our partner or certification badges
          describe a relationship or credential; they are not an endorsement of a particular result for you.
        </p>

        <h4>8. Third-party sites and tools</h4>
        <p>
          The Site may link to social profiles, maps, or other websites. Those destinations have their own terms and privacy
          practices. AI platforms we mention when we talk about AEO, GEO, or visibility reports are independent products.
          We are not responsible for their output, downtime, or policy changes.
        </p>

        <h4>9. Disclaimer</h4>
        <p>
          The Site and its content are provided &quot;as is&quot; and &quot;as available,&quot; without warranties of any kind,
          express or implied, including fitness for a particular purpose, merchantability, and non-infringement.
          We do not warrant that the Site will be uninterrupted, error-free, or free of harmful code.
        </p>

        <h4>10. Limitation of liability</h4>
        <p>
          To the fullest extent permitted by Florida law, {SITE_NAME} is not liable for any indirect, incidental, special,
          consequential, or punitive damages, or for lost profits, leads, data, or goodwill, arising from your use of the Site
          or from relying on content on the Site.
        </p>
        <p>
          For claims that relate only to use of this website (not a signed client agreement), our total liability will not
          exceed one hundred U.S. dollars (US $100). Some states do not allow certain limits; in those places, our liability
          is limited to the maximum extent the law allows.
        </p>
        <p>Liability for paid client work, if any, is defined in the signed service agreement for that work.</p>

        <h4>11. Indemnity</h4>
        <p>
          You agree to indemnify and hold {SITE_NAME} harmless from claims, damages, and reasonable legal fees arising from
          your misuse of the Site, your violation of these terms, or content you submit that is unlawful or infringes someone else&apos;s rights.
        </p>

        <h4>12. Privacy</h4>
        <p>
          How we handle personal information is described in our <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>. Using the Site also means you understand those documents.
        </p>

        <h4>13. Changes</h4>
        <p>
          We may update these terms from time to time. The date at the top shows the latest version.
          Continued use of the Site after a change means you accept the updated terms.
        </p>

        <h4>14. Governing law</h4>
        <p>
          These terms are governed by the laws of the State of Florida, without regard to conflict-of-law rules.
          Exclusive venue for disputes about the Site that are not subject to a different client agreement is the state or
          federal courts located in Miami-Dade County, Florida.
        </p>
        <p>
          If a court finds one section unenforceable, the rest still applies. These terms are the entire agreement for use
          of the Site. They do not replace a signed client contract.
        </p>

        <h4>15. Contact</h4>
        <p>
          Questions: <a href={`mailto:${SITE_EMAIL}`}>{SITE_EMAIL}</a>, <a href={`tel:${SITE_PHONE_TEL}`}>{SITE_PHONE}</a>,
          or {SITE_NAME}, {ADDRESS}.
        </p>
        <p>
          Related: <Link href="/privacy-policy">Privacy Policy</Link> · <Link href="/cookie-policy">Cookie Policy</Link> ·{" "}
          <Link href="/contact">Contact</Link>
        </p>
      </div>
    </main>
    </>
  );
}
