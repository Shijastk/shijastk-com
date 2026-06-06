import Link from "next/link";

/** Text monogram logo (no image asset needed). */
export default function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Home"
      className="grid place-items-center h-9 w-9 rounded-md font-incognito font-extrabold text-lg bg-primary-color text-zinc-900 select-none"
    >
      S
    </Link>
  );
}
