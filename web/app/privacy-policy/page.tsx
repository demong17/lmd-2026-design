import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb"><Link href="/">Home</Link><span>/</span>Privacy Policy</p>
          <h1>Privacy Policy</h1>
        </div>
      </section>
    </main>
  );
}
