"use client";

import { useState, useTransition, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  reorderProjects,
  setProjectFlag,
  deleteProject,
} from "@/lib/admin/actions";
import type { Project } from "@/db/schema";

function Row({
  project,
  onToggle,
  onDelete,
}: {
  project: Project;
  onToggle: (field: "isVisible" | "isFeatured", value: boolean) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: project.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
    >
      <Card>
        <CardBody className="flex items-center gap-4">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab text-zinc-500 hover:text-zinc-300 px-1"
            aria-label="Drag to reorder"
          >
            ⠿
          </button>

          {project.logo ?? project.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={(project.logo ?? project.coverImageUrl) as string}
              alt=""
              className="h-10 w-10 shrink-0 rounded-md object-cover border dark:border-zinc-700 border-zinc-200 dark:bg-zinc-800 bg-zinc-100"
            />
          ) : (
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md dark:bg-zinc-800 bg-zinc-100 font-semibold dark:text-primary-color text-tertiary-color">
              {project.name.charAt(0)}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="font-semibold truncate">{project.name}</p>
            <p className="text-sm text-zinc-500 truncate">{project.tagline}</p>
          </div>

          <label className="flex items-center gap-2 text-xs text-zinc-500">
            Visible
            <Switch checked={project.isVisible} onChange={(v) => onToggle("isVisible", v)} />
          </label>
          <label className="flex items-center gap-2 text-xs text-zinc-500">
            Featured
            <Switch checked={project.isFeatured} onChange={(v) => onToggle("isFeatured", v)} />
          </label>

          <Button size="sm" variant="secondary" asChild>
            <Link href={`/admin/projects/${project.id}`}>Edit</Link>
          </Button>
          <Button size="sm" variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

export default function ProjectsManager({ items }: { items: Project[] }) {
  const router = useRouter();
  const [list, setList] = useState(items);
  const [, start] = useTransition();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  useEffect(() => setList(items), [items]);

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIndex = list.findIndex((p) => p.id === active.id);
    const newIndex = list.findIndex((p) => p.id === over.id);
    const next = arrayMove(list, oldIndex, newIndex);
    setList(next);
    start(async () => {
      await reorderProjects(next.map((p) => p.id));
    });
  };

  const toggle = (id: number, field: "isVisible" | "isFeatured", value: boolean) => {
    setList((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
    start(async () => {
      await setProjectFlag(id, field, value);
    });
  };

  const remove = (id: number) =>
    start(async () => {
      if (!confirm("Delete this project?")) return;
      const res = await deleteProject(id);
      if (res.ok) {
        setList((prev) => prev.filter((p) => p.id !== id));
        router.refresh();
      } else {
        alert(res.error);
      }
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-zinc-500">Drag to reorder. Toggles save instantly.</p>
        <Button asChild>
          <Link href="/admin/projects/new">+ New project</Link>
        </Button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={list.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {list.map((p) => (
              <Row
                key={p.id}
                project={p}
                onToggle={(field, value) => toggle(p.id, field, value)}
                onDelete={() => remove(p.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
