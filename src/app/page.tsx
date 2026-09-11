import Link from "next/link";

const categories = [
  { icon: "📷", name: "사진", description: "상상을 이미지로 만들어요" },
  { icon: "✍️", name: "글쓰기", description: "내 이야기를 함께 다듬어요" },
  { icon: "🧳", name: "여행", description: "나만의 여행 계획을 세워요" },
  { icon: "🎬", name: "영상", description: "재미있는 영상 아이디어를 찾아요" },
  { icon: "🖥️", name: "홈페이지", description: "작은 웹페이지를 완성해요" },
  { icon: "⚡", name: "자동화", description: "반복 작업을 더 간단하게 해요" },
];

const steps = [
  { number: "01", title: "모임 선택", description: "관심 있는 주제와 시간을 골라요." },
  { number: "02", title: "참가 신청", description: "간단한 정보만 남기면 신청 끝이에요." },
  { number: "03", title: "함께 만들기", description: "준비물을 챙겨 편하게 참여해요." },
];

export default function Home() {
  return (
    <>
      <aside className="resource-bar" aria-label="홈페이지 교육 안내">
        <span>홈페이지 만들기가 궁금하신가요?</span>
        <a href="https://autosites-jd3d.vercel.app/" target="_blank" rel="noreferrer">홈페이지 과정 <span aria-hidden="true">↗</span></a>
        <a href="https://homepages-rosy.vercel.app/" target="_blank" rel="noreferrer">제작방법 보기 <span aria-hidden="true">↗</span></a>
      </aside>
      <header className="site-header">
        <div className="nav-shell">
          <Link className="brand" href="/" aria-label="AI 같이해요 홈"><span className="brand-mark" aria-hidden="true">같이</span><span>AI 같이해요</span></Link>
          <nav className="desktop-nav" aria-label="주요 메뉴">
            <Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link>
          </nav>
          <Link className="nav-cta" href="/meetings">모임 찾기</Link>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-glow hero-glow-one" aria-hidden="true" /><div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow"><span aria-hidden="true">✦</span> AI가 처음이어도 환영해요</p>
            <h1 id="hero-title">AI 몰라도 괜찮아요.<br /><span>같이 하나 만들어봐요.</span></h1>
            <p className="hero-description">어려운 공부보다 즐거운 만들기부터.<br />관심 있는 사람들과 AI로 작은 결과물을 완성해보세요.</p>
            <div className="hero-actions"><Link className="button button-primary" href="/meetings">모임 둘러보기 <span aria-hidden="true">→</span></Link><Link className="text-link" href="/guide">처음이라면 읽어보기</Link></div>
            <ul className="trust-list" aria-label="모임 특징"><li><span aria-hidden="true">✓</span> 사전 지식 필요 없음</li><li><span aria-hidden="true">✓</span> 소규모 모임</li><li><span aria-hidden="true">✓</span> 직접 만드는 경험</li></ul>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-card visual-card-back"><span>좋아하는 것</span><strong>＋ AI</strong></div>
            <div className="visual-card visual-card-main"><div className="spark">✦</div><p>오늘의 작은 프로젝트</p><strong>상상을<br />직접 만들어보기</strong><div className="people"><span>🙂</span><span>😊</span><span>🤩</span><small>함께해요!</small></div></div>
          </div>
        </section>

        <section className="section" aria-labelledby="categories-title">
          <div className="section-heading"><p className="section-kicker">WHAT WE MAKE</p><h2 id="categories-title">어떤 걸 하나요?</h2><p>잘하는 것보다 좋아하는 것에서 시작해요.</p></div>
          <div className="category-grid">{categories.map((category) => <article className="category-card" key={category.name}><span className="category-icon" aria-hidden="true">{category.icon}</span><h3>{category.name}</h3><p>{category.description}</p></article>)}</div>
        </section>

        <section className="section meeting-section" aria-labelledby="meeting-title">
          <div className="section-heading section-heading-row"><div><p className="section-kicker">THIS WEEK</p><h2 id="meeting-title">이번 주 모임</h2></div><Link className="text-link" href="/meetings">전체 모임 보기 →</Link></div>
          <article className="meeting-card">
            <div className="meeting-art" aria-hidden="true"><span className="art-badge">첫 모임</span><span className="art-emoji">💡</span><div className="art-bubble">나도 할 수 있을까?</div><div className="art-bubble art-bubble-answer">물론이죠!</div></div>
            <div className="meeting-info"><div className="meeting-tags"><span>무료</span><span>난이도 · 처음</span></div><h3>AI 처음인 사람만 오세요</h3><p className="meeting-subtitle">AI로 재미있는 것 하나 만들어보기</p><p className="meeting-copy">AI를 한 번도 사용하지 않았어도 괜찮아요. 사진, 여행 계획, 글, 영상 아이디어, 홈페이지 중 하나를 골라 직접 만들어봅니다.</p><dl className="meeting-details"><div><dt>준비물</dt><dd>스마트폰 또는 노트북</dd></div><div><dt>정원</dt><dd>8명 · 소규모 진행</dd></div></dl><Link className="button button-primary" href="/meetings">모임 자세히 보기 <span aria-hidden="true">→</span></Link></div>
          </article>
        </section>

        <section className="welcome-section" aria-labelledby="welcome-title">
          <div className="welcome-copy"><p className="section-kicker">FIRST TIME?</p><h2 id="welcome-title">처음 오셨나요?</h2><p className="welcome-lead">AI를 몰라도, 컴퓨터가 익숙하지 않아도 괜찮아요.</p><p>강의를 듣고 외우는 자리가 아니에요. 천천히 따라 하며 내 손으로 무언가를 만들어보는 모임입니다. 막히면 옆에서 함께 해결해드려요.</p><Link className="text-link" href="/guide">모임이 더 궁금하다면 →</Link></div>
          <div className="welcome-note" aria-label="초보자 환영 안내"><span aria-hidden="true">🌱</span><strong>완전 초보 환영</strong><p>질문은 많을수록 좋아요.<br />속도보다 경험이 중요해요.</p></div>
        </section>

        <section className="section" aria-labelledby="steps-title">
          <div className="section-heading"><p className="section-kicker">HOW TO JOIN</p><h2 id="steps-title">참여는 이렇게 해요</h2></div>
          <ol className="steps">{steps.map((step) => <li key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol>
        </section>

        <section className="review-section" aria-labelledby="review-title"><p className="section-kicker">TOGETHER STORY</p><h2 id="review-title">“혼자였다면 시작도 못 했을 거예요.”</h2><blockquote>어렵게만 느껴졌던 AI로 여행 계획을 직접 만들었어요. 정답을 맞히는 시간이 아니라 서로 아이디어를 나누는 시간이라 편하고 재미있었습니다.</blockquote><p className="reviewer">첫 모임에 참여한 AI 초보자의 이야기</p></section>

        <section className="final-cta" aria-labelledby="final-cta-title"><div><p className="section-kicker">READY TO MAKE?</p><h2 id="final-cta-title">이번에는 같이 시작해볼까요?</h2><p>완벽한 준비보다 작은 호기심 하나면 충분해요.</p></div><Link className="button button-light" href="/meetings">모임 둘러보기 <span aria-hidden="true">→</span></Link></section>
      </main>

      <footer className="site-footer"><div><Link className="brand footer-brand" href="/">AI 같이해요</Link><p>AI로 재미있는 것을 같이 만들어보는 모임</p></div><nav aria-label="하단 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/contact">문의</Link></nav><small>© 2026 AI Together</small></footer>
    </>
  );
}
