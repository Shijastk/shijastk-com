import { ImageResponse } from "next/og";

// Branded favicon generated at build time. The "S" mark uses the site's
// primary brand green (--color-primary-color in globals.css) on zinc-900.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18181b",
          color: "#33e092",
          fontSize: 24,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        S
      </div>
    ),
    { ...size }
  );
}
