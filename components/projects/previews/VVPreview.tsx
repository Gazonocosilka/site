"use client";

/**
 * V&V home-card preview. Uses the real V&V Boutique homepage screenshot
 * with a soft scrim and a brand tag overlay so it reads as an editorial
 * preview card, not just a flat thumbnail.
 */
export default function VVPreview() {
  return (
    <div className="absolute inset-0 z-[2] overflow-hidden">
      {/* The screenshot itself */}
      <img
        src="/vv-shots/vv-home.jpg"
        alt="V&V Boutique — homepage"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "saturate(0.95) brightness(0.96)" }}
      />

      {/* Soft top scrim for the brand tag */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,5,5,0.55) 0%, transparent 100%)",
        }}
      />
      {/* Soft bottom scrim for the meta */}
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
          V&amp;V Boutique · London
        </span>
      </div>

      {/* Meta — bottom row */}
      <div className="absolute inset-x-5 bottom-4 flex items-end justify-between md:inset-x-7 md:bottom-5">
        <span
          className="text-bone-50"
          style={{
            fontFamily: "var(--font-italic)",
            fontSize: "clamp(14px, 1.6cqi, 22px)",
            lineHeight: 1,
          }}
        >
          елегантність у кожній деталі
        </span>
        <span className="mono text-bone-200/85" style={{ fontSize: 10 }}>
          Identity · Web · UX
        </span>
      </div>
    </div>
  );
}
