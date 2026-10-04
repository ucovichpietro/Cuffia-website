"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { setStored, useStored } from "@/lib/store";
import { EASE_OUT } from "./Providers";
import { Barack } from "./Barack";
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
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/45 p-3 sm:p-6"
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
        className="sticker max-h-[88vh] w-full max-w-2xl overflow-y-auto p-5 sm:p-7"
      >
        <h2 id="cookie-title" className="text-2xl">
          Biscotti? Solo quelli che vuoi tu
        </h2>
        <p className="mt-2 text-ink-soft">
          Usiamo cookie necessari per far funzionare il sito. Con il tuo consenso ne usiamo altri per ricordare le tue
          preferenze, misurare le visite e fare marketing. Puoi cambiare idea quando vuoi dalla{" "}
          <Link href="/legale/cookie" className="font-semibold text-blu underline">
            Cookie Policy
          </Link>
          .
        </p>

        {custom && (
          <ul className="mt-4 space-y-2">
            <li className="flex items-center justify-between gap-4 rounded-2xl bg-panna p-3">
              <span>
                <span className="block font-display font-semibold">Necessari</span>
                <span className="text-sm text-ink-soft">Carrello, sicurezza, salvataggio di questa scelta.</span>
              </span>
              <span className="chip bg-panna-2">Sempre attivi</span>
            </li>
            {CATEGORIES.map((c) => (
              <li key={c.key} className="rounded-2xl bg-panna p-3">
                <label className="flex cursor-pointer items-center justify-between gap-4">
                  <span>
                    <span className="block font-display font-semibold">{c.title}</span>
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

        <div className="mt-5 flex flex-wrap gap-3">
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
      className="fixed inset-0 z-[55] grid place-items-center bg-ink/45 p-4"
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
        initial={{ scale: 0.94, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="sticker relative grid w-full max-w-3xl overflow-hidden sm:grid-cols-[0.8fr_1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden place-items-end border-r-2 border-ink bg-sole sm:grid">
          <Barack className="w-full" />
        </div>
        <div className="p-6 sm:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute right-3 top-3 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-carta hover:bg-panna-2"
          >
            <X />
          </button>
          <p className="eyebrow">Barack ti fa lo sconto</p>
          <h2 id="nl-title" className="mt-1 text-3xl">
            10% sul primo ordine
          </h2>
          <p className="mb-5 mt-2 text-ink-soft">
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
    const t = setTimeout(() => setNlOpen(true), 9000);
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
