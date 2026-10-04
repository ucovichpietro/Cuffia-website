import Link from "next/link";
import { ArrowRight, CloudRain, Soup, Sprout } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { SizeFinder } from "@/components/home/SizeFinder";
import { Gallery } from "@/components/home/Gallery";
import { Reveal } from "@/components/Reveal";
import { Photo } from "@/components/Photo";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AI, FREE_SHIPPING, GALLERY, products } from "@/lib/products";

const STRIP = [
  `Spedizione gratuita sopra i ${FREE_SHIPPING} €`,
  "Reso entro 30 giorni",
  "Si lava in lavatrice a 30°",
  "Per Cocker, Cavalier, Springer, Setter e Basset",
];

const PROBLEMS = [
  { icon: Soup, title: "L'ora della pappa", text: "Le orecchie finiscono nella ciotola prima del muso. Poi sul pavimento, sul divano, su di te." },
  { icon: Sprout, title: "L'erba alta", text: "Semi, polvere e forasacchi si attaccano al pelo lungo delle orecchie a ogni passeggiata." },
  { icon: CloudRain, title: "I giorni di pioggia", text: "Orecchie bagnate che strisciano a terra: asciugarle ogni volta diventa un lavoro." },
];

const STEPS = [
  { photo: GALLERY[6], title: "Infila", text: "Passa dalla testa come un collo alto. Pochi secondi, senza fibbie né lacci." },
  { photo: products[0].images[2], title: "Raccogli", text: "Le orecchie restano distese dentro il tessuto, lungo il collo. Muso e occhi sono liberi." },
  { photo: AI.tessuto, title: "Sfila e lava", text: "Finita la pappa o la passeggiata si toglie e va in lavatrice a 30°." },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* STRISCIA INFORMAZIONI */}
      <section aria-label="In breve" className="overflow-hidden border-b border-bordo bg-carta py-3.5">
        <div className="marquee-track flex w-max gap-12 text-sm font-medium" aria-hidden>
          {[...STRIP, ...STRIP, ...STRIP, ...STRIP].map((s, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap">
              {s} <span className="inline-block h-1.5 w-1.5 rounded-full bg-blu" />
            </span>
          ))}
        </div>
        <p className="sr-only">{STRIP.join(". ")}.</p>
      </section>

      {/* IL PROBLEMA */}
      <section className="section container-x">
        <Reveal>
          <p className="eyebrow">Chi ha un Cocker lo sa</p>
          <h2 className="mt-5 max-w-5xl text-[clamp(2rem,4.6vw,3.9rem)]">
            Orecchie bellissime. E sempre <em>nel posto sbagliato.</em>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="border-t border-ink pt-6">
                <p.icon size={28} strokeWidth={1.5} className="text-blu" aria-hidden />
                <h3 className="mt-5 text-2xl">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CON E SENZA */}
      <section className="section bg-fondo-2">
        <div className="container-x">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Con e senza</p>
              <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.9rem)]">
                Trascina. <em>Vedi la differenza.</em>
              </h2>
            </div>
            <p className="max-w-sm text-ink-soft">
              Stesso cane, stessa passeggiata. A sinistra le orecchie sono raccolte nel cotone, a destra sono libere di
              spazzare il marciapiede.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <BeforeAfter />
          </Reveal>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="section container-x">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Come funziona</p>
            <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.9rem)]">
              Si infila in un attimo. <em>Lui se ne dimentica.</em>
            </h2>
          </div>
          <Link href="/info#come-funziona" className="btn btn-ghost">
            Guida completa all&apos;uso
          </Link>
        </Reveal>
        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08}>
                <Photo
                  photo={s.photo}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="aspect-[4/5] rounded-[1.25rem] bg-fondo-2"
                />
                <p className="mt-5 font-display text-lg text-blu tabular-nums">0{i + 1}</p>
                <h3 className="mt-1 text-2xl">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* LE CUFFIE */}
      <section className="section border-y border-bordo bg-carta">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Lo shop</p>
              <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.9rem)]">
                Una cuffia per <em>ogni momento</em>
              </h2>
            </div>
            <Link href="/shop" className="btn btn-primary">
              Vedi tutte le cuffie <ArrowRight size={18} />
            </Link>
          </Reveal>
          <ul className="mt-14 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4 lg:gap-x-7">
            {products.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 0.06} className="h-full">
                  <ProductCard product={p} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TAGLIE */}
      <section className="section container-x">
        <Reveal>
          <p className="eyebrow">Non solo Cocker</p>
          <h2 className="mb-12 mt-5 max-w-3xl text-[clamp(2rem,4.6vw,3.9rem)]">
            Trova la taglia giusta <em>in un clic</em>
          </h2>
          <SizeFinder />
        </Reveal>
      </section>

      {/* DAL VIVO */}
      <section className="section bg-fondo-2">
        <Reveal className="container-x mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Dal vivo</p>
            <h2 className="mt-5 text-[clamp(2rem,4.6vw,3.9rem)]">
              Foto vere, <em>cani veri</em>
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            Nessun set fotografico: sono le cuffie portate tutti i giorni, al bar, al mare, sul marciapiede sotto casa.
          </p>
        </Reveal>
        <Gallery />
      </section>

      {/* STORIA */}
      <section className="section container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Photo
            photo={AI.orecchie}
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/5] rounded-[1.5rem] bg-fondo-2 shadow-[var(--shadow-lift)]"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">La nostra storia</p>
          <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.5rem)]">
            Tutto è cominciato da <em>un cocker nero.</em>
          </h2>
          <p className="mt-6 text-lg text-ink-soft">
            Barack aveva due orecchie lunghe, ricce e nerissime. Le infilava nella ciotola, le trascinava nelle
            pozzanghere, le riportava a casa piene di semi. La prima cuffia è stata cucita per lui: un tubolare a
            scacchi blu e bianchi.
          </p>
          <p className="mt-4 text-lg text-ink-soft">
            Funzionava così bene che al parco hanno iniziato a chiedercela. CUFFIA è nata lì, e porta ancora il suo
            vichy.
          </p>
          <Link href="/info#storia" className="btn btn-ghost mt-8">
            Leggi la storia di Barack
          </Link>
        </Reveal>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-blu text-white">
        <div className="vichy-line" aria-hidden />
        <div className="container-x grid items-center gap-10 py-20 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Entra nel branco</p>
            <h2 className="mt-4 text-[clamp(2rem,4.2vw,3.5rem)]">
              10% sul <em>primo ordine</em>
            </h2>
            <p className="mt-4 max-w-md text-white/85">
              Nuove fantasie in anteprima e consigli pratici per chi vive con un cane a orecchie lunghe.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[1.25rem] bg-white p-6 text-ink shadow-[var(--shadow-lift)]">
              <NewsletterForm id="home" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
