import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardBody } from "@/components/ui/card";
import { SettingsForm } from "@/components/admin/SingletonForms";
import { getSettingsAdmin } from "@/lib/admin/data";

export default async function SettingsAdminPage() {
  const settings = await getSettingsAdmin();
  return (
    <>
      <AdminHeader title="Settings" description="Footer and theme defaults." />
      <Card>
        <CardBody>
          <SettingsForm initial={settings} />
        </CardBody>
      </Card>
    </>
  );
}
