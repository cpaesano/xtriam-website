import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Palm City Iron Works — Implementation Proposal by xTriam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #002246 0%, #01396b 50%, #002246 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          padding: "60px",
        }}
      >
        {/* Top label */}
        <div
          style={{
            color: "#ff9f00",
            fontSize: 20,
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: 30,
          }}
        >
          Implementation Proposal
        </div>

        {/* Client name */}
        <div
          style={{
            color: "#ffffff",
            fontSize: 64,
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          Palm City Iron Works
        </div>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: 20,
          }}
        >
          <div style={{ width: 60, height: 1, background: "rgba(2,126,218,0.5)" }} />
          <div style={{ color: "rgba(2,126,218,0.8)", fontSize: 16, letterSpacing: "4px", textTransform: "uppercase" }}>
            Presented by
          </div>
          <div style={{ width: 60, height: 1, background: "rgba(2,126,218,0.5)" }} />
        </div>

        {/* xTriam */}
        <div
          style={{
            color: "#027eda",
            fontSize: 36,
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          x<span style={{ color: "#ff9f00" }}>Triam</span>
        </div>

        {/* Tagline */}
        <div
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: 18,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          A platform customized around how your business actually works
        </div>
      </div>
    ),
    { ...size }
  );
}
