"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/faqs";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list faq-page-list">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div className={`faq-item${expanded ? " open" : ""}`} key={item.q}>
            <button
              className="faq-q"
              type="button"
              aria-expanded={expanded}
              onClick={() => setOpen((cur) => (cur === i ? -1 : i))}
            >
              {item.q}
              <span className="faq-icon" aria-hidden="true" />
            </button>
            <div className="faq-a" role="region">
              <div className="faq-a-inner">
                {item.a.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
