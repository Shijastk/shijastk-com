import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardBody } from "@/components/ui/card";
import ProjectForm from "@/components/admin/ProjectForm";
import type { ProjectInput } from "@/lib/validations";
import { getProjectAdmin } from "@/lib/admin/data";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectAdmin(Number(id));
  if (!project) notFound();

  const initial: ProjectInput = {
    id: project.id,
    name: project.name,
    slug: project.slug,
    tagline: project.tagline ?? "",
    descriptionMd: project.descriptionMd ?? "",
    caseStudyMd: project.caseStudyMd ?? "",
    projectUrl: project.projectUrl ?? "",
    projectUrlLabel: project.projectUrlLabel ?? "",
    repository: project.repository ?? "",
    logo: project.logo,
    coverImageUrl: project.coverImageUrl,
    screenshots: project.screenshots,
    techStack: project.techStack,
    isFeatured: project.isFeatured,
    isVisible: project.isVisible,
    sortOrder: project.sortOrder,
    githubRepoId: project.githubRepoId,
    overrideGithub: project.overrideGithub,
  };

  return (
    <>
      <AdminHeader title={`Edit: ${project.name}`} />
      <Card>
        <CardBody>
          <ProjectForm initial={initial} />
        </CardBody>
      </Card>
    </>
  );
}
