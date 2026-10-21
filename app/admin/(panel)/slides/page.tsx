import type { Metadata } from "next";
import Link from "next/link";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { AdminIcon } from "@/components/admin/icons";
import { listSlides } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { deleteSlide } from "./actions";

export const metadata: Metadata = { title: "Hero slides" };

export default async function SlidesPage() {
  await requireAdmin();
  const rows = await listSlides();
  return (
    <>
      <div className="admin-header">
        <div><h1>Hero slides</h1><p>The rotating banner at the top of the home page.</p></div>
        <Link className="admin-btn" href="/admin/slides/new"><AdminIcon name="plus" size={16} />New slide</Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr><th>Order</th><th>Image</th><th>Headline</th><th>Status</th><th /></tr></thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.position}</td>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <td><span className="admin-thumb"><img src={row.image} alt="" /></span></td>
                <td><Link href={`/admin/slides/${row.id}`}><strong>{row.title_en}</strong></Link><br /><span className="admin-muted">{row.title_fr}</span></td>
                <td><span className={`admin-pill${row.active ? "" : " is-off"}`}>{row.active ? "Showing" : "Hidden"}</span></td>
                <td>
                  <div className="admin-row-actions">
                    <Link className="admin-btn-secondary" href={`/admin/slides/${row.id}`}>Edit</Link>
                    <ConfirmButton action={deleteSlide} id={row.id} message={`Delete the slide “${row.title_en}”?`} />
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
