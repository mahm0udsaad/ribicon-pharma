import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSlideRow } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { SlideForm } from "../slide-form";

export const metadata: Metadata = { title: "Edit slide" };

export default async function EditSlidePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  await requireAdmin();
  const [{ id }, { created }] = await Promise.all([params, searchParams]);
  const row = await getSlideRow(Number(id));
  if (!row) notFound();
  return (
    <>
      <div className="admin-header"><div><h1>{row.title_en}</h1><p>Hero slide</p></div></div>
      {created ? <p className="admin-alert is-ok" role="status">Slide created.</p> : null}
      <SlideForm row={row} />
    </>
  );
}
