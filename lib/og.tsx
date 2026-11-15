import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function ogImage(title: string, kicker: string, sub?: string) {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#fff", padding: 72, color: "#0f172a" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#047857" }}>
          <div style={{ width: 14, height: 14, borderRadius: 14, background: "#059669" }} />
          {kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: title.length > 28 ? 84 : 112, lineHeight: 1.05, letterSpacing: -2, fontFamily: "Georgia, serif" }}>{title}</div>
          {sub && <div style={{ marginTop: 28, fontSize: 34, color: "#475569", lineHeight: 1.3, maxWidth: 940 }}>{sub}</div>}
        </div>
        <div style={{ fontSize: 26, color: "#64748b" }}>Heeral Mandolia · Applied AI Engineer</div>
      </div>
    ),
    ogSize,
  );
}
