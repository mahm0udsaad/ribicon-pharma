import type { Metadata } from "next";
import { listSlides } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { SlideForm } from "../slide-form";

export const metadata: Metadata = { title: "New slide" };

export default async function NewSlidePage() {
  await requireAdmin();
  const rows = await listSlides();
  const nextPosition = Math.max(0, ...rows.map((row) => row.position)) + 1;
  return (
    <>
      <div className="admin-header"><div><h1>New slide</h1></div></div>
      <SlideForm nextPosition={nextPosition} />
    </>
  );
}
