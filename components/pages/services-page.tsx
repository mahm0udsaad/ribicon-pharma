import { Banner } from "@/components/pages/banner";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/types";

export async function ServicesPage({ locale }: { locale: Locale }) {
  const c = await getContent(locale);
  const email = c.t("site.email");
  return (
    <>
      <Banner c={c} page="services" />

      <section className="shell service-list" aria-label={c.t("services.hero.eyebrow")}>
        {c.pairs("services.items").map((service, i) => (
          <article className="service-row" key={i}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </article>
        ))}
      </section>

      <section className="section section-dark">
        <div className="shell cta-panel">
          <h2 className="section-title">{c.t("services.cta.title")}</h2>
          <a className="button-secondary" style={{ color: "white", borderColor: "white" }} href={`mailto:${email}?subject=${encodeURIComponent(c.t("services.cta.subject"))}`}>
            {c.t("services.cta.button")}
          </a>
        </div>
      </section>
    </>
  );
}
