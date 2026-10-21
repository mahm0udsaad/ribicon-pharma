import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Admin image uploads live in UPLOAD_DIR (outside the deployed app in production) and are
// served by app/uploads/[file]/route.ts. SVG is not accepted: it can carry scripts.
export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;

// Runtime-configured folder: tell the bundler not to trace it into the server output.
export const uploadDir = () => path.resolve(/*turbopackIgnore: true*/ process.env.UPLOAD_DIR || "./uploads");

export const uploadTypes: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

type Detected = { ext: keyof typeof uploadTypes; width: number; height: number };

// Identify the format from the file's bytes (not its name) and read its pixel size.
export function inspectImage(buf: Buffer): Detected | null {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { ext: "png", width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length > 10 && buf.toString("ascii", 0, 3) === "GIF") {
    return { ext: "gif", width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }
  if (buf.length > 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
    const chunk = buf.toString("ascii", 12, 16);
    if (chunk === "VP8 ") return { ext: "webp", width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = buf.readUInt32LE(21);
      return { ext: "webp", width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { ext: "webp", width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 };
    return null;
  }
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset + 9 < buf.length) {
      if (buf[offset] !== 0xff) { offset++; continue; }
      const marker = buf[offset + 1];
      const length = buf.readUInt16BE(offset + 2);
      // SOF0..SOF15 except DHT (C4), JPG (C8), DAC (CC) carry the frame size.
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { ext: "jpg", height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
    return { ext: "jpg", width: 0, height: 0 };
  }
  return null;
}

export type SavedImage = { src: string; width: number; height: number };

export async function saveImageUpload(file: File): Promise<SavedImage> {
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Image is larger than 8 MB.");
  const buf = Buffer.from(await file.arrayBuffer());
  const info = inspectImage(buf);
  if (!info) throw new Error("Upload a JPEG, PNG, WebP or GIF image.");
  const name = `${Date.now().toString(36)}-${randomBytes(6).toString("hex")}.${info.ext}`;
  await mkdir(uploadDir(), { recursive: true });
  await writeFile(path.join(/*turbopackIgnore: true*/ uploadDir(), name), buf);
  return { src: `/uploads/${name}`, width: info.width, height: info.height };
}
