"use client";

import { useEffect } from "react";
import { applyGoogleConsent, CONSENT_EVENT, readConsent, type ConsentState } from "@/lib/consent";
import {
  GA_MEASUREMENT_IDS,
  HOTJAR_ID,
  HOTJAR_SV,
  TVSQUARED_COLLECTOR,
  TVSQUARED_SITE_ID,
} from "@/lib/tracking";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

function loadScript(src: string, id: string, attrs?: Record<string, string>) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      script.setAttribute(key, value);
    }
  }
  document.head.appendChild(script);
}

function loadGoogleAnalytics() {
  const primary = GA_MEASUREMENT_IDS[0];
  if (!primary) return;
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(primary)}`, "lmd-ga");
  window.gtag?.("js", new Date());
  for (const id of GA_MEASUREMENT_IDS) {
    window.gtag?.("config", id, { anonymize_ip: true });
  }
}

function loadHotjar() {
  if (document.getElementById("lmd-hotjar")) return;
  window.hj =
    window.hj ||
    function hj(...args: unknown[]) {
      (window.hj!.q = window.hj!.q || []).push(args);
    };
  window._hjSettings = { hjid: HOTJAR_ID, hjsv: HOTJAR_SV };
  loadScript(`https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=${HOTJAR_SV}`, "lmd-hotjar");
}

function loadTvSquared() {
  if (document.getElementById("lmd-tvsquared")) return;
  window._tvq = window._tvq || [];
  window._tvq.push(["setSiteId", TVSQUARED_SITE_ID]);
  window._tvq.push(["setTrackerUrl", `${TVSQUARED_COLLECTOR}tv2track.php`]);
  window._tvq.push([
    function deleteCustomVariable(this: { deleteCustomVariable: (index: number, scope: string) => void }) {
      this.deleteCustomVariable(5, "page");
    },
  ]);
  window._tvq.push(["trackPageView"]);
  const script = document.createElement("script");
  script.id = "lmd-tvsquared";
  script.async = true;
  script.defer = true;
  script.src = `${TVSQUARED_COLLECTOR}tv2track.js`;
  document.head.appendChild(script);
}

let metaInited = false;

function loadMetaPixel() {
  if (!PIXEL_ID || metaInited) return;
  metaInited = true;
  loadScript("https://connect.facebook.net/en_US/fbevents.js", "lmd-meta");
  const fbq = (...args: unknown[]) => {
    const fn = window.fbq as ((...a: unknown[]) => void) & { q?: unknown[] };
    fn.q = fn.q || [];
    fn.q.push(args);
  };
  if (!window.fbq) window.fbq = fbq;
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

function enableAnalytics(state: ConsentState) {
  applyGoogleConsent(state);
  if (state.analytics || state.ads) {
    loadGoogleAnalytics();
  }
  if (state.analytics) {
    loadHotjar();
  }
  if (state.ads) {
    loadMetaPixel();
    loadTvSquared();
  }
}

export function ConsentScripts() {
  useEffect(() => {
    const sync = () => {
      const consent = readConsent();
      if (consent) enableAnalytics(consent);
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  return null;
}
