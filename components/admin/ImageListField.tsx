"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { uploadFile } from "./ImageUploadField";

export default function ImageListField({
  value,
  onChange,
  folder = "projects",
}: {
  value: string[] | null | undefined;
  onChange: (urls: string[]) => void;
  folder?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const urls = value ?? [];

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setBusy(true);
    try {
      const uploaded = await Promise.all(Array.from(files).map((f) => uploadFile(f, folder)));
      onChange([...urls, ...uploaded]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeAt = (index: number) => onChange(urls.filter((_, i) => i !== index));

  return (
    <div className="space-y-2">
      {urls.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {urls.map((url, i) => (
            <div key={`${url}-${i}`} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`screenshot ${i + 1}`}
                className="h-20 w-28 rounded-md object-cover border dark:border-zinc-700 border-zinc-200 dark:bg-zinc-800 bg-zinc-100"
              />
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove image"
                className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-red-600 text-xs text-white hover:bg-red-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={busy}
        onClick={() => inputRef.current?.click()}
      >
        {busy ? "Uploading…" : "Add images"}
      </Button>

      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
