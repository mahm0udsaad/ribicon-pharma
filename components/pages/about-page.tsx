import Image from "next/image";
import { ArrowLink } from "@/components/arrow-link";
import { Paragraphs } from "@/components/rich-text";
import { Banner } from "@/components/pages/banner";
import { getContent } from "@/lib/content";
import { localizedPath } from "@/lib/locale";
import type { Locale } from "@/lib/types";

export async function AboutPage({ locale }: { locale: Locale }) {
  const c = await getContent(locale);
  return (
    <>
      <Banner c={c} page="about" />

      <section className="section section-blue">
        <div className="shell content-grid">
          <div>
            <p className="eyebrow">{c.t("about.purpose.eyebrow")}</p>
            <h2>{c.t("about.purpose.title")}</h2>
          </div>
          <div><Paragraphs text={c.t("about.purpose.body")} /></div>
        </div>

        <div className="shell content-grid">
          <div>
            <p className="eyebrow">{c.t("about.commitments.eyebrow")}</p>
            <h2>{c.t("about.commitments.title")}</h2>
          </div>
          <div>
            <ul>{c.list("about.commitments.items").map((item, i) => <li key={i}>{item}</li>)}</ul>
            <ArrowLink href={localizedPath("/services", locale)}>{c.t("about.commitments.link")}</ArrowLink>
          </div>
        </div>
      </section>

      <section className="section shell heritage-section">
        <div className="heritage-image"><Image src={c.image("about.heritage.image")} alt={c.t("about.heritage.image_alt")} fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
        <div>
          <p className="eyebrow">{c.t("about.heritage.eyebrow")}</p>
          <h2 className="section-title">{c.t("about.heritage.title")}</h2>
          <Paragraphs text={c.t("about.heritage.body")} />
        </div>
      </section>
    </>
  );
}
