"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { cart, useCart } from "@/lib/store";
import { eur } from "@/lib/products";
import { FreeShippingBar, QtyStepper } from "@/components/CartDrawer";
import { OrderSummary } from "@/components/OrderSummary";

export default function CarrelloPage() {
  const c = useCart();

  return (
    <div className="container-x py-14">
      <p className="eyebrow">Il tuo ordine</p>
      <h1 className="mt-4 text-5xl sm:text-6xl">Carrello</h1>

      {!c.ready ? (
        <p className="mt-10 text-ink-soft">Carico il carrello…</p>
      ) : c.lines.length === 0 ? (
        <div className="card mt-10 grid place-items-center gap-4 p-14 text-center">
          <p className="font-display text-3xl">Qui è ancora vuoto</p>
          <p className="text-ink-soft">Aggiungi una cuffia: te la teniamo da parte.</p>
          <Link href="/shop" className="btn btn-primary">
            Vai allo shop
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <FreeShippingBar missing={c.missingForFree} />
            <ul className="mt-8 divide-y divide-bordo border-y border-bordo">
              {c.lines.map((l) => (
                <li key={`${l.slug}-${l.size}`} className="flex gap-5 py-6">
                  <Image
                    src={l.product.images[0].src}
                    alt=""
                    width={120}
                    height={150}
                    className="h-[9.5rem] w-[7.5rem] shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <div>
                        <Link href={`/shop/${l.slug}`} className="font-display text-2xl leading-tight hover:underline">
                          {l.product.name}
                        </Link>
                        <p className="mt-1 text-ink-soft">
                          {l.product.tipo} · Taglia {l.size}
                        </p>
                      </div>
                      <p className="font-display text-2xl tabular-nums">{eur(l.product.price * l.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <QtyStepper qty={l.qty} label={l.product.name} onChange={(n) => cart.setQty(l.slug, l.size, n)} />
                      <button
                        type="button"
                        onClick={() => cart.remove(l.slug, l.size)}
                        className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 text-sm font-medium text-ink-soft transition-colors duration-150 hover:bg-fondo-2 hover:text-rosso"
                      >
                        <Trash2 size={17} /> Rimuovi
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/shop" className="link mt-6 inline-block">
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
