import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell } from "../info-shell";
import SubpageHero from "../subpage-hero";
import styles from "../info-page.module.css";

export const metadata: Metadata = { title: "처음 오셨나요? | AI Together", description: "내 가게의 블로그·홈페이지를 만드는 모임의 참여 방법과 사업 자료 준비를 안내합니다." };

const guides = [
  { icon: "🌱", title: "내 사업으로 시작해요", text: "소상공인·개인사업자가 내 가게의 소개 글, 블로그와 홈페이지를 직접 만드는 실습 모임입니다." },
  { icon: "🧑‍🤝‍🧑", title: "소규모로 진행해요", text: "최대 8명이 함께하며 막히는 화면을 가까이에서 보고 해결합니다." },
  { icon: "🛠️", title: "직접 운영해봐요", text: "서비스·가격·위치·문의 방법을 정리하고, 홍보 글과 홈페이지를 만든 뒤 직접 내용을 수정합니다." },
  { icon: "☕", title: "편하게 질문하세요", text: "질문과 실습은 당일 모임 시간에 함께 진행합니다. 프로젝트 모임은 이전 진행 내용과 준비 사항을 사전에 확인해주세요." },
];

export default function GuidePage() {
  return <InfoShell><main className={styles.main} id="main-content"><SubpageHero eyebrow="FIRST VISIT" title={<>내 가게 이야기로<br />홍보를 시작해요.</>} description="가게를 운영하거나 사업을 준비하는 분을 위한 실습 모임입니다. 블로그 글·상품 사진·홈페이지 중 내게 필요한 작업을 함께 진행합니다." image="/images/subpages/guide-hero.png" imageAlt="강사와 함께 노트북으로 AI를 배우는 초보 참여자" /><section className={styles.section} aria-labelledby="guide-features"><p className={styles.sectionKicker}>WELCOME</p><h2 id="guide-features">이런 모임이에요</h2><div className={styles.grid}>{guides.map((guide) => <article className={styles.card} key={guide.title}><span aria-hidden="true">{guide.icon}</span><h3>{guide.title}</h3><p>{guide.text}</p></article>)}</div></section><section className={styles.section} aria-labelledby="join-steps"><p className={styles.sectionKicker}>HOW TO JOIN</p><h2 id="join-steps">참여 방법</h2><ol className={styles.steps}><li><strong>01 · 모임 고르기</strong><p>내 가게에 필요한 작업과 날짜, 준비물과 남은 자리를 확인합니다.</p></li><li><strong>02 · 신청하기</strong><p>이름과 이메일을 입력하고 참가 신청을 보냅니다.</p></li><li><strong>03 · 함께 만들기</strong><p>노트북과 가게 소개·사진을 챙겨 안내된 장소와 시간에 참여합니다.</p></li></ol></section><section className={styles.notice}><h2>무엇을 준비하면 되나요?</h2><p>참가비는 회당 10,000원이며 음료는 각자 주문·결제합니다. 4주 일괄 등록 없이 날짜별로 1회씩 신청합니다. 개인 노트북과 충전기, 이메일 계정을 준비해주세요. 가게 이름, 소개 문구, 상품·서비스 사진, 가격, 위치와 문의 방법을 정리해오면 실습에 도움이 됩니다. 계정 비밀번호는 공유하지 않고 본인이 직접 입력합니다. 필요한 계정과 프로그램은 각 모임 상세 화면에서 다시 안내합니다.</p><div className={styles.actions}><Link className={styles.primary} href="/meetings">모임 둘러보기</Link><Link className={styles.secondary} href="/contact">장소·문의 확인하기</Link></div></section></main></InfoShell>;
}
