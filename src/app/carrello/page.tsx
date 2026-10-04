"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { cart, useCart } from "@/lib/store";
import { eur } from "@/lib/products";
import { ProductArt } from "@/components/Barack";
import { FreeShippingBar, QtyStepper } from "@/components/CartDrawer";
import { OrderSummary } from "@/components/OrderSummary";

export default function CarrelloPage() {
  const c = useCart();

  return (
    <div className="container-x py-12">
      <h1 className="text-5xl">Carrello</h1>

      {!c.ready ? (
        <p className="mt-8 text-ink-soft">Carico il carrello…</p>
      ) : c.lines.length === 0 ? (
        <div className="sticker mt-8 grid place-items-center gap-3 p-12 text-center">
          <p className="eyebrow">Qui è ancora vuoto</p>
          <p className="text-ink-soft">Aggiungi una cuffia: Barack te la tiene da parte.</p>
          <Link href="/shop" className="btn btn-primary">
            Vai allo shop
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <FreeShippingBar missing={c.missingForFree} />
            <ul className="mt-6 divide-y-2 divide-bordo border-y-2 border-bordo">
              {c.lines.map((l) => (
                <li key={`${l.slug}-${l.size}`} className="flex gap-4 py-5">
                  <span className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl border-2 border-ink" style={{ background: l.product.bg }}>
                    <ProductArt product={l.product} className="h-24 w-24" />
                  </span>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link href={`/shop/${l.slug}`} className="font-display text-xl font-semibold hover:underline">
                          {l.product.name}
                        </Link>
                        <p className="text-ink-soft">
                          {l.product.tipo} · Taglia {l.size}
                        </p>
                      </div>
                      <p className="font-display text-xl font-semibold tabular-nums">{eur(l.product.price * l.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper qty={l.qty} label={l.product.name} onChange={(n) => cart.setQty(l.slug, l.size, n)} />
                      <button
                        type="button"
                        onClick={() => cart.remove(l.slug, l.size)}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 font-display font-medium text-ink-soft hover:bg-panna-2 hover:text-rosso"
                      >
                        <Trash2 size={18} /> Rimuovi
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/shop" className="mt-6 inline-block font-display font-medium text-blu underline">
              Continua lo shopping
            </Link>
          </div>
          <OrderSummary
            cta={
              <Link href="/checkout" className="btn btn-primary w-full">
                Vai al pagamento
              </Link>
            }
          />
        </div>
      )}
    </div>
  );
}
