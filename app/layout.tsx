import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { incognito, gitlabmono } from "./assets/font/font";
import { Providers } from "@/components/site/Providers";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--inter" });

export const metadata: Metadata = {
  title: { default: siteConfig.title, template: `%s` },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en-US",
    type: "website",
    description: siteConfig.description,
  },
  alternates: { canonical: siteConfig.url },
  verification: {
    google: "2Wx1s57k7vxl0QZHa012N3cwf2E2F3BeKXreBXlOPQ8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${incognito.variable} ${inter.variable} ${gitlabmono.variable} ${inter.className} dark:bg-zinc-900 bg-white dark:text-white text-zinc-700 antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
