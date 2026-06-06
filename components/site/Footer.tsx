import { Suspense } from "react";
import { getSiteSettings } from "@/lib/queries";
import { siteConfig } from "@/config/site";
import { Slide } from "./Slide";
import Year from "./Year";

export default async function Footer() {
  const settings = await getSiteSettings();
  const builtWith = (settings.builtWith ?? "Next.js, Supabase, Vercel")
    .split(",")
    .map((s) => s.trim());

  return (
    <footer className="border-t dark:border-zinc-800 border-zinc-100 mt-44 lg:min-h-[200px] min-h-full relative">
      <Slide className="max-w-7xl mx-auto flex lg:flex-row flex-col items-center lg:justify-between justify-center gap-y-4 md:px-16 px-6 py-16">
        <div className="flex md:flex-row flex-col items-center gap-x-2">
          <h3 className="font-inter">Built with:</h3>
          <ul className="flex items-center gap-x-3 text-sm dark:text-zinc-300 text-zinc-600 md:mt-0 mt-3">
            {builtWith.map((tool) => (
              <li key={tool} className="hover:text-primary-color duration-200">
                {tool}
              </li>
            ))}
          </ul>
        </div>

        <small className="text-zinc-500">
          Copyright &copy; {siteConfig.name}{" "}
          <Suspense fallback={null}>
            <Year />
          </Suspense>
          . All rights reserved.
        </small>
      </Slide>
    </footer>
  );
}
