"use client";

import { useEffect, useRef } from "react";

/**
 * Animated film grain via tiny offscreen canvas.
 * Uses a pre-baked noise tile + per-frame jitter to keep cost ~negligible.
 */
export default function Grain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const TILE = 220;
    const noise = document.createElement("canvas");
    noise.width = noise.height = TILE;
    const nctx = noise.getContext("2d")!;
    const img = nctx.createImageData(TILE, TILE);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = v;
      img.data[i + 1] = v;
      img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    nctx.putImageData(img, 0, 0);

    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const ox = -Math.random() * TILE;
      const oy = -Math.random() * TILE;
      for (let y = oy; y < h; y += TILE) {
        for (let x = ox; x < w; x += TILE) {
          ctx.drawImage(noise, x, y);
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay"
      style={{ opacity: "var(--grain-opacity)", transition: "opacity 600ms ease" }}
    />
  );
}
