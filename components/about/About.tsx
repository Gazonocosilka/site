"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../system/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LINES = [
  "I'm a designer based in London,",
  "studying at University of the Arts London.",
  "I build digital experiences",
  "that feel cinematic, emotional",
  "and visually unforgettable.",
];

interface FloatingCard {
  label: string;
  detail: string;
  x: string;
  y: string;
  rot: number;
  w: string;
  h: string;
  variant: "wire" | "type" | "swatch" | "grid";
}

const CARDS: FloatingCard[] = [
  { label: "wireframe · home", detail: "v04", x: "8%", y: "14%", rot: -7, w: "180px", h: "120px", variant: "wire" },
  { label: "type · display", detail: "Gambarino · 96", x: "72%", y: "10%", rot: 5, w: "220px", h: "100px", variant: "type" },
  { label: "palette · cinema", detail: "5 · stops", x: "78%", y: "62%", rot: -4, w: "190px", h: "70px", variant: "swatch" },
  { label: "grid · 12 col", detail: "1440 · 80", x: "5%", y: "68%", rot: 6, w: "200px", h: "130px", variant: "grid" },
  { label: "sketch · logo·v2", detail: "ink · b", x: "55%", y: "78%", rot: -2, w: "150px", h: "150px", variant: "wire" },
];

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Drift cards on scroll
      const cards = cardsRef.current?.querySelectorAll<HTMLElement>(".about-card") ?? [];
      cards.forEach((c, i) => {
        gsap.to(c, {
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
          y: (i % 2 === 0 ? -1 : 1) * (60 + i * 30),
          x: (i % 2 === 0 ? 1 : -1) * 30,
          rotate: `+=${(i % 2 === 0 ? -1 : 1) * 4}`,
          ease: "none",
        });
      });

      // Reveal cards on enter
      gsap.from(cards, {
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
        opacity: 0,
        y: 60,
        scale: 0.85,
        rotate: 0,
        filter: "blur(20px)",
        duration: 1.4,
        ease: "expo.out",
        stagger: 0.12,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[120vh] w-full overflow-hidden ambient-bg py-32 md:py-48"
    >
      {/* Section eyebrows */}
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        <span className="mono opacity-60">Ch.02 — Field Notes</span>
        <span className="mono opacity-60">About</span>
      </div>

      {/* Lead copy */}
      <div className="relative z-10 mx-auto mt-20 max-w-[1100px] px-6 md:mt-28 md:px-12">
        <div
          className="display"
          style={{
            fontSize: "clamp(2.4rem, 5.6vw, 5.4rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            color: "var(--bone-50)",
          }}
        >
          {LINES.map((line, i) => (
            <SplitText
              key={i}
              as="div"
              by="word"
              delay={i * 0.05}
              stagger={0.025}
              start="top 80%"
              className="overflow-hidden"
            >
              {line}
            </SplitText>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:mt-24 md:grid-cols-2 md:gap-20">
          <div>
            <div className="eyebrow mb-4">Practice</div>
            <p className="max-w-[42ch] text-[15px] leading-[1.7] text-bone-200/80">
              I move between brand identity, web and product —
              treating every screen like a frame in a film.
              My work sits where editorial discipline meets
              experimental UI: futurist, but human.
            </p>
          </div>
          <div>
            <div className="eyebrow mb-4">Currently</div>
            <p className="max-w-[42ch] text-[15px] leading-[1.7] text-bone-200/80">
              Studying at UAL · open to commissions in identity,
              digital direction and interface design ·
              taking on selected studio collaborations.
            </p>
          </div>
        </div>

        {/* Signature mark */}
        <div className="mt-20 flex items-center gap-5">
          <svg width="86" height="40" viewBox="0 0 86 40" fill="none">
            <path
              d="M3 28 C 12 4, 22 36, 32 16 S 52 32, 60 14 78 30, 84 18"
              stroke="var(--bone-50)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: 200,
                animation: "drawSig 2.4s var(--ease-cinema) 0.3s forwards",
              }}
            />
          </svg>
          <div className="mono opacity-60">Inna · 2026</div>
        </div>
      </div>

      {/* Floating archive cards */}
      <div ref={cardsRef} className="pointer-events-none absolute inset-0 z-[1]">
        {CARDS.map((c, i) => (
          <div
            key={i}
            className="about-card glass absolute"
            style={{
              left: c.x,
              top: c.y,
              width: c.w,
              height: c.h,
              transform: `rotate(${c.rot}deg)`,
              borderRadius: 6,
              padding: 14,
            }}
          >
            <CardArt variant={c.variant} />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="mono text-[8px] opacity-70">{c.label}</span>
              <span className="mono text-[8px] opacity-50">{c.detail}</span>
            </div>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes drawSig {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}

function CardArt({ variant }: { variant: FloatingCard["variant"] }) {
  if (variant === "wire") {
    return (
      <svg width="100%" height="78%" viewBox="0 0 160 100" className="opacity-70">
        <rect x="6" y="6" width="148" height="14" stroke="white" strokeOpacity="0.55" fill="none" />
        <rect x="6" y="26" width="92" height="40" stroke="white" strokeOpacity="0.4" fill="none" />
        <rect x="104" y="26" width="50" height="40" stroke="white" strokeOpacity="0.4" fill="none" />
        <line x1="6" y1="74" x2="154" y2="74" stroke="white" strokeOpacity="0.3" />
        <line x1="6" y1="84" x2="120" y2="84" stroke="white" strokeOpacity="0.2" />
      </svg>
    );
  }
  if (variant === "type") {
    return (
      <div className="flex h-[70%] items-center">
        <span
          className="display"
          style={{ fontSize: 56, lineHeight: 1, color: "var(--bone-50)" }}
        >
          Aa
        </span>
        <span
          className="ml-3 display"
          style={{ fontSize: 24, lineHeight: 1, color: "var(--bone-200)" }}
        >
          Gg
        </span>
      </div>
    );
  }
  if (variant === "swatch") {
    return (
      <div className="flex h-[60%] gap-1.5">
        {["#050505", "#161618", "#7A7F87", "#8BA8FF", "#F5F5F3"].map((c) => (
          <div
            key={c}
            className="flex-1 rounded-[2px]"
            style={{ background: c, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
          />
        ))}
      </div>
    );
  }
  return (
    <svg width="100%" height="78%" viewBox="0 0 160 100" className="opacity-50">
      {Array.from({ length: 13 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 13} y1={0} x2={i * 13} y2={100} stroke="white" strokeOpacity="0.18" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} y1={i * 14} x1={0} y2={i * 14} x2={160} stroke="white" strokeOpacity="0.12" />
      ))}
    </svg>
  );
}
