import { requireAdmin } from "@/lib/auth";
import { getDashboardCounts } from "@/lib/admin-data";
import { AdminIcon } from "@/components/admin/icons";
import { AdminNav } from "@/components/admin/nav";
import { getContent } from "@/lib/content";
import { logout } from "../login/actions";

export default async function AdminPanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();
  const [{ unread }, c] = await Promise.all([getDashboardCounts(), getContent("en")]);
  return (
    <div className="admin">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/admin">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.image("site.logo")} alt="" />
          <div><strong>{c.t("site.name")}</strong><small>Website admin</small></div>
        </a>
        <AdminNav unread={unread} />
        <div className="admin-sidebar-foot">
          <a className="admin-nav-link" href="/" target="_blank" rel="noreferrer"><AdminIcon name="external" />View website</a>
          <form action={logout}><button className="admin-nav-link" type="submit"><AdminIcon name="logout" />Sign out</button></form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
