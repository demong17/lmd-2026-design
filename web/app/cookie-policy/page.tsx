import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  alternates: { canonical: `${SITE_URL}/cookie-policy` },
};

export default function CookiePolicyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><Link href="/">Home</Link><span>/</span>Cookie Policy</p>
          <h1>Cookie Policy</h1>
        </div>
      </section>
    </main>
  );
}
