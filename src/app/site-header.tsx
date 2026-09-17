"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/meetings", label: "모임" },
  { href: "/guide", label: "처음 오셨나요?" },
  { href: "/reviews", label: "후기" },
  { href: "/contact", label: "문의" },
  { href: "/resources", label: "참고자료" },
];

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="AI Together 홈">
          <span className="brand-mark">AI</span><span>Together</span>
        </Link>
        <nav className="desktop-nav" aria-label="주요 메뉴">
          {navigation.map((item) => <Link href={item.href} aria-current={isCurrentPath(pathname,item.href)?"page":undefined} key={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="nav-cta" href="/meetings">모임 찾기</Link>
        <details className="mobile-menu">
          <summary aria-label="메뉴 열기"><span aria-hidden="true"/><span aria-hidden="true"/><span aria-hidden="true"/></summary>
          <nav aria-label="모바일 메뉴">
            {navigation.map((item) => <Link href={item.href} aria-current={isCurrentPath(pathname,item.href)?"page":undefined} key={item.href}>{item.label}</Link>)}
            <Link className="mobile-menu-cta" href="/meetings">모임 찾기 →</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
