import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminForm } from "@/components/admin/form";
import { ImageField } from "@/components/admin/fields";
import { requireAdmin } from "@/lib/auth";
import { loadContentRows, makeContent } from "@/lib/content";
import { contentPages, type FieldDef } from "@/lib/site-content";
import { savePageContent } from "../actions";

export const metadata: Metadata = { title: "Edit page" };

const HINTS: Partial<Record<FieldDef["kind"], string>> = {
  rich: "Blank line = new paragraph · “## ” starts a heading · “- ” starts a bullet · [text](https://link) makes a link.",
};

export default async function EditPageContent({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const page = contentPages.find((item) => item.id === id);
  if (!page) notFound();
  const rows = await loadContentRows();
  const en = makeContent(rows, "en");
  const fr = makeContent(rows, "fr");

  const textInput = (field: FieldDef, locale: "en" | "fr") => {
    const name = `${field.key}__${locale}`;
    const value = (locale === "en" ? en : fr).t(field.key);
    const rows = field.kind === "rich" ? 14 : field.kind === "text" ? 1 : Math.min(8, Math.max(3, value.split("\n").length + 1));
    return field.kind === "text"
      ? <input type="text" name={name} defaultValue={value} />
      : <textarea name={name} defaultValue={value} rows={rows} />;
  };

  return (
    <>
      <div className="admin-header">
        <div>
          <p className="admin-crumbs"><Link href="/admin/pages">Pages &amp; settings</Link> /</p>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
        </div>
        {page.path ? (
          <div className="admin-row-actions">
            <a className="admin-btn-secondary" href={page.path} target="_blank" rel="noreferrer">View English ↗</a>
            <a className="admin-btn-secondary" href={page.path === "/" ? "/fr" : `/fr${page.path}`} target="_blank" rel="noreferrer">View French ↗</a>
          </div>
        ) : null}
      </div>

      <AdminForm action={savePageContent.bind(null, page.id)} submitLabel="Save page" extraActions={<Link className="admin-btn-secondary" href="/admin/pages">Back</Link>}>
        {page.sections.map((section) => (
          <section className="admin-card" key={section.title}>
            <h2>{section.title}</h2>
            {section.description ? <p className="admin-muted admin-card-intro">{section.description}</p> : null}
            <div className="admin-content-fields">
              {section.fields.map((field) =>
                field.kind === "image" ? (
                  <ImageField key={field.key} name={field.key} label={field.label} current={en.image(field.key)} aspect={field.aspect} hint={field.hint} />
                ) : (
                  <div className="admin-field admin-bilingual-field" key={field.key}>
                    <span>{field.label}</span>
                    <div className="admin-grid-2">
                      <label className="admin-lang-input"><em>EN</em>{textInput(field, "en")}</label>
                      <label className="admin-lang-input"><em>FR</em>{textInput(field, "fr")}</label>
                    </div>
                    {field.hint || HINTS[field.kind] ? <small>{field.hint ?? HINTS[field.kind]}</small> : null}
                  </div>
                ),
              )}
            </div>
          </section>
        ))}
      </AdminForm>
    </>
  );
}
