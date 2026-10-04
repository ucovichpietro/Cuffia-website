"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Package, Settings } from "lucide-react";

const TABS = [
  { id: "accedi", label: "Accedi" },
  { id: "registrati", label: "Crea un account" },
];

/** Bozza dell'area cliente: mostra struttura e campi, senza autenticazione reale. */
export default function AccountPage() {
  const [tab, setTab] = useState("accedi");
  const [note, setNote] = useState(false);

  return (
    <div className="container-x grid gap-12 py-14 lg:grid-cols-2">
      <div>
        <p className="eyebrow">Area personale</p>
        <h1 className="mt-2 text-5xl">Il tuo account</h1>

        <div role="tablist" aria-label="Accesso" className="mt-7 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => { setTab(t.id); setNote(false); }}
              className="relative min-h-11 cursor-pointer rounded-full border-2 border-ink px-5 font-display font-medium"
            >
              {tab === t.id && (
                <motion.span layoutId="account-pill" className="absolute inset-0 rounded-full bg-azzurro" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        <form
          className="sticker mt-6 space-y-4 p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            setNote(true);
          }}
        >
          {tab === "registrati" && (
            <div>
              <label htmlFor="acc-nome" className="label">Nome e cognome</label>
              <input id="acc-nome" className="field" autoComplete="name" />
            </div>
          )}
          <div>
            <label htmlFor="acc-email" className="label">Email</label>
            <input id="acc-email" type="email" className="field" autoComplete="email" />
          </div>
          <div>
            <label htmlFor="acc-pw" className="label">Password</label>
            <input id="acc-pw" type="password" className="field" autoComplete={tab === "accedi" ? "current-password" : "new-password"} />
            {tab === "registrati" && <p className="mt-1 text-sm text-ink-soft">Almeno 8 caratteri.</p>}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button type="submit" className="btn btn-primary">
              {tab === "accedi" ? "Accedi" : "Crea l'account"}
            </button>
            {tab === "accedi" && (
              <button type="button" className="cursor-pointer font-display font-medium text-blu underline" onClick={() => setNote(true)}>
                Password dimenticata?
              </button>
            )}
          </div>
          {note && (
            <p role="status" className="rounded-2xl bg-azzurro-soft p-3 text-sm font-semibold">
              Area cliente dimostrativa: l&apos;accesso verrà collegato alla piattaforma e-commerce scelta.
            </p>
          )}
        </form>
      </div>

      <div>
        <h2 className="text-3xl">Cosa trovi dentro</h2>
        <ul className="mt-6 space-y-4">
          {[
            { icon: Package, t: "Ordini e tracking", d: "Storico, dettaglio di ogni ordine, stato della spedizione, riordino in un clic." },
            { icon: MapPin, t: "Indirizzi e pagamenti", d: "Indirizzi salvati e metodi di pagamento per un checkout più veloce." },
            { icon: Settings, t: "Profilo e comunicazioni", d: "Dati personali, preferenze newsletter, richiesta di reso." },
          ].map((f) => (
            <li key={f.t} className="flex gap-4 border-b-2 border-bordo pb-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-azzurro">
                <f.icon size={20} aria-hidden />
              </span>
              <div>
                <h3 className="text-xl">{f.t}</h3>
                <p className="text-ink-soft">{f.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
