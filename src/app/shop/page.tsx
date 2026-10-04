import type { Metadata } from "next";
import { ShopClient, type ShopInitial } from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop: cuffie e accessori",
  description: "Tutte le cuffie paraorecchie CUFFIA: cotone, impermeabili, imbottite e per la pappa. Più gli accessori coordinati.",
};

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const initial: ShopInitial = { cat: one(sp.cat), f: one(sp.f), q: one(sp.q) };
  return <ShopClient key={JSON.stringify(initial)} initial={initial} />;
}
