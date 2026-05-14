"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Mode = "default" | "dimension";

interface DimensionCtx {
  mode: Mode;
  toggle: () => void;
}

const Ctx = createContext<DimensionCtx>({ mode: "default", toggle: () => {} });

export function DimensionProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("default");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("inna-mode")) as Mode | null;
    if (saved === "dimension") setMode("dimension");
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.mode = mode === "dimension" ? "dimension" : "";
    if (typeof window !== "undefined") {
      localStorage.setItem("inna-mode", mode);
    }
  }, [mode]);

  const toggle = () => setMode((m) => (m === "dimension" ? "default" : "dimension"));

  return <Ctx.Provider value={{ mode, toggle }}>{children}</Ctx.Provider>;
}

export const useDimension = () => useContext(Ctx);
