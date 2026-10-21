import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { AdminIcon } from "@/components/admin/icons";
import { listCategories } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { deleteCategory } from "./actions";

export const metadata: Metadata = { title: "Categories" };

export default async function CategoriesPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireAdmin();
  const [rows, { error }] = await Promise.all([listCategories(), searchParams]);
  return (
    <>
      <div className="admin-header">
        <div><h1>Categories</h1><p>Portfolio areas shown on the Products page and in the menu.</p></div>
        <Link className="admin-btn" href="/admin/categories/new"><AdminIcon name="plus" size={16} />New category</Link>
      </div>
      {error === "has-products" ? <p className="admin-alert" role="alert">That category still has products. Move or delete them first.</p> : null}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Order</th><th>Image</th><th>Title</th><th>Status</th><th>Products</th><th /></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.position}</td>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <td><span className="admin-thumb"><img src={row.image} alt="" /></span></td>
                <td><Link href={`/admin/categories/${row.id}`}><strong>{row.title_en}</strong></Link><br /><span className="admin-muted">{row.title_fr}</span></td>
                <td><span className={`admin-pill${row.status === "draft" ? " is-off" : ""}`}>{row.status === "draft" ? "In development" : "Published"}</span></td>
                <td>{Number(row.product_count)}</td>
                <td>
                  <div className="admin-row-actions">
                    <Link className="admin-btn-secondary" href={`/admin/categories/${row.id}`}>Edit</Link>
                    <ConfirmButton action={deleteCategory} id={row.id} message={`Delete the category “${row.title_en}”?`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
