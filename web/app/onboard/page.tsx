import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

const LEADSIE_EMBED = "https://app.leadsie.com/embed/connect/lmd/manage";

export const metadata: Metadata = {
  title: "Connect Your Accounts",
  description: "Connect and manage advertising accounts with Live Media Digital via Leadsie.",
  robots: { index: false, follow: false },
  alternates: { canonical: `${SITE_URL}/onboard` },
};

function sanitizeClientId(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return "";
  return value.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

function leadsieEmbedSrc(raw: string | string[] | undefined): string {
  const clientId = sanitizeClientId(raw);
  if (!clientId) return LEADSIE_EMBED;
  return `${LEADSIE_EMBED}?customUserId=${encodeURIComponent(clientId)}`;
}

export default async function OnboardPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string | string[] }>;
}) {
  const { c } = await searchParams;
  const iframeSrc = leadsieEmbedSrc(c);

  return (
    <main className="onboard-page">
      <section className="page-hero">
        <div className="container">
          <p className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            Onboard
          </p>
          <p className="eyebrow center">ACCOUNT ACCESS</p>
          <h1>Connect your accounts.</h1>
          <p className="section-sub center">
            Grant Live Media Digital secure access to the ad platforms we need to run and report on your campaigns.
          </p>
        </div>
      </section>
      <section className="onboard-embed">
        <div className="container">
          <iframe
            src={iframeSrc}
            title="Connect advertising accounts with Leadsie"
            scrolling="auto"
            width="100%"
            height="1000px"
            style={{ border: 0 }}
          />
        </div>
      </section>
    </main>
  );
}
