import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY;

/**
 * Service-role Supabase client — bypasses RLS. SERVER-ONLY; never expose to the
 * browser. Used for privileged operations like Storage uploads and seeding.
 */
export function createSupabaseAdminClient() {
  if (!URL || !SERVICE_ROLE) return null;
  return createClient(URL, SERVICE_ROLE, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
