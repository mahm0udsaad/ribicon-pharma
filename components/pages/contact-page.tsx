import { ContactForm } from "@/components/contact-form";
import { MultiLine } from "@/components/rich-text";
import { Banner } from "@/components/pages/banner";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/types";

export async function ContactPage({ locale }: { locale: Locale }) {
  const c = await getContent(locale);
  const email = c.t("site.email");
  const phone = c.t("site.phone");
  return (
    <>
      <Banner c={c} page="contact" />

      <section className="shell contact-grid">
        <div className="contact-primary">
          <div>
            <p className="eyebrow" style={{ color: "#aee9f8" }}>{c.t("contact.general.eyebrow")}</p>
            <h2>{c.t("contact.general.title")}</h2>
          </div>
          <div>
            <p>{c.t("contact.general.body")}</p>
            <a className="contact-email" href={`mailto:${email}`}>{email}</a>
            {phone ? <p><a href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a></p> : null}
          </div>
        </div>

        <aside className="contact-secondary" aria-label={c.t("contact.office.label")}>
          <h3>{c.t("site.name")}</h3>
          <div className="contact-detail">
            <strong>{c.t("contact.office.label")}</strong>
            <span><MultiLine text={c.t("site.address")} /></span>
          </div>
          <div className="contact-detail">
            <strong>{c.t("contact.product.label")}</strong>
            <span>{c.t("contact.product.body")}</span>
          </div>
          <div className="contact-detail">
            <strong>{c.t("contact.partner.label")}</strong>
            <span>{c.t("contact.partner.body")}</span>
          </div>
        </aside>
      </section>

      <section className="shell contact-form-section" aria-labelledby="contact-form-heading">
        <p className="eyebrow">{c.t("contact.form.eyebrow")}</p>
        <h2 className="section-title" id="contact-form-heading">{c.t("contact.form.title")}</h2>
        <ContactForm locale={locale} subjects={c.list("contact.form.subjects")} sentMessage={c.t("contact.form.sent")} />
      </section>

      <section className="section">
        <div className="shell content-grid">
          <div>
            <p className="eyebrow">{c.t("contact.privacy.eyebrow")}</p>
            <h2>{c.t("contact.privacy.title")}</h2>
          </div>
          <div><p>{c.t("contact.privacy.body")}</p></div>
        </div>
      </section>
    </>
  );
}
