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
  | "bee-pharmacy"    // Clinical white grid, sans, sterile
  | "bee-cottagecore"; // Hand-drawn rustic, warm cream, "honey & home"

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
  directions: [DiscardedDirection, DiscardedDirection];
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {directions.map((d) => (
              <DirectionCard key={d.index} direction={d} accent={accent} />
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
}: {
  direction: DiscardedDirection;
  accent: string;
}) {
  return (
    <figure className="group relative flex flex-col">
      {/* Mock surface */}
      <div
        className="relative overflow-hidden rounded-md border border-dashed border-white/20"
        style={{ aspectRatio: "4 / 3" }}
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
  if (kind === "bee-pharmacy") return <BeePharmacyMock />;
  if (kind === "bee-cottagecore") return <BeeCottagecoreMock />;
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

/* ── BEEXTRART — Direction A: Clinical pharmacy
   Stark white, blister-pack grid, monospaced dosage chips. */
function BeePharmacyMock() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: "#F4F5F7",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        color: "#1A1F2C",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[#1A1F2C]/15 px-4 py-2">
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em" }}>
          BEEXTRART<sup style={{ fontSize: 6 }}>™</sup>
        </span>
        <span
          className="font-mono"
          style={{ fontSize: 7, letterSpacing: "0.18em", opacity: 0.7 }}
        >
          REG · 0042/24 · EU
        </span>
      </div>

      {/* Product card */}
      <div className="flex flex-1 items-center justify-center px-5">
        <div className="flex w-full items-center gap-4">
          {/* Bottle silhouette */}
          <div className="flex flex-col items-center">
            <div
              style={{
                width: 36,
                height: 64,
                background:
                  "linear-gradient(180deg, #DCE2EC 0%, #B7C0CE 100%)",
                borderRadius: "6px 6px 3px 3px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  left: 4,
                  right: 4,
                  bottom: 18,
                  background: "#FFFFFF",
                  border: "0.5px solid #1A1F2C",
                  fontSize: 5,
                  letterSpacing: "0.18em",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: 2,
                }}
              >
                <span style={{ fontWeight: 800 }}>BEE</span>
                <span style={{ marginTop: 1, opacity: 0.65 }}>SERUM 30ML</span>
              </div>
            </div>
          </div>
          {/* Spec list */}
          <div className="flex flex-1 flex-col gap-1.5">
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              Lash &amp; Brow Serum
            </div>
            <div
              className="font-mono"
              style={{ fontSize: 7, letterSpacing: "0.2em", opacity: 0.7 }}
            >
              ACTIVE · BIOTIN 5% · KERATIN
            </div>
            <div className="mt-1 flex flex-wrap gap-1">
              {["DERMA-TESTED", "VEGAN", "0% PARABEN"].map((t) => (
                <span
                  key={t}
                  className="font-mono"
                  style={{
                    fontSize: 6,
                    letterSpacing: "0.18em",
                    background: "#FFFFFF",
                    border: "0.5px solid #1A1F2C",
                    padding: "1.5px 4px",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              className="mt-2 inline-block self-start border border-[#1A1F2C] px-3 py-1"
              style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.2em" }}
            >
              ADD TO BASKET — £24
            </div>
          </div>
        </div>
      </div>

      {/* Footer band */}
      <div
        className="flex items-center justify-between border-t border-[#1A1F2C]/15 px-4 py-1.5 font-mono"
        style={{ fontSize: 6, letterSpacing: "0.2em", opacity: 0.6 }}
      >
        <span>BATCH 240612</span>
        <span>USE BY 06/26</span>
        <span>STORE COOL · DRY</span>
      </div>
    </div>
  );
}

/* ── BEEXTRART — Direction B: Cottagecore / hand-drawn
   Warm cream, woodcut bee, hand-script lockup. */
function BeeCottagecoreMock() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 100% 100% at 50% 40%, #FFF1CE 0%, #F0DDA6 70%, #D9BE73 100%)",
        fontFamily: "'Brush Script MT', 'Snell Roundhand', cursive",
        color: "#5A3E16",
      }}
    >
      {/* Tiny dot pattern */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(90,62,22,0.18) 0.6px, transparent 0.7px)",
          backgroundSize: "8px 8px",
          opacity: 0.6,
        }}
      />

      <div className="relative flex flex-col items-center gap-1 px-5 text-center">
        {/* Woodcut bee */}
        <svg width="44" height="44" viewBox="0 0 44 44">
          <ellipse cx="22" cy="24" rx="11" ry="7" fill="#5A3E16" />
          <ellipse cx="22" cy="24" rx="11" ry="7" fill="none" stroke="#FFF1CE" strokeWidth="0.5" strokeDasharray="2 2" />
          <ellipse cx="14" cy="18" rx="6" ry="3.5" fill="#FFF1CE" opacity="0.85" />
          <ellipse cx="30" cy="18" rx="6" ry="3.5" fill="#FFF1CE" opacity="0.85" />
          <circle cx="22" cy="16" r="3" fill="#5A3E16" />
          <line x1="18" y1="13" x2="14" y2="9" stroke="#5A3E16" strokeWidth="0.7" />
          <line x1="26" y1="13" x2="30" y2="9" stroke="#5A3E16" strokeWidth="0.7" />
        </svg>

        {/* Script wordmark */}
        <span
          style={{
            fontSize: 32,
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: "0.01em",
            transform: "rotate(-3deg)",
          }}
        >
          Beextrart
        </span>
        <span
          style={{
            fontSize: 9,
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            letterSpacing: "0.18em",
            marginTop: 2,
          }}
        >
          honey ~ home ~ handmade
        </span>

        {/* Ribbon */}
        <div
          className="mt-3 px-4 py-1"
          style={{
            background: "#5A3E16",
            color: "#FFF1CE",
            fontFamily: "Georgia, serif",
            fontSize: 7,
            letterSpacing: "0.32em",
            fontWeight: 700,
          }}
        >
          — FROM OUR LITTLE HIVE —
        </div>
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 8,
            opacity: 0.7,
            marginTop: 4,
          }}
        >
          made with love in a small kitchen
        </span>
      </div>
    </div>
  );
}
