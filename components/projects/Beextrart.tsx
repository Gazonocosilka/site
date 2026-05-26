"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../system/SplitText";
import ProjectCTA from "./ProjectCTA";
import Slot from "./Slot";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function Beextrart() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current!.querySelector(".bee-product"),
        { scale: 0.88, opacity: 0, filter: "blur(20px)" },
        {
          scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "expo.out",
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  const capsules = useMemo(
    () => [
      { label: "Volume · 02", x: "8%", y: "22%" },
      { label: "Lash · 14mm", x: "78%", y: "18%" },
      { label: "Gloss · 09", x: "82%", y: "70%" },
      { label: "Edition · Beauty", x: "6%", y: "72%" },
    ],
    []
  );

  return (
    <div
      ref={root}
      className="relative min-h-[100vh] w-full overflow-hidden px-6 py-28 md:px-16 md:py-40"
    >
      <header className="relative z-10 mx-auto flex max-w-[1500px] items-center justify-between">
        <span className="mono opacity-70">Project · 02</span>
        <span className="mono" style={{ color: "var(--glow-pink)", opacity: 0.85 }}>
          Beauty / Liquid Chrome
        </span>
      </header>

      <div className="relative z-10 mx-auto mt-20 grid max-w-[1500px] grid-cols-12 gap-6">
        <div className="col-span-12 text-center">
          <SplitText
            as="h2"
            stagger={0.025}
            className="display"
            style={{
              fontSize: "clamp(3.4rem, 11vw, 11rem)",
              lineHeight: 0.85,
              letterSpacing: "-0.06em",
              fontWeight: 300,
              color: "var(--bone-50)",
            }}
          >
            BEEXTRART
          </SplitText>
        </div>

        {/* Centered product slot framed in glass */}
        <div className="relative col-span-12 mt-8 flex justify-center md:mt-14">
          {/* Floating capsule labels */}
          {capsules.map((c) => (
            <div
              key={c.label}
              className="glass absolute z-20 hidden items-center gap-2.5 rounded-full px-5 py-3 text-[13px] uppercase tracking-[0.26em] md:inline-flex"
              style={{
                left: c.x,
                top: c.y,
                color: "var(--bone-50)",
                boxShadow: "0 0 36px rgba(255,222,233,0.28)",
                animation: "floatLabel 6s var(--ease-cinema) infinite",
              }}
            >
              <span
                aria-hidden
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--glow-pink)", boxShadow: "0 0 10px var(--glow-pink)" }}
              />
              {c.label}
            </div>
          ))}

          <div
            className="relative"
            style={{ width: "min(560px, 80vw)" }}
          >
            <Slot
              asset="bee-render-01"
              label="View product"
              className="bee-product relative"
              style={{
                aspectRatio: "3 / 4",
                borderRadius: 8,
                boxShadow: "0 0 120px rgba(255,222,233,0.15), inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            />
            {/* Glossy frame ring sits on top, but doesn't catch hover */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[12px]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,222,233,0.08) 50%, rgba(139,168,255,0.15))",
                opacity: 0.5,
                filter: "blur(0.5px)",
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            />
          </div>
        </div>

        {/* Description + meta */}
        <div className="col-span-12 mt-16 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-7">
            <p className="max-w-[52ch] text-[16px] leading-[1.65] text-bone-200/90">
              A futuristic beauty system for a bold lash brand —
              translating high-shine product surfaces into a glossy,
              campaign-driven digital experience.
              Liquid chrome backgrounds, holographic micro-labels and a
              soft pink accent thread the visual story together.
            </p>
          </div>
          <div className="col-span-12 grid grid-cols-3 gap-6 text-[14px] md:col-span-5">
            {[
              ["Year", "2025"],
              ["Role", "Brand · Direction"],
              ["Sector", "Beauty"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="eyebrow opacity-75">{k}</div>
                <div className="mt-2.5 text-bone-50 font-medium">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Two product capture slots */}
        <div className="col-span-12 mt-12 grid grid-cols-2 gap-6">
          <Slot asset="bee-shot-02" style={{ aspectRatio: "4 / 3", borderRadius: 4 }} />
          <Slot asset="bee-shot-03" style={{ aspectRatio: "4 / 3", borderRadius: 4 }} />
        </div>

        {/* Unified bottom CTA */}
        <div className="col-span-12">
          <ProjectCTA accent="pink" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes floatLabel {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
