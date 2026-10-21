import type { Content } from "@/lib/content";

// Header and footer text/images for one language (both are client components, so they get plain data).
export type SiteChrome = ReturnType<typeof siteChrome>;

export function siteChrome(c: Content) {
  return {
    logo: c.image("site.logo"),
    name: c.t("site.name"),
    email: c.t("site.email"),
    phone: c.t("site.phone"),
    city: c.t("site.city"),
    nav: { about: c.t("nav.about"), products: c.t("nav.products"), services: c.t("nav.services"), contact: c.t("nav.contact"), cta: c.t("nav.cta") },
    footer: {
      tagline: c.t("footer.tagline"), explore: c.t("footer.explore"), portfolio: c.t("footer.portfolio"), information: c.t("footer.information"),
      privacy: c.t("footer.privacy"), accessibility: c.t("footer.accessibility"), rights: c.t("footer.rights"), disclaimer: c.t("footer.disclaimer"),
    },
  };
}
