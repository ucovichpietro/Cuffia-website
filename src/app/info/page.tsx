import type { Metadata } from "next";
import Link from "next/link";
import { Ruler } from "lucide-react";
import { Barack } from "@/components/Barack";
import { Accordion } from "@/components/Accordion";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { FAQ, FREE_SHIPPING, SIZE_GUIDE } from "@/lib/products";

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
  {
    title: "Prendi confidenza",
    text: "Fagli annusare la cuffia e premialo. I primi giorni tienila su solo per qualche minuto.",
  },
  {
    title: "Infila dalla testa",
    text: "Allarga l'elastico, passa il muso e fai scorrere il tubolare fino al collo, come un collo alto.",
  },
  {
    title: "Sistema le orecchie",
    text: "Accompagna le orecchie dentro il tessuto, distese lungo il collo. L'elastico davanti sta appena prima delle orecchie.",
  },
  {
    title: "Controlla la vestibilità",
    text: "Devono passare due dita sotto l'elastico del collo. Se stringe, serve la taglia più grande.",
  },
  {
    title: "Sfila e lava",
    text: "A fine pasto o passeggiata toglila. Non lasciarla mai indosso senza supervisione.",
  },
];

export default function InfoPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-azzurro-soft">
        <div className="container-x py-14">
          <p className="eyebrow">Tutto quello che c&apos;è da sapere</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">Info</h1>
          <nav aria-label="In questa pagina" className="mt-7 flex flex-wrap gap-2">
            {TOC.map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-carta px-4 font-display font-medium hover:bg-azzurro"
              >
                {t.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* STORIA */}
      <section id="storia" className="container-x grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="eyebrow">Chi siamo</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">La storia di Barack</h2>
          <div className="mt-6 max-w-[62ch] space-y-4 text-lg text-ink-soft">
            <p>
              Barack era un cocker spaniel nero, con il pelo riccio e due orecchie che arrivavano a terra. Bellissime, e
              sempre nel posto sbagliato: nella ciotola, nelle pozzanghere, tra le spighe a giugno.
            </p>
            <p>
              Ogni sera era la stessa storia: asciugamano, spazzola, pazienza. Finché non è arrivata la prima cuffia,
              cucita in casa con una stoffa a scacchi azzurri e bianchi. Un tubolare, due elastici, niente di più.
            </p>
            <p>
              Barack l&apos;ha portata per anni. Al parco la riconoscevano da lontano, e prima o poi qualcuno chiedeva:
              «Ma dove l&apos;avete presa?». CUFFIA nasce da quella domanda.
            </p>
            <p className="font-hand text-3xl leading-tight text-ink">
              Oggi il suo vichy azzurro è la nostra firma. E lui, il primo modello.
            </p>
          </div>
        </div>
        <div className="sticker mx-auto w-full max-w-md rotate-2 !bg-sole">
          <Barack className="w-full" />
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="come-funziona" className="border-y-2 border-ink bg-panna-2">
        <div className="container-x grid gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Guida all&apos;uso</p>
            <h2 className="mt-2 text-4xl sm:text-5xl">Come funziona</h2>
            <p className="mt-4 max-w-[58ch] text-lg text-ink-soft">
              La cuffia è un tubolare di tessuto con due elastici morbidi. Raccoglie le orecchie lungo il collo e lascia
              libero il muso: il cane mangia, beve, annusa e cammina come sempre.
            </p>
            <ol className="mt-8 space-y-5">
              {USO.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-azzurro font-display text-lg font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl">{s.title}</h3>
                    <p className="text-ink-soft">{s.text}</p>
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
      <section id="taglie" className="container-x py-20">
        <p className="eyebrow">Misura due volte, ordina una</p>
        <h2 className="mt-2 text-4xl sm:text-5xl">Guida alle taglie</h2>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="sticker bg-azzurro-soft p-6">
            <Ruler size={32} className="text-blu" aria-hidden />
            <h3 className="mt-3 text-2xl">Come si misura</h3>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-ink-soft">
              <li>
                <strong className="text-ink">Collo:</strong> metro morbido dove appoggia il collare, senza stringere.
              </li>
              <li>
                <strong className="text-ink">Testa:</strong> la circonferenza appena davanti alle orecchie.
              </li>
              <li>Se sei tra due taglie, scegli la più grande.</li>
            </ol>
          </div>
          <div className="overflow-x-auto rounded-3xl border-2 border-ink bg-carta">
            <table className="w-full min-w-[34rem] text-left">
              <caption className="sr-only">Tabella taglie: collo, testa e razze consigliate</caption>
              <thead className="bg-ink font-display text-white">
                <tr>
                  <th scope="col" className="px-4 py-3 font-semibold">Taglia</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Collo</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Testa</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Razze</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_GUIDE.map((g) => (
                  <tr key={g.size} className="border-t-2 border-bordo">
                    <th scope="row" className="px-4 py-3 font-display text-xl font-bold">{g.size}</th>
                    <td className="px-4 py-3 tabular-nums">{g.collo}</td>
                    <td className="px-4 py-3 tabular-nums">{g.testa}</td>
                    <td className="px-4 py-3 text-ink-soft">{g.razze}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SPEDIZIONI */}
      <section id="spedizioni" className="border-y-2 border-ink bg-azzurro-soft">
        <div className="container-x py-20">
          <p className="eyebrow">Senza sorprese</p>
          <h2 className="mt-2 text-4xl sm:text-5xl">Spedizioni e resi</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { t: "Spedizione", d: `5,90 € in Italia. Gratuita sopra i ${FREE_SHIPPING} €. Consegna in 2–4 giorni lavorativi.` },
              { t: "Reso", d: "30 giorni dalla consegna per restituire un prodotto non usato. Ti rimborsiamo sullo stesso metodo di pagamento." },
              { t: "Cambio taglia", d: "Taglia sbagliata? Scrivici: il primo cambio lo spediamo noi." },
            ].map((c) => (
              <div key={c.t} className="sticker p-6">
                <h3 className="text-2xl">{c.t}</h3>
                <p className="mt-2 text-ink-soft">{c.d}</p>
              </div>
            ))}
          </div>
          <Link href="/legale/spedizioni-resi" className="mt-7 inline-block font-display font-medium text-blu underline">
            Leggi le condizioni complete
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-x max-w-4xl py-20">
        <p className="eyebrow">Domande frequenti</p>
        <h2 className="mb-8 mt-2 text-4xl sm:text-5xl">FAQ</h2>
        <Accordion items={FAQ} />
        <p className="mt-8 text-lg">
          Non trovi la risposta?{" "}
          <Link href="/contatti" className="font-display font-medium text-blu underline">
            Scrivici
          </Link>
          .
        </p>
      </section>
    </>
  );
}
