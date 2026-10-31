import type { Metadata } from "next";
import { InfoShell } from "../info-shell";
import SubpageHero from "../subpage-hero";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "가게 홍보·홈페이지 참고자료 | AI Together",
  description: "가게 소개, 블로그 글과 홈페이지를 직접 만드는 데 필요한 학습·디자인 자료를 안내합니다.",
};

const groups = [
  { title:"내 가게 홈페이지 학습", description:"가게 소개·서비스·위치·문의 정보를 정리하고 홈페이지를 만들 때 참고하세요.", icon:"AI", links:[
    {name:"AI 기초학습",url:"https://aiterminology-rho.vercel.app/",text:"AI 용어와 핵심 개념부터 첫 프로젝트 설계까지 단계별 학습"},
    {name:"홈페이지 학습자료",url:"https://autosites-jd3d.vercel.app/",text:"홈페이지 제작을 위한 단계별 참고자료 · 모임 신청과 별도"},
    {name:"홈페이지 제작 실습",url:"https://homepages-rosy.vercel.app/",text:"기획부터 제작·배포까지 따라 하는 홈페이지 실습"},
    {name:"AI 개발 가이드",url:"https://what-to-ai.vercel.app/",text:"AI를 활용한 개발 과정과 작업 방법 안내"},
    {name:"DB·회원가입 실습",url:"https://what-to-db.vercel.app/",text:"데이터베이스와 회원가입 기능을 연결하는 실습"},
  ]},
  { title:"화면 점검에 유용한 도구", description:"디자인 분석부터 화면 기록까지 필요한 작업에 맞춰 선택하는 도구입니다.", icon:"＋", links:[
    {name:"GoFullPage",url:"https://chromewebstore.google.com/detail/gofullpage-full-page-scre/fdpohaocaechififmbbbbbknoalclacl",text:"긴 웹페이지 전체를 한 장의 이미지나 PDF로 저장"},
    {name:"ColorZilla",url:"https://chromewebstore.google.com/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp",text:"웹페이지에서 원하는 색상을 선택해 색상 코드 확인"},
    {name:"WhatFont",url:"https://chromewebstore.google.com/detail/whatfont/jabopobgcpjmedljpbcaablpmlmfcogm",text:"마우스를 올려 웹사이트에 사용된 글꼴과 스타일 확인"},
    {name:"VisBug",url:"https://chromewebstore.google.com/detail/visbug/cdockenadnadldjbbgcallicgledbeoc",text:"화면에서 글자·간격·정렬을 직접 바꾸며 디자인 실험"},
    {name:"Responsive Viewer",url:"https://chromewebstore.google.com/detail/responsive-viewer/inmopeiepgfljkpkidclfgbgbmfcennb",text:"홈페이지를 모바일·태블릿·PC 화면 크기로 동시에 확인"},
    {name:"Loom",url:"https://chromewebstore.google.com/detail/loom-screen-recorder-sc/liecbddmkiiihnedobmlmillhodjkdmb",text:"화면과 음성을 녹화해 홈페이지 시연 영상 제작"},
  ]},
  { title:"디자인 참고 사이트", description:"웹사이트의 색상, 구성과 표현 방법을 찾아보세요.", icon:"✦", links:[
    {name:"Behance",url:"https://www.behance.net/",text:"세계 디자이너들의 웹·그래픽 프로젝트"},
    {name:"디비컷",url:"https://www.dbcut.com/bbs/index.php",text:"국내 웹사이트 디자인 사례"},
    {name:"GDWEB",url:"https://www.gdweb.co.kr/main/",text:"국내 우수 웹·모바일 디자인"},
    {name:"Awwwards",url:"https://www.awwwards.com/",text:"해외의 창의적인 웹 디자인과 인터랙션"},
    {name:"Pinterest",url:"https://www.pinterest.co.kr/",text:"색상·레이아웃·로고 아이디어 수집"},
  ]},
  { title:"웹 개발 문서", description:"HTML, CSS와 JavaScript의 정확한 사용법을 확인하세요.", icon:"</>", links:[
    {name:"MDN Web Docs",url:"https://developer.mozilla.org/ko/",text:"웹 표준 문서와 상세한 사용 예제"},
    {name:"W3Schools",url:"https://www.w3schools.com/",text:"웹 언어별 기본 문법과 실습 예제"},
    {name:"Can I use?",url:"https://caniuse.com/",text:"기능별 브라우저 지원 여부 확인"},
    {name:"Google Style Guides",url:"https://google.github.io/styleguide/",text:"언어별 코드 작성 규칙과 권장 방식"},
    {name:"jQuery",url:"https://jquery.com/",text:"jQuery 공식 문서와 다운로드"},
    {name:"cdnjs",url:"https://cdnjs.com/",text:"JavaScript·CSS 라이브러리 CDN 검색"},
  ]},
  { title:"아이콘 참고 사이트", description:"홈페이지에 어울리는 아이콘을 검색해보세요.", icon:"◎", links:[
    {name:"Font Awesome",url:"https://fontawesome.com/",text:"웹과 앱에서 사용하는 범용 아이콘"},
    {name:"Flaticon",url:"https://www.flaticon.com/",text:"다양한 스타일의 아이콘과 아이콘 묶음"},
    {name:"Iconmonstr",url:"https://iconmonstr.com/",text:"단순하고 깔끔한 무료 아이콘"},
    {name:"Iconfinder",url:"https://www.iconfinder.com/search?q=sns",text:"SNS를 포함한 주제별 아이콘 검색"},
  ]},
];

export default function ResourcesPage() {
  return <InfoShell><main className={styles.main} id="main-content">
    <SubpageHero eyebrow="LEARNING & CREATION RESOURCES" title={<>가게 홍보를 직접 만드는<br />든든한 참고자료.</>} description="블로그 글과 가게 소개를 준비하고 홈페이지를 제작·수정할 때 참고할 자료를 모았습니다. 필요한 도구부터 선택해 활용하세요." image="/images/subpages/resources-hero.png" imageAlt="AI와 웹 제작 참고자료가 정돈된 창작 작업 책상" />
    <section className={styles.section} aria-labelledby="business-preparation"><h2 id="business-preparation">도구를 열기 전에, 내 가게부터 정리해요</h2><div className={styles.notice}><h3>실습에 가져올 자료</h3><ol><li>가게 이름과 업종, 주로 찾아오는 고객</li><li>대표 상품·서비스, 실제 가격과 자주 받는 질문</li><li>직접 사용 가능한 가게·상품 사진과 소개 사례</li><li>영업시간, 위치, 문의 방법과 기존 블로그·홈페이지 주소</li></ol><p>AI가 쓴 내용은 실제 정보와 비교해 수정합니다. 도구의 유료 요금·도메인 비용은 사용 전에 확인하며 계정 비밀번호는 공유하지 않습니다.</p></div></section>
    <section className={styles.section} aria-label="참고 사이트 목록">{groups.map((group)=><div className={styles.group} key={group.title}><div className={styles.groupHeading}><span aria-hidden="true">{group.icon}</span><div><h2>{group.title}</h2><p>{group.description}</p></div></div><div className={styles.grid}>{group.links.map((link)=><a href={link.url} target="_blank" rel="noreferrer" key={link.name}><div><strong>{link.name}</strong><p>{link.text}</p></div><span aria-hidden="true">↗</span></a>)}</div></div>)}</section>
    <aside className={styles.notice}><span aria-hidden="true">!</span><div><h2>사용 전에 확인해주세요</h2><p>사이트마다 무료·유료 범위와 출처 표시 조건이 다릅니다. 이미지와 아이콘을 내려받아 사용할 때는 해당 사이트의 라이선스를 먼저 확인해주세요.</p></div></aside>
  </main></InfoShell>;
}
