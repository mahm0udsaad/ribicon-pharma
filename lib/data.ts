import { query, parseJson } from "@/lib/db";
import type { HeroSlide, Locale, PortfolioArea, Product, Spec } from "@/lib/types";

// Public-site reads. Pages call these at request time, so admin edits show up immediately.

type Row = Record<string, unknown>;
const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));
const opt = (v: unknown) => (v === null || v === undefined || v === "" ? undefined : String(v));

function toProduct(row: Row, locale: Locale): Product {
  const l = (field: string) => row[`${field}_${locale}`];
  const specs = parseJson<Spec[] | null>(l("specs"), null);
  return {
    slug: str(row.slug),
    name: str(l("name")),
    area: str(row.category_slug),
    category: str(l("category_label")),
    overview: str(l("overview")),
    legacyContext: str(l("legacy_context")),
    legacyUrl: str(row.legacy_url),
    image: str(row.image),
    imageWidth: Number(row.image_width) || 0,
    imageHeight: Number(row.image_height) || 0,
    imageAlt: str(l("image_alt")),
    secondImage: row.second_image
      ? { src: str(row.second_image), width: Number(row.second_image_width) || 0, height: Number(row.second_image_height) || 0, alt: str(l("second_image_alt")) }
      : undefined,
    highlights: parseJson<string[]>(l("highlights"), []),
    howItWorks: opt(l("how_it_works")),
    specsNote: opt(l("specs_note")),
    specs: specs && specs.length > 0 ? specs : undefined,
  };
}

const productSql = `
  SELECT p.*, c.slug AS category_slug
  FROM products p JOIN categories c ON c.id = p.category_id
  WHERE p.published = 1`;

export async function getProducts(locale: Locale): Promise<Product[]> {
  const rows = await query<Row>(`${productSql} ORDER BY c.position, p.position, p.id`);
  return rows.map((row) => toProduct(row, locale));
}

export async function getProduct(slug: string, locale: Locale): Promise<Product | undefined> {
  const rows = await query<Row>(`${productSql} AND p.slug = ? LIMIT 1`, [slug]);
  return rows[0] ? toProduct(rows[0], locale) : undefined;
}

export async function getCategories(locale: Locale): Promise<PortfolioArea[]> {
  const [categories, products] = await Promise.all([
    query<Row>("SELECT * FROM categories ORDER BY position, id"),
    getProducts(locale),
  ]);
  return categories.map((row, index) => ({
    slug: str(row.slug),
    number: String(index + 1).padStart(2, "0"),
    title: str(row[`title_${locale}`]),
    eyebrow: str(row[`eyebrow_${locale}`]),
    summary: str(row[`summary_${locale}`]),
    image: str(row.image),
    imageAlt: str(row[`image_alt_${locale}`]),
    products: products.filter((product) => product.area === row.slug).map((product) => product.name),
    status: row.status === "draft" ? "draft" : undefined,
  }));
}

export type ProductMenu = { area: PortfolioArea; items: Product[] }[];

export async function getProductMenu(locale: Locale): Promise<ProductMenu> {
  const [areas, products] = await Promise.all([getCategories(locale), getProducts(locale)]);
  return areas.map((area) => ({ area, items: products.filter((item) => item.area === area.slug) }));
}

export async function getHeroSlides(locale: Locale): Promise<HeroSlide[]> {
  const rows = await query<Row>("SELECT * FROM hero_slides WHERE active = 1 ORDER BY position, id");
  return rows.map((row) => ({
    src: str(row.image),
    alt: str(row[`image_alt_${locale}`]),
    eyebrow: str(row[`eyebrow_${locale}`]),
    title: str(row[`title_${locale}`]),
    body: str(row[`body_${locale}`]),
  }));
}
