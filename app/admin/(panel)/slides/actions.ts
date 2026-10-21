"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { execute } from "@/lib/db";
import { checked, imageInput, int, message, require, text } from "@/lib/form";
import type { FormState } from "@/components/admin/form";

export async function saveSlide(id: number | null, _state: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const fields = Object.fromEntries(
    ["image_alt", "eyebrow", "title", "body"].flatMap((field) => [[`${field}_en`, text(form, `${field}_en`)], [`${field}_fr`, text(form, `${field}_fr`)]]),
  );
  const invalid = require({ "Headline (EN)": fields.title_en, "Headline (FR)": fields.title_fr });
  if (invalid) return { error: invalid };

  let createdId: number | null = null;
  try {
    const image = await imageInput(form, "image");
    if (!image.src) return { error: "Please upload a background image." };
    const row = { position: int(form, "position"), active: checked(form, "active") ? 1 : 0, image: image.src, ...fields };
    const columns = Object.keys(row).map((key) => `${key} = ?`).join(", ");
    if (id) await execute(`UPDATE hero_slides SET ${columns} WHERE id = ?`, [...Object.values(row), id]);
    else createdId = (await execute(`INSERT INTO hero_slides SET ${columns}`, Object.values(row))).insertId;
  } catch (error) {
    return { error: message(error) };
  }
  if (createdId) redirect(`/admin/slides/${createdId}?created=1`);
  return { ok: "Saved. Changes are live on the home page." };
}

export async function deleteSlide(form: FormData): Promise<void> {
  await requireAdmin();
  await execute("DELETE FROM hero_slides WHERE id = ?", [Number(form.get("id"))]);
  redirect("/admin/slides");
}
