import { daangnUrl, lessonSchedule } from "@/lib/lesson-info";
import Image from "next/image";
import Link from "next/link";
import HeroSwiper from "./hero-swiper";
import ResourceBar from "./resource-bar";
import SiteHeader from "./site-header";
import { getPublishedReviews } from "@/lib/reviews";

const steps = [
  { number: "01", title: "배울 내용 고르기", text: "블로그·사진·홈페이지 중 필요한 작업을 골라요." },
  { number: "02", title: "당근에서 신청", text: "원하는 날짜와 시간을 당근 모임에서 확인하고 신청해요." },
  { number: "03", title: "직접 완성", text: "가게 소개와 사진을 가져와 블로그 글과 홈페이지를 만들어요." },
];

const firstCohortProjects = [
  { title: "가위닥터 사사끼", category: "가위 연마·수리", mark: "가위닥터", theme: "craft", description: "미용·애견 가위 연마와 수리 서비스, 택배 접수 방법을 소개하는 홈페이지입니다.", href: "https://groompick-kappa.vercel.app/" },
  { title: "바른골프피팅센터 동래점", category: "골프 피팅", mark: "BARUN", theme: "golf", description: "클럽 피팅·수리·그립 교체 서비스와 센터 위치, 상담 정보를 안내하는 홈페이지입니다.", href: "https://barun-fitting-dongnae.vercel.app/" },
  { title: "인지아이앤에스", category: "제조 디지털 혁신", mark: "I&S", theme: "industry", description: "디지털 트윈, 스마트팩토리, 산업 IoT 등 제조 디지털 혁신 사업을 소개하는 기업 홈페이지입니다.", href: "https://ingins-5b3f.vercel.app/" },
];

const secondCohortProjects = [
  {
    title: "한국안전교육",
    category: "안전교육",
    mark: "한국안전교육",
    theme: "industry",
    description: "양산 건설업 기초안전보건교육 일정과 준비물을 안내합니다.",
    href: "https://korea-safety-web.vercel.app/",
  },
  {
    title: "돌봄 준비 안내서",
    category: "돌봄·요양",
    mark: "돌봄 안내",
    theme: "golf",
    description: "방문요양센터 개설 기준과 요양보호사 자격증 취득 절차를 안내합니다.",
    href: "https://dolbom-guide.vercel.app/",
  },
  {
    title: "PC픽",
    category: "PC 사양·가격 비교",
    mark: "PC픽",
    theme: "craft",
    description: "FHD, QHD, 4K 게이밍 PC의 사양과 국내 판매가를 비교할 수 있습니다.",
    href: "https://pcpik.vercel.app/",
  },
];

const cohorts = [
  {
    id: "cohort-title",
    label: "1기 작품",
    eyebrow: "FIRST COHORT PROJECTS",
    title: "1기 참여자가 직접 만든 작품",
    description: "가위 수리점, 골프 피팅센터, 기업 소개까지. 참여자가 자신의 사업을 소개하기 위해 직접 제작하고 공개한 홈페이지입니다.",
    projects: firstCohortProjects,
  },
  {
    id: "second-cohort-title",
    label: "2기 작품",
    eyebrow: "SECOND COHORT PROJECTS",
    title: "2기 참여자가 직접 만든 작품",
    description: "안전교육, 돌봄 준비, 게이밍 PC 비교를 주제로 참여자가 만든 사이트입니다.",
    projects: secondCohortProjects,
  },
  {
    id: "third-cohort-title",
    label: "3기 작품",
    eyebrow: "THIRD COHORT PROJECTS",
    title: "3기 참여자가 직접 만든 작품",
    description: "홈페이지를 제작하고 Vercel에 자체 도메인을 연결한 뒤, 구글·네이버 검색엔진 등록까지 진행했습니다.",
    projects: [
      {
        title: "유진코트",
        category: "기업 홈페이지",
        mark: "유진코트",
        theme: "industry",
        description: "자체 도메인으로 공개한 유진코트 홈페이지입니다.",
        href: "https://www.yujincoat.com/",
      },
    ],
  },
];

const showcases = [
  { number:"01",title:"오늘 뭐 빌리지?",type:"BOOK RECOMMENDATION",description:"기분과 읽을 시간을 고르면 가까운 도서관에서 빌릴 책을 추천해요.",href:"https://what-to-borrow.vercel.app/",image:"/images/showcase/what-to-borrow.png" },
  { number:"02",title:"오늘 뭐하지?",type:"ACTIVITY PLANNER",description:"날씨·시간·지역·취향에 맞는 오늘의 활동과 일정을 추천해요.",href:"https://today-what-pi.vercel.app/",image:"/images/showcase/today-what.png" },
  { number:"03",title:"TECHCARE",type:"TECH SUPPORT",description:"복합기 오류를 검색해 원인과 현장 해결 방법을 안내해요.",href:"https://tech-seven-gamma.vercel.app/",image:"/images/showcase/techcare.png" },
  { number:"04",title:"EDU 웹개발",type:"EDUCATION",description:"웹 기초부터 React와 실제 배포까지 단계별로 배울 수 있어요.",href:"https://edu-two-indol.vercel.app/",image:"/images/showcase/edu-web.png" },
  { number:"05",title:"무비픽",type:"MOVIE API",description:"인기 영화를 탐색하고 취향에 맞는 작품을 검색·보관해요.",href:"https://movie-delta-liard.vercel.app/",image:"/images/showcase/movie-pick.png" },
  { number:"06",title:"Trippik",type:"TRAVEL API",description:"날씨·관광정보·지도를 활용해 부산 여행 일정을 만들어요.",href:"https://cursaman.github.io/trippik/",image:"/images/showcase/trippik.png" },
  { number:"07",title:"AI Together",type:"AI WORKSHOP",description:"AI 수업을 살펴보고 원하는 모임에 바로 참가 신청해요.",href:"https://ai-together-mu.vercel.app/",image:"/images/showcase/ai-together.png" },
  { number:"08",title:"AX START",type:"AI LEARNING",description:"AI 핵심 용어를 익히고 첫 프로젝트 문서를 완성해요.",href:"https://aiterminology-rho.vercel.app/",image:"/images/showcase/ai-terminology.png" },
  { number:"09",title:"what-to-AI",type:"DEVELOPMENT GUIDE",description:"아이디어부터 기능 연결과 배포까지 8단계로 따라가요.",href:"https://what-to-ai.vercel.app/",image:"/images/showcase/what-to-ai.png" },
  {
    number: "10",
    title: "AutoSites",
    type: "홈페이지 제작 교육",
    description: "AI로 홈페이지를 만들고 GitHub와 Vercel로 공개하는 과정을 배워요.",
    href: "https://ai-edu-steel.vercel.app/",
    image: "/images/showcase/ai-edu-steel.jpg",
  },
  {
    number: "11",
    title: "my-hub",
    type: "개인 정보 포털",
    description: "관심 있는 정보와 자주 쓰는 서비스를 한곳에 모아 살펴봐요.",
    href: "https://my-hub-swart.vercel.app/",
    image: "/images/showcase/my-hub-swart.jpg",
  },
  {
    number: "12",
    title: "커사맨웍스",
    type: "기업 홈페이지",
    description: "홈페이지 진단·제작과 AI 실무교육 서비스를 소개해요.",
    href: "https://cursaman-works.vercel.app/",
    image: "/images/showcase/cursaman-works.jpg",
  },
  {
    number: "13",
    title: "처음 만드는 AI 웹사이트",
    type: "단계별 학습",
    description: "아이디어부터 배포까지 초보자용 실습을 10단계로 따라가요.",
    href: "https://homepages-rosy.vercel.app/",
    image: "/images/showcase/homepages-rosy.jpg",
  },
  {
    number: "14",
    title: "온기담은 고구마",
    type: "산지 직송 쇼핑몰",
    description: "경주 산내에서 기른 고구마의 상품 정보를 보고 주문할 수 있어요.",
    href: "https://sweet-potato-shop.vercel.app/",
    image: "/images/showcase/sweet-potato-shop.jpg",
  },
  {
    number: "15",
    title: "MatZip Map",
    type: "지도 기반 검색",
    description: "음식점을 검색하고 카카오맵에서 위치를 확인해요.",
    href: "https://local-72g1.vercel.app/",
    image: "/images/showcase/local-72g1.jpg",
  },
];



function ShowcaseCard({ site }: { site: (typeof showcases)[number] }) {
  return (
    <a href={site.href} target="_blank" rel="noreferrer">
      {site.image && (
        <div className="showcase-preview">
          <Image
            src={site.image}
            alt={`${site.title} 홈페이지 첫 화면`}
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="showcase-top"><span>{site.number}</span><small>{site.type}</small></div>
      <h3>{site.title}</h3>
      <p>{site.description}</p>
      <strong>샘플 사이트 보기 ↗</strong>
    </a>
  );
}

export default async function Home() {
  const reviews = await getPublishedReviews(3);
  const featuredShowcases = showcases.slice(0, 3);
  const moreShowcases = showcases.slice(3);

  return <>
    <ResourceBar />
    <SiteHeader />
    <main id="main-content">
      <section className="market-hero conversion-hero" aria-labelledby="hero-title">
        <HeroSwiper /><div className="market-hero-shade" />
        <div className="market-hero-copy"><p>소상공인·개인사업자를 위한 1:1 AI 교습</p><h1 id="hero-title">내 가게를 알리는<br />블로그와 홈페이지.</h1><span>가게 소개 글부터 블로그 콘텐츠, 홈페이지 제작·공개까지. 내 사업에 필요한 홍보 자료를 AI로 함께 만듭니다.</span><strong className="hero-beginner">{lessonSchedule} · 1:1 교습</strong></div>
        <div className="hero-choice-card">
          <a href={daangnUrl} target="_blank" rel="noreferrer">당근에서 예약 가능 시간 확인하기 ↗</a>
        </div>
      </section>

      <section className="proof-strip" aria-label="모임 핵심 정보"><span><b>1:1 교습</b>내 사업에 맞춰 실습</span><span><b>매일 두 시간대</b>오전 10시 · 오후 3시</span><span><b>개인 노트북</b>충전기와 함께 준비</span><span><b>부산 교대 인근</b>커피긱스 2층 8인룸</span></section>

      <section className="story-section conversion-story" aria-labelledby="story-title"><div><p>REAL CLASS STORY</p><h2 id="story-title">배운 내용을 바로,<br />내 가게 홍보에.</h2><p>가게 소개와 상품·서비스 사진을 가져오세요. 고객이 궁금해하는 내용을 블로그 글로 쓰고, 서비스·위치·문의 방법이 담긴 홈페이지를 직접 만듭니다. 완성 후에도 내용을 수정하고 운영하는 방법을 함께 익힙니다.</p><Link className="button button-primary" href="/reviews">모임 참여 후기 보기 →</Link></div><div className="story-images"><Image src="/images/class-review.webp" alt="노트북으로 AI 실습을 진행하며 이야기를 나누는 강의 현장" fill sizes="(max-width: 800px) 100vw, 50vw" /></div></section>
      {reviews.length > 0 ? <section className="home-reviews trust-reviews" aria-labelledby="home-reviews-title"><div className="market-heading"><div><p>REAL REVIEWS</p><h2 id="home-reviews-title">참여자가 직접 들려준 이야기</h2><span>공개에 동의한 실제 참여 후기만 소개합니다.</span></div><Link href="/reviews">전체 후기 보기 →</Link></div><div className="home-review-grid">{reviews.map((review)=><article key={review.id}>{review.result_image_url?<div className="home-review-image" role="img" aria-label={`${review.nickname}님의 결과물`} style={{backgroundImage:`url(${review.result_image_url})`}}/>:<span className="home-review-quote" aria-hidden="true">“</span>}<div><small>{review.ait_meetings?.title??"AI Together 모임"}</small><p>{review.content}</p><strong>{review.nickname}</strong></div></article>)}</div></section>:null}

      <section className="course-compare" id="lesson-guide" aria-labelledby="compare-title"><div className="market-heading"><div><p>CHOOSE YOUR COURSE</p><h2 id="compare-title">목표에 맞게 선택하세요</h2><span>가게 홍보 글·사진이나 홈페이지 중 필요한 작업을 골라 1:1로 배울 수 있어요.</span></div></div><div className="compare-grid"><article><div className="compare-card-heading"><span>가볍게 시작</span><h3>주제 실습</h3></div><dl><div><dt>추천 대상</dt><dd>내 가게 소개 글·사진을 직접 만들고 싶은 분</dd></div><div><dt>수업 시간</dt><dd>{lessonSchedule}</dd></div><div><dt>완성 결과</dt><dd>가게 소개 글·블로그 초안·홍보 이미지</dd></div></dl><a href={daangnUrl} target="_blank" rel="noreferrer">당근에서 주제 실습 신청 ↗</a></article><article className="compare-featured"><div className="compare-card-heading"><span>내 사업에 맞게 제작</span><h3>홈페이지 제작</h3></div><dl><div><dt>추천 대상</dt><dd>사업 홈페이지를 만들거나 개선하고 싶은 분</dd></div><div><dt>수업 시간</dt><dd>{lessonSchedule}</dd></div><div><dt>완성 결과</dt><dd>서비스·위치·문의 안내 페이지 제작·개선</dd></div></dl><a href={daangnUrl} target="_blank" rel="noreferrer">당근에서 홈페이지 교습 신청 ↗</a></article></div></section>

      {cohorts.map((cohort) => (
        <section className="showcase-section cohort-section" aria-labelledby={cohort.id} key={cohort.id}>
          <div className="market-heading">
            <div>
              <p>{cohort.eyebrow}</p>
              <h2 id={cohort.id}>{cohort.title}</h2>
              <span>{cohort.description}</span>
            </div>
          </div>
          <div className="showcase-grid cohort-grid">
            {cohort.projects.map((project) => (
              <a href={project.href} target="_blank" rel="noopener noreferrer" key={project.href} aria-label={project.title + " 작품 사이트 보기 (새 창)"}>
                <div className={"cohort-cover cohort-cover-" + project.theme} aria-hidden="true">
                  <span>AI TOGETHER · {cohort.label}</span>
                  <b>{project.mark}</b>
                  <small>{project.category}</small>
                </div>
                <div className="showcase-top"><span>{cohort.label}</span><small>{project.category}</small></div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <strong>작품 사이트 보기 ↗</strong>
              </a>
            ))}
          </div>
        </section>
      ))}

      <section className="showcase-section conversion-showcase" aria-labelledby="showcase-title">
        <div className="market-heading">
          <div>
            <p>PROJECT SHOWCASE</p>
            <h2 id="showcase-title">제작할 때 참고할 수 있는 예시</h2>
            <span>다양한 주제와 기능을 살펴보고 내 프로젝트의 아이디어를 찾아보세요.</span>
          </div>
          <Link href="/resources">제작 참고자료 보기 →</Link>
        </div>
        <div className="showcase-grid">{featuredShowcases.map((site) => <ShowcaseCard key={site.href} site={site} />)}</div>
        <details className="showcase-more">
          <summary>제작 예시 {showcases.length}개 모두 보기 <span aria-hidden="true">＋</span></summary>
          <div className="showcase-grid">{moreShowcases.map((site) => <ShowcaseCard key={site.href} site={site} />)}</div>
        </details>
      </section>

      <section className="how-section" aria-labelledby="how-title"><div className="market-heading centered light"><div><p>HOW TO JOIN</p><h2 id="how-title">처음이어도 3단계면 충분해요</h2></div></div><ol>{steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol><Link className="button button-light" href="/guide">처음 오신 분 안내 →</Link></section>
      <section className="visit-section" aria-labelledby="visit-title"><div><p>LOCATION & PREPARATION</p><h2 id="visit-title">좋아하는 음료와 함께,<br />AI로 만들어봐요.</h2><ul><li><strong>장소</strong><span>부산 교대 인근 커피긱스 2층 8인룸</span></li><li><strong>카페 이용</strong><span>음료는 각자 주문하고 개별 결제</span></li><li><strong>교습 문의</strong><span>참가비와 예약 가능 시간은 당근에서 확인</span></li><li><strong>준비물</strong><span>개인 노트북·충전기·가게 소개·상품 사진</span></li></ul><Link className="text-link" href="/contact">장소와 이용 안내 자세히 보기 →</Link></div><figure className="visit-menu"><Image src="/images/coffee-geeks-menu.jpg" alt="커피긱스 커피와 음료 메뉴판" width={900} height={742} sizes="(max-width: 900px) calc(100vw - 40px), 44vw" /><figcaption><strong>커피긱스 메뉴</strong><span>메뉴와 가격은 방문 시점에 따라 달라질 수 있습니다.</span></figcaption></figure></section>
      <section className="final-cta" aria-labelledby="final-cta-title"><p>READY TO MAKE?</p><h2 id="final-cta-title">내 가게 홍보,<br />직접 시작해볼까요?</h2><span>블로그 글 한 편부터 홈페이지까지, 지금 필요한 작업부터 시작하세요. 필요한 경험과 준비 사항은 참여 전에 안내합니다.</span><div><a href={daangnUrl} target="_blank" rel="noreferrer">당근에서 1:1 교습 신청 ↗</a></div></section>
    </main>
    <div className="mobile-apply-bar"><div><small>{lessonSchedule}</small><strong>1:1 교습</strong></div><a href={daangnUrl} target="_blank" rel="noreferrer">당근에서 신청 ↗</a></div>
    <footer className="site-footer"><div><Link className="brand footer-brand" href="/" aria-label="AI Together 홈"><span className="brand-mark">AI</span><span>Together</span></Link><p>내 가게의 블로그·홈페이지를 AI로 함께 만드는 모임</p></div><nav aria-label="하단 메뉴"><Link href="/meetings">지난 모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link><Link href="/resources">참고자료</Link></nav><small>© 2026 AI Together</small></footer>
  </>;
}
