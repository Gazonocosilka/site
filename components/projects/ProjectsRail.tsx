"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VVBoutique from "./VVBoutique";
import Beextrart from "./Beextrart";
import NexGen from "./NexGen";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: "vv", title: "V&V Boutique" },
  { id: "bee", title: "Beextrart" },
  { id: "nex", title: "NexGen" },
];

export default function ProjectsRail() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const sections = root.current!.querySelectorAll<HTMLElement>(".rail-section");
      sections.forEach((s, i) => {
        ScrollTrigger.create({
          trigger: s,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (st) => {
            if (st.isActive) setActive(i);
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative w-full" aria-label="Selected work">
      {/* Intro panel */}
      <div className="relative mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-10 px-6 pb-10 pt-32 md:px-12 md:pb-20 md:pt-44 md:flex-row md:items-end">
        <div>
          <div className="mono opacity-60">Ch.03 — Selected Work</div>
          <h2
            className="display mt-6"
            style={{
              fontSize: "clamp(2.6rem, 6.5vw, 6.5rem)",
              lineHeight: 0.95,
              fontWeight: 300,
              letterSpacing: "-0.04em",
            }}
          >
            Three worlds.<br />Three identities.
          </h2>
        </div>
        <div className="max-w-[40ch] text-[14px] leading-[1.7] text-bone-200/75">
          Each project lives in its own atmosphere — different lighting,
          motion language, and grammar.
          Scroll through to enter each one.
        </div>
      </div>

      {/* Sticky side index */}
      <div className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <div className="flex flex-col gap-3">
          {PROJECTS.map((p, i) => (
            <div key={p.id} className="flex items-center gap-3">
              <span
                className="block h-px transition-all duration-700 ease-cinema"
                style={{
                  width: i === active ? 36 : 12,
                  background: i === active ? "var(--accent)" : "rgba(255,255,255,0.25)",
                }}
              />
              <span
                className="mono transition-opacity duration-500"
                style={{ opacity: i === active ? 1 : 0.35, color: "var(--bone-50)" }}
              >
                0{i + 1} · {p.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Project sections */}
      <div className="rail-section">
        <VVBoutique />
      </div>
      <div className="rail-section">
        <Beextrart />
      </div>
      <div className="rail-section">
        <NexGen />
      </div>
    </section>
  );
}
