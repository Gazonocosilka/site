"use client";

import React from "react";

/**
 * "Discarded directions" — a small honest-process section that sits inside
 * a case study, showing 2 alternate visual directions that were explored
 * and rejected, with a one-line reason each.
 *
 * Each mock is rendered as a self-contained CSS/SVG composition (no real
 * imagery) so it reads as a distinct *alternative homepage* thumbnail at
 * a glance. The desaturated treatment + dashed border + small "killed"
 * tag make it visually obvious these are *not* the final direction.
 */

export type DiscardedMockKind =
  // V&V Boutique kills
  | "vv-maximalist"   // High-sat gradient + huge sale banner — fast-fashion energy
  | "vv-heritage"     // Sepia / old-world apothecary serif
  // BEEXTRART kills
  | "bee-honey-logo"; // Honey-bee logo direction — the "name has BEE in it" trap

export interface DiscardedDirection {
  index: string;        // "Direction A" / "Direction B"
  kind: DiscardedMockKind;
  title: string;        // short name of the direction
  killedBecause: string; // one-line reason it didn't ship
}

interface Props {
  index: string;                 // "07" — section number in the case study
  eyebrow?: string;              // defaults to "Discarded directions"
  intro: string;                 // one paragraph framing the section
  /** 1–2 directions. A single direction renders as a wider single card. */
  directions: DiscardedDirection[];
  accent?: string;               // CSS color for the section accent
}

export default function DiscardedDirections({
  index,
  eyebrow = "Discarded directions",
  intro,
  directions,
  accent = "var(--accent)",
}: Props) {
  return (
    <section className="mx-auto mt-32 max-w-[1400px] px-6 md:mt-44 md:px-12">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div className="mono opacity-60">
            {index} · {eyebrow}
          </div>
          <h2
            className="display mt-4"
            style={{
              fontSize: "clamp(1.8rem, 3.4vw, 2.6rem)",
              lineHeight: 1.05,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            Roads I didn't take
          </h2>
          <p className="mt-5 max-w-[34ch] text-[14px] leading-[1.55] text-bone-200/80">
            {intro}
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <div
            className={`grid grid-cols-1 gap-6 ${directions.length > 1 ? "md:grid-cols-2" : ""}`}
          >
            {directions.map((d) => (
              <DirectionCard
                key={d.index}
                direction={d}
                accent={accent}
                wide={directions.length === 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────── */

function DirectionCard({
  direction,
  accent,
  wide = false,
}: {
  direction: DiscardedDirection;
  accent: string;
  wide?: boolean;
}) {
  return (
    <figure className="group relative flex flex-col">
      {/* Mock surface */}
      <div
        className="relative overflow-hidden rounded-md border border-dashed border-white/20"
        style={{ aspectRatio: wide ? "16 / 9" : "4 / 3" }}
      >
        <DiscardedMock kind={direction.kind} />

        {/* Killed overlay — diagonal stripe + label */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,5,5,0.18) 0%, rgba(5,5,5,0.32) 100%)",
            mixBlendMode: "multiply",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backdropFilter: "saturate(0.62)",
            WebkitBackdropFilter: "saturate(0.62)",
          }}
        />

        {/* Top-right "killed" stamp */}
        <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-white/25 bg-black/45 px-3 py-1 backdrop-blur-md">
          <span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full"
            style={{ background: "#FF6B6B", boxShadow: "0 0 8px rgba(255,107,107,0.7)" }}
          />
          <span
            className="mono text-bone-50"
            style={{ fontSize: 9, letterSpacing: "0.28em" }}
          >
            KILLED
          </span>
        </div>

        {/* Diagonal "discarded" hairline — very subtle */}
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 75"
        >
          <line
            x1="0"
            y1="75"
            x2="100"
            y2="0"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="0.2"
            strokeDasharray="1.2 1"
          />
        </svg>
      </div>

      {/* Caption */}
      <figcaption className="mt-4 flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <span
            className="mono"
            style={{ fontSize: 10, letterSpacing: "0.32em", color: accent }}
          >
            {direction.index}
          </span>
          <span className="mono opacity-50" style={{ fontSize: 10 }}>
            cutting-room floor
          </span>
        </div>
        <h3
          className="text-bone-50"
          style={{
            fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
            fontWeight: 500,
            letterSpacing: "-0.01em",
          }}
        >
          {direction.title}
        </h3>
        <p className="text-[13.5px] leading-[1.55] text-bone-200/80">
          <span className="mono opacity-60" style={{ fontSize: 10, letterSpacing: "0.22em" }}>
            WHY IT DIED ·{" "}
          </span>
          {direction.killedBecause}
        </p>
      </figcaption>
    </figure>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* The four mock compositions. Each one is a small self-contained
   "alternate homepage" — different palette, layout & typography so
   they read instantly as *not* what shipped. */

function DiscardedMock({ kind }: { kind: DiscardedMockKind }) {
  if (kind === "vv-maximalist") return <VVMaximalistMock />;
  if (kind === "vv-heritage") return <VVHeritageMock />;
  if (kind === "bee-honey-logo") return <BeeHoneyLogoMock />;
  return null;
}

/* ── V&V — Direction A: Maximalist colour
   Loud gradient, oversized SALE banner, fast-fashion grid. */
function VVMaximalistMock() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, #FF3DBE 0%, #FF8A3D 50%, #FFD93D 100%)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 text-white">
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.1em" }}>
          V&amp;V★BOUTIQUE
        </span>
        <span style={{ fontSize: 8, fontWeight: 700 }}>SHOP · NEW · SALE · ⓘ</span>
      </div>
      {/* SALE banner */}
      <div
        className="flex items-center justify-center bg-black px-3 py-1.5"
        style={{
          fontSize: 9,
          color: "#FFD93D",
          letterSpacing: "0.18em",
          fontWeight: 900,
        }}
      >
        🔥 70% OFF EVERYTHING · ENDS TONIGHT · 🔥
      </div>
      {/* Giant headline */}
      <div className="flex flex-1 flex-col justify-center px-4">
        <div
          className="text-white"
          style={{
            fontSize: 38,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            textShadow: "3px 3px 0 rgba(0,0,0,0.18)",
          }}
        >
          MEGA<br />DROP!!!
        </div>
        <div
          className="mt-1 inline-block self-start bg-white px-2 py-1"
          style={{ fontSize: 9, fontWeight: 800, color: "#FF3DBE" }}
        >
          SHOP NOW →
        </div>
      </div>
      {/* Tile grid */}
      <div className="grid grid-cols-4 gap-1 px-2 pb-2">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-2 border-white"
            style={{
              aspectRatio: "1",
              background: ["#FFD93D", "#FF3DBE", "#3DFFD9", "#FF8A3D"][i],
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── V&V — Direction B: Heritage serif & sepia
   Old apothecary, oversized serif wordmark, ornamental rule. */
function VVHeritageMock() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 50% 40%, #E9D9BD 0%, #C9B58E 60%, #8E7553 100%)",
        fontFamily: "Georgia, 'Times New Roman', serif",
        color: "#3B2A18",
      }}
    >
      {/* Faint paper grain via repeating gradient */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(59,42,24,0.04) 0px, rgba(59,42,24,0.04) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div className="relative flex flex-col items-center gap-2 px-6 text-center">
        <span style={{ fontSize: 7, letterSpacing: "0.5em", fontStyle: "italic" }}>
          — EST · MMXVI —
        </span>
        <span
          style={{
            fontSize: 38,
            fontWeight: 400,
            letterSpacing: "0.02em",
            fontStyle: "italic",
            lineHeight: 1,
          }}
        >
          V<span style={{ fontStyle: "normal" }}>&amp;</span>V
        </span>
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.45em",
            fontWeight: 600,
          }}
        >
          BOUTIQUE&nbsp;·&nbsp;LONDON
        </span>
        {/* Ornament */}
        <svg width="90" height="14" viewBox="0 0 90 14" className="mt-2">
          <line x1="0" y1="7" x2="34" y2="7" stroke="#3B2A18" strokeWidth="0.5" />
          <circle cx="45" cy="7" r="2.5" fill="none" stroke="#3B2A18" strokeWidth="0.5" />
          <line x1="56" y1="7" x2="90" y2="7" stroke="#3B2A18" strokeWidth="0.5" />
        </svg>
        <span
          style={{
            fontSize: 8,
            letterSpacing: "0.32em",
            fontStyle: "italic",
            marginTop: 6,
          }}
        >
          Purveyors of fine garments
        </span>
        <span
          style={{
            fontSize: 7,
            letterSpacing: "0.28em",
            opacity: 0.75,
            marginTop: 2,
          }}
        >
          — SINCE THE LAST CENTURY —
        </span>
      </div>
    </div>
  );
}

/* ── BEEXTRART — Direction A: Honey-bee wordmark
   Brand-deck artboard. Honey-yellow accent on "BEE", bee mark, honeycomb
   pattern, small designer annotations. The "name has BEE in it" trap. */
function BeeHoneyLogoMock() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse 90% 80% at 50% 50%, #1d1a14 0%, #0e0d0a 100%)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        color: "#F1E4C6",
      }}
    >
      {/* Honeycomb pattern — very subtle */}
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 320 180"
      >
        <defs>
          <pattern id="hex" width="20" height="17.32" patternUnits="userSpaceOnUse" patternTransform="translate(0,0)">
            <polygon
              points="10,1 18.66,5.66 18.66,14.66 10,19.32 1.34,14.66 1.34,5.66"
              fill="none"
              stroke="#E8B84B"
              strokeWidth="0.3"
              opacity="0.15"
            />
          </pattern>
        </defs>
        <rect width="320" height="180" fill="url(#hex)" />
      </svg>

      {/* Top mono label — designer's working file caption */}
      <div className="relative flex items-center justify-between px-5 pt-4">
        <span
          className="font-mono"
          style={{ fontSize: 7, letterSpacing: "0.28em", color: "#E8B84B", opacity: 0.85 }}
        >
          LOGO STUDY · WORDMARK 02
        </span>
        <span
          className="font-mono"
          style={{ fontSize: 7, letterSpacing: "0.22em", opacity: 0.45 }}
        >
          BEEXTRART · BRAND DECK · 03 / 12
        </span>
      </div>

      {/* Centered wordmark */}
      <div className="relative flex flex-1 flex-col items-center justify-center px-5">
        {/* Bee mark above wordmark */}
        <svg width="46" height="34" viewBox="0 0 46 34" className="mb-3">
          {/* Wings */}
          <ellipse cx="15" cy="11" rx="9" ry="5.5" fill="#F1E4C6" opacity="0.85" />
          <ellipse cx="31" cy="11" rx="9" ry="5.5" fill="#F1E4C6" opacity="0.85" />
          {/* Body */}
          <ellipse cx="23" cy="19" rx="11" ry="7.5" fill="#E8B84B" />
          {/* Stripes */}
          <rect x="17" y="13" width="2.4" height="13" rx="1" fill="#1d1a14" transform="rotate(-8 18.2 19)" />
          <rect x="27" y="13" width="2.4" height="13" rx="1" fill="#1d1a14" transform="rotate(8 28.2 19)" />
          {/* Antennae */}
          <line x1="19" y1="11" x2="16" y2="4" stroke="#F1E4C6" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="27" y1="11" x2="30" y2="4" stroke="#F1E4C6" strokeWidth="1.1" strokeLinecap="round" />
          <circle cx="16" cy="3.5" r="1.2" fill="#F1E4C6" />
          <circle cx="30" cy="3.5" r="1.2" fill="#F1E4C6" />
        </svg>

        {/* Wordmark with BEE highlighted */}
        <div
          className="flex items-baseline"
          style={{
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
          }}
        >
          <span style={{ color: "#E8B84B", textShadow: "0 0 24px rgba(232,184,75,0.45)" }}>
            BEE
          </span>
          <span style={{ color: "#F1E4C6" }}>XTRART</span>
        </div>

        {/* Tagline */}
        <span
          className="mt-3"
          style={{
            fontSize: 9,
            letterSpacing: "0.42em",
            opacity: 0.55,
            fontWeight: 500,
          }}
        >
          STRAIGHT&nbsp;FROM&nbsp;THE&nbsp;HIVE
        </span>

        {/* Honeycomb row — supporting graphic */}
        <div className="mt-5 flex items-center gap-1.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <svg key={i} width="14" height="16" viewBox="0 0 20 19.32">
              <polygon
                points="10,1 18.66,5.66 18.66,14.66 10,19.32 1.34,14.66 1.34,5.66"
                fill={i === 3 ? "#E8B84B" : "none"}
                stroke="#E8B84B"
                strokeWidth="0.6"
                opacity={i === 3 ? 0.9 : 0.4}
              />
            </svg>
          ))}
        </div>
      </div>

      {/* Bottom — designer annotation */}
      <div className="relative flex items-center justify-between px-5 pb-3">
        <div className="flex items-center gap-2">
          <span
            aria-hidden
            className="block h-1 w-1 rounded-full"
            style={{ background: "#E8B84B", boxShadow: "0 0 6px #E8B84B" }}
          />
          <span
            className="font-mono"
            style={{ fontSize: 7, letterSpacing: "0.22em", opacity: 0.55 }}
          >
            HONEY YELLOW · #E8B84B
          </span>
        </div>
        <span
          className="font-mono italic"
          style={{ fontSize: 7, letterSpacing: "0.18em", opacity: 0.4 }}
        >
          ↳ note: bee motif reads &quot;jam jar&quot;
        </span>
      </div>
    </div>
  );
}

