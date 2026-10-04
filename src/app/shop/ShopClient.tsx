"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { eur, products, type Size, type Tipo } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { EASE_OUT } from "@/components/Providers";

export type ShopInitial = { cat: string; f: string; q: string };

const CATS = [
  { id: "", label: "Tutto" },
  { id: "cuffie", label: "Cuffie" },
  { id: "accessori", label: "Accessori" },
];
const TIPI: Tipo[] = ["Cotone", "Impermeabile", "Pile"];
const SIZES: Size[] = ["XS", "S", "M", "L"];
const MAX_PRICE = Math.ceil(Math.max(...products.map((p) => p.price)));
const SORTS = [
  { id: "consigliati", label: "Consigliati" },
  { id: "prezzo-su", label: "Prezzo crescente" },
  { id: "prezzo-giu", label: "Prezzo decrescente" },
];

function toggle<T>(list: T[], v: T) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

export function ShopClient({ initial }: { initial: ShopInitial }) {
  const [cat, setCat] = useState(initial.cat);
  const [tipi, setTipi] = useState<Tipo[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [onlyNew, setOnlyNew] = useState(initial.f === "novita");
  const [onlySale, setOnlySale] = useState(initial.f === "offerte");
  const [q, setQ] = useState(initial.q);
  const [sort, setSort] = useState("consigliati");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const out = products.filter(
      (p) =>
        (!cat || p.category === cat) &&
        (tipi.length === 0 || tipi.includes(p.tipo)) &&
        (sizes.length === 0 || sizes.some((s) => p.sizes.includes(s))) &&
        p.price <= maxPrice &&
        (!onlyNew || p.isNew) &&
        (!onlySale || p.compareAt) &&
        (!term || `${p.name} ${p.tagline} ${p.tipo} ${p.category} ${p.description}`.toLowerCase().includes(term)),
    );
    if (sort === "prezzo-su") out.sort((a, b) => a.price - b.price);
    if (sort === "prezzo-giu") out.sort((a, b) => b.price - a.price);
    return out;
  }, [cat, tipi, sizes, maxPrice, onlyNew, onlySale, q, sort]);

  const activeCount =
    tipi.length + sizes.length + (onlyNew ? 1 : 0) + (onlySale ? 1 : 0) + (maxPrice < MAX_PRICE ? 1 : 0) + (q ? 1 : 0);

  const reset = () => {
    setTipi([]);
    setSizes([]);
    setMaxPrice(MAX_PRICE);
    setOnlyNew(false);
    setOnlySale(false);
    setQ("");
  };

  const title = q
    ? `Risultati per “${q}”`
    : onlyNew
      ? "Novità"
      : onlySale
        ? "Offerte"
        : cat === "cuffie"
          ? "Cuffie"
          : cat === "accessori"
            ? "Accessori"
            : "Tutte le cuffie";

  const check = "h-5 w-5 shrink-0 cursor-pointer accent-blu";
  const row = "flex min-h-11 cursor-pointer items-center gap-3";
  const legend = "mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft";
  const pill = (on: boolean) =>
    `min-h-11 cursor-pointer rounded-full border px-4 text-[0.95rem] font-medium transition-colors duration-200 ${
      on ? "border-ink bg-ink text-white" : "border-bordo-forte bg-carta hover:border-ink"
    }`;

  const filters = (
    <div className="space-y-9">
      <fieldset>
        <legend className={legend}>Categoria</legend>
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className={pill(cat === c.id)}>
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={legend}>Tessuto</legend>
        {TIPI.map((t) => (
          <label key={t} className={row}>
            <input type="checkbox" className={check} checked={tipi.includes(t)} onChange={() => setTipi(toggle(tipi, t))} />
            {t}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend className={legend}>Taglia</legend>
        <div className="flex gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={sizes.includes(s)}
              onClick={() => setSizes(toggle(sizes, s))}
              className={`h-11 w-11 cursor-pointer rounded-full border text-sm font-semibold transition-colors duration-200 ${
                sizes.includes(s) ? "border-ink bg-ink text-white" : "border-bordo-forte bg-carta hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="prezzo" className={`${legend} block`}>
          Prezzo: fino a <span className="tabular-nums">{eur(maxPrice)}</span>
        </label>
        <input
          id="prezzo"
          type="range"
          min={20}
          max={MAX_PRICE}
          step={1}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full cursor-pointer accent-blu"
        />
      </div>

      <fieldset>
        <legend className={legend}>Mostra solo</legend>
        <label className={row}>
          <input type="checkbox" className={check} checked={onlyNew} onChange={(e) => setOnlyNew(e.target.checked)} />
          Novità
        </label>
        <label className={row}>
          <input type="checkbox" className={check} checked={onlySale} onChange={(e) => setOnlySale(e.target.checked)} />
          Offerte
        </label>
      </fieldset>

      {activeCount > 0 && (
        <button type="button" onClick={reset} className="btn btn-ghost btn-sm">
          <X size={16} /> Azzera i filtri
        </button>
      )}
    </div>
  );

  const comingSoon = cat === "accessori";

  return (
    <div className="container-x py-14">
      <nav aria-label="Percorso" className="text-sm text-ink-soft">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / <span className="text-ink">Shop</span>
      </nav>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-5xl sm:text-6xl">{title}</h1>
          <p className="mt-3 text-ink-soft" aria-live="polite">
            {list.length} {list.length === 1 ? "prodotto" : "prodotti"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost btn-sm lg:hidden"
            aria-expanded={filtersOpen}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal size={17} /> Filtri{activeCount > 0 && ` (${activeCount})`}
          </button>
          <label htmlFor="ordina" className="sr-only">
            Ordina per
          </label>
          <select id="ordina" value={sort} onChange={(e) => setSort(e.target.value)} className="field !w-auto cursor-pointer !rounded-full font-medium">
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[14rem_1fr]">
        <aside aria-label="Filtri" className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <div className="lg:sticky lg:top-28">{filters}</div>
        </aside>

        {list.length === 0 ? (
          <div className="card grid place-items-center gap-4 p-12 text-center">
            <p className="font-display text-3xl">{comingSoon ? "Accessori in arrivo" : "Nessun risultato"}</p>
            <p className="max-w-md text-ink-soft">
              {comingSoon
                ? "Stiamo lavorando ai primi accessori coordinati alle cuffie. Iscriviti alla newsletter in fondo alla home: chi è in lista lo sa per primo."
                : "Nessun prodotto corrisponde a questi filtri. Prova ad allargarli."}
            </p>
            {comingSoon ? (
              <button type="button" onClick={() => setCat("cuffie")} className="btn btn-primary">
                Vedi le cuffie
              </button>
            ) : (
              <button type="button" onClick={reset} className="btn btn-primary">
                Azzera i filtri
              </button>
            )}
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 xl:grid-cols-3 xl:gap-x-7">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((p) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <ProductCard product={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </div>
  );
}
