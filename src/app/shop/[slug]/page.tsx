import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductClient } from "./ProductClient";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: `${p.name} — cuffia paraorecchie per cani`,
    description: p.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `CUFFIA ${product.name}`,
    description: product.description,
    brand: { "@type": "Brand", name: "CUFFIA" },
    offers: {
      "@type": "Offer",
      price: product.price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="container-x py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Percorso" className="text-sm text-ink-soft">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/shop" className="hover:underline">
          Shop
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <ProductClient product={product} />

      <section className="section pb-0">
        <p className="eyebrow">Le altre cuffie</p>
        <h2 className="mb-10 mt-4 text-4xl sm:text-5xl">
          Potrebbero <em>piacerti</em>
        </h2>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 lg:gap-x-7">
          {related.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
