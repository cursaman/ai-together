import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings";
import { ApplicationForm } from "./application-form";
import { submitApplication } from "./actions";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "참가 신청 | AI Together",
  description: "AI Together 모임에 참가 신청합니다.",
};

export default async function ApplyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const meeting = await getMeetingById(id);
  if (!meeting) notFound();

  const action = submitApplication.bind(null, meeting.id);
  const unavailable = meeting.status === "모집 예정" || meeting.applicants >= meeting.capacity;


  return (
    <main className={styles.shell} id="main-content">
      <Link className={styles.back} href={`/meetings/${meeting.id}`}>← 모임 상세로 돌아가기</Link>
      <div className={styles.layout}>
        <section className={styles.intro}>
          <p className={styles.kicker}>JOIN TOGETHER</p>
          <h1>참가 신청</h1>
          <p>복잡하지 않아요.<br />내 가게에 필요한 홍보 작업을 알려주세요. 표시된 날짜의 1회 참여를 신청합니다. 다음 회차는 별도로 신청해주세요.</p>
          <article className={styles.meetingCard}>
            <span aria-hidden="true">{meeting.icon}</span>
            <div><small>{meeting.category} · {meeting.status}</small><h2>{meeting.title}</h2><p>{meeting.date} · {meeting.time}<br />{meeting.location}</p></div>
          </article>
          <ul><li>1회 참가비 {meeting.fee} · 음료 개별 결제</li><li>준비물: {meeting.supplies}</li><li>현재 {meeting.applicants}명 신청 · 정원 {meeting.capacity}명</li></ul>
          <Link className={styles.paymentLink} href="/payment">회당 참가비·입금 안내 확인하기 →</Link>
        </section>
        <section className={styles.formCard} aria-labelledby="form-title">
          <div className={styles.formHeading}><p className={styles.kicker}>APPLICATION</p><h2 id="form-title">신청자 정보</h2><p><span>*</span> 표시는 필수 항목이에요.</p></div>
          {unavailable ? (
            <div className={styles.unavailable}><strong>{meeting.status === "모집 예정" ? "아직 모집 전이에요" : "신청이 마감됐어요"}</strong><p>다른 모임도 함께 둘러보세요.</p><Link href="/meetings">모임 목록 보기 →</Link></div>
          ) : (
            <ApplicationForm action={action} />
          )}
        </section>
      </div>
    </main>
  );
}
