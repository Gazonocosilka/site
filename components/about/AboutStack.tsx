"use client";

/**
 * "Stack" — the tools Inna actually uses.
 * One glass panel groups everything as a single visible block. Each tool
 * group sits in its own row with a hairline above. Tools are big inline
 * text (no buttons, nothing clickable-looking), separated by middle dots.
 */

const STACK: Array<{ group: string; tools: string[] }> = [
  {
    group: "Design",
    tools: ["Figma", "Photoshop", "Illustrator", "InDesign", "Lightroom"],
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

const TOTAL = STACK.reduce((n, g) => n + g.tools.length, 0);

export default function AboutStack() {
  return (
    <div className="mt-24 md:mt-32">
      {/* Section eyebrow + display title sit OUTSIDE the panel for hierarchy */}
      <div className="mb-8 flex items-baseline justify-between gap-6 md:mb-10">
        <div>
          <div className="mono opacity-60">Ch.02 · Stack</div>
          <h2
            className="display mt-4"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              lineHeight: 1.02,
              fontWeight: 500,
              letterSpacing: "-0.03em",
              color: "var(--bone-50)",
            }}
          >
            What I work with
          </h2>
        </div>
        <span
          className="mono shrink-0 self-end opacity-60"
          style={{ fontSize: 11 }}
        >
          {String(TOTAL).padStart(2, "0")} tools · {STACK.length} groups
        </span>
      </div>

      {/* Single glass panel containing all groups */}
      <div
        className="glass relative overflow-hidden rounded-[8px]"
        style={{
          boxShadow:
            "0 30px 80px rgba(0,0,0,0.45), 0 0 60px rgba(139,168,255,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {STACK.map((row, idx) => (
          <div
            key={row.group}
            className="grid grid-cols-12 items-baseline gap-x-6 px-6 py-7 md:gap-x-10 md:px-10 md:py-9"
            style={{
              borderTop:
                idx === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Group label + count */}
            <div className="col-span-12 flex items-baseline gap-3 md:col-span-3 md:block">
              <div
                className="mono text-bone-50"
                style={{ fontSize: 13, letterSpacing: "0.32em" }}
              >
                {row.group}
              </div>
              <div
                className="mono mt-0.5 text-bone-400 md:mt-2"
                style={{ fontSize: 10, letterSpacing: "0.22em" }}
              >
                {String(row.tools.length).padStart(2, "0")} tools
              </div>
            </div>

            {/* Tools — big inline text, middle-dot separators, no button look */}
            <div className="col-span-12 mt-3 md:col-span-9 md:mt-0">
              <p
                className="text-bone-50"
                style={{
                  fontSize: "clamp(18px, 2vw, 22px)",
                  lineHeight: 1.5,
                  fontWeight: 400,
                  letterSpacing: "-0.005em",
                }}
              >
                {row.tools.map((t, i) => (
                  <span key={t}>
                    {t}
                    {i < row.tools.length - 1 && (
                      <span
                        aria-hidden
                        className="mx-3 align-middle text-bone-400 md:mx-4"
                        style={{ fontSize: "0.7em" }}
                      >
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}

        {/* Bottom corner accent — small dot */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 right-5 flex items-center gap-2 text-bone-400"
          style={{ fontSize: 10, letterSpacing: "0.22em" }}
        >
          <span
            className="block h-1.5 w-1.5 rounded-full"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
            }}
          />
          live · 2026
        </div>
      </div>
    </div>
  );
}
