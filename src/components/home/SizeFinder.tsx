"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { BREEDS, SIZE_GUIDE } from "@/lib/products";
import { EASE_OUT } from "../Providers";

export function SizeFinder() {
  const [i, setI] = useState(0);
  const breed = BREEDS[i];
  const guide = SIZE_GUIDE.find((s) => s.size === breed.size)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
      <div>
        <p className="label mb-3">Che cane hai?</p>
        <div className="flex flex-wrap gap-2">
          {BREEDS.map((b, idx) => (
            <button
              key={b.name}
              type="button"
              aria-pressed={i === idx}
              onClick={() => setI(idx)}
              className={`min-h-11 cursor-pointer rounded-full border px-4 text-[0.95rem] font-medium transition-colors duration-200 ${
                i === idx
                  ? "border-ink bg-ink text-white"
                  : "border-bordo-forte bg-carta hover:border-ink"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        key={breed.name}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        className="card flex items-center gap-6 p-6 shadow-[var(--shadow-soft)]"
        aria-live="polite"
      >
        <span className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-blu font-display text-4xl text-white">
          {breed.size}
        </span>
        <div>
          <p className="font-display text-2xl leading-tight">
            {breed.name}: taglia {breed.size}
          </p>
          <p className="mt-1 text-ink-soft">{breed.note}</p>
          <p className="mt-2 text-sm text-ink-soft tabular-nums">
            Collo {guide.collo} · testa {guide.testa}
          </p>
          <Link href="/info#taglie" className="link mt-2 inline-block text-sm">
            Guida completa alle taglie
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
