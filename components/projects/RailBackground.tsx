"use client";

import { forwardRef } from "react";

/**
 * Single unified background that lives behind the entire Projects rail.
 * Three "mood" layers crossfade with bell-curve opacity tied to scroll progress
 * (driven by ProjectsRail). Each mood layer also carries its own floating
 * ambient elements so each project gets its own atmosphere — but the bg itself
 * never cuts; everything always animates and only the layer opacities change.
 */
const RailBackground = forwardRef<HTMLDivElement>(function RailBackground(_, ref) {
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 will-change-[opacity] opacity-0"
    >
      {/* === Always-on base === */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(122,127,135,0.10), transparent 70%), linear-gradient(180deg, #06070a 0%, #08090d 50%, #06070a 100%)",
        }}
      />

      {/* Continuous drifting grid — present across all 3 projects */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,168,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,168,255,0.04) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse 90% 100% at 50% 50%, black 30%, transparent 80%)",
          animation: "rb-gridDrift 60s linear infinite",
        }}
      />

      {/* Continuous slow ambient sweep — ties everything together */}
      <div
        className="absolute -inset-[10%]"
        style={{
          background:
            "radial-gradient(circle 36vmax at 50% 50%, rgba(139,168,255,0.05), transparent 70%)",
          animation: "rb-ambient 18s var(--ease-cinema) infinite alternate",
          filter: "blur(40px)",
        }}
      />

      {/* === Mood layer 0 — V&V Boutique === */}
      <div className="bg-layer absolute inset-0 overflow-hidden" data-layer="vv">
        {/* Editorial spotlight palette — kept very subtle so the transition reads as a gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 90% at 30% 30%, rgba(245,245,243,0.045), transparent 75%), radial-gradient(ellipse 70% 80% at 75% 80%, rgba(201,199,194,0.035), transparent 75%)",
          }}
        />
        {/* Drifting oversized display serif "ghost letters" */}
        <span
          className="rb-vv-letter"
          style={{ left: "-2vw", top: "12%", animationDelay: "0s", fontSize: "32vw" }}
        >
          V
        </span>
        <span
          className="rb-vv-letter"
          style={{ right: "-4vw", bottom: "8%", animationDelay: "-9s", fontSize: "28vw" }}
        >
          V
        </span>
        <span
          className="rb-vv-letter rb-vv-letter--slow"
          style={{ left: "44%", top: "60%", animationDelay: "-15s", fontSize: "18vw" }}
        >
          &amp;
        </span>
        {/* Editorial hairlines */}
        <div className="rb-vv-line" style={{ top: "22%", animationDelay: "-2s" }} />
        <div className="rb-vv-line" style={{ top: "78%", animationDelay: "-7s" }} />
      </div>

      {/* === Mood layer 1 — BEEXTRART === */}
      <div className="bg-layer absolute inset-0 overflow-hidden" data-layer="bee">
        {/* Chrome + pink + violet wash — softer so it blends through transitions */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 35%, rgba(255,222,233,0.075), transparent 75%), radial-gradient(ellipse 90% 80% at 80% 75%, rgba(183,167,255,0.09), transparent 75%), radial-gradient(ellipse 70% 70% at 18% 80%, rgba(214,214,255,0.06), transparent 75%)",
          }}
        />
        {/* Soft chrome smear that drifts (CSS-only — feels like liquid metal flowing) */}
        <div
          className="absolute -inset-[20%]"
          style={{
            background:
              "conic-gradient(from 30deg at 50% 50%, rgba(245,245,243,0.04), rgba(255,222,233,0.06), rgba(183,167,255,0.05), rgba(245,245,243,0.04))",
            filter: "blur(80px)",
            animation: "rb-bee-chrome 30s linear infinite",
          }}
        />
        {/* Floating chrome orbs */}
        <span
          className="rb-bee-orb"
          style={{ left: "12%", top: "20%", width: 220, height: 220, animationDelay: "0s" }}
        />
        <span
          className="rb-bee-orb"
          style={{ right: "8%", top: "55%", width: 160, height: 160, animationDelay: "-6s" }}
        />
        <span
          className="rb-bee-orb"
          style={{ left: "30%", bottom: "12%", width: 110, height: 110, animationDelay: "-12s" }}
        />
        {/* Pink particle dots */}
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="rb-bee-particle"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animationDelay: `${-i * 1.4}s`,
              animationDuration: `${10 + (i % 5)}s`,
            }}
          />
        ))}
      </div>

      {/* === Mood layer 2 — NexGen === */}
      <div className="bg-layer absolute inset-0 overflow-hidden" data-layer="nex">
        {/* Electric blue wash — softer so the transition feels gradient-like */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 80% at 50% 30%, rgba(139,168,255,0.10), transparent 75%), radial-gradient(ellipse 70% 90% at 100% 100%, rgba(139,168,255,0.06), transparent 75%)",
          }}
        />
        {/* Tighter overlay grid (combines with the always-on grid for a denser tech feel) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(139,168,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(139,168,255,0.045) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse 70% 80% at 50% 50%, black 20%, transparent 80%)",
            animation: "rb-gridDrift 30s linear infinite reverse",
          }}
        />
        {/* SVG wireframe icosahedrons drifting */}
        <svg
          className="rb-nex-wire"
          viewBox="0 0 100 100"
          style={{ left: "8%", top: "18%", width: 160, animationDelay: "0s" }}
        >
          <Icosa />
        </svg>
        <svg
          className="rb-nex-wire"
          viewBox="0 0 100 100"
          style={{ right: "12%", top: "60%", width: 220, animationDelay: "-7s" }}
        >
          <Icosa />
        </svg>
        <svg
          className="rb-nex-wire rb-nex-wire--slow"
          viewBox="0 0 100 100"
          style={{ left: "55%", bottom: "15%", width: 110, animationDelay: "-14s" }}
        >
          <Icosa />
        </svg>
        {/* Scan line sweep */}
        <div className="rb-nex-scan" />
        {/* Registration markers */}
        {[
          { left: "6%", top: "10%" },
          { right: "6%", top: "10%" },
          { left: "6%", bottom: "10%" },
          { right: "6%", bottom: "10%" },
        ].map((p, i) => (
          <span key={i} className="rb-nex-mark" style={p}>
            +
          </span>
        ))}
      </div>

      <style jsx global>{`
        @keyframes rb-gridDrift {
          from { background-position: 0 0, 0 0; }
          to { background-position: 120px 120px, 120px 120px; }
        }
        @keyframes rb-ambient {
          from { transform: translate(-8%, -8%) scale(1); }
          to { transform: translate(8%, 8%) scale(1.18); }
        }

        /* --- VV: drifting ghost letters --- */
        .rb-vv-letter {
          position: absolute;
          font-family: var(--font-display);
          font-weight: 400;
          line-height: 0.8;
          color: rgba(245, 245, 243, 0.04);
          letter-spacing: -0.06em;
          user-select: none;
          will-change: transform;
          animation: rb-vv-drift 24s var(--ease-cinema) infinite alternate;
        }
        .rb-vv-letter--slow {
          animation-duration: 36s;
          color: rgba(245, 245, 243, 0.03);
        }
        @keyframes rb-vv-drift {
          from { transform: translate(0, 0) rotate(-2deg); }
          to { transform: translate(40px, -28px) rotate(1deg); }
        }
        .rb-vv-line {
          position: absolute;
          left: -10%;
          width: 120%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(245, 245, 243, 0.10),
            transparent
          );
          animation: rb-vv-line 14s linear infinite;
        }
        @keyframes rb-vv-line {
          from { transform: translateX(-30%); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          to { transform: translateX(30%); opacity: 0; }
        }

        /* --- BEE: chrome orbs + pink particles --- */
        @keyframes rb-bee-chrome {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(360deg) scale(1.05); }
        }
        .rb-bee-orb {
          position: absolute;
          border-radius: 9999px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.5),
            rgba(255, 222, 233, 0.18) 35%,
            rgba(183, 167, 255, 0.10) 60%,
            transparent 80%
          );
          filter: blur(8px);
          opacity: 0.55;
          will-change: transform;
          animation: rb-bee-orb 18s var(--ease-cinema) infinite alternate;
        }
        @keyframes rb-bee-orb {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-40px, 30px) scale(1.08); }
        }
        .rb-bee-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: rgba(255, 222, 233, 0.7);
          box-shadow: 0 0 10px rgba(255, 222, 233, 0.65);
          animation: rb-bee-rise 11s linear infinite;
        }
        @keyframes rb-bee-rise {
          from { transform: translateY(20vh); opacity: 0; }
          15% { opacity: 1; }
          85% { opacity: 1; }
          to { transform: translateY(-30vh); opacity: 0; }
        }

        /* --- NEX: wireframes + scanlines --- */
        .rb-nex-wire {
          position: absolute;
          stroke: rgba(139, 168, 255, 0.45);
          stroke-width: 0.6;
          fill: none;
          opacity: 0.7;
          will-change: transform;
          animation: rb-nex-wire 22s linear infinite;
        }
        .rb-nex-wire--slow { animation-duration: 36s; }
        @keyframes rb-nex-wire {
          from { transform: rotate(0deg) translateY(0) scale(1); }
          50% { transform: rotate(180deg) translateY(-20px) scale(1.1); }
          to { transform: rotate(360deg) translateY(0) scale(1); }
        }
        .rb-nex-scan {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(139, 168, 255, 0.06) 50%,
            transparent 100%
          );
          height: 30vh;
          animation: rb-nex-scan 9s linear infinite;
        }
        @keyframes rb-nex-scan {
          from { transform: translateY(-30vh); }
          to { transform: translateY(120vh); }
        }
        .rb-nex-mark {
          position: absolute;
          color: rgba(139, 168, 255, 0.6);
          font-family: ui-monospace, monospace;
          font-size: 14px;
          line-height: 1;
        }
      `}</style>
    </div>
  );
});

function Icosa() {
  // Stylised wireframe pentagon-based icosahedron silhouette
  return (
    <g>
      <polygon points="50,5 95,38 78,90 22,90 5,38" />
      <polygon points="50,5 78,90 22,90" />
      <line x1="5" y1="38" x2="78" y2="90" />
      <line x1="95" y1="38" x2="22" y2="90" />
      <line x1="50" y1="5" x2="50" y2="90" />
      <circle cx="50" cy="50" r="32" />
    </g>
  );
}

export default RailBackground;
