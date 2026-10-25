"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { execute } from "@/lib/db";
import { checked, imageInput, int, isDuplicate, lines, message, optionalText, require, specs, text, validSlug } from "@/lib/form";
import type { FormState } from "@/components/admin/form";

export async function saveProduct(id: number | null, _state: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const slug = text(form, "slug");
  const localized = (field: string) => ({ [`${field}_en`]: text(form, `${field}_en`), [`${field}_fr`]: text(form, `${field}_fr`) });
  const names = localized("name");
  const invalid = validSlug(slug) ?? require({ "Name (EN)": names.name_en, "Name (FR)": names.name_fr, Category: text(form, "category_id") });
  if (invalid) return { error: invalid };

  let createdId: number | null = null;
  try {
    const image = await imageInput(form, "image");
    if (!image.src) return { error: "Please upload a product image." };
    const width = "width" in image ? image.width : int(form, "image_width");
    const height = "height" in image ? image.height : int(form, "image_height");

    let second: { src: string | null; width: number | null; height: number | null } = { src: null, width: null, height: null };
    if (!checked(form, "remove_second_image")) {
      const upload = await imageInput(form, "second_image");
      if (upload.src) second = { src: upload.src, width: "width" in upload ? upload.width : int(form, "second_image_width"), height: "height" in upload ? upload.height : int(form, "second_image_height") };
    }

    const row: Record<string, unknown> = {
      slug, category_id: int(form, "category_id"), position: int(form, "position"), published: checked(form, "published") ? 1 : 0,
      image: image.src, image_width: width, image_height: height,
      second_image: second.src, second_image_width: second.width, second_image_height: second.height,
      ...names, ...localized("category_label"), ...localized("overview"), ...localized("legacy_context"), ...localized("image_alt"),
      second_image_alt_en: optionalText(form, "second_image_alt_en"), second_image_alt_fr: optionalText(form, "second_image_alt_fr"),
      highlights_en: JSON.stringify(lines(form, "highlights_en")), highlights_fr: JSON.stringify(lines(form, "highlights_fr")),
      how_it_works_en: optionalText(form, "how_it_works_en"), how_it_works_fr: optionalText(form, "how_it_works_fr"),
      specs_note_en: optionalText(form, "specs_note_en"), specs_note_fr: optionalText(form, "specs_note_fr"),
      specs_en: JSON.stringify(specs(form, "specs_en")), specs_fr: JSON.stringify(specs(form, "specs_fr")),
    };
    const columns = Object.keys(row).map((key) => `${key} = ?`).join(", ");
    if (id) await execute(`UPDATE products SET ${columns} WHERE id = ?`, [...Object.values(row), id]);
    else createdId = (await execute(`INSERT INTO products SET ${columns}`, Object.values(row))).insertId;
  } catch (error) {
    return { error: isDuplicate(error) ? `Another product already uses the slug “${slug}”.` : message(error) };
  }
  if (createdId) redirect(`/admin/products/${createdId}?created=1`);
  return { ok: "Saved. Changes are live on the website." };
}

export async function deleteProduct(form: FormData): Promise<void> {
  await requireAdmin();
  await execute("DELETE FROM products WHERE id = ?", [Number(form.get("id"))]);
  redirect("/admin/products");
}
