"use client";

import { useEffect, useState } from "react";
import { useDimension } from "./DimensionContext";

/**
 * Compact atmosphere toggle.
 * - Looks like a proper button (border, background, hover, icon, label).
 * - One click swaps Cinema ↔ Dream. Icon + label both change.
 * - First-visit tooltip explains what it does.
 */
export default function DimensionToggle() {
  const { mode, toggle } = useDimension();
  const active = mode === "dimension";
  const [hintVisible, setHintVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("inna-hint-dimension") === "1") return;
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

  const label = active ? "Dream" : "Cinema";
  const dotColor = active ? "var(--glow-violet)" : "var(--glow-blue)";

  return (
    <div className="fixed bottom-6 right-6 z-[80] md:bottom-8 md:right-8">
      {/* First-visit tooltip */}
      <div
        className="pointer-events-none absolute bottom-[calc(100%+12px)] right-0 w-[240px] transition-all duration-700 ease-cinema"
        style={{
          opacity: hintVisible ? 1 : 0,
          transform: hintVisible ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <div className="glass rounded-2xl p-4 text-left">
          <div className="mono mb-1.5 opacity-60" style={{ color: "var(--accent)" }}>
            ↓ Try this
          </div>
          <div className="text-[12.5px] leading-[1.55] text-bone-50/90">
            Tap to switch atmosphere — <span className="text-bone-50">Cinema</span>{" "}
            (cool / minimal) or <span className="text-bone-50">Dream</span> (warm / surreal).
          </div>
        </div>
      </div>

      {/* The button itself */}
      <button
        onClick={() => { dismissHint(); toggle(); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor="hover"
        data-cursor-label="switch"
        aria-pressed={active}
        aria-label={`Switch atmosphere (currently ${label})`}
        className="glass relative flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2.5 transition-all duration-500 ease-cinema"
        style={{
          boxShadow: active
            ? "0 0 50px rgba(183,167,255,0.45), inset 0 0 16px rgba(255,222,233,0.10)"
            : hovered
            ? "0 0 36px rgba(139,168,255,0.35), inset 0 1px 0 rgba(255,255,255,0.10)"
            : "0 0 24px rgba(139,168,255,0.20), inset 0 1px 0 rgba(255,255,255,0.06)",
          animation: hintVisible ? "dimPulse 2.4s ease-in-out infinite" : "none",
          transform: hovered ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        {/* Animated dot indicator */}
        <span
          aria-hidden
          className="relative flex h-5 w-5 items-center justify-center rounded-full transition-all duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${dotColor}, transparent 70%)`,
          }}
        >
          <span
            className="block h-2 w-2 rounded-full"
            style={{
              background: dotColor,
              boxShadow: `0 0 12px ${dotColor}`,
            }}
          />
        </span>
        <span className="text-[11px] uppercase tracking-[0.28em] text-bone-50">
          {label}
        </span>
      </button>

      <style jsx global>{`
        @keyframes dimPulse {
          0%, 100% { box-shadow: 0 0 24px rgba(139,168,255,0.30), inset 0 1px 0 rgba(255,255,255,0.06); }
          50% { box-shadow: 0 0 56px rgba(139,168,255,0.65), inset 0 1px 0 rgba(255,255,255,0.10); }
        }
      `}</style>
    </div>
  );
}
