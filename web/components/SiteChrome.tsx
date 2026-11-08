"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AccessibilityWidget } from "@/components/a11y/AccessibilityWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { ContactConsent } from "@/components/forms/ContactConsent";
import { submitLead } from "@/lib/submit-lead";

export function SiteChrome() {
  const pathname = usePathname();
  const [exitOpen, setExitOpen] = useState(false);
  const [exitStatus, setExitStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [exitError, setExitError] = useState("");

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const key = "lmd-exit-popup-shown";
    if (sessionStorage.getItem(key) === "true") return;
    let shown = false;
    let maxDepth = 0;
    let lastY = window.scrollY;

    const show = () => {
      if (shown) return;
      shown = true;
      sessionStorage.setItem(key, "true");
      setExitOpen(true);
      document.body.style.overflow = "hidden";
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) show();
    };
    const onScroll = () => {
      const y = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? y / scrollable : 0;
      maxDepth = Math.max(maxDepth, depth);
      if (maxDepth > 0.85 && lastY - y > 60) show();
      lastY = y;
    };

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const hideExit = () => {
    setExitOpen(false);
    document.body.style.overflow = "";
  };

  const submitExit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setExitStatus("pending");
    setExitError("");
    try {
      await submitLead("New Lead from Exit Popup", form);
      form.reset();
      setExitStatus("success");
    } catch (err) {
      setExitStatus("error");
      setExitError(err instanceof Error ? err.message : "The note could not be sent. Call (305) 918-2306 and try again.");
    }
  };

  return (
    <>
      <CookieBanner />
      <AccessibilityWidget />

      <div className="exit-popup" role="dialog" aria-modal="true" aria-labelledby="exit-popup-title" hidden={!exitOpen}>
        <div className="exit-popup-backdrop" onClick={hideExit} />
        <div className="exit-popup-card">
          <button type="button" className="exit-popup-close" aria-label="Close" onClick={hideExit}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <p className="eyebrow">WAIT, BEFORE YOU GO</p>
          <h3 id="exit-popup-title">Get your free AI visibility report.</h3>
          <p className="section-sub">Leave your info and we&apos;ll send a free report on how ChatGPT, Google AI Overviews, and Perplexity describe your business.</p>
          <form className="exit-popup-form" onSubmit={submitExit} data-pending={exitStatus === "pending" ? "true" : undefined} noValidate>
            {exitStatus === "success" ? (
              <p className="form-status" data-tone="success" role="status">
                Sent. We will follow up by email.
              </p>
            ) : (
            <>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="ep-first-name">First name</label>
                <input type="text" id="ep-first-name" name="firstName" autoComplete="given-name" required placeholder=" " />
              </div>
              <div className="form-field">
                <label htmlFor="ep-last-name">Last name</label>
                <input type="text" id="ep-last-name" name="lastName" autoComplete="family-name" required placeholder=" " />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="ep-email">Email</label>
              <input type="email" id="ep-email" name="email" autoComplete="email" required placeholder=" " />
            </div>
            <div className="form-field">
              <label htmlFor="ep-business">Business name</label>
              <input type="text" id="ep-business" name="business" autoComplete="organization" required placeholder=" " />
            </div>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="ep-fax">Company</label>
              <input id="ep-fax" name="fax" tabIndex={-1} autoComplete="off" />
            </div>
                <ContactConsent id="ep-consent" />
                <button type="submit" className="btn btn-primary btn-block" disabled={exitStatus === "pending"}>
                  {exitStatus === "pending" ? "Sending…" : "Send Me the Free Report"}
                </button>
                <p className="form-status" data-tone={exitStatus} role="status">
                  {exitStatus === "error" ? exitError : null}
                </p>
            </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
