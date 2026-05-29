"use client";

/**
 * Editorial archive-card row — sits inline inside the About body column
 * (so it can never overlap the headline or right-side fixed nav).
 * Same design language as the previously-removed floating cards, but
 * deliberately placed as part of the page flow.
 */
export default function AboutArtifacts() {
  return (
    <div className="mt-14 grid grid-cols-2 gap-4 md:mt-20 md:grid-cols-4 md:gap-5">
      <ArtifactCard num="01" label="Wireframe · Home" hint="v 04">
        <WireframeMock />
      </ArtifactCard>
      <ArtifactCard num="02" label="Type · Display" hint="Tasa · 92">
        <TypeMock />
      </ArtifactCard>
      <ArtifactCard num="03" label="Palette · Cinema" hint="5 · stops">
        <PaletteMock />
      </ArtifactCard>
      <ArtifactCard num="04" label="Grid · 12 col" hint="1440 · 80">
        <GridMock />
      </ArtifactCard>
    </div>
  );
}

function ArtifactCard({
  num,
  label,
  hint,
  children,
}: {
  num: string;
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-[4px] p-4"
      style={{
        background: "rgba(15,15,16,0.55)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
        aspectRatio: "5 / 4",
      }}
    >
      {/* Top label */}
      <div className="flex items-center justify-between">
        <span className="mono opacity-70" style={{ fontSize: 10 }}>
          {num}
        </span>
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full opacity-60"
          style={{ background: "var(--accent)" }}
        />
      </div>

      {/* Mock content fills the middle */}
      <div className="absolute left-4 right-4 top-12 bottom-10">
        {children}
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
        <span className="mono text-bone-200/85" style={{ fontSize: 10 }}>
          {label}
        </span>
        <span className="mono text-bone-400" style={{ fontSize: 9 }}>
          {hint}
        </span>
      </div>
    </div>
  );
}

// ------ Mock contents ------

function WireframeMock() {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full">
      <rect x="6" y="6" width="148" height="12" stroke="white" strokeOpacity="0.5" fill="none" />
      <rect x="6" y="24" width="90" height="46" stroke="white" strokeOpacity="0.35" fill="none" />
      <rect x="100" y="24" width="54" height="46" stroke="white" strokeOpacity="0.35" fill="none" />
      <line x1="6" y1="78" x2="154" y2="78" stroke="white" strokeOpacity="0.25" />
      <line x1="6" y1="86" x2="120" y2="86" stroke="white" strokeOpacity="0.18" />
      <line x1="6" y1="94" x2="80" y2="94" stroke="white" strokeOpacity="0.14" />
    </svg>
  );
}

function TypeMock() {
  return (
    <div className="flex h-full items-baseline gap-3">
      <span
        className="display text-bone-50"
        style={{ fontSize: 52, lineHeight: 0.85, fontWeight: 500, letterSpacing: "-0.04em" }}
      >
        Aa
      </span>
      <span
        className="display text-bone-200/70"
        style={{ fontFamily: "var(--font-italic)", fontStyle: "italic", fontSize: 30, lineHeight: 0.9 }}
      >
        Gg
      </span>
    </div>
  );
}

function PaletteMock() {
  const SWATCHES = ["#050505", "#161618", "#7A7F87", "#C9C7C2", "#F5F5F3"];
  return (
    <div className="flex h-full gap-1.5">
      {SWATCHES.map((c) => (
        <div
          key={c}
          className="flex-1 rounded-[2px]"
          style={{
            background: c,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        />
      ))}
    </div>
  );
}

function GridMock() {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full">
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 13 + 4} y1={0} x2={i * 13 + 4} y2={100} stroke="white" strokeOpacity="0.18" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1={0} y1={i * 14 + 6} x2={160} y2={i * 14 + 6} stroke="white" strokeOpacity="0.12" />
      ))}
    </svg>
  );
}
