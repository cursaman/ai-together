import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin-auth";
import { LoginForm } from "./login-form";
import styles from "../admin.module.css";

export const metadata: Metadata = { title: "관리자 로그인 | AI 같이해요", robots: { index: false, follow: false } };

export default async function AdminLoginPage() {
  if (await hasAdminSession()) redirect("/admin/meetings");

  return (
    <main className={styles.loginShell} id="main-content">
      <section className={styles.loginCard}>
        <p className={styles.kicker}>AI TOGETHER ADMIN</p>
        <h1>관리자 로그인</h1>
        <p>모임을 등록하고 수정하려면 관리자 비밀번호를 입력해주세요.</p>
        <LoginForm />
        <Link className={styles.backLink} href="/">← 사이트로 돌아가기</Link>
      </section>
    </main>
  );
}
