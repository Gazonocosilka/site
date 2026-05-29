"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../system/SplitText";
import AboutNow from "./AboutNow";

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

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  // Background word drifts very slightly with scroll for parallax
  useEffect(() => {
    if (!root.current || !wordRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.to(wordRef.current, {
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        yPercent: -10,
        xPercent: 4,
        ease: "none",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative min-h-[120vh] w-full overflow-hidden py-32 md:py-48"
    >
      {/* Top fade — picks up from where the Hero faded out, gradually reveals About */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-[30vh]"
        style={{
          background:
            "linear-gradient(180deg, #050505 0%, rgba(5,5,5,0.4) 60%, transparent 100%)",
        }}
      />
      {/* Bottom fade — About dissolves into Projects rail atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[35vh]"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(6,7,10,0.55) 55%, rgba(6,7,10,1) 100%)",
        }}
      />

      {/* Giant faded backdrop word — editorial texture, never competes with text */}
      <div
        ref={wordRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
      >
        <span
          className="display select-none whitespace-nowrap"
          style={{
            fontSize: "clamp(8rem, 24vw, 22rem)",
            fontWeight: 500,
            letterSpacing: "-0.05em",
            lineHeight: 0.85,
            color: "rgba(245, 245, 243, 0.028)",
          }}
        >
          FIELD NOTES
        </span>
      </div>

      {/* Section eyebrows */}
      <div className="relative z-[3] mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
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
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
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

        {/* Live status strip — what I'm actually doing right now */}
        <AboutNow />
      </div>
    </section>
  );
}
