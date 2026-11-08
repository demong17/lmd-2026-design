import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, SITE_PHONE, SITE_PHONE_TEL, SITE_URL, webPageSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "How Live Media Digital builds your strategy: a free audit, a custom plan scoped to your business and budget, and a launch built to be tracked and optimized every month.",
  alternates: { canonical: `${SITE_URL}/process` },
};

const STAGES = [
  {
    kicker: "STAGE 1",
    title: "Free strategy consultation",
    copy: "Every engagement starts with a free, no-obligation call to learn your goals, your market, and where your current site and campaigns are falling short, before we recommend anything.",
    items: [
      "Full audit of your site, SEO, and ad accounts",
      "No-pressure first call, no hard sell",
      "A clear roadmap before you spend a dollar",
    ],
  },
  {
    kicker: "STAGE 2",
    title: "Custom strategy & build",
    copy: "We design a strategy that ties your website, search rankings, and ad spend together, then build the pages and campaigns engineered to convert the traffic we drive.",
    items: [
      "SEO, SEM, social & web combined into one plan, not three vendors",
      "Landing pages built to convert, not just look good",
      "Every recommendation backed by data, not a hunch",
    ],
  },
  {
    kicker: "STAGE 3",
    title: "Launch, track & optimize",
    copy: "Once live, every campaign is tracked against real business outcomes: leads, calls, and conversions, not vanity metrics. We optimize continuously, not once a quarter.",
    items: [
      "Real-time reporting on leads and ROI",
      "Ongoing optimization, not set-it-and-forget-it",
      "Direct access to your strategist, not a ticket queue",
    ],
  },
] as const;

const PLAN_LEFT = [
  "Where you stand today: what the audit actually found, not assumptions",
  "What you're trying to hit: more leads, more revenue, or expansion into a new market or location",
] as const;

const PLAN_RIGHT = [
  "What your competitors are already doing, and where the real opportunity is",
  "What you can responsibly invest: a plan sized to your budget, not a number we picked first",
] as const;

const WHY = [
  "Direct access to your strategist, not a rotating account manager",
  "A different playbook for every industry, not a copy-paste template",
  "Transparent reporting tied to leads and revenue, not impressions",
  "No long-term contracts. You stay because it's working, not because you're locked in",
  "Certified across Google, Meta, Microsoft, Yelp, Klaviyo, and Semrush",
] as const;

const NINETY_DAYS = [
  "Week 1: Strategy call and full audit of your site, SEO, and ad accounts",
  "Weeks 2-4: Strategy finalized, campaigns and site work begin",
  "Month 2: Launch, plus the first optimization pass on real performance data",
  "Month 3 and ongoing: Monthly reporting and continuous refinement",
] as const;

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Process", path: "/process" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "Our Process",
          path: "/process",
          description: metadata.description,
        })}
      />
      <main className="process-page">
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              Our Process
            </p>
            <p className="eyebrow center">OUR PROCESS</p>
            <h1>A process built around your ROI, not ours.</h1>
            <p className="section-sub center">
              No off-the-shelf packages, no generic playbooks. Here&apos;s exactly how we figure out what your business actually needs, build it, and prove it&apos;s working every month.
            </p>
            <div className="hero-ctas center">
              <Link href="/consultation" className="btn btn-primary">
                Get Free Consultation
              </Link>
              <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">
                Call {SITE_PHONE}
              </a>
            </div>
          </div>
        </section>

        {STAGES.map((stage, index) => (
          <section key={stage.kicker} className={`detail-section${index % 2 === 1 ? " tint" : ""}`}>
            <div className="container">
              <div className="detail-grid process-stage-grid">
                <div className="section-head process-stage-head reveal">
                  <p className="eyebrow">{stage.kicker}</p>
                  <h2>{stage.title}</h2>
                </div>
                <div className="detail-copy">
                  <p>{stage.copy}</p>
                  <ul className="detail-list reveal">
                    {stage.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}

        <section className="detail-section tint">
          <div className="container">
            <div className="section-head reveal center">
              <h2>How we figure out your plan</h2>
              <p className="section-sub center">
                We don&apos;t have a fixed menu of packages we push on everyone who calls. Your plan gets scoped around four things.
              </p>
            </div>
            <div className="detail-grid process-plan-grid">
              <ul className="detail-list reveal">
                {PLAN_LEFT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <ul className="detail-list reveal">
                {PLAN_RIGHT.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="process-plan-note reveal">
              That&apos;s how a business ends up on our Launch, Grow, or Scale plan, or a custom scope for multi-location and franchise brands. A dental practice doesn&apos;t need the same plan as a roofing company covering three counties, so we don&apos;t hand out the same recommendation to everyone who calls.
            </p>
            <div className="hero-ctas center process-plan-cta">
              <Link href="/#pricing" className="btn btn-outline">
                See plan tiers
              </Link>
            </div>
          </div>
        </section>

        <section className="detail-section">
          <div className="container">
            <div className="detail-grid process-stage-grid">
              <div className="section-head process-stage-head reveal">
                <h2>Why the process works</h2>
              </div>
              <ul className="detail-list reveal">
                {WHY.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="detail-section tint">
          <div className="container">
            <div className="detail-grid process-stage-grid">
              <div className="section-head process-stage-head reveal">
                <h2>What the first 90 days look like</h2>
              </div>
              <ul className="detail-list reveal">
                {NINETY_DAYS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="cta-final" id="consultation">
          <div className="cta-glow" aria-hidden="true" />
          <div className="container reveal">
            <h2>Ready to find out what your plan looks like?</h2>
            <p className="section-sub">
              Free strategy session. No long-term contracts, no guesswork, just strategy that works.
            </p>
            <div className="hero-ctas center">
              <Link href="/consultation" className="btn btn-primary">
                Get Free Consultation
              </Link>
              <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">
                Call {SITE_PHONE}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
