"use server";

import { requireAdmin } from "@/lib/auth";
import { execute } from "@/lib/db";
import { imageInput, message } from "@/lib/form";
import { contentPages } from "@/lib/site-content";
import type { FormState } from "@/components/admin/form";

// Saves one page's fields. Values equal to the built-in default are stored as "no override",
// so improving the default text later still reaches pages the owner never touched.
export async function savePageContent(pageId: string, _state: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const page = contentPages.find((item) => item.id === pageId);
  if (!page) return { error: "Unknown page." };

  try {
    for (const field of page.sections.flatMap((section) => section.fields)) {
      let en: string;
      let fr: string | null;
      if (field.kind === "image") {
        en = (await imageInput(form, field.key)).src;
        fr = null;
      } else {
        en = String(form.get(`${field.key}__en`) ?? "").replace(/\r\n/g, "\n").trim();
        fr = String(form.get(`${field.key}__fr`) ?? "").replace(/\r\n/g, "\n").trim();
      }
      const isDefault = en === field.en && (field.kind === "image" || fr === (field.fr ?? field.en));
      if (isDefault) await execute("DELETE FROM site_content WHERE content_key = ?", [field.key]);
      else await execute(
        "INSERT INTO site_content (content_key, value_en, value_fr) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value_en = VALUES(value_en), value_fr = VALUES(value_fr)",
        [field.key, en, fr],
      );
    }
  } catch (error) {
    return { error: message(error) };
  }
  return { ok: "Saved. Changes are live on the website." };
}
