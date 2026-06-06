/**
 * Fully-typed fallback rows derived from seed-data, used by public queries when
 * the database isn't configured. Adds synthetic ids + null timestamps so the
 * objects satisfy the Drizzle `$inferSelect` row types.
 */
import type {
  Hero,
  About,
  Skill,
  Experience,
  Freelance,
  Education,
  Certification,
  Project,
  SocialLink,
  ContactInfo,
  SeoMetadata,
  SiteSettings,
} from "./schema";
import {
  heroData,
  aboutData,
  skillsData,
  experiencesData,
  freelanceData,
  educationData,
  certificationsData,
  projectsData,
  socialLinksData,
  contactData,
  seoData,
  siteSettingsData,
} from "./seed-data";

export const fallbackHero: Hero = { id: 1, ...heroData, updatedAt: null };

export const fallbackAbout: About = { id: 1, ...aboutData, updatedAt: null };

export const fallbackSkills: Skill[] = skillsData.map((s, i) => ({
  id: i + 1,
  ...s,
}));

export const fallbackExperiences: Experience[] = experiencesData.map((e, i) => ({
  id: i + 1,
  ...e,
}));

export const fallbackFreelance: Freelance[] = freelanceData.map((f, i) => ({
  id: i + 1,
  ...f,
}));

export const fallbackEducation: Education[] = educationData.map((e, i) => ({
  id: i + 1,
  ...e,
}));

export const fallbackCertifications: Certification[] = certificationsData.map(
  (c, i) => ({ id: i + 1, ...c })
);

export const fallbackProjects: Project[] = projectsData.map((p, i) => ({
  id: i + 1,
  ...p,
  createdAt: null,
  updatedAt: null,
}));

export const fallbackSocialLinks: SocialLink[] = socialLinksData.map((s, i) => ({
  id: i + 1,
  ...s,
}));

export const fallbackContact: ContactInfo = {
  id: 1,
  ...contactData,
  updatedAt: null,
};

export const fallbackSeo: SeoMetadata[] = seoData.map((s, i) => ({
  id: i + 1,
  ...s,
}));

export const fallbackSiteSettings: SiteSettings = {
  id: 1,
  ...siteSettingsData,
  updatedAt: null,
};
