export type Size = "XS" | "S" | "M" | "L";
export type Category = "cuffie" | "accessori";
export type Tipo = "Cotone" | "Impermeabile" | "Pile";

export type Photo = {
  src: string;
  alt: string;
  /** true: immagine generata con AI (va dichiarato a schermo) */
  ai?: boolean;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  tipo: Tipo;
  price: number;
  compareAt?: number;
  sizes: Size[];
  images: Photo[];
  isNew?: boolean;
  bestseller?: boolean;
  stock: "ok" | "low";
  description: string;
  bullets: string[];
  materiale: string;
  lavaggio: string;
};

export const FREE_SHIPPING = 49;
export const SHIPPING_COST = 5.9;
export const PROMO = { code: "BARACK10", pct: 10 };

export const eur = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" }).format(n);

const real = (file: string, alt: string): Photo => ({ src: `/media/vere/${file}.jpg`, alt });

/** Immagini generate con AI a partire dalle foto reali della cuffia. */
export const AI = {
  hero: { src: "/media/hero-still.jpg", alt: "Barack, cocker nero, cammina sul lungomare con la cuffia vichy blu", ai: true },
  ritratto: { src: "/media/barack-ritratto.jpg", alt: "Barack con la cuffia vichy blu", ai: true },
  orecchie: { src: "/media/barack-orecchie.jpg", alt: "Barack senza cuffia, con le orecchie lunghe e ricce", ai: true },
  tessuto: { src: "/media/dettaglio-tessuto.jpg", alt: "Dettaglio del cotone vichy blu e dell'elastico arricciato", ai: true },
  con: { src: "/media/confronto-con.jpg", alt: "Barack con la cuffia: orecchie raccolte nel tessuto", ai: true },
  senza: { src: "/media/confronto-senza.jpg", alt: "Barack senza cuffia: orecchie lunghe libere", ai: true },
} satisfies Record<string, Photo>;

const ALL: Size[] = ["XS", "S", "M", "L"];

/** Catalogo allineato alle cuffie che esistono davvero (vedi cartella "photo"). */
export const products: Product[] = [
  {
    slug: "la-barack",
    name: "La Barack",
    tagline: "Vichy blu, l'originale",
    category: "cuffie",
    tipo: "Cotone",
    price: 24,
    sizes: ALL,
    bestseller: true,
    stock: "ok",
    images: [
      AI.ritratto,
      real("vichy-blu-01", "Cocker nero seduto con la cuffia vichy blu"),
      real("vichy-blu-05", "La cuffia vichy blu vista di lato: copre orecchie e collo"),
      real("vichy-blu-02", "Cocker nero di profilo con la cuffia vichy blu"),
      AI.tessuto,
    ],
    description:
      "È la cuffia da cui è nato tutto: il vichy blu e bianco che Barack portava ogni giorno. Un tubolare di cotone leggero raccoglie le orecchie lunghe e le tiene fuori dalla ciotola, dalle pozzanghere e dall'erba alta. Due elastici morbidi la tengono al suo posto senza stringere: si infila in pochi secondi e il cane se ne dimentica.",
    bullets: [
      "Orecchie pulite e asciutte a ogni pasto e passeggiata",
      "Cotone leggero e traspirante, adatto a tutte le stagioni",
      "Doppio elastico morbido: resta su senza stringere",
      "Si lava in lavatrice a 30°",
    ],
    materiale: "Cotone vichy tinto in filo, elastici rivestiti.",
    lavaggio: "Lavatrice a 30°, no asciugatrice. Stirare a bassa temperatura.",
  },
  {
    slug: "vichy-azzurro",
    name: "Vichy Azzurro",
    tagline: "Quadretti chiari, color cielo",
    category: "cuffie",
    tipo: "Cotone",
    price: 24,
    sizes: ALL,
    isNew: true,
    stock: "ok",
    images: [
      real("vichy-azzurro-01", "Cocker nero con la cuffia vichy azzurra"),
      real("vichy-azzurro-02", "La cuffia vichy azzurra portata morbida sul collo"),
    ],
    description:
      "Lo stesso taglio della Barack, in un vichy più chiaro: azzurro cielo e bianco. Cotone fresco per tutti i giorni, a tavola, al parco, in macchina.",
    bullets: [
      "Tiene le orecchie fuori da ciotola e sporco",
      "Cotone traspirante per l'uso quotidiano",
      "Doppio elastico morbido",
      "Si lava in lavatrice a 30°",
    ],
    materiale: "Cotone vichy tinto in filo, elastici rivestiti.",
    lavaggio: "Lavatrice a 30°, no asciugatrice.",
  },
  {
    slug: "cuffia-pioggia",
    name: "Cuffia Pioggia",
    tagline: "Tessuto tecnico grigio, per i giorni bagnati",
    category: "cuffie",
    tipo: "Impermeabile",
    price: 28,
    sizes: ["S", "M", "L"],
    stock: "ok",
    images: [
      real("tecnica-grigia-01", "Cocker nero con la cuffia in tessuto tecnico grigio"),
      real("tecnica-grigia-02", "La cuffia grigia impermeabile vista dall'alto"),
    ],
    description:
      "In tessuto tecnico leggero, per quando fuori piove. Le orecchie tornano a casa asciutte: meno umidità e meno tempo con l'asciugamano.",
    bullets: [
      "Tessuto tecnico che non assorbe l'acqua",
      "Leggera: non pesa sulla testa",
      "Si pulisce con un panno umido",
      "Asciuga in pochi minuti",
    ],
    materiale: "Tessuto tecnico leggero, elastici rivestiti.",
    lavaggio: "Lavatrice a 30° ciclo delicato, no ammorbidente.",
  },
  {
    slug: "cuffia-inverno",
    name: "Cuffia Inverno",
    tagline: "Pile grigio con il cuore rosso",
    category: "cuffie",
    tipo: "Pile",
    price: 26,
    sizes: ["S", "M", "L"],
    stock: "low",
    images: [real("pile-cuore-01", "Cocker nero con la cuffia in pile grigio con cuore rosso")],
    description:
      "In pile morbido, per le mattine fredde. Tiene al caldo orecchie e collo, e il cuore rosso si vede da lontano.",
    bullets: [
      "Pile morbido e caldo",
      "Fa anche da scaldacollo",
      "Elastico morbido che non stringe",
      "Si lava in lavatrice a 30°",
    ],
    materiale: "Pile, applicazione a cuore, elastici rivestiti.",
    lavaggio: "Lavatrice a 30° ciclo delicato.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

/** Foto reali della cuffia indossata: la galleria "dal vivo". */
export const GALLERY: Photo[] = [
  real("vichy-blu-06", "Cocker blu roano con la cuffia vichy blu, seduto sotto un tavolino al mare"),
  real("vichy-blu-03", "Cocker nero con la cuffia vichy blu"),
  real("vichy-azzurro-01", "Cocker nero con la cuffia vichy azzurra"),
  real("vichy-blu-07", "Cocker blu roano con la cuffia vichy blu"),
  real("tecnica-grigia-01", "Cocker nero con la cuffia grigia impermeabile"),
  real("vichy-blu-02", "Cocker nero di profilo con la cuffia vichy blu"),
  real("vichy-blu-04", "Cocker nero con la cuffia vichy blu e la lingua fuori"),
  real("pile-cuore-01", "Cocker nero con la cuffia in pile con cuore rosso"),
];

/** Misure indicative: da confermare sul campionario reale. */
export const SIZE_GUIDE: { size: Size; collo: string; testa: string; razze: string }[] = [
  { size: "XS", collo: "18–24 cm", testa: "22–28 cm", razze: "Barboncino toy, Papillon" },
  { size: "S", collo: "24–30 cm", testa: "28–34 cm", razze: "Cavalier King, Cocker cucciolo, Bassotto a pelo lungo" },
  { size: "M", collo: "30–38 cm", testa: "34–42 cm", razze: "Cocker Spaniel adulto, Springer Spaniel" },
  { size: "L", collo: "38–48 cm", testa: "42–52 cm", razze: "Basset Hound, Setter, Bloodhound, Levriero afgano" },
];

export const BREEDS: { name: string; size: Size; note: string }[] = [
  { name: "Cocker Spaniel", size: "M", note: "La nostra taglia di riferimento: è quella di Barack." },
  { name: "Cocker cucciolo", size: "S", note: "Dai 2 ai 6 mesi. Poi si passa alla M." },
  { name: "Cavalier King", size: "S", note: "Orecchie lunghe su testa piccola: la S calza giusta." },
  { name: "Springer Spaniel", size: "M", note: "Stessa taglia del Cocker adulto." },
  { name: "Basset Hound", size: "L", note: "Orecchie lunghissime: serve tutta la lunghezza della L." },
  { name: "Setter", size: "L", note: "Testa lunga e orecchie setose: taglia L." },
  { name: "Bassotto a pelo lungo", size: "S", note: "Per i più piccoli valuta la XS." },
  { name: "Barboncino", size: "XS", note: "Toy e nano: XS. Medio: S." },
];

export const FAQ = [
  {
    q: "A cosa serve una cuffia per cani?",
    a: "Raccoglie le orecchie lunghe in un tubolare di tessuto. Così non finiscono nella ciotola, non strisciano a terra e restano più pulite e asciutte durante pasti e passeggiate.",
  },
  {
    q: "Il mio cane la terrà addosso?",
    a: "Quasi tutti si abituano in pochi giorni. Mettila per qualche minuto prima della pappa e premia il cane: assocerà la cuffia a qualcosa di bello. Non lasciarla mai indosso senza supervisione.",
  },
  {
    q: "Come scelgo la taglia?",
    a: "Misura la circonferenza del collo dove appoggia il collare e quella della testa appena davanti alle orecchie, poi confronta con la guida taglie. Se sei tra due taglie, scegli la più grande.",
  },
  {
    q: "Va bene solo per i Cocker?",
    a: "No. Nasce sul Cocker, ma è pensata per tutte le razze a orecchie lunghe: Cavalier King, Springer, Setter, Basset Hound, Bassotti a pelo lungo, Barboncini.",
  },
  {
    q: "Come si lava?",
    a: "Le cuffie in cotone vanno in lavatrice a 30°. Quelle in tessuto tecnico e in pile con ciclo delicato, senza ammorbidente. Niente asciugatrice.",
  },
  {
    q: "La cuffia cura o previene l'otite?",
    a: "No: è un accessorio, non un dispositivo medico. Aiuta a tenere le orecchie pulite e asciutte, ma per qualsiasi problema di salute rivolgiti al tuo veterinario.",
  },
  {
    q: "Quanto costa la spedizione?",
    a: "5,90 € in Italia, gratuita sopra i 49 €. Consegna in 2–4 giorni lavorativi.",
  },
  {
    q: "Posso fare il reso?",
    a: "Sì, hai 30 giorni dalla consegna per restituire un prodotto non usato. Il diritto di recesso di legge (14 giorni) resta sempre valido.",
  },
  {
    q: "Le foto del sito sono vere?",
    a: "Le foto di prodotto indossato sono scatti reali. Alcune immagini, tra cui quella d'apertura, sono generate con intelligenza artificiale a partire dalle foto vere della cuffia: sono sempre indicate con la dicitura «Immagine generata con AI».",
  },
];
