"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadFile } from "./ImageUploadField";

/** Last path segment of a URL, for display. */
function fileName(url: string): string {
  try {
    return decodeURIComponent(url.split("?")[0].split("/").pop() || url);
  } catch {
    return url;
  }
}

export default function FileUploadField({
  value,
  onChange,
  folder = "files",
  accept = "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}: {
  value: string | null | undefined;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      onChange(await uploadFile(file, folder));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        {value ? (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="max-w-[16rem] truncate rounded-md border dark:border-zinc-700 border-zinc-200 dark:bg-zinc-800 bg-zinc-100 px-3 py-1.5 text-sm hover:underline"
            title={value}
          >
            📄 {fileName(value)}
          </a>
        ) : (
          <span className="text-sm text-zinc-500">No file uploaded.</span>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        <Button
          type="button"
          size="sm"
          variant="secondary"
          disabled={busy}
          onClick={() => inputRef.current?.click()}
        >
          {busy ? "Uploading…" : value ? "Replace" : "Upload file"}
        </Button>
        {value ? (
          <Button type="button" size="sm" variant="ghost" onClick={() => onChange("")}>
            Clear
          </Button>
        ) : null}
      </div>

      <Input
        type="text"
        placeholder="…or paste a file URL"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />

      {error ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
