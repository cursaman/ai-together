import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell } from "../info-shell";
import { CopyAccountButton } from "./copy-account-button";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "모임 참가비 안내 | AI Together",
  description: "회당 10,000원 참가비와 음료 개별 결제, 입금 방법을 안내합니다.",
  robots: { index: false, follow: false },
};

export default function PaymentPage() {
  return (
    <InfoShell>
      <main className={styles.main} id="main-content">
        <section className={styles.card} aria-labelledby="payment-title">
          <p className={styles.kicker}>회차별 참여 안내</p>
          <h1 id="payment-title">AI로 실제 결과물<br />하나 완성하기</h1>
          <p className={styles.intro}>원하는 날짜의 모임을 1회씩 신청합니다. 주제 실습과 프로젝트 모임 모두 참가비는 회당 10,000원이며 음료는 각자 주문·결제합니다.</p>

          <dl className={styles.summary}>
            <div><dt>참여 방식</dt><dd>날짜별 1회 신청</dd></div>
            <div><dt>진행 시간</dt><dd>1회 2시간</dd></div>
            <div><dt>준비물</dt><dd>개인 노트북 · 충전기</dd></div>
            <div className={styles.fee}><dt>참가비</dt><dd>1인·1회 10,000원</dd></div>
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
              <li>음료값은 참가비에 포함되지 않으며 카페에 개별 결제합니다.</li><li>4회 참여 시 참가비 합계는 40,000원이며, 각 회차를 별도로 신청합니다.</li><li>입금자명은 신청자 이름과 같게 입력해주세요.</li>
              <li>입금 확인 후 참가 확정 안내를 보내드립니다.</li>
              <li>신청 정보가 확인되지 않으면 입금 확인이 늦어질 수 있습니다.</li>
            </ul>
          </section>

          <div className={styles.actions}>
            <Link href="/meetings">모임 일정 확인하기</Link>
            <Link href="/contact">결제 관련 문의하기</Link>
          </div>
        </section>
      </main>
    </InfoShell>
  );
}
