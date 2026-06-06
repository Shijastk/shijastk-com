/** Site-wide constants. Non-secret defaults; some are overridable via env. */
export const siteConfig = {
  name: "Shijas T K",
  title: "Shijas T K | Frontend Engineer",
  description:
    "Frontend Engineer with 3+ years building scalable SaaS platforms, enterprise UI systems and high-traffic applications with React, Next.js & TypeScript.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://shijas.dev",
  ogImage: "/og.png",
  githubUsername: process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? "Shijastk",
  githubJoinYear: Number(process.env.NEXT_PUBLIC_GITHUB_JOIN_YEAR ?? 2022),
  nav: [
    { title: "About", href: "/about" },
    { title: "Projects", href: "/projects" },
    { title: "Contact", href: "/contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
