"use client";

import { useMemo, useSyncExternalStore } from "react";
import { getProduct, PROMO, FREE_SHIPPING, SHIPPING_COST, type Product } from "./products";

const EVT = "cuffia-storage";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVT, cb);
  };
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** `undefined` finché la pagina non è idratata, poi il valore salvato (o null). */
export function useStored(key: string): string | null | undefined {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => undefined,
  );
}

export function setStored(key: string, value: string | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage non disponibile: lo stato resta solo in memoria di questa scheda */
  }
  window.dispatchEvent(new Event(EVT));
}

export type CartLine = { slug: string; size: string; qty: number };
const CART = "cuffia-cart";
const PROMO_KEY = "cuffia-promo";

function parse(raw: string | null | undefined): CartLine[] {
  if (!raw) return [];
  try {
    const v = JSON.parse(raw);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

function write(lines: CartLine[]) {
  setStored(CART, JSON.stringify(lines));
}

export const cart = {
  add(slug: string, size: string, qty = 1) {
    const lines = parse(read(CART));
    const found = lines.find((l) => l.slug === slug && l.size === size);
    if (found) found.qty += qty;
    else lines.push({ slug, size, qty });
    write(lines);
  },
  setQty(slug: string, size: string, qty: number) {
    const lines = parse(read(CART))
      .map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
    write(lines);
  },
  remove(slug: string, size: string) {
    write(parse(read(CART)).filter((l) => !(l.slug === slug && l.size === size)));
  },
  clear() {
    write([]);
  },
  applyPromo(code: string) {
    const ok = code.trim().toUpperCase() === PROMO.code;
    setStored(PROMO_KEY, ok ? PROMO.code : null);
    return ok;
  },
};

export function useCart() {
  const raw = useStored(CART);
  const promo = useStored(PROMO_KEY);

  return useMemo(() => {
    const lines = parse(raw)
      .map((l) => ({ ...l, product: getProduct(l.slug) }))
      .filter((l): l is CartLine & { product: Product } => Boolean(l.product));
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
    const discount = promo === PROMO.code ? (subtotal * PROMO.pct) / 100 : 0;
    const afterDiscount = subtotal - discount;
    const shipping = lines.length === 0 || afterDiscount >= FREE_SHIPPING ? 0 : SHIPPING_COST;
    return {
      ready: raw !== undefined,
      lines,
      count,
      subtotal,
      discount,
      promoApplied: discount > 0,
      shipping,
      total: afterDiscount + shipping,
      missingForFree: Math.max(0, FREE_SHIPPING - afterDiscount),
    };
  }, [raw, promo]);
}
