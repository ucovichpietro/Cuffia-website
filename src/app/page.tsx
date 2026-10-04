import Link from "next/link";
import { ArrowRight, CloudRain, RotateCcw, Soup, Sprout, Star, Truck, WashingMachine } from "lucide-react";
import { Barack } from "@/components/Barack";
import { Reveal } from "@/components/Reveal";
import { HomeTabs } from "@/components/home/HomeTabs";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { SizeFinder } from "@/components/home/SizeFinder";
import { NewsletterForm } from "@/components/NewsletterForm";
import { FREE_SHIPPING, REVIEWS } from "@/lib/products";

const PROBLEMS = [
  {
    icon: Soup,
    title: "L'ora della pappa",
    text: "Le orecchie finiscono nella ciotola prima del muso. Poi sul pavimento, sul divano, su di te.",
  },
  {
    icon: Sprout,
    title: "L'erba alta",
    text: "Semi, polvere e forasacchi si attaccano al pelo lungo delle orecchie a ogni passeggiata.",
  },
  {
    icon: CloudRain,
    title: "I giorni di pioggia",
    text: "Orecchie bagnate che strisciano a terra: asciugarle ogni volta diventa un lavoro.",
  },
];

const STEPS = [
  { n: "1", title: "Infila", text: "La cuffia passa dalla testa come un collo alto. Tre secondi." },
  { n: "2", title: "Raccogli", text: "Le orecchie restano dentro il tubolare, morbide e al riparo." },
  { n: "3", title: "Sfila e lava", text: "Finita la pappa o la passeggiata, si toglie e va in lavatrice a 30°." },
];

const BREED_STRIP = [
  "Cocker Spaniel",
  "Cavalier King",
  "Springer Spaniel",
  "Basset Hound",
  "Setter",
  "Bassotto a pelo lungo",
  "Barboncino",
  "Bloodhound",
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="overflow-hidden border-b-2 border-ink">
        <div className="container-x grid items-center gap-8 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-16">
          <div>
            <p className="eyebrow">Ciao, sono Barack.</p>
            <h1 className="mt-3 text-[clamp(2.6rem,6vw,4.6rem)]">
              La cuffia che tiene le orecchie <span className="text-blu">fuori dai guai.</span>
            </h1>
            <p className="mt-5 max-w-xl text-xl text-ink-soft">
              Un tubolare morbido che raccoglie le orecchie lunghe di Cocker e compagni: restano pulite a tavola, asciutte
              sotto la pioggia, al riparo nell&apos;erba alta.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop?cat=cuffie" className="btn btn-primary">
                Scopri le cuffie <ArrowRight size={18} />
              </Link>
              <Link href="/info#come-funziona" className="btn btn-ghost">
                Come funziona
              </Link>
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 font-display font-medium">
              <li className="flex items-center gap-2">
                <Truck size={20} className="text-blu" aria-hidden /> Gratis sopra i {FREE_SHIPPING} €
              </li>
              <li className="flex items-center gap-2">
                <RotateCcw size={20} className="text-blu" aria-hidden /> Reso entro 30 giorni
              </li>
              <li className="flex items-center gap-2">
                <WashingMachine size={20} className="text-blu" aria-hidden /> Si lava a 30°
              </li>
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-[30rem]">
            <div className="absolute inset-x-4 bottom-0 top-10 rounded-[3rem] bg-sole border-2 border-ink shadow-[8px_8px_0_var(--color-ink)]" aria-hidden />
            <Barack className="barack-tilt relative w-full" />
            <p className="sticker absolute -left-1 top-6 -rotate-6 px-4 py-2 font-hand text-2xl leading-none sm:left-[-1.5rem]">
              niente più orecchie
              <br />
              nella ciotola!
            </p>
            <p className="sticker absolute -right-1 bottom-10 rotate-3 bg-miele px-4 py-2 font-display font-semibold sm:right-[-1rem]">
              Vichy azzurro, l&apos;originale
            </p>
          </div>
        </div>
      </section>

      {/* RAZZE */}
      <section aria-label="Razze a orecchie lunghe" className="overflow-hidden border-b-2 border-ink bg-azzurro py-3">
        <div className="marquee-track flex w-max gap-10 font-display text-lg font-medium" aria-hidden>
          {[...BREED_STRIP, ...BREED_STRIP].map((b, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap">
              {b} <span className="inline-block h-2 w-2 rounded-full bg-ink" />
            </span>
          ))}
        </div>
        <p className="sr-only">Per {BREED_STRIP.join(", ")}.</p>
      </section>

      {/* IL PROBLEMA */}
      <section className="container-x py-20">
        <Reveal>
          <p className="eyebrow">Chi ha un Cocker lo sa</p>
          <h2 className="mt-2 max-w-2xl text-4xl sm:text-5xl">Orecchie bellissime. E sempre nel posto sbagliato.</h2>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full border-t-2 border-ink pt-5">
                <p.icon size={34} className="text-blu" aria-hidden />
                <h3 className="mt-4 text-2xl">{p.title}</h3>
                <p className="mt-2 text-ink-soft">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section className="border-y-2 border-ink bg-panna-2">
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2">
          <Reveal>
            <BeforeAfter />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">Come funziona</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">Si infila in tre secondi. Lui se ne dimentica.</h2>
            <ol className="mt-8 space-y-6">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-azzurro font-display text-xl font-bold">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="text-xl">{s.title}</h3>
                    <p className="text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/info#come-funziona" className="btn btn-ghost mt-8">
              Guida completa all&apos;uso
            </Link>
          </Reveal>
        </div>
      </section>

      {/* COLLEZIONI */}
      <section className="container-x py-20">
        <Reveal>
          <p className="eyebrow">Lo shop</p>
          <h2 className="mb-8 mt-2 text-4xl sm:text-5xl">Una cuffia per ogni momento</h2>
        </Reveal>
        <HomeTabs />
      </section>

      {/* TAGLIE */}
      <section className="border-y-2 border-ink bg-azzurro-soft">
        <div className="container-x py-20">
          <Reveal>
            <p className="eyebrow">Non solo Cocker</p>
            <h2 className="mb-8 mt-2 max-w-2xl text-4xl sm:text-5xl">Trova la taglia giusta in un clic</h2>
            <SizeFinder />
          </Reveal>
        </div>
      </section>

      {/* STORIA */}
      <section className="container-x grid items-center gap-12 py-20 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="relative mx-auto max-w-sm">
            <div className="sticker -rotate-3 bg-carta p-4 pb-5">
              <div className="rounded-2xl border-2 border-ink bg-sole">
                <Barack className="w-full" />
              </div>
              <p className="mt-3 text-center font-hand text-3xl leading-none">Barack, il primo modello</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow">La nostra storia</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">Tutto è cominciato da un cocker nero.</h2>
          <p className="mt-5 text-lg text-ink-soft">
            Barack aveva due orecchie lunghe, ricce e nerissime. Le infilava nella ciotola, le trascinava nelle
            pozzanghere, le riportava a casa piene di semi. La prima cuffia è stata cucita per lui: un tubolare a
            scacchi azzurri e bianchi.
          </p>
          <p className="mt-3 text-lg text-ink-soft">
            Funzionava così bene che al parco hanno iniziato a chiedercela. CUFFIA è nata lì, e porta ancora il suo
            vichy.
          </p>
          <Link href="/info#storia" className="btn btn-primary mt-7">
            Leggi la storia di Barack
          </Link>
        </Reveal>
      </section>

      {/* RECENSIONI */}
      <section className="border-y-2 border-ink bg-ink text-panna">
        <div className="container-x py-20">
          <Reveal>
            <p className="eyebrow !text-azzurro">Dicono di noi</p>
            <h2 className="mt-2 text-4xl text-white sm:text-5xl">Padroni contenti, orecchie pulite</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <figure className="flex h-full flex-col rounded-3xl border-2 border-panna/30 p-6">
                  <div className="flex gap-1" aria-label="5 stelle su 5">
                    {Array.from({ length: 5 }, (_, k) => (
                      <Star key={k} size={18} className="fill-miele text-miele" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-lg">“{r.text}”</blockquote>
                  <figcaption className="mt-5 font-display">
                    <span className="font-semibold text-white">{r.name}</span>
                    <span className="block text-sm text-panna/70">{r.dog}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-panna/60">Recensioni di esempio: verranno sostituite da quelle verificate dei clienti.</p>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-x pt-20">
        <Reveal>
          <div className="sticker grid items-center gap-8 bg-miele p-7 sm:p-10 lg:grid-cols-2">
            <div>
              <p className="font-hand text-3xl leading-none">Entra nel branco</p>
              <h2 className="mt-2 text-4xl">10% sul primo ordine</h2>
              <p className="mt-3 max-w-md">
                Nuove fantasie in anteprima e consigli pratici per chi vive con un cane a orecchie lunghe.
              </p>
            </div>
            <div className="rounded-3xl border-2 border-ink bg-carta p-5">
              <NewsletterForm id="home" />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
