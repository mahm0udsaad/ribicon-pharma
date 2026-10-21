"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { endSession, startSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/password";
import type { FormState } from "@/components/admin/form";

// Best-effort brute-force protection: per-IP failure count, kept in this server process.
const failures = new Map<string, { count: number; until: number }>();
const MAX_FAILURES = 5;
const LOCK_MS = 15 * 60 * 1000;

export async function login(_state: FormState, formData: FormData): Promise<FormState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const record = failures.get(ip);
  if (record && record.count >= MAX_FAILURES && record.until > Date.now()) {
    return { error: "Too many attempts. Try again in 15 minutes." };
  }

  const stored = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (!stored) {
    console.error("ADMIN_PASSWORD_HASH is not set");
    return { error: "Admin sign-in is not configured on the server (ADMIN_PASSWORD_HASH is missing)." };
  }

  // Copying the password from a file often brings a trailing space or line break.
  const password = String(formData.get("password") ?? "").trim();
  if (!verifyPassword(password, stored)) {
    const count = record && record.until > Date.now() ? record.count + 1 : 1;
    failures.set(ip, { count, until: Date.now() + LOCK_MS });
    return { error: "Incorrect password." };
  }

  failures.delete(ip);
  await startSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}
