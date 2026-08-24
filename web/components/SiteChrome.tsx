"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

function mailtoLead(subject: string, lines: string[]) {
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${SITE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;
}

export function SiteChrome() {
  const pathname = usePathname();
  const [cookieOpen, setCookieOpen] = useState(false);
  const [floatOpen, setFloatOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);

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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!localStorage.getItem("lmd-cookie-consent")) {
      const timer = window.setTimeout(() => setCookieOpen(true), 1200);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const open = () => setCookieOpen(true);
    window.addEventListener("lmd:open-cookies", open);
    return () => window.removeEventListener("lmd:open-cookies", open);
  }, []);

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

  const submitExit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = `${data.get("firstName") ?? ""} ${data.get("lastName") ?? ""}`.trim();
    mailtoLead("New Lead from Exit Popup", [
      `Name: ${name}`,
      `Email: ${data.get("email") ?? ""}`,
      `Phone: ${data.get("phone") ?? ""}`,
      `Business: ${data.get("business") ?? ""}`,
    ]);
    hideExit();
  };

  return (
    <>
      <div className={`cookie-banner${cookieOpen ? " show" : ""}`}>
        <div>
          <strong>Cookie Settings</strong>
          <p>
            We use cookies to personalize content, run ads, and analyze traffic. Read our <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>
        </div>
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={() => {
            localStorage.setItem("lmd-cookie-consent", "true");
            setCookieOpen(false);
          }}
        >
          Accept
        </button>
      </div>

      <div className={`float-contact${floatOpen ? " open" : ""}`}>
        <div className="float-contact-menu" id="float-contact-menu">
          <a href={`tel:${SITE_PHONE_TEL}`} className="float-contact-option">
            <span className="float-contact-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.2 2.2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Call {SITE_PHONE}</span>
          </a>
          <a href={`mailto:${SITE_EMAIL}`} className="float-contact-option">
            <span className="float-contact-icon">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5c-1.35 0-2.61-.32-3.72-.89L3 21l1.89-5.28A8.46 8.46 0 013.5 11.5 8.5 8.5 0 0112 3a8.5 8.5 0 019 8.5z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span>Email Us</span>
          </a>
        </div>
        <button
          type="button"
          className="float-contact-toggle"
          aria-expanded={floatOpen}
          aria-label="Contact us"
          aria-controls="float-contact-menu"
          onClick={() => setFloatOpen((open) => !open)}
        >
          <svg className="fc-icon-open" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 11.5a8.5 8.5 0 01-8.5 8.5c-1.35 0-2.61-.32-3.72-.89L3 21l1.89-5.28A8.46 8.46 0 013.5 11.5 8.5 8.5 0 0112 3a8.5 8.5 0 019 8.5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg className="fc-icon-close" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </div>

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
          <form className="exit-popup-form" onSubmit={submitExit}>
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
              <label htmlFor="ep-phone">Phone number</label>
              <input type="tel" id="ep-phone" name="phone" autoComplete="tel" required placeholder=" " />
            </div>
            <div className="form-field">
              <label htmlFor="ep-business">Business name</label>
              <input type="text" id="ep-business" name="business" autoComplete="organization" required placeholder=" " />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Send Me the Free Report</button>
          </form>
        </div>
      </div>
    </>
  );
}
