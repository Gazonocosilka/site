"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "view" | "drag";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.body.dataset.cursorActive = "true";

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    let raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const el = t.closest<HTMLElement>("[data-cursor]");
      if (el) {
        const next = (el.dataset.cursor || "hover") as CursorState;
        setState(next);
        setLabel(el.dataset.cursorLabel || "");
      } else {
        setState("default");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      delete document.body.dataset.cursorActive;
    };
  }, []);

  const ringSize =
    state === "view" ? 110 : state === "drag" ? 80 : state === "hover" ? 48 : 28;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ mixBlendMode: state === "view" ? "difference" : "normal" }}
    >
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-white"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 grid place-items-center rounded-full border border-white/40 transition-[width,height,background-color,border-color] duration-500 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          willChange: "transform, width, height",
          background:
            state === "view"
              ? "rgba(255,255,255,0.95)"
              : state === "drag"
              ? "rgba(139,168,255,0.10)"
              : "transparent",
          borderColor:
            state === "default"
              ? "rgba(255,255,255,0.18)"
              : state === "hover"
              ? "rgba(255,255,255,0.55)"
              : "transparent",
          boxShadow:
            state === "hover"
              ? "0 0 36px rgba(139,168,255,0.35)"
              : state === "drag"
              ? "0 0 60px rgba(183,167,255,0.4)"
              : "none",
        }}
      >
        <span
          ref={labelRef}
          className="select-none text-[9px] font-medium uppercase tracking-[0.25em]"
          style={{
            color: state === "view" ? "#050505" : "rgba(245,245,243,0.85)",
            opacity: label ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
