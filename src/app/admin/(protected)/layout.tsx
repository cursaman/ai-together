import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { logoutAdmin } from "../actions";
import styles from "../admin.module.css";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  return (
    <div className={styles.adminShell}>
      <header className={styles.adminHeader}>
        <Link className={styles.adminBrand} href="/admin/meetings">AI 같이해요 <span>관리자</span></Link>
        <nav aria-label="관리자 메뉴"><Link href="/admin/meetings">모임 관리</Link><Link href="/">사이트 보기</Link><form action={logoutAdmin}><button type="submit">로그아웃</button></form></nav>
      </header>
      {children}
    </div>
  );
}
