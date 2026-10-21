import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryRow } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { CategoryForm } from "../category-form";

export const metadata: Metadata = { title: "Edit category" };

export default async function EditCategoryPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  await requireAdmin();
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const row = await getCategoryRow(Number(id));
  if (!row) notFound();
  return (
    <>
      <div className="admin-header"><div><h1>{row.title_en}</h1><p>Category · /portfolio#{row.slug}</p></div></div>
      {created ? <p className="admin-alert is-ok" role="status">Category created.</p> : null}
      <CategoryForm row={row} />
    </>
  );
}
