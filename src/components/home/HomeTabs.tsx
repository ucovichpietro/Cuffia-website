"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "../ProductCard";
import { EASE_OUT } from "../Providers";

const TABS = [
  { id: "cuffie", label: "Cuffie", href: "/shop?cat=cuffie", items: products.filter((p) => p.category === "cuffie") },
  { id: "accessori", label: "Accessori", href: "/shop?cat=accessori", items: products.filter((p) => p.category === "accessori") },
  { id: "novita", label: "Novità", href: "/shop?f=novita", items: products.filter((p) => p.isNew) },
  { id: "offerte", label: "Offerte", href: "/shop?f=offerte", items: products.filter((p) => p.compareAt) },
];

export function HomeTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const tab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div>
      <div role="tablist" aria-label="Collezioni" className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls="tab-panel"
            onClick={() => setActive(t.id)}
            className="relative min-h-11 cursor-pointer rounded-full border-2 border-ink px-5 font-display font-medium"
          >
            {active === t.id && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-azzurro"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={tab.id}
        id="tab-panel"
        role="tabpanel"
        aria-labelledby={`tab-${tab.id}`}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
        className="mt-7 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
      >
        {tab.items.slice(0, 4).map((p) => (
          <motion.div
            key={p.slug}
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8">
        <Link href={tab.href} className="btn btn-ghost">
          Vedi tutto: {tab.label} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
