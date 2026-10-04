export type Pattern = {
  type: "gingham" | "solid" | "stripes" | "dots";
  /** colore chiaro / principale */
  a: string;
  /** colore scuro / secondario */
  b: string;
  base?: string;
};

export type Size = "XS" | "S" | "M" | "L";
export type Category = "cuffie" | "accessori";
export type Kind = "cuffia" | "bandana" | "kit" | "collare" | "guinzaglio";
export type Tipo = "Cotone" | "Impermeabile" | "Imbottita" | "Pappa" | "Accessorio";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: Category;
  kind: Kind;
  tipo: Tipo;
  price: number;
  compareAt?: number;
  sizes: Size[];
  pattern: Pattern;
  bg: string;
  isNew?: boolean;
  bestseller?: boolean;
  comingSoon?: boolean;
  stock: "ok" | "low";
  rating: number;
  reviews: number;
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

/** Il vichy azzurro di Barack: quadretti azzurri e bianchi, incroci blu. */
export const BARACK_PATTERN: Pattern = {
  type: "gingham",
  a: "#8CC4F2",
  b: "#1F4FA8",
  base: "#FFFFFF",
};

const ALL: Size[] = ["XS", "S", "M", "L"];

export const products: Product[] = [
  {
    slug: "la-barack",
    name: "La Barack",
    tagline: "Vichy azzurro, l'originale",
    category: "cuffie",
    kind: "cuffia",
    tipo: "Cotone",
    price: 24,
    sizes: ALL,
    pattern: BARACK_PATTERN,
    bg: "#DCEEFC",
    bestseller: true,
    stock: "ok",
    rating: 4.9,
    reviews: 128,
    description:
      "È la cuffia da cui è nato tutto: il vichy azzurro e bianco che Barack portava ogni giorno. Raccoglie le orecchie lunghe in un tubolare morbido di cotone, così restano fuori dalla ciotola, dalle pozzanghere e dall'erba alta. Due elastici dolci la tengono al suo posto senza stringere: si infila in tre secondi e il cane se ne dimentica.",
    bullets: [
      "Orecchie pulite e asciutte a ogni pasto e passeggiata",
      "Cotone leggero e traspirante, adatto a tutte le stagioni",
      "Doppio elastico morbido: resta su senza stringere",
      "Si lava in lavatrice a 30°",
    ],
    materiale: "100% cotone popeline, elastici rivestiti.",
    lavaggio: "Lavatrice a 30°, no asciugatrice. Stirare a bassa temperatura.",
  },
  {
    slug: "vichy-ciliegia",
    name: "Vichy Ciliegia",
    tagline: "Quadretti rossi da picnic",
    category: "cuffie",
    kind: "cuffia",
    tipo: "Cotone",
    price: 22,
    sizes: ALL,
    pattern: { type: "gingham", a: "#F4A3A0", b: "#C8372F", base: "#FFFFFF" },
    bg: "#FCE4E1",
    stock: "ok",
    rating: 4.8,
    reviews: 64,
    description:
      "Lo stesso taglio della Barack, in un vichy rosso ciliegia che sta bene su ogni manto. Cotone fresco per tutti i giorni: a tavola, al parco, in macchina.",
    bullets: [
      "Tiene le orecchie fuori da ciotola e sporco",
      "Cotone traspirante per l'uso quotidiano",
      "Doppio elastico morbido",
      "Lavabile in lavatrice a 30°",
    ],
    materiale: "100% cotone popeline, elastici rivestiti.",
    lavaggio: "Lavatrice a 30°, no asciugatrice.",
  },
  {
    slug: "vichy-salvia",
    name: "Vichy Salvia",
    tagline: "Verde tenue, effetto prato",
    category: "cuffie",
    kind: "cuffia",
    tipo: "Cotone",
    price: 22,
    sizes: ["S", "M", "L"],
    pattern: { type: "gingham", a: "#B7CFA9", b: "#5E8050", base: "#FFFFFF" },
    bg: "#E6F0DF",
    isNew: true,
    stock: "ok",
    rating: 4.7,
    reviews: 21,
    description:
      "Un vichy verde salvia pensato per le passeggiate nei campi: protegge le orecchie da semi, polvere e spighe mentre il cane annusa in giro.",
    bullets: [
      "Uno scudo leggero contro semi e forasacchi",
      "Cotone fresco, ideale da primavera a fine estate",
      "Doppio elastico morbido",
      "Lavabile in lavatrice a 30°",
    ],
    materiale: "100% cotone popeline, elastici rivestiti.",
    lavaggio: "Lavatrice a 30°, no asciugatrice.",
  },
  {
    slug: "pois-notte",
    name: "Pois Notte",
    tagline: "Blu profondo a pallini",
    category: "cuffie",
    kind: "cuffia",
    tipo: "Cotone",
    price: 22,
    sizes: ALL,
    pattern: { type: "dots", a: "#1F4FA8", b: "#FFFFFF" },
    bg: "#DCE6F7",
    isNew: true,
    stock: "ok",
    rating: 4.8,
    reviews: 17,
    description:
      "Pallini bianchi su blu notte: elegante quanto basta per una cena fuori, pratica come tutte le nostre cuffie.",
    bullets: [
      "Orecchie raccolte e pulite",
      "Cotone morbido a trama fitta",
      "Doppio elastico morbido",
      "Lavabile in lavatrice a 30°",
    ],
    materiale: "100% cotone, elastici rivestiti.",
    lavaggio: "Lavatrice a 30°, no asciugatrice.",
  },
  {
    slug: "mariniere",
    name: "Marinière",
    tagline: "Righe da lungomare",
    category: "cuffie",
    kind: "cuffia",
    tipo: "Cotone",
    price: 19,
    compareAt: 22,
    sizes: ["S", "M"],
    pattern: { type: "stripes", a: "#16306B", b: "#16306B", base: "#FFFFFF" },
    bg: "#E9EEF8",
    stock: "low",
    rating: 4.6,
    reviews: 39,
    description:
      "Righe blu su bianco, in jersey di cotone leggermente elastico: per i cani che non amano sentirsi addosso il tessuto rigido. Ultime taglie.",
    bullets: [
      "Jersey elastico: veste come una maglietta",
      "Ideale per chi è alla prima cuffia",
      "Asciuga in fretta",
      "Lavabile in lavatrice a 30°",
    ],
    materiale: "95% cotone, 5% elastan.",
    lavaggio: "Lavatrice a 30°, no asciugatrice.",
  },
  {
    slug: "cuffia-pappa",
    name: "Cuffia Pappa",
    tagline: "Ultraleggera, solo per la ciotola",
    category: "cuffie",
    kind: "cuffia",
    tipo: "Pappa",
    price: 18,
    sizes: ALL,
    pattern: { type: "stripes", a: "#F6A723", b: "#F6A723", base: "#FFF6DF" },
    bg: "#FDEFCB",
    bestseller: true,
    stock: "ok",
    rating: 4.9,
    reviews: 92,
    description:
      "Pesa meno di 20 grammi ed è fatta per una cosa sola: tenere le orecchie fuori dalla ciotola. Si infila prima della pappa, si sfila subito dopo, si sciacqua sotto l'acqua.",
    bullets: [
      "Niente più orecchie nella ciotola",
      "Tessuto tecnico sottile: quasi non si sente",
      "Si sciacqua e asciuga in pochi minuti",
      "Perfetta anche per l'acqua da bere",
    ],
    materiale: "100% poliestere leggero, elastici rivestiti.",
    lavaggio: "Sciacquare a mano o lavatrice a 30°.",
  },
  {
    slug: "cuffia-pioggia",
    name: "Cuffia Pioggia",
    tagline: "Impermeabile, per i giorni grigi",
    category: "cuffie",
    kind: "cuffia",
    tipo: "Impermeabile",
    price: 26,
    sizes: ["S", "M", "L"],
    pattern: { type: "solid", a: "#23407A", b: "#F6A723" },
    bg: "#DDE5F3",
    stock: "ok",
    rating: 4.8,
    reviews: 47,
    description:
      "Tessuto impermeabile fuori, fodera morbida dentro. Le orecchie tornano a casa asciutte anche quando piove: meno umidità, meno tempo con l'asciugamano.",
    bullets: [
      "Esterno impermeabile e antivento",
      "Fodera interna morbida",
      "Elastico regolabile con fermacorda",
      "Si pulisce con un panno umido",
    ],
    materiale: "Esterno poliestere spalmato, fodera in cotone.",
    lavaggio: "Lavatrice a 30° ciclo delicato, no ammorbidente.",
  },
  {
    slug: "cuffia-inverno",
    name: "Cuffia Inverno",
    tagline: "Imbottita, calda e morbida",
    category: "cuffie",
    kind: "cuffia",
    tipo: "Imbottita",
    price: 28,
    sizes: ["S", "M", "L"],
    pattern: { type: "dots", a: "#8E2F3C", b: "#F4D9B0" },
    bg: "#F5DFD9",
    isNew: true,
    stock: "ok",
    rating: 4.7,
    reviews: 12,
    description:
      "Esterno resistente all'acqua, interno in pile: per le mattine fredde e le uscite sulla neve. Tiene al caldo le orecchie senza farle sudare.",
    bullets: [
      "Imbottitura in pile morbido",
      "Esterno resistente all'acqua",
      "Elastico regolabile con fermacorda",
      "Lavabile in lavatrice a 30°",
    ],
    materiale: "Esterno poliestere, interno pile.",
    lavaggio: "Lavatrice a 30° ciclo delicato.",
  },
  {
    slug: "bandana-vichy",
    name: "Bandana Vichy",
    tagline: "Coordinata alla Barack",
    category: "accessori",
    kind: "bandana",
    tipo: "Accessorio",
    price: 12,
    sizes: ["S", "M", "L"],
    pattern: BARACK_PATTERN,
    bg: "#DCEEFC",
    stock: "ok",
    rating: 4.8,
    reviews: 33,
    description:
      "Lo stesso vichy azzurro della Barack, in versione bandana: per i giorni in cui le orecchie possono stare libere ma lo stile no.",
    bullets: [
      "Stesso tessuto della cuffia Barack",
      "Chiusura con bottone a pressione",
      "Lavabile in lavatrice a 30°",
    ],
    materiale: "100% cotone popeline.",
    lavaggio: "Lavatrice a 30°.",
  },
  {
    slug: "kit-tre-cuffie",
    name: "Kit Tre Cuffie",
    tagline: "Pappa, pioggia, tutti i giorni",
    category: "accessori",
    kind: "kit",
    tipo: "Accessorio",
    price: 59,
    compareAt: 68,
    sizes: ["S", "M", "L"],
    pattern: BARACK_PATTERN,
    bg: "#FDEFCB",
    stock: "ok",
    rating: 4.9,
    reviews: 26,
    description:
      "Le tre cuffie che servono davvero: La Barack per tutti i giorni, la Pappa per la ciotola, la Pioggia per quando fuori è brutto. Insieme costano meno.",
    bullets: [
      "La Barack + Cuffia Pappa + Cuffia Pioggia",
      "Risparmi 9 € rispetto all'acquisto singolo",
      "In una sacchetta di cotone riutilizzabile",
    ],
    materiale: "Vedi le singole cuffie.",
    lavaggio: "Vedi le singole cuffie.",
  },
  {
    slug: "collare-vichy",
    name: "Collare Vichy",
    tagline: "In arrivo",
    category: "accessori",
    kind: "collare",
    tipo: "Accessorio",
    price: 19,
    sizes: ["S", "M", "L"],
    pattern: BARACK_PATTERN,
    bg: "#E6F0DF",
    comingSoon: true,
    stock: "ok",
    rating: 0,
    reviews: 0,
    description:
      "Il collare coordinato alla Barack è in lavorazione. Iscriviti alla newsletter: avvisiamo prima chi è in lista.",
    bullets: ["Stesso vichy azzurro", "Fibbia regolabile", "Disponibile a breve"],
    materiale: "In definizione.",
    lavaggio: "In definizione.",
  },
  {
    slug: "guinzaglio-vichy",
    name: "Guinzaglio Vichy",
    tagline: "In arrivo",
    category: "accessori",
    kind: "guinzaglio",
    tipo: "Accessorio",
    price: 24,
    sizes: ["M"],
    pattern: BARACK_PATTERN,
    bg: "#FCE4E1",
    comingSoon: true,
    stock: "ok",
    rating: 0,
    reviews: 0,
    description:
      "Il guinzaglio coordinato arriva insieme al collare. Iscriviti alla newsletter per sapere quando.",
    bullets: ["Stesso vichy azzurro", "Maniglia imbottita", "Disponibile a breve"],
    materiale: "In definizione.",
    lavaggio: "In definizione.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

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

export const REVIEWS = [
  {
    name: "Giulia e Otto",
    dog: "Cocker Spaniel",
    text: "Prima ogni pasto finiva con le orecchie nel sugo. Ora metto la cuffia, mangia, la tolgo. Fine del bagnetto quotidiano.",
  },
  {
    name: "Marco e Nina",
    dog: "Cavalier King",
    text: "La S le sta perfetta e non prova nemmeno a toglierla. Al parco ci fermano tutti per chiedere dove l'abbiamo presa.",
  },
  {
    name: "Elena e Brando",
    dog: "Basset Hound",
    text: "Con quelle orecchie spazzava il marciapiede. La Pioggia è stata la svolta: torna a casa e le orecchie sono asciutte.",
  },
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
    a: "Le cuffie in cotone vanno in lavatrice a 30°. Quelle impermeabili e imbottite con ciclo delicato, senza ammorbidente. Niente asciugatrice.",
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
];
