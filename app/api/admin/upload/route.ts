import { NextResponse } from "next/server";
import { isAdmin } from "@/features/auth/guard";
import {
  isStorageConfigured,
  uploadObject,
  deleteObject,
} from "@/lib/storage";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const EXT: Record<string, string> = {
  // images
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  // documents (e.g. résumé)
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
};
const ALLOWED = Object.keys(EXT);

/** POST a multipart form with a `file` field → uploads to B2, returns `{ url }`. */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!isStorageConfigured) {
    return NextResponse.json(
      { error: "Storage is not configured. Add the R2_* keys to .env.local." },
      { status: 503 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Use an image (PNG/JPEG/WebP/GIF/SVG) or a document (PDF/DOC/DOCX)." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File is larger than 8 MB." }, { status: 400 });
  }

  const folder = typeof form.get("folder") === "string" ? String(form.get("folder")) : "projects";
  const key = `${folder}/${crypto.randomUUID()}.${EXT[file.type]}`;

  try {
    const url = await uploadObject(key, await file.arrayBuffer(), file.type);
    return NextResponse.json({ url });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed." },
      { status: 502 }
    );
  }
}

/** DELETE `?url=<publicUrl>` → removes the object from storage. */
export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(request.url).searchParams.get("url");
  if (!url) return NextResponse.json({ error: "No url provided." }, { status: 400 });
  await deleteObject(url);
  return NextResponse.json({ ok: true });
}
