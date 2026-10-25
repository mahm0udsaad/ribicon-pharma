"use client";

import { useEffect, useRef, useState } from "react";
import ReactCrop, { centerCrop, makeAspectCrop, type PercentCrop } from "react-image-crop";

// Image picker + cropper for admin forms. The server reads these inputs in lib/form.ts imageInput():
//   `${name}`              current image path (kept when nothing changes)
//   `${name}_file`         the cropped image to save
//   `${name}_source_file`  the original of a new upload (so it can be re-cropped later)
//   `${name}_source`       path of the existing original being re-cropped

type Props = {
  name: string;
  label: string;
  current?: string | null;
  /** Uncropped original of `current`, for re-cropping without quality loss. */
  source?: string | null;
  /** Recommended crop shape (width / height) for where the image appears. The admin can still pick another shape or crop freely. */
  aspect?: number;
  hint?: string;
};

type Shape = number | "free" | "original";
type Area = { x: number; y: number; width: number; height: number };

const PRESETS: { label: string; value: Shape }[] = [
  { label: "Free", value: "free" },
  { label: "Original", value: "original" },
  { label: "Square", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:2", value: 3 / 2 },
  { label: "16:9", value: 16 / 9 },
  { label: "3:4", value: 3 / 4 },
];

const MAX_SIDE = 2400;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load the image."));
    image.src = src;
  });
}

async function cropToFile(src: string, area: Area, type: string, baseName: string): Promise<File> {
  const image = await loadImage(src);
  const scale = Math.min(1, MAX_SIDE / Math.max(area.width, area.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(area.width * scale);
  canvas.height = Math.round(area.height * scale);
  const context = canvas.getContext("2d")!;
  if (type === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.imageSmoothingQuality = "high";
  context.drawImage(image, area.x, area.y, area.width, area.height, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("Could not crop the image."))), type, 0.9),
  );
  return new File([blob], `${baseName}.${type === "image/png" ? "png" : "jpg"}`, { type });
}

function setFileInput(input: HTMLInputElement | null, file: File | null) {
  if (!input) return;
  const transfer = new DataTransfer();
  if (file) transfer.items.add(file);
  input.files = transfer.files;
}

export function ImageCropField({ name, label, current, source, aspect, hint }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const sourceFileRef = useRef<HTMLInputElement>(null);
  const pickerRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(current ?? null);
  const [changed, setChanged] = useState(false);
  const [sourcePath, setSourcePath] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Cropper dialog state.
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropType, setCropType] = useState("image/jpeg");
  const [pendingOriginal, setPendingOriginal] = useState<File | null>(null);
  const [crop, setCrop] = useState<PercentCrop>();
  const [shape, setShape] = useState<Shape>(aspect ?? "free");
  const [natural, setNatural] = useState<{ width: number; height: number } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => () => { if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview); }, [preview]);

  useEffect(() => {
    if (!cropSrc) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setCropSrc(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [cropSrc]);

  const openCropper = (src: string, type: string, original: File | null) => {
    setError(null);
    setCropSrc(src);
    setCropType(type === "image/png" ? "image/png" : "image/jpeg");
    setPendingOriginal(original);
    setCrop(undefined);
    setNatural(null);
    setShape(aspect ?? "free");
  };

  const ratioFor = (value: Shape, size = natural) =>
    value === "free" ? undefined : value === "original" ? (size ? size.width / size.height : undefined) : value;

  // A centred selection covering as much of the image as the shape allows.
  const initialCrop = (value: Shape, size: { width: number; height: number }): PercentCrop => {
    const ratio = ratioFor(value, size);
    if (!ratio) return { unit: "%", x: 5, y: 5, width: 90, height: 90 };
    return centerCrop(makeAspectCrop({ unit: "%", width: 100 }, ratio, size.width, size.height), size.width, size.height);
  };

  const chooseShape = (value: Shape) => {
    setShape(value);
    if (natural) setCrop(initialCrop(value, natural));
  };

  const onPick = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) return setError("Choose a JPEG, PNG, WebP or GIF image.");
    if (file.size > 8 * 1024 * 1024) return setError("That image is larger than 8 MB.");
    openCropper(URL.createObjectURL(file), file.type, file);
  };

  const recropCurrent = () => {
    const src = source || current;
    if (!src) return;
    openCropper(src, /\.png$/i.test(src) ? "image/png" : "image/jpeg", null);
  };

  // The selection in the image's real pixels.
  const area: Area | null = crop && natural && crop.width > 0 && crop.height > 0
    ? { x: (crop.x / 100) * natural.width, y: (crop.y / 100) * natural.height, width: (crop.width / 100) * natural.width, height: (crop.height / 100) * natural.height }
    : null;

  const apply = async () => {
    if (!cropSrc || !area) return;
    setBusy(true);
    try {
      const file = await cropToFile(cropSrc, area, cropType, name.replace(/\W+/g, "-"));
      setFileInput(fileRef.current, file);
      if (pendingOriginal) {
        setFileInput(sourceFileRef.current, pendingOriginal);
        setSourcePath("");
      } else {
        setFileInput(sourceFileRef.current, null);
        setSourcePath(source || current || "");
      }
      setPreview(URL.createObjectURL(file));
      setChanged(true);
      setCropSrc(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not crop the image.");
    } finally {
      setBusy(false);
    }
  };

  const undo = () => {
    setFileInput(fileRef.current, null);
    setFileInput(sourceFileRef.current, null);
    setSourcePath("");
    setPreview(current ?? null);
    setChanged(false);
  };


  return (
    <div className="admin-field">
      <span>{label}</span>
      <div className={`image-field${aspect ? "" : " is-free"}`}>
        <div className="image-field-preview" style={aspect ? { aspectRatio: String(aspect) } : undefined}>
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" />
          ) : (
            <span className="image-field-empty">No image yet</span>
          )}
          {changed ? <span className="image-field-badge">Not saved yet</span> : null}
        </div>
        <div className="image-field-actions">
          <button type="button" className="admin-btn-secondary" onClick={() => pickerRef.current?.click()}>
            <Icon path="M12 16V4m0 0-4 4m4-4 4 4M4 20h16" /> {preview ? "Replace" : "Upload"}
          </button>
          {preview && !changed ? (
            <button type="button" className="admin-btn-secondary" onClick={recropCurrent}>
              <Icon path="M6 2v14a2 2 0 0 0 2 2h14M18 22V8a2 2 0 0 0-2-2H2" /> Crop
            </button>
          ) : null}
          {changed ? <button type="button" className="admin-btn-ghost" onClick={undo}>Undo</button> : null}
          {aspect ? <small className="admin-muted">Recommended shape: {aspectLabel(aspect)} — you can also crop freely.</small> : null}
        </div>
      </div>
      {hint ? <small>{hint}</small> : null}
      {error ? <small className="admin-error">{error}</small> : null}

      <input ref={pickerRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={onPick} />
      <input ref={fileRef} type="file" name={`${name}_file`} hidden tabIndex={-1} />
      <input ref={sourceFileRef} type="file" name={`${name}_source_file`} hidden tabIndex={-1} />
      <input type="hidden" name={`${name}_source`} value={sourcePath} />
      <input type="hidden" name={name} value={current ?? ""} />

      {cropSrc ? (
        <div className="crop-dialog" role="dialog" aria-modal="true" aria-label={`Crop ${label}`}>
          <div className="crop-panel">
            <header className="crop-header">
              <div>
                <strong>Crop image</strong>
                <span className="admin-muted">Drag the box to move it · drag its edges or corners to resize</span>
              </div>
              <button type="button" className="admin-icon-btn" aria-label="Close" onClick={() => setCropSrc(null)}>×</button>
            </header>
            <div className="crop-stage">
              <ReactCrop
                crop={crop}
                aspect={ratioFor(shape)}
                keepSelection
                ruleOfThirds
                minWidth={20}
                minHeight={20}
                onChange={(_, percent) => setCrop(percent)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cropSrc}
                  alt=""
                  onLoad={(event) => {
                    const { naturalWidth: width, naturalHeight: height } = event.currentTarget;
                    setNatural({ width, height });
                    setCrop(initialCrop(shape, { width, height }));
                  }}
                />
              </ReactCrop>
            </div>
            <footer className="crop-footer">
              <div className="crop-shapes" role="group" aria-label="Shape">
                {aspect ? (
                  <button type="button" className={shape === aspect ? "is-active" : undefined} onClick={() => chooseShape(aspect)}>
                    Recommended
                  </button>
                ) : null}
                {PRESETS.map((preset) => (
                  <button type="button" key={preset.label} className={shape === preset.value ? "is-active" : undefined} onClick={() => chooseShape(preset.value)}>
                    {preset.label}
                  </button>
                ))}
              </div>
              {area ? <span className="crop-size admin-muted">{Math.round(area.width)} × {Math.round(area.height)} px</span> : null}
              <div className="crop-buttons">
                <button type="button" className="admin-btn-secondary" onClick={() => setCropSrc(null)}>Cancel</button>
                <button type="button" className="admin-btn" onClick={apply} disabled={busy || !area}>{busy ? "Cropping…" : "Use this crop"}</button>
              </div>
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function aspectLabel(value: number) {
  const known: Record<string, string> = { "2.50": "wide banner (5:2)", "3.00": "wide banner (3:1)", "1.50": "landscape (3:2)", "0.80": "portrait (4:5)", "1.25": "landscape (5:4)", "1.00": "square" };
  return known[value.toFixed(2)] ?? `${value.toFixed(2)}:1`;
}

function Icon({ path }: { path: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}
