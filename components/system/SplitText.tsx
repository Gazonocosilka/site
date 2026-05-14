"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  children: string;
  className?: string;
  style?: CSSProperties;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  by?: "char" | "word" | "line";
  trigger?: "self" | "load";
  start?: string;
  blur?: boolean;
}

export default function SplitText({
  children,
  className = "",
  style,
  as = "span",
  delay = 0,
  stagger = 0.018,
  by = "char",
  trigger = "self",
  start = "top 85%",
  blur = true,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = el.querySelectorAll<HTMLElement>(by === "word" ? ".word" : ".char");
    if (!targets.length) return;

    if (reduceMotion) {
      targets.forEach((t) => {
        t.style.transform = "none";
        t.style.opacity = "1";
        t.style.filter = "none";
      });
      return;
    }

    const from = {
      yPercent: 110,
      opacity: 0,
      filter: blur ? "blur(8px)" : "blur(0px)",
    };
    const to = {
      yPercent: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.1,
      ease: "power3.out",
      stagger: { each: stagger, from: "start" as const },
      delay,
    };

    gsap.set(targets, from);

    if (trigger === "load") {
      gsap.to(targets, to);
    } else {
      ScrollTrigger.create({
        trigger: el,
        start,
        once: true,
        onEnter: () => gsap.to(targets, to),
      });
    }
  }, [children, by, delay, stagger, blur, trigger, start]);

  const Tag = as as React.ElementType;
  const text = children;

  let nodes: ReactNode;
  if (by === "word") {
    nodes = text.split(/(\s+)/).map((seg, i) =>
      /^\s+$/.test(seg) ? (
        <span key={i}>{seg}</span>
      ) : (
        <span key={i} className="char-mask">
          <span className="word">{seg}</span>
        </span>
      )
    );
  } else {
    nodes = text.split("").map((ch, i) =>
      ch === " " ? (
        <span key={i} className="inline-block">{" "}</span>
      ) : (
        <span key={i} className="char-mask">
          <span className="char">{ch}</span>
        </span>
      )
    );
  }

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className} style={style}>
      {nodes}
    </Tag>
  );
}
