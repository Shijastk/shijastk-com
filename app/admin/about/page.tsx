import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardBody } from "@/components/ui/card";
import { AboutForm } from "@/components/admin/SingletonForms";
import { getAboutAdmin } from "@/lib/admin/data";

export default async function AboutAdminPage() {
  const about = await getAboutAdmin();
  return (
    <>
      <AdminHeader title="About" description="Your long bio and résumé link (Markdown supported)." />
      <Card>
        <CardBody>
          <AboutForm initial={about} />
        </CardBody>
      </Card>
    </>
  );
}
