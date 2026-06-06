import type { IconType } from "react-icons";
import {
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiMui,
  SiBootstrap,
  SiSass,
  SiCssmodules,
  SiFramer,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiGithub,
  SiGitlab,
  SiVercel,
} from "react-icons/si";
import {
  LuCode,
  LuLayoutDashboard,
  LuMousePointerClick,
  LuSmartphone,
  LuComponent,
  LuServer,
  LuDatabase,
  LuGitBranch,
  LuLightbulb,
  LuUsers,
  LuClock,
  LuShuffle,
  LuLayers,
  LuBlocks,
  LuPlug,
  LuNetwork,
  LuWorkflow,
  LuGauge,
  LuSparkles,
} from "react-icons/lu";

/**
 * Maps a skill item (stored as free text in the DB) to a logo/icon. Brand
 * names use their official react-icons logo + brand color; conceptual skills
 * fall back to a representative Lucide glyph. `currentColor` lets the chip's
 * text color drive icons whose brand mark is monochrome (or dark-on-light).
 */
const SKILL_ICONS: Record<string, { Icon: IconType; color: string }> = {
  // Competencies
  "Frontend Development": { Icon: LuCode, color: "currentColor" },
  "UI Design": { Icon: LuLayoutDashboard, color: "currentColor" },
  "Interaction Design": { Icon: LuMousePointerClick, color: "currentColor" },
  "Responsive Design": { Icon: LuSmartphone, color: "currentColor" },
  "Design Systems": { Icon: LuComponent, color: "currentColor" },
  "Server-side Scripting": { Icon: LuServer, color: "currentColor" },
  "Database Management": { Icon: LuDatabase, color: "currentColor" },
  "Version Control": { Icon: LuGitBranch, color: "currentColor" },
  "Problem-solving": { Icon: LuLightbulb, color: "currentColor" },
  Collaboration: { Icon: LuUsers, color: "currentColor" },
  "Time Management": { Icon: LuClock, color: "currentColor" },
  Adaptability: { Icon: LuShuffle, color: "currentColor" },

  // Languages
  "JavaScript (ES6+)": { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  HTML5: { Icon: SiHtml5, color: "#E34F26" },
  CSS3: { Icon: SiCss, color: "#1572B6" },

  // Frontend
  "React.js": { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "currentColor" },

  // Styling
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Material UI (MUI)": { Icon: SiMui, color: "#007FFF" },
  Bootstrap: { Icon: SiBootstrap, color: "#7952B3" },
  "Sass / SCSS": { Icon: SiSass, color: "#CC6699" },
  "CSS Modules": { Icon: SiCssmodules, color: "currentColor" },
  "Framer Motion": { Icon: SiFramer, color: "currentColor" },

  // Architecture
  "Feature-Sliced Design (FSD)": { Icon: LuLayers, color: "currentColor" },
  "Reusable Component Design": { Icon: LuBlocks, color: "currentColor" },
  "Redux Toolkit": { Icon: SiRedux, color: "#764ABC" },
  "Context API": { Icon: SiReact, color: "#61DAFB" },

  // Backend & APIs
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  "Express.js": { Icon: SiExpress, color: "currentColor" },
  MongoDB: { Icon: SiMongodb, color: "#47A248" },
  "RESTful APIs": { Icon: LuPlug, color: "currentColor" },
  WebSockets: { Icon: LuNetwork, color: "currentColor" },

  // Version Control & DevOps
  GitHub: { Icon: SiGithub, color: "currentColor" },
  GitLab: { Icon: SiGitlab, color: "#FC6D26" },
  "CI/CD Pipelines": { Icon: LuWorkflow, color: "currentColor" },
  Vercel: { Icon: SiVercel, color: "currentColor" },
  "Core Web Vitals Optimization": { Icon: LuGauge, color: "currentColor" },
};

export function getSkillIcon(item: string): { Icon: IconType; color: string } {
  return SKILL_ICONS[item] ?? { Icon: LuSparkles, color: "currentColor" };
}
