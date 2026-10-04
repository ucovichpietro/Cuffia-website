"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { MotionConfig } from "motion/react";

type UI = {
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
};

const UIContext = createContext<UI | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI va usato dentro <Providers>");
  return ctx;
}

export const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export function Providers({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const value = useMemo(() => ({ cartOpen, setCartOpen }), [cartOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <UIContext.Provider value={value}>{children}</UIContext.Provider>
    </MotionConfig>
  );
}
