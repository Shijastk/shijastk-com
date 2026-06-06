import { cacheTag, cacheLife } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  hero,
  about,
  skills,
  experiences,
  freelance,
  education,
  certifications,
  projects,
  socialLinks,
  contactInfo,
  seoMetadata,
  siteSettings,
} from "@/db/schema";
import type {
  Hero,
  About,
  Skill,
  Experience,
  Freelance,
  Education,
  Certification,
  Project,
  SocialLink,
  ContactInfo,
  SeoMetadata,
  SiteSettings,
} from "@/db/schema";
import * as fb from "@/db/fallback";
import { CACHE_TAGS } from "@/lib/cache";

/*
  Public read layer. Every function is cached (`'use cache'`) and tagged so
  admin mutations can invalidate it via updateTag() — edits go live with no
  redeploy. When the DB isn't configured, typed fallback data is returned.
*/

export async function getHero(): Promise<Hero> {
  "use cache";
  cacheTag(CACHE_TAGS.hero);
  cacheLife("days");
  if (!db) return fb.fallbackHero;
  const rows = await db.select().from(hero).limit(1);
  return rows[0] ?? fb.fallbackHero;
}

export async function getAbout(): Promise<About> {
  "use cache";
  cacheTag(CACHE_TAGS.about);
  cacheLife("days");
  if (!db) return fb.fallbackAbout;
  const rows = await db.select().from(about).limit(1);
  return rows[0] ?? fb.fallbackAbout;
}

export async function getSkills(): Promise<Skill[]> {
  "use cache";
  cacheTag(CACHE_TAGS.skills);
  cacheLife("days");
  if (!db) return fb.fallbackSkills;
  const rows = await db.select().from(skills).orderBy(asc(skills.sortOrder));
  return rows.length ? rows : fb.fallbackSkills;
}

export async function getExperiences(): Promise<Experience[]> {
  "use cache";
  cacheTag(CACHE_TAGS.experiences);
  cacheLife("days");
  if (!db) return fb.fallbackExperiences;
  const rows = await db
    .select()
    .from(experiences)
    .orderBy(asc(experiences.sortOrder));
  const visible = rows.filter((r) => r.isVisible);
  return visible.length ? visible : fb.fallbackExperiences;
}

export async function getFreelance(): Promise<Freelance[]> {
  "use cache";
  cacheTag(CACHE_TAGS.freelance);
  cacheLife("days");
  if (!db) return fb.fallbackFreelance;
  const rows = await db
    .select()
    .from(freelance)
    .orderBy(asc(freelance.sortOrder));
  return rows.filter((r) => r.isVisible);
}

export async function getEducation(): Promise<Education[]> {
  "use cache";
  cacheTag(CACHE_TAGS.education);
  cacheLife("days");
  if (!db) return fb.fallbackEducation;
  const rows = await db
    .select()
    .from(education)
    .orderBy(asc(education.sortOrder));
  return rows.length ? rows : fb.fallbackEducation;
}

export async function getCertifications(): Promise<Certification[]> {
  "use cache";
  cacheTag(CACHE_TAGS.certifications);
  cacheLife("days");
  if (!db) return fb.fallbackCertifications;
  const rows = await db
    .select()
    .from(certifications)
    .orderBy(asc(certifications.sortOrder));
  return rows.length ? rows : fb.fallbackCertifications;
}

export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheTag(CACHE_TAGS.projects);
  cacheLife("days");
  if (!db) return fb.fallbackProjects.filter((p) => p.isVisible);
  const rows = await db
    .select()
    .from(projects)
    .orderBy(asc(projects.sortOrder));
  const visible = rows.filter((r) => r.isVisible);
  return visible.length ? visible : fb.fallbackProjects.filter((p) => p.isVisible);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  "use cache";
  cacheTag(CACHE_TAGS.projects);
  cacheLife("days");
  const all = await getProjects();
  const featured = all.filter((p) => p.isFeatured);
  return featured.length ? featured : all.slice(0, 3);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  "use cache";
  cacheTag(CACHE_TAGS.projects);
  cacheLife("days");
  if (!db) return fb.fallbackProjects.find((p) => p.slug === slug) ?? null;
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);
  return rows[0] ?? fb.fallbackProjects.find((p) => p.slug === slug) ?? null;
}

export async function getAllProjectSlugs(): Promise<string[]> {
  "use cache";
  cacheTag(CACHE_TAGS.projects);
  cacheLife("days");
  const all = await getProjects();
  return all.map((p) => p.slug);
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  "use cache";
  cacheTag(CACHE_TAGS.social);
  cacheLife("days");
  if (!db) return fb.fallbackSocialLinks;
  const rows = await db
    .select()
    .from(socialLinks)
    .orderBy(asc(socialLinks.sortOrder));
  const visible = rows.filter((r) => r.isVisible);
  return visible.length ? visible : fb.fallbackSocialLinks;
}

export async function getContact(): Promise<ContactInfo> {
  "use cache";
  cacheTag(CACHE_TAGS.contact);
  cacheLife("days");
  if (!db) return fb.fallbackContact;
  const rows = await db.select().from(contactInfo).limit(1);
  return rows[0] ?? fb.fallbackContact;
}

export async function getSeo(pageKey: string): Promise<SeoMetadata | null> {
  "use cache";
  cacheTag(CACHE_TAGS.seo);
  cacheLife("days");
  const fallback = fb.fallbackSeo.find((s) => s.pageKey === pageKey) ?? null;
  if (!db) return fallback;
  const rows = await db
    .select()
    .from(seoMetadata)
    .where(eq(seoMetadata.pageKey, pageKey))
    .limit(1);
  return rows[0] ?? fallback;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  "use cache";
  cacheTag(CACHE_TAGS.settings);
  cacheLife("days");
  if (!db) return fb.fallbackSiteSettings;
  const rows = await db.select().from(siteSettings).limit(1);
  return rows[0] ?? fb.fallbackSiteSettings;
}
