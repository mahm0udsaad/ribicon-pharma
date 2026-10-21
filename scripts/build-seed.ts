// Generates db/seed.sql from the original hard-coded content in db/seed-data/.
// Run: npm run db:seed-sql   (then import db/schema.sql + db/seed.sql locally or via phpMyAdmin)
import { writeFileSync } from "node:fs";
import { portfolioAreas, products } from "../db/seed-data/content-en";
import { portfolioAreasFr, productsFr } from "../db/seed-data/content-fr";
import { heroSlides } from "../db/seed-data/hero-slides";

type Value = string | number | null | undefined;
const sql = (v: Value) => {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  return `'${v.replace(/\\/g, "\\\\").replace(/'/g, "''").replace(/\n/g, "\\n")}'`;
};
const json = (v: unknown) => (v === undefined ? "NULL" : sql(JSON.stringify(v)));
const insert = (table: string, row: Record<string, string>) =>
  `INSERT INTO ${table} (${Object.keys(row).join(", ")}) VALUES (${Object.values(row).join(", ")});`;

const lines = ["SET NAMES utf8mb4;", "SET FOREIGN_KEY_CHECKS = 0;", "DELETE FROM products;", "DELETE FROM categories;", "DELETE FROM hero_slides;", "SET FOREIGN_KEY_CHECKS = 1;", ""];

portfolioAreas.forEach((area, i) => {
  const fr = portfolioAreasFr.find((item) => item.slug === area.slug)!;
  lines.push(insert("categories", {
    id: sql(i + 1), slug: sql(area.slug), position: sql(i + 1), status: sql(area.status === "draft" ? "draft" : "published"),
    image: sql(area.image), title_en: sql(area.title), title_fr: sql(fr.title), eyebrow_en: sql(area.eyebrow), eyebrow_fr: sql(fr.eyebrow),
    summary_en: sql(area.summary), summary_fr: sql(fr.summary), image_alt_en: sql(area.imageAlt), image_alt_fr: sql(fr.imageAlt),
  }));
});
lines.push("");

products.forEach((p, i) => {
  const fr = productsFr.find((item) => item.slug === p.slug)!;
  const categoryId = portfolioAreas.findIndex((area) => area.slug === p.area) + 1;
  lines.push(insert("products", {
    slug: sql(p.slug), category_id: sql(categoryId), position: sql(i + 1), published: "1", legacy_url: sql(p.legacyUrl),
    image: sql(p.image), image_width: sql(p.imageWidth), image_height: sql(p.imageHeight),
    second_image: sql(p.secondImage?.src), second_image_width: sql(p.secondImage?.width), second_image_height: sql(p.secondImage?.height),
    name_en: sql(p.name), name_fr: sql(fr.name), category_label_en: sql(p.category), category_label_fr: sql(fr.category),
    overview_en: sql(p.overview), overview_fr: sql(fr.overview), legacy_context_en: sql(p.legacyContext), legacy_context_fr: sql(fr.legacyContext),
    image_alt_en: sql(p.imageAlt), image_alt_fr: sql(fr.imageAlt), second_image_alt_en: sql(p.secondImage?.alt), second_image_alt_fr: sql(fr.secondImage?.alt),
    highlights_en: json(p.highlights), highlights_fr: json(fr.highlights), how_it_works_en: sql(p.howItWorks), how_it_works_fr: sql(fr.howItWorks),
    specs_note_en: sql(p.specsNote), specs_note_fr: sql(fr.specsNote), specs_en: json(p.specs), specs_fr: json(fr.specs),
  }));
});
lines.push("");

heroSlides.forEach((s, i) => {
  lines.push(insert("hero_slides", {
    position: sql(i + 1), active: "1", image: sql(s.image), image_alt_en: sql(s.en.alt), image_alt_fr: sql(s.fr.alt),
    eyebrow_en: sql(s.en.eyebrow), eyebrow_fr: sql(s.fr.eyebrow), title_en: sql(s.en.title), title_fr: sql(s.fr.title), body_en: sql(s.en.body), body_fr: sql(s.fr.body),
  }));
});

writeFileSync("db/seed.sql", lines.join("\n") + "\n");
console.log(`Wrote db/seed.sql: ${portfolioAreas.length} categories, ${products.length} products, ${heroSlides.length} slides`);
