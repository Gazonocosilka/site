"use client";

/**
 * BEEXTRART home-card preview. Just the logo on a clean light background —
 * what a logo deserves on a portfolio card.
 */
export default function BeextrartPreview() {
  return (
    <div className="absolute inset-0 z-[2] overflow-hidden">
      {/* Warm-bone background so the black logo reads */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, #ffffff 0%, #f6efef 60%, #ecdfe2 100%)",
        }}
      />

      {/* Logo, contained with generous padding */}
      <img
        src="/bee-shots/bee-logo.jpg"
        alt="BEEXTRART — logo"
        className="absolute inset-0 h-full w-full"
        style={{
          objectFit: "contain",
          padding: "10%",
          mixBlendMode: "multiply",
        }}
      />

      {/* Brand tag — top left */}
      <div className="absolute left-5 top-5 flex items-center gap-2 md:left-7 md:top-6">
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full"
          style={{
            background: "#3a1226",
            boxShadow: "0 0 8px rgba(58,18,38,0.4)",
          }}
        />
        <span
          className="mono"
          style={{ fontSize: 11, color: "#3a1226" }}
        >
          BEEXTRART · eyelashes
        </span>
      </div>

      {/* Client chip — top right */}
      <div
        className="absolute right-5 top-5 rounded-full px-3 py-1 md:right-7 md:top-6"
        style={{
          background: "rgba(58,18,38,0.10)",
          border: "1px solid rgba(58,18,38,0.18)",
          color: "#3a1226",
          fontSize: 10,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        Client · Beauty
      </div>

      {/* Meta — bottom row */}
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between md:inset-x-7 md:bottom-5">
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(13px, 1.4cqi, 18px)",
            letterSpacing: "-0.01em",
            lineHeight: 1,
            color: "#1a1a1a",
          }}
        >
          Identity system
        </span>
        <span
          className="mono"
          style={{ fontSize: 10, color: "#3a1226", opacity: 0.7 }}
        >
          Logo · Packaging · Print
        </span>
      </div>
    </div>
  );
}
