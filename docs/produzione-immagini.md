# CUFFIA — Scheda di produzione immagini

Come sono fatte le immagini del sito, cosa è reale e cosa è generato, e come produrne altre.
Aggiornata il 4 ottobre 2026.

## 1. Materiale di partenza (cartella `CUFFIA/`, fuori dal repository)

| Cartella | Contenuto |
|---|---|
| `photo/` | 16 foto WhatsApp della cuffia vera indossata da cocker veri + la tavola a 8 viste |
| `internet references/` | 4 foto di cocker presi come modello per l'aspetto del cane |
| `immagini generate/` | originali ad alta risoluzione delle immagini generate e sagoma del cane |

## 2. Com'è fatta la cuffia (dalle foto reali)

- **Tubolare di tessuto** con **elastico chiuso nei due bordi**: il bordo è sempre arricciato.
  Niente cordini, niente fermacorda, niente volant.
- Portata in due modi: tirata sulla testa come un cappuccio (bordo davanti appena dietro gli occhi,
  orecchie tutte dentro) oppure abbassata sul collo come uno scaldacollo.
- Volume morbido e un po' gonfio; 2–4 pieghe larghe.
- **Modelli visti nelle foto:**
  - vichy blu e bianco, quadretto di circa 1 cm (il più fotografato);
  - vichy azzurro chiaro e bianco;
  - tessuto tecnico grigio;
  - pile grigio con cuore rosso.
- Nelle foto compaiono anche un impermeabile mimetico con cappuccio e una tutina blu: non sono a
  catalogo finché Pietro non conferma che fanno parte della linea.

## 3. Immagini generate (Higgsfield, piano gratuito, 3 crediti spesi)

| File | Modello | Crediti | Come |
|---|---|---|---|
| `barack-lungomare-con-cuffia.png` (2752×1536) | Nano Banana Pro richiesto (lavoro registrato come Nano Banana 2) | 2 | 6 riferimenti: tavola a 8 viste (ritagliata), 3 foto reali della cuffia, 2 foto di cocker neri |
| `barack-lungomare-senza-cuffia.png` (1344×752) | GPT Image 2 | 1 | modifica della prima: stessa scena, cuffia tolta, orecchie libere |

Da queste due derivano: il video d'apertura, la coppia del confronto, i ritratti e il dettaglio del tessuto.

**Prompt dell'immagine d'apertura**
```
Photorealistic photograph, wide 16:9 website hero image. A solid black English cocker spaniel walks
straight toward the camera along a sunny seaside promenade on the Italian Riviera. Use the dog from
reference images 5 and 6 […]. The dog wears the dog ear snood from reference images 2, 3 and 4: a soft
tube of lightweight cotton gingham fabric with royal blue and white checks about 1 cm wide, with
gathered elastic edges. It is worn exactly as shown in reference image 1: pulled over the head like a
hood, the front elastic edge sits just behind the eyes on top of the skull, both long ears are
completely tucked inside the fabric, the eyes, forehead and whole muzzle stay uncovered […].
Low camera angle at the dog's eye level, 35mm lens, f/4, the dog centered in the frame with its whole
body visible, mid-stride with one front paw lifted […]. No people, no leash, no text, no watermark.
```

**Prompt della versione senza cuffia**
```
Edit reference image 1. Keep the exact same photograph […]. Change only one thing: remove the blue
gingham snood completely so the dog's head and neck are bare. Show its long, low-set cocker spaniel
ears hanging down on both sides of the head, covered in long wavy silky black fur […].
```

Cosa ha funzionato: descrivere **come è indossata** la cuffia (dove sta ogni bordo, dove finiscono le
orecchie) e dare foto reali del tessuto. Il vichy, l'arricciatura dell'elastico e le pieghe sono fedeli.

## 4. Il video d'apertura

Non è un video generato (costerebbe 4–5 crediti per 4–5 secondi a 720p). È costruito in locale da una
sola immagine: vedi `scripts/media/README.md`. Quando ci saranno crediti, si può sostituire con un video
in cui il cane si muove davvero: basta mettere i nuovi file in `public/media/` con gli stessi nomi.

## 5. Prossimi scatti utili (in ordine di resa)

1. Video vero del cane che cammina (partendo dall'immagine d'apertura come primo fotogramma).
2. La cuffia da sola, stesa e arricciata, su fondo chiaro: per le schede prodotto.
3. Scene d'uso: ciotola, erba alta, pioggia con la cuffia grigia.
4. Le altre tre cuffie indossate da Barack nella stessa scena, per uniformare le schede.
5. Modello 3D della cuffia da ruotare (Higgsfield lo offre: da immagine a GLB).

## 6. Controlli prima di pubblicare un'immagine generata

1. La cuffia è identica a quella vera: scala del quadretto, colori, arricciatura.
2. Anatomia del cane corretta: zampe, dita, occhi, baffi.
3. Il nero non è un blocco piatto: si leggono pelo e volumi.
4. Nessun testo o marchio inventato.
5. Dicitura "Immagine generata con AI" presente (campo `ai: true` in `src/lib/products.ts`).

## 7. Obbligo di trasparenza

Dal 2 agosto 2026 l'art. 50 del Regolamento UE sull'intelligenza artificiale chiede di dichiarare in
modo visibile le immagini realistiche generate o modificate con AI. Sul sito la dicitura è già su ogni
immagine generata e sul video. Resta da far confermare al consulente legale.

## 8. Diritti sulle foto reali

Le foto in `photo/` ritraggono cani di persone diverse. Prima di pubblicare il sito serve il consenso
di chi le ha scattate. Lo screenshot di un post social presente nella cartella non è usato nel sito.
