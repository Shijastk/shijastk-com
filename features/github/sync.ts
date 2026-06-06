import { db } from "@/db";
import { githubRepos } from "@/db/schema";
import { fetchGitHubRepos } from "./client";

/**
 * Fetch all public repos for the username and upsert their metadata into the
 * cache table. Preserves the admin's `isSelected` curation on conflict.
 */
export async function syncGitHubRepos(
  username: string
): Promise<{ ok: boolean; count?: number; error?: string }> {
  if (!db) return { ok: false, error: "Database not configured." };

  let repos;
  try {
    repos = await fetchGitHubRepos(username);
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "GitHub fetch failed." };
  }

  for (const r of repos) {
    await db
      .insert(githubRepos)
      .values({ ...r, languages: {}, isSelected: false, syncedAt: new Date() })
      .onConflictDoUpdate({
        target: githubRepos.ghId,
        // Update metadata but keep the curated `isSelected` flag.
        set: {
          name: r.name,
          fullName: r.fullName,
          description: r.description,
          htmlUrl: r.htmlUrl,
          homepage: r.homepage,
          language: r.language,
          stargazersCount: r.stargazersCount,
          forksCount: r.forksCount,
          topics: r.topics,
          pushedAt: r.pushedAt,
          syncedAt: new Date(),
        },
      });
  }

  return { ok: true, count: repos.length };
}
