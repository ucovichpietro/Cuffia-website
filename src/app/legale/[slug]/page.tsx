import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FREE_SHIPPING } from "@/lib/products";

type Doc = { title: string; sections: { h: string; p: string[] }[] };

/** Bozze di struttura: i testi definitivi vanno validati da un consulente legale. */
const DOCS: Record<string, Doc> = {
  privacy: {
    title: "Privacy Policy",
    sections: [
      { h: "Titolare del trattamento", p: ["[Ragione sociale], [sede legale], P.IVA [da inserire]. Email: ciao@cuffia.example."] },
      { h: "Quali dati raccogliamo", p: ["Dati di contatto e di consegna forniti con l'ordine, dati di navigazione, preferenze sui cookie, iscrizione alla newsletter."] },
      { h: "Perché li trattiamo", p: ["Per evadere gli ordini (esecuzione del contratto), rispondere alle richieste, adempiere a obblighi di legge e, con il tuo consenso, inviare comunicazioni commerciali."] },
      { h: "Per quanto tempo", p: ["I dati degli ordini sono conservati per i termini fiscali di legge. I dati della newsletter fino alla revoca del consenso."] },
      { h: "I tuoi diritti", p: ["Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità e opporti al trattamento scrivendo al titolare. Puoi presentare reclamo al Garante per la protezione dei dati personali."] },
    ],
  },
  cookie: {
    title: "Cookie Policy",
    sections: [
      { h: "Cosa sono i cookie", p: ["Piccoli file che il sito salva sul tuo dispositivo per funzionare e, con il tuo consenso, per altre finalità."] },
      { h: "Categorie che usiamo", p: ["Necessari: carrello, sicurezza, salvataggio delle preferenze sui cookie. Sempre attivi.", "Preferenze: ricordano lingua e scelte.", "Statistiche: misurano le visite in forma aggregata.", "Marketing: mostrano annunci pertinenti su altri siti."] },
      { h: "Come cambiare idea", p: ["Puoi modificare o revocare il consenso in qualsiasi momento riaprendo il pannello delle preferenze."] },
    ],
  },
  termini: {
    title: "Termini e Condizioni di vendita",
    sections: [
      { h: "Venditore", p: ["[Ragione sociale], [sede legale], P.IVA [da inserire]."] },
      { h: "Ordini e prezzi", p: ["I prezzi sono in euro, IVA inclusa. Il contratto si conclude con l'email di conferma dell'ordine."] },
      { h: "Diritto di recesso", p: ["Il consumatore può recedere entro 14 giorni dalla consegna senza indicarne il motivo, ai sensi del Codice del Consumo. CUFFIA estende il termine a 30 giorni."] },
      { h: "Garanzia legale", p: ["Tutti i prodotti sono coperti dalla garanzia legale di conformità di 24 mesi."] },
      { h: "Legge applicabile", p: ["Si applica la legge italiana. Per le controversie con i consumatori è competente il foro del luogo di residenza del consumatore."] },
    ],
  },
  "spedizioni-resi": {
    title: "Spedizioni e resi",
    sections: [
      { h: "Spedizioni", p: [`Spediamo in Italia con corriere tracciato. Costo 5,90 €, gratuita sopra i ${FREE_SHIPPING} €. Consegna in 2–4 giorni lavorativi.`] },
      { h: "Resi", p: ["Hai 30 giorni dalla consegna per restituire un prodotto non usato e nella confezione originale. Scrivici per ricevere le istruzioni."] },
      { h: "Rimborsi", p: ["Il rimborso avviene sullo stesso metodo di pagamento entro 14 giorni dal ricevimento del reso."] },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(DOCS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/legale/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: DOCS[slug]?.title };
}

export default async function LegalePage({ params }: PageProps<"/legale/[slug]">) {
  const { slug } = await params;
  const doc = DOCS[slug];
  if (!doc) notFound();

  return (
    <article className="container-x max-w-3xl py-16">
      <p className="eyebrow">Note legali</p>
      <h1 className="mt-4 text-5xl sm:text-6xl">{doc.title}</h1>
      <p className="chip mt-5 bg-azzurro text-blu-deep">Bozza da far validare a un consulente legale</p>
      <div className="prose-cuffia mt-6">
        {doc.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
