"use client";

import { createBrowserClient } from "@supabase/ssr";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!;

/** Browser Supabase client (used by client components if needed). */
export function createSupabaseBrowserClient() {
  return createBrowserClient(URL, ANON);
}
