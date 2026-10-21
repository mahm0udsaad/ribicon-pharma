"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { execute } from "@/lib/db";

export async function markUnread(form: FormData): Promise<void> {
  await requireAdmin();
  await execute("UPDATE inquiries SET read_at = NULL WHERE id = ?", [Number(form.get("id"))]);
  redirect("/admin/inquiries");
}

export async function deleteInquiry(form: FormData): Promise<void> {
  await requireAdmin();
  await execute("DELETE FROM inquiries WHERE id = ?", [Number(form.get("id"))]);
  redirect("/admin/inquiries");
}
