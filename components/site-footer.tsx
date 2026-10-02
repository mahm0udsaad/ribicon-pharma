"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isFrenchPath, localizedPath } from "@/lib/locale";

export function SiteFooter() {
  const pathname = usePathname();
  const french = isFrenchPath(pathname);
  const locale = french ? "fr" : "en";
  const path = (value: string) => localizedPath(value, locale);

  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image
            src="/ribicon-pharma-logo.png"
            alt="Ribicon Pharma"
            width={418}
            height={251}
          />
          <p>{french ? "Des soins spécialisés, mis en marché avec rigueur." : "Specialized healthcare, thoughtfully brought to market."}</p>
        </div>

        <div>
          <p className="footer-label">{french ? "Explorer" : "Explore"}</p>
          <Link href={path("/about")}>{french ? "À propos" : "About"}</Link>
          <Link href={path("/portfolio")}>{french ? "Portefeuille" : "Portfolio"}</Link>
          <Link href={path("/services")}>Services</Link>
        </div>

        <div>
          <p className="footer-label">Contact</p>
          <p>Montréal, Québec, Canada</p>
          <a href="mailto:info@ribicongroup.com">info@ribicongroup.com</a>
        </div>

        <div>
          <p className="footer-label">Information</p>
          <Link href={path("/privacy")}>{french ? "Confidentialité" : "Privacy"}</Link>
          <Link href={path("/accessibility")}>{french ? "Accessibilité" : "Accessibility"}</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} Ribicon Pharma. {french ? "Tous droits réservés." : "All rights reserved."}</p>
        <p>{french ? "L’information de ce site ne constitue pas un avis médical." : "Information on this website is not medical advice."}</p>
      </div>
    </footer>
  );
}
