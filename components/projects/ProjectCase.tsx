"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../system/SplitText";
import Slot from "./Slot";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Accent = "neutral" | "pink" | "blue";

const ACCENT_COLOR: Record<Accent, string> = {
  neutral: "var(--bone-50)",
  pink: "var(--glow-pink)",
  blue: "var(--glow-blue)",
};

const ACCENT_SHADOW: Record<Accent, string> = {
  neutral: "rgba(245,245,243,0.30)",
  pink: "rgba(255,222,233,0.45)",
  blue: "rgba(139,168,255,0.50)",
};

export interface ProjectCaseProps {
  index: string;           // "01" / "02" / "03"
  genre: string;           // "Editorial · Boutique"
  title: string;           // "V&V Boutique"
  description: string;     // long-form copy
  meta: Array<[string, string]>; // [["Year", "2025"], ["Role", "Brand · Web"], ...]
  asset: string;           // slot data-asset key
  href?: string;           // case study URL
  accent?: Accent;
}

/**
 * One unified template for every project case study.
 * Same structure across all three projects — only colour accent + content changes.
 *
 * Layout:
 *   header (Project · 0X | Genre)
 *   display title
 *   ONE preview image slot
 *   description (left col) + meta (right col)
 *   "View case →" link under description
 */
export default function ProjectCase({
  index,
  genre,
  title,
  description,
  meta,
  asset,
  href = "#",
  accent = "neutral",
}: ProjectCaseProps) {
  const root = useRef<HTMLDivElement>(null);
  const accentColor = ACCENT_COLOR[accent];
  const accentShadow = ACCENT_SHADOW[accent];

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        root.current!.querySelector(".case-preview"),
        { y: 60, opacity: 0, filter: "blur(14px)" },
        {
          scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "expo.out",
        }
      );
      gsap.to(root.current!.querySelector(".case-num"), {
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
      className="relative min-h-[100vh] w-full px-6 py-24 md:px-16 md:py-32"
    >
      <header className="mx-auto flex max-w-[1400px] items-center justify-between">
        <span className="mono opacity-70">Project · {index}</span>
        <span className="mono opacity-80" style={{ color: accentColor }}>{genre}</span>
      </header>

      <div className="mx-auto mt-10 grid max-w-[1400px] grid-cols-12 gap-6 md:mt-16">
        {/* Title row with oversized number */}
        <div className="relative col-span-12 md:col-span-12">
          <span
            className="case-num display pointer-events-none absolute -top-4 right-0 select-none md:-top-10"
            style={{
              fontSize: "clamp(7rem, 16vw, 16rem)",
              lineHeight: 0.85,
              color: "rgba(245,245,243,0.06)",
              fontWeight: 400,
            }}
          >
            {index}
          </span>
          <SplitText
            as="h2"
            stagger={0.035}
            className="display relative"
            style={{
              fontSize: "clamp(3rem, 9vw, 8rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.05em",
              fontWeight: 300,
              color: "var(--bone-50)",
            }}
          >
            {title}
          </SplitText>
        </div>

        {/* Single preview slot */}
        <div className="col-span-12 mt-8 md:mt-12">
          <div
            className="case-preview relative"
            style={{
              boxShadow: `0 30px 100px rgba(0,0,0,0.55), 0 0 80px ${accentShadow}`,
            }}
          >
            <Slot
              asset={asset}
              href={href}
              label="View case"
              style={{ aspectRatio: "16 / 9", borderRadius: 6 }}
            />
          </div>
        </div>

        {/* Description (left) + meta (right) */}
        <div className="col-span-12 mt-12 grid grid-cols-12 gap-6 md:mt-20">
          <div className="col-span-12 md:col-span-7">
            <p className="max-w-[56ch] text-[16px] leading-[1.65] text-bone-200/90">
              {description}
            </p>
            {/* View case link, sits UNDER the description */}
            <a
              href={href}
              data-cursor="view"
              data-cursor-label="open"
              className="group mt-8 inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.32em] transition-all duration-500"
              style={{ color: accentColor }}
            >
              <span className="relative">
                View case
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 block h-px w-full origin-left scale-x-100 transition-transform duration-700 ease-cinema group-hover:scale-x-100"
                  style={{ background: accentColor, opacity: 0.5 }}
                />
              </span>
              <span
                aria-hidden
                className="text-[14px] leading-none transition-transform duration-500 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>

          <div className="col-span-12 grid grid-cols-3 gap-6 text-[14px] md:col-span-5">
            {meta.map(([k, v]) => (
              <div key={k}>
                <div className="eyebrow opacity-75">{k}</div>
                <div className="mt-2.5 font-medium text-bone-50">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
