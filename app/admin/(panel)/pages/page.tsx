import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { contentPages } from "@/lib/site-content";

export const metadata: Metadata = { title: "Pages & settings" };

export default async function PagesIndex() {
  await requireAdmin();
  return (
    <>
      <div className="admin-header">
        <div><h1>Pages &amp; settings</h1><p>Edit the text and images on every page, plus the logo, contact details, menu and footer.</p></div>
      </div>
      <div className="admin-tiles">
        {contentPages.map((page) => {
          const count = page.sections.reduce((sum, section) => sum + section.fields.length, 0);
          const images = page.sections.reduce((sum, section) => sum + section.fields.filter((field) => field.kind === "image").length, 0);
          return (
            <Link className="admin-tile" href={`/admin/pages/${page.id}`} key={page.id}>
              <strong>{page.title}</strong>
              <span>{page.description}</span>
              <small>{count} fields{images ? ` · ${images} image${images > 1 ? "s" : ""}` : ""}</small>
            </Link>
          );
        })}
      </div>
    </>
  );
}
