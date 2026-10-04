import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contatti",
  description: "Scrivici per taglie, ordini e resi: rispondiamo entro un giorno lavorativo.",
};

const INFO = [
  { icon: Mail, label: "Email", value: "ciao@cuffia.example" },
  { icon: Phone, label: "Telefono / WhatsApp", value: "[numero da inserire]" },
  { icon: Clock, label: "Orari", value: "Lun–Ven, 9:00–18:00" },
  { icon: MapPin, label: "Sede", value: "[Ragione sociale] · [indirizzo] · P.IVA [da inserire]" },
];

export default function ContattiPage() {
  return (
    <div className="container-x py-16">
      <p className="eyebrow">Siamo qui</p>
      <h1 className="mt-4 text-6xl sm:text-7xl">Contatti</h1>
      <p className="mt-5 max-w-xl text-lg text-ink-soft">
        Dubbi sulla taglia, un ordine da seguire, un reso da fare: scrivici. Rispondiamo entro un giorno lavorativo.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div className="card p-6 shadow-[var(--shadow-soft)] sm:p-9">
          <ContactForm />
        </div>
        <ul>
          {INFO.map((i) => (
            <li key={i.label} className="flex gap-4 border-t border-bordo-forte py-5 last:border-b">
              <i.icon size={22} strokeWidth={1.5} className="mt-0.5 shrink-0 text-blu" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">{i.label}</p>
                <p className="mt-1">{i.value}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
