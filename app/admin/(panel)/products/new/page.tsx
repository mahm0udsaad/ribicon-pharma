import type { Metadata } from "next";
import { listCategories, listProducts } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { ProductForm } from "../product-form";

export const metadata: Metadata = { title: "New product" };

export default async function NewProductPage() {
  await requireAdmin();
  const [categories, products] = await Promise.all([listCategories(), listProducts()]);
  const nextPosition = Math.max(0, ...products.map((row) => row.position)) + 1;
  return (
    <>
      <div className="admin-header"><div><h1>New product</h1></div></div>
      <ProductForm categories={categories} nextPosition={nextPosition} />
    </>
  );
}
