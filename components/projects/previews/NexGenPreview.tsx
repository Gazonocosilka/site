"use client";

/**
 * NexGen home-card preview. Uses the real practice site hero screenshot
 * with brand-tag + practice-project chip overlays so it reads as a
 * deliberate editorial card.
 */
export default function NexGenPreview() {
  return (
    <div className="absolute inset-0 z-[2] overflow-hidden">
      {/* The screenshot itself */}
      <img
        src="/nex-shots/nex-hero.jpg"
        alt="NexGen — design agency homepage"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.96)" }}
      />

      {/* Soft top scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, transparent 100%)",
        }}
      />
      {/* Soft bottom scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.55) 100%)",
        }}
      />

      {/* Brand tag — top left */}
      <div className="absolute left-5 top-5 flex items-center gap-2 md:left-7 md:top-6">
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full bg-bone-50"
          style={{ boxShadow: "0 0 8px rgba(245,245,243,0.5)" }}
        />
        <span className="mono text-bone-50/95" style={{ fontSize: 11 }}>
          NexGen · Practice
        </span>
      </div>

      {/* Practice-project chip — top right */}
      <div
        className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/35 px-3 py-1 text-bone-50/90 md:right-7 md:top-6"
        style={{
          fontSize: 10,
          letterSpacing: "0.26em",
          textTransform: "uppercase",
          backdropFilter: "blur(6px)",
        }}
      >
        Test build
      </div>

      {/* Meta — bottom row */}
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between md:inset-x-7 md:bottom-5">
        <span
          className="text-bone-50"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(13px, 1.4cqi, 20px)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Crafting experiences
        </span>
        <span className="mono text-bone-200/85" style={{ fontSize: 10 }}>
          Web · Motion · Cursor
        </span>
      </div>
    </div>
  );
}
