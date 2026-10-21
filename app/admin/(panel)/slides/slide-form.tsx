import Link from "next/link";
import { AdminForm } from "@/components/admin/form";
import { Bilingual, Checkbox, ImageField, TextArea, TextField } from "@/components/admin/fields";
import type { SlideRow } from "@/lib/admin-data";
import { IMAGE_ASPECT } from "@/lib/site-content";
import { saveSlide } from "./actions";

export function SlideForm({ row, nextPosition = 0 }: { row?: SlideRow; nextPosition?: number }) {
  return (
    <AdminForm action={saveSlide.bind(null, row?.id ?? null)} submitLabel={row ? "Save changes" : "Create slide"} extraActions={<Link className="admin-btn-secondary" href="/admin/slides">Back to list</Link>}>
      <section className="admin-card">
        <h2>Background</h2>
        <ImageField name="image" label="Background image" current={row?.image} aspect={IMAGE_ASPECT.heroSlide} hint="Use a wide photo at least 2000px across. The headline sits on the left, so keep that side calm." />
        <Bilingual
          en={<TextField name="image_alt_en" label="Image description" defaultValue={row?.image_alt_en} />}
          fr={<TextField name="image_alt_fr" label="Description de l’image" defaultValue={row?.image_alt_fr} />}
        />
        <div className="admin-grid-2">
          <TextField name="position" label="Order" type="number" defaultValue={row?.position ?? nextPosition} hint="Lower numbers show first." />
        </div>
        <Checkbox name="active" label="Show this slide on the home page" defaultChecked={row ? row.active === 1 : true} />
      </section>
      <section className="admin-card">
        <h2>Text</h2>
        <Bilingual
          en={<><TextField name="eyebrow_en" label="Eyebrow (small label)" defaultValue={row?.eyebrow_en} /><TextField name="title_en" label="Headline" required defaultValue={row?.title_en} /><TextArea name="body_en" label="Paragraph" defaultValue={row?.body_en} rows={3} /></>}
          fr={<><TextField name="eyebrow_fr" label="Surtitre" defaultValue={row?.eyebrow_fr} /><TextField name="title_fr" label="Titre" required defaultValue={row?.title_fr} /><TextArea name="body_fr" label="Paragraphe" defaultValue={row?.body_fr} rows={3} /></>}
        />
      </section>
    </AdminForm>
  );
}
