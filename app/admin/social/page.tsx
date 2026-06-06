import AdminHeader from "@/components/admin/AdminHeader";
import { SocialManager } from "@/components/admin/ListManagers";
import { listSocial } from "@/lib/admin/data";

export default async function SocialAdminPage() {
  const items = await listSocial();
  return (
    <>
      <AdminHeader title="Social links" description="Links shown under your hero." />
      <SocialManager items={items} />
    </>
  );
}
