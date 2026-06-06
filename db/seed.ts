/**
 * Seeds Supabase with the portfolio content from db/seed-data.ts.
 * Run: npm run db:seed  (loads .env.local for DATABASE_URL + Supabase keys)
 *
 * Optionally promotes an existing Supabase Auth user to admin: set ADMIN_EMAIL
 * in .env.local to the email you signed up with in the Supabase dashboard.
 */
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { createClient } from "@supabase/supabase-js";
import * as schema from "./schema";
import * as d from "./seed-data";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL is not set. Add it to .env.local.");
  process.exit(1);
}

const sql = postgres(url, { prepare: false });
const db = drizzle(sql, { schema });

async function seedContent() {
  // Singletons — clear then insert one row.
  await db.delete(schema.hero);
  await db.insert(schema.hero).values(d.heroData);

  await db.delete(schema.about);
  await db.insert(schema.about).values(d.aboutData);

  await db.delete(schema.contactInfo);
  await db.insert(schema.contactInfo).values(d.contactData);

  await db.delete(schema.siteSettings);
  await db.insert(schema.siteSettings).values(d.siteSettingsData);

  // Lists.
  await db.delete(schema.skills);
  await db.insert(schema.skills).values(d.skillsData);

  await db.delete(schema.experiences);
  await db.insert(schema.experiences).values(d.experiencesData);

  await db.delete(schema.freelance);
  await db.insert(schema.freelance).values(d.freelanceData);

  await db.delete(schema.education);
  await db.insert(schema.education).values(d.educationData);

  await db.delete(schema.certifications);
  await db.insert(schema.certifications).values(d.certificationsData);

  await db.delete(schema.projects);
  await db.insert(schema.projects).values(d.projectsData);

  await db.delete(schema.socialLinks);
  await db.insert(schema.socialLinks).values(d.socialLinksData);

  await db.delete(schema.seoMetadata);
  await db.insert(schema.seoMetadata).values(d.seoData);

  console.log("✓ Content seeded.");
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!email || !supaUrl || !serviceKey) {
    console.log("• Skipping admin profile (set ADMIN_EMAIL + Supabase keys to enable).");
    return;
  }

  const admin = createClient(supaUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const { data, error } = await admin.auth.admin.listUsers();
  if (error) {
    console.warn("• Could not list auth users:", error.message);
    return;
  }
  const user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
  if (!user) {
    console.warn(`• No Supabase Auth user found for ${email}. Create one in the dashboard, then re-run.`);
    return;
  }

  await db
    .insert(schema.profiles)
    .values({ id: user.id, email: user.email!, role: "admin", fullName: d.heroData.fullName })
    .onConflictDoUpdate({ target: schema.profiles.id, set: { role: "admin" } });

  console.log(`✓ Granted admin role to ${email}.`);
}

async function main() {
  await seedContent();
  await seedAdmin();
  await sql.end();
  console.log("✓ Seed complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
