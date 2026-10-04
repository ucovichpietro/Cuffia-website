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
    title: `${p.name} — ${p.tipo === "Accessorio" ? "accessorio" : "cuffia paraorecchie"} per cani`,
    description: p.description.slice(0, 155),
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && !p.comingSoon)
    .sort((a, b) => Number(b.category !== product.category) - Number(a.category !== product.category))
    .slice(0, 4);

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
      availability: product.comingSoon ? "https://schema.org/PreOrder" : "https://schema.org/InStock",
    },
    ...(product.reviews > 0 && {
      aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
    }),
  };

  return (
    <div className="container-x py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Percorso" className="text-sm text-ink-soft">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href={`/shop?cat=${product.category}`} className="capitalize hover:underline">
          {product.category}
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <ProductClient product={product} />

      <section className="mt-20">
        <p className="eyebrow">Completa il corredo</p>
        <h2 className="mb-7 mt-2 text-3xl sm:text-4xl">Potrebbero piacerti</h2>
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
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
