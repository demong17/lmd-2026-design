"use client";

import Link from "next/link";
import { SiteImage } from "@/components/media/SiteImage";
import { SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL, SOCIAL } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <SiteImage
              className="logo-img"
              src="/assets/lmd/logo-footer.png"
              alt="Live Media Digital, Miami digital marketing agency"
              width={220}
              height={58}
              style={{ width: "auto" }}
            />
          </Link>
          <p>SEO, paid media, web development and content, built around real results for businesses of every size.</p>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Company</p>
          <Link href="/about-us">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/process">Our Process</Link>
          <Link href="/blog">Resources</Link>
          <a href="/rss.xml">RSS</a>
          <Link href="/faqs">FAQs</Link>
          <Link href="/search">Search</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/consultation">Free Consultation</Link>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Legal</p>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
          <Link href="/accessibility">Accessibility</Link>
          <button className="link-btn" type="button" onClick={() => window.dispatchEvent(new Event("lmd:open-cookies"))}>
            Cookie Settings
          </button>
          <button className="link-btn" type="button" onClick={() => window.dispatchEvent(new Event("lmd:open-a11y"))}>
            Accessibility tools
          </button>
        </div>
        <div className="footer-col">
          <p className="footer-heading">Contact</p>
          <a href={`tel:${SITE_PHONE_TEL}`} className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1l-2.2 2.2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{SITE_PHONE}</span>
          </a>
          <a href={`mailto:${SITE_EMAIL}`} className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{SITE_EMAIL}</span>
          </a>
          <div className="footer-contact-item">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 21s-7-6.5-7-11.5a7 7 0 0114 0C19 14.5 12 21 12 21z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="9.5" r="2.3" />
            </svg>
            <span>
              3400 NW 78th Ave, Suite 109
              <br />
              Doral, FL 33122
            </span>
          </div>
          <div className="footer-socials">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener" className="footer-social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener" className="footer-social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M17 3h-3a4 4 0 00-4 4v3H7v4h3v10h4V14h3l1-4h-4V7a1 1 0 011-1h3V3z" strokeLinejoin="round" />
              </svg>
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener" className="footer-social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M7 10v7M7 7v.01M11 17v-4.5a2.5 2.5 0 015 0V17M11 10v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom container">
        <span>© {year} Live Media Digital. All rights reserved. South Florida digital marketing agency. Google, Meta &amp; Microsoft certified.</span>
      </div>
    </footer>
  );
}
