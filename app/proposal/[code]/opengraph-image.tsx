import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "Palm City Ironworks — Implementation Proposal by xTriam";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const palmCityLogo = await readFile(
    join(process.cwd(), "public/images/logo/palm-city-ironworks-logo-white.png")
  );
  const palmCityBase64 = `data:image/png;base64,${palmCityLogo.toString("base64")}`;

  const xtriamLogo = await readFile(
    join(process.cwd(), "public/images/logo/xTriam-Logo-Outlines-White-Orange.png")
  );
  const xtriamBase64 = `data:image/png;base64,${xtriamLogo.toString("base64")}`;

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

        {/* Palm City logo */}
        <img
          src={palmCityBase64}
          alt="Palm City Ironworks"
          height={120}
          style={{ marginBottom: 30 }}
        />

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: 24,
          }}
        >
          <div style={{ width: 60, height: 1, background: "rgba(2,126,218,0.5)" }} />
          <div style={{ color: "rgba(2,126,218,0.8)", fontSize: 16, letterSpacing: "4px", textTransform: "uppercase" }}>
            Presented by
          </div>
          <div style={{ width: 60, height: 1, background: "rgba(2,126,218,0.5)" }} />
        </div>

        {/* xTriam logo */}
        <img
          src={xtriamBase64}
          alt="xTriam"
          height={40}
          style={{ marginBottom: 24 }}
        />

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
