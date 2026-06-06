import type { Metadata } from "next";
import PageHeading from "@/components/site/PageHeading";
import EmptyState from "@/components/site/EmptyState";
import WorksSection from "@/components/site/WorksSection";
import { getProjects, getSeo, getSiteSettings } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("projects");
  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
  };
}

export default async function ProjectsPage() {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6">
      <PageHeading
        title="Projects"
        description="SaaS platforms, enterprise dashboards and high-traffic apps I've designed and built. A few are live — check them out, and explore the code where it's open."
      />

      {projects.length > 0 ? (
        <section className="mb-12">
          <WorksSection projects={projects} layout={settings.worksLayout} />
        </section>
      ) : (
        <EmptyState value="Projects" />
      )}
    </main>
  );
}
