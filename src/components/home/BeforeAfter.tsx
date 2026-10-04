"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { ChevronsLeftRight } from "lucide-react";
import { Barack } from "../Barack";
import { EASE_OUT } from "../Providers";

const KEY_STEP = 0.04;
const START = 0.55;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Barack con e senza cuffia, da scoprire trascinando.
 * Meccanica adattata da "Image Comparison Slider" (21st.dev, @wensity):
 * un motion value guida il clip-path, così lo scorrimento non passa dal render di React.
 */
export function BeforeAfter() {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const demo = useRef<AnimationPlaybackControls | null>(null);

  const wipe = useMotionValue(START);
  const [value, setValue] = useState(Math.round(START * 100));
  const [pressed, setPressed] = useState(false);

  useMotionValueEvent(wipe, "change", (v) => {
    if (!dragging.current) setValue(Math.round(clamp01(v) * 100));
  });

  // Una sola animazione dimostrativa all'ingresso: insegna il gesto, poi si ferma.
  useEffect(() => {
    if (reduceMotion) return;
    demo.current = animate(wipe, [START, 0.85, 0.3, START], {
      duration: 2.2,
      times: [0, 0.35, 0.75, 1],
      ease: EASE_OUT,
      delay: 0.8,
    });
    return () => demo.current?.stop();
  }, [reduceMotion, wipe]);

  // La cuffia sta sopra e si scopre da sinistra man mano che il valore cresce.
  const clipPath = useTransform(wipe, (v) => `inset(0 ${100 - clamp01(v) * 100}% 0 0)`);
  const left = useTransform(wipe, (v) => `${clamp01(v) * 100}%`);

  const stopDemo = () => {
    demo.current?.stop();
    demo.current = null;
  };

  const setFromPointer = (clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    wipe.set(clamp01((clientX - rect.left) / rect.width));
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setPressed(false);
    setValue(Math.round(clamp01(wipe.get()) * 100));
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const current = wipe.get();
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? current - KEY_STEP
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? current + KEY_STEP
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 1
              : null;
    if (next === null) return;
    e.preventDefault();
    stopDemo();
    wipe.set(clamp01(next));
  };

  return (
    <figure className="sticker overflow-hidden">
      <div
        ref={frameRef}
        role="slider"
        tabIndex={0}
        aria-label="Confronta Barack con e senza cuffia"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-valuetext={`${value}% con la cuffia`}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          stopDemo();
          dragging.current = true;
          setPressed(true);
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromPointer(e.clientX)}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        className="relative isolate aspect-[400/432] w-full cursor-ew-resize touch-none select-none overflow-hidden bg-sole"
      >
        {/* Sotto: orecchie libere */}
        <div className="absolute inset-0 grid place-items-end">
          <Barack snood={false} className="h-[94%] w-full" />
        </div>

        {/* Sopra: con la cuffia, scoperto dal cursore */}
        <motion.div className="absolute inset-0 grid place-items-end bg-sole" style={{ clipPath }}>
          <Barack className="h-[94%] w-full" />
        </motion.div>

        <span className="chip pointer-events-none absolute left-3 top-3 z-10 bg-azzurro">Con la cuffia</span>
        <span className="chip pointer-events-none absolute right-3 top-3 z-10 bg-carta">Senza</span>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-20 w-[3px] bg-ink"
          style={{ left, x: "-50%" }}
        />
        <motion.div className="pointer-events-none absolute top-1/2 z-30" style={{ left, x: "-50%", y: "-50%" }}>
          <motion.div
            animate={{ scale: pressed ? 0.92 : 1 }}
            transition={{ duration: 0.12, ease: EASE_OUT }}
            className="grid size-12 place-items-center rounded-full border-2 border-ink bg-miele shadow-[0_3px_0_var(--color-ink)]"
          >
            <ChevronsLeftRight size={22} aria-hidden />
          </motion.div>
        </motion.div>
      </div>
      <figcaption className="border-t-2 border-ink bg-carta px-4 py-3 font-hand text-2xl leading-tight">
        Trascina verso destra per mettermi la cuffia.
      </figcaption>
    </figure>
  );
}
