"use client";

import { useEffect, useRef } from "react";
import { SiteImage } from "@/components/media/SiteImage";

const PARTNER_LOGOS = [
  { src: "/assets/lmd/partners/klaviyo.webp", alt: "Klaviyo Master Elite Certified Agency Partner" },
  { src: "/assets/lmd/partners/google-partner.svg?v=2", alt: "Google Partner" },
  { src: "/assets/lmd/partners/microsoft.webp", alt: "Microsoft Advertising Partner" },
  { src: "/assets/lmd/partners/yelp.webp", alt: "Yelp Advertising Partner" },
  { src: "/assets/lmd/partners/facebook.webp?v=2", alt: "Meta Blueprint" },
  { src: "/assets/lmd/partners/vibe.png", alt: "vibe.co certified partner" },
  { src: "/assets/lmd/partners/semrush.webp", alt: "Semrush Certified Agency Partner" },
  { src: "/assets/lmd/partners/reddit.svg", alt: "Reddit Certified Partner" },
  { src: "/assets/lmd/partners/pinterest.svg", alt: "Pinterest Certified Partner" },
  { src: "/assets/lmd/partners/tiktok.svg", alt: "TikTok Certified Partner" },
  { src: "/assets/lmd/partners/linkedin.svg", alt: "LinkedIn Marketing Partner" },
];

export function AboutPartnersCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      const el = trackRef.current;
      if (!el || hoverRef.current) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 12;
      el.scrollTo({ left: atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.4, behavior: "smooth" });
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const scrollByPage = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  return (
    <section className="about-partners" aria-label="Certified agency partners">
      <div className="container about-partners-wrap">
        <button
          type="button"
          className="about-partners-arrow"
          aria-label="Previous partner logos"
          onClick={() => scrollByPage(-1)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          className="about-partners-track"
          ref={trackRef}
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
        >
          {PARTNER_LOGOS.map((logo) => (
            <SiteImage
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={168}
              height={80}
              style={{ width: "auto" }}
            />
          ))}
          {PARTNER_LOGOS.map((logo) => (
            <SiteImage
              key={`${logo.src}-dup`}
              src={logo.src}
              alt={logo.alt}
              aria-hidden
              width={168}
              height={80}
              style={{ width: "auto" }}
            />
          ))}
        </div>
        <button
          type="button"
          className="about-partners-arrow"
          aria-label="Next partner logos"
          onClick={() => scrollByPage(1)}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
