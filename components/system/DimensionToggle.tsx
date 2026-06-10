"use client";

import { useEffect, useState } from "react";
import { useDimension } from "./DimensionContext";

/**
 * Atmosphere toggle — redesigned to read clearly as a button, not as
 * decorative chrome.
 *
 * Affordance cues stacked on purpose:
 *   - Solid 1.5px border (no longer just a glass blur)
 *   - Opaque dark fill (so it sits clearly above content)
 *   - "MODE:" prefix + label so the action is unambiguous
 *   - Switch arrow ⇄ icon that animates on hover, signalling "tap to swap"
 *   - Subtle bottom shadow so it looks lifted off the canvas
 *   - Hover state lifts + brightens; active mode (Dream) glows warmer
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
  const otherLabel = active ? "Cinema" : "Dream";
  const dotColor = active ? "var(--glow-violet)" : "var(--glow-blue)";
  const borderColor = active ? "rgba(183,167,255,0.55)" : "rgba(139,168,255,0.45)";
  const baseShadow = active
    ? "0 8px 30px rgba(0,0,0,0.55), 0 0 28px rgba(183,167,255,0.35), inset 0 1px 0 rgba(255,255,255,0.08)"
    : "0 8px 24px rgba(0,0,0,0.55), 0 0 18px rgba(139,168,255,0.22), inset 0 1px 0 rgba(255,255,255,0.06)";
  const hoverShadow = active
    ? "0 12px 36px rgba(0,0,0,0.6), 0 0 40px rgba(183,167,255,0.55), inset 0 1px 0 rgba(255,255,255,0.10)"
    : "0 12px 36px rgba(0,0,0,0.6), 0 0 30px rgba(139,168,255,0.4), inset 0 1px 0 rgba(255,255,255,0.10)";

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

      {/* The button */}
      <button
        onClick={() => { dismissHint(); toggle(); }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor="hover"
        data-cursor-label="switch"
        aria-pressed={active}
        aria-label={`Switch atmosphere — currently ${label}. Tap to switch to ${otherLabel}.`}
        className="relative flex items-center gap-3 rounded-full pl-3 pr-4 py-3 transition-all duration-500 ease-cinema"
        style={{
          background: active
            ? "linear-gradient(180deg, rgba(20,16,32,0.92), rgba(10,8,18,0.92))"
            : "linear-gradient(180deg, rgba(14,16,24,0.92), rgba(6,8,14,0.92))",
          border: `1.5px solid ${borderColor}`,
          boxShadow: hovered ? hoverShadow : baseShadow,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          animation: hintVisible ? "dimPulse 2.4s ease-in-out infinite" : "none",
          transform: hovered ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        {/* Mode dot */}
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

        {/* Label with explicit MODE: prefix so it reads as a control */}
        <span className="flex items-baseline gap-1.5">
          <span
            className="mono"
            style={{
              fontSize: 9,
              letterSpacing: "0.32em",
              color: "var(--bone-400)",
            }}
          >
            MODE
          </span>
          <span
            className="text-[12px] uppercase tracking-[0.28em] text-bone-50"
            style={{ fontWeight: 500 }}
          >
            {label}
          </span>
        </span>

        {/* Divider */}
        <span
          aria-hidden
          className="block h-3 w-px"
          style={{ background: "rgba(255,255,255,0.18)" }}
        />

        {/* Swap arrow — animates to suggest the click action */}
        <span
          aria-hidden
          className="flex items-center gap-1.5 transition-all duration-500"
          style={{
            color: hovered ? "var(--bone-50)" : "var(--bone-200)",
            transform: hovered ? "translateX(2px)" : "translateX(0)",
          }}
        >
          <span
            className="text-[13px] leading-none transition-transform duration-500"
            style={{ transform: hovered ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ⇄
          </span>
          <span
            className="mono"
            style={{ fontSize: 9, letterSpacing: "0.24em", opacity: 0.7 }}
          >
            SWAP
          </span>
        </span>
      </button>

      <style jsx global>{`
        @keyframes dimPulse {
          0%, 100% {
            box-shadow: 0 8px 24px rgba(0,0,0,0.55), 0 0 18px rgba(139,168,255,0.30), inset 0 1px 0 rgba(255,255,255,0.06);
          }
          50% {
            box-shadow: 0 10px 36px rgba(0,0,0,0.6), 0 0 50px rgba(139,168,255,0.65), inset 0 1px 0 rgba(255,255,255,0.12);
          }
        }
      `}</style>
    </div>
  );
}
