import type { ReactNode } from "react";
import { ImageCropField } from "@/components/admin/image-crop-field";
import { imageSource } from "@/lib/form";

// Plain form fields for admin forms (server-rendered; values come from the database row).
type Common = { name: string; label: string; hint?: string; required?: boolean };

export function TextField({ name, label, hint, required, defaultValue, type = "text" }: Common & { defaultValue?: string | number | null; type?: string }) {
  return (
    <label className="admin-field">
      <span>{label}{required ? " *" : ""}</span>
      <input type={type} name={name} defaultValue={defaultValue ?? ""} required={required} />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function TextArea({ name, label, hint, required, defaultValue, rows = 4 }: Common & { defaultValue?: string | null; rows?: number }) {
  return (
    <label className="admin-field">
      <span>{label}{required ? " *" : ""}</span>
      <textarea name={name} defaultValue={defaultValue ?? ""} required={required} rows={rows} />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

export function Checkbox({ name, label, defaultChecked }: { name: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="admin-check">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} />
      {label}
    </label>
  );
}

// Current image with Replace / Crop; the cropper starts from the uncropped original when there is one.
export async function ImageField({ name, label, current, hint, aspect }: { name: string; label: string; current?: string | null; hint?: string; aspect?: number }) {
  const source = await imageSource(current);
  // Keyed by the saved path so the field resets (clearing the pending upload) after a successful save.
  return <ImageCropField key={current ?? ""} name={name} label={label} current={current} source={source} hint={hint} aspect={aspect} />;
}

export function Bilingual({ en, fr }: { en: ReactNode; fr: ReactNode }) {
  return (
    <div className="admin-grid-2">
      <div className="admin-field"><p className="admin-lang">English</p>{en}</div>
      <div className="admin-field"><p className="admin-lang">Français</p>{fr}</div>
    </div>
  );
}
