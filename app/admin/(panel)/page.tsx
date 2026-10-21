import Link from "next/link";
import { AdminIcon, type IconName } from "@/components/admin/icons";
import { getDashboardCounts, listInquiries } from "@/lib/admin-data";
import { requireAdmin } from "@/lib/auth";

export default async function AdminDashboard() {
  await requireAdmin();
  const [counts, inquiries] = await Promise.all([getDashboardCounts(), listInquiries()]);
  const recent = inquiries.slice(0, 5);
  const stats: { href: string; icon: IconName; value: number; label: string }[] = [
    { href: "/admin/slides", icon: "slides", value: counts.slides, label: "Active hero slides" },
    { href: "/admin/categories", icon: "categories", value: counts.categories, label: "Categories" },
    { href: "/admin/products", icon: "products", value: counts.products, label: "Products" },
    { href: "/admin/inquiries", icon: "inbox", value: counts.unread, label: `Unread messages (${counts.inquiries} total)` },
  ];
  return (
    <>
      <div className="admin-header">
        <div><h1>Welcome back</h1><p>Everything on ribiconpharma.com can be edited from here. Changes go live as soon as you save.</p></div>
        <div className="admin-row-actions">
          <Link className="admin-btn-secondary" href="/admin/products/new"><AdminIcon name="plus" size={16} />New product</Link>
          <Link className="admin-btn" href="/admin/pages"><AdminIcon name="pages" size={16} />Edit pages</Link>
        </div>
      </div>
      <div className="admin-stats">
        {stats.map((stat) => (
          <Link className="admin-stat" href={stat.href} key={stat.href}>
            <span className="admin-stat-icon"><AdminIcon name={stat.icon} size={20} /></span>
            <div><strong>{stat.value}</strong><span>{stat.label}</span></div>
          </Link>
        ))}
      </div>
      <section className="admin-card">
        <h2>Latest messages</h2>
        {recent.length === 0 ? <p className="admin-muted">No messages yet. Messages sent from the contact form appear here.</p> : (
          <table className="admin-table">
            <tbody>
              {recent.map((item) => (
                <tr key={item.id} className={item.read_at ? undefined : "is-unread"}>
                  <td><Link href={`/admin/inquiries/${item.id}`}><strong>{item.subject || "(no subject)"}</strong></Link></td>
                  <td>{item.name}</td>
                  <td className="admin-muted">{new Date(item.created_at).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}
