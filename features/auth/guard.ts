import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import type { Profile } from "@/db/schema";

/** The authenticated Supabase user, or null. */
export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}

async function loadProfile(userId: string): Promise<Profile | null> {
  if (!db) return null;
  const rows = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, userId))
    .limit(1);
  return rows[0] ?? null;
}

export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  const profile = await loadProfile(user.id);
  return profile?.role === "admin";
}

/**
 * Authorization boundary for the dashboard. Redirects when not signed in or
 * not an admin. Call at the top of the admin layout AND inside every mutation.
 */
export async function requireAdmin(): Promise<{ user: { id: string; email?: string }; profile: Profile }> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const profile = await loadProfile(user.id);
  if (!profile || profile.role !== "admin") redirect("/login?error=forbidden");
  return { user, profile };
}
