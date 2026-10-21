import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminForm } from "@/components/admin/form";
import { TextField } from "@/components/admin/fields";
import { isAdmin } from "@/lib/auth";
import { login } from "./actions";

export const metadata: Metadata = { title: "Sign in" };

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <div className="admin admin-login">
      <div className="admin-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/ribicon-pharma-logo.png" alt="Ribicon Pharma" />
        <h1>Website admin</h1>
        <p className="admin-muted">Sign in to manage the website.</p>
        <AdminForm action={login} submitLabel="Sign in">
          <TextField name="password" label="Password" type="password" required />
        </AdminForm>
      </div>
    </div>
  );
}
