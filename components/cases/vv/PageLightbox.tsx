"use client";

import { useEffect, useRef, useState } from "react";

export interface LightboxPage {
  id: string;             // slug like "home"
  label: string;          // "Home"
  thumb: string;          // /vv-shots/vv-home.jpg
  full: string;           // /vv-shots/vv-full-home.jpg
}

interface Props {
  pages: LightboxPage[];
  openId: string | null;
  onClose: () => void;
  onJump: (id: string) => void;
  brand?: string; // top-bar label (defaults to "V&V Boutique" for backwards compat)
}

/**
 * Full-page screenshot lightbox. Opens when a V&V image is clicked.
 * Shows the entire page as a scrollable image inside a dark modal.
 * Keyboard: Esc closes, ← / → switch pages.
 */
export default function PageLightbox({ pages, openId, onClose, onJump, brand = "V&V Boutique" }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  const index = openId ? pages.findIndex((p) => p.id === openId) : -1;
  const current = index >= 0 ? pages[index] : null;

  // Lock body scroll while open
  useEffect(() => {
    if (!openId) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Stop Lenis from intercepting scroll while modal is open
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [openId]);

  // Keyboard nav
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") {
        const next = pages[(index + 1) % pages.length];
        if (next) onJump(next.id);
      }
      if (e.key === "ArrowLeft") {
        const prev = pages[(index - 1 + pages.length) % pages.length];
        if (prev) onJump(prev.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, index, pages, onClose, onJump]);

  // Reset scroll + ready flag when page changes
  useEffect(() => {
    if (!openId) return;
    setIsReady(false);
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    // small delay for image swap animation
    const t = window.setTimeout(() => setIsReady(true), 60);
    return () => window.clearTimeout(t);
  }, [openId]);

  if (!current) return null;

  const prev = pages[(index - 1 + pages.length) % pages.length];
  const next = pages[(index + 1) % pages.length];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${brand} — ${current.label}`}
      className="fixed inset-0 z-[200] flex flex-col"
      onClick={(e) => {
        // Click outside the image column closes the modal
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        background: "rgba(5,5,5,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-8 md:py-5">
        <div className="flex items-baseline gap-4">
          <span className="mono opacity-60" style={{ fontSize: 11 }}>
            {brand}
          </span>
          <span className="mono opacity-40" style={{ fontSize: 11 }}>
            /
          </span>
          <span className="mono text-bone-50" style={{ fontSize: 12, letterSpacing: "0.22em" }}>
            {current.label}
          </span>
          <span className="mono opacity-40 hidden md:inline" style={{ fontSize: 11 }}>
            {String(index + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}
          </span>
        </div>

        <button
          onClick={onClose}
          data-cursor="hover"
          data-cursor-label="close"
          aria-label="Close"
          className="group flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-bone-50 transition-colors duration-500 hover:border-white/35"
        >
          <span aria-hidden className="text-[14px] leading-none">✕</span>
          Close
        </button>
      </div>

      {/* Scrollable image region.
          data-lenis-prevent tells Lenis to NOT intercept wheel events that
          originate inside this element, so native scrolling works here. */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="lightbox-scroll relative flex-1 overflow-y-auto overscroll-contain"
        style={{ scrollbarGutter: "stable both-edges" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="mx-auto w-full max-w-[1100px] px-4 pb-16 pt-2 md:px-10">
          <img
            key={current.id}
            src={current.full}
            alt={`V&V Boutique — ${current.label}`}
            className="block w-full rounded-md transition-opacity duration-500"
            style={{
              boxShadow: "0 30px 100px rgba(0,0,0,0.7), 0 0 1px rgba(255,255,255,0.06)",
              opacity: isReady ? 1 : 0,
            }}
            onLoad={() => setIsReady(true)}
          />
        </div>

        {/* First-load scroll hint — fades after a few seconds */}
        <div
          aria-hidden
          className="pointer-events-none fixed left-1/2 top-[88px] z-10 -translate-x-1/2 rounded-full border border-white/20 bg-black/55 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-bone-50/90"
          style={{
            backdropFilter: "blur(6px)",
            animation: "lbHint 4s ease-in-out forwards",
          }}
        >
          ↓ Scroll to see the full page
        </div>
      </div>

      <style jsx global>{`
        /* Visible scrollbar inside lightbox so users know it scrolls */
        .lightbox-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(245,245,243,0.35) transparent;
        }
        .lightbox-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .lightbox-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .lightbox-scroll::-webkit-scrollbar-thumb {
          background: rgba(245,245,243,0.25);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        .lightbox-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(245,245,243,0.5);
          background-clip: padding-box;
        }
        @keyframes lbHint {
          0% { opacity: 0; transform: translate(-50%, 8px); }
          15% { opacity: 1; transform: translate(-50%, 0); }
          75% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -4px); }
        }
      `}</style>

      {/* Bottom dock — page chips for jumping */}
      <div className="shrink-0 border-t border-white/8 px-5 py-4 md:px-8">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => onJump(prev.id)}
            data-cursor="hover"
            data-cursor-label="prev"
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-bone-200 transition-colors duration-500 hover:text-bone-50"
          >
            <span aria-hidden className="transition-transform duration-500 group-hover:-translate-x-1">←</span>
            <span className="hidden md:inline">Prev · {prev.label}</span>
            <span className="md:hidden">Prev</span>
          </button>

          {/* Center chip rail (scrollable on mobile) */}
          <div className="hidden flex-1 overflow-x-auto md:block">
            <div className="flex items-center justify-center gap-2">
              {pages.map((p) => {
                const active = p.id === current.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => onJump(p.id)}
                    data-cursor="hover"
                    data-cursor-label="open"
                    className="group rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.26em] transition-all duration-500"
                    style={{
                      borderColor: active ? "var(--accent)" : "rgba(255,255,255,0.12)",
                      color: active ? "var(--bone-50)" : "rgba(245,245,243,0.55)",
                      background: active ? "rgba(139,168,255,0.10)" : "transparent",
                    }}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onJump(next.id)}
            data-cursor="hover"
            data-cursor-label="next"
            className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-bone-200 transition-colors duration-500 hover:text-bone-50"
          >
            <span className="hidden md:inline">Next · {next.label}</span>
            <span className="md:hidden">Next</span>
            <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
