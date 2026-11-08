"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BentoGlowGrid } from "@/components/home/BentoGlowGrid";

const BRAND_SERVICES = [
  {
    href: "/services",
    title: "Integrated Digital Strategies",
    copy: "We keep a strong client retention rate because the work is knowledgeable, effective, and built to last. Full-scale digital campaigns for companies of every size, from website design and marketing to profiles people actually want to follow.",
    video: "bento-sem",
  },
  {
    href: "/services/web-development",
    title: "Web Development Strategies",
    copy: "A site at LMD is never three pages of thin copy. We start with your services, products, and goals, then build a site meant to become a 24/7 money-making machine, not a brochure.",
    video: "bento-webdev",
  },
  {
    href: "/services/business-automation",
    title: "Business Process Management",
    copy: "Traffic is the priority. Keeping and managing that demand is how clients stay ahead. We build the tools to track user behavior, quantify each strategy, and keep a healthy customer base without extra busywork.",
    video: "bento-automation",
  },
];

export function AboutBrandServices() {
  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(".about-brand .bento-media video");
    if (!videos.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLVideoElement).play().catch(() => {});
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" },
    );
    videos.forEach((video) => io.observe(video));
    return () => io.disconnect();
  }, []);

  return (
    <section className="services-section about-brand" id="brand-services">
      <div className="container">
        <div className="section-head light">
          <p className="eyebrow">Brand Services</p>
          <h2>To make our clients succeed.</h2>
        </div>
        <BentoGlowGrid className="bento-grid">
          {BRAND_SERVICES.map((card) => (
            <div className="bento-card" data-bento-glow key={card.title}>
              <span className="bento-glow" aria-hidden="true" />
              <div className="bento-media">
                <video
                  src={`/assets/images/bento-video/${card.video}.mp4?v=3`}
                  poster={`/assets/images/${card.video}.webp?v=3`}
                  width={800}
                  height={450}
                  muted
                  loop
                  playsInline
                  preload="none"
                  title={card.title}
                  aria-label={card.title}
                />
              </div>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
              <Link href={card.href} className="bento-card-btn">
                Learn more →
              </Link>
            </div>
          ))}
        </BentoGlowGrid>
      </div>
    </section>
  );
}
