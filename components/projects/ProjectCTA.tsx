"use client";

import MagneticButton from "../system/MagneticButton";

type Accent = "neutral" | "pink" | "blue";

const ACCENTS: Record<Accent, { glow: string; ring: string; dot: string }> = {
  neutral: {
    glow: "0 0 60px rgba(245,245,243,0.18)",
    ring: "rgba(245,245,243,0.35)",
    dot: "var(--bone-50)",
  },
  pink: {
    glow: "0 0 60px rgba(255,222,233,0.40)",
    ring: "rgba(255,222,233,0.45)",
    dot: "var(--glow-pink)",
  },
  blue: {
    glow: "0 0 60px rgba(139,168,255,0.45)",
    ring: "rgba(139,168,255,0.55)",
    dot: "var(--glow-blue)",
  },
};

/**
 * Single shared call-to-action used by every project.
 * Same label, shape, size and position across V&V / BEEXTRART / NexGen
 * — only the accent colour shifts per project for identity.
 */
export default function ProjectCTA({
  accent = "neutral",
  label = "View Case",
  href = "#",
}: {
  accent?: Accent;
  label?: string;
  href?: string;
}) {
  const a = ACCENTS[accent];

  return (
    <div className="relative mt-16 flex justify-center md:mt-24">
      {/* Soft halo behind the button — separates it from any background detail */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-[420px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `radial-gradient(ellipse 60% 80% at 50% 50%, ${a.ring.replace("0.45", "0.18").replace("0.55", "0.18").replace("0.35", "0.10")}, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <MagneticButton
        as="a"
        href={href}
        cursor="view"
        cursorLabel="case"
        strength={0.45}
        className="glass relative inline-flex items-center gap-5 rounded-full px-9 py-5 text-[12px] uppercase tracking-[0.32em] text-bone-50"
        style={{
          boxShadow: `${a.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
          border: `1px solid ${a.ring}`,
        }}
      >
        <span
          aria-hidden
          className="block h-2 w-2 rounded-full"
          style={{ background: a.dot, boxShadow: `0 0 12px ${a.dot}` }}
        />
        <span>{label}</span>
        <span aria-hidden className="text-[14px] leading-none">→</span>
      </MagneticButton>
    </div>
  );
}
