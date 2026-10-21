"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isFrenchPath, localizedPath } from "@/lib/locale";
import type { SiteChrome } from "@/lib/chrome";

export function SiteFooter({ chrome }: { chrome: Record<"en" | "fr", SiteChrome> }) {
  const pathname = usePathname();
  const french = isFrenchPath(pathname);
  const locale = french ? "fr" : "en";
  const path = (value: string) => localizedPath(value, locale);
  const c = chrome[locale];
  const f = c.footer;

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo is admin-uploaded; CSS sets its size */}
          <img src={c.logo} alt={c.name} loading="lazy" />
          <p>{f.tagline}</p>
        </div>

        <div>
          <p className="footer-label">{f.explore}</p>
          <Link href={path("/about")}>{c.nav.about}</Link>
          <Link href={path("/portfolio")}>{f.portfolio}</Link>
          <Link href={path("/services")}>{c.nav.services}</Link>
        </div>

        <div>
          <p className="footer-label">{c.nav.contact}</p>
          <p>{c.city}</p>
          <a href={`mailto:${c.email}`}>{c.email}</a>
          {c.phone ? <a href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}>{c.phone}</a> : null}
        </div>

        <div>
          <p className="footer-label">{f.information}</p>
          <Link href={path("/privacy")}>{f.privacy}</Link>
          <Link href={path("/accessibility")}>{f.accessibility}</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} {c.name}. {f.rights}</p>
        <p>{f.disclaimer}</p>
      </div>
    </footer>
  );
}
