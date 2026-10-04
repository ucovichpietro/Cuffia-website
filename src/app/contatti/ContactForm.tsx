"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";

type Fields = { nome: string; email: string; telefono: string; motivo: string; messaggio: string };
const EMPTY: Fields = { nome: "", email: "", telefono: "", motivo: "Taglie", messaggio: "" };

function validate(f: Fields, consent: boolean) {
  const e: Partial<Record<keyof Fields | "consenso", string>> = {};
  if (!f.nome.trim()) e.nome = "Scrivi il tuo nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Scrivi un'email valida, ad esempio nome@email.it";
  if (f.messaggio.trim().length < 10) e.messaggio = "Raccontaci qualcosa in più: almeno 10 caratteri.";
  if (!consent) e.consenso = "Per inviare il messaggio serve il consenso al trattamento dei dati.";
  return e;
}

/** Bozza: il messaggio non viene inviato a nessun servizio. */
export function ContactForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="grid place-items-center gap-3 py-10 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-azzurro text-blu">
          <Check size={30} />
        </span>
        <h2 className="text-4xl">Messaggio inviato</h2>
        <p className="max-w-sm text-ink-soft">Grazie {f.nome.split(" ")[0]}: ti rispondiamo entro un giorno lavorativo.</p>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setF(EMPTY); setConsent(false); setSent(false); }}>
          Scrivi un altro messaggio
        </button>
      </div>
    );
  }

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: e.target.value });
  const err = (k: keyof typeof errors) =>
    errors[k] && (
      <p id={`err-${k}`} role="alert" className="mt-1 text-sm font-semibold text-rosso">
        {errors[k]}
      </p>
    );

  return (
    <form
      noValidate
      className="grid gap-5 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const v = validate(f, consent);
        setErrors(v);
        if (Object.keys(v).length === 0) setSent(true);
      }}
    >
      <div>
        <label htmlFor="nome" className="label">Nome</label>
        <input id="nome" className="field" autoComplete="name" value={f.nome} onChange={set("nome")} aria-invalid={Boolean(errors.nome)} aria-describedby={errors.nome ? "err-nome" : undefined} />
        {err("nome")}
      </div>
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" type="email" className="field" autoComplete="email" value={f.email} onChange={set("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "err-email" : undefined} />
        {err("email")}
      </div>
      <div>
        <label htmlFor="telefono" className="label">Telefono <span className="text-sm font-normal text-ink-soft">(facoltativo)</span></label>
        <input id="telefono" type="tel" className="field" autoComplete="tel" value={f.telefono} onChange={set("telefono")} />
      </div>
      <div>
        <label htmlFor="motivo" className="label">Di cosa si tratta</label>
        <select id="motivo" className="field cursor-pointer" value={f.motivo} onChange={set("motivo")}>
          <option>Taglie</option>
          <option>Un ordine</option>
          <option>Reso o cambio</option>
          <option>Collaborazioni</option>
          <option>Altro</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="messaggio" className="label">Messaggio</label>
        <textarea id="messaggio" rows={5} className="field" value={f.messaggio} onChange={set("messaggio")} aria-invalid={Boolean(errors.messaggio)} aria-describedby={errors.messaggio ? "err-messaggio" : "aiuto-messaggio"} />
        <p id="aiuto-messaggio" className="mt-1 text-sm text-ink-soft">Per le taglie indica razza, età e misura del collo.</p>
        {err("messaggio")}
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-2 text-ink-soft">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-blu" />
          <span>
            Ho letto la <Link href="/legale/privacy" className="underline underline-offset-2">Privacy Policy</Link> e acconsento al trattamento dei dati per ricevere risposta.
          </span>
        </label>
        {err("consenso")}
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary">Invia il messaggio</button>
      </div>
    </form>
  );
}
