export function isFrenchPath(pathname: string) {
  return pathname === "/fr" || pathname.startsWith("/fr/");
}

export function localizedPath(pathname: string, locale: "en" | "fr") {
  const unprefixed = isFrenchPath(pathname) ? pathname.slice(3) || "/" : pathname;
  return locale === "fr" ? (unprefixed === "/" ? "/fr" : `/fr${unprefixed}`) : unprefixed;
}
