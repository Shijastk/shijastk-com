import { Suspense } from "react";
import type { Metadata } from "next";
import Sidebar from "@/components/admin/Sidebar";
import { requireAdmin } from "@/features/auth/guard";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

async function AdminShell({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return (
    <div className="flex min-h-screen dark:bg-zinc-950 bg-zinc-50">
      <Sidebar email={user.email} />
      <main className="flex-1 min-w-0 p-8 max-w-5xl">{children}</main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Everything under /admin is dynamic (auth + live DB). Wrapping in Suspense
  // keeps the uncached/dynamic data inside a boundary, as Cache Components requires.
  return (
    <Suspense
      fallback={
        <div className="min-h-screen grid place-items-center text-sm text-zinc-500">
          Loading dashboard…
        </div>
      }
    >
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
