-- Row Level Security policies (defense in depth).
-- Run once in the Supabase SQL editor AFTER `npm run db:push` creates the tables.
-- The app reads/writes via the service-role DATABASE_URL (which bypasses RLS);
-- these policies protect the data if the anon key is ever used client-side.

-- Helper: is the current auth user an admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Content tables: public read, admin-only write.
do $$
declare
  t text;
  content_tables text[] := array[
    'hero','about','skills','experiences','freelance','education',
    'certifications','projects','github_repos','social_links',
    'contact_info','seo_metadata','site_settings'
  ];
begin
  foreach t in array content_tables loop
    execute format('alter table public.%I enable row level security;', t);

    execute format('drop policy if exists "public_read" on public.%I;', t);
    execute format('create policy "public_read" on public.%I for select using (true);', t);

    execute format('drop policy if exists "admin_write" on public.%I;', t);
    execute format(
      'create policy "admin_write" on public.%I for all using (public.is_admin()) with check (public.is_admin());',
      t
    );
  end loop;
end $$;

-- Profiles: readable by the owner or an admin; writes via service role only.
alter table public.profiles enable row level security;
drop policy if exists "profiles_self_read" on public.profiles;
create policy "profiles_self_read" on public.profiles
  for select using (auth.uid() = id or public.is_admin());
