import type { Metadata } from "next";
import Link from "next/link";
import { AboutBrandServices } from "@/components/about/AboutBrandServices";
import { AboutPartnersCarousel } from "@/components/about/AboutPartnersCarousel";
import { JsonLd } from "@/components/JsonLd";
import { SiteImage } from "@/components/media/SiteImage";
import { breadcrumbSchema, SITE_URL, webPageSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Live Media Digital is a premium digital marketing agency in Miami. We build digital strategies that bring more leads, conversions, repeat customers, and more sales.",
  alternates: { canonical: `${SITE_URL}/about-us` },
};

const TEAM = [
  { name: "Abe Rodriguez", role: "Head of Business Development", img: "/assets/lmd/about/abe-portrait.png" },
  { name: "Schneider Jean", role: "Chief Digital Strategist", img: "/assets/lmd/team/schneider-jean.jpg" },
  { name: "Ryan Elkin", role: "Head of Project Management", img: "/assets/lmd/team/ryan-elkin.jpg" },
  { name: "Peggy Hunt", role: "Head of SEO", img: "/assets/lmd/team/peggy-hunt.jpg" },
  { name: "Lorenzo Quijas", role: "Head of Social Media Ads", img: "/assets/lmd/team/lorenzo-quijas.jpg" },
  { name: "Karen Valderrama Corzo", role: "Head of Business Administration", img: "/assets/lmd/team/karen-valderrama.jpg" },
  { name: "Jason Hetrick", role: "Head of Email Marketing", img: "/assets/lmd/team/jason-hetrick.jpg" },
  { name: "Guillermo García", role: "Head of Web Development", img: "/assets/lmd/team/guillermo-garcia.jpg" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: "About Us",
          path: "/about-us",
          description: metadata.description,
          type: "AboutPage",
        })}
      />
      <main>
        <section className="page-hero">
          <div className="container">
            <p className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              About Us
            </p>
            <p className="eyebrow center">One of Florida&apos;s leading agencies</p>
            <h1>Digital Marketing Strategy Agency in Miami</h1>
            <p className="section-sub center">
              We are Live Media Digital. Premium digital marketing built around your brand, your leads, and your sales.
            </p>
          </div>
        </section>

        <section className="about-intro">
          <div className="container about-intro-grid">
            <figure className="about-portrait">
              <SiteImage
                src="/assets/lmd/about/abe-portrait.png"
                alt="Abe Rodriguez, Head of Business Development at Live Media Digital in Miami"
                width={506}
                height={700}
                sizes="(max-width: 768px) 90vw, 420px"
                style={{ width: "100%", height: "auto" }}
              />
            </figure>
            <div className="about-intro-copy">
              <h2>
                We are <span>Live Media Digital</span>
              </h2>
              <p>
                Live Media Digital (LMD) is a premium digital marketing agency who develops deep relationships with our
                clients, and focuses on understanding their exclusive needs for improving their branding and overall
                business lead to sale protocol.
              </p>
              <p>
                <strong>
                  Our primary goal for each and every client at LMD is to craft a digital media presence that acquires
                  more leads, more conversions, repeat customers and MORE SALES.
                </strong>
              </p>
              <p>
                We embrace all things digital, from{" "}
                <Link href="/services/web-development">web development</Link> and{" "}
                <Link href="/services/search-engine-marketing">search engine marketing</Link> to{" "}
                <Link href="/services/social-media-paid-marketing">social media marketing</Link>.
              </p>
              <p>
                Live Media Digital is based in Miami, but we work closely with companies all over the world. We have a
                thorough intake process for all new clients. The process begins by evaluating your goals for growing
                your business (both short-term and long-term). We then create a digital media strategy to address those
                goals, ensuring that our strategy develops organically while helping you target new markets.
              </p>
              <p>Our goal is to make you more money, and we aren&apos;t successful unless you are.</p>
            </div>
          </div>
        </section>

        <AboutPartnersCarousel />

        <AboutBrandServices />

        <section className="about-focus">
          <div className="container about-focus-grid">
            <div className="about-focus-copy">
              <h2>Boost your revenue</h2>
              <p>
                In today&apos;s advanced online world, it&apos;s easy to forget what really matters. What connects us
                all are emotions and the human experience. Whether it&apos;s a video that engages your customers with
                joy, or a blog entry that makes them think, LMD develops insightful profiles of your customers to
                connect with them (even if they&apos;re half a world away). Our proprietary analytics track user
                interaction on your business website, as well as your social media presence. More and more, customers
                are selecting brands that they can relate to; companies that are authentic, and that they can develop a
                relationship with. Building these relationships is our specialty, and we&apos;re happy to put that
                expertise to work for you.
              </p>
            </div>
            <figure className="about-focus-media">
              <SiteImage
                src="/assets/lmd/about/revenue-growth.jpg"
                alt="Illustration of rising revenue with charts, coins, and a gold growth arrow"
                width={1024}
                height={1024}
                sizes="(max-width: 768px) 90vw, 480px"
                style={{ width: "100%", height: "auto" }}
              />
            </figure>
          </div>
        </section>

        <section className="about-why tint">
          <div className="container about-why-grid">
            <div className="about-why-copy">
              <h2>Why do I need a digital agency?</h2>
              <p>
                You may be wondering why you need a digital marketing agency. Maintaining a vibrant online presence can
                be a full-time job.
              </p>
              <p>A successful digital marketing campaign will require making sure that:</p>
            </div>
            <ul className="detail-list">
              <li>Your blog has fresh content</li>
              <li>You&apos;re posting timely articles on Facebook</li>
              <li>You&apos;re keeping up with your Instagram account</li>
              <li>You&apos;re monitoring each social media post to engage with friends and followers</li>
              <li>You&apos;re directing your potential customers to different landing pages on your website</li>
            </ul>
            <div className="about-why-note">
              <p>
                As a business owner, you may not have the time or the desire to constantly{" "}
                <Link href="/services">monitor your website</Link> and social media profiles. You need to focus on what
                you do best: taking care of your staff, developing new products, and generating sales.
              </p>
              <p>
                Choose LMD in Miami, one of the best digital marketing agencies in Florida.
              </p>
            </div>
          </div>
        </section>

        <section className="about-team">
          <div className="container">
            <div className="section-head">
              <h2>Meet our team</h2>
              <p className="section-sub">Digital marketing experts, in-house, on your account.</p>
            </div>
            <ul className="about-team-grid">
              {TEAM.map((member) => (
                <li className="team-card" key={member.name}>
                  {member.img ? (
                    <div className="team-photo">
                      <SiteImage
                        src={member.img}
                        alt={`${member.name}, ${member.role} at Live Media Digital`}
                        fill
                        sizes="(max-width: 768px) 50vw, 220px"
                        style={{ objectFit: "cover", objectPosition: "center top" }}
                      />
                    </div>
                  ) : (
                    <span className="team-card-initials" aria-hidden="true">
                      {initials(member.name)}
                    </span>
                  )}
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
