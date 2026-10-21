import { RichText } from "@/components/rich-text";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/types";

// Privacy and Accessibility: a heading and formatted text, both editable.
export async function LegalPage({ page, locale }: { page: "privacy" | "accessibility"; locale: Locale }) {
  const c = await getContent(locale);
  return (
    <article className="legal-copy">
      <p className="eyebrow">{c.t(`${page}.eyebrow`)}</p>
      <h1>{c.t(`${page}.title`)}</h1>
      <RichText text={c.t(`${page}.body`)} />
    </article>
  );
}
