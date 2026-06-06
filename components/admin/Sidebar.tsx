"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/features/auth/actions";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/freelance", label: "Freelance" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/projects/github", label: "GitHub repos" },
  { href: "/admin/social", label: "Social links" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/seo", label: "SEO" },
  { href: "/admin/settings", label: "Settings" },
];

export default function Sidebar({ email }: { email?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 border-r dark:border-zinc-800 border-zinc-200 min-h-screen p-4 flex flex-col gap-1 sticky top-0">
      <div className="px-3 py-4">
        <p className="font-incognito font-bold text-lg">Admin</p>
        {email ? <p className="text-xs text-zinc-500 truncate">{email}</p> : null}
      </div>

      <nav className="flex-1 flex flex-col gap-0.5 overflow-y-auto">
        {LINKS.map((l) => {
          const active =
            l.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-primary-color text-zinc-900 font-medium"
                  : "hover:dark:bg-zinc-800 hover:bg-zinc-100 dark:text-zinc-300 text-zinc-700"
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t dark:border-zinc-800 border-zinc-200 pt-3 mt-3 flex flex-col gap-1">
        <Link
          href="/"
          target="_blank"
          className="rounded-md px-3 py-2 text-sm hover:dark:bg-zinc-800 hover:bg-zinc-100 text-zinc-500"
        >
          ↗ View site
        </Link>
        <form action={signOut}>
          <button className="w-full text-left rounded-md px-3 py-2 text-sm text-red-500 hover:dark:bg-zinc-800 hover:bg-zinc-100">
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}
