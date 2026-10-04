import Image from "next/image";
import type { Photo as PhotoType } from "@/lib/products";

type Props = {
  photo: PhotoType;
  /** attributo sizes per il caricamento responsivo */
  sizes: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** nasconde la dicitura AI quando è già scritta accanto all'immagine */
  hideLabel?: boolean;
  /** dicitura breve, per le immagini piccole */
  compact?: boolean;
};

/** Immagine a riempimento del contenitore, con la dicitura quando è generata con AI. */
export function Photo({ photo, sizes, className = "", imgClassName = "", priority, hideLabel, compact }: Props) {
  // next/image "fill" vuole un contenitore posizionato: relative, salvo che sia già absolute
  const position = /\babsolute\b/.test(className) ? "" : "relative";
  return (
    <div className={`${position} overflow-hidden ${className}`}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${imgClassName}`}
      />
      {photo.ai && !hideLabel && (
        <span className="ai-label">{compact ? "Generata con AI" : "Immagine generata con AI"}</span>
      )}
    </div>
  );
}
