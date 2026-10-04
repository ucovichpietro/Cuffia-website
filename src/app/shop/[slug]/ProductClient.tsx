"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, RotateCcw, ShieldCheck, Truck, WashingMachine } from "lucide-react";
import { eur, FREE_SHIPPING, SIZE_GUIDE, type Product, type Size } from "@/lib/products";
import { cart, useCart } from "@/lib/store";
import { useUI, EASE_OUT } from "@/components/Providers";
import { Badges } from "@/components/ProductCard";
import { QtyStepper } from "@/components/CartDrawer";
import { Accordion } from "@/components/Accordion";

export function ProductClient({ product }: { product: Product }) {
  const { setCartOpen } = useUI();
  const { subtotal } = useCart();
  const [index, setIndex] = useState(0);
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const photo = product.images[index];
  const missing = Math.max(0, FREE_SHIPPING - subtotal - product.price * qty);

  const add = () => {
    if (!size) return setError("Scegli una taglia prima di aggiungere al carrello.");
    cart.add(product.slug, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    setCartOpen(true);
  };

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      {/* GALLERIA */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-fondo-2">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={photo.src}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-4 top-4 z-[3] flex flex-wrap gap-1.5">
            <Badges product={product} />
          </div>
          <span className="ai-label !bottom-4 !left-4">{photo.ai ? "Immagine generata con AI" : "Foto reale"}</span>
        </div>
        {product.images.length > 1 && (
          <ul className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {product.images.map((im, i) => (
              <li key={im.src}>
                <button
                  type="button"
                  aria-pressed={index === i}
                  aria-label={`Mostra: ${im.alt}`}
                  onClick={() => setIndex(i)}
                  className={`relative block h-20 w-16 cursor-pointer overflow-hidden rounded-xl transition-opacity duration-200 sm:h-24 sm:w-20 ${
                    index === i ? "ring-2 ring-ink ring-offset-2 ring-offset-fondo" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={im.src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* SCHEDA D'ACQUISTO */}
      <div>
        <p className="eyebrow">{product.tipo}</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">{product.name}</h1>
        <p className="mt-3 text-xl text-ink-soft">{product.tagline}</p>

        <p className="mt-6 font-display text-4xl tabular-nums">
          {eur(product.price)}
          {product.compareAt && <s className="ml-3 text-2xl text-ink-soft">{eur(product.compareAt)}</s>}
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          IVA inclusa.{" "}
          <Link href="/legale/spedizioni-resi" className="underline underline-offset-2">
            Spedizione
          </Link>{" "}
          calcolata al pagamento.
        </p>

        <p className="mt-7 text-lg">{product.description}</p>

        <ul className="mt-6 space-y-2.5">
          {product.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <Check size={19} className="mt-1 shrink-0 text-blu" aria-hidden />
              {b}
            </li>
          ))}
        </ul>

        <fieldset className="mt-9">
          <div className="mb-3 flex items-center justify-between">
            <legend className="font-semibold">Taglia{size && `: ${size}`}</legend>
            <Link href="/info#taglie" className="link text-sm">
              Guida alle taglie
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={size === s}
                onClick={() => {
                  setSize(s);
                  setError("");
                }}
                className={`h-12 min-w-14 cursor-pointer rounded-full border px-4 font-semibold transition-colors duration-200 ${
                  size === s ? "border-ink bg-ink text-white" : "border-bordo-forte bg-carta hover:border-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {size && <p className="mt-3 text-sm text-ink-soft">{SIZE_GUIDE.find((g) => g.size === size)?.razze}</p>}
          {error && (
            <p role="alert" className="mt-3 font-semibold text-rosso">
              {error}
            </p>
          )}
        </fieldset>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <QtyStepper qty={qty} onChange={setQty} label={product.name} />
          <button type="button" onClick={add} className="btn btn-primary min-h-[3.25rem] min-w-56 flex-1 text-base">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={added ? "ok" : "add"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-2"
              >
                {added ? (
                  <>
                    <Check size={18} /> Aggiunta al carrello
                  </>
                ) : (
                  <>Aggiungi al carrello · {eur(product.price * qty)}</>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        <p className="mt-4 text-sm font-medium text-ink-soft">
          {missing > 0
            ? `Con questo ordine ti mancano ${eur(missing)} alla spedizione gratuita.`
            : "Con questo ordine la spedizione è gratuita."}
        </p>

        <ul className="mt-9 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-bordo py-6 text-sm font-medium">
          <li className="flex items-center gap-2.5">
            <Truck size={19} strokeWidth={1.6} className="text-blu" aria-hidden /> Consegna in 2–4 giorni
          </li>
          <li className="flex items-center gap-2.5">
            <RotateCcw size={19} strokeWidth={1.6} className="text-blu" aria-hidden /> Reso entro 30 giorni
          </li>
          <li className="flex items-center gap-2.5">
            <WashingMachine size={19} strokeWidth={1.6} className="text-blu" aria-hidden /> Lavabile in lavatrice
          </li>
          <li className="flex items-center gap-2.5">
            <ShieldCheck size={19} strokeWidth={1.6} className="text-blu" aria-hidden /> Pagamenti sicuri
          </li>
        </ul>

        <div className="mt-8">
          <Accordion
            items={[
              { q: "Materiali", a: product.materiale },
              { q: "Come si lava", a: product.lavaggio },
              {
                q: "Taglie e misure",
                a: SIZE_GUIDE.filter((g) => product.sizes.includes(g.size))
                  .map((g) => `${g.size}: collo ${g.collo}, testa ${g.testa} (${g.razze})`)
                  .join(" · "),
              },
              {
                q: "Spedizioni e resi",
                a: `Spedizione in Italia a 5,90 €, gratuita sopra i ${FREE_SHIPPING} €. Consegna in 2–4 giorni lavorativi. Reso entro 30 giorni dalla consegna.`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
