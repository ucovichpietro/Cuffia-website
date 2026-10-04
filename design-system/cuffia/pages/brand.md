# CUFFIA — decisioni di brand (prevalgono su MASTER.md)

MASTER.md è la proposta generata da UI/UX Pro Max ("arancio giocoso + blu fiducia", stile claymorphism,
font rotondi). Qui sotto come è stata adattata alla mascotte Barack.

## Mascotte
- Barack: cocker spaniel nero. Indossa la cuffia vichy azzurra e bianca con incroci blu.
- Illustrazione SVG in `src/components/Barack.tsx` (con e senza cuffia, fantasia parametrica).
- Barack non va mai appoggiato su uno sfondo a scacchi: usare `bg-sole` o la tinta del prodotto.

## Colori (token in `src/app/globals.css`)
| Token | Hex | Uso |
|---|---|---|
| panna | #FBF6EC | sfondo |
| ink | #16171C | testo, bordi, il nero di Barack |
| azzurro | #8CC4F2 | quadretto chiaro del vichy, superfici attive |
| blu | #1F4FA8 | incrocio del vichy, CTA primaria, link |
| miele | #F6A723 | accento caldo: badge, CTA secondaria |
| sole | #FBDC93 | sfondo dietro Barack |
| salvia / rosso | #5E8050 / #C8372F | esito positivo / errore |

## Font per ruolo
- **Fredoka** — titoli, logo, prezzi, bottoni, etichette.
- **Nunito Sans** — testi, schede prodotto, moduli, pagine legali.
- **Caveat** — la "voce" di Barack: occhielli e note a mano. Mai per testi lunghi.

## Forma
- Stile "sticker": bordo ink 2px, raggio 1.5rem, ombra piena 5px. Niente sfumature decorative.
- Bottoni a pillola con ombra piena; pressione = traslazione, non cambio colore.

## Movimento (skill animate)
- Solo transform e opacity. Entrate 200–300 ms ease-out-quint, uscite più rapide.
- Molle per elementi interrompibili (indicatore tab, badge carrello).
- `MotionConfig reducedMotion="user"` + regole CSS `prefers-reduced-motion`.
