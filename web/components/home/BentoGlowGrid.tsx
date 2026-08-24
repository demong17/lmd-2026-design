"use client";

import { type ReactNode, useEffect, useRef } from "react";

const PROXIMITY = 72;

export function BentoGlowGrid({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = ref.current;
    if (!grid) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      const cards = grid.querySelectorAll<HTMLElement>("[data-bento-glow]");
      cards.forEach((card) => {
        if (card.offsetParent === null) {
          card.style.setProperty("--glow-active", "0");
          return;
        }
        const rect = card.getBoundingClientRect();
        if (rect.width < 8 || rect.bottom < -40 || rect.top > window.innerHeight + 40) {
          card.style.setProperty("--glow-active", "0");
          return;
        }
        const active =
          x >= rect.left - PROXIMITY &&
          x <= rect.right + PROXIMITY &&
          y >= rect.top - PROXIMITY &&
          y <= rect.bottom + PROXIMITY;
        card.style.setProperty("--glow-active", active ? "1" : "0");
        if (!active) return;
        card.style.setProperty("--glow-x", `${Math.round(x - rect.left)}px`);
        card.style.setProperty("--glow-y", `${Math.round(y - rect.top)}px`);
      });
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
