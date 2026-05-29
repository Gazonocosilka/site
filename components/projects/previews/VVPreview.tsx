"use client";

/**
 * Typographic preview that fills the V&V card's 16:9 slot until a real
 * screenshot is dropped in. Built to read as the V&V brand: monochrome,
 * editorial, Ukrainian-rooted, London-based.
 */
export default function VVPreview() {
  return (
    <div
      className="absolute inset-0 z-[2] flex flex-col justify-between overflow-hidden p-6 md:p-10"
      style={{
        background:
          "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(245,245,243,0.10), transparent 70%), linear-gradient(135deg, #0c0c10 0%, #06070a 60%, #0a0a0d 100%)",
      }}
    >
      {/* Top row: brand tag + lookbook season */}
      <div className="flex items-start justify-between">
        <div>
          <div className="mono opacity-60" style={{ fontSize: 10 }}>
            Vyrobleno · Ukrainian Boutique
          </div>
          <div className="mono mt-1.5 opacity-50" style={{ fontSize: 10 }}>
            London · Est. 2024
          </div>
        </div>
        <div className="text-right">
          <div className="mono opacity-60" style={{ fontSize: 10 }}>
            Lookbook 02
          </div>
          <div className="mono mt-1.5 opacity-50" style={{ fontSize: 10 }}>
            Spring · 26
          </div>
        </div>
      </div>

      {/* Centerpiece wordmark */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div
            className="display select-none"
            style={{
              fontSize: "clamp(4.5rem, 16cqi, 12rem)",
              fontWeight: 500,
              letterSpacing: "-0.06em",
              lineHeight: 0.85,
              color: "var(--bone-50)",
              opacity: 0.95,
            }}
          >
            V<span style={{ opacity: 0.5 }}>&</span>V
          </div>
          <div
            className="mt-4 text-bone-200/70"
            style={{
              fontSize: "clamp(10px, 1.4cqi, 14px)",
              letterSpacing: "0.34em",
              textTransform: "uppercase",
            }}
          >
            елегантність у кожній деталі
          </div>
          <div
            className="mt-2 text-bone-400"
            style={{
              fontSize: "clamp(9px, 1cqi, 11px)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            Elegance in every detail
          </div>
        </div>
      </div>

      {/* Bottom row: thin gallery hint */}
      <div className="flex items-end justify-between">
        <div className="flex gap-2 opacity-30">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="border border-white/15"
              style={{
                width: 26,
                height: 36,
                background: "rgba(245,245,243,0.02)",
              }}
            />
          ))}
        </div>
        <div className="text-right">
          <div className="mono opacity-50" style={{ fontSize: 10 }}>
            Editorial · Web · Identity
          </div>
        </div>
      </div>

      {/* Top-bottom hairlines for editorial feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 right-6 top-[58px] h-px md:left-10 md:right-10"
        style={{ background: "rgba(245,245,243,0.12)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-6 right-6 bottom-[58px] h-px md:left-10 md:right-10"
        style={{ background: "rgba(245,245,243,0.10)" }}
      />
    </div>
  );
}
