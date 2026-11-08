import type { Metadata } from "next";
import Link from "next/link";
import { ServicesBento } from "@/components/home/ServicesBento";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, serviceCollectionSchema, SITE_URL } from "@/lib/site";

const TITLE = "Digital Marketing Services";
const DESCRIPTION =
  "SEO, paid search, social, web, content, email, and AI from one Miami in-house team. Every service planned together and tracked to real leads.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesHubPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <JsonLd data={serviceCollectionSchema()} />
      <main>
        <section className="services-section services-hub">
          <div className="container">
            <p className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              Services
            </p>
            <div className="section-head reveal light">
              <p className="eyebrow">OUR SERVICES</p>
              <h1>Digital marketing services, built to work as one plan.</h1>
              <p className="section-sub">
                SEO, paid search, social, web, content, email, and AI, run in-house from Miami and tracked to real
                leads. Pick a service to see what&apos;s included, who it is for, and how it pairs with the rest of
                the plan.
              </p>
            </div>
            <ServicesBento showAll headingAs="h2" />
          </div>
        </section>
      </main>
    </>
  );
}
