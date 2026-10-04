"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { EASE_OUT } from "../Providers";

const noop = () => () => {};
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Apertura a tutto schermo con video, sul modello della landing di riferimento:
 * menu trasparente in alto, titolo bianco al centro, linguetta d'acquisto sul bordo destro.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  // falso sul server e al primo render: evita differenze tra HTML e pagina idratata
  const hydrated = useSyncExternalStore(noop, () => true, () => false);
  const reduce = useReducedMotion() === true && hydrated;
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  // Con "riduci movimento" attivo il video resta fermo finché non lo avvia l'utente
  const playing = userPaused === null ? hydrated && !reduce : !userPaused;

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) v.play().catch(() => {});
    else v.pause();
  }, [playing]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-45%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={sectionRef} className="relative h-[100svh] min-h-[40rem] overflow-hidden bg-ink text-white">
      <motion.div style={reduce ? undefined : { y: mediaY }} className="absolute inset-0">
        {/* l'immagine fa da base: si vede subito e resta se il video non parte */}
        <Image
          src="/media/hero-still.jpg"
          alt="Barack, cocker nero, cammina sul lungomare con la cuffia vichy blu"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_30%]"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          onPlaying={() => setVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[50%_30%] transition-opacity duration-500 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={`${BASE}/media/hero-720.mp4`} type="video/mp4" media="(max-width: 767px)" />
          <source src={`${BASE}/media/hero-1080.webm`} type="video/webm" />
          <source src={`${BASE}/media/hero-1080.mp4`} type="video/mp4" />
        </video>
      </motion.div>

      {/* velature per la leggibilità di menu e titolo */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-ink/60 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink/80 via-ink/35 to-transparent" />

      <motion.div
        style={reduce ? undefined : { y: textY, opacity: textOpacity }}
        className="container-x absolute inset-x-0 bottom-[13svh] text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE_OUT }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85"
        >
          Cuffie paraorecchie per cani a orecchie lunghe
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: EASE_OUT }}
          className="mx-auto mt-4 max-w-5xl text-[clamp(2.6rem,6.4vw,5.6rem)] [text-shadow:0_2px_30px_rgb(0_0_0/0.35)]"
        >
          Orecchie al sicuro, <em>cane felice.</em>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link href="/shop" className="btn btn-light">
            Scopri le cuffie <ArrowRight size={18} />
          </Link>
          <Link href="/info#come-funziona" className="btn btn-outline-light">
            Come funziona
          </Link>
        </motion.div>
      </motion.div>

      {/* linguetta d'acquisto sul bordo, come nel sito di riferimento */}
      <Link
        href="/shop/la-barack"
        className="absolute right-0 top-[38%] z-10 hidden rounded-l-xl bg-blu px-3.5 py-6 text-sm font-semibold tracking-wide text-white transition-colors duration-200 [writing-mode:vertical-rl] hover:bg-blu-deep md:block"
      >
        <span className="inline-block rotate-180">Acquista ora</span>
      </Link>

      <p className="absolute bottom-4 left-4 text-[0.68rem] text-white/70 sm:left-6">
        Video creato da un&apos;immagine generata con AI
      </p>
      <div aria-hidden className="absolute bottom-5 left-1/2 hidden h-9 w-5 -translate-x-1/2 justify-center rounded-full border border-white/60 pt-1.5 sm:flex">
        <span className="scroll-cue h-1.5 w-1 rounded-full bg-white" />
      </div>
      <button
        type="button"
        onClick={() => setUserPaused(playing)}
        aria-label={playing ? "Metti in pausa il video" : "Riproduci il video"}
        className="absolute bottom-3 right-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-white/50 bg-ink/30 backdrop-blur transition-colors duration-200 hover:bg-white hover:text-ink sm:right-6"
      >
        {playing ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </section>
  );
}
