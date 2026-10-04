"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { EASE_OUT } from "./Providers";

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const uid = useId();

  return (
    <div className="border-t border-bordo-forte">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className="border-b border-bordo-forte">
            <h3 className="font-sans tracking-normal">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${uid}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-[1.05rem] font-semibold"
              >
                {it.q}
                <Plus
                  aria-hidden
                  size={20}
                  className={`shrink-0 text-blu transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${uid}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[65ch] pb-6 text-ink-soft">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
