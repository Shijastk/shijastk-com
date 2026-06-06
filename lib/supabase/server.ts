import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Accept either the classic anon key or the newer publishable key.
const ANON =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(URL && ANON);

/**
 * Supabase client bound to the request cookies (server components & actions).
 * Returns null when Supabase isn't configured yet so callers can degrade.
 */
export async function createSupabaseServerClient() {
  if (!URL || !ANON) return null;
  const cookieStore = await cookies();
  return createServerClient(URL, ANON, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          toSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Called from a Server Component — safe to ignore; the proxy refreshes.
        }
      },
    },
  });
}
