import { connection } from "next/server";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MotionController } from "@/components/motion-controller";
import { LocaleDocument } from "@/components/locale-document";
import { siteChrome } from "@/lib/chrome";
import { loadContentRows, makeContent } from "@/lib/content";
import { getProductMenu } from "@/lib/data";

export default async function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Content lives in the database and is edited from /admin, so render at request time.
  await connection();
  const [en, fr, rows] = await Promise.all([getProductMenu("en"), getProductMenu("fr"), loadContentRows()]);
  const chrome = { en: siteChrome(makeContent(rows, "en")), fr: siteChrome(makeContent(rows, "fr")) };
  return (
    <>
      <MotionController />
      <LocaleDocument />
      <SiteHeader productMenu={{ en, fr }} chrome={chrome} />
      <main id="main-content">{children}</main>
      <SiteFooter chrome={chrome} />
    </>
  );
}
