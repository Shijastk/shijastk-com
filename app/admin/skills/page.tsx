import AdminHeader from "@/components/admin/AdminHeader";
import { SkillsManager } from "@/components/admin/ListManagers";
import { listSkills } from "@/lib/admin/data";

export default async function SkillsAdminPage() {
  const items = await listSkills();
  return (
    <>
      <AdminHeader title="Skills" description="Grouped technical skills." />
      <SkillsManager items={items} />
    </>
  );
}
