import type { Metadata } from "next";
import Link from "next/link";
import { listInquiries } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Inquiries" };

export default async function InquiriesPage() {
  await requireAdmin();
  const rows = await listInquiries();
  const unread = rows.filter((row) => !row.read_at).length;
  return (
    <>
      <div className="admin-header"><div><h1>Inquiries</h1><p>Messages sent from the website contact form · {unread} unread.</p></div></div>
      {rows.length === 0 ? <div className="admin-card"><p className="admin-muted">No messages yet.</p></div> : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Received</th><th>From</th><th>Subject</th><th>Language</th></tr></thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className={row.read_at ? undefined : "is-unread"}>
                  <td>{new Date(row.created_at).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}</td>
                  <td>{row.name}<br /><span className="admin-muted">{row.organization || row.email}</span></td>
                  <td><Link href={`/admin/inquiries/${row.id}`}>{row.subject || "(no subject)"}</Link></td>
                  <td>{row.locale.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
