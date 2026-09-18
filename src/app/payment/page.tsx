import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell } from "../info-shell";
import { CopyAccountButton } from "./copy-account-button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "4주 과정 결제 안내 | AI Together",
  description: "AI Together 4주 완성 과정의 참가비와 입금 방법을 안내합니다.",
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return (
    <InfoShell>
      <main className={styles.main} id="main-content">
        <section className={styles.card} aria-labelledby="payment-title">
          <p className={styles.kicker}>4주 완성 프로젝트</p>
          <h1 id="payment-title">AI로 실제 결과물<br />하나 완성하기</h1>
          <p className={styles.intro}>코딩을 몰라도 AI의 도움을 받아 기획부터 제작과 배포까지 직접 경험합니다.</p>

          <dl className={styles.summary}>
            <div><dt>교육 기간</dt><dd>4주 · 총 8시간</dd></div>
            <div><dt>일정</dt><dd>주 1회 · 2시간</dd></div>
            <div><dt>준비물</dt><dd>개인 노트북 · 충전기</dd></div>
            <div className={styles.fee}><dt>참가비</dt><dd>1인 80,000원</dd></div>
          </dl>

          <section className={styles.payment} aria-labelledby="bank-title">
            <div>
              <p>PAYMENT INFORMATION</p>
              <h2 id="bank-title">참가비 입금 안내</h2>
            </div>
            <div className={styles.bank}>
              <div><span>카카오뱅크</span><strong>3333-02-3341781</strong><small>예금주 최경수</small></div>
              <CopyAccountButton />
            </div>
            <ul>
              <li>입금자명은 신청자 이름과 같게 입력해주세요.</li>
              <li>입금 확인 후 참가 확정 안내를 보내드립니다.</li>
              <li>신청 정보가 확인되지 않으면 입금 확인이 늦어질 수 있습니다.</li>
            </ul>
          </section>

          <div className={styles.actions}>
            <Link href="/meetings?course=4%EC%A3%BC+%EC%99%84%EC%84%B1">4주 과정 확인하기</Link>
            <Link href="/contact">결제 관련 문의하기</Link>
          </div>
        </section>
      </main>
    </InfoShell>
  );
}
