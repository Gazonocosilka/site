"use client";

import { useDimension } from "./DimensionContext";

export default function DimensionToggle() {
  const { mode, toggle } = useDimension();
  const active = mode === "dimension";

  return (
    <button
      onClick={toggle}
      data-cursor="hover"
      data-cursor-label={active ? "default" : "dimension"}
      aria-label="Toggle creative dimension mode"
      className="glass fixed bottom-6 right-6 z-[80] flex items-center gap-3 rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.28em] text-bone-50/90 transition-all duration-700 ease-cinema md:bottom-8 md:right-8"
      style={{
        boxShadow: active
          ? "0 0 60px rgba(183,167,255,0.45), inset 0 0 20px rgba(255,222,233,0.12)"
          : "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <span
        className="relative inline-block h-2 w-2 rounded-full"
        style={{
          background: active ? "var(--glow-violet)" : "var(--glow-blue)",
          boxShadow: `0 0 14px ${active ? "var(--glow-violet)" : "var(--glow-blue)"}`,
          transition: "all 600ms var(--ease-cinema)",
        }}
      />
      <span>{active ? "Dimension · On" : "Dimension Mode"}</span>
    </button>
  );
}
