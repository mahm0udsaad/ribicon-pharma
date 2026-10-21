import { PageHero } from "@/components/page-hero";
import type { Content } from "@/lib/content";

// The image banner at the top of inner pages ("<page>.hero.*" content keys).
export function Banner({ c, page }: { c: Content; page: string }) {
  return (
    <PageHero image={c.image(`${page}.hero.image`)}>
      <p className="eyebrow">{c.t(`${page}.hero.eyebrow`)}</p>
      <h1 className="display-title">{c.t(`${page}.hero.title`)}</h1>
      <p>{c.t(`${page}.hero.body`)}</p>
    </PageHero>
  );
}
