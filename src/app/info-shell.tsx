import Link from "next/link";
import ResourceBar from "./resource-bar";
import SiteHeader from "./site-header";

export function InfoShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ResourceBar />
      <SiteHeader />
      {children}
      <footer className="site-footer"><div><Link className="brand footer-brand" href="/" aria-label="AI Together 홈"><span className="brand-mark">AI</span><span>Together</span></Link><p>내 가게의 블로그·홈페이지를 AI로 함께 만드는 모임</p></div><nav aria-label="하단 메뉴"><Link href="/meetings">모임</Link><Link href="/guide">처음 오셨나요?</Link><Link href="/reviews">후기</Link><Link href="/contact">문의</Link><Link href="/resources">참고자료</Link></nav><small>© 2026 AI Together</small></footer>
    </>
  );
}
