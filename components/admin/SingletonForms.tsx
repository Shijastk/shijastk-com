"use client";

import { EntityForm, type FieldConfig } from "./EntityForm";
import {
  heroSchema,
  aboutSchema,
  contactSchema,
  settingsSchema,
  seoSchema,
} from "@/lib/validations";
import {
  updateHero,
  updateAbout,
  updateContact,
  updateSettings,
  upsertSeo,
} from "@/lib/admin/actions";
import type {
  Hero,
  About,
  ContactInfo,
  SiteSettings,
  SeoMetadata,
} from "@/db/schema";

const heroFields: FieldConfig[] = [
  { name: "fullName", label: "Full name", type: "text" },
  { name: "headline", label: "Headline", type: "textarea", help: "The big hero line on the homepage." },
  { name: "shortBio", label: "Short bio", type: "textarea" },
  { name: "location", label: "Location", type: "text" },
  { name: "avatarUrl", label: "Avatar", type: "image", help: "Upload your own, or leave blank to use your GitHub avatar." },
];

export function HeroForm({ initial }: { initial: Hero }) {
  return (
    <EntityForm schema={heroSchema} fields={heroFields} defaultValues={initial as never} action={updateHero} />
  );
}

const aboutFields: FieldConfig[] = [
  { name: "fullBioMd", label: "Full bio (Markdown)", type: "markdown" },
  { name: "currentlyHackingMd", label: "Currently hacking on (Markdown)", type: "markdown" },
  {
    name: "resumeUrl",
    label: "Résumé",
    type: "file",
    folder: "resume",
    accept: "application/pdf",
    help: "Upload your résumé (PDF). The “View Résumé” button on the About page links to this file.",
  },
  { name: "profileImageUrl", label: "Profile image", type: "image", help: "Your photo on the About page. Upload one to replace the GitHub avatar." },
];

export function AboutForm({ initial }: { initial: About }) {
  return (
    <EntityForm schema={aboutSchema} fields={aboutFields} defaultValues={initial as never} action={updateAbout} />
  );
}

const contactFields: FieldConfig[] = [
  { name: "email", label: "Email", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "location", label: "Location", type: "text" },
];

export function ContactForm({ initial }: { initial: ContactInfo }) {
  return (
    <EntityForm schema={contactSchema} fields={contactFields} defaultValues={initial as never} action={updateContact} />
  );
}

const settingsFields: FieldConfig[] = [
  { name: "builtWith", label: "Built with (comma-separated)", type: "text" },
  { name: "footerText", label: "Footer text (optional)", type: "text" },
  {
    name: "defaultTheme",
    label: "Default theme",
    type: "select",
    options: [
      { value: "dark", label: "Dark" },
      { value: "light", label: "Light" },
      { value: "system", label: "System" },
    ],
  },
  {
    name: "worksLayout",
    label: "Works layout",
    type: "select",
    help: "How the Projects page lists your works: alternating showcase rows, or image-top cards.",
    options: [
      { value: "grid", label: "Grid — image-top cards" },
      { value: "row", label: "Rows — alternating showcase" },
    ],
  },
];

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  return (
    <EntityForm schema={settingsSchema} fields={settingsFields} defaultValues={initial as never} action={updateSettings} />
  );
}

const seoFields: FieldConfig[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "textarea" },
  { name: "keywords", label: "Keywords", type: "list" },
  { name: "ogImageUrl", label: "OG image URL", type: "text" },
];

export function SeoForm({ initial }: { initial: SeoMetadata }) {
  return (
    <div>
      <h3 className="font-semibold mb-3 capitalize">{initial.pageKey} page</h3>
      <EntityForm schema={seoSchema} fields={seoFields} defaultValues={initial as never} action={upsertSeo} />
    </div>
  );
}
