import type { Metadata } from "next";
import Link from "next/link";
import { Ruler } from "lucide-react";
import { Accordion } from "@/components/Accordion";
import { Photo } from "@/components/Photo";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { AI, FAQ, FREE_SHIPPING, SIZE_GUIDE } from "@/lib/products";

export const metadata: Metadata = {
  title: "Info: storia, come funziona, taglie e FAQ",
  description: "La storia di Barack, come si usa la cuffia, la guida alle taglie per razza e le risposte alle domande più frequenti.",
};

const TOC = [
  { href: "#storia", label: "La storia di Barack" },
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#taglie", label: "Guida alle taglie" },
  { href: "#spedizioni", label: "Spedizioni e resi" },
  { href: "#faq", label: "FAQ" },
];

const USO = [
  { title: "Prendi confidenza", text: "Fagli annusare la cuffia e premialo. I primi giorni tienila su solo per qualche minuto." },
  { title: "Infila dalla testa", text: "Allarga l'elastico, passa il muso e fai scorrere il tubolare fino al collo, come un collo alto." },
  { title: "Sistema le orecchie", text: "Accompagna le orecchie dentro il tessuto, distese lungo il collo. L'elastico davanti sta appena dietro gli occhi." },
  { title: "Controlla la vestibilità", text: "Devono passare due dita sotto l'elastico del collo. Se stringe, serve la taglia più grande." },
  { title: "Sfila e lava", text: "A fine pasto o passeggiata toglila. Non lasciarla mai indosso senza supervisione." },
];

export default function InfoPage() {
  return (
    <>
      <section className="border-b border-bordo bg-carta">
        <div className="container-x py-16">
          <p className="eyebrow">Tutto quello che c&apos;è da sapere</p>
          <h1 className="mt-4 text-6xl sm:text-7xl">Info</h1>
          <nav aria-label="In questa pagina" className="mt-9 flex flex-wrap gap-2">
            {TOC.map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="inline-flex min-h-11 items-center rounded-full border border-bordo-forte px-4 text-[0.95rem] font-medium transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* STORIA */}
      <section id="storia" className="section container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow">Chi siamo</p>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]">
            La storia di <em>Barack</em>
          </h2>
          <div className="mt-7 max-w-[60ch] space-y-4 text-lg text-ink-soft">
            <p>
              Barack era un cocker spaniel nero, con il pelo riccio e due orecchie che arrivavano a terra. Bellissime, e
              sempre nel posto sbagliato: nella ciotola, nelle pozzanghere, tra le spighe a giugno.
            </p>
            <p>
              Ogni sera era la stessa storia: asciugamano, spazzola, pazienza. Finché non è arrivata la prima cuffia,
              cucita in casa con una stoffa a scacchi blu e bianchi. Un tubolare, due elastici, niente di più.
            </p>
            <p>
              Barack l&apos;ha portata per anni. Al parco la riconoscevano da lontano, e prima o poi qualcuno chiedeva:
              «Ma dove l&apos;avete presa?». CUFFIA nasce da quella domanda.
            </p>
          </div>
          <p className="mt-8 max-w-[26ch] font-display text-3xl italic leading-tight">
            Oggi il suo vichy è la nostra firma. E lui, il primo modello.
          </p>
        </div>
        <Photo
          photo={AI.ritratto}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[4/5] rounded-[1.5rem] bg-fondo-2 shadow-[var(--shadow-lift)]"
        />
      </section>

      {/* COME FUNZIONA */}
      <section id="come-funziona" className="section bg-fondo-2">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="eyebrow">Guida all&apos;uso</p>
            <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]">
              Come <em>funziona</em>
            </h2>
            <p className="mt-6 max-w-[56ch] text-lg text-ink-soft">
              La cuffia è un tubolare di tessuto con due elastici morbidi. Raccoglie le orecchie lungo il collo e lascia
              libero il muso: il cane mangia, beve, annusa e cammina come sempre.
            </p>
            <ol className="mt-10 space-y-7">
              {USO.map((s, i) => (
                <li key={s.title} className="flex gap-5 border-t border-bordo-forte pt-5">
                  <span className="font-display text-xl text-blu tabular-nums">0{i + 1}</span>
                  <div>
                    <h3 className="text-2xl">{s.title}</h3>
                    <p className="mt-1 text-ink-soft">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:sticky lg:top-28 lg:self-start">
            <BeforeAfter />
            <p className="mt-4 text-sm text-ink-soft">
              La cuffia è un accessorio, non un dispositivo medico. Per problemi alle orecchie rivolgiti al veterinario.
            </p>
          </div>
        </div>
      </section>

      {/* TAGLIE */}
      <section id="taglie" className="section container-x">
        <p className="eyebrow">Misura due volte, ordina una</p>
        <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]">
          Guida alle <em>taglie</em>
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
          <div className="rounded-[1.25rem] bg-azzurro p-7">
            <Ruler size={28} strokeWidth={1.5} className="text-blu" aria-hidden />
            <h3 className="mt-4 text-2xl">Come si misura</h3>
            <ol className="mt-4 list-decimal space-y-2.5 pl-5 text-ink-soft">
              <li>
                <strong className="text-ink">Collo:</strong> metro morbido dove appoggia il collare, senza stringere.
              </li>
              <li>
                <strong className="text-ink">Testa:</strong> la circonferenza appena davanti alle orecchie.
              </li>
              <li>Se sei tra due taglie, scegli la più grande.</li>
            </ol>
          </div>
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[34rem] text-left">
              <caption className="sr-only">Tabella taglie: collo, testa e razze consigliate</caption>
              <thead>
                <tr className="border-b border-bordo text-xs uppercase tracking-[0.14em] text-ink-soft">
                  <th scope="col" className="px-6 py-4 font-semibold">Taglia</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Collo</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Testa</th>
                  <th scope="col" className="px-6 py-4 font-semibold">Razze</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((g) => (
                  <tr key={g.size} className="border-b border-bordo last:border-0">
                    <th scope="row" className="px-6 py-4 font-display text-2xl font-medium">{g.size}</th>
                    <td className="px-6 py-4 tabular-nums">{g.collo}</td>
                    <td className="px-6 py-4 tabular-nums">{g.testa}</td>
                    <td className="px-6 py-4 text-ink-soft">{g.razze}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SPEDIZIONI */}
      <section id="spedizioni" className="section border-y border-bordo bg-carta">
        <div className="container-x">
          <p className="eyebrow">Senza sorprese</p>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]">
            Spedizioni e <em>resi</em>
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[
              { t: "Spedizione", d: `5,90 € in Italia. Gratuita sopra i ${FREE_SHIPPING} €. Consegna in 2–4 giorni lavorativi.` },
              { t: "Reso", d: "30 giorni dalla consegna per restituire un prodotto non usato. Ti rimborsiamo sullo stesso metodo di pagamento." },
              { t: "Cambio taglia", d: "Taglia sbagliata? Scrivici: il primo cambio lo spediamo noi." },
            ].map((c) => (
              <div key={c.t} className="border-t border-ink pt-6">
                <h3 className="text-2xl">{c.t}</h3>
                <p className="mt-2 text-ink-soft">{c.d}</p>
              </div>
            ))}
          </div>
          <Link href="/legale/spedizioni-resi" className="link mt-10 inline-block">
            Leggi le condizioni complete
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section container-x max-w-4xl">
        <p className="eyebrow">Domande frequenti</p>
        <h2 className="mb-10 mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)]">FAQ</h2>
        <Accordion items={FAQ} />
        <p className="mt-10 text-lg">
          Non trovi la risposta?{" "}
          <Link href="/contatti" className="link">
            Scrivici
          </Link>
          .
        </p>
      </section>
    </>
  );
}
