"use client";

import { useSearchParams } from "next/navigation";
import { ShopClient, type ShopInitial } from "./ShopClient";

/** Legge i filtri dall'indirizzo nel browser, così la pagina resta statica. */
export function ShopFromUrl() {
  const sp = useSearchParams();
  const initial: ShopInitial = { cat: sp.get("cat") ?? "", f: sp.get("f") ?? "", q: sp.get("q") ?? "" };
  return <ShopClient key={JSON.stringify(initial)} initial={initial} />;
}
