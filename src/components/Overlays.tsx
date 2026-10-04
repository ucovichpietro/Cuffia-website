"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { setStored, useStored } from "@/lib/store";
import { AI } from "@/lib/products";
import { EASE_OUT } from "./Providers";
import { Photo } from "./Photo";
import { NewsletterForm } from "./NewsletterForm";

const CONSENT = "cuffia-consent";
const NL = "cuffia-newsletter";

type Prefs = { preferenze: boolean; statistiche: boolean; marketing: boolean };

const CATEGORIES: { key: keyof Prefs; title: string; text: string }[] = [
  { key: "preferenze", title: "Preferenze", text: "Ricordano lingua e scelte fatte sul sito." },
  { key: "statistiche", title: "Statistiche", text: "Ci aiutano a capire quali pagine funzionano, in forma aggregata." },
  { key: "marketing", title: "Marketing", text: "Servono a mostrarti annunci pertinenti su altri siti." },
];

function save(p: Prefs) {
  setStored(CONSENT, JSON.stringify({ necessari: true, ...p, data: new Date().toISOString() }));
}

/** Banner bloccante con consenso granulare: nessun cookie non necessario prima della scelta. */
function CookieBanner() {
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>({ preferenze: false, statistiche: false, marketing: false });

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/45 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT }}
        className="card max-h-[88vh] w-full max-w-2xl overflow-y-auto p-6 shadow-[var(--shadow-lift)] sm:p-8"
      >
        <h2 id="cookie-title" className="text-3xl">
          Cookie: scegli tu
        </h2>
        <p className="mt-3 text-ink-soft">
          Usiamo cookie necessari per far funzionare il sito. Con il tuo consenso ne usiamo altri per ricordare le tue
          preferenze, misurare le visite e fare marketing. Puoi cambiare idea quando vuoi dalla{" "}
          <Link href="/legale/cookie" className="link">
            Cookie Policy
          </Link>
          .
        </p>

        {custom && (
          <ul className="mt-5 divide-y divide-bordo border-y border-bordo">
            <li className="flex items-center justify-between gap-4 py-3">
              <span>
                <span className="block font-semibold">Necessari</span>
                <span className="text-sm text-ink-soft">Carrello, sicurezza, salvataggio di questa scelta.</span>
              </span>
              <span className="chip bg-fondo-2">Sempre attivi</span>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.key} className="py-3">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span>
                    <span className="block font-semibold">{c.title}</span>
                    <span className="text-sm text-ink-soft">{c.text}</span>
                  </span>
                  <input
                    type="checkbox"
                    role="switch"
                    checked={prefs[c.key]}
                    onChange={(e) => setPrefs({ ...prefs, [c.key]: e.target.checked })}
                    className="h-6 w-6 shrink-0 cursor-pointer accent-blu"
                  />
                </label>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" className="btn btn-primary btn-sm" onClick={() => save({ preferenze: true, statistiche: true, marketing: true })}>
            Accetta tutti
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => save({ preferenze: false, statistiche: false, marketing: false })}>
            Rifiuta
          </button>
          {custom ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => save(prefs)}>
              Salva le mie scelte
            </button>
          ) : (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setCustom(true)}>
              Personalizza
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function NewsletterModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[55] grid place-items-center bg-ink/45 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nl-title"
        initial={{ scale: 0.95, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="card relative grid w-full max-w-3xl overflow-hidden shadow-[var(--shadow-lift)] sm:grid-cols-[0.85fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <Photo photo={AI.ritratto} sizes="340px" className="hidden min-h-[26rem] sm:block" />
        <div className="p-7 sm:p-9">
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-carta hover:bg-fondo-2"
          >
            <X />
          </button>
          <p className="eyebrow">Benvenuto nel branco</p>
          <h2 id="nl-title" className="mt-3 text-4xl">
            10% sul <em>primo ordine</em>
          </h2>
          <p className="mb-6 mt-3 text-ink-soft">
            Iscriviti alla newsletter: nuove fantasie in anteprima, consigli per le orecchie lunghe e niente spam.
          </p>
          <NewsletterForm id="modal" onDone={() => setStored(NL, "iscritto")} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Overlays() {
  const consent = useStored(CONSENT);
  const nl = useStored(NL);
  const [nlOpen, setNlOpen] = useState(false);

  const needsConsent = consent === null;
  const canAskNewsletter = typeof consent === "string" && nl === null;

  useEffect(() => {
    if (!canAskNewsletter) return;
    const t = setTimeout(() => setNlOpen(true), 20000);
    return () => clearTimeout(t);
  }, [canAskNewsletter]);

  return (
    <AnimatePresence>
      {needsConsent && <CookieBanner key="cookie" />}
      {!needsConsent && nlOpen && (
        <NewsletterModal
          key="newsletter"
          onClose={() => {
            setNlOpen(false);
            if (nl === null) setStored(NL, "chiuso");
          }}
        />
      )}
    </AnimatePresence>
  );
}
