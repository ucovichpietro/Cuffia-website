# CUFFIA — sito e-commerce

Cuffie paraorecchie per Cocker e cani a orecchie lunghe. Prototipo in Next.js 16, Tailwind 4 e Motion.

## Avvio

```bash
npm install
npm run dev
```

Poi apri `http://localhost:3000`.

## Cosa c'è

| Percorso | Pagina |
|---|---|
| `/` | Home: video d'apertura, confronto con/senza, come funziona, cuffie, taglie, galleria, storia |
| `/shop` | Catalogo con filtri, ordinamento e ricerca |
| `/shop/[slug]` | Scheda prodotto con galleria fotografica |
| `/info` | Storia, guida all'uso, taglie, spedizioni, FAQ |
| `/contatti` | Modulo e recapiti |
| `/carrello`, `/checkout` | Carrello e checkout dimostrativo in tre passi |
| `/account`, `/legale/[slug]` | Area cliente e pagine legali (bozze) |

## Dove mettere mano

- **Prodotti, prezzi, taglie, FAQ:** `src/lib/products.ts`
- **Colori e font:** `src/app/globals.css` e `src/app/layout.tsx`
- **Immagini e video:** `public/media/` (come sono fatti: `docs/produzione-immagini.md`)
- **Decisioni di design:** `design-system/cuffia-v2/pages/brand.md`

## Cosa è ancora bozza

- Prezzi, misure delle taglie, materiali e condizioni di vendita sono segnaposto.
- Moduli, newsletter, login e checkout non inviano né incassano nulla.
- Dati aziendali e testi legali sono da completare e far validare.
- Le foto reali richiedono il consenso di chi le ha scattate prima della pubblicazione.
