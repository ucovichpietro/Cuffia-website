"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { cart, useCart } from "@/lib/store";
import { OrderSummary } from "@/components/OrderSummary";
import { EASE_OUT } from "@/components/Providers";

const STEPS = ["Contatti", "Spedizione", "Pagamento"];
const METHODS = ["Carta di credito o debito", "PayPal", "Apple Pay / Google Pay"];

type Data = { email: string; nome: string; indirizzo: string; cap: string; citta: string; provincia: string };
const EMPTY: Data = { email: "", nome: "", indirizzo: "", cap: "", citta: "", provincia: "" };

/** Bozza del checkout: mostra il flusso in tre passi, senza incassare nulla. */
export default function CheckoutPage() {
  const c = useCart();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [d, setD] = useState<Data>(EMPTY);
  const [method, setMethod] = useState(METHODS[0]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const set = (k: keyof Data) => (e: React.ChangeEvent<HTMLInputElement>) => setD({ ...d, [k]: e.target.value });

  const next = () => {
    if (step === 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) return setError("Scrivi un'email valida per ricevere la conferma d'ordine.");
    if (step === 1 && (!d.nome.trim() || !d.indirizzo.trim() || !/^\d{5}$/.test(d.cap) || !d.citta.trim()))
      return setError("Completa nome, indirizzo, città e un CAP di 5 cifre.");
    setError("");
    setDir(1);
    if (step < 2) setStep(step + 1);
    else {
      cart.clear();
      setDone(true);
    }
  };

  if (done) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-ink bg-azzurro">
          <Check size={36} />
        </span>
        <h1 className="mt-5 text-5xl">Ordine di prova completato</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Questo checkout è dimostrativo: non è stato addebitato nulla. Nel sito reale qui arriva la conferma con il
          numero d&apos;ordine e il tracking.
        </p>
        <Link href="/shop" className="btn btn-primary mt-7">
          Torna allo shop
        </Link>
      </div>
    );
  }

  if (c.ready && c.lines.length === 0) {
    return (
      <div className="container-x grid place-items-center gap-4 py-24 text-center">
        <h1 className="text-5xl">Il carrello è vuoto</h1>
        <Link href="/shop" className="btn btn-primary">
          Vai allo shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-12">
      <h1 className="text-5xl">Pagamento</h1>
      <p className="chip mt-3 bg-miele">Checkout dimostrativo: nessun addebito</p>

      <ol className="mt-7 flex flex-wrap gap-2" aria-label="Passi del checkout">
        {STEPS.map((s, i) => (
          <li
            key={s}
            aria-current={i === step ? "step" : undefined}
            className={`flex min-h-11 items-center gap-2 rounded-full border-2 border-ink px-4 font-display font-medium ${
              i === step ? "bg-ink text-white" : i < step ? "bg-azzurro" : "bg-carta text-ink-soft"
            }`}
          >
            <span className="tabular-nums">{i < step ? <Check size={16} /> : i + 1}</span> {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div className="sticker overflow-hidden p-6 sm:p-8">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              initial={{ opacity: 0, x: 30 * dir }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 * dir }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="text-3xl">I tuoi contatti</h2>
                  <p className="text-ink-soft">
                    Puoi ordinare come ospite. Hai già un account?{" "}
                    <Link href="/account" className="font-semibold text-blu underline">
                      Accedi
                    </Link>
                  </p>
                  <div>
                    <label htmlFor="co-email" className="label">Email</label>
                    <input id="co-email" type="email" autoComplete="email" className="field" value={d.email} onChange={set("email")} />
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  <h2 className="text-3xl sm:col-span-2">Dove spediamo</h2>
                  <div className="sm:col-span-2">
                    <label htmlFor="co-nome" className="label">Nome e cognome</label>
                    <input id="co-nome" autoComplete="name" className="field" value={d.nome} onChange={set("nome")} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="co-ind" className="label">Indirizzo e numero civico</label>
                    <input id="co-ind" autoComplete="street-address" className="field" value={d.indirizzo} onChange={set("indirizzo")} />
                  </div>
                  <div>
                    <label htmlFor="co-cap" className="label">CAP</label>
                    <input id="co-cap" inputMode="numeric" autoComplete="postal-code" className="field" value={d.cap} onChange={set("cap")} />
                  </div>
                  <div>
                    <label htmlFor="co-citta" className="label">Città</label>
                    <input id="co-citta" autoComplete="address-level2" className="field" value={d.citta} onChange={set("citta")} />
                  </div>
                </div>
              )}
              {step === 2 && (
                <fieldset>
                  <legend className="text-3xl font-display font-semibold">Come vuoi pagare</legend>
                  <div className="mt-4 space-y-2">
                    {METHODS.map((m) => (
                      <label key={m} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 ${method === m ? "border-ink bg-azzurro-soft" : "border-bordo"}`}>
                        <input type="radio" name="metodo" checked={method === m} onChange={() => setMethod(m)} className="h-5 w-5 accent-blu" />
                        <span className="font-display font-medium">{m}</span>
                      </label>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-ink-soft">
                    Nel sito reale i dati di pagamento vengono inseriti nella pagina sicura del gestore (Stripe, PayPal o Shopify Payments).
                  </p>
                </fieldset>
              )}
            </motion.div>
          </AnimatePresence>

          {error && (
            <p role="alert" className="mt-4 font-semibold text-rosso">
              {error}
            </p>
          )}

          <div className="mt-7 flex flex-wrap gap-3">
            {step > 0 && (
              <button type="button" className="btn btn-ghost" onClick={() => { setDir(-1); setError(""); setStep(step - 1); }}>
                Indietro
              </button>
            )}
            <button type="button" className="btn btn-primary" onClick={next}>
              {step < 2 ? "Continua" : "Conferma l'ordine di prova"}
            </button>
          </div>
        </div>

        <OrderSummary />
      </div>
    </div>
  );
}
