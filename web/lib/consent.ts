export const CONSENT_KEY = "lmd-cookie-consent-v2";
const LEGACY_KEY = "lmd-cookie-consent";
export const CONSENT_EVENT = "lmd:consent-changed";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  ads: boolean;
  updatedAt: string;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    hj?: ((...args: unknown[]) => void) & { q?: unknown[] };
    _hjSettings?: { hjid: number; hjsv: number };
    _tvq?: unknown[];
  }
}

export const defaultConsent = (): ConsentState => ({
  necessary: true,
  analytics: false,
  ads: false,
  updatedAt: new Date().toISOString(),
});

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<ConsentState>;
      return {
        necessary: true,
        analytics: Boolean(parsed.analytics),
        ads: Boolean(parsed.ads),
        updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
      };
    }
    if (localStorage.getItem(LEGACY_KEY) === "true") {
      return { necessary: true, analytics: true, ads: true, updatedAt: new Date().toISOString() };
    }
  } catch {
    return null;
  }
  return null;
}

export function writeConsent(next: Omit<ConsentState, "necessary" | "updatedAt">): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: next.analytics,
    ads: next.ads,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  localStorage.removeItem(LEGACY_KEY);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
  return state;
}

export function applyGoogleConsent(state: ConsentState) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
  window.gtag("consent", "update", {
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_storage: state.ads ? "granted" : "denied",
    ad_user_data: state.ads ? "granted" : "denied",
    ad_personalization: state.ads ? "granted" : "denied",
  });
}
