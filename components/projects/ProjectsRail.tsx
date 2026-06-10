"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VVBoutique from "./VVBoutique";
import Beextrart from "./Beextrart";
import NexGen from "./NexGen";
import RailBackground from "./RailBackground";
import RailBridge from "./RailBridge";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: { scrollTo: (t: HTMLElement | number, opts?: object) => void };
  }
}

/**
 * Bell-curve opacity around peak position. Width controls how broad the lobe is —
 * larger width = longer crossfade overlap with neighbouring projects.
 * Lower x^2 factor = softer falloff = more continuous gradient feel.
 */
function bell(progress: number, peak: number, width = 0.45): number {
  const x = (progress - peak) / width;
  // Wider, gentler gaussian — produces overlapping plateaus instead of distinct lobes
  return Math.max(0, Math.min(1, Math.exp(-x * x * 1.8)));
}

export default function ProjectsRail() {
  const root = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const sections = root.current!.querySelectorAll<HTMLElement>(".rail-section");
      const bg = bgRef.current;
      const layers = bg?.querySelectorAll<HTMLElement>(".bg-layer") ?? [];

      if (!bg || layers.length < 3) return;

      // Set initial state — layer 0 (VV) on, others off
      gsap.set(layers[0], { opacity: 1 });
      gsap.set(layers[1], { opacity: 0 });
      gsap.set(layers[2], { opacity: 0 });

      // Reduced motion: jump cuts via ScrollTrigger.toggle, no scrub
      if (reduce) {
        sections.forEach((s, i) => {
          ScrollTrigger.create({
            trigger: s,
            start: "top 60%",
            end: "bottom 40%",
            onToggle: (st) => {
              if (!st.isActive) return;
              layers.forEach((l, j) => gsap.set(l, { opacity: i === j ? 1 : 0 }));
            },
          });
        });
        return;
      }

      // === Master scrubbed crossfade across the entire rail ===
      // Wide bell-curve peaks with heavy overlap → reads as a continuous
      // gradient morphing through the rail, not three distinct stages.
      const compute = (p: number) => {
        const peaks = [0.25, 0.55, 0.82];
        // Width 0.45 is broad — every layer always has SOME opacity in the rail
        const raw = peaks.map((peak) => bell(p, peak, 0.45));
        const total = raw.reduce((a, b) => a + b, 0) || 1;
        return raw.map((v) => v / total);
      };

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        // Higher scrub = more lerp smoothing on bg opacity changes — colors
        // glide between projects instead of snapping with the scroll.
        scrub: 2.4,
        onUpdate: (st) => {
          // Long lazy enter/exit so the bg doesn't pop on/off at edges
          const enter = gsap.utils.clamp(0, 1, st.progress * 2.5);
          const exit = gsap.utils.clamp(0, 1, (1 - st.progress) * 2.5);
          const bgOpacity = Math.min(enter, exit);
          gsap.set(bg, { opacity: bgOpacity });

          const opacities = compute(st.progress);
          opacities.forEach((o, i) => gsap.set(layers[i], { opacity: o }));
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative w-full" aria-label="Selected work">
      <RailBackground ref={bgRef} />

      {/* Top fade — picks up from About's dark bottom and eases into rail bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 z-[1] h-[30vh]"
        style={{
          background:
            "linear-gradient(180deg, rgba(6,7,10,1) 0%, rgba(6,7,10,0.5) 60%, transparent 100%)",
        }}
      />

      {/* Intro panel */}
      <div className="relative z-[2] mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-10 px-6 pb-10 pt-32 md:px-12 md:pb-20 md:pt-44 md:flex-row md:items-end">
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

      {/* Project nav has moved into ScrollProgress so chapters and projects
          render as one continuous index on the right edge. */}

      {/* Project sections — all transparent so the unified bg shows through */}
      <div id="project-vv" className="rail-section relative z-[2]">
        <VVBoutique />
      </div>
      <div id="project-bee" className="rail-section relative z-[2]">
        <Beextrart />
      </div>
      <div id="project-nex" className="rail-section relative z-[2]">
        <NexGen />
      </div>

      {/* Bridge — projects flow into Contact as one continuous chapter, not a hard cut */}
      <RailBridge />
    </section>
  );
}
