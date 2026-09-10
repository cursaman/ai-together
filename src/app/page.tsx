import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <section className="hero" aria-labelledby="page-title">
        <p className="eyebrow">AI Together</p>
        <h1 id="page-title">AI 같이해요</h1>
        <p className="message">
          AI 몰라도 괜찮아요.
          <br />
          같이 하나 만들어봐요.
        </p>
        <Link className="cta" href="/meetings">
          모임 둘러보기
        </Link>
        <p className="categories">
          사진 · 글쓰기 · 여행 · 영상 · 홈페이지 · 자동화
        </p>
      </section>
    </main>
  );
}
