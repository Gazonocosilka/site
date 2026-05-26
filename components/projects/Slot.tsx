"use client";

import { CSSProperties, ReactNode } from "react";

/**
 * Asset placeholder slot that ALSO reads as clickable.
 * - Diagonal stripe placeholder pattern (CSS in globals.css)
 * - Hover: lifts, softly glows, fades in corner tick marks + "View" pill
 * - Carries a data-asset label that's visible in the corner
 *
 * Drop a real <img>/<video> child later — it stacks on top of the placeholder.
 */
export default function Slot({
  asset,
  className = "",
  style,
  href = "#",
  label = "View",
  children,
}: {
  asset: string;
  className?: string;
  style?: CSSProperties;
  href?: string;
  label?: string;
  children?: ReactNode;
}) {
  return (
    <a
      href={href}
      data-asset={asset}
      data-cursor="view"
      data-cursor-label="open"
      className={`slot block ${className}`}
      style={style}
    >
      <span aria-hidden className="slot-tick slot-tick--tl" />
      <span aria-hidden className="slot-tick slot-tick--tr" />
      <span aria-hidden className="slot-tick slot-tick--bl" />
      <span aria-hidden className="slot-tick slot-tick--br" />
      <span aria-hidden className="slot-hover">
        <span className="slot-hover-label">
          <span
            aria-hidden
            className="block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
          />
          {label}
          <span aria-hidden style={{ marginLeft: 4 }}>→</span>
        </span>
      </span>
      {children}
    </a>
  );
}
