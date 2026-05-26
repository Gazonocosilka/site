"use client";

import { useEffect, useState } from "react";

/**
 * First-visit hint that gently nudges the user to interact with the 3D form.
 * - Appears 1.6s after page load
 * - Fades on first cursor movement or after 9s
 * - Persisted in localStorage so it shows only on first visit
 */
export default function HeroHint() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("inna-hint-hero") === "1") return;

    const showTimer = window.setTimeout(() => setVisible(true), 1600);
    const hideTimer = window.setTimeout(() => dismiss(), 10500);

    let moved = false;
    const onMove = () => {
      if (moved) return;
      moved = true;
      window.setTimeout(dismiss, 600); // brief moment to confirm user got it
    };
    window.addEventListener("mousemove", onMove, { once: true, passive: true });

    function dismiss() {
      setVisible(false);
      setDismissed(true);
      localStorage.setItem("inna-hint-hero", "1");
    }

    return () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  if (dismissed && !visible) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[64%] z-[7] hidden -translate-x-1/2 md:block"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translate(-50%, ${visible ? 0 : 8}px)`,
        transition: "opacity 700ms var(--ease-cinema), transform 700ms var(--ease-cinema)",
      }}
    >
      <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--accent)",
            boxShadow: "0 0 10px var(--accent)",
            animation: "heroHintPulse 1.8s ease-in-out infinite",
          }}
        />
        <span className="text-[11px] uppercase tracking-[0.28em] text-bone-50/90">
          Move your cursor — the form reacts
        </span>
      </div>
      <style jsx>{`
        @keyframes heroHintPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </div>
  );
}
