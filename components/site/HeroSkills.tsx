import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiMui,
  SiRedux,
  SiNodedotjs,
  SiMongodb,
  SiSass,
  SiGit,
  SiFramer,
} from "react-icons/si";

/** Curated core stack shown as logo chips in the hero. */
const HERO_SKILLS: { name: string; Icon: IconType; color: string }[] = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Material UI", Icon: SiMui, color: "#007FFF" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Sass", Icon: SiSass, color: "#CC6699" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "Framer Motion", Icon: SiFramer, color: "currentColor" },
];

export default function HeroSkills() {
  return (
    <ul className="flex flex-wrap gap-2.5 mt-8">
      {HERO_SKILLS.map(({ name, Icon, color }) => (
        <li
          key={name}
          className="flex items-center gap-x-2 text-sm dark:bg-primary-bg bg-zinc-50 border dark:border-zinc-800 border-zinc-200 dark:text-zinc-300 text-zinc-700 rounded-md px-2.5 py-1.5"
        >
          <Icon className="text-base shrink-0" style={{ color }} aria-hidden />
          {name}
        </li>
      ))}
    </ul>
  );
}
