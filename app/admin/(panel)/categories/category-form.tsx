import Link from "next/link";
import { AdminForm } from "@/components/admin/form";
import { Bilingual, Checkbox, ImageField, TextArea, TextField } from "@/components/admin/fields";
import type { CategoryRow } from "@/lib/admin-data";
import { IMAGE_ASPECT } from "@/lib/site-content";
import { saveCategory } from "./actions";

export function CategoryForm({ row, nextPosition = 0 }: { row?: CategoryRow; nextPosition?: number }) {
  return (
    <AdminForm action={saveCategory.bind(null, row?.id ?? null)} submitLabel={row ? "Save changes" : "Create category"} extraActions={<Link className="admin-btn-secondary" href="/admin/categories">Back to list</Link>}>
      <section className="admin-card">
        <h2>Basics</h2>
        <div className="admin-grid-2">
          <TextField name="slug" label="Slug" required defaultValue={row?.slug} hint="Used in links, e.g. /portfolio#cardiology. Lowercase letters, numbers and hyphens." />
          <TextField name="position" label="Order" type="number" defaultValue={row?.position ?? nextPosition} hint="Lower numbers appear first." />
        </div>
        <Checkbox name="draft" label="Portfolio in development (shows “Information coming soon”)" defaultChecked={row?.status === "draft"} />
      </section>
      <section className="admin-card">
        <h2>Image</h2>
        <ImageField name="image" label="Category image" current={row?.image} aspect={IMAGE_ASPECT.category} hint="Used on the Products page, the home page and as the banner of this category’s product pages." />
        <Bilingual
          en={<TextField name="image_alt_en" label="Image description" defaultValue={row?.image_alt_en} />}
          fr={<TextField name="image_alt_fr" label="Description de l’image" defaultValue={row?.image_alt_fr} />}
        />
      </section>
      <section className="admin-card">
        <h2>Text</h2>
        <Bilingual
          en={<><TextField name="title_en" label="Title" required defaultValue={row?.title_en} /><TextField name="eyebrow_en" label="Eyebrow (small label above title)" defaultValue={row?.eyebrow_en} /><TextArea name="summary_en" label="Summary" defaultValue={row?.summary_en} /></>}
          fr={<><TextField name="title_fr" label="Titre" required defaultValue={row?.title_fr} /><TextField name="eyebrow_fr" label="Surtitre" defaultValue={row?.eyebrow_fr} /><TextArea name="summary_fr" label="Résumé" defaultValue={row?.summary_fr} /></>}
        />
      </section>
    </AdminForm>
  );
}
