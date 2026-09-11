import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell } from "../info-shell";
import styles from "../info-page.module.css";

export const metadata: Metadata = { title: "참여 후기 | AI 같이해요", description: "AI 같이해요 참여 후기를 소개합니다." };

export default function ReviewsPage() {
  return <InfoShell><main className={styles.main} id="main-content"><section className={styles.hero}><p>TOGETHER STORY</p><h1>함께 만든 이야기를<br />차곡차곡 기록할게요.</h1><p>실제 참여자의 동의를 받은 후기와 완성 결과물만 소개합니다.</p></section><section className={styles.section}><div className={styles.notice}><h2>첫 번째 후기를 기다리고 있어요</h2><p>아직 공개에 동의한 참여 후기가 등록되지 않았습니다. 모임이 진행된 뒤 닉네임 사용과 공개 범위를 확인하고 소중한 경험을 소개하겠습니다.</p><div className={styles.actions}><Link className={styles.primary} href="/meetings">첫 모임 참여하기</Link><Link className={styles.secondary} href="/guide">모임 방식 알아보기</Link></div></div></section><section className={styles.section} aria-labelledby="review-policy"><p className={styles.sectionKicker}>OUR PROMISE</p><h2 id="review-policy">후기는 이렇게 소개합니다</h2><div className={styles.grid}><article className={styles.card}><span aria-hidden="true">✓</span><h3>실제 후기만 사용</h3><p>참여하지 않은 사람의 후기나 만들어낸 후기를 게시하지 않습니다.</p></article><article className={styles.card}><span aria-hidden="true">🔒</span><h3>공개 동의 확인</h3><p>닉네임, 결과물 이미지와 후기 문구의 공개 범위를 먼저 확인합니다.</p></article></div></section></main></InfoShell>;
}
