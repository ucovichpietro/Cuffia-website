"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, RotateCcw, ShieldCheck, Star, Truck, WashingMachine } from "lucide-react";
import { eur, FREE_SHIPPING, SIZE_GUIDE, type Product, type Size } from "@/lib/products";
import { cart, useCart } from "@/lib/store";
import { useUI, EASE_OUT } from "@/components/Providers";
import { ProductArt, type ArtView } from "@/components/Barack";
import { Badges } from "@/components/ProductCard";
import { QtyStepper } from "@/components/CartDrawer";
import { Accordion } from "@/components/Accordion";

const VIEWS: { id: ArtView; label: string }[] = [
  { id: "worn", label: "Indossata da Barack" },
  { id: "flat", label: "La cuffia stesa" },
];

export function ProductClient({ product }: { product: Product }) {
  const { setCartOpen } = useUI();
  const { subtotal } = useCart();
  const isSnood = product.kind === "cuffia";
  const [view, setView] = useState<ArtView>("worn");
  const [size, setSize] = useState<Size | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  const missing = Math.max(0, FREE_SHIPPING - subtotal - product.price * qty);

  const add = () => {
    if (!size) return setError("Scegli una taglia prima di aggiungere al carrello.");
    cart.add(product.slug, size, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
    setCartOpen(true);
  };

  return (
    <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-14">
      {/* GALLERY */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="sticker relative grid aspect-square place-items-center overflow-hidden" style={{ background: product.bg }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              className="grid h-full w-full place-items-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <ProductArt product={product} view={view} className="w-[84%]" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            <Badges product={product} />
          </div>
        </div>
        {isSnood && (
          <div className="mt-4 flex gap-3">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                aria-pressed={view === v.id}
                aria-label={v.label}
                onClick={() => setView(v.id)}
                className={`grid h-20 w-20 cursor-pointer place-items-center rounded-2xl border-2 transition-shadow duration-150 ${
                  view === v.id ? "border-ink shadow-[3px_3px_0_var(--color-ink)]" : "border-bordo hover:border-ink"
                }`}
                style={{ background: product.bg }}
              >
                <ProductArt product={product} view={v.id} className="w-16" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SCHEDA D'ACQUISTO */}
      <div>
        <p className="font-display font-medium text-blu">{product.tipo}</p>
        <h1 className="mt-1 text-4xl sm:text-5xl">{product.name}</h1>
        <p className="mt-2 text-xl text-ink-soft">{product.tagline}</p>

        {product.reviews > 0 && (
          <p className="mt-3 flex items-center gap-1.5 text-ink-soft">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }, (_, k) => (
                <Star key={k} size={18} className="fill-miele text-miele" />
              ))}
            </span>
            <span className="tabular-nums">
              {product.rating.toFixed(1).replace(".", ",")} su 5 · {product.reviews} recensioni
            </span>
          </p>
        )}

        <p className="mt-5 font-display text-4xl font-semibold tabular-nums">
          {eur(product.price)}
          {product.compareAt && <s className="ml-3 text-2xl font-normal text-ink-soft">{eur(product.compareAt)}</s>}
        </p>
        <p className="text-sm text-ink-soft">
          IVA inclusa.{" "}
          <Link href="/legale/spedizioni-resi" className="underline">
            Spedizione
          </Link>{" "}
          calcolata al pagamento.
        </p>

        <p className="mt-6 text-lg">{product.description}</p>

        <ul className="mt-5 space-y-2">
          {product.bullets.map((b) => (
            <li key={b} className="flex gap-2.5">
              <Check size={20} className="mt-1 shrink-0 text-salvia" aria-hidden />
              {b}
            </li>
          ))}
        </ul>

        {product.comingSoon ? (
          <div className="sticker mt-8 bg-azzurro-soft p-5">
            <p className="font-display text-xl font-semibold">In arrivo</p>
            <p className="mt-1 text-ink-soft">Stiamo finendo i campioni. Iscriviti alla newsletter in fondo alla pagina: chi è in lista lo sa per primo.</p>
          </div>
        ) : (
          <>
            <fieldset className="mt-8">
              <div className="mb-2 flex items-center justify-between">
                <legend className="font-display text-lg font-semibold">Taglia{size && `: ${size}`}</legend>
                <Link href="/info#taglie" className="font-display font-medium text-blu underline">
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
                    className={`h-12 min-w-14 cursor-pointer rounded-xl border-2 border-ink px-3 font-display text-lg font-semibold transition-colors duration-150 ${
                      size === s ? "bg-ink text-white" : "bg-carta hover:bg-azzurro-soft"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {size && (
                <p className="mt-2 text-sm text-ink-soft">{SIZE_GUIDE.find((g) => g.size === size)?.razze}</p>
              )}
              {error && (
                <p role="alert" className="mt-2 font-semibold text-rosso">
                  {error}
                </p>
              )}
            </fieldset>

            {product.stock === "low" && <p className="chip mt-5 bg-miele">Ultimi pezzi</p>}

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <QtyStepper qty={qty} onChange={setQty} label={product.name} />
              <button type="button" onClick={add} className="btn btn-primary min-w-56 flex-1">
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

            <p className="mt-4 text-sm font-semibold">
              {missing > 0
                ? `Con questo ordine ti mancano ${eur(missing)} alla spedizione gratuita.`
                : "Con questo ordine la spedizione è gratuita."}
            </p>
          </>
        )}

        <ul className="mt-8 grid grid-cols-2 gap-3 text-sm font-semibold">
          <li className="flex items-center gap-2">
            <Truck size={20} className="text-blu" aria-hidden /> Consegna in 2–4 giorni
          </li>
          <li className="flex items-center gap-2">
            <RotateCcw size={20} className="text-blu" aria-hidden /> Reso entro 30 giorni
          </li>
          <li className="flex items-center gap-2">
            <WashingMachine size={20} className="text-blu" aria-hidden /> Lavabile in lavatrice
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-blu" aria-hidden /> Pagamenti sicuri
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
