// Componente di codice per Framer: confronto "con e senza cuffia" da trascinare.
// È la stessa meccanica di src/components/home/BeforeAfter.tsx, riscritta con i soli
// moduli che Framer mette a disposizione (react, framer, framer-motion).
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion"
import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type FocusEvent,
    type KeyboardEvent,
    type PointerEvent,
} from "react"

interface Immagine {
    src: string
    srcSet?: string
    alt?: string
}

interface ConfrontoCuffiaProps {
    conCuffia?: Immagine
    senzaCuffia?: Immagine
    etichettaCon?: string
    etichettaSenza?: string
    notaAi?: string
    colore?: string
    raggio?: number
    partenza?: number
    dimostrazione?: boolean
    style?: CSSProperties
}

const PASSO_TASTIERA = 0.04
const CURVA: [number, number, number, number] = [0.23, 1, 0.32, 1]
const FONT = '"Inter", "Inter Placeholder", sans-serif'
const limita = (n: number) => Math.min(1, Math.max(0, n))

const stileImmagine: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
    pointerEvents: "none",
    userSelect: "none",
}

const stileEtichetta: CSSProperties = {
    position: "absolute",
    top: 14,
    zIndex: 3,
    padding: "6px 11px",
    borderRadius: 100,
    fontFamily: FONT,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.5px",
    lineHeight: 1.2,
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    pointerEvents: "none",
}

/**
 * Confronto con e senza cuffia
 *
 * Due immagini sovrapposte: trascinando il cursore si scopre l'una o l'altra.
 * Funziona anche con le frecce della tastiera.
 *
 * @framerIntrinsicWidth 1104
 * @framerIntrinsicHeight 640
 *
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 */
export default function ConfrontoCuffia(props: ConfrontoCuffiaProps) {
    const {
        conCuffia = {
            src: "https://framerusercontent.com/images/UZvBejqDyS7X7RZ1eGDRdRepQ.jpg",
            alt: "Barack con la cuffia: orecchie raccolte nel tessuto",
        },
        senzaCuffia = {
            src: "https://framerusercontent.com/images/xJhPPzDIEsLVLyHrhl6m1zHVpiM.jpg",
            alt: "Barack senza cuffia: orecchie lunghe libere",
        },
        etichettaCon = "Con la cuffia",
        etichettaSenza = "Senza",
        notaAi = "Immagini generate con AI",
        colore = "#1D4AA3",
        raggio = 24,
        partenza = 50,
        dimostrazione = true,
        style,
    } = props

    const inizio = limita(partenza / 100)
    const isStatic = useIsStaticRenderer()
    const riduciMovimento = useReducedMotion()

    const cornice = useRef<HTMLDivElement>(null)
    const trascina = useRef(false)
    const toccato = useRef(false)
    const demo = useRef<{ stop: () => void } | null>(null)

    const taglio = useMotionValue(inizio)
    const [valore, setValore] = useState(Math.round(inizio * 100))
    const [premuto, setPremuto] = useState(false)
    const [fuoco, setFuoco] = useState(false)

    // "Con la cuffia" sta sopra e si scopre da sinistra man mano che il valore cresce.
    const clipMobile = useTransform(taglio, (v) => `inset(0 ${100 - limita(v) * 100}% 0 0)`)
    const sinistraMobile = useTransform(taglio, (v) => `${limita(v) * 100}%`)
    // Sulla tela di Framer il componente è fermo e segue il valore scelto nel pannello.
    const clipPath = isStatic ? `inset(0 ${100 - inizio * 100}% 0 0)` : clipMobile
    const sinistra = isStatic ? `${inizio * 100}%` : sinistraMobile

    // Una sola animazione dimostrativa quando entra in vista: insegna il gesto, poi si ferma.
    useEffect(() => {
        const el = cornice.current
        if (!el || isStatic || riduciMovimento || !dimostrazione) return
        if (typeof window === "undefined" || !("IntersectionObserver" in window)) return
        const osservatore = new IntersectionObserver(
            ([voce]) => {
                if (!voce.isIntersecting) return
                osservatore.disconnect()
                if (toccato.current) return
                demo.current = animate(taglio, [inizio, 0.78, 0.24, inizio], {
                    duration: 2.6,
                    times: [0, 0.35, 0.75, 1],
                    ease: CURVA,
                    delay: 0.3,
                })
            },
            { threshold: 0.55 }
        )
        osservatore.observe(el)
        return () => {
            osservatore.disconnect()
            demo.current?.stop()
            demo.current = null
        }
    }, [isStatic, riduciMovimento, dimostrazione, inizio, taglio])

    function fermaDemo() {
        toccato.current = true
        demo.current?.stop()
        demo.current = null
    }

    function daPuntatore(clientX: number) {
        const r = cornice.current?.getBoundingClientRect()
        if (!r || r.width <= 0) return
        taglio.set(limita((clientX - r.left) / r.width))
    }

    function inizioTrascinamento(e: PointerEvent<HTMLDivElement>) {
        if (e.button !== 0) return
        fermaDemo()
        trascina.current = true
        setPremuto(true)
        e.currentTarget.setPointerCapture(e.pointerId)
        daPuntatore(e.clientX)
    }

    function trascinamento(e: PointerEvent<HTMLDivElement>) {
        if (trascina.current) daPuntatore(e.clientX)
    }

    function fineTrascinamento(e: PointerEvent<HTMLDivElement>) {
        if (!trascina.current) return
        trascina.current = false
        setPremuto(false)
        setValore(Math.round(limita(taglio.get()) * 100))
        if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId)
    }

    function tastiera(e: KeyboardEvent<HTMLDivElement>) {
        const ora = taglio.get()
        let prossimo: number | null = null
        if (e.key === "ArrowLeft" || e.key === "ArrowDown") prossimo = ora - PASSO_TASTIERA
        else if (e.key === "ArrowRight" || e.key === "ArrowUp") prossimo = ora + PASSO_TASTIERA
        else if (e.key === "Home") prossimo = 0
        else if (e.key === "End") prossimo = 1
        if (prossimo === null) return
        e.preventDefault()
        fermaDemo()
        setFuoco(true)
        const v = limita(prossimo)
        taglio.set(v)
        setValore(Math.round(v * 100))
    }

    // Il contorno compare solo quando ci si arriva da tastiera.
    function alFuoco(e: FocusEvent<HTMLDivElement>) {
        let daTastiera = true
        try {
            daTastiera = e.currentTarget.matches(":focus-visible")
        } catch {
            daTastiera = true
        }
        setFuoco(daTastiera)
    }

    return (
        <div
            ref={cornice}
            role="slider"
            tabIndex={0}
            aria-label="Confronta il cane con e senza cuffia"
            aria-orientation="horizontal"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={valore}
            aria-valuetext={`${valore}% con la cuffia`}
            onPointerDown={isStatic ? undefined : inizioTrascinamento}
            onPointerMove={isStatic ? undefined : trascinamento}
            onPointerUp={isStatic ? undefined : fineTrascinamento}
            onPointerCancel={isStatic ? undefined : fineTrascinamento}
            onKeyDown={isStatic ? undefined : tastiera}
            onFocus={alFuoco}
            onBlur={() => setFuoco(false)}
            style={{
                ...style,
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                isolation: "isolate",
                borderRadius: raggio,
                background: "#F2F0EC",
                cursor: "ew-resize",
                touchAction: "pan-y",
                userSelect: "none",
                WebkitUserSelect: "none",
                outline: fuoco ? `2px solid ${colore}` : "none",
                outlineOffset: 3,
            }}
        >
            <img
                src={senzaCuffia.src}
                srcSet={senzaCuffia.srcSet}
                sizes="(min-width: 1200px) 1184px, 100vw"
                alt={senzaCuffia.alt ?? ""}
                draggable={false}
                style={stileImmagine}
            />
            <motion.div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, clipPath }}>
                <img
                    src={conCuffia.src}
                    srcSet={conCuffia.srcSet}
                    sizes="(min-width: 1200px) 1184px, 100vw"
                    alt={conCuffia.alt ?? ""}
                    draggable={false}
                    style={stileImmagine}
                />
            </motion.div>

            {etichettaCon && (
                <span style={{ ...stileEtichetta, left: 14, background: colore, color: "#FFFFFF" }}>{etichettaCon}</span>
            )}
            {etichettaSenza && (
                <span style={{ ...stileEtichetta, right: 14, background: "#FFFFFF", color: "#1C1917" }}>
                    {etichettaSenza}
                </span>
            )}
            {notaAi && (
                <span
                    style={{
                        position: "absolute",
                        left: 12,
                        bottom: 12,
                        zIndex: 3,
                        padding: "4px 10px",
                        borderRadius: 100,
                        background: "rgba(28,25,23,0.62)",
                        color: "#FFFFFF",
                        fontFamily: FONT,
                        fontSize: 11,
                        fontWeight: 500,
                        lineHeight: 1.3,
                        whiteSpace: "nowrap",
                        pointerEvents: "none",
                    }}
                >
                    {notaAi}
                </span>
            )}

            <motion.div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: sinistra,
                    x: "-50%",
                    width: 2,
                    zIndex: 4,
                    background: "#FFFFFF",
                    boxShadow: "0 0 14px rgba(0,0,0,0.4)",
                    pointerEvents: "none",
                }}
            />
            <motion.div
                aria-hidden="true"
                style={{ position: "absolute", top: "50%", left: sinistra, x: "-50%", y: "-50%", zIndex: 5, pointerEvents: "none" }}
            >
                <motion.div
                    animate={{ scale: premuto ? 0.92 : 1 }}
                    transition={{ duration: 0.12, ease: CURVA }}
                    style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: "#FFFFFF",
                        color: "#1C1917",
                        boxShadow: "0 18px 40px -18px rgba(28,25,23,0.45), 0 2px 6px rgba(28,25,23,0.12)",
                    }}
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="m9 7-5 5 5 5" />
                        <path d="m15 7 5 5-5 5" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    )
}

addPropertyControls(ConfrontoCuffia, {
    conCuffia: { type: ControlType.ResponsiveImage, title: "Con cuffia" },
    senzaCuffia: { type: ControlType.ResponsiveImage, title: "Senza cuffia" },
    etichettaCon: { type: ControlType.String, title: "Etichetta 1", defaultValue: "Con la cuffia" },
    etichettaSenza: { type: ControlType.String, title: "Etichetta 2", defaultValue: "Senza" },
    notaAi: { type: ControlType.String, title: "Nota AI", defaultValue: "Immagini generate con AI" },
    colore: { type: ControlType.Color, title: "Colore", defaultValue: "#1D4AA3" },
    raggio: { type: ControlType.Number, title: "Raggio", defaultValue: 24, min: 0, max: 60, step: 1, unit: "px" },
    partenza: { type: ControlType.Number, title: "Partenza", defaultValue: 50, min: 10, max: 90, step: 1, unit: "%" },
    dimostrazione: {
        type: ControlType.Boolean,
        title: "Demo",
        defaultValue: true,
        enabledTitle: "Sì",
        disabledTitle: "No",
    },
})
