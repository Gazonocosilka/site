"use client";

/**
 * "Stack" — the tools Inna actually uses, grouped by what she does with them.
 * Mono text rows, scannable in one glance, no logos (avoids licensing + keeps
 * the design system coherent).
 */

const STACK: Array<{ group: string; tools: string[] }> = [
  {
    group: "Design",
    tools: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "InDesign",
      "Lightroom",
    ],
  },
  {
    group: "Motion",
    tools: ["After Effects", "Premiere", "Spline"],
  },
  {
    group: "Build",
    tools: ["Webflow", "Framer", "Antigravity", "Cursor"],
  },
];

export default function AboutStack() {
  return (
    <div className="mt-16 md:mt-20">
      <div className="mb-5 flex items-baseline justify-between">
        <span className="eyebrow opacity-75">Stack</span>
        <span className="mono opacity-50" style={{ fontSize: 10 }}>
          Tools · 03 groups
        </span>
      </div>

      {/* Top hairline */}
      <div
        aria-hidden
        className="mb-6 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(245,245,243,0.20), rgba(245,245,243,0.08) 60%, transparent)",
        }}
      />

      <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-3">
        {STACK.map((row) => (
          <div key={row.group}>
            <div
              className="mono mb-3 text-bone-200/65"
              style={{ fontSize: 10 }}
            >
              {row.group}
            </div>
            <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
              {row.tools.map((t, i) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2.5 text-[13px] text-bone-50"
                  style={{ letterSpacing: "0.01em" }}
                >
                  <span
                    aria-hidden
                    className="block h-1 w-1 rounded-full"
                    style={{
                      background: "var(--accent)",
                      opacity: 0.7,
                    }}
                  />
                  {t}
                  {i < row.tools.length - 1 && (
                    <span aria-hidden className="text-bone-400" style={{ fontSize: 10 }}>
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
