"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const CHAPTERS = [
  { id: "hero", label: "Entrance", short: "01" },
  { id: "about", label: "Field Notes", short: "02" },
  { id: "projects", label: "Work", short: "03" },
  { id: "contact", label: "Outro", short: "04" },
];

// Project sub-items expand under the "Work" chapter so chapters and
// projects render as one continuous, single-size index on the right edge.
const PROJECTS = [
  { id: "project-vv", label: "V&V Boutique", short: "01" },
  { id: "project-bee", label: "Beextrart", short: "02" },
  { id: "project-nex", label: "NexGen", short: "03" },
];

/**
 * Fixed right-edge scroll progress indicator.
 *
 * One continuous list of:
 *   01 · Entrance
 *   02 · Field Notes
 *   03 · Work
 *      01 · V&V Boutique     ← only visible while "Work" is active
 *      02 · Beextrart        ← (so the rail doesn't grow indefinitely)
 *      03 · NexGen
 *   04 · Outro
 *
 * Every item uses the same font size and structure so the rail reads
 * as one list, not two stacked navs. The progress bar lives on the right.
 */
/**
 * One row of the rail. Fixed-width 2-column grid:
 *   col 1 (1fr): the label, right-aligned — all labels end at the same X
 *   col 2 (18px): the short code, right-aligned — all numbers end at the
 *                 same X (= the rail's right edge)
 * Width chosen to fit the longest label ("V&V Boutique") at 11px mono.
 */
function RailItem({
  label,
  short,
  active,
  onClick,
}: {
  label: string;
  short: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      data-cursor-label="jump"
      className="group grid items-baseline gap-x-2.5 transition-opacity duration-500 ease-cinema"
      style={{
        opacity: active ? 1 : 0.4,
        gridTemplateColumns: "1fr 18px",
        width: 120,
      }}
    >
      <span
        className="mono whitespace-nowrap text-right transition-all duration-500 group-hover:tracking-[0.32em]"
        style={{
          color: active ? "var(--bone-50)" : "var(--bone-200)",
          fontSize: 11,
        }}
      >
        {label}
      </span>
      <span
        className="mono opacity-50 text-right"
        style={{ fontSize: 9 }}
      >
        {short}
      </span>
    </button>
  );
}

export default function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const chapterStops = useRef<Array<{ id: string; top: number }>>([]);
  const projectStops = useRef<Array<{ id: string; top: number }>>([]);
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;

    const refresh = () => {
      // Chapter stops (heuristic from existing implementation)
      const chMap: Array<{ id: string; top: number }> = [];
      const sections = document.querySelectorAll<HTMLElement>("section");
      sections.forEach((s) => {
        const id = s.getAttribute("aria-label") || s.tagName.toLowerCase();
        let key = "";
        if (s.classList.contains("ambient-bg") && s.querySelector("h1")) key = "hero";
        else if (
          s.querySelector('[class*="floating digital archive"]') ||
          s.querySelector("h2")?.textContent?.includes("designer")
        )
          key = "about";
        else if (id === "Selected work") key = "projects";
        else if (s.querySelector("h2")?.textContent?.toLowerCase().includes("create")) key = "contact";
        if (key) chMap.push({ id: key, top: window.scrollY + s.getBoundingClientRect().top });
      });
      if (chMap.length < 4) {
        chMap.length = 0;
        sections.forEach((s, i) => {
          const id = CHAPTERS[i]?.id;
          if (id) chMap.push({ id, top: window.scrollY + s.getBoundingClientRect().top });
        });
      }
      chapterStops.current = chMap;

      // Project stops — straightforward, they have stable ids
      const pjMap: Array<{ id: string; top: number }> = [];
      PROJECTS.forEach((p) => {
        const el = document.getElementById(p.id);
        if (el) pjMap.push({ id: p.id, top: window.scrollY + el.getBoundingClientRect().top });
      });
      projectStops.current = pjMap;
    };

    refresh();
    const onResize = () => refresh();
    window.addEventListener("resize", onResize, { passive: true });

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(Math.min(1, Math.max(0, y / Math.max(1, docH))));

      // Active chapter: last stop whose top <= y + viewport/3
      const probe = y + window.innerHeight / 3;
      let chIdx = 0;
      chapterStops.current.forEach((s, i) => {
        if (s.top <= probe) chIdx = i;
      });
      setActiveIdx(chIdx);

      // Active project: same probe, last project whose top <= probe
      let pjIdx = 0;
      projectStops.current.forEach((s, i) => {
        if (s.top <= probe) pjIdx = i;
      });
      setActiveProjectIdx(pjIdx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const interval = window.setInterval(refresh, 2000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.clearInterval(interval);
    };
  }, [onHome]);

  if (!onHome) return null;

  const goToChapter = (idx: number) => {
    const stop = chapterStops.current[idx];
    if (!stop) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, opts?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(stop.top, { duration: 1.5 });
    else window.scrollTo({ top: stop.top, behavior: "smooth" });
  };

  const goToProject = (idx: number) => {
    const stop = projectStops.current[idx];
    if (!stop) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, opts?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(stop.top - 40, { duration: 1.4 });
    else window.scrollTo({ top: stop.top - 40, behavior: "smooth" });
  };

  // Project list only expands while user is in the Work chapter.
  // "projects" is the 3rd chapter (index 2). Keep it open while active.
  const projectsExpanded = activeIdx === 2;

  return (
    <nav
      aria-label="Page progress"
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 md:flex"
    >
      <div className="pointer-events-auto flex items-center gap-4">
        {/* Unified index — chapters with projects nested under Work.

           Each button is a 2-column grid with a FIXED total width so that:
           - all labels right-align to the same X (right edge of col 1)
           - all numbers right-align to the same X (right edge of col 2)
           Width is sized for the longest item ("V&V Boutique") so chapter
           and project labels share one alignment column. */}
        <ul className="flex flex-col items-end gap-3">
          {CHAPTERS.map((c, i) => {
            const active = i === activeIdx;
            const isWork = c.id === "projects";
            return (
              <li key={c.id}>
                <RailItem
                  label={c.label}
                  short={c.short}
                  active={active}
                  onClick={() => goToChapter(i)}
                />

                {/* Project sub-list — only renders inside Work, animated open/close */}
                {isWork && (
                  <div
                    className="overflow-hidden transition-[max-height,opacity,margin] duration-700 ease-cinema"
                    style={{
                      maxHeight: projectsExpanded ? 200 : 0,
                      opacity: projectsExpanded ? 1 : 0,
                      marginTop: projectsExpanded ? 10 : 0,
                    }}
                  >
                    <ul className="flex flex-col items-end gap-2.5">
                      {PROJECTS.map((p, pi) => {
                        const pActive = pi === activeProjectIdx;
                        return (
                          <li key={p.id}>
                            <RailItem
                              label={p.label}
                              short={p.short}
                              active={pActive}
                              onClick={() => goToProject(pi)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        {/* Progress bar — grows with content so it can reach the nested items */}
        <div
          className="relative w-px bg-white/10 transition-[height] duration-700 ease-cinema"
          style={{ height: projectsExpanded ? 220 : 140 }}
        >
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full"
            style={{
              width: 3,
              height: `${progress * 100}%`,
              background:
                "linear-gradient(180deg, var(--accent), rgba(139,168,255,0.15))",
              boxShadow: "0 0 14px var(--accent)",
              transition: "height 400ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />
        </div>
      </div>
    </nav>
  );
}
