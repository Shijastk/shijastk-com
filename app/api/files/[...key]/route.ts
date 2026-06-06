import { getObjectResponse, isStorageConfigured } from "@/lib/storage";

/*
  Streams admin-uploaded objects from the (private) S3-compatible bucket.
  The browser only ever sees same-origin `/api/files/<key>` URLs; we sign the
  upstream GET here so the bucket never needs public read access. Keys are
  UUID-named, matching the public exposure of a public bucket without the cost.
*/

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  if (!isStorageConfigured) {
    return new Response("Storage is not configured.", { status: 503 });
  }

  const { key: segments } = await params;
  const key = segments.join("/");
  if (!key) return new Response("Not found.", { status: 404 });

  let upstream: Response;
  try {
    upstream = await getObjectResponse(key);
  } catch {
    return new Response("Upstream fetch failed.", { status: 502 });
  }

  if (upstream.status === 404) return new Response("Not found.", { status: 404 });
  if (!upstream.ok || !upstream.body) {
    return new Response("Upstream error.", { status: 502 });
  }

  const headers = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("content-length", contentLength);
  // Keys are immutable (UUID per upload) → cache aggressively.
  headers.set("cache-control", "public, max-age=31536000, immutable");

  return new Response(upstream.body, { status: 200, headers });
}
