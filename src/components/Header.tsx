"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useUI, EASE_OUT } from "./Providers";
import { useCart } from "@/lib/store";
import { eur, products, FREE_SHIPPING } from "@/lib/products";
import { ProductArt } from "./Barack";

const NAV = [
  { href: "/shop?cat=cuffie", label: "Cuffie" },
  { href: "/shop?cat=accessori", label: "Accessori" },
  { href: "/shop?f=novita", label: "Novità" },
  { href: "/shop?f=offerte", label: "Offerte" },
  { href: "/info#come-funziona", label: "Come funziona" },
  { href: "/info#storia", label: "La storia di Barack" },
  { href: "/contatti", label: "Contatti" },
];

const MESSAGES = [
  `Spedizione gratuita sopra i ${FREE_SHIPPING} €`,
  "Reso facile entro 30 giorni",
  "10% sul primo ordine con la newsletter",
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-[1.7rem] font-bold tracking-wide ${className}`}>
      <span aria-hidden className="gingham inline-block h-6 w-6 rotate-6 rounded-md border-2 border-ink" style={{ backgroundSize: "12px 12px" }} />
      CUFFIA
    </span>
  );
}

function AnnouncementBar() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bg-blu text-white">
      <div className="container-x flex h-9 items-center justify-center overflow-hidden text-sm font-semibold">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {MESSAGES[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const term = q.trim().toLowerCase();
  const results = term
    ? products
        .filter((p) => `${p.name} ${p.tagline} ${p.tipo} ${p.category}`.toLowerCase().includes(term))
        .slice(0, 5)
    : products.filter((p) => p.bestseller);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 bg-ink/40"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Cerca nel sito"
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -16, opacity: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="border-b-2 border-ink bg-panna"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="container-x py-6">
          <form
            className="flex items-center gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
              onClose();
            }}
          >
            <label htmlFor="cerca" className="sr-only">
              Cerca un prodotto
            </label>
            <input
              id="cerca"
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cerca: pioggia, vichy, pappa…"
              className="field"
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary btn-sm shrink-0">
              Cerca
            </button>
            <button type="button" onClick={onClose} aria-label="Chiudi la ricerca" className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full hover:bg-panna-2">
              <X />
            </button>
          </form>
          <p className="mt-5 font-display text-sm font-medium text-ink-soft">
            {term ? (results.length ? "Suggerimenti" : `Nessun risultato per "${q}". Prova con "cotone" o "pioggia".`) : "I più cercati"}
          </p>
          <ul className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/shop/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl border-2 border-transparent p-2 hover:border-ink hover:bg-carta"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl" style={{ background: p.bg }}>
                    <ProductArt product={p} className="h-12 w-12" />
                  </span>
                  <span>
                    <span className="block font-display font-semibold leading-tight">{p.name}</span>
                    <span className="text-sm text-ink-soft">
                      {p.tipo} · {eur(p.price)}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Header() {
  const { setCartOpen } = useUI();
  const { count } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const iconBtn =
    "relative grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors duration-150 hover:bg-panna-2";

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-panna">
        <div className="container-x flex h-[4.5rem] items-center gap-4">
          <button
            type="button"
            className={`${iconBtn} xl:hidden`}
            aria-label="Apri il menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
          <Link href="/" aria-label="CUFFIA, torna alla home" className="mr-auto lg:mr-4">
            <Logo />
          </Link>
          <nav aria-label="Principale" className="mr-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n, i) => (
                <li key={n.href} className={i > 4 ? "hidden xl:block" : undefined}>
                  <Link
                    href={n.href}
                    className="whitespace-nowrap rounded-full px-3 py-2 font-display text-[0.98rem] font-medium transition-colors duration-150 hover:bg-azzurro-soft"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" className={iconBtn} aria-label="Cerca" onClick={() => setSearchOpen(true)}>
            <Search />
          </button>
          <Link href="/account" className={`${iconBtn} hidden sm:grid`} aria-label="Il tuo account">
            <User />
          </Link>
          <button type="button" className={iconBtn} aria-label={`Carrello, ${count} ${count === 1 ? "articolo" : "articoli"}`} onClick={() => setCartOpen(true)}>
            <ShoppingBag />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full border-2 border-ink bg-miele px-1 font-display text-xs font-bold"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      <AnimatePresence>{searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}</AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              aria-label="Menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="flex h-full w-[min(22rem,88vw)] flex-col gap-1 border-r-2 border-ink bg-panna p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <Logo />
                <button type="button" className={iconBtn} aria-label="Chiudi il menu" onClick={() => setMenuOpen(false)}>
                  <X />
                </button>
              </div>
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-3 font-display text-xl font-medium hover:bg-azzurro-soft"
                >
                  {n.label}
                </Link>
              ))}
              <Link href="/account" onClick={() => setMenuOpen(false)} className="mt-auto rounded-2xl px-3 py-3 font-display text-lg hover:bg-azzurro-soft">
                Il tuo account
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
