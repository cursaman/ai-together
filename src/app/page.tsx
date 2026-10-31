import { getCourseType } from "@/lib/meeting-course";
import Image from "next/image";
import Link from "next/link";
import HeroSwiper from "./hero-swiper";
import ResourceBar from "./resource-bar";
import SiteHeader from "./site-header";
import { getMeetings } from "@/lib/meetings";
import { getPublishedReviews } from "@/lib/reviews";

const oneDayHref = "/meetings?course=%EC%A3%BC%EC%A0%9C%20%EC%8B%A4%EC%8A%B5";
const fourWeekHref = "/meetings?course=%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EB%AA%A8%EC%9E%84";

const steps = [
  { number: "01", title: "모임 선택", text: "날짜와 주제를 확인하고 나에게 맞는 과정을 골라요." },
  { number: "02", title: "간단 신청", text: "이름과 연락처 등 필요한 정보만 입력하면 신청이 끝나요." },
  { number: "03", title: "직접 완성", text: "노트북을 가지고 와서 AI와 함께 내 결과물을 만들어요." },
];

const firstCohortProjects = [
  { title: "가위닥터 사사끼", category: "가위 연마·수리", mark: "가위닥터", theme: "craft", description: "미용·애견 가위 연마와 수리 서비스, 택배 접수 방법을 소개하는 홈페이지입니다.", href: "https://groompick-kappa.vercel.app/" },
  { title: "바른골프피팅센터 동래점", category: "골프 피팅", mark: "BARUN", theme: "golf", description: "클럽 피팅·수리·그립 교체 서비스와 센터 위치, 상담 정보를 안내하는 홈페이지입니다.", href: "https://barun-fitting-dongnae.vercel.app/" },
  { title: "인지아이앤에스", category: "제조 디지털 혁신", mark: "I&S", theme: "industry", description: "디지털 트윈, 스마트팩토리, 산업 IoT 등 제조 디지털 혁신 사업을 소개하는 기업 홈페이지입니다.", href: "https://ingins-5b3f.vercel.app/" },
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
];



export default async function Home() {
  const [reviews, meetings] = await Promise.all([getPublishedReviews(3), getMeetings()]);
  const openMeetings = meetings.filter((meeting) => meeting.status === "모집 중" || meeting.status === "마감 임박");
  const oneDayMeeting = openMeetings.find((meeting) => getCourseType(meeting.title) === "주제 실습");
  const fourWeekMeeting = openMeetings.find((meeting) => getCourseType(meeting.title) === "프로젝트 모임");
  const oneDayApplyHref = oneDayMeeting ? `/meetings/${oneDayMeeting.id}/apply` : oneDayHref;
  const fourWeekApplyHref = fourWeekMeeting ? `/meetings/${fourWeekMeeting.id}/apply` : fourWeekHref;
  const featuredMeetings = (openMeetings.length > 0 ? openMeetings : meetings).slice(0, 3);
  const featuredShowcases = showcases.slice(0, 3);
  const moreShowcases = showcases.slice(3);

  return <>
    <ResourceBar />
    <SiteHeader />
    <main id="main-content">
      <section className="market-hero conversion-hero" aria-labelledby="hero-title">
        <HeroSwiper /><div className="market-hero-shade" />
        <div className="market-hero-copy"><p>가을에 만나는, 소규모 AI 창작 모임</p><h1 id="hero-title">AI로 만들고,<br />내 것으로 완성해요.</h1><span>AI로 사진도 만들고, 홈페이지도 만들고, 나만의 작은 서비스를 직접 만들어봅니다.</span><strong className="hero-beginner">회당 10,000원 · 음료 개별 주문·결제</strong></div>
        <div className="hero-choice-card" aria-label="과정 바로 신청"><Link href={oneDayApplyHref}><span>가볍게 경험하기</span><strong>주제 실습 신청</strong><small>15시–17시 · 회당 10,000원</small></Link><Link href={fourWeekApplyHref}><span>내 결과물 완성하기</span><strong>프로젝트 모임 신청</strong><small>18시–20시 · 회당 10,000원</small></Link></div>
      </section>

      <section className="proof-strip" aria-label="모임 핵심 정보"><span><b>최대 8명</b>가까이에서 돕는 수업</span><span><b>회당 10,000원</b>음료는 각자 결제</span><span><b>개인 노트북</b>충전기와 함께 준비</span><span><b>부산 교대 인근</b>커피긱스 2층 8인룸</span></section>

      <section className="open-meetings" aria-labelledby="open-meetings-title"><div className="market-heading"><div><p>APPLY NOW</p><h2 id="open-meetings-title">지금 신청 가능한 모임</h2><span>날짜와 남은 자리를 확인하고 바로 신청하세요.</span></div><Link href="/meetings">전체 모임 보기 →</Link></div>
        {featuredMeetings.length > 0 ? <div className="open-meeting-grid">{featuredMeetings.map((meeting) => { const remainingSeats = Math.max(meeting.capacity - meeting.applicants, 0); const isOpen = meeting.status === "모집 중" || meeting.status === "마감 임박"; return <article className="open-meeting-card" key={meeting.id}><Link className="open-meeting-image" href={`/meetings/${meeting.id}`} aria-label={`${meeting.title} 상세보기`}><Image src={meeting.imageUrl} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" /><span className={meeting.status === "마감 임박" ? "urgent" : ""}>{meeting.status}</span></Link><div><small>{getCourseType(meeting.title)} · {meeting.category}</small><h3><Link href={`/meetings/${meeting.id}`}>{meeting.title}</Link></h3><dl><div><dt>일정</dt><dd>{meeting.date} · {meeting.time}</dd></div><div><dt>장소</dt><dd>{meeting.location}</dd></div><div><dt>비용</dt><dd>{meeting.fee}</dd></div><div><dt>자리</dt><dd>{isOpen ? `${remainingSeats}자리 남음` : meeting.status}</dd></div></dl>{isOpen ? <Link className="meeting-apply-button" href={`/meetings/${meeting.id}/apply`}>지금 신청하기 →</Link> : <span className="meeting-apply-button disabled" aria-disabled="true">{meeting.status}</span>}</div></article>; })}</div> : <div className="open-meeting-empty"><strong>새로운 모임을 준비하고 있어요.</strong><p>전체 모임에서 다음 일정을 확인해주세요.</p><Link className="button button-primary" href="/meetings">전체 모임 확인하기</Link></div>}
      </section>

      <section className="story-section conversion-story" aria-labelledby="story-title"><div><p>REAL CLASS STORY</p><h2 id="story-title">설명만 듣지 않고<br />직접 만들어요.</h2><p>노트북으로 실습하며 막히는 화면을 함께 해결합니다. 최대 8명의 작은 모임이라 질문하기 편하고, 완성한 결과물을 실제 인터넷에 공개할 수 있습니다.</p><Link className="button button-primary" href="/reviews">모임 참여 후기 보기 →</Link></div><div className="story-images"><Image src="/images/class-review.webp" alt="노트북으로 AI 실습을 진행하며 이야기를 나누는 강의 현장" fill sizes="(max-width: 800px) 100vw, 50vw" /></div></section>
      {reviews.length > 0 ? <section className="home-reviews trust-reviews" aria-labelledby="home-reviews-title"><div className="market-heading"><div><p>REAL REVIEWS</p><h2 id="home-reviews-title">참여자가 직접 들려준 이야기</h2><span>공개에 동의한 실제 참여 후기만 소개합니다.</span></div><Link href="/reviews">전체 후기 보기 →</Link></div><div className="home-review-grid">{reviews.map((review)=><article key={review.id}>{review.result_image_url?<div className="home-review-image" role="img" aria-label={`${review.nickname}님의 결과물`} style={{backgroundImage:`url(${review.result_image_url})`}}/>:<span className="home-review-quote" aria-hidden="true">“</span>}<div><small>{review.ait_meetings?.title??"AI Together 모임"}</small><p>{review.content}</p><strong>{review.nickname}</strong></div></article>)}</div></section>:null}

      <section className="course-compare" aria-labelledby="compare-title"><div className="market-heading"><div><p>CHOOSE YOUR COURSE</p><h2 id="compare-title">목표에 맞게 선택하세요</h2><span>모든 모임은 1회 2시간, 회당 10,000원입니다. 음료는 각자 주문하고 결제해주세요.</span></div></div><div className="compare-grid"><article><div className="compare-card-heading"><span>가볍게 시작</span><h3>주제 실습</h3><strong>회당 10,000원</strong></div><dl><div><dt>추천 대상</dt><dd>AI를 처음 경험해보고 싶은 분</dd></div><div><dt>수업 시간</dt><dd>1회 2시간 · 15시–17시</dd></div><div><dt>완성 결과</dt><dd>이미지·영상·작은 홈페이지</dd></div></dl><Link href={oneDayApplyHref}>주제 실습 신청하기 →</Link></article><article className="compare-featured"><div className="compare-card-heading"><span>하나를 제대로 완성</span><h3>프로젝트 모임</h3><strong>회당 10,000원</strong></div><dl><div><dt>추천 대상</dt><dd>내 홈페이지나 유튜브를 만들고 싶은 분</dd></div><div><dt>수업 시간</dt><dd>1회 2시간 · 회차별 신청</dd></div><div><dt>완성 결과</dt><dd>내 프로젝트 제작·개선 · 진행 내용 사전 확인</dd></div></dl><Link href={fourWeekApplyHref}>프로젝트 모임 신청하기 →</Link></article></div></section>

      <section className="showcase-section cohort-section" aria-labelledby="cohort-title">
        <div className="market-heading"><div><p>FIRST COHORT PROJECTS</p><h2 id="cohort-title">1기 참여자가 직접 만든 작품</h2><span>각자의 일과 관심사를 담아 만들고, 실제 인터넷에 공개한 홈페이지입니다.</span></div></div>
        <div className="showcase-grid cohort-grid">
          {firstCohortProjects.map((project) => (
            <a href={project.href} target="_blank" rel="noopener noreferrer" key={project.href} aria-label={project.title + " 작품 사이트 보기 (새 창)"}>
              <div className={"cohort-cover cohort-cover-" + project.theme} aria-hidden="true"><span>AI TOGETHER · 1기 작품</span><b>{project.mark}</b><small>{project.category}</small></div>
              <div className="showcase-top"><span>1기 작품</span><small>{project.category}</small></div>
              <h3>{project.title}</h3><p>{project.description}</p><strong>작품 사이트 보기 ↗</strong>
            </a>
          ))}
        </div>
      </section>

      <section className="showcase-section conversion-showcase" aria-labelledby="showcase-title"><div className="market-heading"><div><p>PROJECT SHOWCASE</p><h2 id="showcase-title">제작할 때 참고할 수 있는 예시</h2><span>다양한 주제와 기능을 살펴보고 내 프로젝트의 아이디어를 찾아보세요.</span></div><Link href="/resources">제작 참고자료 보기 →</Link></div><div className="showcase-grid">{featuredShowcases.map((site)=><a href={site.href} target="_blank" rel="noreferrer" key={site.href}><div className="showcase-preview"><Image src={site.image} alt={`${site.title} 홈페이지 첫 화면`} fill sizes="(max-width: 600px) 100vw, 33vw" /></div><div className="showcase-top"><span>{site.number}</span><small>{site.type}</small></div><h3>{site.title}</h3><p>{site.description}</p><strong>샘플 사이트 보기 ↗</strong></a>)}</div><details className="showcase-more"><summary>제작 예시 9개 모두 보기 <span aria-hidden="true">＋</span></summary><div className="showcase-grid">{moreShowcases.map((site)=><a href={site.href} target="_blank" rel="noreferrer" key={site.href}><div className="showcase-preview"><Image src={site.image} alt={`${site.title} 홈페이지 첫 화면`} fill sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw" /></div><div className="showcase-top"><span>{site.number}</span><small>{site.type}</small></div><h3>{site.title}</h3><p>{site.description}</p><strong>샘플 사이트 보기 ↗</strong></a>)}</div></details></section>

      <section className="how-section" aria-labelledby="how-title"><div className="market-heading centered light"><div><p>HOW TO JOIN</p><h2 id="how-title">처음이어도 3단계면 충분해요</h2></div></div><ol>{steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol><Link className="button button-light" href="/guide">처음 오신 분 안내 →</Link></section>
      <section className="visit-section" aria-labelledby="visit-title"><div><p>LOCATION & PREPARATION</p><h2 id="visit-title">좋아하는 음료와 함께,<br />AI로 만들어봐요.</h2><ul><li><strong>장소</strong><span>부산 교대 인근 커피긱스 2층 8인룸</span></li><li><strong>카페 이용</strong><span>음료는 각자 주문하고 개별 결제</span></li><li><strong>참가비</strong><span>회당 10,000원 · 음료값 별도</span></li><li><strong>준비물</strong><span>개인 노트북과 충전기</span></li></ul><Link className="text-link" href="/contact">장소와 이용 안내 자세히 보기 →</Link></div><figure className="visit-menu"><Image src="/images/coffee-geeks-menu.jpg" alt="커피긱스 커피와 음료 메뉴판" width={900} height={742} sizes="(max-width: 900px) calc(100vw - 40px), 44vw" /><figcaption><strong>커피긱스 메뉴</strong><span>메뉴와 가격은 방문 시점에 따라 달라질 수 있습니다.</span></figcaption></figure></section>
      <section className="final-cta" aria-labelledby="final-cta-title"><p>READY TO MAKE?</p><h2 id="final-cta-title">이번에는 무엇을<br />직접 만들어볼까요?</h2><span>AI가 처음이어도 괜찮습니다. 원하는 과정과 날짜를 고르면 바로 시작할 수 있어요.</span><div><Link href={oneDayApplyHref}>주제 실습 · 회당 10,000원</Link><Link href={fourWeekApplyHref}>프로젝트 모임 · 회당 10,000원</Link></div></section>
    </main>
    <div className="mobile-apply-bar"><div><small>음료 개별 주문·결제</small><strong>회당 10,000원</strong></div><Link href={oneDayApplyHref}>모임 신청</Link></div>
    <footer className="site-footer"><div><Link className="brand footer-brand" href="/" aria-label="AI Together 홈"><span className="brand-mark">AI</span><span>Together</span></Link><p>AI로 재미있는 것을 같이 만들어보는 모임</p></div><nav aria-label="하단 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link><Link href="/resources">참고자료</Link></nav><small>© 2026 AI Together</small></footer>
  </>;
}
