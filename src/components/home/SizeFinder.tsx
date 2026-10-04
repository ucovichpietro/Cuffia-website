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
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div>
        <p className="mb-3 font-display font-medium">Che cane hai?</p>
        <div className="flex flex-wrap gap-2">
          {BREEDS.map((b, idx) => (
            <button
              key={b.name}
              type="button"
              aria-pressed={i === idx}
              onClick={() => setI(idx)}
              className={`min-h-11 cursor-pointer rounded-full border-2 border-ink px-4 font-display font-medium transition-colors duration-150 ${
                i === idx ? "bg-ink text-white" : "bg-carta hover:bg-azzurro-soft"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>
      </div>
      <motion.div
        key={breed.name}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="sticker flex items-center gap-5 p-5"
        aria-live="polite"
      >
        <span className="gingham grid h-24 w-24 shrink-0 place-items-center rounded-full border-2 border-ink">
          <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-ink bg-carta font-display text-3xl font-bold">
            {breed.size}
          </span>
        </span>
        <div>
          <p className="font-display text-xl font-semibold">
            Per il {breed.name}: taglia {breed.size}
          </p>
          <p className="text-ink-soft">{breed.note}</p>
          <p className="mt-1 text-sm text-ink-soft">
            Collo {guide.collo} · testa {guide.testa}
          </p>
          <Link href="/info#taglie" className="mt-1 inline-block font-display font-medium text-blu underline">
            Guida completa alle taglie
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
