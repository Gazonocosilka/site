"use client";

import { useEffect, useState } from "react";

/**
 * Sticky top bar with brand mark on the left, location middle (optional),
 * and a persistent Contact me button on the right that smooth-scrolls to
 * the Contact section from anywhere on the page.
 *
 * Becomes a translucent glass bar after the user scrolls past the hero.
 */
export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToContact = () => {
    const target = document.getElementById("contact");
    if (!target) return;
    const lenis = (window as unknown as {
      __lenis?: { scrollTo: (t: HTMLElement | number, opts?: object) => void };
    }).__lenis;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.6, offset: 0 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className="fixed left-0 right-0 top-0 z-[75] flex items-center justify-between px-5 py-4 transition-all duration-700 ease-cinema md:px-10 md:py-5"
      style={{
        background: scrolled
          ? "linear-gradient(180deg, rgba(5,5,5,0.55), rgba(5,5,5,0))"
          : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <span className="mono opacity-80">Inna · Portfolio · 2026</span>

      <span className="mono hidden opacity-60 md:inline">London / UAL</span>

      <button
        onClick={goToContact}
        data-cursor="hover"
        data-cursor-label="write"
        aria-label="Go to contact section"
        className="group glass relative inline-flex items-center gap-2.5 rounded-full pl-3 pr-4 py-2 text-[11px] uppercase tracking-[0.28em] text-bone-50 transition-all duration-500 ease-cinema hover:-translate-y-px"
        style={{
          boxShadow: "0 0 24px rgba(139,168,255,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <span
          aria-hidden
          className="block h-1.5 w-1.5 rounded-full"
          style={{
            background: "var(--accent)",
            boxShadow: "0 0 10px var(--accent)",
          }}
        />
        <span className="transition-all duration-500 group-hover:tracking-[0.34em]">
          Contact me
        </span>
        <span aria-hidden className="text-[12px] leading-none transition-transform duration-500 group-hover:translate-x-0.5">→</span>
      </button>
    </header>
  );
}
