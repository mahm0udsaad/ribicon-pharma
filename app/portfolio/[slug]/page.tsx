import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

      <section className="section shell product-detail" aria-labelledby="context-heading">
        <div>
          <p className="eyebrow">Portfolio information</p>
          <h2 className="section-title" id="context-heading">From the original portfolio.</h2>
        </div>
        <div>
          <span className="status-badge">Content review draft</span>
          <p>{product.legacyContext}</p>
          <p className="detail-note">This page preserves the former site’s product context for review. It does not establish current Canadian availability, approved indications, performance, or prescribing information. Request verified documentation before relying on it.</p>
          <a className="button-primary" href={`mailto:info@ribicongroup.com?subject=${encodeURIComponent(`Information request: ${product.name}`)}`}>Request verified information</a>
        </div>
      </section>

      {related.length > 0 && <section className="section section-blue"><div className="shell"><p className="eyebrow">Explore this area</p><h2 className="section-title">Related products</h2><div className="related-products">{related.map((item) => <Link href={`/portfolio/${item.slug}`} key={item.slug}>{item.name}<span aria-hidden="true">↗</span></Link>)}</div></div></section>}
    </>
  );
}
