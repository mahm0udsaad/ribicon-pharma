import { query } from "@/lib/db";
import { contentFieldMap } from "@/lib/site-content";
import type { Locale } from "@/lib/types";

// Page text and images for the public site: database values over the defaults in lib/site-content.ts.

export type Content = {
  locale: Locale;
  /** Text for a key (falls back to English, then to the default). */
  t: (key: string) => string;
  /** One entry per non-empty line. */
  list: (key: string) => string[];
  /** "Title | Description" lines. */
  pairs: (key: string) => { title: string; text: string }[];
  /** Image path (shared by both languages). */
  image: (key: string) => string;
};

type Row = { content_key: string; value_en: string | null; value_fr: string | null };

export async function loadContentRows(): Promise<Map<string, Row>> {
  const rows = await query<Row>("SELECT content_key, value_en, value_fr FROM site_content");
  return new Map(rows.map((row) => [row.content_key, row]));
}

export function makeContent(rows: Map<string, Row>, locale: Locale): Content {
  const t = (key: string) => {
    const field = contentFieldMap.get(key);
    const row = rows.get(key);
    const saved = locale === "fr" ? row?.value_fr || row?.value_en : row?.value_en;
    if (saved !== null && saved !== undefined && saved !== "") return saved;
    if (!field) return "";
    return locale === "fr" ? field.fr ?? field.en : field.en;
  };
  const list = (key: string) => t(key).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  return {
    locale,
    t,
    list,
    pairs: (key) => list(key).map((line) => {
      const [title, ...rest] = line.split("|");
      return { title: title.trim(), text: rest.join("|").trim() };
    }),
    image: (key) => {
      const row = rows.get(key);
      return row?.value_en || contentFieldMap.get(key)?.en || "";
    },
  };
}

export async function getContent(locale: Locale): Promise<Content> {
  return makeContent(await loadContentRows(), locale);
}
