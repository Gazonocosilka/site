"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../system/SplitText";
import ProjectCTA from "./ProjectCTA";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function NexGen() {
  const root = useRef<HTMLDivElement>(null);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          setGlitch(true);
          setTimeout(() => setGlitch(false), 700);
        },
      });

      const cards = root.current!.querySelectorAll<HTMLElement>(".nex-cell");
      gsap.from(cards, {
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        y: 80,
        opacity: 0,
        filter: "blur(14px)",
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.07,
      });

      // Subtle parallax on big number
      gsap.to(root.current!.querySelector(".nex-num"), {
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
        yPercent: -30,
        ease: "none",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative min-h-[100vh] w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
    >
      <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between">
        <span className="mono opacity-70">Project · 03</span>
        <span className="mono" style={{ color: "var(--glow-blue)", opacity: 0.85 }}>
          Sys · NexGen / Futurist
        </span>
      </header>

      <div className="relative z-10 mx-auto mt-12 grid max-w-[1500px] grid-cols-12 gap-6 md:mt-20">
        <div className="col-span-12 md:col-span-9">
          <div
            className={`relative inline-block ${glitch ? "glitch" : ""}`}
            style={{ width: "100%" }}
          >
            <SplitText
              as="h2"
              stagger={0.025}
              className="display"
              style={{
                fontSize: "clamp(3rem, 11vw, 11rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                fontWeight: 300,
                color: "var(--bone-50)",
              }}
            >
              NexGen
            </SplitText>
          </div>
          <p className="mt-8 max-w-[60ch] text-[14px] leading-[1.7] text-bone-200/85">
            A futurist design agency identity built like an operating system —
            modular grids, AI-flavoured iconography, sharp brutalist type
            and a dark interface vocabulary. The site reads like a console
            you've stepped inside.
          </p>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="nex-num display select-none text-right" style={{ fontSize: "clamp(8rem, 16vw, 18rem)", lineHeight: 0.85, color: "rgba(245,245,243,0.06)", fontWeight: 400 }}>
            03
          </div>
        </div>

        {/* 3x2 grid of UI capture slots */}
        <div className="col-span-12 mt-8 grid grid-cols-2 gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="nex-cell relative bevel"
              style={{ borderRadius: 2 }}
            >
              <div
                className="slot"
                data-asset={`nex-ui-${String(i + 1).padStart(2, "0")}`}
                style={{ aspectRatio: "16 / 11", borderRadius: 2 }}
              />
              {/* Registration marks */}
              {[
                { top: -6, left: -6 },
                { top: -6, right: -6 },
                { bottom: -6, left: -6 },
                { bottom: -6, right: -6 },
              ].map((m, j) => (
                <span
                  key={j}
                  className="pointer-events-none absolute h-3 w-3 border-white/30"
                  style={{
                    ...m,
                    borderTopWidth: m.top !== undefined ? 1 : 0,
                    borderBottomWidth: m.bottom !== undefined ? 1 : 0,
                    borderLeftWidth: m.left !== undefined ? 1 : 0,
                    borderRightWidth: m.right !== undefined ? 1 : 0,
                  }}
                />
              ))}
              <div className="absolute left-2 top-2 z-10 flex items-center gap-1.5">
                <span className="mono text-[8px] opacity-60">CH·{String(i + 1).padStart(2, "0")}</span>
                <span className="block h-1 w-1 rounded-full" style={{ background: "var(--glow-blue)" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Console-style readouts */}
        <div className="col-span-12 mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            ["UPTIME", "99.92%"],
            ["FRAMES", "60 / s"],
            ["MODULES", "14 active"],
            ["BUILD", "v2.6.1"],
          ].map(([k, v]) => (
            <div key={k} className="bevel rounded-[2px] p-3">
              <div className="mono text-[8px] opacity-60">{k}</div>
              <div className="mt-2 text-[14px] tracking-[0.04em] text-bone-50">{v}</div>
              <div className="mt-2 h-px w-full overflow-hidden bg-white/5">
                <span
                  className="block h-full"
                  style={{
                    width: "60%",
                    background: "linear-gradient(90deg, var(--glow-blue), transparent)",
                    animation: "pulseBar 3.4s var(--ease-cinema) infinite",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="col-span-12 mt-12">
          <div className="grid grid-cols-3 gap-6 text-[11px]">
            {[
              ["Year", "2026"],
              ["Role", "Identity · Direction"],
              ["Sector", "Tech"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="eyebrow opacity-60">{k}</div>
                <div className="mt-2 text-bone-50">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Unified bottom CTA */}
        <div className="col-span-12">
          <ProjectCTA accent="blue" />
        </div>
      </div>

      <style jsx global>{`
        .glitch {
          animation: rgbSplit 0.7s steps(8, end) 1;
        }
        @keyframes rgbSplit {
          0% { text-shadow: 0 0 0 transparent; transform: translateX(0); }
          15% { text-shadow: -3px 0 var(--glow-blue), 3px 0 var(--glow-violet); transform: translateX(-2px); }
          30% { text-shadow: 4px 0 var(--glow-blue), -4px 0 var(--glow-violet); transform: translateX(2px); }
          50% { text-shadow: -2px 0 var(--glow-blue), 2px 0 var(--glow-violet); transform: translateX(0); }
          100% { text-shadow: 0 0 0 transparent; transform: translateX(0); }
        }
        @keyframes pulseBar {
          0%, 100% { transform: translateX(-30%); opacity: 0.3; }
          50% { transform: translateX(40%); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
