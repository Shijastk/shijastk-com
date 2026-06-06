import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  // Supabase keeps internal tables in other schemas; only manage ours.
  schemaFilter: ["public"],
  verbose: true,
  strict: true,
} satisfies Config;
