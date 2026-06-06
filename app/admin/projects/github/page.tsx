import AdminHeader from "@/components/admin/AdminHeader";
import GithubManager from "@/components/admin/GithubManager";
import { listGithubRepos } from "@/lib/admin/data";

export default async function GithubAdminPage() {
  const repos = await listGithubRepos();
  return (
    <>
      <AdminHeader
        title="GitHub repos"
        description="Sync your repositories, choose which to feature, and import them as projects."
      />
      <GithubManager repos={repos} />
    </>
  );
}
