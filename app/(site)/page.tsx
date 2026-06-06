import type { Metadata } from "next";
import HeroSvg from "@/components/site/icons/HeroSvg";
import HeroSkills from "@/components/site/HeroSkills";
import SkillsSection from "@/components/site/SkillsSection";
import Social from "@/components/site/Social";
import Job from "@/components/site/Job";
import GithubCalendarSection from "@/components/site/GithubCalendarSection";
import { Slide } from "@/components/site/Slide";
import TextReveal from "@/components/site/TextReveal";
import { getHero, getSocialLinks, getExperiences, getSeo } from "@/lib/queries";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("home");
  return {
    title: seo?.title,
    description: seo?.description,
    keywords: seo?.keywords,
  };
}

export default async function Home() {
  const [hero, social, experiences] = await Promise.all([
    getHero(),
    getSocialLinks(),
    getExperiences(),
  ]);

  return (
    <main className="max-w-7xl mx-auto md:px-16 px-6 lg:mt-32 mt-20">
      <section className="flex xl:flex-row flex-col xl:items-center items-start xl:justify-center justify-between gap-x-12 mb-16">
        <div className="lg:max-w-2xl max-w-2xl">
          <Slide>
            <p className="font-incognito text-lg sm:text-xl dark:text-zinc-400 text-zinc-500 mb-3">
              Hello, I&apos;m {hero.fullName} — Frontend Engineer
            </p>
          </Slide>
          <TextReveal
            as="h1"
            text={hero.headline}
            delay={0.15}
            className="font-incognito font-semibold tracking-tight text-3xl sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight lg:min-w-[700px] min-w-full"
          />
          <Slide delay={0.2}>
            <p className="text-base dark:text-zinc-400 text-zinc-600 leading-relaxed">
              {hero.shortBio}
            </p>
          </Slide>
          {/* <Slide delay={0.1}>
            <HeroSkills />
          </Slide> */}
          <Slide delay={0.14}>
            <Social links={social} type="social" />
          </Slide>
        </div>
        <Slide delay={0.14}>
          <HeroSvg />
        </Slide>
      </section>


      <GithubCalendarSection />
      <SkillsSection />
      <Job experiences={experiences} />
    </main>
  );
}
