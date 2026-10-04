// Usato solo nella versione statica (GitHub Pages): lì non c'è il server che ridimensiona
// le immagini, quindi si serve il file così com'è, con il prefisso della cartella del sito.
export default function imageLoader({ src }: { src: string; width: number; quality?: number }) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}`;
}
