import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import HeroSwiper from "./hero-swiper";

const experiences = [
  { image: "/images/meetings/ai-first-step.webp", icon: "📷", title: "AI 이미지·앨범", text: "이미지를 만들고 온라인 앨범으로 완성해요", href: "/meetings?course=1%EC%9D%BC+%EC%B2%B4%ED%97%98&category=%EC%82%AC%EC%A7%84" },
  { image: "/images/meetings/short-video-ideas.webp", icon: "🎬", title: "AI 동영상", text: "짧은 영상을 만들어 홈페이지에 올려요", href: "/meetings?course=1%EC%9D%BC+%EC%B2%B4%ED%97%98&category=%EC%98%81%EC%83%81" },
  { image: "/images/meetings/one-page-site.webp", icon: "🖥️", title: "영화 API 홈페이지", text: "실시간 영화 정보를 보여주는 사이트를 만들어요", href: "/meetings?course=1%EC%9D%BC+%EC%B2%B4%ED%97%98&category=%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80" },
  { image: "/images/meetings/easy-automation.webp", icon: "⚡", title: "콘텐츠 자동화", text: "블로그와 영상 기획 흐름을 자동화해요", href: "/meetings?course=1%EC%9D%BC+%EC%B2%B4%ED%97%98&category=%EC%9E%90%EB%8F%99%ED%99%94" },
];

const steps = [
  { number: "01", title: "마음에 드는 과정 선택", text: "1일 체험 또는 4주 완성반에서 관심 있는 주제를 골라요." },
  { number: "02", title: "간단하게 참가 신청", text: "일정과 남은 자리를 확인하고 필요한 정보만 입력해요." },
  { number: "03", title: "내 결과물 완성", text: "노트북을 가지고 와서 AI와 함께 직접 만들고 공개해요." },
];

export default function Home() {
  return <>
    <aside className="resource-bar" aria-label="홈페이지 교육 안내"><span>홈페이지 만들기가 궁금하신가요?</span><a href="https://autosites-jd3d.vercel.app/" target="_blank" rel="noreferrer">홈페이지 과정 ↗</a><a href="https://homepages-rosy.vercel.app/" target="_blank" rel="noreferrer">제작방법 보기 ↗</a></aside>
    <header className="site-header"><div className="nav-shell"><Link className="brand" href="/" aria-label="AI Together 홈"><span className="brand-mark" aria-hidden="true">AI</span><span>AI Together</span></Link><nav className="desktop-nav" aria-label="주요 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link></nav><Link className="nav-cta" href="/meetings">모임 찾기</Link><MobileMenu /></div></header>
    <main id="main-content">
      <section className="market-hero" aria-labelledby="hero-title"><HeroSwiper /><div className="market-hero-shade" /><div className="market-hero-copy"><p>BEGINNER-FRIENDLY AI WORKSHOP</p><h1 id="hero-title">AI로 다시<br />만드는 즐거움.</h1><span>사진·영상·홈페이지·자동화를 직접 만들고 실제 결과물로 가져가세요.</span></div><div className="hero-search-card"><strong>어떤 경험을 시작해볼까요?</strong><div><Link href="/meetings?course=1%EC%9D%BC+%EC%B2%B4%ED%97%98"><small>가볍게 시작</small><b>1일 체험 · 15시–17시</b></Link><Link href="/meetings?course=4%EC%A3%BC+%EC%99%84%EC%84%B1"><small>제대로 완성</small><b>4주 과정 · 18시–20시</b></Link><Link className="hero-search-button" href="/meetings">과정 찾기 →</Link></div></div></section>
      <section className="proof-strip" aria-label="모임 특징"><span><b>최대 8명</b> 소규모 실습</span><span><b>완전 초보</b> 환영</span><span><b>개인 노트북</b> 하나면 준비 끝</span><span><b>부산 교대 인근</b> 오프라인 진행</span></section>
      <section className="market-section" aria-labelledby="experience-title"><div className="market-heading"><div><p>ONE-DAY EXPERIENCES</p><h2 id="experience-title">두 시간 안에 만나는<br />작은 성취</h2></div><Link href="/meetings?course=1%EC%9D%BC+%EC%B2%B4%ED%97%98">1일 체험 모두 보기 →</Link></div><div className="experience-grid">{experiences.map((item) => <Link className="experience-card" href={item.href} key={item.title}><div><Image src={item.image} alt="" fill sizes="(max-width: 700px) 100vw, 25vw" /><span aria-hidden="true">{item.icon}</span></div><small>1일 체험 · 10,000원</small><h3>{item.title}</h3><p>{item.text}</p><b>자세히 보기 →</b></Link>)}</div></section>
      <section className="course-feature" aria-labelledby="course-title"><div className="course-feature-copy"><p>4-WEEK COMPLETE COURSE</p><h2 id="course-title">배우는 데서 끝내지 않고,<br />내 것으로 완성해요.</h2><p>매주 토요일 저녁, 같은 목표를 가진 사람들과 하나의 프로젝트를 완성합니다. 기획부터 제작, 수정, 실제 인터넷 공개까지 함께합니다.</p><ul><li>✓ 홈페이지 4주 완성</li><li>✓ 유튜브 4주 완성</li><li>✓ 총 8시간 소규모 실습</li><li>✓ 4주 전체 80,000원</li></ul><Link className="button button-light" href="/meetings?course=4%EC%A3%BC+%EC%99%84%EC%84%B1">4주 과정 확인하기 →</Link></div><div className="course-collage"><Image src="/images/meetings/one-page-site.webp" alt="AI 홈페이지 제작 결과 예시" fill sizes="(max-width: 800px) 100vw, 45vw" /></div></section>
      <section className="market-section category-market" aria-labelledby="category-title"><div className="market-heading centered"><div><p>DISCOVER YOUR INTEREST</p><h2 id="category-title">좋아하는 것에서 시작하세요</h2></div></div><div className="category-market-grid"><Link href="/meetings?category=%EC%82%AC%EC%A7%84"><span>📷</span><strong>이미지</strong></Link><Link href="/meetings?category=%EC%98%81%EC%83%81"><span>🎬</span><strong>영상</strong></Link><Link href="/meetings?category=%ED%99%88%ED%8E%98%EC%9D%B4%EC%A7%80"><span>🖥️</span><strong>홈페이지</strong></Link><Link href="/meetings?category=%EC%9E%90%EB%8F%99%ED%99%94"><span>⚡</span><strong>자동화</strong></Link></div></section>
      <section className="how-section" aria-labelledby="how-title"><div className="market-heading centered light"><div><p>HOW TO JOIN</p><h2 id="how-title">처음이어도 이렇게 시작해요</h2></div></div><ol>{steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol><Link className="button button-light" href="/guide">처음 오신 분 안내 →</Link></section>
      <section className="story-section" aria-labelledby="story-title"><div><p>REAL STORIES ONLY</p><h2 id="story-title">만든 사람의 이야기가<br />가장 좋은 안내가 됩니다.</h2><p>실제 참여자의 동의를 받은 후기와 완성 결과물만 소개합니다. 첫 번째 이야기를 함께 만들어주세요.</p><Link className="button button-primary" href="/reviews">후기 공간 보기 →</Link></div><div className="story-images"><Image src="/images/meetings/travel-with-ai.webp" alt="함께 아이디어를 나누는 모습" fill sizes="(max-width: 800px) 100vw, 45vw" /></div></section>
      <section className="mission-section"><div><p>OUR MISSION</p><h2>AI를 공부하는 곳보다,<br />AI로 함께 만드는 곳.</h2><p>기술이 낯선 사람도 부담 없이 시작하고, 작더라도 자신의 결과물을 완성할 수 있는 자리를 만듭니다.</p><Link className="text-link" href="/contact">장소와 문의 확인하기 →</Link></div><span aria-hidden="true">✦<br />AI<br />＋<br />YOU</span></section>
    </main>
    <footer className="site-footer"><div><Link className="brand footer-brand" href="/">AI Together</Link><p>AI로 재미있는 것을 같이 만들어보는 모임</p></div><nav aria-label="하단 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link></nav><small>© 2026 AI Together</small></footer>
  </>;
}
