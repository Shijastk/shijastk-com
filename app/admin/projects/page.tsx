import AdminHeader from "@/components/admin/AdminHeader";
import ProjectsManager from "@/components/admin/ProjectsManager";
import { listProjects } from "@/lib/admin/data";

export default async function ProjectsAdminPage() {
  const items = await listProjects();
  return (
    <>
      <AdminHeader title="Projects" description="Reorder, toggle visibility/featured, and edit your projects." />
      <ProjectsManager items={items} />
    </>
  );
}
