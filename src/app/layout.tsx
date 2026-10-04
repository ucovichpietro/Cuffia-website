import type { Metadata } from "next";
import { Caveat, Fredoka, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { Overlays } from "@/components/Overlays";

// Titoli, logo, prezzi, bottoni: rotondo e pieno
const fredoka = Fredoka({ variable: "--font-fredoka", subsets: ["latin"] });
// Testi lunghi, schede, moduli, pagine legali: pulito e leggibile
const nunito = Nunito_Sans({ variable: "--font-nunito", subsets: ["latin"] });
// La "voce" di Barack: note a mano
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "CUFFIA — Cuffie paraorecchie per Cocker e cani a orecchie lunghe",
    template: "%s · CUFFIA",
  },
  description:
    "La cuffia che tiene le orecchie del tuo cane fuori da ciotola, pioggia ed erba alta. Nata su Barack, un cocker nero.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${fredoka.variable} ${nunito.variable} ${caveat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <a
            href="#contenuto"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
          >
            Vai al contenuto
          </a>
          <Header />
          <main id="contenuto" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <Overlays />
        </Providers>
      </body>
    </html>
  );
}
