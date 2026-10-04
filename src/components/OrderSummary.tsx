"use client";

import { useState } from "react";
import { cart, useCart } from "@/lib/store";
import { eur, PROMO } from "@/lib/products";

export function OrderSummary({ cta }: { cta?: React.ReactNode }) {
  const c = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  return (
    <aside aria-label="Riepilogo ordine" className="sticker h-fit p-6">
      <h2 className="text-2xl">Riepilogo</h2>
      <dl className="mt-4 space-y-2 tabular-nums">
        <div className="flex justify-between">
          <dt>Subtotale</dt>
          <dd>{eur(c.subtotal)}</dd>
        </div>
        {c.promoApplied && (
          <div className="flex justify-between text-salvia">
            <dt>
              Sconto {PROMO.code} (−{PROMO.pct}%)
            </dt>
            <dd>−{eur(c.discount)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt>Spedizione</dt>
          <dd>{c.shipping === 0 ? "Gratuita" : eur(c.shipping)}</dd>
        </div>
        <div className="flex justify-between border-t-2 border-ink pt-3 font-display text-2xl font-semibold">
          <dt>Totale</dt>
          <dd>{eur(c.total)}</dd>
        </div>
      </dl>
      <p className="mt-1 text-sm text-ink-soft">IVA inclusa.</p>

      <form
        className="mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          const ok = cart.applyPromo(code);
          setMsg(ok ? { ok, text: `Codice applicato: −${PROMO.pct}%.` } : { ok, text: "Codice non valido. Controlla come è scritto." });
        }}
      >
        <label htmlFor="promo" className="label">
          Codice sconto
        </label>
        <div className="flex gap-2">
          <input id="promo" className="field uppercase" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Es. BARACK10" />
          <button type="submit" className="btn btn-ghost btn-sm shrink-0">
            Applica
          </button>
        </div>
        {msg && (
          <p role="status" className={`mt-2 text-sm font-semibold ${msg.ok ? "text-salvia" : "text-rosso"}`}>
            {msg.text}
          </p>
        )}
      </form>
      {cta && <div className="mt-6">{cta}</div>}
    </aside>
  );
}
