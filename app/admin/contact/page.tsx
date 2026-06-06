import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardBody } from "@/components/ui/card";
import { ContactForm } from "@/components/admin/SingletonForms";
import { getContactAdmin } from "@/lib/admin/data";

export default async function ContactAdminPage() {
  const contact = await getContactAdmin();
  return (
    <>
      <AdminHeader title="Contact" description="Email, phone and location." />
      <Card>
        <CardBody>
          <ContactForm initial={contact} />
        </CardBody>
      </Card>
    </>
  );
}
