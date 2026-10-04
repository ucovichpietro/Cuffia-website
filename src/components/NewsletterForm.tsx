"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PROMO } from "@/lib/products";

/** Bozza: l'iscrizione non viene inviata a nessun servizio. */
export function NewsletterForm({ id, dark = false, onDone }: { id: string; dark?: boolean; onDone?: () => void }) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className={`flex items-start gap-2 font-medium ${dark ? "text-white" : "text-ink"}`}>
        <Check className="mt-0.5 shrink-0 text-ok" />
        <span>
          Iscrizione fatta. Il tuo codice è <strong>{PROMO.code}</strong>: vale il {PROMO.pct}% sul primo ordine.
        </span>
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Scrivi un'email valida, ad esempio nome@email.it");
        if (!consent) return setError("Per iscriverti serve il consenso alla Privacy Policy.");
        setError("");
        setDone(true);
        onDone?.();
      }}
    >
      <label htmlFor={`nl-${id}`} className={`label ${dark ? "text-white" : ""}`}>
        La tua email
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`nl-${id}`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome@email.it"
          aria-describedby={error ? `nl-err-${id}` : undefined}
          aria-invalid={Boolean(error)}
          className="field text-ink"
        />
        <button type="submit" className={`btn shrink-0 ${dark ? "btn-light" : "btn-blu"}`}>
          Iscrivimi
        </button>
      </div>
      <label className={`mt-3 flex cursor-pointer items-start gap-2 text-sm ${dark ? "text-white/75" : "text-ink-soft"}`}>
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-blu"
        />
        <span>
          Voglio ricevere novità e offerte da CUFFIA e ho letto la{" "}
          <Link href="/legale/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      {error && (
        <p id={`nl-err-${id}`} role="alert" className={`mt-2 text-sm font-semibold ${dark ? "text-rosso-soft" : "text-rosso"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
