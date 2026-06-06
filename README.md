# Shijas T K — Portfolio + Admin Dashboard

A production-grade personal portfolio whose **UI is modeled on [victoreke.com](https://github.com/Evavic44/victoreke.com)**, rebuilt on **Next.js 16 + Tailwind v4** with a fully custom backend: a **Supabase** database, a secured **admin dashboard**, **GitHub integration**, and on-demand revalidation so edits go live without a redeploy.

## Stack

- **Next.js 16** (App Router, React 19, Cache Components / PPR, Turbopack)
- **Tailwind CSS v4** + `next-themes` + `framer-motion` + the incognito display font
- **Supabase** (Postgres + Auth + Storage)
- **Drizzle ORM** + `drizzle-kit` (type-safe schema & migrations)
- **Zod** + `react-hook-form` (type-safe forms/APIs)
- **Server Actions** for mutations; `'use cache'` + `updateTag` for instant edit-to-live

## How it works

- **Public pages** (`app/(site)`) — Home, About, Projects — are statically optimized and read from cached query functions in [`lib/queries.ts`](lib/queries.ts), tagged per content domain.
- **Admin** (`app/admin`) is gated by [`proxy.ts`](proxy.ts) (edge) + `requireAdmin()` (role check). Every mutation in [`lib/admin/actions.ts`](lib/admin/actions.ts) re-checks admin, validates with Zod, writes via Drizzle, then calls `updateTag(...)` — the public page serves fresh content on the next request, **no redeploy**.
- Until Supabase is configured, the site renders from built-in placeholder data ([`db/seed-data.ts`](db/seed-data.ts)) so you can develop the UI immediately.

## Setup

### 1. Install

```bash
npm install
```

### 2. Create a Supabase project

Collect from **Project Settings → API** and **→ Database**:

- Project URL → `NEXT_PUBLIC_SUPABASE_URL`
- anon / **publishable** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`)
- service-role key → `SUPABASE_SERVICE_ROLE_KEY`
- Connection string (URI) → `DATABASE_URL`

Put them in `.env.local` (see [`.env.example`](.env.example)).

### 3. Create the schema, apply RLS, and seed

```bash
npm run db:push        # creates tables from db/schema.ts
# then paste db/rls.sql into the Supabase SQL editor (enables Row Level Security)
npm run db:seed        # loads your content into the database
```

### 4. Create your admin user

1. In Supabase → **Authentication → Users → Add user**, create yourself an email/password account.
2. Add `ADMIN_EMAIL="you@example.com"` to `.env.local` and re-run `npm run db:seed` — it grants that user the `admin` role.

### 5. Run

```bash
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (sign in with your admin account)

## Admin dashboard

Manage every section without touching code: **Hero, About, Skills, Experience, Education, Certifications, Freelance, Projects** (drag-to-reorder, visibility/featured toggles), **GitHub repos** (sync, select, import-as-project with override), **Social links, Contact, SEO, Settings**.

## GitHub integration

- Avatar + contribution graph use `NEXT_PUBLIC_GITHUB_USERNAME`.
- In **Admin → GitHub repos**, click **Sync now** to cache your repos, choose which to feature, and **Import as project** (with full override of title/description/tags/screenshots).
- A daily Vercel Cron ([`vercel.json`](vercel.json)) hits `/api/github/sync`. Set `CRON_SECRET` (Vercel sends it as a Bearer token) or `REVALIDATE_SECRET`.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Next.js dev / production build / serve |
| `npm run db:push` | Push the Drizzle schema to Supabase |
| `npm run db:generate` | Generate a SQL migration from schema changes |
| `npm run db:migrate` | Apply generated migrations |
| `npm run db:seed` | Seed content (+ optional admin profile) |
| `npm run db:studio` | Open Drizzle Studio |

## Deploy (Vercel)

1. Import the repo into Vercel; add all `.env.local` variables in project settings (set `NEXT_PUBLIC_SITE_URL` to your domain).
2. Run `db:push` + `db:seed` against your production database and apply `db/rls.sql`.
3. Add a `CRON_SECRET` env var for the GitHub sync cron.
