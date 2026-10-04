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
    <div className="container-x py-14">
      <p className="eyebrow">Siamo qui</p>
      <h1 className="mt-2 text-5xl sm:text-6xl">Contatti</h1>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">
        Dubbi sulla taglia, un ordine da seguire, un reso da fare: scrivici. Rispondiamo entro un giorno lavorativo.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="sticker p-6 sm:p-8">
          <ContactForm />
        </div>
        <div className="space-y-4">
          {INFO.map((i) => (
            <div key={i.label} className="flex gap-4 border-b-2 border-bordo pb-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-ink bg-azzurro">
                <i.icon size={20} aria-hidden />
              </span>
              <div>
                <p className="font-display font-semibold">{i.label}</p>
                <p className="text-ink-soft">{i.value}</p>
              </div>
            </div>
          ))}
          <div className="gingham rounded-3xl border-2 border-ink p-6">
            <p className="inline-block rounded-2xl border-2 border-ink bg-carta px-4 py-3 font-hand text-2xl leading-tight">
              Scrivi pure: le mail le leggo io.
              <br />— Barack
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
