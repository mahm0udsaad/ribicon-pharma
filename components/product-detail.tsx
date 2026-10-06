import Image from "next/image";
import type { Product } from "@/lib/content";

export type ProductDetailLabels = {
  overviewEyebrow: string;
  overviewTitle: string;
  howItWorks: string;
  specsEyebrow: string;
  specsTitle: string;
  contextEyebrow: string;
  contextTitle: string;
  badge: string;
  note: string;
  cta: string;
  ctaSubject: string;
  legacySource: string;
};

export function ProductDetail({ product, labels }: { product: Product; labels: ProductDetailLabels }) {
  return (
    <>
      <section className="section shell product-overview" aria-labelledby="overview-heading">
        <figure className="product-figure">
          <Image src={product.image} alt={product.imageAlt} width={product.imageWidth} height={product.imageHeight} sizes="(max-width: 800px) 100vw, 420px" />
        </figure>
        <div>
          <p className="eyebrow">{labels.overviewEyebrow}</p>
          <h2 className="section-title" id="overview-heading">{labels.overviewTitle}</h2>
          <ul className="product-highlights">
            {product.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
          {product.howItWorks ? (
            <>
              <h3 className="product-subtitle">{labels.howItWorks}</h3>
              <p className="product-prose">{product.howItWorks}</p>
            </>
          ) : null}
        </div>
      </section>

      {product.secondImage ? (
        <section className="shell product-second-image">
          <Image src={product.secondImage.src} alt={product.secondImage.alt} width={product.secondImage.width} height={product.secondImage.height} sizes="(max-width: 900px) 100vw, 817px" />
        </section>
      ) : null}

      {product.specs ? (
        <section className="section section-blue" aria-labelledby="specs-heading">
          <div className="shell product-specs">
            <div>
              <p className="eyebrow">{labels.specsEyebrow}</p>
              <h2 className="section-title" id="specs-heading">{labels.specsTitle}</h2>
              {product.specsNote ? <p className="spec-note">{product.specsNote}</p> : null}
            </div>
            <dl className="spec-table">
              {product.specs.map((spec) => (
                <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      <section className="section shell product-detail" aria-labelledby="context-heading">
        <div>
          <p className="eyebrow">{labels.contextEyebrow}</p>
          <h2 className="section-title" id="context-heading">{labels.contextTitle}</h2>
        </div>
        <div>
          <span className="status-badge">{labels.badge}</span>
          <p>{product.legacyContext}</p>
          <p className="detail-note">{labels.note}</p>
          <p className="legacy-source"><a href={product.legacyUrl} rel="noopener noreferrer" target="_blank">{labels.legacySource} ↗</a></p>
          <a className="button-primary" href={`mailto:info@ribicongroup.com?subject=${encodeURIComponent(`${labels.ctaSubject}: ${product.name}`)}`}>{labels.cta}</a>
        </div>
      </section>
    </>
  );
}
