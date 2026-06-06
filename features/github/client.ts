const API = "https://api.github.com";

function ghHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export type GhRepo = {
  ghId: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  topics: string[];
  pushedAt: string | null;
};

export async function fetchGitHubUser(username: string) {
  const res = await fetch(`${API}/users/${username}`, {
    headers: ghHeaders(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`GitHub user fetch failed (${res.status})`);
  const data = await res.json();
  return {
    avatarUrl: data.avatar_url as string,
    name: data.name as string | null,
    bio: data.bio as string | null,
  };
}

export async function fetchGitHubRepos(username: string): Promise<GhRepo[]> {
  const res = await fetch(
    `${API}/users/${username}/repos?per_page=100&sort=updated`,
    { headers: ghHeaders(), cache: "no-store" }
  );
  if (!res.ok) throw new Error(`GitHub repos fetch failed (${res.status})`);
  const data = (await res.json()) as Array<Record<string, unknown>>;
  return data.map((r) => ({
    ghId: r.id as number,
    name: r.name as string,
    fullName: r.full_name as string,
    description: (r.description as string | null) ?? null,
    htmlUrl: r.html_url as string,
    homepage: (r.homepage as string | null) || null,
    language: (r.language as string | null) ?? null,
    stargazersCount: (r.stargazers_count as number) ?? 0,
    forksCount: (r.forks_count as number) ?? 0,
    topics: (r.topics as string[]) ?? [],
    pushedAt: (r.pushed_at as string | null) ?? null,
  }));
}
