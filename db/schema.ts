import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * Admin/RBAC. Mirrors a Supabase Auth user. `role` gates the dashboard.
 * The `id` matches `auth.users.id`.
 */
export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  fullName: text("full_name"),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

/** Hero (singleton — single row id=1). */
export const hero = pgTable("hero", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  headline: text("headline").notNull(),
  shortBio: text("short_bio").notNull(),
  location: text("location"),
  avatarUrl: text("avatar_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

/** About (singleton). Rich text stored as Markdown. */
export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  fullBioMd: text("full_bio_md").notNull().default(""),
  currentlyHackingMd: text("currently_hacking_md").default(""),
  resumeUrl: text("resume_url"),
  profileImageUrl: text("profile_image_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  items: text("items").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Work experience — feeds the Job timeline (JobType-compatible fields). */
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // company
  jobTitle: text("job_title").notNull(), // position
  location: text("location").notNull().default(""),
  startDate: text("start_date").notNull(), // ISO date string
  endDate: text("end_date"), // null = Present
  isCurrent: boolean("is_current").notNull().default(false),
  description: text("description").notNull().default(""),
  highlights: text("highlights").array().notNull().default([]),
  logo: text("logo"),
  url: text("url").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const freelance = pgTable("freelance", {
  id: serial("id").primaryKey(),
  project: text("project").notNull(),
  role: text("role").notNull(),
  duration: text("duration").notNull().default(""),
  highlights: text("highlights").array().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  school: text("school").notNull(),
  degree: text("degree").notNull(),
  major: text("major").notNull().default(""),
  startYear: text("start_year").notNull().default(""),
  endYear: text("end_year").notNull().default(""),
  result: text("result").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const certifications = pgTable("certifications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  issuer: text("issuer").notNull(),
  year: text("year").notNull().default(""),
  url: text("url").notNull().default(""),
  sortOrder: integer("sort_order").notNull().default(0),
});

/** Projects — feeds the project grid + detail (ProjectType-compatible). */
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  tagline: text("tagline").default(""),
  descriptionMd: text("description_md").default(""),
  caseStudyMd: text("case_study_md").default(""),
  projectUrl: text("project_url"),
  projectUrlLabel: text("project_url_label").default("Live URL"),
  repository: text("repository"),
  logo: text("logo"),
  coverImageUrl: text("cover_image_url"),
  screenshots: text("screenshots").array().notNull().default([]),
  techStack: text("tech_stack").array().notNull().default([]),
  isFeatured: boolean("is_featured").notNull().default(false),
  isVisible: boolean("is_visible").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  githubRepoId: integer("github_repo_id"),
  overrideGithub: boolean("override_github").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

/** Cached GitHub repo metadata (curated via the admin picker). */
export const githubRepos = pgTable("github_repos", {
  id: serial("id").primaryKey(),
  ghId: integer("gh_id").notNull().unique(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  description: text("description"),
  htmlUrl: text("html_url").notNull(),
  homepage: text("homepage"),
  language: text("language"),
  languages: jsonb("languages").$type<Record<string, number>>().default({}),
  stargazersCount: integer("stargazers_count").notNull().default(0),
  forksCount: integer("forks_count").notNull().default(0),
  topics: text("topics").array().notNull().default([]),
  pushedAt: text("pushed_at"),
  isSelected: boolean("is_selected").notNull().default(false),
  syncedAt: timestamp("synced_at", { withTimezone: true }).defaultNow(),
});

export const socialLinks = pgTable("social_links", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  iconKey: text("icon_key").notNull().default("link"),
  status: text("status").notNull().default("social"), // 'social' | 'publication'
  sortOrder: integer("sort_order").notNull().default(0),
  isVisible: boolean("is_visible").notNull().default(true),
});

export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  email: text("email"),
  phone: text("phone"),
  location: text("location"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const seoMetadata = pgTable("seo_metadata", {
  id: serial("id").primaryKey(),
  pageKey: text("page_key").notNull().unique(), // home | about | projects
  title: text("title").notNull(),
  description: text("description").notNull(),
  ogImageUrl: text("og_image_url"),
  keywords: text("keywords").array().notNull().default([]),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  footerText: text("footer_text"),
  builtWith: text("built_with").default("Next.js, Supabase, Vercel"),
  defaultTheme: text("default_theme").default("dark"),
  // How the Works/Projects listing is laid out on the site. 'row' = alternating
  // showcase rows, 'grid' = image-top cards. Toggled from the admin Settings form.
  worksLayout: text("works_layout").notNull().default("grid"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// Inferred row types — the single source of truth for our type-safe data layer.
export type Hero = typeof hero.$inferSelect;
export type About = typeof about.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type Freelance = typeof freelance.$inferSelect;
export type Education = typeof education.$inferSelect;
export type Certification = typeof certifications.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type GithubRepo = typeof githubRepos.$inferSelect;
export type SocialLink = typeof socialLinks.$inferSelect;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type SeoMetadata = typeof seoMetadata.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
