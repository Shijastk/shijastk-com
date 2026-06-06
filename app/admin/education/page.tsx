import AdminHeader from "@/components/admin/AdminHeader";
import { EducationManager } from "@/components/admin/ListManagers";
import { listEducation } from "@/lib/admin/data";

export default async function EducationAdminPage() {
  const items = await listEducation();
  return (
    <>
      <AdminHeader title="Education" description="Schools and degrees." />
      <EducationManager items={items} />
    </>
  );
}
