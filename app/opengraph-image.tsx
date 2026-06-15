import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

// Default social-share card for every route (Open Graph + Twitter). Generated
// at build time so there's no static asset to keep in sync. Brand: zinc-900
// background with the primary green accent used across the site.
export const alt = `${siteConfig.name} — Frontend Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#18181b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#33e092",
            fontSize: 28,
            fontWeight: 700,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#33e092",
              color: "#18181b",
              borderRadius: 12,
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            S
          </div>
          shijastk.in
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 600,
            color: "#33e092",
            marginTop: 8,
          }}
        >
          Frontend Developer
        </div>
        <div
          style={{
            fontSize: 26,
            color: "#a1a1aa",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size }
  );
}
