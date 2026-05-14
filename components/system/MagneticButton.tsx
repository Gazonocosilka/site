"use client";

import {
  useRef,
  useState,
  ReactNode,
  HTMLAttributes,
  CSSProperties,
} from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  strength?: number;
  as?: "div" | "a" | "button";
  href?: string;
  cursor?: string;
  cursorLabel?: string;
  className?: string;
  style?: CSSProperties;
}

export default function MagneticButton({
  children,
  strength = 0.35,
  as = "div",
  href,
  cursor = "hover",
  cursorLabel,
  className = "",
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setT({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  };

  const reset = () => setT({ x: 0, y: 0 });

  const inner = (
    <span
      className="inline-block transition-transform duration-500 ease-out"
      style={{ transform: `translate3d(${t.x * 0.4}px, ${t.y * 0.4}px, 0)` }}
    >
      {children}
    </span>
  );

  const wrapperStyle: CSSProperties = {
    transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
    transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
    willChange: "transform",
    ...style,
  };

  const sharedProps = {
    onMouseMove: onMove,
    onMouseLeave: reset,
    "data-cursor": cursor,
    "data-cursor-label": cursorLabel,
    className: `inline-block ${className}`,
    style: wrapperStyle,
    ref: ref as React.Ref<HTMLDivElement>,
    ...rest,
  };

  if (as === "a") {
    return (
      <a {...(sharedProps as object)} href={href}>
        {inner}
      </a>
    );
  }
  if (as === "button") {
    return <button {...(sharedProps as object)}>{inner}</button>;
  }
  return <div {...sharedProps}>{inner}</div>;
}
