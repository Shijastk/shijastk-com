"use client";

import { useState, useTransition } from "react";
import { useForm, Controller, type DefaultValues, type FieldValues, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import StringListField from "./StringListField";
import ImageUploadField from "./ImageUploadField";
import ImageListField from "./ImageListField";
import FileUploadField from "./FileUploadField";

export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "markdown"
    | "list"
    | "switch"
    | "select"
    | "number"
    | "image"
    | "image-list"
    | "file";
  placeholder?: string;
  options?: { value: string; label: string }[];
  help?: string;
  /** For `file` uploads: storage folder and accepted MIME types. */
  folder?: string;
  accept?: string;
};

type ActionResult = { ok: true } | { ok: false; error: string };

export function EntityForm<T extends FieldValues>({
  schema,
  fields,
  defaultValues,
  action,
  submitLabel = "Save changes",
  onSuccess,
}: {
  schema: ZodType<T>;
  fields: FieldConfig[];
  defaultValues: DefaultValues<T>;
  action: (data: T) => Promise<ActionResult>;
  submitLabel?: string;
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const onSubmit = (data: T) =>
    start(async () => {
      setMsg(null);
      const res = await action(data);
      if (res.ok) {
        setMsg({ type: "ok", text: "Saved successfully." });
        onSuccess?.();
      } else {
        setMsg({ type: "err", text: res.error });
      }
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {fields.map((f) => {
        const name = f.name as Path<T>;
        const err = (errors as Record<string, { message?: string }>)[f.name];
        return (
          <div key={f.name}>
            {f.type !== "switch" ? <Label htmlFor={f.name}>{f.label}</Label> : null}

            {f.type === "text" || f.type === "number" ? (
              <Input
                id={f.name}
                type={f.type === "number" ? "number" : "text"}
                placeholder={f.placeholder}
                {...register(name, f.type === "number" ? { valueAsNumber: true } : {})}
              />
            ) : null}

            {f.type === "textarea" || f.type === "markdown" ? (
              <Textarea
                id={f.name}
                placeholder={f.placeholder}
                className={f.type === "markdown" ? "min-h-[180px] font-mono text-xs" : ""}
                {...register(name)}
              />
            ) : null}

            {f.type === "select" ? (
              <select
                id={f.name}
                className="w-full rounded-md border dark:border-zinc-700 border-zinc-300 dark:bg-zinc-900 bg-white px-3 py-2 text-sm"
                {...register(name)}
              >
                {f.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : null}

            {f.type === "list" ? (
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <StringListField
                    value={(field.value as string[]) ?? []}
                    onChange={field.onChange}
                    placeholder={f.placeholder}
                  />
                )}
              />
            ) : null}

            {f.type === "image" ? (
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <ImageUploadField
                    value={field.value as string | null}
                    onChange={field.onChange}
                    folder={f.folder}
                  />
                )}
              />
            ) : null}

            {f.type === "image-list" ? (
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <ImageListField
                    value={(field.value as string[]) ?? []}
                    onChange={field.onChange}
                  />
                )}
              />
            ) : null}

            {f.type === "file" ? (
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <FileUploadField
                    value={field.value as string | null}
                    onChange={field.onChange}
                    folder={f.folder}
                    accept={f.accept}
                  />
                )}
              />
            ) : null}

            {f.type === "switch" ? (
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <Switch checked={Boolean(field.value)} onChange={field.onChange} id={f.name} />
                    <Label htmlFor={f.name} className="mb-0">
                      {f.label}
                    </Label>
                  </div>
                )}
              />
            ) : null}

            {f.help ? <p className="text-xs text-zinc-500 mt-1">{f.help}</p> : null}
            {err?.message ? <p className="text-xs text-red-500 mt-1">{err.message}</p> : null}
          </div>
        );
      })}

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Saving…" : submitLabel}
        </Button>
        {msg ? (
          <span className={msg.type === "ok" ? "text-sm text-primary-color" : "text-sm text-red-500"}>
            {msg.text}
          </span>
        ) : null}
      </div>
    </form>
  );
}
