import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "NexaFlow AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const headline =
    locale === "es"
      ? "Potencia tu negocio con Inteligencia Artificial"
      : "Supercharge your business with Artificial Intelligence";

  const subtitle =
    locale === "es"
      ? "Automatizacion | Chatbots IA | CRM Inteligente | Marketing AI"
      : "Automation | AI Chatbots | Smart CRM | AI Marketing";

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
          padding: "60px",
        }}
      >
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

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#2563eb",
              color: "white",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            N
          </div>
          <span style={{ color: "#f8fafc", fontSize: "32px", fontWeight: 700 }}>
            Nexa
          </span>
          <span style={{ color: "#2563eb", fontSize: "32px", fontWeight: 700 }}>
            Flow
          </span>
          <span style={{ color: "#64748b", fontSize: "18px", marginLeft: "4px" }}>
            AI
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#f8fafc",
            textAlign: "center",
            maxWidth: "900px",
            lineHeight: 1.2,
          }}
        >
          {headline}
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: "24px",
            fontSize: "22px",
            color: "#94a3b8",
            textAlign: "center",
          }}
        >
          {subtitle}
        </div>

        {/* Gradient line */}
        <div
          style={{
            marginTop: "40px",
            width: "160px",
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
