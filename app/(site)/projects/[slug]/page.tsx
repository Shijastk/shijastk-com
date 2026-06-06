import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BiLinkExternal, BiLogoGithub } from "react-icons/bi";
import { Slide } from "@/components/site/Slide";
import Markdown from "@/components/site/Markdown";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/queries";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} | Project`,
    description: project.tagline ?? undefined,
    openGraph: {
      title: project.name,
      description: project.tagline ?? undefined,
      images: project.coverImageUrl ? [project.coverImageUrl] : undefined,
    },
  };
}

export default async function ProjectDetail({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className="max-w-6xl mx-auto lg:px-16 px-8">
      <Slide>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <h1 className="font-incognito font-black tracking-tight sm:text-5xl text-3xl max-w-md">
              {project.name}
            </h1>

            <div className="flex items-center gap-x-2">
              <a
                href={project.projectUrl || undefined}
                rel="noreferrer noopener"
                target="_blank"
                aria-disabled={!project.projectUrl}
                className={`flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 ${
                  !project.projectUrl
                    ? "cursor-not-allowed opacity-80 pointer-events-none"
                    : "hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLinkExternal aria-hidden="true" />
                {project.projectUrl ? project.projectUrlLabel || "Live URL" : "Coming Soon"}
              </a>

              <a
                href={project.repository || undefined}
                rel="noreferrer noopener"
                target="_blank"
                aria-disabled={!project.repository}
                className={`flex items-center gap-x-2 dark:bg-primary-bg bg-secondary-bg dark:text-white text-zinc-700 border border-transparent rounded-md px-4 py-2 duration-200 ${
                  !project.repository
                    ? "cursor-not-allowed opacity-80 pointer-events-none"
                    : "hover:dark:border-zinc-700 hover:border-zinc-200"
                }`}
              >
                <BiLogoGithub aria-hidden="true" />
                {project.repository ? "GitHub" : "No Repo"}
              </a>
            </div>
          </div>

          <p className="dark:text-zinc-400 text-zinc-600 mb-6">{project.tagline}</p>

          {project.coverImageUrl ? (
            <div className="relative w-full pt-[52.5%] mb-2">
              <Image
                className="rounded-xl border dark:border-zinc-800 border-zinc-100 object-cover"
                fill
                src={project.coverImageUrl}
                alt={project.name}
                quality={100}
              />
            </div>
          ) : null}

          {project.techStack.length > 0 ? (
            <ul className="flex flex-wrap gap-2 mt-6 mb-2">
              {project.techStack.map((tech) => (
                <li
                  key={tech}
                  className="text-sm dark:bg-zinc-800 bg-zinc-100 dark:text-zinc-300 text-zinc-700 rounded-md px-2.5 py-1"
                >
                  {tech}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8">
            <Markdown>{project.descriptionMd || ""}</Markdown>
          </div>

          {project.caseStudyMd ? (
            <div className="mt-8">
              <Markdown>{project.caseStudyMd}</Markdown>
            </div>
          ) : null}
        </div>
      </Slide>
    </main>
  );
}
