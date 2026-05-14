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

declare global {
  interface Window {
    __lenis?: { scrollTo: (t: HTMLElement | number, opts?: object) => void };
  }
}

export default function ProjectsRail() {
  const root = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const sections = root.current!.querySelectorAll<HTMLElement>(".rail-section");
      const layers = bgRef.current?.querySelectorAll<HTMLElement>(".bg-layer") ?? [];

      // Unified background fades in once we enter the rail and out when we leave
      if (bgRef.current) {
        gsap.set(bgRef.current, { opacity: 0 });
        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "top 60%",
          scrub: 1,
          onUpdate: (st) => gsap.set(bgRef.current, { opacity: st.progress }),
        });
        ScrollTrigger.create({
          trigger: root.current,
          start: "bottom 80%",
          end: "bottom 30%",
          scrub: 1,
          onUpdate: (st) => gsap.set(bgRef.current, { opacity: 1 - st.progress }),
        });
      }

      sections.forEach((s, i) => {
        // Activate side index
        ScrollTrigger.create({
          trigger: s,
          start: "top 50%",
          end: "bottom 50%",
          onToggle: (st) => {
            if (st.isActive) setActive(i);
          },
        });

        // Crossfade the unified background layer for this project
        if (layers[i]) {
          gsap.set(layers[i], { opacity: i === 0 ? 1 : 0 });
          ScrollTrigger.create({
            trigger: s,
            start: "top 80%",
            end: "top 30%",
            scrub: reduce ? false : 1.4,
            onUpdate: (st) => {
              gsap.set(layers[i], { opacity: st.progress });
              if (i > 0) gsap.set(layers[i - 1], { opacity: 1 - st.progress });
            },
          });
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const goTo = (idx: number) => {
    const el = document.getElementById(`project-${PROJECTS[idx].id}`);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -40, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section ref={root} className="relative w-full" aria-label="Selected work">
      {/* Unified moving background — visible only while the projects rail is on screen */}
      <div
        ref={bgRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 will-change-[opacity]"
      >
        {/* Base atmospheric layer always present underneath */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(122,127,135,0.10), transparent 70%), linear-gradient(180deg, #06070a 0%, #08090d 50%, #06070a 100%)",
          }}
        />

        {/* Layer 0 — V&V Boutique mood (editorial / soft white spotlight) */}
        <div
          className="bg-layer absolute inset-0 transition-opacity"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 30% 30%, rgba(245,245,243,0.06), transparent 70%), radial-gradient(ellipse 50% 60% at 80% 80%, rgba(201,199,194,0.05), transparent 70%)",
          }}
        />

        {/* Layer 1 — BEEXTRART mood (chrome with pink + violet glow) */}
        <div
          className="bg-layer absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,222,233,0.08), transparent 70%), radial-gradient(ellipse 80% 60% at 80% 70%, rgba(183,167,255,0.10), transparent 70%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(214,214,255,0.06), transparent 70%)",
          }}
        />

        {/* Layer 2 — NexGen mood (electric blue grid wash) */}
        <div
          className="bg-layer absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(139,168,255,0.12), transparent 70%), radial-gradient(ellipse 50% 80% at 100% 100%, rgba(139,168,255,0.07), transparent 70%)",
          }}
        />

        {/* Animated grid overlay — feels like a continuous techno surface drifting under all 3 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,168,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,168,255,0.04) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
            maskImage:
              "radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 80%)",
            animation: "gridDrift 60s linear infinite",
          }}
        />

        {/* Soft moving glow — sweeps slowly across, ties the three sections together */}
        <div
          className="absolute -inset-[10%]"
          style={{
            background:
              "radial-gradient(circle 30vmax at 50% 50%, rgba(139,168,255,0.06), transparent 70%)",
            animation: "ambientGlow 14s var(--ease-cinema) infinite alternate",
            filter: "blur(40px)",
          }}
        />
      </div>

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

      {/* Sticky clickable side index */}
      <div className="pointer-events-none fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 md:block">
        <nav className="flex flex-col gap-2 pointer-events-auto" aria-label="Project navigation">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              data-cursor="hover"
              data-cursor-label="jump"
              className="group flex items-center gap-3 py-1 text-left transition-opacity duration-500 ease-cinema"
              style={{ opacity: i === active ? 1 : 0.45 }}
            >
              <span
                className="block h-px transition-all duration-700 ease-cinema group-hover:!w-[44px]"
                style={{
                  width: i === active ? 36 : 12,
                  background: i === active ? "var(--accent)" : "rgba(255,255,255,0.4)",
                }}
              />
              <span
                className="mono whitespace-nowrap transition-all duration-500 group-hover:tracking-[0.32em] group-hover:text-bone-50"
                style={{ color: i === active ? "var(--bone-50)" : "var(--bone-200)" }}
              >
                0{i + 1} · {p.title}
              </span>
            </button>
          ))}
        </nav>
      </div>

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

      <style jsx global>{`
        @keyframes gridDrift {
          from { background-position: 0 0, 0 0; }
          to { background-position: 120px 120px, 120px 120px; }
        }
        @keyframes ambientGlow {
          from { transform: translate(-10%, -10%) scale(1); }
          to { transform: translate(10%, 10%) scale(1.15); }
        }
      `}</style>
    </section>
  );
}
