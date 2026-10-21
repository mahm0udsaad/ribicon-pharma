"use server";

import { headers } from "next/headers";
import { execute } from "@/lib/db";

export type ContactState = { status: "idle" | "sent" | "error"; error?: "missing" | "email" | "rate" | "server" };

// Per-IP limit, kept in this server process (best-effort spam protection alongside the honeypot).
const recent = new Map<string, number[]>();
const LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000;

const field = (form: FormData, name: string, max: number) => String(form.get(name) ?? "").trim().slice(0, max);

export async function submitInquiry(_state: ContactState, form: FormData): Promise<ContactState> {
  // Bots fill the hidden "website" field; pretend success so they don't retry.
  if (field(form, "website", 200)) return { status: "sent" };

  const name = field(form, "name", 200);
  const email = field(form, "email", 254);
  const organization = field(form, "organization", 200);
  const subject = field(form, "subject", 200);
  const message = field(form, "message", 5000);
  const locale = form.get("locale") === "fr" ? "fr" : "en";

  if (!name || !email || !message) return { status: "error", error: "missing" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { status: "error", error: "email" };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const times = (recent.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  if (times.length >= LIMIT) return { status: "error", error: "rate" };
  recent.set(ip, [...times, now]);

  try {
    await execute(
      "INSERT INTO inquiries (locale, name, email, organization, subject, message) VALUES (?, ?, ?, ?, ?, ?)",
      [locale, name, email, organization, subject, message],
    );
  } catch (error) {
    console.error("Failed to save inquiry", error);
    return { status: "error", error: "server" };
  }
  return { status: "sent" };
}
