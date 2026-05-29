"use client";

import { useEffect, useState } from "react";

const ACTIVITIES = [
  "sketching",
  "in Figma",
  "moodboarding",
  "writing copy",
  "BEEXTRART · direction",
  "studying UX",
  "deep in type",
  "drinking tea",
  "lookbook v2",
];

/**
 * A small mono "now" status strip — lives at the bottom of the About lead.
 * Shows a pulsing dot, a rotating current activity, and the local London time.
 * Updates every minute (time) and every 4.5s (activity).
 * Feels like a designer's status bar — adds life to the section without
 * crowding the headline or the body copy.
 */
export default function AboutNow() {
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState<string>("");

  // Activity rotation
  useEffect(() => {
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % ACTIVITIES.length),
      4500
    );
    return () => window.clearInterval(id);
  }, []);

  // London local time, refreshed every 30s
  useEffect(() => {
    const update = () => {
      try {
        const t = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/London",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        setTime(t);
      } catch {
        // fallback: local time
        const d = new Date();
        setTime(
          `${String(d.getHours()).padStart(2, "0")}:${String(
            d.getMinutes()
          ).padStart(2, "0")}`
        );
      }
    };
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mt-16 md:mt-24">
      {/* Hairline divider */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(245,245,243,0.18) 30%, rgba(245,245,243,0.18) 70%, transparent)",
        }}
      />

      <div className="mt-5 flex flex-col items-start justify-between gap-3 text-[12px] uppercase tracking-[0.28em] text-bone-200/85 md:flex-row md:items-center">
        {/* Left: NOW + pulsing dot + rotating activity */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="relative inline-flex h-2 w-2 items-center justify-center"
          >
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 10px var(--accent)",
              }}
            />
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background: "var(--accent)",
                animation: "now-ping 2.2s var(--ease-cinema) infinite",
              }}
            />
          </span>
          <span className="text-bone-50">Now</span>
          <span aria-hidden className="opacity-40">/</span>

          {/* Rotating activity — relative wrapper so transitions stack */}
          <span className="relative inline-block min-w-[210px] overflow-hidden align-middle md:min-w-[260px]" style={{ height: 14 }}>
            {ACTIVITIES.map((a, i) => (
              <span
                key={a}
                className="absolute left-0 top-0 transition-all duration-700 ease-cinema"
                style={{
                  opacity: i === idx ? 1 : 0,
                  transform:
                    i === idx
                      ? "translateY(0)"
                      : i === (idx - 1 + ACTIVITIES.length) % ACTIVITIES.length
                      ? "translateY(-100%)"
                      : "translateY(100%)",
                  color: "var(--bone-50)",
                  letterSpacing: "0.2em",
                }}
              >
                {a}
              </span>
            ))}
          </span>
        </div>

        {/* Right: city + live time */}
        <div className="flex items-center gap-3 text-bone-200/80">
          <span>London</span>
          <span aria-hidden className="opacity-40">/</span>
          <span
            className="tabular-nums text-bone-50"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {time || "—"}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes now-ping {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(2.8); opacity: 0; }
          100% { transform: scale(2.8); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
