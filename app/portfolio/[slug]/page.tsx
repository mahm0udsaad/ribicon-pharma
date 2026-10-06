import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { portfolioAreas, products } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  return {
    title: product?.name ?? "Product",
    description: product?.overview,
    robots: { index: false, follow: false },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const area = portfolioAreas.find((item) => item.slug === product.area)!;
  const related = products.filter((item) => item.area === product.area && item.slug !== slug);

  return (
    <>
      <header className="product-hero">
        <Image src={area.image} alt={area.imageAlt} fill priority sizes="100vw" className="product-hero-image" />
        <div className="shell product-hero-content">
          <Link className="back-link" href={`/portfolio#${area.slug}`}>← {area.title}</Link>
          <p className="eyebrow">{product.category}</p>
          <h1 className="display-title">{product.name}</h1>
          <p>{product.overview}</p>
        </div>
      </header>

      <ProductDetail
        product={product}
        labels={{
          overviewEyebrow: "Product overview",
          overviewTitle: "What it is.",
          howItWorks: "How it works",
          specsEyebrow: "Specifications",
          specsTitle: "Key figures.",
          contextEyebrow: "Portfolio information",
          contextTitle: "From the original portfolio.",
          badge: "Content review draft",
          note: "This page preserves the former site’s product information for review. It does not establish current Canadian availability, approved indications, performance, or prescribing information. Request verified documentation before relying on it.",
          cta: "Request verified information",
          ctaSubject: "Information request",
          legacySource: "View on the former site",
        }}
      />

      {related.length > 0 && <section className="section section-blue"><div className="shell"><p className="eyebrow">Explore this area</p><h2 className="section-title">Related products</h2><div className="related-products">{related.map((item) => <Link href={`/portfolio/${item.slug}`} key={item.slug}>{item.name}<span aria-hidden="true">↗</span></Link>)}</div></div></section>}
    </>
  );
}
