"use client";

/**
 * "Stack" — the tools Inna actually uses. Displayed as glass pill chips
 * grouped by what they're for, with a display-type heading so it reads
 * as a real section of the About story (not a footnote).
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

const TOTAL = STACK.reduce((n, g) => n + g.tools.length, 0);

export default function AboutStack() {
  return (
    <div className="mt-24 md:mt-32">
      {/* Header row — eyebrow + count */}
      <div className="mb-8 flex items-baseline justify-between gap-6 border-t border-white/10 pt-10 md:mb-10 md:pt-12">
        <div>
          <div className="mono opacity-60">Ch.02 · Stack</div>
          <h2
            className="display mt-4"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
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

      {/* Groups */}
      <div className="space-y-8 md:space-y-10">
        {STACK.map((row) => (
          <div key={row.group} className="grid grid-cols-12 items-baseline gap-4 md:gap-6">
            <div className="col-span-12 md:col-span-2">
              <div
                className="mono text-bone-200"
                style={{ fontSize: 12, letterSpacing: "0.28em" }}
              >
                {row.group}
              </div>
              <div
                className="mono mt-1 text-bone-400"
                style={{ fontSize: 10 }}
              >
                {String(row.tools.length).padStart(2, "0")}
              </div>
            </div>
            <ul className="col-span-12 flex flex-wrap items-center gap-2.5 md:col-span-10">
              {row.tools.map((t) => (
                <li key={t}>
                  <span
                    className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-[13px] text-bone-50 transition-all duration-500 hover:-translate-y-0.5"
                    style={{
                      letterSpacing: "0.02em",
                      boxShadow:
                        "0 0 24px rgba(139,168,255,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="block h-1.5 w-1.5 rounded-full"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 0 8px var(--accent)",
                      }}
                    />
                    {t}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
