import RefLink from "./RefLink";
import Magnetic from "./Magnetic";
import { getIcon } from "@/lib/icon-map";
import type { SocialLink } from "@/db/schema";

/** Renders social/publication links resolved from stored icon keys. */
export default function Social({
  links,
  type = "social",
}: {
  links: SocialLink[];
  type?: "social" | "publication";
}) {
  const items = links.filter((l) => l.status === type);
  if (!items.length) return null;

  return (
    <ul className="flex items-center flex-wrap gap-x-5 gap-y-4 my-10">
      {items.map((value) => {
        const Icon = getIcon(value.iconKey);
        return (
          <li key={value.id}>
            <Magnetic strength={0.5}>
              <RefLink
                href={value.url}
                className="flex items-center border-b dark:border-b-zinc-800 border-zinc-200 group"
              >
                <Icon
                  className="shrink-0 h-5 w-5 text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
                  aria-hidden="true"
                />
                &nbsp;
                {value.name}
              </RefLink>
            </Magnetic>
          </li>
        );
      })}
    </ul>
  );
}
