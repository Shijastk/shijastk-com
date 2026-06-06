import AdminHeader from "@/components/admin/AdminHeader";
import { CertificationsManager } from "@/components/admin/ListManagers";
import { listCertifications } from "@/lib/admin/data";

export default async function CertificationsAdminPage() {
  const items = await listCertifications();
  return (
    <>
      <AdminHeader title="Certifications" description="Professional certifications." />
      <CertificationsManager items={items} />
    </>
  );
}
