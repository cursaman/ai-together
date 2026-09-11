import type { Metadata } from "next";
import { InfoShell } from "../info-shell";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "디자인·코딩 참고자료 | AI Together",
  description: "홈페이지 디자인, 코딩 문서와 아이콘을 찾을 때 활용할 수 있는 참고 사이트를 안내합니다.",
};

const groups = [
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
    <section className={styles.hero}><p>DESIGN &amp; CODE RESOURCES</p><h1>좋은 결과물을 만드는<br/>든든한 참고자료.</h1><p>홈페이지를 기획하고 제작할 때 활용할 수 있는 디자인, 코딩 문서와 아이콘 사이트를 모았습니다.</p></section>
    <section className={styles.section} aria-label="참고 사이트 목록">{groups.map((group)=><div className={styles.group} key={group.title}><div className={styles.groupHeading}><span aria-hidden="true">{group.icon}</span><div><h2>{group.title}</h2><p>{group.description}</p></div></div><div className={styles.grid}>{group.links.map((link)=><a href={link.url} target="_blank" rel="noreferrer" key={link.name}><div><strong>{link.name}</strong><p>{link.text}</p></div><span aria-hidden="true">↗</span></a>)}</div></div>)}</section>
    <aside className={styles.notice}><span aria-hidden="true">!</span><div><h2>사용 전에 확인해주세요</h2><p>사이트마다 무료·유료 범위와 출처 표시 조건이 다릅니다. 이미지와 아이콘을 내려받아 사용할 때는 해당 사이트의 라이선스를 먼저 확인해주세요.</p></div></aside>
  </main></InfoShell>;
}
