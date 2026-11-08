"use client";

import Link from "next/link";
import { useEffect, useState, type ElementType } from "react";
import { BentoGlowGrid } from "@/components/home/BentoGlowGrid";
import { HOME_BENTO_SERVICES, type HomeBentoService } from "@/lib/home-bento";

function ServiceBentoCard({
  card,
  extra,
  Title,
}: {
  card: HomeBentoService;
  extra: boolean;
  Title: ElementType;
}) {
  return (
    <div className={`bento-card${extra ? ` bento-card-extra ${card.extraClass ?? ""}` : " reveal"}`} data-bento-glow>
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
      <Title>{card.title}</Title>
      <p>{card.copy}</p>
      <Link href={card.href} className="bento-card-btn">
        Learn more →
      </Link>
    </div>
  );
}

export function ServicesBento({
  showAll = false,
  headingAs = "h3",
}: {
  showAll?: boolean;
  headingAs?: "h2" | "h3";
}) {
  const [open, setOpen] = useState(showAll);

  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(".bento-grid .bento-media video");
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
  }, [open, showAll]);

  const primary = HOME_BENTO_SERVICES.filter((card) => !card.extra);
  const extra = HOME_BENTO_SERVICES.filter((card) => card.extra);

  return (
    <BentoGlowGrid className={`bento-grid${open || showAll ? " expanded" : ""}`}>
      {primary.map((card) => (
        <ServiceBentoCard card={card} extra={false} Title={headingAs} key={card.href} />
      ))}
      {showAll ? null : (
        <div className="bento-more-row">
          <button type="button" className="bento-more-toggle" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            <span>{open ? "See less" : "See more"}</span>
            <svg className="bento-more-caret" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
      {extra.map((card) => (
        <ServiceBentoCard card={card} extra={!showAll} Title={headingAs} key={card.href} />
      ))}
    </BentoGlowGrid>
  );
}
