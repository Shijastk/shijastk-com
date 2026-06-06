import Image from "next/image";
import Link from "next/link";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { StaggerGroup, StaggerItem } from "@/components/site/Reveal";
import Markdown from "@/components/site/Markdown";
import type { Project } from "@/db/schema";

/*
  Works listing with two admin-selectable layouts (site_settings.works_layout):
    • "row"  — alternating full-width showcase rows (image one side, copy the other)
    • "grid" — image-top cards in a responsive grid
  Driven by featured/visible projects. Tags come from each project's techStack.
*/

/** First usable image for a project, or null. */
function projectImage(p: Project): string | null {
  return p.coverImageUrl || p.screenshots[0] || p.logo || null;
}

/** "#Web Design  #Web Development" from techStack. */
function Tags({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <p className="font-incognito text-sm dark:text-zinc-400 text-zinc-500 tracking-wide">
      {items.map((t) => `#${t}`).join("  ")}
    </p>
  );
}

function ViewWebsiteLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="inline-flex items-center gap-x-2 font-incognito font-semibold dark:text-primary-color text-tertiary-color hover:gap-x-3 duration-200"
    >
      View the Website <BiLinkExternal aria-hidden="true" />
    </a>
  );
}

function GithubLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="View source on GitHub"
      className="inline-flex items-center gap-x-2 font-incognito font-semibold dark:text-zinc-300 text-zinc-700 hover:dark:text-white hover:text-black hover:gap-x-3 duration-200"
    >
      <BiLogoGithub aria-hidden="true" className="text-xl" /> GitHub
    </a>
  );
}

/** Website + GitHub links, each shown only when its URL is set. */
function ProjectLinks({ project }: { project: Project }) {
  if (!project.projectUrl && !project.repository) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
      {project.projectUrl ? <ViewWebsiteLink href={project.projectUrl} /> : null}
      {project.repository ? <GithubLink href={project.repository} /> : null}
    </div>
  );
}

/** Full project write-up (Markdown), shown under the tagline. */
function Description({ md }: { md: string | null }) {
  if (!md || !md.trim()) return null;
  return (
    <div className="max-w-xl text-sm">
      <Markdown>{md}</Markdown>
    </div>
  );
}

/** Image box that links to the project detail page (falls back to an initial). */
function Cover({ project, className }: { project: Project; className?: string }) {
  const src = projectImage(project);
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block w-full overflow-hidden rounded-xl border dark:border-zinc-800 border-zinc-100 dark:bg-zinc-800 bg-zinc-100 ${className ?? ""}`}
    >
      {src ? (
        <Image
          src={src}
          alt={project.name}
          fill
          quality={100}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      ) : (
        <span className="absolute inset-0 grid place-items-center font-incognito font-bold text-5xl dark:text-primary-color text-tertiary-color">
          {project.name.charAt(0)}
        </span>
      )}
    </Link>
  );
}

/* ----------------------------- Row layout ----------------------------- */

function RowLayout({ projects }: { projects: Project[] }) {
  return (
    <StaggerGroup className="flex flex-col gap-y-24" delayChildren={0.1}>
      {projects.map((project, i) => {
        const flipped = i % 2 === 1;
        return (
          <StaggerItem
            key={project.id}
            className="grid lg:grid-cols-2 gap-x-12 gap-y-8 items-center"
          >
            <div className={`flex flex-col gap-y-5 ${flipped ? "lg:order-2" : ""}`}>
              <Tags items={project.techStack} />
              <Link href={`/projects/${project.slug}`}>
                <h3 className="font-incognito font-bold tracking-tight text-3xl sm:text-4xl hover:opacity-80 duration-200">
                  {project.name}
                </h3>
              </Link>
              {project.tagline ? (
                <p className="dark:text-zinc-300 text-zinc-700 leading-relaxed max-w-xl font-medium">
                  {project.tagline}
                </p>
              ) : null}
              <Description md={project.descriptionMd} />
              <ProjectLinks project={project} />
            </div>
            <Cover
              project={project}
              className={`pt-[62%] ${flipped ? "lg:order-1" : ""}`}
            />
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}

/* ----------------------------- Grid layout ---------------------------- */

function GridLayout({ projects }: { projects: Project[] }) {
  return (
    <StaggerGroup
      className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
      delayChildren={0.1}
    >
      {projects.map((project) => (
        <StaggerItem key={project.id} className="h-full">
          <div className="flex h-full flex-col dark:bg-primary-bg bg-zinc-50 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-xl overflow-hidden duration-200">
            <Cover project={project} className="pt-[58%] rounded-none border-0 border-b dark:border-zinc-800 border-zinc-100" />
            <div className="flex flex-col gap-y-3 p-5 grow">
              <Tags items={project.techStack} />
              <Link href={`/projects/${project.slug}`}>
                <h3 className="font-incognito font-bold tracking-tight text-xl hover:opacity-80 duration-200">
                  {project.name}
                </h3>
              </Link>
              {project.tagline ? (
                <p className="dark:text-zinc-300 text-zinc-700 leading-relaxed text-sm font-medium">
                  {project.tagline}
                </p>
              ) : null}
              <div className="grow">
                <Description md={project.descriptionMd} />
              </div>
              <ProjectLinks project={project} />
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

export default function WorksSection({
  projects,
  layout,
}: {
  projects: Project[];
  layout?: string | null;
}) {
  if (projects.length === 0) return null;
  return layout === "row" ? (
    <RowLayout projects={projects} />
  ) : (
    <GridLayout projects={projects} />
  );
}
