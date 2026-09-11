import Link from "next/link";

export default function MobileMenu() {
  return (
    <details className="mobile-menu">
      <summary aria-label="메뉴 열기">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </summary>
      <nav aria-label="모바일 메뉴">
        <Link href="/meetings">모임</Link>
        <Link href="/guide">처음 오셨나요?</Link>
        <Link href="/reviews">후기</Link>
        <Link href="/contact">문의</Link>
        <Link href="/resources">참고자료</Link>
        <Link className="mobile-menu-cta" href="/meetings">모임 찾기 →</Link>
      </nav>
    </details>
  );
}
