import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Server-only Drizzle client over the Supabase Postgres connection.
 * When DATABASE_URL is absent (e.g. before the user wires Supabase keys),
 * `db` is null and the data layer falls back to built-in placeholder data.
 */
const url = process.env.DATABASE_URL;

export const isDbConfigured = Boolean(url);

const client = url ? postgres(url, { prepare: false }) : null;

export const db = client ? drizzle(client, { schema }) : null;

export { schema };
