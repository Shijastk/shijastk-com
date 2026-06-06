/**
 * Single source of truth for portfolio content (from the user's ResumeData).
 * Used by `db/seed.ts` to populate Supabase AND as the fallback that public
 * queries return when the database isn't configured yet. Shapes match the
 * Drizzle insert types (ids/timestamps omitted — DB generates them).
 */

const AVATAR = "https://avatars.githubusercontent.com/u/107620597?v=4";

/** Build a markdown bullet list from highlight strings. */
const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

export const heroData = {
  fullName: "Shijas T K",
  headline:
    "Passionate Frontend Engineer, experienced in crafting scalable SaaS platforms & user-friendly web applications.",
  shortBio:
    "A Frontend Engineer based in Kerala, India with 3+ years of experience designing and optimizing scalable SaaS platforms, enterprise UI systems and high-traffic applications across React, Next.js and TypeScript.",
  location: "Kerala, India",
  avatarUrl: AVATAR,
};

export const aboutData = {
  fullBioMd: [
    "Hi there, I'm **Shijas** — a Frontend Engineer based in Kerala, India. I've spent the last 3+ years designing, developing and optimizing scalable SaaS platforms, enterprise UI systems and high-traffic applications for everyone from small startups to established product teams.",
    "I approach each new project with a full toolkit of ideas and a fresh focus on your needs. Whether you're looking for a polished interface, a robust design system, or a full package of architecture, development and performance optimization — whatever the size of the project, I'll make sure it's set up for success.",
    "Under the hood I work across **React, Next.js and TypeScript**, architecting modular codebases with Feature-Sliced Design (FSD) and scaling design systems with Tailwind CSS, Material UI and Bootstrap — backed by full-stack MERN engineering and automated CI/CD pipelines across GitHub and GitLab. I care about clean decoupling of code, pixel-perfect responsive interfaces and squeezing every millisecond out of Core Web Vitals.",
  ].join("\n\n"),
  currentlyHackingMd:
    "Currently architecting modular, ultra-scalable client-side systems and high-performance enterprise dashboards at **Latelogic**, built entirely with Tailwind CSS and a custom design-token system.",
  resumeUrl: "https://shijasresume2025.vercel.app/",
  profileImageUrl: AVATAR,
};

export const skillsData = [
  { category: "Competencies", items: ["Frontend Development", "UI Design", "Interaction Design", "Responsive Design", "Design Systems", "Server-side Scripting", "Database Management", "Version Control", "Problem-solving", "Collaboration", "Time Management", "Adaptability"], sortOrder: 0 },
  { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "HTML5", "CSS3"], sortOrder: 1 },
  { category: "Frontend", items: ["React.js", "Next.js"], sortOrder: 2 },
  { category: "Styling", items: ["Tailwind CSS", "Material UI (MUI)", "Bootstrap", "Sass / SCSS", "CSS Modules", "Framer Motion"], sortOrder: 3 },
  { category: "Architecture", items: ["Feature-Sliced Design (FSD)", "Reusable Component Design", "Redux Toolkit", "Context API"], sortOrder: 4 },
  { category: "Backend & APIs", items: ["Node.js", "Express.js", "MongoDB", "RESTful APIs", "WebSockets"], sortOrder: 5 },
  { category: "Version Control & DevOps", items: ["GitHub", "GitLab", "CI/CD Pipelines", "Vercel", "Core Web Vitals Optimization"], sortOrder: 6 },
];

export const experiencesData = [
  {
    name: "Latelogic",
    jobTitle: "Frontend Engineer",
    location: "Remote",
    startDate: "2026-01-01",
    endDate: null,
    isCurrent: true,
    description:
      "Architecting modular, ultra-scalable client-side systems and high-performance enterprise dashboards using Feature-Sliced Design and a custom Tailwind design-token system.",
    highlights: [
      "Architect modular, ultra-scalable client-side systems using Feature-Sliced Design (FSD) layers (App, Processes, Pages, Widgets, Features, Entities, Shared) to enforce clean decoupling of code.",
      "Design and scale high-performance enterprise dashboard products built entirely with Tailwind CSS, establishing custom utility classes and design tokens for uniform styling.",
      "Manage source control, code reviews and enterprise release tagging within an agile GitLab workflow, integrating automated performance checks on merge requests.",
      "Optimize critical client-side rendering bottlenecks and Core Web Vitals to maximize loading speeds across heavy data-rich layouts.",
    ],
    logo: null,
    url: "",
    sortOrder: 0,
    isVisible: true,
  },
  {
    name: "Bistux Solutions",
    jobTitle: "Frontend Developer / Engineer",
    location: "Remote",
    startDate: "2023-06-01",
    endDate: "2025-08-01",
    isCurrent: false,
    description:
      "Core frontend developer on 'Ainvox', an enterprise-grade cloud telephony SaaS platform built entirely on Material UI, customizing complex themes and dense data-grid layouts.",
    highlights: [
      "Contributed as a core frontend developer on 'Ainvox', an enterprise-grade cloud telephony SaaS platform built entirely on Material UI (MUI), customizing complex themes, tokens and dense data-grid layouts.",
      "Built and maintained responsive UI modules leveraging specialized layouts, components and real-time mapping state integrations.",
      "Collaborated on GitHub-centric team workflows, maintaining precise branching models, issue tracking and automated deployment checks.",
    ],
    logo: null,
    url: "",
    sortOrder: 1,
    isVisible: true,
  },
];

type ProjectSeed = {
  name: string;
  slug: string;
  tagline: string;
  techStack: string[];
  projectUrl: string;
  projectUrlLabel: string;
  repository: string;
  highlights: string[];
  isFeatured: boolean;
};

const rawProjects: ProjectSeed[] = [
  {
    name: "Ainvox",
    slug: "ainvox",
    tagline: "Enterprise Cloud Telephony SaaS Dashboard",
    techStack: ["React.js", "TypeScript", "Material UI (MUI)", "Redux Toolkit", "WebSockets"],
    projectUrl: "",
    projectUrlLabel: "Proprietary",
    repository: "",
    highlights: [
      "Engineered the platform UI completely using Material UI (MUI), building a custom nested theme engine that instantly adapts to high-density operational viewports.",
      "Overrode default MUI components to map complex real-time active call state streams seamlessly via WebSockets without triggering erratic layout re-renders.",
      "Designed a custom, reusable Data-Grid with server-side processing for parsing millions of call-log index rows.",
    ],
    isFeatured: true,
  },
  {
    name: "SkillSync",
    slug: "skillsync",
    tagline: "Peer-to-Peer Skill Marketplace Platform",
    techStack: ["React.js", "TypeScript", "Tailwind CSS", "Redux Toolkit", "RESTful APIs"],
    projectUrl: "https://skillsync-frontend-theta.vercel.app/",
    projectUrlLabel: "Live Demo",
    repository: "https://github.com/Shijastk/skillsync_frontend",
    highlights: [
      "Architected the frontend repository using modular, component-driven principles to guarantee high maintainability.",
      "Leveraged Tailwind CSS utility compositions to construct highly responsive profile cards and discovery feeds, reducing overall production CSS asset size.",
      "Integrated global application state with Redux Toolkit to track profile availability dates, filter selections and listing states.",
    ],
    isFeatured: true,
  },
  {
    name: "AI-Powered Resume Builder",
    slug: "ai-resume-builder",
    tagline: "Dynamic Content Parsing Utility Application",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AI API Integration"],
    projectUrl: "https://ai-powerd-resume-builder.vercel.app/",
    projectUrlLabel: "Live Demo",
    repository: "https://github.com/Shijastk/ai-powerd-resume-builder",
    highlights: [
      "Developed dynamic UI templates managed entirely via Tailwind configuration variables, enabling live template rendering on runtime data updates.",
      "Built client-side data parsers to sanitize user-typed parameters into structured JSON objects, converting them directly into ATS-optimized resume blocks.",
    ],
    isFeatured: true,
  },
  {
    name: "Intensia Arts Fest Platform",
    slug: "intensia-arts-fest",
    tagline: "High-Traffic Festival Management & Live Ticketing System",
    techStack: ["Next.js", "TypeScript", "SCSS", "Framer Motion", "RESTful APIs"],
    projectUrl: "https://intensia-arts-fest.vercel.app/",
    projectUrlLabel: "Live Demo",
    repository: "https://github.com/Shijastk/intensia-arts-fest",
    highlights: [
      "Crafted a custom design structure using SCSS variables, modular mixins and deep nesting layers to separate aesthetic themes from functional application layouts.",
      "Combined SCSS keyframes and Framer Motion behaviors to orchestrate responsive multi-step booking wizards that did not penalize the browser main thread.",
    ],
    isFeatured: false,
  },
  {
    name: "Parceler",
    slug: "parceler",
    tagline: "Real-Time Fleet & Logistics Tracking Interface",
    techStack: ["React.js", "Geolocation APIs", "WebSockets", "CSS Modules", "GitLab CI/CD"],
    projectUrl: "https://parceler.com/",
    projectUrlLabel: "Live Site",
    repository: "",
    highlights: [
      "Isolated live visual components using native CSS Modules to guarantee zero global style pollution during continuous telemetry updates.",
      "Managed the layout streaming pipelines entirely inside a GitLab repository using dedicated build-test-deploy automated runner setups.",
    ],
    isFeatured: false,
  },
  {
    name: "TransferBay",
    slug: "transferbay",
    tagline: "File-Sharing & Asset Distribution SaaS Platform",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Cloud Asset Storage APIs", "Node.js"],
    projectUrl: "https://transferbay.com/",
    projectUrlLabel: "Live Site",
    repository: "",
    highlights: [
      "Optimized asset upload layers via asynchronous stream rendering to process massive multi-gigabyte client packets cleanly.",
      "Leveraged Tailwind dark-mode variants to build a sleek interface that automatically mirrors client operating system preferences.",
    ],
    isFeatured: false,
  },
  {
    name: "FujiPic",
    slug: "fujipic",
    tagline: "Photography Recipe & Preset Marketplace",
    techStack: ["React.js", "Vanilla CSS", "JavaScript (ES6+)", "Cloud Firestore"],
    projectUrl: "https://fujipic.com/",
    projectUrlLabel: "Live Site",
    repository: "",
    highlights: [
      "Engineered the platform layout without heavy libraries, using Vanilla CSS custom properties to manage visual rendering pipelines and component structure.",
      "Maintained minimal layout shift indexes by initializing image skeleton cards directly within custom style declarations.",
    ],
    isFeatured: false,
  },
  {
    name: "Enterprise E-Commerce Hub",
    slug: "enterprise-ecommerce-hub",
    tagline: "Full-Featured Dynamic E-Commerce Ecosystem",
    techStack: ["MERN", "React.js", "Bootstrap", "Sass", "Express.js", "MongoDB"],
    projectUrl: "",
    projectUrlLabel: "Internal Staging",
    repository: "",
    highlights: [
      "Constructed the complete UI platform using Bootstrap responsive flex rows and container structures to achieve cross-browser accessibility.",
      "Overrode default Bootstrap layout models using SCSS configuration templates to inject branding color patterns precisely.",
    ],
    isFeatured: false,
  },
];

export const projectsData = rawProjects.map((p, i) => ({
  name: p.name,
  slug: p.slug,
  tagline: p.tagline,
  descriptionMd: bullets(p.highlights),
  caseStudyMd: "",
  projectUrl: p.projectUrl,
  projectUrlLabel: p.projectUrlLabel,
  repository: p.repository,
  logo: null as string | null,
  coverImageUrl: null as string | null,
  screenshots: [] as string[],
  techStack: p.techStack,
  isFeatured: p.isFeatured,
  isVisible: true,
  sortOrder: i,
  githubRepoId: null as number | null,
  overrideGithub: true,
}));

export const educationData = [
  {
    school: "Calicut University",
    degree: "Bachelor of Arts",
    major: "Sociology",
    startYear: "2021",
    endYear: "2023",
    result: "",
    sortOrder: 0,
  },
];

export const certificationsData = [
  {
    name: "Certified MERN Stack Developer",
    issuer: "Adacode Solutions",
    year: "2023",
    url: "",
    sortOrder: 0,
  },
];

export const freelanceData = [
  {
    project: "Freelance / Independent Development",
    role: "Freelance Frontend Engineer & Project Developer",
    duration: "Concurrent",
    highlights: [
      "Engineered production-ready commercial platforms, including a full-scale e-commerce system built completely on Bootstrap and SCSS for optimized responsive breakpoints.",
      "Integrated complex RESTful endpoints, maintained cross-browser pixel perfection via modular native CSS implementations, and set up independent deployment flows.",
    ],
    sortOrder: 0,
    isVisible: true,
  },
];

export const socialLinksData = [
  { name: "GitHub", url: "https://github.com/Shijastk", iconKey: "github", status: "social", sortOrder: 0, isVisible: true },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/shijas-tk/", iconKey: "linkedin", status: "social", sortOrder: 1, isVisible: true },
  { name: "Portfolio", url: "https://shijasresume2025.vercel.app/", iconKey: "portfolio", status: "social", sortOrder: 2, isVisible: true },
];

export const contactData = {
  email: "shijasmuhammed573@gmail.com",
  phone: "+91 8943435546",
  location: "Kerala, India",
};

export const seoData = [
  {
    pageKey: "home",
    title: "Shijas T K | Frontend Engineer",
    description:
      "Passionate Frontend Engineer crafting scalable SaaS platforms, enterprise UI systems and user-friendly web applications with React, Next.js & TypeScript.",
    ogImageUrl: null as string | null,
    keywords: ["Frontend Engineer", "React", "Next.js", "TypeScript", "Tailwind CSS", "Shijas T K"],
  },
  {
    pageKey: "about",
    title: "About | Shijas T K",
    description: "Learn more about my skills, experience and technical background.",
    ogImageUrl: null as string | null,
    keywords: ["About", "Frontend Engineer", "Shijas T K"],
  },
  {
    pageKey: "projects",
    title: "Projects | Shijas T K",
    description: "SaaS platforms, enterprise dashboards and high-traffic apps I've designed and built.",
    ogImageUrl: null as string | null,
    keywords: ["Projects", "SaaS", "React", "Next.js", "Shijas T K"],
  },
];

export const siteSettingsData = {
  footerText: null as string | null,
  builtWith: "Next.js, Supabase, Vercel",
  defaultTheme: "dark",
  worksLayout: "grid",
};
