import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductRow, listCategories } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "Edit product" };

export default async function EditProductPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  await requireAdmin();
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const [row, categories] = await Promise.all([getProductRow(Number(id)), listCategories()]);
  if (!row) notFound();
  return (
    <>
      <div className="admin-header"><div><h1>{row.name_en}</h1><p>Product · /portfolio/{row.slug}</p></div></div>
      {created ? <p className="admin-alert is-ok" role="status">Product created.</p> : null}
      <ProductForm row={row} categories={categories} />
    </>
  );
}
