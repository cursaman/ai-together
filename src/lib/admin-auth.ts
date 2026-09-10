import "server-only";

import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "ait_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;

function getAdminSecrets() {
  const password = process.env.AIT_ADMIN_PASSWORD;
  const sessionSecret = process.env.AIT_ADMIN_SESSION_SECRET;

  if (!password || !sessionSecret || sessionSecret.length < 32) return null;
  return { password, sessionSecret };
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function sign(expiresAt: string, secret: string) {
  return createHmac("sha256", secret).update(expiresAt).digest("hex");
}

export function isAdminConfigured() {
  return Boolean(getAdminSecrets() && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function verifyAdminPassword(candidate: string) {
  const secrets = getAdminSecrets();
  if (!secrets) return false;
  return timingSafeEqual(digest(candidate), digest(secrets.password));
}

export async function createAdminSession() {
  const secrets = getAdminSecrets();
  if (!secrets) throw new Error("Admin authentication is not configured");

  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, `${expiresAt}.${sign(expiresAt, secrets.sessionSecret)}`, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: SESSION_SECONDS,
  });
}

export async function destroyAdminSession() {
  (await cookies()).delete(COOKIE_NAME);
}

export async function hasAdminSession() {
  const secrets = getAdminSecrets();
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!secrets || !value) return false;

  const [expiresAt, signature] = value.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;

  const expected = sign(expiresAt, secrets.sessionSecret);
  return signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function requireAdmin() {
  if (!(await hasAdminSession())) redirect("/admin/login");
}
