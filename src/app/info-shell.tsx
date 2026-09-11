import Link from "next/link";

export function InfoShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside className="resource-bar" aria-label="홈페이지 교육 안내">
        <span>홈페이지 만들기가 궁금하신가요?</span>
        <a href="https://autosites-jd3d.vercel.app/" target="_blank" rel="noreferrer">홈페이지 과정 <span aria-hidden="true">↗</span></a>
        <a href="https://homepages-rosy.vercel.app/" target="_blank" rel="noreferrer">제작방법 보기 <span aria-hidden="true">↗</span></a>
      </aside>
      <header className="site-header"><div className="nav-shell"><Link className="brand" href="/" aria-label="AI 같이해요 홈"><span className="brand-mark" aria-hidden="true">같이</span><span>AI 같이해요</span></Link><nav className="desktop-nav" aria-label="주요 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link></nav><Link className="nav-cta" href="/meetings">모임 찾기</Link></div></header>
      {children}
      <footer className="site-footer"><div><Link className="brand footer-brand" href="/">AI 같이해요</Link><p>AI로 재미있는 것을 같이 만들어보는 모임</p></div><nav aria-label="하단 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link></nav><small>© 2026 AI Together</small></footer>
    </>
  );
}
