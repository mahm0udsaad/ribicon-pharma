import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { portfolioAreas } from "@/lib/content";

const featured = portfolioAreas[0];
const supporting = portfolioAreas.slice(1, 5);

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <Image
          className="hero-image"
          src="/hero-diagnostics.png"
          alt="Precision laboratory diagnostic equipment with a suspended sample droplet"
          fill
          priority
          sizes="100vw"
        />
        <div className="shell hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Canada-based specialty healthcare</p>
            <h1 className="display-title" id="hero-title">
              Precision in every possibility.
            </h1>
            <p>
              Ribicon Pharma connects specialized diagnostics and therapies with the
              healthcare professionals and partners who move patient care forward.
            </p>
            <div className="hero-actions">
              <Link className="button-primary" href="/portfolio">
                Explore our portfolio
              </Link>
              <Link className="button-secondary" href="/contact">
                Partner with us
              </Link>
            </div>
          </div>
        </div>
        <p className="hero-note">Diagnostics · Specialty medicines · Commercial partnerships</p>
      </section>

      <section className="section" aria-labelledby="portfolio-heading">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Focused portfolio</p>
              <h2 className="section-title" id="portfolio-heading">
                Specialization where it matters.
              </h2>
            </div>
            <p>
              A deliberately focused portfolio across diagnostics and specialty care,
              structured around clear therapeutic areas rather than a crowded catalogue.
            </p>
          </div>

          <div className="portfolio-showcase">
            <article className="feature-card">
              <Image className="feature-image" src={featured.image} alt={featured.imageAlt} fill sizes="(max-width: 800px) 100vw, 65vw" />
              <div className="feature-card-content">
                <p className="eyebrow">{featured.number} · {featured.eyebrow}</p>
                <h3>{featured.title}</h3>
                <p>{featured.summary}</p>
                <ArrowLink href={`/portfolio#${featured.slug}`} inverse>
                  View diagnostic portfolio
                </ArrowLink>
              </div>
            </article>

            <div className="area-list">
              {supporting.map((area) => (
                <Link className="area-row" href={`/portfolio#${area.slug}`} key={area.slug}>
                  <span>{area.number}</span>
                  <span className="area-thumb"><Image src={area.image} alt="" fill sizes="88px" /></span>
                  <span>
                    <h3>{area.title}</h3>
                    <p>{area.eyebrow}</p>
                  </span>
                  <span className="arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section-blue" aria-labelledby="story-heading">
        <div className="shell split-story">
          <div className="story-visual">
            <Image src="/ophthalmology-editorial.jpg" alt="Ophthalmic examination in a clinical setting" fill sizes="(max-width: 800px) 100vw, 40vw" />
            <span>Care built around specialized needs.</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">Ribicon Pharma</p>
            <h2 className="section-title" id="story-heading">
              Local perspective. International experience.
            </h2>
            <p>
              From our Canadian base, we work across a network of healthcare partners to
              bring specialized products to the markets and professionals they are intended
              to serve. Our approach combines commercial discipline with long-term customer
              relationships.
            </p>
            <ArrowLink href="/about">Discover our approach</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="difference-heading">
        <div className="shell">
          <p className="eyebrow">How we work</p>
          <h2 className="section-title" id="difference-heading">
            Clear priorities. Responsible growth.
          </h2>
          <div className="proof-strip">
            <article className="proof-item">
              <span>01</span>
              <h3>Specialized portfolio focus</h3>
            </article>
            <article className="proof-item">
              <span>02</span>
              <h3>Commercial and market expertise</h3>
            </article>
            <article className="proof-item">
              <span>03</span>
              <h3>Partner-led customer support</h3>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="contact-heading">
        <div className="shell cta-panel">
          <div>
            <p className="eyebrow" style={{ color: "#aee9f8" }}>Start a conversation</p>
            <h2 className="section-title" id="contact-heading">
              Building what comes next in specialty healthcare.
            </h2>
          </div>
          <div>
            <p>For commercial partnerships, portfolio inquiries, or company information.</p>
            <ArrowLink href="/contact" inverse>Contact Ribicon Pharma</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
