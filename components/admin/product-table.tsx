"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ConfirmButton } from "@/components/admin/confirm-button";

type Row = { id: number; image: string; name_en: string; name_fr: string; category_title?: string; published: number };

// Product list with instant search and a category filter.
export function ProductTable({ rows, onDelete }: { rows: Row[]; onDelete: (formData: FormData) => Promise<void> }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const categories = useMemo(() => [...new Set(rows.map((row) => row.category_title ?? ""))].filter(Boolean), [rows]);
  const needle = search.trim().toLowerCase();
  const visible = rows.filter((row) =>
    (!category || row.category_title === category) &&
    (!needle || `${row.name_en} ${row.name_fr}`.toLowerCase().includes(needle)));

  return (
    <>
      <div className="admin-toolbar">
        <input type="search" placeholder="Search products…" value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Search products" />
        <select value={category} onChange={(event) => setCategory(event.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {categories.map((title) => <option key={title}>{title}</option>)}
        </select>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Status</th><th /></tr></thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <td><span className="admin-thumb"><img src={row.image} alt="" /></span></td>
                <td><Link href={`/admin/products/${row.id}`}><strong>{row.name_en}</strong></Link><br /><span className="admin-muted">{row.name_fr}</span></td>
                <td>{row.category_title}</td>
                <td><span className={`admin-pill${row.published ? "" : " is-off"}`}>{row.published ? "Published" : "Hidden"}</span></td>
                <td>
                  <div className="admin-row-actions">
                    <Link className="admin-btn-secondary" href={`/admin/products/${row.id}`}>Edit</Link>
                    <ConfirmButton action={onDelete} id={row.id} message={`Delete “${row.name_en}”? This cannot be undone.`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 ? <p className="admin-empty">No products match.</p> : null}
      </div>
    </>
  );
}
