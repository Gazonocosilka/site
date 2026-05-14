"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../system/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const ROLES = [
  "UI / UX Designer",
  "Web Designer",
  "Brand Identity Designer",
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);

  // Cycle role chip
  useEffect(() => {
    const id = window.setInterval(() => {
      setRoleIdx((i) => (i + 1) % ROLES.length);
    }, 2400);
    return () => window.clearInterval(id);
  }, []);

  // Hero scroll-out: title splits & blurs, scene zooms forward, content lifts
  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        yPercent: -30,
        scale: 1.15,
        opacity: 0,
        filter: "blur(14px)",
        ease: "none",
      });
      gsap.to(sceneRef.current, {
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        scale: 1.18,
        opacity: 0.4,
        ease: "none",
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden ambient-bg"
    >
      <div ref={sceneRef} className="absolute inset-0 will-change-transform">
        <HeroScene />
      </div>

      {/* Top bar */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-10">
        <div className="mono opacity-70">Inna · Portfolio · 2026</div>
        <div className="mono hidden opacity-70 md:block">London / UAL</div>
      </div>

      {/* Side eyebrows */}
      <div className="pointer-events-none absolute bottom-12 left-6 z-10 hidden text-[10px] uppercase tracking-[0.32em] text-bone-400 md:block md:left-12">
        Ch.01 — Entrance
      </div>
      <div className="pointer-events-none absolute bottom-12 right-6 z-10 hidden text-[10px] uppercase tracking-[0.32em] text-bone-400 md:block md:right-12">
        Scroll · Begin
      </div>

      {/* Centered editorial title */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-center px-6 text-center will-change-transform"
      >
        <div
          className="eyebrow mb-6 opacity-70"
          style={{ color: "var(--bone-400)" }}
        >
          Designer · Studying at UAL · London
        </div>

        <SplitText
          as="h1"
          trigger="load"
          delay={0.15}
          stagger={0.045}
          className="display select-none"
          style={{
            fontSize: "clamp(5rem, 14vw, 14rem)",
            fontWeight: 200,
            lineHeight: 0.88,
            letterSpacing: "-0.06em",
            color: "var(--bone-50)",
          }}
        >
          INNA
        </SplitText>

        <SplitText
          as="div"
          trigger="load"
          delay={0.65}
          stagger={0.012}
          by="word"
          className="mt-6 max-w-xl text-balance text-[13px] uppercase leading-relaxed tracking-[0.3em] text-bone-200/80"
        >
          Designing digital experiences that feel cinematic, emotional and unforgettable.
        </SplitText>

        {/* Rotating role chip */}
        <div className="glass relative mt-10 overflow-hidden rounded-full px-5 py-2.5">
          <div className="relative h-[14px] w-[220px] overflow-hidden text-center md:w-[260px]">
            {ROLES.map((r, i) => (
              <span
                key={r}
                className="absolute inset-0 flex items-center justify-center text-[11px] uppercase tracking-[0.28em] transition-all duration-700 ease-cinema"
                style={{
                  color: "var(--bone-50)",
                  transform:
                    i === roleIdx
                      ? "translateY(0%)"
                      : i === (roleIdx - 1 + ROLES.length) % ROLES.length
                      ? "translateY(-110%)"
                      : "translateY(110%)",
                  opacity: i === roleIdx ? 1 : 0,
                  filter: i === roleIdx ? "blur(0)" : "blur(6px)",
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center md:bottom-10">
        <div className="mono mb-3 opacity-60">scroll</div>
        <div className="relative mx-auto h-10 w-px overflow-hidden bg-white/10">
          <span
            className="absolute left-0 top-0 h-1/3 w-full"
            style={{
              background: "linear-gradient(180deg, var(--accent), transparent)",
              animation: "scrollCue 2.4s var(--ease-cinema) infinite",
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scrollCue {
          0% { transform: translateY(-100%); opacity: 0; }
          25% { opacity: 1; }
          100% { transform: translateY(300%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
