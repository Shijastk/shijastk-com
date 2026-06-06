import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardBody } from "@/components/ui/card";
import ProjectForm from "@/components/admin/ProjectForm";
import type { ProjectInput } from "@/lib/validations";
import { listProjects } from "@/lib/admin/data";

export default async function NewProjectPage() {
  const existing = await listProjects();
  const blank: ProjectInput = {
    name: "",
    slug: "",
    tagline: "",
    descriptionMd: "",
    caseStudyMd: "",
    projectUrl: "",
    projectUrlLabel: "Live Site",
    repository: "",
    logo: null,
    coverImageUrl: null,
    screenshots: [],
    techStack: [],
    isFeatured: false,
    isVisible: true,
    sortOrder: existing.length,
    githubRepoId: null,
    overrideGithub: true,
  };

  return (
    <>
      <AdminHeader title="New project" />
      <Card>
        <CardBody>
          <ProjectForm initial={blank} isNew />
        </CardBody>
      </Card>
    </>
  );
}
