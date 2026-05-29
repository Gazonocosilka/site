"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const CHAPTERS = [
  { id: "hero", label: "Entrance", short: "01" },
  { id: "about", label: "Field Notes", short: "02" },
  { id: "projects", label: "Work", short: "03" },
  { id: "contact", label: "Outro", short: "04" },
];

/**
 * Fixed right-edge scroll progress indicator with chapter labels.
 * - Shows the user where they are in the journey at all times.
 * - Each chapter label is clickable and smoothly scrolls there.
 * - Updates a thin vertical bar in real time based on document progress.
 */
export default function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const stops = useRef<Array<{ id: string; top: number }>>([]);
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const refresh = () => {
      const map: Array<{ id: string; top: number }> = [];
      // hero is the first <section>
      const sections = document.querySelectorAll<HTMLElement>("section");
      sections.forEach((s) => {
        const id = s.getAttribute("aria-label") || s.tagName.toLowerCase();
        let key = "";
        if (s.classList.contains("ambient-bg") && s.querySelector("h1")) key = "hero";
        else if (s.querySelector('[class*="floating digital archive"]') || s.querySelector("h2")?.textContent?.includes("designer")) key = "about";
        else if (id === "Selected work") key = "projects";
        else if (s.querySelector("h2")?.textContent?.toLowerCase().includes("create")) key = "contact";
        if (key) map.push({ id: key, top: window.scrollY + s.getBoundingClientRect().top });
      });
      // fallback ordering by document position if heuristic missed
      if (map.length < 4) {
        map.length = 0;
        sections.forEach((s, i) => {
          const id = CHAPTERS[i]?.id;
          if (id) map.push({ id, top: window.scrollY + s.getBoundingClientRect().top });
        });
      }
      stops.current = map;
    };

    refresh();
    const onResize = () => refresh();
    window.addEventListener("resize", onResize, { passive: true });

    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(Math.min(1, Math.max(0, y / Math.max(1, docH))));
      // find active section: last stop whose top <= y + viewport/3
      const probe = y + window.innerHeight / 3;
      let idx = 0;
      stops.current.forEach((s, i) => {
        if (s.top <= probe) idx = i;
      });
      setActiveIdx(idx);
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

  const goTo = (idx: number) => {
    const stop = stops.current[idx];
    if (!stop) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, opts?: object) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(stop.top, { duration: 1.5 });
    } else {
      window.scrollTo({ top: stop.top, behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Page progress"
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 md:flex"
    >
      <div className="pointer-events-auto flex items-center gap-4">
        {/* Chapter labels (rotated) */}
        <ul className="flex flex-col items-end gap-5">
          {CHAPTERS.map((c, i) => {
            const active = i === activeIdx;
            return (
              <li key={c.id}>
                <button
                  onClick={() => goTo(i)}
                  data-cursor="hover"
                  data-cursor-label="jump"
                  className="group flex items-baseline gap-2 transition-opacity duration-500 ease-cinema"
                  style={{ opacity: active ? 1 : 0.4 }}
                >
                  <span
                    className="mono whitespace-nowrap transition-all duration-500 group-hover:tracking-[0.32em]"
                    style={{
                      color: active ? "var(--bone-50)" : "var(--bone-200)",
                      fontSize: 11,
                    }}
                  >
                    {c.label}
                  </span>
                  <span
                    className="mono opacity-50"
                    style={{ fontSize: 9 }}
                  >
                    {c.short}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Progress bar */}
        <div className="relative h-[140px] w-px bg-white/10">
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
