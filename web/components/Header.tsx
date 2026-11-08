"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SearchOverlay } from "@/components/search/SearchOverlay";
import { SiteImage } from "@/components/media/SiteImage";
import { NAV_LINKS, SERVICES, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";
import { isBlogPostPath } from "@/lib/blog-paths";

const canHover = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

function isActivePath(pathname: string, href: string) {
  if (href === "/services") return pathname.startsWith("/services");
  if (href === "/case-studies") return pathname === "/case-studies" || pathname.startsWith("/case-studies/");
  if (href === "/blog") return pathname === "/blog" || pathname === "/blogs" || isBlogPostPath(pathname);
  return pathname === href;
}

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openServices = () => {
    clearCloseTimer();
    setServicesOpen(true);
  };

  const scheduleCloseServices = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 180);
  };

  const movePill = useCallback((el: HTMLElement | null) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill) return;
    if (!el || window.matchMedia("(max-width: 860px)").matches) {
      pill.style.opacity = "0";
      return;
    }
    const navBox = nav.getBoundingClientRect();
    const box = el.getBoundingClientRect();
    pill.style.width = `${Math.round(box.width)}px`;
    pill.style.height = `${Math.round(box.height)}px`;
    pill.style.transform = `translate3d(${Math.round(box.left - navBox.left)}px, ${Math.round(box.top - navBox.top)}px, 0)`;
    pill.style.opacity = "1";
  }, []);

  const snapToCurrent = useCallback(() => {
    const current = navRef.current?.querySelector<HTMLElement>("[data-nav-current='true']");
    movePill(current ?? null);
  }, [movePill]);

  useEffect(() => {
    const onScroll = () => {
      headerRef.current?.classList.toggle("scrolled", window.scrollY > 12);
      window.requestAnimationFrame(() => snapToCurrent());
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [snapToCurrent]);

  useEffect(() => {
    snapToCurrent();
  }, [pathname, snapToCurrent]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNavOpen(false);
        setServicesOpen(false);
      }
    };
    const onResize = () => snapToCurrent();
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      clearCloseTimer();
    };
  }, [snapToCurrent]);

  const closeNav = () => {
    clearCloseTimer();
    setNavOpen(false);
    setServicesOpen(false);
  };

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  const openSearch = () => {
    closeNav();
    setSearchOpen(true);
  };

  useEffect(() => {
    setSearchOpen(false);
  }, [pathname]);

  const servicesCurrent = isActivePath(pathname, "/services");

  return (
    <header className="site-header" id="top" ref={headerRef}>
      <div className="container header-inner">
        <Link href="/" className="logo" onClick={closeNav}>
          <SiteImage
            className="logo-img"
            src="/assets/images/logo-header.webp?v=4"
            alt="Live Media Digital, Miami digital marketing agency"
            width={210}
            height={112}
            priority
            fetchPriority="high"
            unoptimized
            style={{ width: "auto" }}
          />
        </Link>

        <nav
          className={`main-nav${navOpen ? " open" : ""}`}
          id="main-nav"
          ref={navRef}
          onMouseLeave={() => {
            if (canHover()) snapToCurrent();
          }}
        >
          <span className="nav-pill" ref={pillRef} aria-hidden="true" />
          <div
            className={`nav-item${servicesOpen ? " open" : ""}${servicesCurrent ? " is-current" : ""}`}
            ref={servicesRef}
            onMouseEnter={() => {
              if (canHover()) openServices();
            }}
            onMouseLeave={() => {
              if (canHover()) scheduleCloseServices();
            }}
          >
            <button
              type="button"
              className="nav-dropdown-toggle"
              aria-expanded={servicesOpen}
              aria-controls="services-dropdown"
              data-nav-current={servicesCurrent ? "true" : "false"}
              onMouseEnter={(e) => {
                if (canHover()) movePill(e.currentTarget);
              }}
              onFocus={(e) => movePill(e.currentTarget)}
              onClick={(e) => {
                e.preventDefault();
                clearCloseTimer();
                setServicesOpen((open) => !open);
              }}
            >
              Services
              <svg className="nav-caret" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="nav-dropdown nav-mega" id="services-dropdown">
              <div className="nav-mega-col">
                <div className="nav-mega-grid">
                  {SERVICES.map((service) => (
                    <Link key={service.slug} href={`/services/${service.slug}`} className="nav-mega-item" onClick={closeNav}>
                      <span className="nav-mega-text">
                        <strong>{service.title}</strong>
                        <span>{service.blurb}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link href="/services" className="nav-mega-all" onClick={closeNav}>
                  View all services →
                </Link>
              </div>
              <div className="nav-mega-promo">
                <p className="nav-mega-promo-label">NOT SURE WHERE TO START?</p>
                <h4>Get a free strategy session.</h4>
                <p>We&apos;ll audit your site, ads, and SEO, then tell you exactly what to fix first.</p>
                <Link href="/consultation" className="btn btn-primary btn-sm" onClick={closeNav}>
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
          {NAV_LINKS.map((link) => {
            const current = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={current ? "is-current" : undefined}
                data-nav-current={current ? "true" : "false"}
                aria-current={current ? "page" : undefined}
                onMouseEnter={(e) => {
                  if (canHover()) movePill(e.currentTarget);
                }}
                onFocus={(e) => movePill(e.currentTarget)}
                onClick={closeNav}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="header-search-btn"
            aria-label="Search the site"
            aria-expanded={searchOpen}
            aria-haspopup="dialog"
            onClick={openSearch}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="6.25" />
              <path d="M16 16l4.2 4.2" strokeLinecap="round" />
            </svg>
          </button>
          <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-dark btn-sm header-cta">
            <span className="cta-full">Call {SITE_PHONE}</span>
            <span className="cta-short">Call Now</span>
          </a>
          <button
            className={`nav-toggle${navOpen ? " open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <SearchOverlay open={searchOpen} onClose={closeSearch} />
    </header>
  );
}
