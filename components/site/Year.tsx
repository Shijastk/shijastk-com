"use client";

/** Renders the current year on the client so it doesn't make server components dynamic. */
export default function Year() {
  return <>{new Date().getFullYear()}</>;
}
