interface SectionTitleProps {
  label?: string;
  heading: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  light?: boolean; // for dark backgrounds
  className?: string;
}

export default function SectionTitle({
  label,
  heading,
  subtitle,
  align = "left",
  light = false,
  className = "",
}: SectionTitleProps) {
  const textAlign =
    align === "center"
      ? "text-center"
      : align === "right"
      ? "text-right"
      : "text-left";

  const alignItems =
    align === "center"
      ? "items-center"
      : align === "right"
      ? "items-end"
      : "items-start";

  return (
    <div className={`flex flex-col ${alignItems} ${className}`}>
      {label && (
        <div className={`flex items-center gap-4 mb-4 ${align === "center" ? "justify-center" : ""}`}>
          {align !== "right" && (
            <div
              style={{
                width: "30px",
                height: "1px",
                background: light ? "rgba(138,155,168,0.5)" : "rgba(10,22,40,0.25)",
                flexShrink: 0,
              }}
            />
          )}
          <span
            style={{
              fontFamily: "var(--font-barlow-condensed), sans-serif",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: light ? "#8A9BA8" : "rgba(10,22,40,0.55)",
            }}
          >
            {label}
          </span>
          {align === "right" && (
            <div
              style={{
                width: "30px",
                height: "1px",
                background: light ? "rgba(138,155,168,0.5)" : "rgba(10,22,40,0.25)",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      )}

      <h2
        className={`${textAlign} leading-none`}
        style={{
          fontFamily: "var(--font-barlow-condensed), sans-serif",
          fontWeight: 800,
          fontSize: "clamp(36px, 5vw, 68px)",
          color: light ? "#F5F0EB" : "#2C2C2C",
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
        }}
        dangerouslySetInnerHTML={{ __html: heading }}
      />

      {subtitle && (
        <p
          className={`mt-4 max-w-xl ${textAlign}`}
          style={{
            fontFamily: "var(--font-cormorant-garamond), serif",
            fontStyle: "italic",
            fontSize: "clamp(16px, 1.8vw, 20px)",
            fontWeight: 300,
            color: light ? "rgba(245,240,235,0.65)" : "rgba(44,44,44,0.6)",
            lineHeight: "1.65",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
