import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell } from "../info-shell";
import SubpageHero from "../subpage-hero";
import styles from "../info-page.module.css";

export const metadata: Metadata = { title: "처음 오셨나요? | AI Together", description: "AI Together 모임의 참여 방법과 준비물을 안내합니다." };

const guides = [
  { icon: "🌱", title: "완전 초보도 괜찮아요", text: "코드를 외우는 수업이 아닙니다. 하고 싶은 일을 말로 설명하고 AI의 결과를 함께 확인합니다." },
  { icon: "🧑‍🤝‍🧑", title: "소규모로 진행해요", text: "최대 8명이 함께하며 막히는 화면을 가까이에서 보고 해결합니다." },
  { icon: "🛠️", title: "직접 만들어봐요", text: "설명만 듣지 않고 이미지, 영상, 홈페이지처럼 가져갈 수 있는 결과물을 만듭니다." },
  { icon: "☕", title: "편하게 질문하세요", text: "질문과 실습은 당일 모임 시간에 함께 진행합니다. 프로젝트 모임은 이전 진행 내용과 준비 사항을 사전에 확인해주세요." },
];

export default function GuidePage() {
  return <InfoShell><main className={styles.main} id="main-content"><SubpageHero eyebrow="FIRST VISIT" title={<>AI를 몰라도<br />함께 시작할 수 있어요.</>} description="AI Together는 어려운 기술을 배우기 전에, 관심 있는 것을 직접 만들어보는 소규모 실습 모임입니다." image="/images/subpages/guide-hero.png" imageAlt="강사와 함께 노트북으로 AI를 배우는 초보 참여자" /><section className={styles.section} aria-labelledby="guide-features"><p className={styles.sectionKicker}>WELCOME</p><h2 id="guide-features">이런 모임이에요</h2><div className={styles.grid}>{guides.map((guide) => <article className={styles.card} key={guide.title}><span aria-hidden="true">{guide.icon}</span><h3>{guide.title}</h3><p>{guide.text}</p></article>)}</div></section><section className={styles.section} aria-labelledby="join-steps"><p className={styles.sectionKicker}>HOW TO JOIN</p><h2 id="join-steps">참여 방법</h2><ol className={styles.steps}><li><strong>01 · 모임 고르기</strong><p>날짜, 주제, 준비물과 남은 자리를 확인합니다.</p></li><li><strong>02 · 신청하기</strong><p>이름과 이메일을 입력하고 참가 신청을 보냅니다.</p></li><li><strong>03 · 함께 만들기</strong><p>개인 노트북을 챙겨 안내된 장소와 시간에 참여합니다.</p></li></ol></section><section className={styles.notice}><h2>무엇을 준비하면 되나요?</h2><p>참가비는 회당 10,000원이며 음료는 각자 주문·결제합니다. 4주 일괄 등록 없이 날짜별로 1회씩 신청합니다. 개인 노트북과 충전기, 이메일 계정을 준비해주세요. 필요한 계정과 프로그램은 각 모임 상세 화면에서 다시 안내합니다.</p><div className={styles.actions}><Link className={styles.primary} href="/meetings">모임 둘러보기</Link><Link className={styles.secondary} href="/contact">장소·문의 확인하기</Link></div></section></main></InfoShell>;
}
