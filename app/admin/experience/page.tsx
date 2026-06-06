import AdminHeader from "@/components/admin/AdminHeader";
import { ExperienceManager } from "@/components/admin/ListManagers";
import { listExperiences } from "@/lib/admin/data";

export default async function ExperienceAdminPage() {
  const items = await listExperiences();
  return (
    <>
      <AdminHeader title="Experience" description="Your work-experience timeline." />
      <ExperienceManager items={items} />
    </>
  );
}
