"use client";

import { useEffect, useState } from "react";
import { useDimension } from "./DimensionContext";

/**
 * Floating control to switch between visual atmospheres.
 * - Sits bottom-right, large and persistent
 * - Two clear options inside a glass pill (segmented), not a hidden toggle
 * - On first visit: a soft tooltip explains what it does, fades after 8s or
 *   on first click; suppressed thereafter via localStorage
 * - Active option gets a glowing dot + soft halo so it's visibly "on"
 */
export default function DimensionToggle() {
  const { mode, toggle } = useDimension();
  const active = mode === "dimension";
  const [hintVisible, setHintVisible] = useState(false);

  // First-visit hint
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem("inna-hint-dimension");
    if (seen === "1") return;
    const showTimer = window.setTimeout(() => setHintVisible(true), 2200);
    const hideTimer = window.setTimeout(() => {
      setHintVisible(false);
      localStorage.setItem("inna-hint-dimension", "1");
    }, 10000);
    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  const dismissHint = () => {
    setHintVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("inna-hint-dimension", "1");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80] md:bottom-8 md:right-8">
      {/* Outer attention halo when active */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -m-3 rounded-full transition-opacity duration-700"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(183,167,255,0.35), transparent 70%)",
          filter: "blur(14px)",
        }}
      />

      {/* First-visit tooltip */}
      <div
        className="pointer-events-none absolute bottom-[calc(100%+14px)] right-0 w-[280px] transition-all duration-700 ease-cinema"
        style={{
          opacity: hintVisible ? 1 : 0,
          transform: hintVisible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <div className="glass rounded-2xl p-4 text-left">
          <div className="mono mb-2 opacity-60" style={{ color: "var(--accent)" }}>
            ↓ Try this
          </div>
          <div className="text-[12.5px] leading-[1.55] text-bone-50/90">
            Switch atmosphere — <span className="text-bone-50">Cinema</span> is
            cooler and minimal, <span className="text-bone-50">Dream</span> turns
            up bloom, color and grain for a surreal mode.
          </div>
        </div>
        {/* tail */}
        <div
          className="absolute -bottom-1 right-10 h-2 w-2 rotate-45 bg-white/[0.07]"
          style={{ border: "1px solid rgba(255,255,255,0.08)", borderTop: "none", borderLeft: "none" }}
        />
      </div>

      {/* Main control — segmented pill */}
      <div
        className="glass relative flex items-center rounded-full p-1.5 transition-shadow duration-700"
        style={{
          boxShadow: active
            ? "0 0 50px rgba(183,167,255,0.55), inset 0 0 20px rgba(255,222,233,0.10)"
            : "0 0 36px rgba(139,168,255,0.30), inset 0 1px 0 rgba(255,255,255,0.06)",
          animation: hintVisible ? "dimPulse 2.4s ease-in-out infinite" : "none",
        }}
      >
        <span className="mr-3 hidden pl-3 text-[10px] uppercase tracking-[0.32em] text-bone-400 md:inline">
          Atmosphere
        </span>

        <button
          onClick={() => { dismissHint(); if (active) toggle(); }}
          data-cursor="hover"
          data-cursor-label={active ? "switch" : ""}
          aria-pressed={!active}
          aria-label="Cinema atmosphere"
          className="relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-500"
          style={{
            background: !active ? "rgba(255,255,255,0.10)" : "transparent",
            color: !active ? "var(--bone-50)" : "var(--bone-400)",
            boxShadow: !active ? "inset 0 1px 0 rgba(255,255,255,0.10)" : "none",
          }}
        >
          <span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full transition-all duration-500"
            style={{
              background: !active ? "var(--glow-blue)" : "transparent",
              boxShadow: !active ? "0 0 10px var(--glow-blue)" : "none",
              border: !active ? "none" : "1px solid rgba(255,255,255,0.25)",
            }}
          />
          Cinema
        </button>

        <button
          onClick={() => { dismissHint(); if (!active) toggle(); }}
          data-cursor="hover"
          data-cursor-label={active ? "" : "switch"}
          aria-pressed={active}
          aria-label="Dream atmosphere"
          className="relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[11px] uppercase tracking-[0.28em] transition-all duration-500"
          style={{
            background: active ? "rgba(183,167,255,0.18)" : "transparent",
            color: active ? "var(--bone-50)" : "var(--bone-400)",
            boxShadow: active ? "inset 0 1px 0 rgba(255,255,255,0.10)" : "none",
          }}
        >
          <span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full transition-all duration-500"
            style={{
              background: active ? "var(--glow-violet)" : "transparent",
              boxShadow: active ? "0 0 12px var(--glow-violet)" : "none",
              border: active ? "none" : "1px solid rgba(255,255,255,0.25)",
            }}
          />
          Dream
        </button>
      </div>

      <style jsx global>{`
        @keyframes dimPulse {
          0%, 100% { box-shadow: 0 0 36px rgba(139,168,255,0.35), inset 0 1px 0 rgba(255,255,255,0.06); }
          50% { box-shadow: 0 0 60px rgba(139,168,255,0.7), inset 0 1px 0 rgba(255,255,255,0.10); }
        }
      `}</style>
    </div>
  );
}
