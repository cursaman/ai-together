import Link from "next/link";
import MobileMenu from "./mobile-menu";
import ResourceBar from "./resource-bar";

export function InfoShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ResourceBar />
      <header className="site-header"><div className="nav-shell"><Link className="brand" href="/" aria-label="AI Together 홈"><span className="brand-mark">AI</span><span>Together</span></Link><nav className="desktop-nav" aria-label="주요 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link><Link href="/resources">참고자료</Link></nav><Link className="nav-cta" href="/meetings">모임 찾기</Link><MobileMenu /></div></header>
      {children}
      <footer className="site-footer"><div><Link className="brand footer-brand" href="/" aria-label="AI Together 홈"><span className="brand-mark">AI</span><span>Together</span></Link><p>AI로 재미있는 것을 같이 만들어보는 모임</p></div><nav aria-label="하단 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link><Link href="/resources">참고자료</Link></nav><small>© 2026 AI Together</small></footer>
    </>
  );
}
