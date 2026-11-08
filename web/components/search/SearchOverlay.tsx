"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SearchHitList } from "@/components/search/SearchHitList";
import { useLiveSearch } from "@/components/search/useLiveSearch";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const { hits, loading } = useLiveSearch(query, 5);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const trimmed = query.trim();
  const showEmpty = trimmed.length >= 2 && !loading && hits.length === 0;

  return createPortal(
    <div className="search-overlay" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="search-overlay-backdrop" aria-label="Close search" onClick={onClose} />
      <div className="search-overlay-panel">
        <h2 id={titleId} className="sr-only">
          Search the site
        </h2>
        <button type="button" className="search-overlay-close" onClick={onClose} aria-label="Close search">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        <form className="site-search" action="/search" method="get" role="search">
          <label className="site-search-label" htmlFor={inputId}>
            Search the site
          </label>
          <div className="site-search-row">
            <input
              ref={inputRef}
              id={inputId}
              name="q"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="SEO, Coral Gables, email, case studies…"
              autoComplete="off"
              maxLength={120}
              enterKeyHint="search"
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
        <div className="search-live" aria-live="polite" aria-busy={loading}>
          {loading && trimmed.length >= 2 && hits.length === 0 ? (
            <p className="search-live-status">Searching…</p>
          ) : null}
          <SearchHitList hits={hits} compact />
          {hits.length > 0 ? (
            <p className="search-live-more">
              <Link href={`/search?q=${encodeURIComponent(trimmed)}`}>
                View all results
              </Link>
            </p>
          ) : null}
          {showEmpty ? (
            <p className="search-live-status">No matches. Try SEO, Miami, or a service name.</p>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
