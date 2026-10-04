"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useUI, EASE_OUT } from "./Providers";
import { useCart } from "@/lib/store";
import { eur, products } from "@/lib/products";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/info#come-funziona", label: "Come funziona" },
  { href: "/info#taglie", label: "Taglie" },
  { href: "/info#storia", label: "La storia" },
  { href: "/contatti", label: "Contatti" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.55rem] font-semibold leading-none tracking-[0.16em] ${className}`}>
      CUFFIA
    </span>
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
    ? products.filter((p) => `${p.name} ${p.tagline} ${p.tipo} ${p.description}`.toLowerCase().includes(term))
    : products;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm"
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
        className="bg-fondo shadow-[var(--shadow-lift)]"
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
              placeholder="Cerca: vichy, pioggia, pile…"
              className="field"
              autoComplete="off"
            />
            <button type="submit" className="btn btn-primary btn-sm shrink-0">
              Cerca
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Chiudi la ricerca"
              className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full hover:bg-fondo-2"
            >
              <X />
            </button>
          </form>
          <p className="eyebrow mt-6">
            {term ? (results.length ? "Suggerimenti" : `Nessun risultato per “${q}”`) : "Le cuffie"}
          </p>
          {term && results.length === 0 && (
            <p className="mt-2 text-ink-soft">Prova con “cotone”, “pioggia” o “pile”.</p>
          )}
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/shop/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl p-2 transition-colors duration-150 hover:bg-carta"
                >
                  <Image
                    src={p.images[0].src}
                    alt=""
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                  <span>
                    <span className="block font-display text-lg leading-tight">{p.name}</span>
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
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  const isHome = pathname === "/";
  // In home, sopra al video, la barra è trasparente con testo bianco
  const overHero = isHome && !scrolled;

  const iconBtn = `relative grid h-11 w-11 cursor-pointer place-items-center rounded-full transition-colors duration-200 ${
    overHero ? "hover:bg-white/15" : "hover:bg-fondo-2"
  }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,color] duration-300 ${
          overHero
            ? "border-b border-transparent text-white"
            : "border-b border-bordo bg-fondo/90 text-ink backdrop-blur-md"
        }`}
      >
        <div className="container-x flex h-[4.5rem] items-center gap-2">
          <button
            type="button"
            className={`${iconBtn} -ml-2 lg:hidden`}
            aria-label="Apri il menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
          <Link href="/" aria-label="CUFFIA, torna alla home" className="mr-auto">
            <Logo />
          </Link>
          <nav aria-label="Principale" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[0.93rem] font-medium transition-colors duration-200 ${
                      overHero ? "hover:bg-white/15" : "hover:bg-fondo-2"
                    }`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden className={`mx-2 hidden h-5 w-px lg:block ${overHero ? "bg-white/40" : "bg-bordo-forte"}`} />
          <button type="button" className={iconBtn} aria-label="Cerca" onClick={() => setSearchOpen(true)}>
            <Search size={21} />
          </button>
          <Link href="/account" className={`${iconBtn} hidden sm:grid`} aria-label="Il tuo account">
            <User size={21} />
          </Link>
          <button
            type="button"
            className={`${iconBtn} -mr-2`}
            aria-label={`Carrello, ${count} ${count === 1 ? "articolo" : "articoli"}`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag size={21} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="absolute right-0.5 top-0.5 grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full bg-blu px-1 text-[0.68rem] font-bold text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>
      {/* la barra è fissa: fuori dalla home serve lo spazio sotto */}
      {!isHome && <div aria-hidden className="h-[4.5rem]" />}

      <AnimatePresence>{searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}</AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm lg:hidden"
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
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="flex h-full w-[min(22rem,88vw)] flex-col bg-fondo p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  className="grid h-11 w-11 cursor-pointer place-items-center rounded-full hover:bg-fondo-2"
                  aria-label="Chiudi il menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X />
                </button>
              </div>
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-bordo py-4 font-display text-2xl"
                >
                  {n.label}
                </Link>
              ))}
              <Link href="/account" onClick={() => setMenuOpen(false)} className="mt-auto py-3 font-medium text-ink-soft">
                Il tuo account
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
