"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { eur, type Product } from "@/lib/products";
import { cart } from "@/lib/store";
import { useUI } from "./Providers";
import { Photo } from "./Photo";

export function Badges({ product }: { product: Product }) {
  return (
    <>
      {product.isNew && <span className="chip bg-blu text-white">Novità</span>}
      {product.bestseller && <span className="chip">Il più amato</span>}
      {product.compareAt && <span className="chip bg-ink text-white">Offerta</span>}
      {product.stock === "low" && <span className="chip">Ultimi pezzi</span>}
    </>
  );
}

const SIZES = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";

export function ProductCard({ product }: { product: Product }) {
  const { setCartOpen } = useUI();
  const defaultSize = product.sizes.includes("M") ? "M" : product.sizes[0];
  const [first, second] = product.images;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-fondo-2">
        <Photo photo={first} sizes={SIZES} className="absolute inset-0" compact />
        {second && (
          <Photo
            photo={second}
            sizes={SIZES}
            compact
            className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 motion-reduce:transition-none"
          />
        )}
        <div className="absolute left-3 top-3 z-[3] flex flex-wrap gap-1.5">
          <Badges product={product} />
        </div>
        <button
          type="button"
          onClick={() => {
            cart.add(product.slug, defaultSize);
            setCartOpen(true);
          }}
          aria-label={`Aggiungi ${product.name} taglia ${defaultSize} al carrello`}
          className="absolute bottom-3 right-3 z-10 grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-white text-ink shadow-[var(--shadow-soft)] transition-colors duration-200 hover:bg-blu hover:text-white active:scale-95"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <h3 className="text-xl sm:text-[1.35rem]">
            <Link href={`/shop/${product.slug}`} className="after:absolute after:inset-0 after:z-[4]">
              {product.name}
            </Link>
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">{product.tagline}</p>
        </div>
        <p className="shrink-0 font-display text-xl tabular-nums sm:text-[1.35rem]">
          {product.compareAt && <s className="mr-2 text-base text-ink-soft">{eur(product.compareAt)}</s>}
          {eur(product.price)}
        </p>
      </div>
    </article>
  );
}
