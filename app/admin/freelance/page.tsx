import AdminHeader from "@/components/admin/AdminHeader";
import { FreelanceManager } from "@/components/admin/ListManagers";
import { listFreelance } from "@/lib/admin/data";

export default async function FreelanceAdminPage() {
  const items = await listFreelance();
  return (
    <>
      <AdminHeader title="Freelance" description="Independent / freelance engagements." />
      <FreelanceManager items={items} />
    </>
  );
}
