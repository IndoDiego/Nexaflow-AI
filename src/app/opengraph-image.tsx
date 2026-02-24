import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NexaFlow AI - Intelligent Automation for Your Business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a1a 0%, #111127 50%, #1a1a3e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.15)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "-50px",
            width: "300px",
            height: "300px",
            borderRadius: "50%",
            background: "rgba(0, 229, 153, 0.1)",
            filter: "blur(60px)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#2563eb",
              color: "white",
              fontSize: "32px",
              fontWeight: 800,
            }}
          >
            N
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span style={{ color: "#f8fafc", fontSize: "48px", fontWeight: 700 }}>
              Nexa
            </span>
            <span style={{ color: "#2563eb", fontSize: "48px", fontWeight: 700 }}>
              Flow
            </span>
            <span
              style={{
                color: "#64748b",
                fontSize: "24px",
                fontWeight: 400,
                marginLeft: "8px",
              }}
            >
              AI
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#cbd5e1",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          Intelligent Automation for Your Business
        </div>

        {/* Accent line */}
        <div
          style={{
            marginTop: "32px",
            width: "120px",
            height: "4px",
            borderRadius: "2px",
            background: "linear-gradient(90deg, #2563eb, #00e599)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
