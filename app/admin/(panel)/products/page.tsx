import type { Metadata } from "next";
import Link from "next/link";
import { AdminIcon } from "@/components/admin/icons";
import { ProductTable } from "@/components/admin/product-table";
import { listProducts } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { deleteProduct } from "./actions";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage() {
  await requireAdmin();
  const rows = await listProducts();
  return (
    <>
      <div className="admin-header">
        <div><h1>Products</h1><p>{rows.length} products across all categories.</p></div>
        <Link className="admin-btn" href="/admin/products/new"><AdminIcon name="plus" size={16} />New product</Link>
      </div>
      <ProductTable rows={rows.map(({ id, image, name_en, name_fr, category_title, published }) => ({ id, image, name_en, name_fr, category_title, published }))} onDelete={deleteProduct} />
    </>
  );
}
