# Come è fatto il video d'apertura

Il video in home non è girato né generato come video: nasce da **una sola immagine**
(`immagini generate/barack-lungomare-con-cuffia.png`, fuori dal repository) animata in locale.

1. `mask.swift` — ritaglia la sagoma del cane con gli strumenti di visione di macOS.
   `swift mask.swift <immagine.png> <prefisso-uscita>`
2. `extend.py` — riduce la scena al 92% e ricostruisce i bordi allungando lo sfondo sfocato,
   per lasciare aria sopra la testa. Scrive `bg.png`, `fg.png`, `still.jpg`.
   `python3 extend.py <immagine.png> <sagoma.png> <cartella-uscita>`
3. `render.py` — avvicinamento lento di 14 secondi con parallasse (il cane cresce più dello sfondo)
   che torna al punto di partenza, quindi si ripete senza stacchi. Scrive i fotogrammi su stdout.

```bash
python3 render.py bg.png fg.png 1338.5 1452 | ffmpeg -f rawvideo -pix_fmt rgb24 -s 1920x1080 -r 30 -i - \
  -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart -an hero-1080.mp4 \
  -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -an hero-1080.webm \
  -vf scale=1280:720:flags=lanczos -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an hero-720.mp4
```

I due numeri sono il punto d'appoggio delle zampe (stampato da `extend.py`): tenerlo fermo
fa sì che il cane resti "a terra" mentre la camera si avvicina.

Serve Python 3 con Pillow e numpy, più ffmpeg.
