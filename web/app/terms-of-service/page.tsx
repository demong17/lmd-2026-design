import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
};

export default function TermsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><Link href="/">Home</Link><span>/</span>Terms of Service</p>
          <h1>Terms of Service</h1>
        </div>
      </section>
    </main>
  );
}
