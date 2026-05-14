"use client";

import { useEffect, useRef } from "react";
import SplitText from "../system/SplitText";
import MagneticButton from "../system/MagneticButton";

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:inka3553@gmail.com" },
];

export default function Contact() {
  const root = useRef<HTMLDivElement>(null);
  const rainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = rainRef.current;
    if (!c) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      c.width = window.innerWidth;
      c.height = c.parentElement?.clientHeight ?? window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const N = reduce ? 0 : 80;
    const drops = Array.from({ length: N }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      v: 0.8 + Math.random() * 1.6,
      l: 12 + Math.random() * 30,
      a: 0.06 + Math.random() * 0.12,
    }));

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.lineWidth = 1;
      drops.forEach((d) => {
        ctx.strokeStyle = `rgba(214,214,255,${d.a})`;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.l);
        ctx.stroke();
        d.y += d.v;
        if (d.y > c.height) {
          d.y = -d.l;
          d.x = Math.random() * c.width;
        }
      });
      raf = requestAnimationFrame(tick);
    };
    if (!reduce) tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "110vh",
        background:
          "radial-gradient(ellipse 90% 60% at 50% 100%, rgba(139,168,255,0.18), transparent 70%), linear-gradient(180deg, #050505 0%, #08080c 60%, #0c0a14 100%)",
      }}
    >
      {/* Digital rain canvas */}
      <canvas
        ref={rainRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      />

      {/* Bottom horizon glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[40%]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(183,167,255,0.4), transparent 80%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[110vh] max-w-[1500px] flex-col items-center justify-center px-6 py-32 text-center md:px-12">
        <div className="mono mb-10 opacity-60">Ch.04 — Outro</div>

        <SplitText
          as="h2"
          stagger={0.022}
          className="display"
          style={{
            fontSize: "clamp(2.6rem, 9vw, 9rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            fontWeight: 200,
            color: "var(--bone-50)",
          }}
        >
          Let's create something
        </SplitText>
        <SplitText
          as="h2"
          stagger={0.022}
          delay={0.12}
          className="display italic"
          style={{
            fontSize: "clamp(2.6rem, 9vw, 9rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.05em",
            fontWeight: 200,
            color: "var(--bone-50)",
          }}
        >
          unforgettable.
        </SplitText>

        <div className="mt-16">
          <MagneticButton
            as="a"
            href="mailto:inka3553@gmail.com"
            cursor="view"
            cursorLabel="write"
            strength={0.45}
            className="glass inline-flex items-center gap-4 rounded-full px-8 py-5 text-[12px] uppercase tracking-[0.32em] text-bone-50"
            style={{ boxShadow: "0 0 60px var(--accent-soft)" }}
          >
            <span
              className="block h-2 w-2 rounded-full"
              style={{ background: "var(--accent)", boxShadow: "0 0 14px var(--accent)" }}
            />
            inka3553@gmail.com
          </MagneticButton>
        </div>

        {/* Social row */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              data-cursor="hover"
              data-cursor-label="open"
              className="group rounded-full border border-white/10 px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-bone-200 transition-all duration-500 ease-cinema hover:border-white/30 hover:text-bone-50"
              style={{ backdropFilter: "blur(6px)" }}
            >
              <span className="transition-all duration-500 ease-cinema group-hover:tracking-[0.4em]">
                {s.label}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-32 flex w-full max-w-[1100px] flex-col items-center justify-between gap-3 border-t border-white/5 pt-8 text-[10px] uppercase tracking-[0.28em] text-bone-400 md:flex-row">
          <span>© Inna · 2026 · London</span>
          <span>Built as a digital exhibition.</span>
          <span>End of transmission</span>
        </div>
      </div>
    </section>
  );
}
