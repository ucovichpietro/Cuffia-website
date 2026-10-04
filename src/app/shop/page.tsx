import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "./ShopClient";
import { ShopFromUrl } from "./ShopFromUrl";

export const metadata: Metadata = {
  title: "Shop: cuffie e accessori",
  description: "Tutte le cuffie paraorecchie CUFFIA: cotone, impermeabili, imbottite e per la pappa. Più gli accessori coordinati.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopClient initial={{ cat: "", f: "", q: "" }} />}>
      <ShopFromUrl />
    </Suspense>
  );
}
