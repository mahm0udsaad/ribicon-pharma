import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getContent } from "@/lib/content";
import { getCategories, getProduct, getProducts } from "@/lib/data";
import { localizedPath } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export async function productMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const product = await getProduct(slug, locale);
  // Product pages are review drafts; keep them out of search results until approved.
  return { title: product?.name ?? (locale === "fr" ? "Produit" : "Product"), description: product?.overview, robots: { index: false, follow: false } };
}

export async function ProductPage({ slug, locale }: { slug: string; locale: Locale }) {
  const product = await getProduct(slug, locale);
  if (!product) notFound();
  const [c, areas, products] = await Promise.all([getContent(locale), getCategories(locale), getProducts(locale)]);
  const area = areas.find((item) => item.slug === product.area)!;
  const related = products.filter((item) => item.area === product.area && item.slug !== slug);
  const base = localizedPath("/portfolio", locale);

  return (
    <>
      <header className="product-hero">
        <Image src={area.image} alt={area.imageAlt} fill priority sizes="100vw" className="product-hero-image" />
        <div className="shell product-hero-content">
          <Link className="back-link" href={`${base}#${area.slug}`}>← {area.title}</Link>
          <p className="eyebrow">{product.category}</p>
          <h1 className="display-title">{product.name}</h1>
          <p>{product.overview}</p>
        </div>
      </header>

      <ProductDetail
        product={product}
        email={c.t("site.email")}
        labels={{
          overviewEyebrow: c.t("product.overview_eyebrow"),
          overviewTitle: c.t("product.overview_title"),
          howItWorks: c.t("product.how_it_works"),
          specsEyebrow: c.t("product.specs_eyebrow"),
          specsTitle: c.t("product.specs_title"),
          contextEyebrow: c.t("product.context_eyebrow"),
          contextTitle: c.t("product.context_title"),
          badge: c.t("product.badge"),
          note: c.t("product.note"),
          cta: c.t("product.cta"),
          ctaSubject: c.t("product.cta_subject"),
        }}
      />

      {related.length > 0 ? (
        <section className="section section-blue">
          <div className="shell">
            <p className="eyebrow">{c.t("product.related_eyebrow")}</p>
            <h2 className="section-title">{c.t("product.related_title")}</h2>
            <div className="related-products">
              {related.map((item) => <Link href={`${base}/${item.slug}`} key={item.slug}>{item.name}<span aria-hidden="true">↗</span></Link>)}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
