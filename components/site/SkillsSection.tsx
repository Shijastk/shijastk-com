import type { IconType } from "react-icons";
import { Slide } from "./Slide";
import { StaggerGroup, StaggerItem } from "./Reveal";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiSass,
  SiBootstrap,
  SiMui,
  SiRedux,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGit,
  SiGithub,
  SiGitlab,
  SiVercel,
  SiFigma,
} from "react-icons/si";

/** Logos shown in the "My Toolkit" grid — mirrors the real stack. */
const TOOLKIT: { name: string; Icon: IconType; color: string }[] = [
  { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", Icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "currentColor" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Sass", Icon: SiSass, color: "#CC6699" },
  { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
  { name: "Material UI", Icon: SiMui, color: "#007FFF" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
  { name: "Framer Motion", Icon: SiFramer, color: "currentColor" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express", Icon: SiExpress, color: "currentColor" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "Git", Icon: SiGit, color: "#F05032" },
  { name: "GitHub", Icon: SiGithub, color: "currentColor" },
  { name: "GitLab", Icon: SiGitlab, color: "#FC6D26" },
  { name: "Vercel", Icon: SiVercel, color: "currentColor" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
];

export default function SkillsSection() {
  return (
    <section className="mt-24 flex flex-col items-center text-center">
      <Slide>
        <h2 className="font-incognito font-semibold tracking-tight text-3xl sm:text-4xl mb-4">
          My Toolkit
        </h2>
        <p className="dark:text-zinc-400 text-zinc-600 max-w-2xl leading-relaxed mb-8">
          I switch seamlessly between tools and reach for whatever helps me put
          ideas across clearly and quickly, so the team can understand, give
          actionable feedback, and make better decisions faster.
        </p>
      </Slide>
      <StaggerGroup
        as="ul"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-6"
        stagger={0.05}
      >
        {TOOLKIT.map(({ name, Icon, color }) => (
          <StaggerItem as="li" key={name} className="flex items-center gap-x-3">
            <Icon className="text-3xl shrink-0" style={{ color }} aria-hidden />
            <span className="dark:text-zinc-300 text-zinc-700">{name}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
