"use client";

import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import { useState, useEffect } from "react";
import YearButton from "./YearButton";
import EmptyState from "./EmptyState";
import { githubCalendarTheme } from "@/lib/github-calendar-theme";
import { IoIosAnalytics } from "react-icons/io";

/** Build [currentYear ... joinYear] descending. */
function getYears(joinYear: number): number[] {
  if (!joinYear) return [];
  const current = new Date().getFullYear();
  const len = current - joinYear + 1;
  return Array.from({ length: len }, (_, i) => current - i);
}

export default function ContributionGraph({
  username,
  joinYear,
}: {
  username?: string;
  joinYear?: number;
}) {
  const [calendarYear, setCalendarYear] = useState<number | undefined>(undefined);
  const { theme, systemTheme } = useTheme();
  const [scheme, setScheme] = useState<"light" | "dark" | undefined>(undefined);
  const resolved = theme === "light" ? "light" : theme === "dark" ? "dark" : systemTheme;

  useEffect(() => setScheme(resolved as "light" | "dark"), [resolved]);

  // react-github-calendar fetches data and renders client-side only, so its
  // markup (and the theme-dependent colorScheme) differs from the server's.
  // Render it only after mount to keep SSR and first client render identical.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const today = new Date().getFullYear();
  const years = getYears(joinYear ?? 0);

  if (!username || !joinYear) {
    return (
      <EmptyState
        icon={<IoIosAnalytics />}
        title="Contribution graph unavailable"
        message="Add NEXT_PUBLIC_GITHUB_USERNAME and NEXT_PUBLIC_GITHUB_JOIN_YEAR to display the GitHub contribution graph."
      />
    );
  }

  return (
    <div className="flex xl:flex-row flex-col gap-4">
      <div className="dark:bg-primary-bg bg-secondary-bg border dark:border-zinc-800 border-zinc-200 p-8 rounded-lg max-w-fit max-h-fit">
        {mounted ? (
          <GitHubCalendar
            username={username}
            theme={githubCalendarTheme}
            colorScheme={scheme}
            blockSize={13}
            year={calendarYear}
          />
        ) : (
          <div className="h-[150px] w-[640px] max-w-full animate-pulse rounded" />
        )}
      </div>
      <div className="flex justify-start xl:flex-col flex-row flex-wrap gap-2">
        {years.slice(0, 5).map((year) => (
          <YearButton
            key={year}
            year={year}
            currentYear={calendarYear ?? today}
            onClick={() => setCalendarYear(year === calendarYear ? undefined : year)}
          />
        ))}
      </div>
    </div>
  );
}
