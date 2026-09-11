import type { Metadata } from "next";
import Link from "next/link";
import { InfoShell } from "../info-shell";
import styles from "../info-page.module.css";

export const metadata: Metadata = { title: "문의·장소 안내 | AI 같이해요", description: "AI 같이해요 교육 장소와 문의 방법을 안내합니다." };

const daangnUrl = "https://www.daangn.com/kr/group/%EB%B6%80%EC%82%B0-%EC%82%AC%EC%A7%81%EB%8F%99-%EB%B0%94%EC%9D%B4%EB%B8%8C%EC%BD%94%EB%94%A9-%EB%AA%A8%EC%9E%84-vxbz4quk5ntg/";
const mapUrl = "https://map.kakao.com/link/search/%EB%B6%80%EC%82%B0%EA%B4%91%EC%97%AD%EC%8B%9C%20%EC%97%B0%EC%A0%9C%EA%B5%AC%20%EA%B5%90%EB%8C%80%EB%A1%9C24%EB%B2%88%EA%B8%B8%207";

export default function ContactPage() {
  return <InfoShell><main className={styles.main} id="main-content"><section className={styles.hero}><p>CONTACT & LOCATION</p><h1>궁금한 점은 편하게<br />물어보세요.</h1><p>참여 가능 일정과 준비물은 당근 모임에서 문의할 수 있습니다. 참가 신청은 원하는 모임의 상세 화면에서 진행해주세요.</p></section><section className={styles.section} aria-labelledby="contact-title"><p className={styles.sectionKicker}>INFORMATION</p><h2 id="contact-title">문의와 장소 안내</h2><div className={styles.contactGrid}><article className={styles.card}><span aria-hidden="true">💬</span><h3>당근 모임 문의</h3><p>남은 자리, 참여 가능한 일정과 준비물을 확인할 수 있습니다.</p><div className={styles.actions}><a className={styles.primary} href={daangnUrl} target="_blank" rel="noreferrer">당근 모임 열기 ↗</a><Link className={styles.secondary} href="/meetings">참가 신청하기</Link></div></article><article className={styles.card}><span aria-hidden="true">📍</span><h3>커피긱스 2층 8인룸</h3><address>부산광역시 연제구 교대로24번길 7<br />부산교육대학교 인근 · 건물 주차 가능</address><ul><li>수업용 빔프로젝터</li><li>Wi-Fi 현장 안내</li><li>개인 노트북과 충전기 지참</li></ul><div className={styles.actions}><a className={styles.secondary} href={mapUrl} target="_blank" rel="noreferrer">카카오맵 보기 ↗</a></div></article></div></section><section className={styles.section} aria-labelledby="faq-title"><p className={styles.sectionKicker}>FAQ</p><h2 id="faq-title">자주 묻는 질문</h2><div className={styles.faq}><details><summary>AI나 코딩을 몰라도 되나요?</summary><p>괜찮습니다. 초보자를 기준으로 진행하며 화면이 다를 때 함께 확인합니다.</p></details><details><summary>무엇을 가져가야 하나요?</summary><p>개인 노트북과 충전기를 준비해주세요. 영상 과정은 스마트폰이나 이어폰이 추가로 필요할 수 있습니다.</p></details><details><summary>주차할 수 있나요?</summary><p>건물 주차가 가능합니다. 당일 상세한 이용 방법은 현장에서 안내합니다.</p></details><details><summary>정확한 일정과 비용은 어디에서 확인하나요?</summary><p>모임별 날짜, 시간, 비용과 남은 자리는 모임 목록과 상세 화면에서 확인해주세요.</p></details></div></section></main></InfoShell>;
}
