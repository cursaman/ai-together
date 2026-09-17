import type { Metadata } from "next";
import { InfoShell } from "../info-shell";
import SubpageHero from "../subpage-hero";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "디자인·코딩 참고자료 | AI Together",
  description: "홈페이지 디자인, 코딩 문서와 아이콘을 찾을 때 활용할 수 있는 참고 사이트를 안내합니다.",
};

const groups = [
  { title:"AI·홈페이지 학습", description:"수업 전 기초학습부터 홈페이지 제작과 데이터베이스 실습까지 이어서 배워보세요.", icon:"AI", links:[
    {name:"AI 기초학습",url:"https://aiterminology-rho.vercel.app/",text:"AI 용어와 핵심 개념부터 첫 프로젝트 설계까지 단계별 학습"},
    {name:"4주 홈페이지 과정",url:"https://autosites-jd3d.vercel.app/",text:"홈페이지 4주 완성 과정과 수업 장소 안내"},
    {name:"홈페이지 제작 실습",url:"https://homepages-rosy.vercel.app/",text:"기획부터 제작·배포까지 따라 하는 홈페이지 실습"},
    {name:"AI 개발 가이드",url:"https://what-to-ai.vercel.app/",text:"AI를 활용한 개발 과정과 작업 방법 안내"},
    {name:"DB·회원가입 실습",url:"https://what-to-db.vercel.app/",text:"데이터베이스와 회원가입 기능을 연결하는 실습"},
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
    <SubpageHero eyebrow="LEARNING & CREATION RESOURCES" title={<>배우고 만드는 데 필요한<br />든든한 참고자료.</>} description="AI 기초학습부터 홈페이지 제작, 디자인, 코딩 문서와 아이콘 사이트까지 한곳에 모았습니다." image="/images/subpages/resources-hero.png" imageAlt="AI와 웹 제작 참고자료가 정돈된 창작 작업 책상" />
    <section className={styles.section} aria-label="참고 사이트 목록">{groups.map((group)=><div className={styles.group} key={group.title}><div className={styles.groupHeading}><span aria-hidden="true">{group.icon}</span><div><h2>{group.title}</h2><p>{group.description}</p></div></div><div className={styles.grid}>{group.links.map((link)=><a href={link.url} target="_blank" rel="noreferrer" key={link.name}><div><strong>{link.name}</strong><p>{link.text}</p></div><span aria-hidden="true">↗</span></a>)}</div></div>)}</section>
    <aside className={styles.notice}><span aria-hidden="true">!</span><div><h2>사용 전에 확인해주세요</h2><p>사이트마다 무료·유료 범위와 출처 표시 조건이 다릅니다. 이미지와 아이콘을 내려받아 사용할 때는 해당 사이트의 라이선스를 먼저 확인해주세요.</p></div></aside>
  </main></InfoShell>;
}
