import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConfirmButton } from "@/components/admin/confirm-button";
import { getInquiryRow } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { execute } from "@/lib/db";
import { deleteInquiry, markUnread } from "../actions";

export const metadata: Metadata = { title: "Inquiry" };

export default async function InquiryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const row = await getInquiryRow(Number(id));
  if (!row) notFound();
  if (!row.read_at) await execute("UPDATE inquiries SET read_at = NOW() WHERE id = ?", [row.id]);

  const reply = `mailto:${encodeURIComponent(row.email)}?subject=${encodeURIComponent(`Re: ${row.subject || "Your inquiry"}`)}`;
  return (
    <>
      <div className="admin-header">
        <div><h1>{row.subject || "(no subject)"}</h1><p>From {row.name}</p></div>
        <div className="admin-row-actions">
          <a className="admin-btn" href={reply}>Reply by email</a>
          <form action={markUnread}><input type="hidden" name="id" value={row.id} /><button className="admin-btn-secondary" type="submit">Mark unread</button></form>
          <ConfirmButton action={deleteInquiry} id={row.id} message="Delete this message? This cannot be undone." />
        </div>
      </div>
      <section className="admin-card">
        <dl className="admin-meta">
          <dt>Name</dt><dd>{row.name}</dd>
          <dt>Email</dt><dd><a href={`mailto:${row.email}`}>{row.email}</a></dd>
          <dt>Organization</dt><dd>{row.organization || "—"}</dd>
          <dt>Language</dt><dd>{row.locale === "fr" ? "French" : "English"}</dd>
          <dt>Received</dt><dd>{new Date(row.created_at).toLocaleString("en-CA", { dateStyle: "full", timeStyle: "short" })}</dd>
        </dl>
      </section>
      <section className="admin-card">
        <h2>Message</h2>
        <p className="admin-message">{row.message}</p>
      </section>
      <p><Link className="admin-btn-secondary" href="/admin/inquiries">← All inquiries</Link></p>
    </>
  );
}
