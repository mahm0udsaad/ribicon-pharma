"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { portfolioAreas, products } from "@/lib/content";
import { portfolioAreasFr, productsFr } from "@/lib/content-fr";
import { isFrenchPath, localizedPath } from "@/lib/locale";

const navigation = {
  en: [{ path: "/about", label: "About" }, { path: "/portfolio", label: "Products" }, { path: "/services", label: "Services" }, { path: "/contact", label: "Contact" }],
  fr: [{ path: "/about", label: "À propos" }, { path: "/portfolio", label: "Produits" }, { path: "/services", label: "Services" }, { path: "/contact", label: "Contact" }],
};

// Product dropdown: category groups with their products, built from the portfolio data.
const productMenu = {
  en: portfolioAreas.filter((area) => area.products.length > 0).map((area) => ({ area, items: products.filter((item) => item.area === area.slug) })),
  fr: portfolioAreasFr.filter((area) => area.products.length > 0).map((area) => ({ area, items: productsFr.filter((item) => item.area === area.slug) })),
};

export function SiteHeader() {
  const pathname = usePathname();
  const french = isFrenchPath(pathname);
  const locale = french ? "fr" : "en";
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productsOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setProductsOpen(false); };
    const onPointer = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setProductsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); };
  }, [productsOpen]);

  const closeMenus = () => { setOpen(false); setProductsOpen(false); };

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
            const link = (
              <Link
                key={item.path}
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            );
            if (item.path !== "/portfolio") return link;
            return (
              <div
                className={`nav-dropdown ${productsOpen ? "is-open" : ""}`}
                key={item.path}
                ref={dropdownRef}
              >
                <div className="nav-dropdown-trigger">
                  {link}
                  <button
                    type="button"
                    className="nav-dropdown-toggle"
                    aria-expanded={productsOpen}
                    aria-controls="products-menu"
                    aria-label={french ? "Afficher les produits" : "Show products"}
                    onClick={() => setProductsOpen((current) => !current)}
                  >
                    <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
                <div className="nav-dropdown-panel" id="products-menu">
                  {productMenu[locale].map(({ area, items }) => (
                    <div className="nav-dropdown-group" key={area.slug}>
                      <Link className="nav-dropdown-heading" href={`${href}#${area.slug}`} onClick={closeMenus}>{area.title}</Link>
                      <ul>
                        {items.map((product) => (
                          <li key={product.slug}>
                            <Link href={`${href}/${product.slug}`} aria-current={pathname === `${href}/${product.slug}` ? "page" : undefined} onClick={closeMenus}>{product.name}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <span className="nav-rule" aria-hidden="true" />
          <div className="language-switcher" aria-label={french ? "Choisir la langue" : "Choose language"}>
            <Link href={localizedPath(pathname, "fr")} lang="fr-CA" aria-current={french ? "page" : undefined} onClick={closeMenus}>FR</Link>
            <span aria-hidden="true">/</span>
            <Link href={localizedPath(pathname, "en")} lang="en-CA" aria-current={!french ? "page" : undefined} onClick={closeMenus}>EN</Link>
          </div>
          <Link className="nav-cta" href={localizedPath("/contact", locale)} onClick={closeMenus}>
            {french ? "Devenir partenaire" : "Partner with us"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
