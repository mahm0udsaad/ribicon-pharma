import type { Metadata } from "next";
import { listCategories } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";
import { CategoryForm } from "../category-form";

export const metadata: Metadata = { title: "New category" };

export default async function NewCategoryPage() {
  await requireAdmin();
  const rows = await listCategories();
  const nextPosition = Math.max(0, ...rows.map((row) => row.position)) + 1;
  return (
    <>
      <div className="admin-header"><div><h1>New category</h1></div></div>
      <CategoryForm nextPosition={nextPosition} />
    </>
  );
}
