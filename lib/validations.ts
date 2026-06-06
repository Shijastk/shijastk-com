import { z } from "zod";

/** Shared Zod schemas — used by admin forms (RHF resolver) and server actions. */

const str = z.string();
const optStr = z.string().optional().default("");
const strArray = z.array(z.string());

export const heroSchema = z.object({
  fullName: str.min(1, "Required"),
  headline: str.min(1, "Required"),
  shortBio: str.min(1, "Required"),
  location: optStr,
  avatarUrl: z.string().nullable().default(null),
});

export const aboutSchema = z.object({
  fullBioMd: str.min(1, "Required"),
  currentlyHackingMd: optStr,
  resumeUrl: z.string().nullable().default(null),
  profileImageUrl: z.string().nullable().default(null),
});

export const skillSchema = z.object({
  id: z.number().optional(),
  category: str.min(1, "Required"),
  items: strArray,
  sortOrder: z.number().default(0),
});

export const experienceSchema = z.object({
  id: z.number().optional(),
  name: str.min(1, "Required"),
  jobTitle: str.min(1, "Required"),
  location: optStr,
  startDate: str.min(1, "Required"),
  endDate: z.string().nullable().default(null),
  isCurrent: z.boolean().default(false),
  description: optStr,
  highlights: strArray,
  logo: z.string().nullable().default(null),
  url: optStr,
  sortOrder: z.number().default(0),
  isVisible: z.boolean().default(true),
});

export const freelanceSchema = z.object({
  id: z.number().optional(),
  project: str.min(1, "Required"),
  role: str.min(1, "Required"),
  duration: optStr,
  highlights: strArray,
  sortOrder: z.number().default(0),
  isVisible: z.boolean().default(true),
});

export const educationSchema = z.object({
  id: z.number().optional(),
  school: str.min(1, "Required"),
  degree: str.min(1, "Required"),
  major: optStr,
  startYear: optStr,
  endYear: optStr,
  result: optStr,
  sortOrder: z.number().default(0),
});

export const certificationSchema = z.object({
  id: z.number().optional(),
  name: str.min(1, "Required"),
  issuer: str.min(1, "Required"),
  year: optStr,
  url: optStr,
  sortOrder: z.number().default(0),
});

export const projectSchema = z.object({
  id: z.number().optional(),
  name: str.min(1, "Required"),
  slug: str.min(1, "Required").regex(/^[a-z0-9-]+$/, "Lowercase, dashes only"),
  tagline: optStr,
  descriptionMd: optStr,
  caseStudyMd: optStr,
  projectUrl: optStr,
  projectUrlLabel: optStr,
  repository: optStr,
  logo: z.string().nullable().default(null),
  coverImageUrl: z.string().nullable().default(null),
  screenshots: strArray,
  techStack: strArray,
  isFeatured: z.boolean().default(false),
  isVisible: z.boolean().default(true),
  sortOrder: z.number().default(0),
  githubRepoId: z.number().nullable().default(null),
  overrideGithub: z.boolean().default(true),
});

export const socialSchema = z.object({
  id: z.number().optional(),
  name: str.min(1, "Required"),
  url: str.min(1, "Required"),
  iconKey: str.min(1, "Required"),
  status: z.string().default("social"),
  sortOrder: z.number().default(0),
  isVisible: z.boolean().default(true),
});

export const contactSchema = z.object({
  email: optStr,
  phone: optStr,
  location: optStr,
});

export const seoSchema = z.object({
  pageKey: z.enum(["home", "about", "projects"]),
  title: str.min(1, "Required"),
  description: str.min(1, "Required"),
  ogImageUrl: z.string().nullable().default(null),
  keywords: strArray,
});

export const settingsSchema = z.object({
  footerText: z.string().nullable().default(null),
  builtWith: optStr,
  defaultTheme: z.enum(["dark", "light", "system"]).default("dark"),
  worksLayout: z.enum(["row", "grid"]).default("grid"),
});

export type HeroInput = z.infer<typeof heroSchema>;
export type AboutInput = z.infer<typeof aboutSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type FreelanceInput = z.infer<typeof freelanceSchema>;
export type EducationInput = z.infer<typeof educationSchema>;
export type CertificationInput = z.infer<typeof certificationSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type SocialInput = z.infer<typeof socialSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type SeoInput = z.infer<typeof seoSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
