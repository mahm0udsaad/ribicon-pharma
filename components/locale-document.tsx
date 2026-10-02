"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isFrenchPath } from "@/lib/locale";

export function LocaleDocument() {
  const pathname = usePathname();
  const french = isFrenchPath(pathname);

  useEffect(() => {
    document.documentElement.lang = french ? "fr-CA" : "en-CA";
  }, [french]);

  return (
    <a className="skip-link" href="#main-content">
      {french ? "Passer au contenu principal" : "Skip to main content"}
    </a>
  );
}
