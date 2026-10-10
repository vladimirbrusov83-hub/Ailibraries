import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import Reveal from "@/components/reveal";
import AppShell from "@/components/app/app-shell";
import InstallNudge from "@/components/install/install-nudge";
import { getModuleIndex } from "@/lib/module-index";
import { qrSvgPath } from "@/lib/qr";

// Runs before first paint: marks JS support, switches to the app layout when launched
// from the home screen / dock (so the website layout never flashes), and holds on to the
// browser's install prompt so our own Install button can trigger it later.
const HEAD_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');var app=false;try{app=window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true}catch(e){}if(app){d.classList.add('app-mode');var fit=function(){var m=document.querySelector('meta[name=viewport]');if(m&&m.content.indexOf('viewport-fit')<0)m.content+=', viewport-fit=cover'};fit();document.addEventListener('DOMContentLoaded',fit)}window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__ailInstall=e;window.dispatchEvent(new Event('ail-install-ready'))});window.addEventListener('appinstalled',function(){window.__ailInstall=null;window.dispatchEvent(new Event('ail-installed'))})})();`;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-in-academic-libraries.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI for Academic Libraries",
    template: "%s · AI for Academic Libraries",
  },
  description:
    "AI literacy curriculum for academic library workers, mapped to ACRL AI Competencies (2025), aligned with ALA's AI Guidance (2026), and grounded in the 4D Framework from Anthropic's AI Fluency course.",
  keywords: [
    "AI for academic libraries",
    "AI training for librarians",
    "ACRL AI competencies",
    "AI workflow for librarians",
    "library AI tools",
    "information literacy AI",
  ],
  authors: [{ name: "Yulia Brusova" }],
  creator: "Yulia Brusova",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "AI for Academic Libraries",
    title: "AI for Academic Libraries",
    description:
      "AI literacy curriculum for academic library workers, mapped to ACRL AI Competencies (2025), aligned with ALA's AI Guidance (2026), and grounded in the 4D Framework from Anthropic's AI Fluency course.",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI for Academic Libraries - curriculum for academic library workers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Academic Libraries",
    description:
      "AI literacy curriculum for academic library workers, mapped to ACRL AI Competencies (2025) and aligned with ALA's AI Guidance (2026).",
    images: ["/og-image.png"],
    creator: "@yuliabrusova",
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    capable: true,
    title: "AI Libraries",
    statusBarStyle: "default",
  },
  verification: {
    google: "2I08HilU8m23DiIAiGXFIJCc1FZIwbNxbpssA9y1ERg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: HEAD_SCRIPT,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <InstallNudge phoneQr={qrSvgPath(`${SITE_URL}/install`)} />
        <Nav />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">{children}</main>
        <Footer />
        <AppShell index={getModuleIndex()} qr={qrSvgPath(SITE_URL)} siteUrl={SITE_URL} />
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
