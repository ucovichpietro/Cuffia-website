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
    <div className="container-x grid gap-14 py-16 lg:grid-cols-2 lg:gap-20">
      <div>
        <p className="eyebrow">Area personale</p>
        <h1 className="mt-4 text-5xl sm:text-6xl">Il tuo account</h1>

        <div role="tablist" aria-label="Accesso" className="mt-7 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => { setTab(t.id); setNote(false); }}
              className={`relative min-h-11 cursor-pointer rounded-full px-5 text-[0.95rem] font-medium transition-colors duration-200 ${tab === t.id ? "text-white" : "text-ink hover:bg-fondo-2"}`}
            >
              {tab === t.id && (
                <motion.span layoutId="account-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
              )}
              <span className="relative">{t.label}</span>
            </button>
          ))}
        </div>

        <form
          className="card mt-6 space-y-4 p-6 shadow-[var(--shadow-soft)] sm:p-9"
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
              <button type="button" className="link cursor-pointer text-sm" onClick={() => setNote(true)}>
                Password dimenticata?
              </button>
            )}
          </div>
          {note && (
            <p role="status" className="rounded-xl bg-azzurro p-3 text-sm font-medium text-blu-deep">
              Area cliente dimostrativa: l&apos;accesso verrà collegato alla piattaforma e-commerce scelta.
            </p>
          )}
        </form>
      </div>

      <div>
        <h2 className="text-4xl">Cosa trovi <em>dentro</em></h2>
        <ul className="mt-8">
          {[
            { icon: Package, t: "Ordini e tracking", d: "Storico, dettaglio di ogni ordine, stato della spedizione, riordino in un clic." },
            { icon: MapPin, t: "Indirizzi e pagamenti", d: "Indirizzi salvati e metodi di pagamento per un checkout più veloce." },
            { icon: Settings, t: "Profilo e comunicazioni", d: "Dati personali, preferenze newsletter, richiesta di reso." },
          ].map((f) => (
            <li key={f.t} className="flex gap-4 border-t border-bordo-forte py-5 last:border-b">
              <f.icon size={22} strokeWidth={1.5} className="mt-1 shrink-0 text-blu" aria-hidden />
              <div>
                <h3 className="text-2xl">{f.t}</h3>
                <p className="text-ink-soft">{f.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
