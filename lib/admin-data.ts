import { query, parseJson } from "@/lib/db";
import type { Spec } from "@/lib/types";

// Raw rows for the admin panel (both languages, drafts and unpublished items included).

export type CategoryRow = {
  id: number; slug: string; position: number; status: "published" | "draft"; image: string;
  title_en: string; title_fr: string; eyebrow_en: string; eyebrow_fr: string;
  summary_en: string; summary_fr: string; image_alt_en: string; image_alt_fr: string;
  product_count?: number;
};

export type ProductRow = {
  id: number; slug: string; category_id: number; position: number; published: number; legacy_url: string;
  image: string; image_width: number; image_height: number;
  second_image: string | null; second_image_width: number | null; second_image_height: number | null;
  name_en: string; name_fr: string; category_label_en: string; category_label_fr: string;
  overview_en: string; overview_fr: string; legacy_context_en: string; legacy_context_fr: string;
  image_alt_en: string; image_alt_fr: string; second_image_alt_en: string | null; second_image_alt_fr: string | null;
  highlights_en: string[]; highlights_fr: string[];
  how_it_works_en: string | null; how_it_works_fr: string | null;
  specs_note_en: string | null; specs_note_fr: string | null;
  specs_en: Spec[]; specs_fr: Spec[];
  category_title?: string;
};

export type SlideRow = {
  id: number; position: number; active: number; image: string;
  image_alt_en: string; image_alt_fr: string; eyebrow_en: string; eyebrow_fr: string;
  title_en: string; title_fr: string; body_en: string; body_fr: string;
};

export type InquiryRow = {
  id: number; created_at: Date; locale: string; name: string; email: string;
  organization: string; subject: string; message: string; read_at: Date | null;
};

export const listCategories = () =>
  query<CategoryRow>(`SELECT c.*, (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id) AS product_count FROM categories c ORDER BY c.position, c.id`);

export async function getCategoryRow(id: number) {
  return (await query<CategoryRow>("SELECT * FROM categories WHERE id = ?", [id]))[0];
}

const normalizeProduct = (row: ProductRow): ProductRow => ({
  ...row,
  highlights_en: parseJson<string[]>(row.highlights_en, []),
  highlights_fr: parseJson<string[]>(row.highlights_fr, []),
  specs_en: parseJson<Spec[]>(row.specs_en, []) ?? [],
  specs_fr: parseJson<Spec[]>(row.specs_fr, []) ?? [],
});

export async function listProducts() {
  const rows = await query<ProductRow>(`SELECT p.*, c.title_en AS category_title FROM products p JOIN categories c ON c.id = p.category_id ORDER BY c.position, p.position, p.id`);
  return rows.map(normalizeProduct);
}

export async function getProductRow(id: number) {
  const row = (await query<ProductRow>("SELECT * FROM products WHERE id = ?", [id]))[0];
  return row ? normalizeProduct(row) : undefined;
}

export const listSlides = () => query<SlideRow>("SELECT * FROM hero_slides ORDER BY position, id");

export async function getSlideRow(id: number) {
  return (await query<SlideRow>("SELECT * FROM hero_slides WHERE id = ?", [id]))[0];
}

export const listInquiries = () => query<InquiryRow>("SELECT * FROM inquiries ORDER BY created_at DESC, id DESC LIMIT 500");

export async function getInquiryRow(id: number) {
  return (await query<InquiryRow>("SELECT * FROM inquiries WHERE id = ?", [id]))[0];
}

export async function getDashboardCounts() {
  const [row] = await query<{ categories: number; products: number; slides: number; inquiries: number; unread: number }>(`
    SELECT
      (SELECT COUNT(*) FROM categories) AS categories,
      (SELECT COUNT(*) FROM products) AS products,
      (SELECT COUNT(*) FROM hero_slides WHERE active = 1) AS slides,
      (SELECT COUNT(*) FROM inquiries) AS inquiries,
      (SELECT COUNT(*) FROM inquiries WHERE read_at IS NULL) AS unread`);
  return { categories: Number(row.categories), products: Number(row.products), slides: Number(row.slides), inquiries: Number(row.inquiries), unread: Number(row.unread) };
}
