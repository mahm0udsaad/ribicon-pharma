"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { isFrenchPath, localizedPath } from "@/lib/locale";

const navigation = {
  en: [{ path: "/about", label: "About" }, { path: "/portfolio", label: "Portfolio" }, { path: "/services", label: "Services" }, { path: "/contact", label: "Contact" }],
  fr: [{ path: "/about", label: "À propos" }, { path: "/portfolio", label: "Portefeuille" }, { path: "/services", label: "Services" }, { path: "/contact", label: "Contact" }],
};

export function SiteHeader() {
  const pathname = usePathname();
  const french = isFrenchPath(pathname);
  const locale = french ? "fr" : "en";
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href={french ? "/fr" : "/"} aria-label={french ? "Accueil Ribicon Pharma" : "Ribicon Pharma home"}>
          <Image
            src="/ribicon-pharma-logo.png"
            alt="Ribicon Pharma"
            width={418}
            height={251}
            priority
          />
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? (french ? "Fermer la navigation" : "Close navigation") : (french ? "Ouvrir la navigation" : "Open navigation")}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav
          id="site-navigation"
          className={`site-nav ${open ? "is-open" : ""}`}
          aria-label={french ? "Navigation principale" : "Primary navigation"}
        >
          {navigation[locale].map((item) => {
            const href = localizedPath(item.path, locale);
            return (
            <Link
              key={item.path}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          );})}
          <span className="nav-rule" aria-hidden="true" />
          <div className="language-switcher" aria-label={french ? "Choisir la langue" : "Choose language"}>
            <Link href={localizedPath(pathname, "fr")} lang="fr-CA" aria-current={french ? "page" : undefined} onClick={() => setOpen(false)}>FR</Link>
            <span aria-hidden="true">/</span>
            <Link href={localizedPath(pathname, "en")} lang="en-CA" aria-current={!french ? "page" : undefined} onClick={() => setOpen(false)}>EN</Link>
          </div>
          <Link className="nav-cta" href={localizedPath("/contact", locale)} onClick={() => setOpen(false)}>
            {french ? "Devenir partenaire" : "Partner with us"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
