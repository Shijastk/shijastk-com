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
  githubRepos,
  socialLinks,
  contactInfo,
  seoMetadata,
  siteSettings,
} from "@/db/schema";
import * as fb from "@/db/fallback";

/*
  Uncached reads for the admin dashboard (returns ALL rows incl. hidden).
  Admin pages are dynamic and gated by requireAdmin(); these need no caching.
  When the DB is unconfigured, fallback seed data is returned so the UI renders.
*/

export async function getHeroAdmin() {
  if (!db) return fb.fallbackHero;
  const r = await db.select().from(hero).limit(1);
  return r[0] ?? fb.fallbackHero;
}

export async function getAboutAdmin() {
  if (!db) return fb.fallbackAbout;
  const r = await db.select().from(about).limit(1);
  return r[0] ?? fb.fallbackAbout;
}

export async function getContactAdmin() {
  if (!db) return fb.fallbackContact;
  const r = await db.select().from(contactInfo).limit(1);
  return r[0] ?? fb.fallbackContact;
}

export async function getSettingsAdmin() {
  if (!db) return fb.fallbackSiteSettings;
  const r = await db.select().from(siteSettings).limit(1);
  return r[0] ?? fb.fallbackSiteSettings;
}

export async function listSkills() {
  if (!db) return fb.fallbackSkills;
  return db.select().from(skills).orderBy(asc(skills.sortOrder));
}

export async function listExperiences() {
  if (!db) return fb.fallbackExperiences;
  return db.select().from(experiences).orderBy(asc(experiences.sortOrder));
}

export async function listFreelance() {
  if (!db) return fb.fallbackFreelance;
  return db.select().from(freelance).orderBy(asc(freelance.sortOrder));
}

export async function listEducation() {
  if (!db) return fb.fallbackEducation;
  return db.select().from(education).orderBy(asc(education.sortOrder));
}

export async function listCertifications() {
  if (!db) return fb.fallbackCertifications;
  return db.select().from(certifications).orderBy(asc(certifications.sortOrder));
}

export async function listProjects() {
  if (!db) return fb.fallbackProjects;
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getProjectAdmin(id: number) {
  if (!db) return fb.fallbackProjects.find((p) => p.id === id) ?? null;
  const r = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return r[0] ?? null;
}

export async function listSocial() {
  if (!db) return fb.fallbackSocialLinks;
  return db.select().from(socialLinks).orderBy(asc(socialLinks.sortOrder));
}

export async function listSeo() {
  if (!db) return fb.fallbackSeo;
  return db.select().from(seoMetadata).orderBy(asc(seoMetadata.id));
}

export async function listGithubRepos() {
  if (!db) return [];
  return db.select().from(githubRepos).orderBy(asc(githubRepos.name));
}
