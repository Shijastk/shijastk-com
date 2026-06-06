import Image from "next/image";
import type { Metadata } from "next";
import { BiEnvelope, BiLinkExternal } from "react-icons/bi";
import { Slide } from "@/components/site/Slide";
import TextReveal from "@/components/site/TextReveal";
import Markdown from "@/components/site/Markdown";
import RefLink from "@/components/site/RefLink";
import { getSkillIcon } from "@/lib/skill-icons";
import {
  getAbout,
  getHero,
  getSkills,
  getEducation,
  getCertifications,
  getFreelance,
  getContact,
  getSeo,
} from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("about");
  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
  };
}

export default async function About() {
  const [about, hero, skills, education, certifications, freelance, contact] =
    await Promise.all([
      getAbout(),
      getHero(),
      getSkills(),
      getEducation(),
      getCertifications(),
      getFreelance(),
      getContact(),
    ]);

  return (
    <main className="relative lg:max-w-7xl mx-auto max-w-3xl md:px-16 px-6">
      {/* Bio + sidebar */}
      <section className="relative grid lg:grid-cols-[1.2fr_1fr] grid-cols-1 gap-x-6 justify-items-center">
        <div className="order-2 lg:order-none">
          <TextReveal
            as="h1"
            text={`I'm ${hero.fullName}. I live in ${
              hero.location ?? "Earth"
            }, where I build the future.`}
            className="font-incognito font-semibold tracking-tight sm:text-5xl text-3xl lg:leading-tight mb-8"
          />
          <Slide delay={0.2}>
            <Markdown>{about.fullBioMd}</Markdown>
          </Slide>
        </div>

        <aside className="flex flex-col lg:justify-self-center justify-self-start gap-y-8 lg:order-1 order-none mb-12">
          <Slide delay={0.1}>
            <div className="sticky top-10">
              {about.profileImageUrl ? (
                <Image
                  className="rounded-2xl mb-4 object-cover max-h-96 min-h-96 bg-top"
                  src={about.profileImageUrl}
                  width={400}
                  height={400}
                  quality={100}
                  alt={hero.fullName}
                  priority
                />
              ) : (
                <div className="h-96 w-[400px] rounded-2xl bg-zinc-500 mb-4" />
              )}

              <div className="flex flex-col text-center gap-y-4">
                {about.resumeUrl ? (
                  <RefLink
                    href={about.resumeUrl}
                    className="flex items-center justify-center text-center gap-x-2 dark:bg-primary-bg bg-zinc-100 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 rounded-md py-2 text-lg font-incognito font-semibold"
                  >
                    View Résumé <BiLinkExternal className="text-base" />
                  </RefLink>
                ) : null}

                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center justify-center gap-x-2 hover:text-primary-color"
                  >
                    <BiEnvelope className="text-lg" />
                    {contact.email}
                  </a>
                ) : null}
              </div>
            </div>
          </Slide>
        </aside>
      </section>

      {/* Skills */}
      <Slide delay={0.12}>
        <section className="mt-24 max-w-6xl mx-auto">
          <h2 className="text-4xl mb-4 font-bold tracking-tight">Skills</h2>
          <p className="dark:text-zinc-400 text-zinc-600 max-w-xl mb-8">
            The competencies I bring to every project, and the tools,
            technologies and frameworks I work with on a daily basis.
          </p>
          <div className="columns-1 sm:columns-2 gap-6">
            {skills.map((group) => (
              <div
                key={group.id}
                className="break-inside-avoid mb-6 dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-5"
              >
                <h3 className="font-incognito font-semibold text-lg mb-3">
                  {group.category}
                </h3>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                  {group.items.map((item) => {
                    const { Icon, color } = getSkillIcon(item);
                    return (
                      <li key={item} className="flex items-start gap-x-3">
                        <Icon
                          className="text-2xl shrink-0 mt-0.5"
                          style={{ color }}
                          aria-hidden
                        />
                        <span className="dark:text-zinc-300 text-zinc-700">
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Slide>

      {/* Experience extras: Education + Certifications */}
      <Slide delay={0.14}>
        <section className="mt-24 grid lg:grid-cols-2 grid-cols-1 gap-12 max-w-5xl">
          <div>
            <h2 className="text-4xl mb-6 font-bold tracking-tight">Education</h2>
            <ul className="space-y-4">
              {education.map((e) => (
                <li
                  key={e.id}
                  className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-5"
                >
                  <h3 className="font-semibold text-lg">{e.school}</h3>
                  <p className="dark:text-zinc-400 text-zinc-600">
                    {e.degree}
                    {e.major ? `, ${e.major}` : ""}
                  </p>
                  <p className="text-sm text-zinc-500 mt-1 tracking-widest uppercase">
                    {e.startYear} — {e.endYear}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-4xl mb-6 font-bold tracking-tight">
              Certifications
            </h2>
            <ul className="space-y-4">
              {certifications.map((c) => (
                <li
                  key={c.id}
                  className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-5"
                >
                  <h3 className="font-semibold text-lg">{c.name}</h3>
                  <p className="dark:text-zinc-400 text-zinc-600">{c.issuer}</p>
                  <p className="text-sm text-zinc-500 mt-1 tracking-widest uppercase">
                    {c.year}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Slide>

      {/* Freelance */}
      {freelance.length > 0 ? (
        <Slide delay={0.16}>
          <section className="mt-24 max-w-5xl">
            <h2 className="text-4xl mb-6 font-bold tracking-tight">
              Freelance Work
            </h2>
            <div className="space-y-6">
              {freelance.map((f) => (
                <div
                  key={f.id}
                  className="dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 rounded-lg p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-lg">{f.role}</h3>
                    <span className="text-sm text-zinc-500 tracking-widest uppercase">
                      {f.duration}
                    </span>
                  </div>
                  <ul className="list-disc pl-5 space-y-2 dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed">
                    {f.highlights.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Slide>
      ) : null}
    </main>
  );
}
