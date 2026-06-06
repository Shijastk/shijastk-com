import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardBody } from "@/components/ui/card";
import { isDbConfigured } from "@/db";
import {
  listSkills,
  listExperiences,
  listProjects,
  listSocial,
  listGithubRepos,
} from "@/lib/admin/data";

export default async function AdminDashboard() {
  const [skills, experiences, projects, social, repos] = await Promise.all([
    listSkills(),
    listExperiences(),
    listProjects(),
    listSocial(),
    listGithubRepos(),
  ]);

  const stats = [
    { label: "Projects", value: projects.length, href: "/admin/projects" },
    { label: "Experience", value: experiences.length, href: "/admin/experience" },
    { label: "Skill groups", value: skills.length, href: "/admin/skills" },
    { label: "Social links", value: social.length, href: "/admin/social" },
    { label: "GitHub repos cached", value: repos.length, href: "/admin/projects/github" },
  ];

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Manage every section of your portfolio. Edits go live immediately — no redeploy."
      />

      {!isDbConfigured ? (
        <div className="mb-6 rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-600 dark:text-amber-400">
          <strong>Database not connected.</strong> Add your Supabase keys and{" "}
          <code>DATABASE_URL</code> to <code>.env.local</code>, then run{" "}
          <code>npm run db:push</code> and <code>npm run db:seed</code>. Until
          then you&apos;re viewing built-in placeholder content and edits
          won&apos;t persist.
        </div>
      ) : null}

      <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="hover:dark:border-zinc-700 hover:border-zinc-300 transition-colors">
              <CardBody>
                <p className="text-3xl font-bold font-incognito">{s.value}</p>
                <p className="text-sm text-zinc-500">{s.label}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>

      <Card>
        <CardBody>
          <h2 className="font-semibold mb-2">Quick start</h2>
          <ol className="list-decimal pl-5 text-sm text-zinc-500 space-y-1">
            <li>Update your <Link className="text-primary-color" href="/admin/hero">Hero</Link> and <Link className="text-primary-color" href="/admin/about">About</Link> sections.</li>
            <li>Curate <Link className="text-primary-color" href="/admin/projects/github">GitHub repos</Link> and feature your best <Link className="text-primary-color" href="/admin/projects">Projects</Link>.</li>
            <li>Fine-tune <Link className="text-primary-color" href="/admin/seo">SEO</Link> for each page.</li>
          </ol>
        </CardBody>
      </Card>
    </>
  );
}
