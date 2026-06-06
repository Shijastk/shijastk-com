import { AwsClient } from "aws4fetch";

/*
  S3-compatible object storage (Backblaze B2 / Cloudflare R2).
  Used for admin-uploaded project images (logos, cover thumbnails, screenshots).

  All five R2_* env vars must be present for uploads to work. When they're
  missing, `isStorageConfigured` is false and the upload route returns 503 so
  the rest of the app keeps working with plain image URLs.

  The bucket can stay PRIVATE. We never hand the browser a direct B2 URL —
  stored references are same-origin `/api/files/<key>` paths that the
  `app/api/files/[...key]` route streams back after signing the GET with our
  credentials (see `getObjectResponse`). Keys are unguessable UUIDs, so this
  exposes only the assets the site links to, without a paid public bucket.
*/

/** Same-origin prefix under which stored objects are served (see the proxy route). */
export const STORAGE_PUBLIC_PREFIX = "/api/files/";

const endpoint = process.env.R2_ENDPOINT?.replace(/\/$/, "");
const region = process.env.R2_REGION;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET;

export const isStorageConfigured = Boolean(
  endpoint && region && accessKeyId && secretAccessKey && bucket
);

const client =
  isStorageConfigured && accessKeyId && secretAccessKey
    ? new AwsClient({ accessKeyId, secretAccessKey, region, service: "s3" })
    : null;

/** Same-origin URL our proxy route serves for a stored object key. */
export function publicUrlFor(key: string): string {
  return `${STORAGE_PUBLIC_PREFIX}${encodeURI(key)}`;
}

/**
 * Recover the object key from a reference we previously stored, or null.
 * Handles the current `/api/files/<key>` form and the legacy direct
 * `${endpoint}/${bucket}/<key>` B2 URLs from before the proxy existed.
 */
export function keyFromPublicUrl(url: string): string | null {
  if (url.startsWith(STORAGE_PUBLIC_PREFIX)) {
    return decodeURI(url.slice(STORAGE_PUBLIC_PREFIX.length));
  }
  const legacy = `${endpoint}/${bucket}/`;
  if (url.startsWith(legacy)) return decodeURI(url.slice(legacy.length));
  return null;
}

/** Fetch an object from storage with a signed GET. Caller streams the response. */
export async function getObjectResponse(key: string): Promise<Response> {
  if (!client) throw new Error("Storage is not configured.");
  return client.fetch(`${endpoint}/${bucket}/${encodeURI(key)}`, { method: "GET" });
}

/** Upload bytes and return the public URL. Throws on a non-2xx response. */
export async function uploadObject(
  key: string,
  body: ArrayBuffer | Uint8Array,
  contentType: string
): Promise<string> {
  if (!client) throw new Error("Storage is not configured.");
  const buffer = Buffer.from(body instanceof Uint8Array ? body : new Uint8Array(body));
  const res = await client.fetch(`${endpoint}/${bucket}/${encodeURI(key)}`, {
    method: "PUT",
    body: buffer,
    headers: {
      "content-type": contentType,
      "content-length": String(buffer.length),
    },
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Upload failed (${res.status}). ${detail}`.trim());
  }
  return publicUrlFor(key);
}

/** Delete a stored object. Silently ignores URLs we don't own. */
export async function deleteObject(url: string): Promise<void> {
  if (!client) return;
  const key = keyFromPublicUrl(url);
  if (!key) return;
  await client.fetch(`${endpoint}/${bucket}/${encodeURI(key)}`, { method: "DELETE" });
}
