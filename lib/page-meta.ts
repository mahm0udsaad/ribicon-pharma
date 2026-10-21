import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/types";

const alternates = (path: string) => ({
  canonical: path,
  languages: { "en-CA": path, "fr-CA": path === "/" ? "/fr" : `/fr${path}` },
});

// Title and description for a page, editable under the page's "Search engines & sharing" section.
export async function pageMetadata(page: string, locale: Locale, path: string): Promise<Metadata> {
  const c = await getContent(locale);
  const title = c.t(`${page}.seo.title`);
  const localPath = locale === "fr" ? (path === "/" ? "/fr" : `/fr${path}`) : path;
  return {
    title: page === "home" ? { absolute: title } : title,
    description: c.t(`${page}.seo.description`) || c.t("site.seo.description"),
    alternates: alternates(path),
    openGraph: { title, url: localPath },
  };
}
