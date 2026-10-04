import Link from "next/link";
import { Logo } from "./Header";
import { FREE_SHIPPING } from "@/lib/products";

const COLS = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Tutte le cuffie" },
      { href: "/shop/la-barack", label: "La Barack" },
      { href: "/shop?f=novita", label: "Novità" },
      { href: "/shop?cat=accessori", label: "Accessori" },
    ],
  },
  {
    title: "Info",
    links: [
      { href: "/info#storia", label: "Chi siamo" },
      { href: "/info#come-funziona", label: "Come funziona" },
      { href: "/info#taglie", label: "Guida alle taglie" },
      { href: "/info#faq", label: "FAQ" },
      { href: "/contatti", label: "Contatti" },
    ],
  },
  {
    title: "Legale",
    links: [
      { href: "/legale/spedizioni-resi", label: "Spedizioni e resi" },
      { href: "/legale/privacy", label: "Privacy Policy" },
      { href: "/legale/cookie", label: "Cookie Policy" },
      { href: "/legale/termini", label: "Termini e Condizioni" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-14 py-16 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Logo className="text-[2rem]" />
          <p className="mt-5 max-w-sm text-white/70">
            Cuffie paraorecchie per cani a orecchie lunghe. Nate su Barack, un cocker nero che le orecchie le metteva
            ovunque.
          </p>
          <p className="mt-6 text-sm text-white/60">
            Spedizione gratuita sopra i {FREE_SHIPPING} € · Reso entro 30 giorni
          </p>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/55">{c.title}</p>
              <ul className="mt-4 space-y-1">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="inline-block py-1.5 text-white/85 underline-offset-4 transition-colors duration-150 hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-6 text-sm text-white/55">
          <p>© 2026 CUFFIA · [Ragione sociale] · P.IVA [da inserire] · [Sede legale]</p>
          <p>Le immagini generate con AI sono indicate sul sito.</p>
        </div>
      </div>
    </footer>
  );
}
