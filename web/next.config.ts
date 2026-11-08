import type { NextConfig } from "next";
import wpLegacyRedirects from "./lib/wp-legacy-redirects.json";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
      "frame-ancestors 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://static.hotjar.com https://script.hotjar.com https://collector-20024.tvsquared.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com",
      "style-src 'self' 'unsafe-inline' https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com",
      "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com https://maps.gstatic.com https://maps.googleapis.com https://*.google.com https://*.googleapis.com https://static.hotjar.com https://script.hotjar.com https://*.hotjar.com https://collector-20024.tvsquared.com https://*.leadconnectorhq.com",
      "font-src 'self' data: https://script.hotjar.com https://*.leadconnectorhq.com",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://graph.facebook.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://content.hotjar.io https://collector-20024.tvsquared.com https://*.leadconnectorhq.com wss://*.leadconnectorhq.com https://services.leadconnectorhq.com",
      "frame-src https://www.google.com https://maps.google.com https://www.googletagmanager.com https://vars.hotjar.com https://script.hotjar.com https://app.leadsie.com https://*.leadsie.com https://*.leadconnectorhq.com https://services.leadconnectorhq.com",
      "media-src 'self' blob:",
      "worker-src 'self' blob:",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  // So /abe/ can 301 to the booking link instead of Next's built-in 308 → /abe
  skipTrailingSlashRedirect: true,
  images: {
    qualities: [75, 90],
    minimumCacheTTL: 31536000,
    localPatterns: [
      { pathname: "**", search: "" },
      { pathname: "**", search: "?v=2" },
      { pathname: "**", search: "?v=3" },
      { pathname: "**", search: "?v=4" },
    ],
  },
  // ISR: s-maxage = revalidate; stale-while-revalidate = expireTime - revalidate
  expireTime: 86400,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/wp-content/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/abe",
        destination: "https://calendar.app.google/a3Pyr2rJBF33cLub6",
        statusCode: 301,
      },
      {
        source: "/abe/",
        destination: "https://calendar.app.google/a3Pyr2rJBF33cLub6",
        statusCode: 301,
      },
      { source: "/leadsie", destination: "/onboard", permanent: true },
      { source: "/leadsie/", destination: "/onboard", permanent: true },
      { source: "/leadside", destination: "/onboard", permanent: true },
      { source: "/leadside/", destination: "/onboard", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about-us", permanent: true },
      { source: "/services/seo.html", destination: "/services/search-engine-optimization", permanent: true },
      { source: "/services/sem.html", destination: "/services/search-engine-marketing", permanent: true },
      { source: "/services/social-media-marketing.html", destination: "/services/social-media-paid-marketing", permanent: true },
      { source: "/services/content-marketing.html", destination: "/services/miami-content-marketing", permanent: true },
      { source: "/services/email-marketing.html", destination: "/services/email-marketing-agency-in-miami", permanent: true },
      { source: "/process.html", destination: "/process", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/consultation.html", destination: "/consultation", permanent: true },
      { source: "/case-studies.html", destination: "/case-studies", permanent: true },
      { source: "/get-report.html", destination: "/get-report", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/terms-of-service.html", destination: "/terms-of-service", permanent: true },
      { source: "/cookie-policy.html", destination: "/cookie-policy", permanent: true },
      { source: "/services/:slug.html", destination: "/services/:slug", permanent: true },
      { source: "/industries/:slug.html", destination: "/industries/:slug", permanent: true },
      { source: "/service-areas/:slug.html", destination: "/service-areas/:slug", permanent: true },
      { source: "/case-studies/:slug.html", destination: "/case-studies/:slug", permanent: true },
      { source: "/blog/:slug.html", destination: "/blog", permanent: true },
      ...wpLegacyRedirects as Array<{ source: string; destination: string; permanent: boolean }>,
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },
};

export default nextConfig;
