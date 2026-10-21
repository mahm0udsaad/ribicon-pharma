import Image from "next/image";
import Link from "next/link";
import { Banner } from "@/components/pages/banner";
import { getContent } from "@/lib/content";
import { getCategories, getProducts } from "@/lib/data";
import { localizedPath } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export async function PortfolioPage({ locale }: { locale: Locale }) {
  const [c, areas, products] = await Promise.all([getContent(locale), getCategories(locale), getProducts(locale)]);
  const base = localizedPath("/portfolio", locale);
  const email = c.t("site.email");
  return (
    <>
      <Banner c={c} page="portfolio" />

      <div className="shell portfolio-stack">
        {areas.map((area) => {
          const items = products.filter((product) => product.area === area.slug);
          return (
            <section className="portfolio-section" id={area.slug} key={area.slug}>
              <span className="portfolio-number">{area.number}</span>
              <div className="portfolio-title">
                <div className="portfolio-visual"><Image src={area.image} alt={area.imageAlt} fill sizes="(max-width: 800px) 100vw, 450px" /></div>
                <p className="eyebrow">{area.eyebrow}</p>
                <h2>{area.title}</h2>
                <p>{area.summary}</p>
                {area.status === "draft" ? <span className="status-badge">{c.t("portfolio.draft_badge")}</span> : null}
              </div>
              {items.length > 0 ? (
                <ul className="product-list" aria-label={area.title}>
                  {items.map((product) => (
                    <li key={product.slug}><Link href={`${base}/${product.slug}`}>{product.name}<span aria-hidden="true">↗</span></Link></li>
                  ))}
                </ul>
              ) : (
                <p>{c.t("portfolio.empty")}</p>
              )}
            </section>
          );
        })}
      </div>

      <section className="section section-blue">
        <div className="shell content-grid">
          <div>
            <p className="eyebrow">{c.t("portfolio.info.eyebrow")}</p>
            <h2>{c.t("portfolio.info.title")}</h2>
          </div>
          <div>
            <p>{c.t("portfolio.info.body")}</p>
            <a className="button-primary" href={`mailto:${email}?subject=${encodeURIComponent(c.t("portfolio.info.subject"))}`}>{c.t("portfolio.info.button")}</a>
          </div>
        </div>
      </section>
    </>
  );
}
