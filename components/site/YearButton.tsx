import type { MouseEventHandler } from "react";

export default function YearButton({
  year,
  currentYear,
  onClick,
}: {
  year: number;
  currentYear: number | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg text-center px-4 py-2 border border-transparent dark:hover:border-zinc-700 hover:border-zinc-200 duration-100 text-sm font-medium ${
        year === currentYear
          ? "bg-secondary-color dark:text-zinc-800 text-white hover:border-transparent"
          : "dark:bg-primary-bg bg-zinc-50 dark:text-white text-zinc-800"
      }`}
      title={`View graph for ${year}`}
    >
      {year}
    </button>
  );
}
