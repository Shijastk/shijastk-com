"use client";

import { CrudManager } from "./CrudManager";
import type { FieldConfig } from "./EntityForm";
import {
  skillSchema,
  experienceSchema,
  freelanceSchema,
  educationSchema,
  certificationSchema,
  socialSchema,
} from "@/lib/validations";
import {
  saveSkill,
  deleteSkill,
  saveExperience,
  deleteExperience,
  saveFreelance,
  deleteFreelance,
  saveEducation,
  deleteEducation,
  saveCertification,
  deleteCertification,
  saveSocial,
  deleteSocial,
} from "@/lib/admin/actions";
import { ICON_KEYS } from "@/lib/icon-map";
import type {
  Skill,
  Experience,
  Freelance,
  Education,
  Certification,
  SocialLink,
} from "@/db/schema";

// ---- Skills ----
const skillFields: FieldConfig[] = [
  { name: "category", label: "Category", type: "text" },
  { name: "items", label: "Skills", type: "list" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];
export function SkillsManager({ items }: { items: Skill[] }) {
  return (
    <CrudManager
      items={items}
      schema={skillSchema}
      fields={skillFields}
      newDefaults={{ category: "", items: [], sortOrder: items.length } as never}
      saveAction={saveSkill}
      deleteAction={deleteSkill}
      renderSummary={(s) => (
        <>
          <p className="font-semibold">{s.category}</p>
          <p className="text-sm text-zinc-500">{s.items.join(", ")}</p>
        </>
      )}
    />
  );
}

// ---- Experience ----
const expFields: FieldConfig[] = [
  { name: "name", label: "Company", type: "text" },
  { name: "jobTitle", label: "Position", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "startDate", label: "Start date", type: "text", help: "ISO date, e.g. 2024-01-01" },
  { name: "endDate", label: "End date", type: "text", help: "Leave blank if current." },
  { name: "isCurrent", label: "Current role", type: "switch" },
  { name: "description", label: "Summary", type: "textarea" },
  { name: "highlights", label: "Highlights", type: "list" },
  { name: "url", label: "Company URL", type: "text" },
  { name: "sortOrder", label: "Sort order", type: "number" },
  { name: "isVisible", label: "Visible on site", type: "switch" },
];
export function ExperienceManager({ items }: { items: Experience[] }) {
  return (
    <CrudManager
      items={items}
      schema={experienceSchema}
      fields={expFields}
      newDefaults={{
        name: "", jobTitle: "", location: "", startDate: "", endDate: "",
        isCurrent: false, description: "", highlights: [], logo: null, url: "",
        sortOrder: items.length, isVisible: true,
      } as never}
      saveAction={saveExperience}
      deleteAction={deleteExperience}
      renderSummary={(e) => (
        <>
          <p className="font-semibold">
            {e.name} — <span className="font-normal">{e.jobTitle}</span>
          </p>
          <p className="text-sm text-zinc-500">
            {e.startDate} → {e.endDate || "Present"}
            {e.isVisible ? "" : " · hidden"}
          </p>
        </>
      )}
    />
  );
}

// ---- Freelance ----
const freelanceFields: FieldConfig[] = [
  { name: "project", label: "Project / engagement", type: "text" },
  { name: "role", label: "Role", type: "text" },
  { name: "duration", label: "Duration", type: "text" },
  { name: "highlights", label: "Highlights", type: "list" },
  { name: "sortOrder", label: "Sort order", type: "number" },
  { name: "isVisible", label: "Visible on site", type: "switch" },
];
export function FreelanceManager({ items }: { items: Freelance[] }) {
  return (
    <CrudManager
      items={items}
      schema={freelanceSchema}
      fields={freelanceFields}
      newDefaults={{ project: "", role: "", duration: "", highlights: [], sortOrder: items.length, isVisible: true } as never}
      saveAction={saveFreelance}
      deleteAction={deleteFreelance}
      renderSummary={(f) => (
        <>
          <p className="font-semibold">{f.role}</p>
          <p className="text-sm text-zinc-500">{f.duration}</p>
        </>
      )}
    />
  );
}

// ---- Education ----
const eduFields: FieldConfig[] = [
  { name: "school", label: "School", type: "text" },
  { name: "degree", label: "Degree", type: "text" },
  { name: "major", label: "Major", type: "text" },
  { name: "startYear", label: "Start year", type: "text" },
  { name: "endYear", label: "End year", type: "text" },
  { name: "result", label: "Result", type: "text" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];
export function EducationManager({ items }: { items: Education[] }) {
  return (
    <CrudManager
      items={items}
      schema={educationSchema}
      fields={eduFields}
      newDefaults={{ school: "", degree: "", major: "", startYear: "", endYear: "", result: "", sortOrder: items.length } as never}
      saveAction={saveEducation}
      deleteAction={deleteEducation}
      renderSummary={(e) => (
        <>
          <p className="font-semibold">{e.school}</p>
          <p className="text-sm text-zinc-500">{e.degree}{e.major ? `, ${e.major}` : ""} · {e.startYear}–{e.endYear}</p>
        </>
      )}
    />
  );
}

// ---- Certifications ----
const certFields: FieldConfig[] = [
  { name: "name", label: "Certification", type: "text" },
  { name: "issuer", label: "Issuer", type: "text" },
  { name: "year", label: "Year", type: "text" },
  { name: "url", label: "Credential URL", type: "text" },
  { name: "sortOrder", label: "Sort order", type: "number" },
];
export function CertificationsManager({ items }: { items: Certification[] }) {
  return (
    <CrudManager
      items={items}
      schema={certificationSchema}
      fields={certFields}
      newDefaults={{ name: "", issuer: "", year: "", url: "", sortOrder: items.length } as never}
      saveAction={saveCertification}
      deleteAction={deleteCertification}
      renderSummary={(c) => (
        <>
          <p className="font-semibold">{c.name}</p>
          <p className="text-sm text-zinc-500">{c.issuer} · {c.year}</p>
        </>
      )}
    />
  );
}

// ---- Social ----
const socialFields: FieldConfig[] = [
  { name: "name", label: "Name", type: "text" },
  { name: "url", label: "URL", type: "text" },
  { name: "iconKey", label: "Icon", type: "select", options: ICON_KEYS.map((k) => ({ value: k, label: k })) },
  {
    name: "status",
    label: "Group",
    type: "select",
    options: [
      { value: "social", label: "Social" },
      { value: "publication", label: "Publication" },
    ],
  },
  { name: "sortOrder", label: "Sort order", type: "number" },
  { name: "isVisible", label: "Visible on site", type: "switch" },
];
export function SocialManager({ items }: { items: SocialLink[] }) {
  return (
    <CrudManager
      items={items}
      schema={socialSchema}
      fields={socialFields}
      newDefaults={{ name: "", url: "", iconKey: "link", status: "social", sortOrder: items.length, isVisible: true } as never}
      saveAction={saveSocial}
      deleteAction={deleteSocial}
      renderSummary={(s) => (
        <>
          <p className="font-semibold">{s.name}</p>
          <p className="text-sm text-zinc-500 truncate">{s.url}</p>
        </>
      )}
    />
  );
}
