"use client";

import Link from "next/link";
import type { SearchHit } from "@/lib/search-types";

export function SearchHitList({
  hits,
  compact = false,
  onNavigate,
}: {
  hits: SearchHit[];
  compact?: boolean;
  onNavigate?: () => void;
}) {
  if (hits.length === 0) return null;

  return (
    <ol className={`search-list${compact ? " search-list-live" : ""}`}>
      {hits.map((hit) => (
        <li key={hit.path}>
          <Link href={hit.path} onClick={onNavigate}>
            <span className="search-type">{hit.type}</span>
            <strong>{hit.title}</strong>
            <span
              className="search-snippet"
              dangerouslySetInnerHTML={{ __html: hit.snippetHtml }}
            />
            <span className="search-path">{hit.path === "/" ? "/" : hit.path}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
