"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ZodType } from "zod";
import type { DefaultValues, FieldValues } from "react-hook-form";
import { EntityForm, type FieldConfig } from "./EntityForm";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";

type ActionResult = { ok: true } | { ok: false; error: string };

export function CrudManager<T extends FieldValues & { id?: number }>({
  items,
  fields,
  schema,
  newDefaults,
  saveAction,
  deleteAction,
  renderSummary,
  addLabel = "Add new",
}: {
  items: T[];
  fields: FieldConfig[];
  schema: ZodType<T>;
  newDefaults: DefaultValues<T>;
  saveAction: (data: T) => Promise<ActionResult>;
  deleteAction: (id: number) => Promise<ActionResult>;
  renderSummary: (item: T) => React.ReactNode;
  addLabel?: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [pending, start] = useTransition();

  const done = () => {
    setEditing(null);
    router.refresh();
  };

  const remove = (id: number) =>
    start(async () => {
      if (!confirm("Delete this item? This cannot be undone.")) return;
      const res = await deleteAction(id);
      if (res.ok) router.refresh();
      else alert(res.error);
    });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        {editing !== "new" ? (
          <Button onClick={() => setEditing("new")}>+ {addLabel}</Button>
        ) : null}
      </div>

      {editing === "new" ? (
        <Card>
          <CardBody>
            <h3 className="font-semibold mb-4">New entry</h3>
            <EntityForm
              schema={schema}
              fields={fields}
              defaultValues={newDefaults}
              action={saveAction}
              submitLabel="Create"
              onSuccess={done}
            />
            <button
              onClick={() => setEditing(null)}
              className="text-sm text-zinc-500 hover:text-zinc-300 mt-3"
            >
              Cancel
            </button>
          </CardBody>
        </Card>
      ) : null}

      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id}>
            <Card>
              <CardBody>
                {editing === item.id ? (
                  <>
                    <EntityForm
                      schema={schema}
                      fields={fields}
                      defaultValues={item as DefaultValues<T>}
                      action={saveAction}
                      onSuccess={done}
                    />
                    <button
                      onClick={() => setEditing(null)}
                      className="text-sm text-zinc-500 hover:text-zinc-300 mt-3"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">{renderSummary(item)}</div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button size="sm" variant="secondary" onClick={() => setEditing(item.id!)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        disabled={pending}
                        onClick={() => remove(item.id!)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
