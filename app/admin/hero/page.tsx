import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardBody } from "@/components/ui/card";
import { HeroForm } from "@/components/admin/SingletonForms";
import { getHeroAdmin } from "@/lib/admin/data";

export default async function HeroAdminPage() {
  const hero = await getHeroAdmin();
  return (
    <>
      <AdminHeader title="Hero" description="The headline and intro on your homepage." />
      <Card>
        <CardBody>
          <HeroForm initial={hero} />
        </CardBody>
      </Card>
    </>
  );
}
