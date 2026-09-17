import Link from "next/link";

export default function ResourceBar() {
  return (
    <aside className="resource-bar" aria-label="AI 및 홈페이지 교육 안내">
      <span>배우고 직접 만들어보세요</span>
      <a href="https://aiterminology-rho.vercel.app/" target="_blank" rel="noreferrer">AI 기초학습 ↗</a>
      <a href="https://autosites-jd3d.vercel.app/" target="_blank" rel="noreferrer">4주 홈페이지 과정 ↗</a>
      <Link href="/resources">교육자료 전체보기 →</Link>
    </aside>
  );
}
