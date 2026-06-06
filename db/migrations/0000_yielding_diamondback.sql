CREATE TABLE "about" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_bio_md" text DEFAULT '' NOT NULL,
	"currently_hacking_md" text DEFAULT '',
	"resume_url" text,
	"profile_image_url" text,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "certifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"issuer" text NOT NULL,
	"year" text DEFAULT '' NOT NULL,
	"url" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"phone" text,
	"location" text,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "education" (
	"id" serial PRIMARY KEY NOT NULL,
	"school" text NOT NULL,
	"degree" text NOT NULL,
	"major" text DEFAULT '' NOT NULL,
	"start_year" text DEFAULT '' NOT NULL,
	"end_year" text DEFAULT '' NOT NULL,
	"result" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"job_title" text NOT NULL,
	"location" text DEFAULT '' NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text,
	"is_current" boolean DEFAULT false NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"highlights" text[] DEFAULT '{}' NOT NULL,
	"logo" text,
	"url" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "freelance" (
	"id" serial PRIMARY KEY NOT NULL,
	"project" text NOT NULL,
	"role" text NOT NULL,
	"duration" text DEFAULT '' NOT NULL,
	"highlights" text[] DEFAULT '{}' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "github_repos" (
	"id" serial PRIMARY KEY NOT NULL,
	"gh_id" integer NOT NULL,
	"name" text NOT NULL,
	"full_name" text NOT NULL,
	"description" text,
	"html_url" text NOT NULL,
	"homepage" text,
	"language" text,
	"languages" jsonb DEFAULT '{}'::jsonb,
	"stargazers_count" integer DEFAULT 0 NOT NULL,
	"forks_count" integer DEFAULT 0 NOT NULL,
	"topics" text[] DEFAULT '{}' NOT NULL,
	"pushed_at" text,
	"is_selected" boolean DEFAULT false NOT NULL,
	"synced_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "github_repos_gh_id_unique" UNIQUE("gh_id")
);
--> statement-breakpoint
CREATE TABLE "hero" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"headline" text NOT NULL,
	"short_bio" text NOT NULL,
	"location" text,
	"avatar_url" text,
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"full_name" text,
	"role" text DEFAULT 'admin' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"tagline" text DEFAULT '',
	"description_md" text DEFAULT '',
	"case_study_md" text DEFAULT '',
	"project_url" text,
	"project_url_label" text DEFAULT 'Live URL',
	"repository" text,
	"logo" text,
	"cover_image_url" text,
	"screenshots" text[] DEFAULT '{}' NOT NULL,
	"tech_stack" text[] DEFAULT '{}' NOT NULL,
	"is_featured" boolean DEFAULT false NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"github_repo_id" integer,
	"override_github" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "seo_metadata" (
	"id" serial PRIMARY KEY NOT NULL,
	"page_key" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"og_image_url" text,
	"keywords" text[] DEFAULT '{}' NOT NULL,
	CONSTRAINT "seo_metadata_page_key_unique" UNIQUE("page_key")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"footer_text" text,
	"built_with" text DEFAULT 'Next.js, Supabase, Vercel',
	"default_theme" text DEFAULT 'dark',
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"category" text NOT NULL,
	"items" text[] DEFAULT '{}' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "social_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"icon_key" text DEFAULT 'link' NOT NULL,
	"status" text DEFAULT 'social' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"is_visible" boolean DEFAULT true NOT NULL
);
