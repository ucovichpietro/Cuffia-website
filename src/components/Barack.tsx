import { useId } from "react";
import { BARACK_PATTERN, type Pattern, type Product } from "@/lib/products";

const INK = "#16171C";
const FUR = "#1B1C22";
const FUR_HI = "#32343E";

const r1 = (n: number) => Math.round(n * 10) / 10;

export function PatternDef({ id, p, scale = 1 }: { id: string; p: Pattern; scale?: number }) {
  const base = p.base ?? "#FFFFFF";
  const s = 36 * scale;
  const h = s / 2;
  if (p.type === "gingham") {
    return (
      <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
        <rect width={s} height={s} fill={base} />
        <rect width={h} height={s} fill={p.a} />
        <rect width={s} height={h} fill={p.a} />
        <rect width={h} height={h} fill={p.b} />
      </pattern>
    );
  }
  if (p.type === "stripes") {
    return (
      <pattern id={id} width={s} height={s * 0.7} patternUnits="userSpaceOnUse">
        <rect width={s} height={s * 0.7} fill={base} />
        <rect width={s} height={s * 0.28} fill={p.a} />
      </pattern>
    );
  }
  if (p.type === "dots") {
    return (
      <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
        <rect width={s} height={s} fill={p.a} />
        <circle cx={h / 2} cy={h / 2} r={s * 0.11} fill={p.b} />
        <circle cx={h * 1.5} cy={h * 1.5} r={s * 0.11} fill={p.b} />
      </pattern>
    );
  }
  return (
    <pattern id={id} width={s} height={s} patternUnits="userSpaceOnUse">
      <rect width={s} height={s} fill={p.a} />
    </pattern>
  );
}

/** Volant: cerchi lungo un'ellisse, riempiti con lo stesso tessuto. */
function ruffle(cx: number, cy: number, rx: number, ry: number, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return { x: r1(cx + rx * Math.cos(t)), y: r1(cy + ry * Math.sin(t)) };
  });
}

function Face() {
  return (
    <g>
      {/* testa */}
      <ellipse cx="200" cy="212" rx="84" ry="92" fill={FUR} />
      {/* ciuffo riccio che spunta dalla cuffia */}
      <circle cx="176" cy="130" r="17" fill={FUR} />
      <circle cx="201" cy="121" r="20" fill={FUR} />
      <circle cx="226" cy="130" r="17" fill={FUR} />
      <path d="M186 124c6-7 14-9 22-6" stroke={FUR_HI} strokeWidth="4" strokeLinecap="round" fill="none" />
      {/* riflessi del pelo */}
      <path d="M132 196c2-22 14-40 30-48" stroke={FUR_HI} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M268 196c-2-22-14-40-30-48" stroke={FUR_HI} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* sopracciglia */}
      <path d="M148 174c8-9 22-11 32-5" stroke={FUR_HI} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M252 174c-8-9-22-11-32-5" stroke={FUR_HI} strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* occhi */}
      {[166, 234].map((x) => (
        <g key={x}>
          <circle cx={x} cy="198" r="16" fill="#0A0A0C" />
          <circle cx={x} cy="198" r="13" fill="#8A5527" />
          <circle cx={x} cy="198" r="8" fill="#0A0A0C" />
          <circle cx={x - 4.5} cy="193" r="4" fill="#fff" />
          <circle cx={x + 4} cy="203" r="1.8" fill="#fff" opacity="0.8" />
        </g>
      ))}
      {/* muso */}
      <ellipse cx="200" cy="254" rx="48" ry="40" fill="#2A2C35" />
      <path d="M200 226c-14 0-22 6-22 13 0 9 12 16 22 16s22-7 22-16c0-7-8-13-22-13z" fill="#060607" />
      <ellipse cx="193" cy="233" rx="7" ry="3.5" fill="#fff" opacity="0.35" />
      <path d="M200 255v10" stroke="#060607" strokeWidth="4" strokeLinecap="round" />
      <path
        d="M200 265c-7 11-24 11-30-1M200 265c7 11 24 11 30-1"
        stroke="#060607"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* lingua */}
      <path d="M187 271c0 22 26 22 26 0z" fill="#F2859A" stroke="#060607" strokeWidth="3" strokeLinejoin="round" />
      <path d="M200 273v10" stroke="#D9627A" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

function Body() {
  return (
    <g>
      <path d="M92 432c0-62 34-100 70-112h76c36 12 70 50 70 112z" fill={FUR} />
      <path
        d="M150 372c8 8 18 8 24 0m18 22c8 8 18 8 24 0m10-24c8 8 18 8 24 0m-78 44c8 8 18 8 24 0"
        stroke={FUR_HI}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

type BarackProps = {
  pattern?: Pattern;
  /** false: Barack senza cuffia, orecchie al vento */
  snood?: boolean;
  className?: string;
  title?: string;
};

export function Barack({ pattern = BARACK_PATTERN, snood = true, className, title }: BarackProps) {
  const id = useId();
  const fill = `url(#${id})`;
  const faceRing = ruffle(200, 212, 95, 103, 26);
  const neckRing = [150, 170, 190, 210, 230, 250];

  return (
    <svg
      viewBox="0 0 400 432"
      className={className}
      role="img"
      aria-label={title ?? (snood ? "Barack, cocker nero con la cuffia" : "Barack, cocker nero con le orecchie libere")}
    >
      <defs>
        <PatternDef id={id} p={pattern} />
      </defs>
      <Body />
      {snood ? (
        <g>
          {/* tubolare: più largo dove raccoglie le orecchie */}
          <path
            d="M200 40c-84 0-136 66-140 152-3 72 40 122 82 140h116c42-18 85-68 82-140-4-86-56-152-140-152z"
            fill={fill}
            stroke={INK}
            strokeWidth="5"
            strokeLinejoin="round"
          />
          {/* pieghe del tessuto */}
          <path
            d="M88 232c8 30 26 54 48 70M312 232c-8 30-26 54-48 70M120 110c-14 18-24 40-28 62M280 110c14 18 24 40 28 62"
            stroke={INK}
            strokeOpacity="0.22"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* volant al collo */}
          {neckRing.map((x) => (
            <circle key={x} cx={x} cy="336" r="15" fill={fill} stroke={INK} strokeWidth="4" />
          ))}
          {/* volant attorno al muso */}
          {faceRing.map((c) => (
            <circle key={`${c.x}-${c.y}`} cx={c.x} cy={c.y} r="13" fill={fill} stroke={INK} strokeWidth="4" />
          ))}
          <ellipse cx="200" cy="212" rx="90" ry="98" fill={INK} />
        </g>
      ) : (
        <g>
          {/* orecchie lunghe e ricce */}
          {[1, -1].map((dir) => (
            <g key={dir} transform={dir === 1 ? undefined : "translate(400 0) scale(-1 1)"}>
              <path
                d="M128 150c-40 8-62 62-60 132 1 44 20 74 44 70 30-6 36-70 34-140z"
                fill={FUR}
              />
              {[
                [76, 318, 15],
                [92, 338, 16],
                [114, 344, 15],
                [132, 328, 14],
              ].map(([cx, cy, r]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={FUR} />
              ))}
              <path
                d="M92 220c6 8 16 8 22 0m-24 40c6 8 16 8 22 0m-14 40c6 8 16 8 22 0"
                stroke={FUR_HI}
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          ))}
        </g>
      )}
      <Face />
    </svg>
  );
}

/** La cuffia da sola, stesa: tubolare con due volant. */
export function SnoodFlat({ pattern, className }: { pattern: Pattern; className?: string }) {
  const id = useId();
  const fill = `url(#${id})`;
  const top = [104, 136, 168, 200, 232, 264, 296];
  const bottom = [134, 167, 200, 233, 266];
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="La cuffia stesa">
      <defs>
        <PatternDef id={id} p={pattern} />
      </defs>
      <g transform="rotate(-6 200 200)">
        {top.map((x) => (
          <circle key={x} cx={x} cy="104" r="20" fill={fill} stroke={INK} strokeWidth="4" />
        ))}
        {bottom.map((x) => (
          <circle key={x} cx={x} cy="300" r="20" fill={fill} stroke={INK} strokeWidth="4" />
        ))}
        <path
          d="M84 122c0-10 232-10 232 0l-28 166c0 10-176 10-176 0z"
          fill={fill}
          stroke={INK}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path
          d="M92 138c60 10 156 10 216 0M116 272c50 9 118 9 168 0"
          stroke={INK}
          strokeWidth="3"
          strokeDasharray="7 7"
          fill="none"
          opacity="0.55"
        />
        <rect x="170" y="196" width="60" height="26" rx="5" fill="#fff" stroke={INK} strokeWidth="3" />
        <text
          x="200"
          y="214"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fontFamily="var(--font-fredoka), sans-serif"
          fill={INK}
        >
          CUFFIA
        </text>
      </g>
    </svg>
  );
}

function Bandana({ pattern, className }: { pattern: Pattern; className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Bandana">
      <defs>
        <PatternDef id={id} p={pattern} />
      </defs>
      <path
        d="M60 120c90 22 190 22 280 0L200 320z"
        fill={`url(#${id})`}
        stroke={INK}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M60 120c90 22 190 22 280 0" stroke={INK} strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="338" cy="120" r="9" fill="#fff" stroke={INK} strokeWidth="4" />
    </svg>
  );
}

function Kit({ pattern, className }: { pattern: Pattern; className?: string }) {
  const id = useId();
  const tubes: { p: Pattern; t: string }[] = [
    { p: { type: "solid", a: "#23407A", b: "#23407A" }, t: "translate(20 50) rotate(-12 124 125) scale(.62)" },
    { p: { type: "stripes", a: "#F6A723", b: "#F6A723", base: "#FFF6DF" }, t: "translate(140 60) rotate(12 124 125) scale(.62)" },
    { p: pattern, t: "translate(60 110) scale(.7)" },
  ];
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Kit di tre cuffie">
      <defs>
        {tubes.map((tb, i) => (
          <PatternDef key={i} id={`${id}-${i}`} p={tb.p} />
        ))}
      </defs>
      {tubes.map((tb, i) => (
        <g key={i} transform={tb.t}>
          {[104, 136, 168, 200, 232, 264, 296].map((x) => (
            <circle key={x} cx={x} cy="104" r="20" fill={`url(#${id}-${i})`} stroke={INK} strokeWidth="5" />
          ))}
          {[134, 167, 200, 233, 266].map((x) => (
            <circle key={x} cx={x} cy="300" r="20" fill={`url(#${id}-${i})`} stroke={INK} strokeWidth="5" />
          ))}
          <path
            d="M84 122c0-10 232-10 232 0l-28 166c0 10-176 10-176 0z"
            fill={`url(#${id}-${i})`}
            stroke={INK}
            strokeWidth="6"
            strokeLinejoin="round"
          />
        </g>
      ))}
    </svg>
  );
}

function Strap({ pattern, className, leash }: { pattern: Pattern; className?: string; leash?: boolean }) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={leash ? "Guinzaglio" : "Collare"}>
      <defs>
        <PatternDef id={id} p={pattern} scale={0.5} />
      </defs>
      {leash ? (
        <g fill="none" strokeLinecap="round">
          <path d="M90 300c40-120 120-60 150-150 16-48 60-56 70-20s-36 60-66 30" stroke={INK} strokeWidth="32" />
          <path d="M90 300c40-120 120-60 150-150 16-48 60-56 70-20s-36 60-66 30" stroke={`url(#${id})`} strokeWidth="24" />
          <circle cx="84" cy="318" r="16" fill="#fff" stroke={INK} strokeWidth="5" />
        </g>
      ) : (
        <g fill="none">
          <ellipse cx="200" cy="200" rx="120" ry="78" stroke={INK} strokeWidth="38" />
          <ellipse cx="200" cy="200" rx="120" ry="78" stroke={`url(#${id})`} strokeWidth="30" />
          <rect x="176" y="254" width="48" height="46" rx="8" fill="#fff" stroke={INK} strokeWidth="5" />
          <circle cx="200" cy="318" r="12" fill="#F6A723" stroke={INK} strokeWidth="4" />
        </g>
      )}
    </svg>
  );
}

export type ArtView = "worn" | "flat";

/** Illustrazione del prodotto: indossato da Barack o steso. */
export function ProductArt({ product, view = "worn", className }: { product: Product; view?: ArtView; className?: string }) {
  switch (product.kind) {
    case "bandana":
      return <Bandana pattern={product.pattern} className={className} />;
    case "kit":
      return <Kit pattern={product.pattern} className={className} />;
    case "collare":
      return <Strap pattern={product.pattern} className={className} />;
    case "guinzaglio":
      return <Strap pattern={product.pattern} className={className} leash />;
    default:
      return view === "flat" ? (
        <SnoodFlat pattern={product.pattern} className={className} />
      ) : (
        <Barack pattern={product.pattern} className={className} title={`Barack indossa ${product.name}`} />
      );
  }
}
