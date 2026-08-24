import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/process.html", destination: "/process", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/blogs.html", destination: "/blogs", permanent: true },
      { source: "/case-studies.html", destination: "/case-studies", permanent: true },
      { source: "/get-report.html", destination: "/get-report", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/terms-of-service.html", destination: "/terms-of-service", permanent: true },
      { source: "/cookie-policy.html", destination: "/cookie-policy", permanent: true },
      { source: "/services/:slug.html", destination: "/services/:slug", permanent: true },
      { source: "/industries/:slug.html", destination: "/industries/:slug", permanent: true },
      { source: "/service-areas/:slug.html", destination: "/service-areas/:slug", permanent: true },
      { source: "/case-studies/:slug.html", destination: "/case-studies/:slug", permanent: true },
      { source: "/blog/:slug.html", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
