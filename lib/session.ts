import { createHmac, timingSafeEqual } from "node:crypto";

// Signed, stateless admin session token: "<expiresAtMs>.<hmac>". Shared by proxy.ts and lib/auth.ts.
export const SESSION_COOKIE = "ribicon_admin";
export const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function secret(): string {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("SESSION_SECRET must be set (32+ characters)");
  return value;
}

const sign = (payload: string) => createHmac("sha256", secret()).update(payload).digest("hex");

export function createSessionToken(now = Date.now()): string {
  const expires = String(now + SESSION_TTL_MS);
  return `${expires}.${sign(expires)}`;
}

export function isValidSessionToken(token: string | undefined, now = Date.now()): boolean {
  if (!token) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature || Number(expires) < now) return false;
  const expected = Buffer.from(sign(expires), "hex");
  const given = Buffer.from(signature, "hex");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
