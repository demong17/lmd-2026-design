import type { Metadata } from "next";
import Link from "next/link";
import { SITE_PHONE, SITE_PHONE_TEL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Live Media Digital is a South Florida digital marketing agency based in Doral. You work directly with the strategists running your account.",
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            About
          </p>
          <p className="eyebrow center">ABOUT US</p>
          <h1>A local team, not a call center.</h1>
          <p className="section-sub center">Live Media Digital is a South Florida digital marketing agency, based in Doral and working with businesses across the region and clients nationwide. You work directly with the strategists running your account, not a rotating account manager or an outsourced ticket queue.</p>
          <div className="hero-ctas center">
            <Link href="/get-report" className="btn btn-primary">Get Free Consultation</Link>
            <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">Call {SITE_PHONE}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
