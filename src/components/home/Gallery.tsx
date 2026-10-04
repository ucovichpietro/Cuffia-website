"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { GALLERY } from "@/lib/products";
import { Photo } from "../Photo";

/** Striscia di foto reali: si scorre col dito, col trackpad, trascinando col mouse o con le frecce. */
export function Gallery() {
  const ref = useRef<HTMLUListElement>(null);
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  const arrow =
    "grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-bordo-forte bg-carta transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-white";

  return (
    <div>
      <ul
        ref={ref}
        tabIndex={0}
        aria-label="Foto reali della cuffia indossata"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !ref.current) return;
          drag.current = { active: true, startX: e.clientX, startLeft: ref.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.active || !ref.current) return;
          const dx = e.clientX - d.startX;
          if (Math.abs(dx) > 4) d.moved = true;
          ref.current.scrollLeft = d.startLeft - dx;
        }}
        onPointerUp={() => (drag.current.active = false)}
        onPointerLeave={() => (drag.current.active = false)}
        className="flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1.25rem,calc((100vw-80rem)/2+3rem))] pb-2 [scrollbar-width:none] active:cursor-grabbing active:snap-none sm:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {GALLERY.map((photo) => (
          <li key={photo.src} className="w-[72vw] shrink-0 snap-center sm:w-[24rem]">
            <Photo
              photo={photo}
              sizes="(min-width: 640px) 384px, 72vw"
              className="aspect-square rounded-[1.25rem] bg-fondo-2"
              imgClassName="pointer-events-none select-none"
            />
          </li>
        ))}
      </ul>
      <div className="container-x mt-6 flex justify-end gap-2">
        <button type="button" className={arrow} aria-label="Foto precedenti" onClick={() => step(-1)}>
          <ArrowLeft size={20} />
        </button>
        <button type="button" className={arrow} aria-label="Foto successive" onClick={() => step(1)}>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
