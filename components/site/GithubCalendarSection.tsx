import { Suspense } from "react";
import ContributionGraph from "./ContributionGraph";
import { Slide } from "./Slide";
import { siteConfig } from "@/config/site";

export default function GithubCalendarSection() {
  return (
    <section className="mt-12">
      <Slide delay={0.16} className="mb-8">
        <h2 className="font-incognito text-4xl font-bold tracking-tight">
          Contribution Graph
        </h2>
      </Slide>
      <Slide delay={0.18}>
        <Suspense
          fallback={
            <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg h-[180px] animate-pulse max-w-fit" />
          }
        >
          <ContributionGraph
            username={siteConfig.githubUsername}
            joinYear={siteConfig.githubJoinYear}
          />
        </Suspense>
      </Slide>
    </section>
  );
}
