"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../system/SplitText";
import ProjectCTA from "./ProjectCTA";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function VVBoutique() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      const tall = root.current!.querySelector(".vv-tall") as HTMLElement | null;
      const wide = root.current!.querySelector(".vv-wide") as HTMLElement | null;
      if (tall) {
        gsap.fromTo(
          tall,
          { clipPath: "inset(50% 0% 50% 0%)" },
          {
            scrollTrigger: { trigger: tall, start: "top 80%", end: "top 30%", scrub: 1 },
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
          }
        );
      }
      if (wide) {
        gsap.fromTo(
          wide,
          { clipPath: "inset(0% 50% 0% 50%)" },
          {
            scrollTrigger: { trigger: wide, start: "top 80%", end: "top 30%", scrub: 1 },
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
          }
        );
      }
      gsap.to(root.current!.querySelector(".vv-num"), {
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
        yPercent: -40,
        ease: "none",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className="relative min-h-[100vh] w-full px-6 py-28 md:px-16 md:py-40"
    >
      <header className="mx-auto flex max-w-[1500px] items-center justify-between">
        <span className="mono opacity-70">Project · 01</span>
        <span className="mono opacity-70">Editorial / Boutique</span>
      </header>

      <div className="mx-auto mt-12 grid max-w-[1500px] grid-cols-12 gap-6 md:mt-16">
        {/* Tall portrait slot */}
        <div className="col-span-12 md:col-span-5">
          <div
            className="vv-tall slot"
            data-asset="vv-look-01"
            style={{ aspectRatio: "3 / 4.4", borderRadius: 4 }}
          />
        </div>

        {/* Headline + meta */}
        <div className="col-span-12 md:col-span-7 md:pl-8">
          <div className="vv-num display select-none" style={{ fontSize: "clamp(8rem, 18vw, 18rem)", lineHeight: 0.85, color: "rgba(245,245,243,0.08)", fontWeight: 400 }}>
            01
          </div>
          <SplitText
            as="h2"
            by="word"
            stagger={0.04}
            className="display mt-4"
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.05em",
              color: "var(--bone-50)",
              fontWeight: 300,
            }}
          >
            V&V Boutique
          </SplitText>
          <p className="mt-8 max-w-[44ch] text-[14px] leading-[1.7] text-bone-200/80">
            Editorial identity and digital flagship for a Ukrainian luxury fashion house.
            Slow horizontal lookbook movement, monochrome photography and oversized
            display type held the campaign together across web, print and look.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 text-[11px]">
            {[
              ["Year", "2025"],
              ["Role", "Brand · Web"],
              ["Scope", "Identity · Site · Lookbook"],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="eyebrow opacity-60">{k}</div>
                <div className="mt-2 text-bone-50">{v}</div>
              </div>
            ))}
          </div>

        </div>

        {/* Wide editorial slot */}
        <div className="col-span-12 mt-10 md:col-span-12">
          <div
            className="vv-wide slot"
            data-asset="vv-spread-02"
            style={{ aspectRatio: "16 / 7", borderRadius: 4 }}
          />
        </div>

        {/* Two square slots */}
        <div className="col-span-12 grid grid-cols-2 gap-6 mt-10 md:col-span-12 md:mt-12">
          <div className="slot" data-asset="vv-detail-03" style={{ aspectRatio: "1 / 1", borderRadius: 4 }} />
          <div className="slot" data-asset="vv-detail-04" style={{ aspectRatio: "1 / 1", borderRadius: 4 }} />
        </div>

        {/* Unified bottom CTA */}
        <div className="col-span-12">
          <ProjectCTA accent="neutral" />
        </div>
      </div>
    </div>
  );
}
