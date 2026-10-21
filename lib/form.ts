import { execute, query } from "@/lib/db";
import { saveImageUpload, type SavedImage } from "@/lib/uploads";
import type { Spec } from "@/lib/types";

// Helpers for reading admin form submissions.

export const text = (form: FormData, name: string) => String(form.get(name) ?? "").trim();
export const optionalText = (form: FormData, name: string) => text(form, name) || null;
export const int = (form: FormData, name: string, fallback = 0) => {
  const value = Number.parseInt(text(form, name), 10);
  return Number.isFinite(value) ? value : fallback;
};
export const checked = (form: FormData, name: string) => form.get(name) === "on";

// One entry per line, blank lines dropped.
export const lines = (form: FormData, name: string) => text(form, name).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

// "Label | Value" per line.
export const specs = (form: FormData, name: string): Spec[] =>
  lines(form, name).map((line) => {
    const [label, ...rest] = line.split("|");
    return { label: label.trim(), value: rest.join("|").trim() };
  }).filter((spec) => spec.label && spec.value);

export const specsToText = (value: Spec[] | null | undefined) => (value ?? []).map((spec) => `${spec.label} | ${spec.value}`).join("\n");

export function validSlug(slug: string): string | null {
  if (!slug) return "Slug is required.";
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return "Slug may only contain lowercase letters, numbers and single hyphens (e.g. ca-125).";
  return null;
}

export function require(fields: Record<string, string>): string | null {
  const missing = Object.entries(fields).filter(([, value]) => !value).map(([label]) => label);
  return missing.length ? `Please fill in: ${missing.join(", ")}.` : null;
}

const isFile = (value: FormDataEntryValue | null): value is File => value instanceof File && value.size > 0;

// A site path we may record as a crop source: "/uploads/..." or a file shipped in /public.
const isLocalImagePath = (value: string) => /^\/[\w\-./]+\.(jpe?g|png|webp|gif|svg)$/i.test(value) && !value.includes("..");

/**
 * Reads an image field from <ImageField name="...">:
 *   `${name}_file`         the (cropped) image to use, when the admin chose or cropped one
 *   `${name}_source_file`  the uncropped original of a new upload
 *   `${name}_source`       path of the existing original that was re-cropped
 *   `${name}`              the current path, kept when nothing changed
 */
export async function imageInput(form: FormData, name: string): Promise<(SavedImage & { uploaded: boolean }) | { src: string; uploaded: false }> {
  const file = form.get(`${name}_file`);
  if (!isFile(file)) return { src: text(form, name), uploaded: false };

  const saved = await saveImageUpload(file);
  const original = form.get(`${name}_source_file`);
  const sourcePath = text(form, `${name}_source`);
  if (isFile(original)) await recordImageSource(saved.src, (await saveImageUpload(original)).src);
  else if (isLocalImagePath(sourcePath)) await recordImageSource(saved.src, sourcePath);
  return { ...saved, uploaded: true };
}

async function recordImageSource(path: string, source: string) {
  await execute("INSERT INTO image_sources (path, source) VALUES (?, ?) ON DUPLICATE KEY UPDATE source = VALUES(source)", [path, source]);
}

/** The uncropped original behind an image path (the path itself when it was never cropped). */
export async function imageSource(path: string | null | undefined): Promise<string | null> {
  if (!path) return null;
  const [row] = await query<{ source: string }>("SELECT source FROM image_sources WHERE path = ?", [path]);
  return row?.source ?? path;
}

export const isDuplicate = (error: unknown) => (error as { code?: string })?.code === "ER_DUP_ENTRY";
export const message = (error: unknown) => (error instanceof Error ? error.message : "Something went wrong.");
