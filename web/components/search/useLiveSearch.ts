"use client";

import { useEffect, useState } from "react";
import type { SearchHit } from "@/lib/search-types";

export function useLiveSearch(query: string, limit = 5) {
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setHits([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmed)}&limit=${limit}`,
          { signal: controller.signal },
        );
        if (!response.ok) return;
        const data = (await response.json()) as { results?: SearchHit[] };
        if (!controller.signal.aborted) {
          setHits(data.results ?? []);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") setHits([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }, 180);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, limit]);

  return { hits, loading };
}
