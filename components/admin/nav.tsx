"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminIcon, type IconName } from "@/components/admin/icons";

const groups: { title: string; links: { href: string; label: string; icon: IconName }[] }[] = [
  { title: "Overview", links: [{ href: "/admin", label: "Dashboard", icon: "dashboard" }] },
  {
    title: "Website",
    links: [
      { href: "/admin/pages", label: "Pages & settings", icon: "pages" },
      { href: "/admin/slides", label: "Hero slides", icon: "slides" },
      { href: "/admin/categories", label: "Categories", icon: "categories" },
      { href: "/admin/products", label: "Products", icon: "products" },
    ],
  },
  { title: "Inbox", links: [{ href: "/admin/inquiries", label: "Inquiries", icon: "inbox" }] },
];

export function AdminNav({ unread }: { unread: number }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Admin">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="admin-nav-group">{group.title}</p>
          {group.links.map(({ href, label, icon }) => {
            const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} className="admin-nav-link" href={href} aria-current={active ? "page" : undefined}>
                <AdminIcon name={icon} />
                {label}
                {href === "/admin/inquiries" && unread > 0 ? <span className="admin-badge">{unread}</span> : null}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
