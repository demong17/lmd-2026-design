"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { defaultConsent, readConsent, writeConsent, type ConsentState } from "@/lib/consent";

export function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [prefs, setPrefs] = useState<ConsentState>(defaultConsent);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setPrefs(stored);
      return;
    }
    const timer = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const openSettings = () => {
      setPrefs(readConsent() ?? defaultConsent());
      setCustomize(true);
      setOpen(true);
    };
    window.addEventListener("lmd:open-cookies", openSettings);
    return () => window.removeEventListener("lmd:open-cookies", openSettings);
  }, []);

  const save = (analytics: boolean, ads: boolean) => {
    const next = writeConsent({ analytics, ads });
    setPrefs(next);
    setOpen(false);
    setCustomize(false);
  };

  return (
    <div
      className={`cookie-banner${open ? " show" : ""}${customize ? " is-custom" : ""}`}
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
    >
      <div>
        <strong id="cookie-banner-title">Cookie settings</strong>
        <p>
          We use essential cookies to run the site. Analytics and ads cookies load only if you allow them. Read our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>
      </div>

      {customize ? (
        <div className="cookie-toggles">
          <label className="cookie-toggle">
            <span>
              <span className="cookie-toggle-label">Essential</span>
              <span className="cookie-toggle-help">Required for the site to work. Always on.</span>
            </span>
            <input type="checkbox" checked disabled readOnly />
          </label>
          <label className="cookie-toggle">
            <span>
              <span className="cookie-toggle-label">Analytics</span>
              <span className="cookie-toggle-help">Google Analytics and Hotjar, to see which pages help visitors convert.</span>
            </span>
            <input
              type="checkbox"
              checked={prefs.analytics}
              onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
            />
          </label>
          <label className="cookie-toggle">
            <span>
              <span className="cookie-toggle-label">Advertising</span>
              <span className="cookie-toggle-help">Google Ads, Meta, and TVSquared, to measure campaigns and avoid wasted spend.</span>
            </span>
            <input
              type="checkbox"
              checked={prefs.ads}
              onChange={(e) => setPrefs((p) => ({ ...p, ads: e.target.checked }))}
            />
          </label>
        </div>
      ) : null}

      <div className="cookie-actions">
        {customize ? (
          <button className="btn btn-primary btn-sm" type="button" onClick={() => save(prefs.analytics, prefs.ads)}>
            Save preferences
          </button>
        ) : (
          <button className="btn btn-primary btn-sm" type="button" onClick={() => save(true, true)}>
            Accept all
          </button>
        )}
        <button className="btn btn-outline btn-sm" type="button" onClick={() => save(false, false)}>
          Reject optional
        </button>
        {!customize ? (
          <button className="cookie-customize" type="button" onClick={() => setCustomize(true)}>
            Customize
          </button>
        ) : null}
      </div>
    </div>
  );
}
