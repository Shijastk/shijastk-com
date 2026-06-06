"use server";

import { updateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import {
  hero,
  about,
  contactInfo,
  siteSettings,
  seoMetadata,
  skills,
  experiences,
  freelance,
  education,
  certifications,
  projects,
  socialLinks,
} from "@/db/schema";
import * as v from "@/lib/validations";
import { requireAdmin } from "@/features/auth/guard";
import { CACHE_TAGS } from "@/lib/cache";

export type ActionResult = { ok: true } | { ok: false; error: string };

const ok: ActionResult = { ok: true };
const fail = (error: string): ActionResult => ({ ok: false, error });

/** Auth + DB guard for every mutation. */
async function ready(): Promise<ActionResult | null> {
  await requireAdmin();
  if (!db) return fail("Database is not configured. Add Supabase keys to .env.local.");
  return null;
}

/** Upsert the single config row for a singleton table. */
async function upsertSingleton<T extends { id: number }>(
  table: typeof hero | typeof about | typeof contactInfo | typeof siteSettings,
  values: Record<string, unknown>
) {
  const existing = await db!.select().from(table).limit(1);
  if (existing[0]) {
    await db!.update(table).set(values).where(eq(table.id, (existing[0] as T).id));
  } else {
    await db!.insert(table).values(values as never);
  }
}

// ---------- Singletons ----------

export async function updateHero(input: v.HeroInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const data = v.heroSchema.parse(input);
  await upsertSingleton(hero, { ...data, updatedAt: new Date() });
  updateTag(CACHE_TAGS.hero);
  return ok;
}

export async function updateAbout(input: v.AboutInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const data = v.aboutSchema.parse(input);
  await upsertSingleton(about, { ...data, updatedAt: new Date() });
  updateTag(CACHE_TAGS.about);
  return ok;
}

export async function updateContact(input: v.ContactInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const data = v.contactSchema.parse(input);
  await upsertSingleton(contactInfo, { ...data, updatedAt: new Date() });
  updateTag(CACHE_TAGS.contact);
  return ok;
}

export async function updateSettings(input: v.SettingsInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const data = v.settingsSchema.parse(input);
  await upsertSingleton(siteSettings, { ...data, updatedAt: new Date() });
  updateTag(CACHE_TAGS.settings);
  return ok;
}

export async function upsertSeo(input: v.SeoInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const data = v.seoSchema.parse(input);
  await db!
    .insert(seoMetadata)
    .values(data)
    .onConflictDoUpdate({ target: seoMetadata.pageKey, set: data });
  updateTag(CACHE_TAGS.seo);
  return ok;
}

// ---------- Skills ----------

export async function saveSkill(input: v.SkillInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const { id, ...data } = v.skillSchema.parse(input);
  if (id) await db!.update(skills).set(data).where(eq(skills.id, id));
  else await db!.insert(skills).values(data);
  updateTag(CACHE_TAGS.skills);
  return ok;
}

export async function deleteSkill(id: number): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await db!.delete(skills).where(eq(skills.id, id));
  updateTag(CACHE_TAGS.skills);
  return ok;
}

// ---------- Experiences ----------

export async function saveExperience(input: v.ExperienceInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const { id, ...data } = v.experienceSchema.parse(input);
  if (id) await db!.update(experiences).set(data).where(eq(experiences.id, id));
  else await db!.insert(experiences).values(data);
  updateTag(CACHE_TAGS.experiences);
  return ok;
}

export async function deleteExperience(id: number): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await db!.delete(experiences).where(eq(experiences.id, id));
  updateTag(CACHE_TAGS.experiences);
  return ok;
}

// ---------- Freelance ----------

export async function saveFreelance(input: v.FreelanceInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const { id, ...data } = v.freelanceSchema.parse(input);
  if (id) await db!.update(freelance).set(data).where(eq(freelance.id, id));
  else await db!.insert(freelance).values(data);
  updateTag(CACHE_TAGS.freelance);
  return ok;
}

export async function deleteFreelance(id: number): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await db!.delete(freelance).where(eq(freelance.id, id));
  updateTag(CACHE_TAGS.freelance);
  return ok;
}

// ---------- Education ----------

export async function saveEducation(input: v.EducationInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const { id, ...data } = v.educationSchema.parse(input);
  if (id) await db!.update(education).set(data).where(eq(education.id, id));
  else await db!.insert(education).values(data);
  updateTag(CACHE_TAGS.education);
  return ok;
}

export async function deleteEducation(id: number): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await db!.delete(education).where(eq(education.id, id));
  updateTag(CACHE_TAGS.education);
  return ok;
}

// ---------- Certifications ----------

export async function saveCertification(input: v.CertificationInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const { id, ...data } = v.certificationSchema.parse(input);
  if (id) await db!.update(certifications).set(data).where(eq(certifications.id, id));
  else await db!.insert(certifications).values(data);
  updateTag(CACHE_TAGS.certifications);
  return ok;
}

export async function deleteCertification(id: number): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await db!.delete(certifications).where(eq(certifications.id, id));
  updateTag(CACHE_TAGS.certifications);
  return ok;
}

// ---------- Social ----------

export async function saveSocial(input: v.SocialInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const { id, ...data } = v.socialSchema.parse(input);
  if (id) await db!.update(socialLinks).set(data).where(eq(socialLinks.id, id));
  else await db!.insert(socialLinks).values(data);
  updateTag(CACHE_TAGS.social);
  return ok;
}

export async function deleteSocial(id: number): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await db!.delete(socialLinks).where(eq(socialLinks.id, id));
  updateTag(CACHE_TAGS.social);
  return ok;
}

// ---------- Projects ----------

export async function saveProject(input: v.ProjectInput): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  const parsed = v.projectSchema.parse(input);
  const { id, ...data } = parsed;
  try {
    if (id) {
      await db!
        .update(projects)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(projects.id, id));
    } else {
      await db!.insert(projects).values(data);
    }
  } catch (e) {
    return fail(
      e instanceof Error && e.message.includes("unique")
        ? "A project with that slug already exists."
        : "Could not save the project."
    );
  }
  updateTag(CACHE_TAGS.projects);
  return ok;
}

export async function deleteProject(id: number): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await db!.delete(projects).where(eq(projects.id, id));
  updateTag(CACHE_TAGS.projects);
  return ok;
}

/** Persist a new drag-and-drop ordering. */
export async function reorderProjects(orderedIds: number[]): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await Promise.all(
    orderedIds.map((id, index) =>
      db!.update(projects).set({ sortOrder: index }).where(eq(projects.id, id))
    )
  );
  updateTag(CACHE_TAGS.projects);
  return ok;
}

/** Toggle a project's visibility or featured flag inline from the list. */
export async function setProjectFlag(
  id: number,
  field: "isVisible" | "isFeatured",
  value: boolean
): Promise<ActionResult> {
  const g = await ready();
  if (g) return g;
  await db!.update(projects).set({ [field]: value }).where(eq(projects.id, id));
  updateTag(CACHE_TAGS.projects);
  return ok;
}
