"use server";

import { updateTag } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { githubRepos, projects } from "@/db/schema";
import { requireAdmin } from "@/features/auth/guard";
import { syncGitHubRepos } from "@/features/github/sync";
import { siteConfig } from "@/config/site";
import { slugify } from "@/lib/utils";
import { CACHE_TAGS } from "@/lib/cache";

export type ActionResult = { ok: true; message?: string } | { ok: false; error: string };

export async function syncReposAction(): Promise<ActionResult> {
  await requireAdmin();
  const res = await syncGitHubRepos(siteConfig.githubUsername);
  if (!res.ok) return { ok: false, error: res.error ?? "Sync failed." };
  updateTag(CACHE_TAGS.github);
  return { ok: true, message: `Synced ${res.count} repositories.` };
}

export async function setRepoSelected(
  id: number,
  value: boolean
): Promise<ActionResult> {
  await requireAdmin();
  if (!db) return { ok: false, error: "Database not configured." };
  await db.update(githubRepos).set({ isSelected: value }).where(eq(githubRepos.id, id));
  updateTag(CACHE_TAGS.github);
  return { ok: true };
}

/** Create a project pre-filled from a cached GitHub repo. */
export async function importRepoToProject(repoId: number): Promise<ActionResult> {
  await requireAdmin();
  if (!db) return { ok: false, error: "Database not configured." };

  const rows = await db.select().from(githubRepos).where(eq(githubRepos.id, repoId)).limit(1);
  const repo = rows[0];
  if (!repo) return { ok: false, error: "Repo not found. Sync first." };

  const count = (await db.select().from(projects)).length;
  let slug = slugify(repo.name);

  try {
    await db.insert(projects).values({
      name: repo.name,
      slug,
      tagline: repo.description ?? "",
      descriptionMd: repo.description ?? "",
      projectUrl: repo.homepage ?? "",
      projectUrlLabel: "Live Site",
      repository: repo.htmlUrl,
      techStack: repo.language ? [repo.language] : [],
      githubRepoId: repo.id,
      overrideGithub: true,
      isVisible: true,
      isFeatured: false,
      sortOrder: count,
    });
  } catch {
    // Slug clash — append the repo id and retry once.
    slug = `${slug}-${repo.ghId}`;
    await db.insert(projects).values({
      name: repo.name,
      slug,
      tagline: repo.description ?? "",
      descriptionMd: repo.description ?? "",
      projectUrl: repo.homepage ?? "",
      projectUrlLabel: "Live Site",
      repository: repo.htmlUrl,
      techStack: repo.language ? [repo.language] : [],
      githubRepoId: repo.id,
      overrideGithub: true,
      isVisible: true,
      isFeatured: false,
      sortOrder: count,
    });
  }

  updateTag(CACHE_TAGS.projects);
  return { ok: true, message: `Imported "${repo.name}" as a project.` };
}
