import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import Image from "next/image";
import Link from "next/link";
import { portfolioAreas, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Ribicon Pharma’s focused portfolio across diagnostics, specialty therapeutics, ophthalmology, and cardiology.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero image="/hero-diagnostics.png">
        <p className="eyebrow">Our portfolio</p>
        <h1 className="display-title">Focused by design.</h1>
        <p>
          A clear view of Ribicon Pharma’s current areas of focus. Detailed product
          information is provided only after appropriate regulatory and medical review.
        </p>
      </PageHero>

      <div className="shell portfolio-stack">
        {portfolioAreas.map((area) => (
          <section className="portfolio-section" id={area.slug} key={area.slug}>
            <span className="portfolio-number">{area.number}</span>
            <div className="portfolio-title">
              <div className="portfolio-visual"><Image src={area.image} alt={area.imageAlt} fill sizes="(max-width: 800px) 100vw, 450px" /></div>
              <p className="eyebrow">{area.eyebrow}</p>
              <h2>{area.title}</h2>
              <p>{area.summary}</p>
              {area.status === "draft" ? (
                <span className="status-badge">Information forthcoming</span>
              ) : null}
            </div>
            {area.products.length > 0 ? (
              <ul className="product-list" aria-label={`${area.title} products`}>
                {area.products.map((name) => {
                  const product = products.find((item) => item.name === name);
                  return <li key={name}>{product ? <Link href={`/portfolio/${product.slug}`}>{name}<span aria-hidden="true">↗</span></Link> : name}</li>;
                })}
              </ul>
            ) : (
              <p>
                Product names, intended uses, and supporting documentation will be
                added after the portfolio is confirmed.
              </p>
            )}
          </section>
        ))}
      </div>

      <section className="section section-blue">
        <div className="shell content-grid">
          <div>
            <p className="eyebrow">For healthcare professionals</p>
            <h2>Need verified product information?</h2>
          </div>
          <div>
            <p>
              Contact Ribicon Pharma for current product status, approved Canadian product
              documentation, and medical information. Public portfolio descriptions are not
              a substitute for an authorized product monograph or professional advice.
            </p>
            <a className="button-primary" href="mailto:info@ribicongroup.com?subject=Product%20information%20request">
              Request product information
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
