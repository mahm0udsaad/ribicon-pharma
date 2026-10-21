import Image from "next/image";
import Link from "next/link";
import { ArrowLink } from "@/components/arrow-link";
import { HeroSlider } from "@/components/hero-slider";
import { getContent } from "@/lib/content";
import { getCategories, getHeroSlides } from "@/lib/data";
import { localizedPath } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export async function HomePage({ locale }: { locale: Locale }) {
  const [c, areas, slides] = await Promise.all([getContent(locale), getCategories(locale), getHeroSlides(locale)]);
  const path = (value: string) => localizedPath(value, locale);
  const [featured, ...rest] = areas;
  const supporting = rest.slice(0, 4);

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        {slides.length > 0 ? (
          <HeroSlider
            slides={slides}
            actions={
              <>
                <Link className="button-primary" href={path("/portfolio")}>{c.t("home.hero.primary")}</Link>
                <Link className="button-secondary" href={path("/contact")}>{c.t("home.hero.secondary")}</Link>
              </>
            }
          />
        ) : null}
        <p className="hero-note">{c.t("home.hero.note")}</p>
      </section>

      <section className="section" aria-labelledby="portfolio-heading">
        <div className="shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">{c.t("home.portfolio.eyebrow")}</p>
              <h2 className="section-title" id="portfolio-heading">{c.t("home.portfolio.title")}</h2>
            </div>
            <p>{c.t("home.portfolio.body")}</p>
          </div>

          {featured ? (
            <div className="portfolio-showcase">
              <article className="feature-card">
                <Image className="feature-image" src={featured.image} alt={featured.imageAlt} fill sizes="(max-width: 800px) 100vw, 65vw" />
                <div className="feature-card-content">
                  <p className="eyebrow">{featured.number} · {featured.eyebrow}</p>
                  <h3>{featured.title}</h3>
                  <p>{featured.summary}</p>
                  <ArrowLink href={`${path("/portfolio")}#${featured.slug}`} inverse>{c.t("home.portfolio.link")}</ArrowLink>
                </div>
              </article>

              <div className="area-list">
                {supporting.map((area) => (
                  <Link className="area-row" href={`${path("/portfolio")}#${area.slug}`} key={area.slug}>
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
          ) : null}
        </div>
      </section>

      <section className="section section-blue" aria-labelledby="story-heading">
        <div className="shell split-story">
          <div className="story-visual">
            <Image src={c.image("home.story.image")} alt={c.t("home.story.image_alt")} fill sizes="(max-width: 800px) 100vw, 40vw" />
            <span>{c.t("home.story.caption")}</span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">{c.t("home.story.eyebrow")}</p>
            <h2 className="section-title" id="story-heading">{c.t("home.story.title")}</h2>
            <p>{c.t("home.story.body")}</p>
            <ArrowLink href={path("/about")}>{c.t("home.story.link")}</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="difference-heading">
        <div className="shell">
          <p className="eyebrow">{c.t("home.how.eyebrow")}</p>
          <h2 className="section-title" id="difference-heading">{c.t("home.how.title")}</h2>
          <div className="proof-strip">
            {c.list("home.how.items").map((item, i) => (
              <article className="proof-item" key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-dark" aria-labelledby="contact-heading">
        <div className="shell cta-panel">
          <div>
            <p className="eyebrow" style={{ color: "#aee9f8" }}>{c.t("home.cta.eyebrow")}</p>
            <h2 className="section-title" id="contact-heading">{c.t("home.cta.title")}</h2>
          </div>
          <div>
            <p>{c.t("home.cta.body")}</p>
            <ArrowLink href={path("/contact")} inverse>{c.t("home.cta.link")}</ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}
