import Link from "next/link";
import { Logo } from "./Header";
import { NewsletterForm } from "./NewsletterForm";

const COLS = [
  {
    title: "Shop",
    links: [
      { href: "/shop?cat=cuffie", label: "Cuffie" },
      { href: "/shop?cat=accessori", label: "Accessori" },
      { href: "/shop?f=novita", label: "Novità" },
      { href: "/shop?f=offerte", label: "Offerte" },
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
    <footer className="mt-24 border-t-2 border-ink bg-ink text-panna">
      <div className="gingham h-4 border-b-2 border-ink" aria-hidden />
      <div className="container-x grid gap-12 py-14 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Logo className="text-white" />
          <p className="mt-4 max-w-sm text-panna/80">
            Cuffie paraorecchie per cani a orecchie lunghe. Nate su Barack, un cocker nero che le orecchie le metteva
            ovunque.
          </p>
          <div className="mt-6 max-w-sm">
            <p className="mb-2 font-display font-medium">Iscriviti: 10% sul primo ordine</p>
            <NewsletterForm id="footer" dark />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {COLS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <p className="font-display text-lg font-semibold text-white">{c.title}</p>
              <ul className="mt-3 space-y-1">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-block py-1.5 text-panna/80 hover:text-white hover:underline">
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
        <div className="container-x flex flex-wrap items-center justify-between gap-3 py-5 text-sm text-panna/70">
          <p>© 2026 CUFFIA · [Ragione sociale] · P.IVA [da inserire] · [Sede legale]</p>
          <p>Pagamenti sicuri: carte, PayPal, Apple Pay, Google Pay</p>
        </div>
      </div>
    </footer>
  );
}
