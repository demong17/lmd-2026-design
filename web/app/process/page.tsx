import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Process",
  description: "How Live Media Digital builds your strategy: a free audit, a custom plan, and a launch built to be tracked and optimized every month.",
  alternates: { canonical: `${SITE_URL}/process` },
};

export default function ProcessPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Process
          </p>
          <p className="eyebrow center">OUR PROCESS</p>
          <h1>A process built around your ROI, not ours.</h1>
          <p className="section-sub center">A free audit, a custom plan scoped to your business and budget, and a launch built to be tracked and optimized every month.</p>
          <div className="hero-ctas center">
            <Link href="/get-report" className="btn btn-primary">Get Free Consultation</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
