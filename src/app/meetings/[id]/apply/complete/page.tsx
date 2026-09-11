import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "신청 완료 | AI 같이해요",
  robots: { index: false, follow: false },
};

export default async function ApplicationCompletePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = await getMeetingById(id);
  if (!meeting) notFound();

  return (
    <main className={styles.completeShell} id="main-content">
      <section className={styles.completeCard}>
        <span className={styles.completeIcon} aria-hidden="true">✓</span>
        <p className={styles.kicker}>APPLICATION COMPLETE</p>
        <h1>참가 신청이 완료됐어요!</h1>
        <p><strong>{meeting.title}</strong> 모임에 신청해주셔서 감사합니다.<br />확인 후 입력하신 이메일로 안내드릴게요.</p>
        <div className={styles.completeActions}><Link href={`/meetings/${meeting.id}`}>모임 다시 보기</Link><Link href="/meetings">다른 모임 둘러보기</Link></div>
      </section>
    </main>
  );
}
