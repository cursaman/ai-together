"use server";

import { redirect } from "next/navigation";
import { createAdminSession, isAdminConfigured, verifyAdminPassword } from "@/lib/admin-auth";

export type LoginState = { message?: string };

export async function loginAdmin(_state: LoginState, formData: FormData): Promise<LoginState> {
  if (!isAdminConfigured()) return { message: "관리자 환경변수 설정이 필요합니다." };

  const password = formData.get("password");
  if (typeof password !== "string" || !verifyAdminPassword(password)) {
    return { message: "비밀번호가 올바르지 않습니다." };
  }

  await createAdminSession();
  redirect("/admin/meetings");
}
