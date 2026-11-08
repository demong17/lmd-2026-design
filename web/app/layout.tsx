import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ConsentScripts } from "@/components/ConsentScripts";
import { Footer } from "@/components/Footer";
import { GhlChatWidget } from "@/components/GhlChatWidget";
import { Header } from "@/components/Header";
import { SiteChrome } from "@/components/SiteChrome";
import { OG_IMAGE_META, SITE_NAME, SITE_URL } from "@/lib/site";
import { GOOGLE_SITE_VERIFICATIONS } from "@/lib/tracking";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Live Media Digital — Sharp Strategies, Serious Results",
    template: "%s | Live Media Digital",
  },
  description:
    "South Florida digital marketing agency serving clients nationwide. SEO, paid search, social, web design and content built around one goal: more leads for businesses of every size.",
  icons: {
    icon: "/assets/lmd/favicon.png",
    apple: "/assets/lmd/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    images: [OG_IMAGE_META],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE_META],
  },
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/rss.xml`,
    },
  },
  verification: {
    google: [...GOOGLE_SITE_VERIFICATIONS],
  },
};

export const revalidate = 3600;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Script id="lmd-consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`}
        </Script>
        <Script id="lmd-a11y-boot" strategy="beforeInteractive">
          {`try{var p=JSON.parse(localStorage.getItem('lmd-a11y')||'{}');var h=document.documentElement;if(p.text&&p.text!=='default')h.setAttribute('data-a11y-text',p.text);['contrast','links','motion','readable','highlight'].forEach(function(k){if(p[k])h.setAttribute('data-a11y-'+k,'on');});}catch(e){}`}
        </Script>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header />
        <div id="main-content" tabIndex={-1}>
          {children}
        </div>
        <Footer />
        <ConsentScripts />
        <SiteChrome />
        <GhlChatWidget />
      </body>
    </html>
  );
}
