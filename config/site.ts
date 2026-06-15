/** Site-wide constants. Non-secret defaults; some are overridable via env. */
export const siteConfig = {
  name: "Shijas T K",
  title: "Shijas T K | Frontend Engineer",
  description:
    "Frontend Engineer with 3+ years building scalable SaaS platforms, enterprise UI systems and high-traffic applications with React, Next.js & TypeScript.",
  // Production canonical host. The live site 301/302-redirects the non-www
  // apex to the www host, so www is the canonical form. Set
  // NEXT_PUBLIC_SITE_URL=https://www.shijastk.in in the deployment env; this
  // fallback keeps canonical/sitemap/robots correct even if the env var is
  // missing (the apex form would just redirect and split signals).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shijastk.in",
  ogImage: "/opengraph-image",
  // Default keywords applied site-wide. Tuned so the site surfaces for name
  // searches (Shijas, Shijas T K, shijastk) and role searches (frontend dev).
  keywords: [
    "Shijas",
    "Shijas T K",
    "Shijas TK",
    "shijastk",
    "shijastk.in",
    "Shijas T K portfolio",
    "Frontend Developer",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Web Developer",
    "UI Engineer",
    "React.js",
    "Next.js",
    "Tailwind CSS",
    "Frontend Developer India",
    "Shijas frontend developer",
  ],
  author: "Shijas T K",
  twitterHandle: "@shijastk",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "Shijastk",
  githubJoinYear: Number(process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR ?? 2022),
  nav: [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
