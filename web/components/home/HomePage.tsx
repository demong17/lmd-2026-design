"use client";

import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BentoGlowGrid } from "@/components/home/BentoGlowGrid";
import { HOME_FAQS, SITE_EMAIL, SITE_PHONE, SITE_PHONE_TEL } from "@/lib/site";

const isValidWebsiteUrl = (value: string) =>
  /^(https?:\/\/)?([a-zA-Z0-9](-?[a-zA-Z0-9])*\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/.test(value);

const BENTO = [
  { href: "/services/seo", title: "Search Engine Optimization", copy: "The foundation of every strategy. On-page, off-page, and technical SEO so you rank where it matters, and stay there.", video: "bento-seo", extra: false },
  { href: "/services/sem", title: "Search Engine Marketing", copy: "Paid search on Google & Bing that gets qualified traffic fast, ideal while your organic rankings are still building.", video: "bento-sem", extra: false },
  { href: "/services/social-media-marketing", title: "Social Media Marketing", copy: "Paid campaigns on Facebook, Instagram and beyond that turn followers into customers, coordinated with your internal team.", video: "bento-social", extra: false },
  { href: "/services/web-development", title: "Web Development", copy: "Fast, mobile-friendly websites engineered to convert the traffic we drive, not just look good.", video: "bento-webdev", extra: false },
  { href: "/services/content-marketing", title: "Content Marketing", copy: "SEO-driven content, blogs, and landing pages written to rank on Google and sell once they get there.", video: "bento-content", extra: false },
  { href: "/services/email-marketing", title: "Email Marketing", copy: "Targeted campaigns that turn warm leads and past customers into repeat revenue.", video: "bento-email", extra: false },
  { href: "/services/aeo-geo", title: "AEO & GEO", copy: "Answer and generative engine optimization so ChatGPT, Perplexity, and AI Overviews recommend your business by name.", video: "bento-aeogeo", extra: true, extraClass: "bento-card-extra-1" },
  { href: "/services/voice-agents", title: "Voice Agents", copy: "AI voice agents that answer calls, book appointments, and qualify leads around the clock.", video: "bento-voice", extra: true, extraClass: "bento-card-extra-2" },
  { href: "/services/ecommerce-development", title: "E-commerce Development", copy: "Online stores built to convert, from product pages to checkout, so browsers become buyers.", video: "bento-ecommerce", extra: true, extraClass: "bento-card-extra-3" },
  { href: "/services/business-automation", title: "Business Automation", copy: "Connect your tools and automate the manual work eating your team's day.", video: "bento-automation", extra: true, extraClass: "bento-card-extra-4" },
  { href: "/services/software-development", title: "Software Development", copy: "Custom tools, portals, and integrations built around how you operate.", video: "bento-softwaredev", extra: true, extraClass: "bento-card-extra-5" },
  { href: "/services/digital-infrastructure-consulting", title: "Digital Infrastructure Consulting", copy: "Hosting, security, and systems built to scale with your growth.", video: "bento-infra", extra: true, extraClass: "bento-card-extra-6" },
];

const PARTNERS = [
  { src: "/assets/lmd/partners/google-partner.svg", alt: "Google Partner" },
  { src: "/assets/lmd/partners/microsoft.webp", alt: "Microsoft Advertising Partner" },
  { src: "/assets/lmd/partners/facebook.webp", alt: "Meta / Facebook Advertising Partner" },
  { src: "/assets/lmd/partners/yelp.webp", alt: "Yelp Advertising Partner" },
  { src: "/assets/lmd/partners/klaviyo.webp", alt: "Klaviyo Certified Partner" },
  { src: "/assets/lmd/partners/semrush.webp", alt: "Semrush Certified Agency Partner" },
  { src: "/assets/lmd/partners/reddit.svg", alt: "Reddit Certified Partner" },
  { src: "/assets/lmd/partners/pinterest.svg", alt: "Pinterest Certified Partner" },
  { src: "/assets/lmd/partners/tiktok.svg", alt: "TikTok Certified Partner" },
  { src: "/assets/lmd/partners/linkedin.svg", alt: "LinkedIn" },
];

const CLIENT_LOGOS = [
  "logo3.webp", "logo10.webp", "signatture.webp", "sergio.webp", "logo.webp", "fyi.webp",
  "logo30.webp", "logo29.webp", "logo28.webp", "logo27.webp", "logo26.webp", "logo25.webp",
  "logo24.webp", "logo23.webp", "logo22.webp", "logo21.webp", "bkf.webp", "fastlabs.webp", "logo18.webp",
];

const QUOTES = [
  { quote: "Live Media Digital has been with us since the very beginning and has played a major role in the success of our business. They took the time to understand our clientele and built a strategy with real ROI on every dollar we spend.", name: "Adam Cendan", company: "Ultimate Containers Pro", img: "/assets/lmd/testimonials/ultimate-containers-pro.jpg" },
  { quote: "Very impressed with the results across all our locations. Their communication is beyond amazing.", name: "Carlos Pérez", company: "The Tax Team", img: "/assets/lmd/testimonials/the-tax-team.jpg" },
  { quote: "Nothing short of an excellent and professional experience. Their turn-around and professionalism is second to none.", name: "Ashley Godinez", company: "Sushi Sake Sunset", img: "/assets/lmd/testimonials/sushi-sake-sunset.jpg" },
  { quote: "A client relationship for over two years now. They generated a dramatic increase in foot traffic by optimizing SEO for both of our clinic locations.", name: "Carlo Suarez-Burgos", company: "Miracle Leaf", img: "/assets/lmd/testimonials/miracle-leaf.jpg" },
];

const INDUSTRY_COLS = [
  [
    ["/industries/home-services", "Home Services & Contractors"],
    ["/industries/hvac-plumbing", "HVAC & Plumbing"],
    ["/industries/roofing", "Roofing"],
    ["/industries/painting-renovation", "Painting & Renovation"],
    ["/industries/landscaping", "Landscaping"],
    ["/industries/pest-control", "Pest Control"],
    ["/industries/moving-storage", "Moving & Storage"],
    ["/industries/waste-container-rental", "Waste & Container Rental"],
    ["/industries/insurance-agencies", "Insurance Agencies"],
  ],
  [
    ["/industries/restaurants-hospitality", "Restaurants & Hospitality"],
    ["/industries/dental", "Dental Practices"],
    ["/industries/medical-wellness", "Medical & Wellness Centers"],
    ["/industries/veterinary", "Veterinary Clinics"],
    ["/industries/law-firms", "Law Firms"],
    ["/industries/accounting-tax", "Accounting & Tax Services"],
    ["/industries/real-estate", "Real Estate"],
    ["/industries/automotive-car-wash", "Automotive & Car Wash"],
    ["/industries/research-centers", "Research Centers"],
  ],
  [
    ["/industries/retail-ecommerce", "Retail & E-commerce"],
    ["/industries/health-cannabis", "Health & Cannabis Dispensaries"],
    ["/industries/fitness-gyms", "Fitness & Gyms"],
    ["/industries/beauty-med-spas", "Beauty & Med Spas"],
    ["/industries/franchises", "Franchises & Multi-Location Brands"],
    ["/industries/marine-yacht", "Marine & Yacht Services"],
    ["/industries/manufacturing", "Manufacturing & Industrial"],
    ["/industries/professional-services", "Professional Services"],
    ["/industries/personal-brands-coaches", "Personal Brands & Coaches"],
  ],
] as const;

export function HomePage() {
  const router = useRouter();
  const [searchError, setSearchError] = useState(false);
  const [bentoOpen, setBentoOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const teamTrackRef = useRef<HTMLDivElement>(null);
  const [teamPrevOff, setTeamPrevOff] = useState(true);
  const [teamNextOff, setTeamNextOff] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const spotlight = spotlightRef.current;
    if (!hero || !spotlight || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = false;
    let x = 50;
    let y = 30;
    const onMove = (e: PointerEvent) => {
      const rect = hero.getBoundingClientRect();
      x = ((e.clientX - rect.left) / rect.width) * 100;
      y = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) {
        raf = true;
        requestAnimationFrame(() => {
          spotlight.style.setProperty("--mx", `${x}%`);
          spotlight.style.setProperty("--my", `${y}%`);
          raf = false;
        });
      }
    };
    hero.addEventListener("pointermove", onMove);
    return () => hero.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setQuoteIndex((i) => (i + 1) % QUOTES.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>(".bento-media video");
    if (!videos.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLVideoElement).play().catch(() => {});
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" },
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, [bentoOpen]);

  const updateTeamArrows = () => {
    const track = teamTrackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth - 2;
    setTeamPrevOff(track.scrollLeft <= 2);
    setTeamNextOff(track.scrollLeft >= max);
  };

  useEffect(() => {
    updateTeamArrows();
    window.addEventListener("resize", updateTeamArrows);
    return () => window.removeEventListener("resize", updateTeamArrows);
  }, []);

  const teamStep = () => {
    const card = teamTrackRef.current?.querySelector(".team-card");
    return card ? card.getBoundingClientRect().width + 16 : 240;
  };

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem("url") as HTMLInputElement;
    const url = input.value.trim();
    const valid = Boolean(url && isValidWebsiteUrl(url));
    setSearchError(!valid);
    if (!valid) {
      input.focus();
      return;
    }
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    router.push(`/get-report?url=${encodeURIComponent(normalized)}`);
  };

  return (
    <main>
      <section className="hero hero-dark hero-video" id="hero-dark" ref={heroRef}>
        <video className="hero-bg-video" ref={videoRef} muted loop playsInline preload="auto" poster="/assets/images/hero-bg-poster.webp" aria-hidden="true">
          <source src="/assets/images/bento-video/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-spotlight" aria-hidden="true" ref={spotlightRef} />
        <div className="hero-grid" aria-hidden="true" />
        <div className="container">
          <div className="reveal badge-pill">SHARP STRATEGIES. SERIOUS RESULTS.</div>
          <h1 className="reveal hero-title">From Click to Closed Deal.<br />We Help You Scale.</h1>
          <p className="reveal hero-sub">Live Media Digital combines SEO, GEO, paid media, web development and content into one strategy, built around leads, conversions, and ROI you can trace back to the campaign.</p>
          <form className={`reveal hero-search${searchError ? " has-error" : ""}`} onSubmit={onSearch}>
            <svg className="hero-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
            </svg>
            <label htmlFor="hero-search-input" className="sr-only">Enter your website URL</label>
            <input
              type="text"
              id="hero-search-input"
              name="url"
              placeholder="yourwebsite.com"
              autoComplete="url"
              inputMode="url"
              required
              onChange={() => setSearchError(false)}
            />
            <button type="submit" className="btn btn-primary hero-search-btn">Free AI Visibility Report</button>
          </form>
          <p className={`reveal hero-search-hint${searchError ? " is-visible" : ""}`} role="alert">Please enter a valid website URL, e.g. yourwebsite.com</p>
          <p className="reveal hero-search-hint">Free report: see how ChatGPT, Google AI Overviews, and Perplexity describe your business.</p>
        </div>
      </section>

      <section className="trusted-strip">
        <div className="marquee">
          <div className="marquee-track">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <img key={`${p.src}-${i}`} src={p.src} alt={p.alt} />
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works" id="process">
        <div className="container">
          <div className="section-head reveal">
            <h2>From first call to real results.</h2>
            <p className="section-sub">We take the time to understand your business before we touch a single campaign, then we build, launch, and optimize as one team.</p>
          </div>
          <div className="step step-1 reveal">
            <div className="step-text">
              <p className="step-kicker">Free Strategy Consultation</p>
              <h3>We start by understanding your business, not pitching a package.</h3>
              <p>Every engagement starts with a free, no-obligation consultation to learn your goals, your market, and where your current site and campaigns are falling short.</p>
              <ul className="check-list">
                <li>No-pressure first call, no hard sell</li>
                <li>Full audit of your site, SEO, and ad accounts</li>
                <li>Clear roadmap before you spend a dollar</li>
              </ul>
            </div>
            <div className="step-media two-up">
              <img src="/assets/images/step1-a.png" alt="Marketing strategy planning" loading="lazy" />
              <img src="/assets/images/step1-b.png" alt="Digital marketing research" loading="lazy" />
            </div>
          </div>
          <div className="step step-2 reveal reverse">
            <div className="step-text">
              <p className="step-kicker">Custom Strategy &amp; Build</p>
              <h3>SEO, paid media, and web, built as one plan, not three vendors.</h3>
              <p>We design a strategy that ties your website, search rankings, and ad spend together, then build landing pages engineered to convert the traffic we drive.</p>
              <ul className="check-list">
                <li>SEO, SEM, social &amp; web combined into one plan</li>
                <li>Landing pages built to convert, not just look good</li>
                <li>Every recommendation backed by data</li>
              </ul>
            </div>
            <div className="step-media canvas-mock">
              <img src="/assets/images/step2-strategy.webp" alt="SEO, paid media, and web strategy tied together into one plan" width={1200} height={896} loading="lazy" />
            </div>
          </div>
          <div className="step step-3 reveal">
            <div className="step-text">
              <p className="step-kicker">Launch, Track &amp; Optimize</p>
              <h3>We stay in it, tracking leads, not just traffic.</h3>
              <p>Once live, every campaign is tracked against real business outcomes: leads, calls, and conversions, not vanity metrics. We optimize continuously, not once a quarter.</p>
              <ul className="check-list">
                <li>Real-time reporting on leads &amp; ROI</li>
                <li>Ongoing optimization, not set-it-and-forget-it</li>
                <li>Direct access to your strategist, not a ticket queue</li>
              </ul>
            </div>
            <div className="step-media chart-card">
              <div className="chart-card-head">
                <div>
                  <span className="chart-stat">+34% Leads</span>
                  <span className="chart-stat-sub">88.7% Retention</span>
                </div>
                <div>
                  <span className="chart-stat">1.2x ROAS</span>
                  <span className="chart-stat-sub">4 Active Channels</span>
                </div>
              </div>
              <div className="chart-card-date">Rolling 90-day performance</div>
              <svg className="chart-line" viewBox="0 0 300 90" preserveAspectRatio="none">
                <polyline points="0,70 40,68 70,50 100,58 140,30 180,36 220,14 260,20 300,4" fill="none" stroke="#3AC96B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="chart-card-foot"><span>Month 1</span><span>Month 3</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="container">
          <div className="section-head reveal light">
            <p className="eyebrow">OUR SERVICES</p>
            <h2>Team of Strategists, zero wasted spend.</h2>
            <p className="section-sub">Built for the businesses that can&apos;t afford to guess: dentists, contractors, restaurants, lawyers, HVAC companies, and every local team competing for the same customers.</p>
          </div>
          <BentoGlowGrid className={`bento-grid${bentoOpen ? " expanded" : ""}`}>
            {BENTO.filter((c) => !c.extra).map((card) => (
              <div className="bento-card reveal" data-bento-glow key={card.href}>
                <span className="bento-glow" aria-hidden="true" />
                <div className="bento-media">
                  <video src={`/assets/images/bento-video/${card.video}.mp4?v=2`} poster={`/assets/images/${card.video}.webp?v=2`} width={800} height={450} muted loop playsInline preload="none" aria-label={card.title} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <Link href={card.href} className="bento-card-btn">Learn more →</Link>
              </div>
            ))}
            <div className="bento-more-row">
              <button type="button" className="bento-more-toggle" aria-expanded={bentoOpen} onClick={() => setBentoOpen((o) => !o)}>
                <span>{bentoOpen ? "See less" : "See more"}</span>
                <svg className="bento-more-caret" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            {BENTO.filter((c) => c.extra).map((card) => (
              <div className={`bento-card bento-card-extra ${card.extraClass ?? ""}`} data-bento-glow key={card.href}>
                <span className="bento-glow" aria-hidden="true" />
                <div className="bento-media">
                  <video src={`/assets/images/bento-video/${card.video}.mp4?v=2`} poster={`/assets/images/${card.video}.webp?v=2`} width={800} height={450} muted loop playsInline preload="none" aria-label={card.title} />
                </div>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <Link href={card.href} className="bento-card-btn">Learn more →</Link>
              </div>
            ))}
          </BentoGlowGrid>
        </div>
      </section>

      <section className="trust-tiles">
        <div className="container">
          <div className="trust-tiles-head reveal">
            <h2>Trusted by businesses everywhere.</h2>
            <p>Local shops to multi-location brands: business owners choose Live Media Digital to run their marketing like an in-house team.</p>
          </div>
          <div className="trust-tiles-marquee reveal">
            <div className="trust-tiles-track">
              {CLIENT_LOGOS.map((file) => (
                <img key={file} src={`/assets/lmd/clients/${file}`} alt="Live Media Digital client logo" />
              ))}
              {CLIENT_LOGOS.map((file) => (
                <img key={`dup-${file}`} src={`/assets/lmd/clients/${file}`} alt="" aria-hidden="true" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="case-studies" id="case-studies">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow center">CASE STUDIES</p>
            <h2>The work behind the results.</h2>
            <p className="section-sub center">Not staged metrics, just the outcomes our clients talk about when they call us back.</p>
          </div>
          <div className="case-rows">
            <article className="case-row reveal">
              <div className="case-row-media">
                <img src="/assets/lmd/testimonials/el-car-wash.webp" alt="El Car Wash" loading="lazy" />
                <div className="case-result"><span className="case-result-stat">500K+</span><span className="case-result-label">unlimited members, up from 10,000</span></div>
              </div>
              <div className="case-row-text">
                <span className="case-tags"><span>Web Design</span><span>SEO</span></span>
                <h3>El Car Wash</h3>
                <p className="case-row-meta">From 2 locations to 80+. A full-funnel website, SEO, and paid media system built to scale.</p>
                <p className="case-row-context">&quot;Every channel had one job, and every job pointed at the same outcome: a new unlimited member at the nearest location.&quot;<span>— Live Media Digital</span></p>
              </div>
            </article>
            <article className="case-row reverse reveal">
              <div className="case-row-media">
                <img src="/assets/lmd/testimonials/miracle-leaf-ribbon.webp" alt="Miracle Leaf" loading="lazy" />
                <div className="case-result"><span className="case-result-stat">47%</span><span className="case-result-label">increase in foot traffic across both locations</span></div>
              </div>
              <div className="case-row-text">
                <span className="case-tags"><span>SEO</span><span>Local Search</span></span>
                <h3>Miracle Leaf</h3>
                <p className="case-row-meta">A 2+ year partnership built on local SEO for both clinic locations.</p>
                <p className="case-row-context">&quot;They generated a dramatic increase in foot traffic by optimizing SEO for both of our clinic locations.&quot;<span>— Carlo Suarez-Burgos</span></p>
              </div>
            </article>
            <article className="case-row reveal">
              <div className="case-row-media">
                <img src="/assets/lmd/testimonials/crown-roofing.webp" alt="Crown Roofing & Waterproofing" loading="lazy" />
                <div className="case-result"><span className="case-result-stat">+32%</span><span className="case-result-label">increase in leads</span></div>
              </div>
              <div className="case-row-text">
                <span className="case-tags"><span>Web Design</span><span>SEO</span></span>
                <h3>Crown Roofing &amp; Waterproofing</h3>
                <p className="case-row-meta">A rebuilt website and market-by-market SEO and paid media system across four Florida offices.</p>
                <p className="case-row-context">&quot;More leads is only half the story. The site and the campaigns were built together, so every dollar brought in a homeowner who was ready to get Crown on it.&quot;<span>— Live Media Digital</span></p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <div className="section-head reveal">
            <h2>Real businesses. One strategy each.</h2>
            <p className="section-sub center">We work with a deliberately small roster so every client gets a strategist&apos;s full attention, not a rotating account team.</p>
          </div>
          <div className="quote-spotlight reveal">
            <span className="qs-mark" aria-hidden="true">“</span>
            <div className="qs-track" aria-live="polite">
              {QUOTES.map((item, i) => (
                <blockquote key={item.name} className={`qs-slide${i === quoteIndex ? " is-active" : ""}`}>
                  <p>{item.quote}</p>
                </blockquote>
              ))}
            </div>
            <div className="qs-footer">
              <div className="qs-authors">
                {QUOTES.map((item, i) => (
                  <div key={item.name} className={`qs-author${i === quoteIndex ? " is-active" : ""}`}>
                    <strong>{item.name}</strong>
                    <span>{item.company}</span>
                  </div>
                ))}
              </div>
              <div className="qs-progress" aria-hidden="true"><span className={quoteIndex >= 0 ? "is-animating" : ""} /></div>
            </div>
            <div className="qs-people" role="tablist" aria-label="Choose a client story">
              {QUOTES.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  className={`qs-person${i === quoteIndex ? " is-active" : ""}`}
                  role="tab"
                  aria-selected={i === quoteIndex}
                  aria-label={`${item.name}, ${item.company}`}
                  onClick={() => setQuoteIndex(i)}
                >
                  <img src={item.img} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="team-intro" id="about">
        <div className="container">
          <div className="team-intro-inner reveal">
            <div className="team-intro-text">
              <h2>Your strategy team, on call.</h2>
              <p className="section-sub">You&apos;ll work directly with Abe and Schneider, not a rotating account manager or an outsourced ticket queue.</p>
              <Link href="/#consultation" className="btn btn-primary">Get Free Consultation</Link>
            </div>
            <div className="team-cards-wrap">
              <button type="button" className="team-arrow team-arrow-prev" aria-label="Previous team member" disabled={teamPrevOff} onClick={() => teamTrackRef.current?.scrollBy({ left: -teamStep(), behavior: "smooth" })}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <div className="team-cards-track" ref={teamTrackRef} onScroll={updateTeamArrows}>
                <div className="team-card">
                  <img src="/assets/lmd/team/abe-rodriguez.jpg" alt="Abe Rodriguez" />
                  <strong>Abe Rodriguez</strong>
                  <span>Head of Business Development</span>
                </div>
                <div className="team-card">
                  <img src="/assets/lmd/team/schneider-jean.jpg" alt="Schneider Jean" />
                  <strong>Schneider Jean</strong>
                  <span>Chief Digital Strategist</span>
                </div>
              </div>
              <button type="button" className="team-arrow team-arrow-next" aria-label="Next team member" disabled={teamNextOff} onClick={() => teamTrackRef.current?.scrollBy({ left: teamStep(), behavior: "smooth" })}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="plans" id="pricing">
        <div className="container">
          <div className="section-head reveal">
            <h2>Plans sized to your business.</h2>
            <p className="section-sub center">Every engagement is scoped and priced around your business, not pulled off a shelf. These tiers are a starting point for the conversation, not a fixed menu.</p>
          </div>
          <div className="plans-grid reveal">
            <article className="plan-card">
              <h3>Launch</h3>
              <p className="plan-desc">For local businesses just getting started with digital marketing.</p>
              <ul className="check-list">
                <li>SEO foundations &amp; Google Business Profile setup</li>
                <li>Single-channel campaign management</li>
                <li>Monthly performance reporting</li>
                <li>Email support</li>
              </ul>
              <Link href="/#consultation" className="btn btn-outline btn-block">Start with Launch</Link>
            </article>
            <article className="plan-card featured">
              <span className="popular-pill">MOST POPULAR</span>
              <h3>Grow</h3>
              <p className="plan-desc">For growing businesses ready to scale across multiple channels.</p>
              <ul className="check-list">
                <li>Everything in Launch</li>
                <li>SEO + paid search (SEM) combined</li>
                <li>Paid social ad management</li>
                <li>Dedicated strategist &amp; priority support</li>
              </ul>
              <Link href="/#consultation" className="btn btn-primary btn-block">Start with Grow</Link>
            </article>
            <article className="plan-card">
              <h3>Scale</h3>
              <p className="plan-desc">For established brands running full-scale, multi-channel campaigns.</p>
              <ul className="check-list">
                <li>Everything in Grow</li>
                <li>Full-funnel strategy: SEO, SEM, social &amp; email</li>
                <li>Custom content &amp; creative production</li>
                <li>Dedicated account team &amp; quarterly reviews</li>
              </ul>
              <Link href="/#consultation" className="btn btn-outline btn-block">Start with Scale</Link>
            </article>
          </div>
          <ul className="plans-trust-strip reveal">
            <li>No long-term contracts</li>
            <li>Google, Meta &amp; Microsoft certified</li>
            <li>Cancel anytime</li>
          </ul>
          <div className="plans-enterprise reveal">
            <div className="plans-enterprise-text">
              <strong>Enterprise</strong>
              <span>Multi-location or franchise? We&apos;ll build a plan around your whole footprint.</span>
            </div>
            <p className="plans-enterprise-price">Custom Pricing</p>
            <Link href="/#consultation" className="btn btn-outline btn-sm">Talk to Us</Link>
          </div>
        </div>
      </section>

      <section className="faq">
        <div className="container faq-grid">
          <div className="section-head reveal">
            <h2>Straight answers, before you call.</h2>
            <p className="section-sub">Can&apos;t find what you&apos;re looking for? Our team is one call away.</p>
            <Link href="/case-studies/family-medical-group" className="cs-card" style={{ marginTop: 32 }}>
              <div className="cs-card-media">
                <img src="/assets/lmd/testimonials/family-medical-group.webp" alt="The Family Medical Group" loading="lazy" />
                <div className="cs-card-stat"><strong>16</strong><span>clinic locations, up from 2</span></div>
              </div>
              <div className="cs-card-body">
                <span className="case-tags"><span>Paid Media</span><span>Social</span><span>Business Automation</span></span>
                <h3>The Family Medical Group</h3>
                <p>From 2 clinics to 16 across 4 Florida counties. Paid search, social advertising, and business automation built a patient-acquisition system that scales with every new location.</p>
                <span className="cs-card-arrow">Read case study →</span>
              </div>
            </Link>
          </div>
          <div className="faq-list reveal">
            {HOME_FAQS.map((item, i) => (
              <div className={`faq-item${faqOpen === i ? " open" : ""}`} key={item.q}>
                <button
                  className="faq-q"
                  type="button"
                  aria-expanded={faqOpen === i}
                  onClick={() => setFaqOpen((cur) => (cur === i ? -1 : i))}
                >
                  {item.q}
                  <span className="faq-icon" />
                </button>
                <div className="faq-a" role="region" style={{ maxHeight: faqOpen === i ? 480 : 0 }}>
                  <p dangerouslySetInnerHTML={{ __html: item.a }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-final" id="consultation">
        <div className="cta-glow" aria-hidden="true" />
        <div className="container reveal">
          <h2>Your business deserves<br />serious results.</h2>
          <p className="section-sub">Join the businesses already growing with Live Media Digital. No long-term contracts, no guesswork, just strategy that works.</p>
          <div className="hero-ctas center">
            <a href={`mailto:${SITE_EMAIL}`} className="btn btn-primary">Get Free Consultation</a>
            <a href={`tel:${SITE_PHONE_TEL}`} className="btn btn-outline">Call {SITE_PHONE}</a>
          </div>
          <ul className="hero-meta center">
            <li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M13.5 4.5L6 12 2.5 8.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>Free strategy session</li>
            <li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M13.5 4.5L6 12 2.5 8.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>Google &amp; Meta certified</li>
            <li><svg viewBox="0 0 16 16" width="14" height="14"><path d="M13.5 4.5L6 12 2.5 8.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>Results you can track</li>
          </ul>
        </div>
      </section>

      <section className="industries" id="industries">
        <div className="container">
          <div className="section-head reveal">
            <h2>Industries served.</h2>
            <p className="section-sub center">Real category expertise, not a generic playbook copied across every client.</p>
          </div>
          <div className="industries-grid reveal">
            {INDUSTRY_COLS.map((col, i) => (
              <ul className="industries-list" key={i}>
                {col.map(([href, label]) => (
                  <li key={href}><Link href={href}>{label}</Link></li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
