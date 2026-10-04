"use client";

import Link from "next/link";
import { Plus, Star } from "lucide-react";
import { eur, type Product } from "@/lib/products";
import { cart } from "@/lib/store";
import { useUI } from "./Providers";
import { ProductArt } from "./Barack";

export function Badges({ product }: { product: Product }) {
  return (
    <>
      {product.comingSoon && <span className="chip bg-panna-2">In arrivo</span>}
      {product.isNew && <span className="chip bg-azzurro">Novità</span>}
      {product.compareAt && <span className="chip bg-miele">Offerta</span>}
      {product.bestseller && <span className="chip bg-carta">Il più amato</span>}
    </>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const { setCartOpen } = useUI();
  const defaultSize = product.sizes.includes("M") ? "M" : product.sizes[0];

  return (
    <article className="sticker card-lift group relative flex h-full flex-col overflow-hidden">
      <div className="relative grid aspect-square place-items-center border-b-2 border-ink" style={{ background: product.bg }}>
        <ProductArt
          product={product}
          className="w-[82%]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badges product={product} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-sm font-semibold text-ink-soft">{product.tipo}</p>
        <h3 className="text-xl">
          <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0">
            {product.name}
          </Link>
        </h3>
        <p className="text-ink-soft">{product.tagline}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-4">
          <div>
            {product.reviews > 0 && (
              <p className="mb-1 flex items-center gap-1 text-sm text-ink-soft">
                <Star size={14} className="fill-miele text-miele" aria-hidden />
                <span className="tabular-nums">
                  {product.rating.toFixed(1).replace(".", ",")} ({product.reviews})
                </span>
              </p>
            )}
            <p className="font-display text-xl font-semibold tabular-nums">
              {eur(product.price)}
              {product.compareAt && (
                <s className="ml-2 text-base font-normal text-ink-soft">{eur(product.compareAt)}</s>
              )}
            </p>
          </div>
          {!product.comingSoon && (
            <button
              type="button"
              onClick={() => {
                cart.add(product.slug, defaultSize);
                setCartOpen(true);
              }}
              aria-label={`Aggiungi ${product.name} taglia ${defaultSize} al carrello`}
              className="relative z-10 grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full border-2 border-ink bg-miele transition-[transform,background-color] duration-150 hover:bg-sole active:scale-95"
            >
              <Plus />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
