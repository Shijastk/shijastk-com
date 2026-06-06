/**
 * Cache tags for Next.js 16 `cacheTag()` / `updateTag()` / `revalidateTag()`.
 * Public read functions tag their data with one of these; admin mutations
 * call `updateTag(...)` with the same tag to push edits live without a redeploy.
 */
export const CACHE_TAGS = {
  hero: "hero",
  about: "about",
  skills: "skills",
  experiences: "experiences",
  freelance: "freelance",
  education: "education",
  certifications: "certifications",
  projects: "projects",
  social: "social",
  contact: "contact",
  seo: "seo",
  github: "github",
  settings: "settings",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];
