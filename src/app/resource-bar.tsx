import Link from "next/link";

export default function ResourceBar() {
  return (
    <aside className="resource-bar" aria-label="AI 및 홈페이지 교육 안내">
      <span>내 가게 홍보를 직접 만드는 시간</span>
      <a href="https://aiterminology-rho.vercel.app/" target="_blank" rel="noreferrer">AI 기초학습 ↗</a>
      <a href="https://autosites-jd3d.vercel.app/" target="_blank" rel="noreferrer">홈페이지 학습자료 ↗</a>
      <Link href="/resources">홍보·제작 참고자료 →</Link>
    </aside>
  );
}
