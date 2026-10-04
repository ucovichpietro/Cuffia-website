# CUFFIA v2 — decisioni di design (prevalgono su MASTER.md)

MASTER.md è la proposta generata da UI/UX Pro Max per "premium pet accessories ecommerce, editorial
photography, video hero": schema *Feature-Rich Showcase*, stile *3D & Hyperrealism*, neutri caldi
con accento, Playfair Display + Inter, movimento a parallasse. Qui sotto come è stata applicata.

## Riferimenti dati da Pietro
- Landing "Dog Jogs": foto/video a tutto schermo, menu trasparente in alto, titolo bianco al centro,
  linguetta d'acquisto sul bordo destro.
- Reel di marina_uiux: un soggetto fotorealistico protagonista, titoli con grazie, fondi pieni,
  elementi che reagiscono a cursore e scroll.

## Regola numero uno
Niente illustrazioni. Solo fotografie: scatti reali della cuffia indossata e immagini generate con AI
a partire da quegli scatti. Ogni immagine generata porta la dicitura "Immagine generata con AI".

## Colori (token in `src/app/globals.css`)
| Token | Hex | Uso |
|---|---|---|
| fondo | #FAFAF9 | sfondo pagina |
| fondo-2 | #F2F0EC | fasce alternate |
| carta | #FFFFFF | schede, moduli |
| ink | #1C1917 | testo, bottone primario, footer |
| ink-soft | #57534E | testo secondario |
| bordo / bordo-forte | #E7E5E4 / #CFCBC7 | filetti, bordi dei campi |
| blu | #1D4AA3 | unico accento: è il blu del vichy di Barack |
| blu-deep | #12357A | stato hover del blu |
| azzurro | #E3EBFA | tinta di fondo per note e stati attivi |

L'oro proposto da MASTER.md è stato sostituito dal blu del tessuto: l'accento del brand è il prodotto.

## Font per ruolo
- **Playfair Display** — titoli, prezzi, numeri dei passi. Il corsivo (`<em>`) evidenzia la parola chiave di ogni titolo.
- **Inter** — testi, menu, bottoni, moduli, pagine legali.
- Occhielli: Inter 12px maiuscolo, spaziatura 0.18em, in blu.

## Forma
- Filetti da 1px, raggi 20–24px sulle immagini, bottoni a pillola.
- Ombre morbide a due livelli (`--shadow-soft`, `--shadow-lift`), mai ombre piene.
- Il vichy compare solo come riga sottile (`.vichy-line`), mai come sfondo pieno.

## Movimento
- Apertura: video a tutto schermo con parallasse allo scroll (il video scende più lento, il titolo sale e sfuma).
- Confronto con/senza: cursore trascinabile, anche da tastiera, con animazione dimostrativa al primo ingresso.
- Schede prodotto: al passaggio del mouse la foto sfuma nella seconda (nessun ingrandimento).
- Galleria dal vivo: striscia trascinabile con aggancio.
- Entrate allo scroll: solo opacità e traslazione, 500 ms, una volta sola.
- Con "riduci movimento" attivo: video fermo, niente parallasse, niente animazione dimostrativa.

## Struttura della home
1. Apertura video · 2. Striscia informazioni · 3. Il problema · 4. Con e senza (interattivo)
5. Come funziona · 6. Le cuffie · 7. Taglie (interattivo) · 8. Dal vivo (foto reali) · 9. Storia · 10. Newsletter
