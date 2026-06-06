import { NextResponse, type NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { syncGitHubRepos } from "@/features/github/sync";
import { siteConfig } from "@/config/site";
import { CACHE_TAGS } from "@/lib/cache";

/**
 * GitHub metadata refresh. Protected by REVALIDATE_SECRET so it can be wired to
 * a Vercel Cron job. Accepts the secret via header or `?secret=` (cron uses URL).
 */
async function handle(request: NextRequest) {
  // Accept: x-revalidate-secret header, ?secret=, or Vercel Cron's
  // `Authorization: Bearer ${CRON_SECRET}` header.
  const authz = request.headers.get("authorization");
  const bearer = authz?.startsWith("Bearer ") ? authz.slice(7) : null;
  const provided =
    request.headers.get("x-revalidate-secret") ??
    request.nextUrl.searchParams.get("secret") ??
    bearer;

  const expected = process.env.REVALIDATE_SECRET;
  const cronSecret = process.env.CRON_SECRET;
  const authorized =
    (expected && provided === expected) ||
    (cronSecret && bearer === cronSecret);

  if (!authorized) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await syncGitHubRepos(siteConfig.githubUsername);
  if (!res.ok) return NextResponse.json(res, { status: 500 });

  revalidateTag(CACHE_TAGS.github, "max");
  return NextResponse.json(res);
}

export const GET = handle;
export const POST = handle;
