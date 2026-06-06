"use client";

import { useRouter } from "next/navigation";
import { EntityForm, type FieldConfig } from "./EntityForm";
import { projectSchema, type ProjectInput } from "@/lib/validations";
import { saveProject } from "@/lib/admin/actions";

const fields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "slug", label: "Slug", type: "text", help: "URL segment: lowercase, dashes only." },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "techStack", label: "Tech stack", type: "list" },
  { name: "projectUrl", label: "Live URL", type: "text" },
  { name: "projectUrlLabel", label: "Live URL label", type: "text", help: "e.g. Live Demo, Live Site, Proprietary." },
  { name: "repository", label: "Repository URL", type: "text" },
  { name: "descriptionMd", label: "Description (Markdown)", type: "markdown" },
  { name: "caseStudyMd", label: "Case study (Markdown, optional)", type: "markdown" },
  { name: "logo", label: "Logo", type: "image", help: "Shown as the thumbnail in the projects list." },
  { name: "coverImageUrl", label: "Cover image", type: "image" },
  { name: "screenshots", label: "Screenshots", type: "image-list" },
  { name: "sortOrder", label: "Sort order", type: "number" },
  { name: "isFeatured", label: "Featured", type: "switch" },
  { name: "isVisible", label: "Visible on site", type: "switch" },
  { name: "overrideGithub", label: "Override GitHub metadata", type: "switch" },
];

export default function ProjectForm({
  initial,
  isNew,
}: {
  initial: ProjectInput;
  isNew?: boolean;
}) {
  const router = useRouter();
  return (
    <EntityForm
      schema={projectSchema}
      fields={fields}
      defaultValues={initial as never}
      action={saveProject}
      submitLabel={isNew ? "Create project" : "Save changes"}
      onSuccess={() => {
        router.push("/admin/projects");
        router.refresh();
      }}
    />
  );
}
