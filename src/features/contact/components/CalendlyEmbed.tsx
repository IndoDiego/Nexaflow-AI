"use client";

import { useEffect } from "react";

interface CalendlyEmbedProps {
  url?: string;
}

export function CalendlyEmbed({
  url = "https://calendly.com/your-nexaflow-url",
}: CalendlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget rounded-xl overflow-hidden"
      data-url={url}
      style={{ minWidth: "320px", height: "630px" }}
    />
  );
}
