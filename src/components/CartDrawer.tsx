"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useUI, EASE_OUT } from "./Providers";
import { cart, useCart } from "@/lib/store";
import { eur, FREE_SHIPPING } from "@/lib/products";
import { ProductArt } from "./Barack";

export function FreeShippingBar({ missing }: { missing: number }) {
  const pct = Math.min(100, ((FREE_SHIPPING - missing) / FREE_SHIPPING) * 100);
  return (
    <div>
      <p className="text-sm font-semibold">
        {missing > 0 ? (
          <>
            Ti mancano <span className="text-blu">{eur(missing)}</span> per la spedizione gratuita
          </>
        ) : (
          "Hai la spedizione gratuita"
        )}
      </p>
      <div className="mt-2 h-3 overflow-hidden rounded-full border-2 border-ink bg-carta" role="presentation">
        <div
          className="h-full origin-left bg-azzurro transition-transform duration-300 ease-out"
          style={{ transform: `scaleX(${pct / 100})` }}
        />
      </div>
    </div>
  );
}

export function QtyStepper({ qty, onChange, label }: { qty: number; onChange: (n: number) => void; label: string }) {
  const b = "grid h-11 w-11 cursor-pointer place-items-center hover:bg-panna-2 disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border-2 border-ink bg-carta">
      <button type="button" className={b} aria-label={`Riduci la quantità di ${label}`} onClick={() => onChange(qty - 1)} disabled={qty <= 1}>
        <Minus size={16} />
      </button>
      <span className="min-w-8 text-center font-display font-semibold tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button type="button" className={b} aria-label={`Aumenta la quantità di ${label}`} onClick={() => onChange(qty + 1)}>
        <Plus size={16} />
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const { lines, subtotal, missingForFree, count } = useCart();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cartOpen, setCartOpen]);

  return (
    <AnimatePresence>
      {cartOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={() => setCartOpen(false)}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Carrello"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="absolute right-0 top-0 flex h-full w-[min(27rem,100vw)] flex-col border-l-2 border-ink bg-panna"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
              <h2 className="text-2xl">Carrello{count > 0 && ` (${count})`}</h2>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Chiudi il carrello"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-full hover:bg-panna-2"
              >
                <X />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <p className="eyebrow">Qui è ancora vuoto</p>
                <p className="text-ink-soft">Aggiungi una cuffia e Barack te la tiene da parte.</p>
                <Link href="/shop" onClick={() => setCartOpen(false)} className="btn btn-primary">
                  Vai allo shop
                </Link>
              </div>
            ) : (
              <>
                <div className="border-b-2 border-ink px-5 py-4">
                  <FreeShippingBar missing={missingForFree} />
                </div>
                <ul className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li
                        key={`${l.slug}-${l.size}`}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.22, ease: EASE_OUT }}
                        className="flex gap-3"
                      >
                        <span className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl border-2 border-ink" style={{ background: l.product.bg }}>
                          <ProductArt product={l.product} className="h-20 w-20" />
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link href={`/shop/${l.slug}`} onClick={() => setCartOpen(false)} className="font-display font-semibold leading-tight hover:underline">
                                {l.product.name}
                              </Link>
                              <p className="text-sm text-ink-soft">Taglia {l.size}</p>
                            </div>
                            <p className="font-display font-semibold tabular-nums">{eur(l.product.price * l.qty)}</p>
                          </div>
                          <div className="mt-auto flex items-center justify-between">
                            <QtyStepper qty={l.qty} label={l.product.name} onChange={(n) => cart.setQty(l.slug, l.size, n)} />
                            <button
                              type="button"
                              onClick={() => cart.remove(l.slug, l.size)}
                              aria-label={`Rimuovi ${l.product.name} dal carrello`}
                              className="grid h-11 w-11 cursor-pointer place-items-center rounded-full text-ink-soft hover:bg-panna-2 hover:text-rosso"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <div className="space-y-3 border-t-2 border-ink bg-carta px-5 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-lg font-medium">Subtotale</span>
                    <span className="font-display text-2xl font-semibold tabular-nums">{eur(subtotal)}</span>
                  </div>
                  <p className="text-sm text-ink-soft">IVA inclusa. Spedizione e sconti calcolati al pagamento.</p>
                  <Link href="/checkout" onClick={() => setCartOpen(false)} className="btn btn-primary w-full">
                    Vai al pagamento
                  </Link>
                  <Link href="/carrello" onClick={() => setCartOpen(false)} className="block text-center font-display font-medium underline">
                    Vedi il carrello
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
