import AdminHeader from "@/components/admin/AdminHeader";
import { Card, CardBody } from "@/components/ui/card";
import { SeoForm } from "@/components/admin/SingletonForms";
import { listSeo } from "@/lib/admin/data";
import { fallbackSeo } from "@/db/fallback";

const PAGES = ["home", "about", "projects"] as const;

export default async function SeoAdminPage() {
  const rows = await listSeo();
  const byKey = new Map(rows.map((r) => [r.pageKey, r]));

  return (
    <>
      <AdminHeader title="SEO" description="Per-page title, description and keywords." />
      <div className="space-y-5">
        {PAGES.map((key) => {
          const row =
            byKey.get(key) ?? fallbackSeo.find((s) => s.pageKey === key)!;
          return (
            <Card key={key}>
              <CardBody>
                <SeoForm initial={row} />
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
}
