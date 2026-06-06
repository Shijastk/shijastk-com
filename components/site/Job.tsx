import Image from "next/image";
import { Slide } from "./Slide";
import { StaggerGroup, StaggerItem } from "./Reveal";
import EmptyState from "./EmptyState";
import RefLink from "./RefLink";
import { formatMonthYear } from "@/lib/utils";
import type { Experience } from "@/db/schema";
import { RiBriefcase3Fill } from "react-icons/ri";

export default function Job({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="mt-32">
      <Slide delay={0.16}>
        <div className="mb-16">
          <h2 className="font-incognito text-4xl mb-4 font-bold tracking-tight">
            Work Experience
          </h2>
        </div>
      </Slide>

      {experiences.length > 0 ? (
        <StaggerGroup className="grid lg:grid-cols-2 grid-cols-1 gap-x-12 gap-y-10">
          {experiences.map((job) => {
              const logo = (
                <div className="grid place-items-center dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 min-h-[80px] min-w-[80px] p-2 rounded-md overflow-clip relative">
                  {job.logo ? (
                    <Image
                      src={job.logo}
                      className="object-cover duration-300"
                      alt={`${job.name} logo`}
                      width={50}
                      height={50}
                    />
                  ) : (
                    <span className="font-incognito font-bold text-2xl dark:text-primary-color text-tertiary-color">
                      {job.name.charAt(0)}
                    </span>
                  )}
                </div>
              );

              return (
                <StaggerItem
                  key={job.id}
                  className="flex items-start lg:gap-x-6 gap-x-4 max-w-2xl relative before:absolute before:bottom-0 before:top-[5rem] before:left-9 before:w-[1px] before:h-[calc(100%-70px)] dark:before:bg-zinc-800 before:bg-zinc-200"
                >
                  {job.url ? (
                    <RefLink href={job.url}>{logo}</RefLink>
                  ) : (
                    logo
                  )}

                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-semibold">{job.name}</h3>
                    <p>{job.jobTitle}</p>
                    <time className="text-sm text-zinc-500 mt-2 tracking-widest uppercase">
                      {formatMonthYear(job.startDate)} —{" "}
                      {job.endDate ? (
                        formatMonthYear(job.endDate)
                      ) : (
                        <span className="dark:text-primary-color text-tertiary-color">
                          Present
                        </span>
                      )}
                    </time>
                    {job.description ? (
                      <p className="tracking-tight dark:text-zinc-400 text-zinc-600 my-4">
                        {job.description}
                      </p>
                    ) : null}
                    {job.highlights.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2 dark:text-zinc-400 text-zinc-600 text-sm leading-relaxed">
                        {job.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </StaggerItem>
              );
            })}
        </StaggerGroup>
      ) : (
        <EmptyState
          icon={<RiBriefcase3Fill />}
          title="No work experience yet"
          message="Add experience entries from the admin dashboard."
        />
      )}
    </section>
  );
}
