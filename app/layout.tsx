import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/next";
import Reveal from "@/components/reveal";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ai-in-academic-libraries.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AI in Academic Libraries",
    template: "%s · AI in Academic Libraries",
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
    siteName: "AI in Academic Libraries",
    title: "AI in Academic Libraries",
    description:
      "AI literacy curriculum for academic library workers, mapped to ACRL AI Competencies (2025), aligned with ALA's AI Guidance (2026), and grounded in the 4D Framework from Anthropic's AI Fluency course.",
    url: SITE_URL,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI in Academic Libraries - curriculum for academic library workers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI in Academic Libraries",
    description:
      "AI literacy curriculum for academic library workers, mapped to ACRL AI Competencies (2025) and aligned with ALA's AI Guidance (2026).",
    images: ["/og-image.png"],
    creator: "@yuliabrusova",
  },
  robots: {
    index: true,
    follow: true,
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
            __html: "document.documentElement.classList.add('js')",
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
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Reveal />
        <Analytics />
      </body>
    </html>
  );
}
