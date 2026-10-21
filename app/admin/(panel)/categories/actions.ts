"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { execute, query } from "@/lib/db";
import { checked, imageInput, int, isDuplicate, message, require, text, validSlug } from "@/lib/form";
import type { FormState } from "@/components/admin/form";

export async function saveCategory(id: number | null, _state: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const slug = text(form, "slug");
  const fields = {
    title_en: text(form, "title_en"), title_fr: text(form, "title_fr"),
    eyebrow_en: text(form, "eyebrow_en"), eyebrow_fr: text(form, "eyebrow_fr"),
    summary_en: text(form, "summary_en"), summary_fr: text(form, "summary_fr"),
    image_alt_en: text(form, "image_alt_en"), image_alt_fr: text(form, "image_alt_fr"),
  };
  const invalid = validSlug(slug) ?? require({ "Title (EN)": fields.title_en, "Title (FR)": fields.title_fr });
  if (invalid) return { error: invalid };

  let createdId: number | null = null;
  try {
    const image = await imageInput(form, "image");
    if (!image.src) return { error: "Please upload an image." };
    const values = [slug, int(form, "position"), checked(form, "draft") ? "draft" : "published", image.src, ...Object.values(fields)];
    const columns = "slug = ?, position = ?, status = ?, image = ?, title_en = ?, title_fr = ?, eyebrow_en = ?, eyebrow_fr = ?, summary_en = ?, summary_fr = ?, image_alt_en = ?, image_alt_fr = ?";
    if (id) await execute(`UPDATE categories SET ${columns} WHERE id = ?`, [...values, id]);
    else createdId = (await execute(`INSERT INTO categories SET ${columns}`, values)).insertId;
  } catch (error) {
    return { error: isDuplicate(error) ? `Another category already uses the slug “${slug}”.` : message(error) };
  }
  if (createdId) redirect(`/admin/categories/${createdId}?created=1`);
  return { ok: "Saved. Changes are live on the website." };
}

export async function deleteCategory(form: FormData): Promise<void> {
  await requireAdmin();
  const id = Number(form.get("id"));
  const [{ count }] = await query<{ count: number }>("SELECT COUNT(*) AS count FROM products WHERE category_id = ?", [id]);
  if (Number(count) > 0) redirect(`/admin/categories?error=has-products`);
  await execute("DELETE FROM categories WHERE id = ?", [id]);
  redirect("/admin/categories");
}
