import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { incognito, gitlabmono } from "./assets/font/font";
import { Providers } from "@/components/site/Providers";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--inter" });

export const metadata: Metadata = {
  // Titles are DB-driven and already include the name, so the template is a
  // pass-through (no "| Shijas T K" suffix to avoid doubling).
  title: { default: siteConfig.title, template: `%s` },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  category: "technology",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: siteConfig.title,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
  // Default canonical for the root/home. Child pages override with their own
  // path so every route is self-canonical (relative paths resolve against
  // metadataBase). Without per-page overrides, every page would wrongly claim
  // the homepage as its canonical.
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "2Wx1s57k7vxl0QZHa012N3cwf2E2F3BeKXreBXlOPQ8",
  },
};

// Person + WebSite structured data. This is what gives Google an explicit
// "this site is about a person named Shijas T K, a Frontend Developer" signal —
// the strongest lever for ranking on name searches (shijas / shijastk) and for
// a potential knowledge panel.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
      name: siteConfig.name,
      alternateName: ["Shijas", "Shijas TK", "shijastk"],
      url: siteConfig.url,
      jobTitle: "Frontend Developer",
      description: siteConfig.description,
      image: `${siteConfig.url}${siteConfig.ogImage}`,
      sameAs: [`https://github.com/${siteConfig.githubUsername}`],
      knowsAbout: [
        "Frontend Development",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Web Performance",
        "UI Engineering",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      publisher: { "@id": `${siteConfig.url}/#person` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.variable} ${gitlabmono.variable} ${inter.className} dark:bg-zinc-900 bg-white dark:text-white text-zinc-700 antialiased`}
      >
        <script
          type="application/ld+json"
          // JSON.stringify output is trusted (no user input), safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
