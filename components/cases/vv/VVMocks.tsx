"use client";

/**
 * Lightweight SVG/CSS mocks for the V&V case study — used in process
 * sections until real screenshots / photography arrive. All on-brand
 * (warm bone, ink, silver, faint type), all editorial.
 */

// ---------- Wireframe of V&V homepage ----------
export function VVWireframe() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#0a0a0d" }}>
      <svg
        viewBox="0 0 320 400"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
      >
        {/* Margins guides */}
        <line x1="20" y1="0" x2="20" y2="400" stroke="rgba(139,168,255,0.18)" strokeDasharray="2 4" />
        <line x1="300" y1="0" x2="300" y2="400" stroke="rgba(139,168,255,0.18)" strokeDasharray="2 4" />

        {/* Top nav */}
        <line x1="20" y1="20" x2="300" y2="20" stroke="rgba(245,245,243,0.30)" />
        <text x="20" y="14" fontSize="6" fill="rgba(245,245,243,0.7)" letterSpacing="1">V&amp;V BOUTIQUE</text>
        <text x="240" y="14" fontSize="5" fill="rgba(245,245,243,0.5)" letterSpacing="1">SHOP · ABOUT · CART</text>

        {/* Hero — big type */}
        <text x="20" y="78" fontSize="32" fill="rgba(245,245,243,0.95)" fontWeight="500">elegance</text>
        <text x="20" y="108" fontSize="32" fill="rgba(245,245,243,0.65)" fontWeight="500" fontStyle="italic">in every detail</text>
        <text x="20" y="128" fontSize="6" fill="rgba(245,245,243,0.5)" letterSpacing="2">EST · 2024 · LONDON</text>

        {/* Hero image block */}
        <rect x="180" y="50" width="120" height="160" fill="none" stroke="rgba(245,245,243,0.2)" />
        <line x1="180" y1="50" x2="300" y2="210" stroke="rgba(245,245,243,0.08)" />
        <line x1="300" y1="50" x2="180" y2="210" stroke="rgba(245,245,243,0.08)" />

        {/* CTA */}
        <rect x="20" y="150" width="80" height="22" fill="none" stroke="rgba(245,245,243,0.35)" />
        <text x="60" y="164" fontSize="6" fill="rgba(245,245,243,0.85)" textAnchor="middle" letterSpacing="2">SHOP COLLECTION</text>

        {/* Hairline divider */}
        <line x1="20" y1="240" x2="300" y2="240" stroke="rgba(245,245,243,0.18)" />

        {/* Lookbook strip */}
        <text x="20" y="258" fontSize="6" fill="rgba(245,245,243,0.5)" letterSpacing="2">LOOKBOOK · SPRING 26</text>
        <g>
          <rect x="20" y="270" width="90" height="100" fill="none" stroke="rgba(245,245,243,0.18)" />
          <rect x="115" y="270" width="90" height="100" fill="none" stroke="rgba(245,245,243,0.18)" />
          <rect x="210" y="270" width="90" height="100" fill="none" stroke="rgba(245,245,243,0.18)" />
        </g>

        {/* Footer */}
        <text x="20" y="390" fontSize="5" fill="rgba(245,245,243,0.35)" letterSpacing="1">© 2026  · @VVBOUTIQUELONDON</text>
      </svg>

      {/* Corner label */}
      <div
        className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-bone-200/85"
        style={{ backdropFilter: "blur(4px)" }}
      >
        Wireframe · Home
      </div>
    </div>
  );
}

// ---------- Type system: display + body pairing ----------
export function VVTypeSystem() {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-between overflow-hidden p-6"
      style={{ background: "#0a0a0d" }}
    >
      <div>
        <div className="mono text-bone-400" style={{ fontSize: 10 }}>
          Type system · 02 families
        </div>
        <div
          className="mt-3 text-bone-50"
          style={{ fontFamily: "var(--font-display)", fontSize: 92, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.85 }}
        >
          Aa
        </div>
        <div className="mt-1 text-bone-200/80" style={{ fontSize: 11, letterSpacing: "0.2em" }}>
          DISPLAY · TASA ORBITER · 500
        </div>
      </div>
      <div>
        <div
          className="text-bone-50"
          style={{ fontFamily: "var(--font-sans)", fontSize: 18, lineHeight: 1.4 }}
        >
          The shop offers three categories — but how does a user navigate them
          confidently? Editorial UI sits where typography becomes the system.
        </div>
        <div className="mt-2 text-bone-200/70" style={{ fontSize: 10, letterSpacing: "0.2em" }}>
          BODY · SATOSHI · 400
        </div>
      </div>
    </div>
  );
}

// ---------- Palette ----------
export function VVPalette() {
  const SWATCHES = [
    { hex: "#050505", name: "Ink 950" },
    { hex: "#161618", name: "Graphite" },
    { hex: "#7A7F87", name: "Metallic" },
    { hex: "#C9C7C2", name: "Silver" },
    { hex: "#F5F5F3", name: "Bone 50" },
  ];
  return (
    <div className="relative flex h-full w-full flex-col p-6" style={{ background: "#0a0a0d" }}>
      <div className="mb-4 flex items-baseline justify-between">
        <div className="mono text-bone-400" style={{ fontSize: 10 }}>Palette · 05 stops</div>
        <div className="mono text-bone-200/70" style={{ fontSize: 9, letterSpacing: "0.2em" }}>
          MONOCHROME · WARM
        </div>
      </div>
      <div className="grid flex-1 grid-cols-5 gap-2">
        {SWATCHES.map((s) => (
          <div key={s.hex} className="flex flex-col">
            <div
              className="flex-1 rounded-[2px]"
              style={{
                background: s.hex,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            />
            <div className="mt-2 text-bone-50" style={{ fontSize: 9, letterSpacing: "0.12em" }}>
              {s.name}
            </div>
            <div className="text-bone-400" style={{ fontSize: 9 }}>{s.hex.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Lookbook spread mockup ----------
export function VVLookbook() {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#0a0a0d" }}>
      <div className="absolute inset-0 grid grid-cols-12 gap-3 p-6">
        {/* Left page — large photograph */}
        <div className="col-span-7 flex flex-col">
          <div
            className="flex-1 rounded-[2px] border border-white/10"
            style={{
              background:
                "linear-gradient(160deg, rgba(245,245,243,0.10), rgba(245,245,243,0.02))",
            }}
          />
          <div className="mt-3 flex items-baseline justify-between">
            <div className="mono text-bone-400" style={{ fontSize: 9, letterSpacing: "0.2em" }}>
              LOOK 03 · BLAZER SUIT
            </div>
            <div className="mono text-bone-400" style={{ fontSize: 9 }}>06 / 28</div>
          </div>
        </div>
        {/* Right page — type + 2 small images */}
        <div className="col-span-5 flex flex-col">
          <div
            className="display text-bone-50"
            style={{ fontSize: 30, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 0.95 }}
          >
            Spring · 26
          </div>
          <div className="mt-1 text-bone-50/80" style={{ fontSize: 22, fontStyle: "italic", fontFamily: "var(--font-italic)" }}>
            elegance
          </div>
          <div className="mt-4 text-bone-200/75" style={{ fontSize: 11, lineHeight: 1.5 }}>
            A capsule of nine pieces. Wool from Ternopil, cut and finished in
            East London. Every garment carries the maker's mark.
          </div>
          <div className="mt-auto grid grid-cols-2 gap-2">
            <div
              className="aspect-square rounded-[2px] border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,245,243,0.08), rgba(245,245,243,0.02))",
              }}
            />
            <div
              className="aspect-square rounded-[2px] border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,245,243,0.06), rgba(245,245,243,0.02))",
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-3 right-3 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[9px] uppercase tracking-[0.22em] text-bone-200/85"
        style={{ backdropFilter: "blur(4px)" }}
      >
        Lookbook · Spread
      </div>
    </div>
  );
}
