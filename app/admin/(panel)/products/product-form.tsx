import Link from "next/link";
import { AdminForm } from "@/components/admin/form";
import { Bilingual, Checkbox, ImageField, TextArea, TextField } from "@/components/admin/fields";
import type { CategoryRow, ProductRow } from "@/lib/admin-data";
import { specsToText } from "@/lib/form";
import { saveProduct } from "./actions";

export function ProductForm({ row, categories, nextPosition = 0 }: { row?: ProductRow; categories: CategoryRow[]; nextPosition?: number }) {
  return (
    <AdminForm action={saveProduct.bind(null, row?.id ?? null)} submitLabel={row ? "Save changes" : "Create product"} extraActions={<>{row ? <Link className="admin-btn-secondary" href={`/portfolio/${row.slug}`} target="_blank">View on site ↗</Link> : null}<Link className="admin-btn-secondary" href="/admin/products">Back to list</Link></>}>
      <section className="admin-card">
        <h2>Basics</h2>
        <div className="admin-grid-2">
          <TextField name="slug" label="Slug" required defaultValue={row?.slug} hint="Page address: /portfolio/your-slug" />
          <label className="admin-field">
            <span>Category *</span>
            <select name="category_id" defaultValue={row?.category_id ?? categories[0]?.id} required>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.title_en}</option>)}
            </select>
          </label>
          <TextField name="position" label="Order within category" type="number" defaultValue={row?.position ?? nextPosition} />
          <TextField name="legacy_url" label="Former site link (optional)" type="url" defaultValue={row?.legacy_url} />
        </div>
        <Checkbox name="published" label="Published (visible on the website)" defaultChecked={row ? row.published === 1 : true} />
      </section>

      <section className="admin-card">
        <h2>Name and summary</h2>
        <Bilingual
          en={<><TextField name="name_en" label="Product name" required defaultValue={row?.name_en} /><TextField name="category_label_en" label="Category label (above the name)" defaultValue={row?.category_label_en} /><TextArea name="overview_en" label="Short overview" defaultValue={row?.overview_en} rows={3} /></>}
          fr={<><TextField name="name_fr" label="Nom du produit" required defaultValue={row?.name_fr} /><TextField name="category_label_fr" label="Étiquette de catégorie" defaultValue={row?.category_label_fr} /><TextArea name="overview_fr" label="Aperçu" defaultValue={row?.overview_fr} rows={3} /></>}
        />
      </section>

      <section className="admin-card">
        <h2>Images</h2>
        <ImageField name="image" label="Main product image" current={row?.image} hint="Pick any shape in the cropper; the page shows the image at the shape you choose." />
        <input type="hidden" name="image_width" value={row?.image_width ?? 0} />
        <input type="hidden" name="image_height" value={row?.image_height ?? 0} />
        <Bilingual
          en={<TextField name="image_alt_en" label="Image description" defaultValue={row?.image_alt_en} />}
          fr={<TextField name="image_alt_fr" label="Description de l’image" defaultValue={row?.image_alt_fr} />}
        />
        <ImageField name="second_image" label="Second image (optional, e.g. a diagram)" current={row?.second_image} />
        <input type="hidden" name="second_image_width" value={row?.second_image_width ?? 0} />
        <input type="hidden" name="second_image_height" value={row?.second_image_height ?? 0} />
        {row?.second_image ? <Checkbox name="remove_second_image" label="Remove the second image" /> : null}
        <Bilingual
          en={<TextField name="second_image_alt_en" label="Second image description" defaultValue={row?.second_image_alt_en} />}
          fr={<TextField name="second_image_alt_fr" label="Description de la deuxième image" defaultValue={row?.second_image_alt_fr} />}
        />
      </section>

      <section className="admin-card">
        <h2>Details</h2>
        <Bilingual
          en={<><TextArea name="highlights_en" label="Key points" hint="One point per line." defaultValue={row?.highlights_en.join("\n")} rows={6} /><TextArea name="how_it_works_en" label="How it works (optional)" defaultValue={row?.how_it_works_en} /></>}
          fr={<><TextArea name="highlights_fr" label="Points clés" hint="Un point par ligne." defaultValue={row?.highlights_fr.join("\n")} rows={6} /><TextArea name="how_it_works_fr" label="Fonctionnement (facultatif)" defaultValue={row?.how_it_works_fr} /></>}
        />
      </section>

      <section className="admin-card">
        <h2>Specifications (optional)</h2>
        <Bilingual
          en={<><TextArea name="specs_en" label="Specifications" hint="One per line: Label | Value" defaultValue={specsToText(row?.specs_en)} rows={6} /><TextArea name="specs_note_en" label="Note above the specifications" defaultValue={row?.specs_note_en} rows={2} /></>}
          fr={<><TextArea name="specs_fr" label="Spécifications" hint="Une par ligne : Libellé | Valeur" defaultValue={specsToText(row?.specs_fr)} rows={6} /><TextArea name="specs_note_fr" label="Note au-dessus des spécifications" defaultValue={row?.specs_note_fr} rows={2} /></>}
        />
      </section>

      <section className="admin-card">
        <h2>From the original portfolio</h2>
        <Bilingual
          en={<TextArea name="legacy_context_en" label="Context text" defaultValue={row?.legacy_context_en} />}
          fr={<TextArea name="legacy_context_fr" label="Texte de contexte" defaultValue={row?.legacy_context_fr} />}
        />
      </section>
    </AdminForm>
  );
}
